#!/usr/bin/env node
/**
 * Deterministic headless browser QA runner over Chrome/Edge CDP for ./out or a live URL.
 * Zero external dependencies; uses Node.js built-in http, fs, net, and WebSocket.
 */

import fs from "node:fs"
import http from "node:http"
import os from "node:os"
import path from "node:path"
import { spawn } from "node:child_process"

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function parseArgs(argv) {
  const opts = {
    url: "",
    outDir: path.resolve(process.cwd(), "out"),
    shotsDir: "",
  }
  for (const arg of argv) {
    if (arg.startsWith("--url=")) opts.url = arg.slice(6).replace(/\/+$/, "")
    else if (arg.startsWith("--out-dir=")) opts.outDir = path.resolve(arg.slice(10))
    else if (arg.startsWith("--shots-dir=")) opts.shotsDir = path.resolve(arg.slice(12))
  }
  return opts
}

function findBrowserExecutable() {
  const candidates =
    process.platform === "win32"
      ? [
          "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
          "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        ]
      : ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/microsoft-edge"]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate
  }
  throw new Error("No Chromium/Edge browser binary found in standard system paths.")
}

function createStaticServer(outDir) {
  return new Promise((resolve, reject) => {
    const resolvedOut = path.resolve(outDir)
    const server = http.createServer((req, res) => {
      const reqUrl = new URL(req.url || "/", "http://127.0.0.1")
      const reqPath = decodeURIComponent(reqUrl.pathname)
      let filePath = path.resolve(resolvedOut, reqPath === "/" ? "index.html" : `.${reqPath}`)

      if (!filePath.startsWith(resolvedOut)) {
        res.statusCode = 403
        res.end("Forbidden")
        return
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        const indexCandidate = path.join(filePath, "index.html")
        const htmlSibling = `${filePath}.html`
        filePath = fs.existsSync(indexCandidate) ? indexCandidate : htmlSibling
      }
      if (!fs.existsSync(filePath) && !path.extname(filePath)) {
        const htmlCandidate = `${filePath}.html`
        if (fs.existsSync(htmlCandidate)) filePath = htmlCandidate
      }
      // Next.js 16 static export on Windows emits __next.<seg>/__PAGE__.txt whereas client requests .<seg>.__PAGE__.txt
      if (!fs.existsSync(filePath) && reqPath.includes("/__next.")) {
        const idx = reqPath.lastIndexOf("/__next.")
        const dirPart = reqPath.slice(0, idx)
        const filePart = reqPath.slice(idx + 1).replace(/\.txt$/, "")
        const dotParts = filePart.split(".")
        if (dotParts.length >= 3) {
          const winCandidate = path.resolve(
            resolvedOut,
            `.${dirPart}`,
            `${dotParts[0]}.${dotParts[1]}`,
            `${dotParts.slice(2).join(".")}.txt`
          )
          if (winCandidate.startsWith(resolvedOut) && fs.existsSync(winCandidate)) {
            filePath = winCandidate
          }
        }
      }

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(resolvedOut, "404.html")
      }

      if (!fs.existsSync(filePath)) {
        res.statusCode = 404
        res.end("Not found")
        return
      }

      const ext = path.extname(filePath).toLowerCase()
      res.setHeader("Content-Type", MIME_TYPES[ext] || "application/octet-stream")
      res.statusCode = filePath.endsWith("404.html") && reqPath !== "/404.html" ? 404 : 200
      fs.createReadStream(filePath).pipe(res)
    })

    server.listen(0, "127.0.0.1", () => {
      const address = server.address()
      if (!address || typeof address === "string") {
        reject(new Error("Could not bind static verification server"))
        return
      }
      resolve({ server, port: address.port })
    })
  })
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl)
    this.id = 1
    this.pending = new Map()
    this.events = []
    this.ready = new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve)
      this.ws.addEventListener("error", reject)
    })
    this.ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data)
      if (msg.id) {
        const entry = this.pending.get(msg.id)
        if (entry) {
          this.pending.delete(msg.id)
          if (msg.error) entry.reject(new Error(JSON.stringify(msg.error)))
          else entry.resolve(msg.result)
        }
      } else if (msg.method) {
        this.events.push(msg)
      }
    })
  }

  send(method, params = {}) {
    const id = this.id++
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }

  async eval(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    })
    if (res.exceptionDetails) {
      throw new Error(`Runtime eval error: ${JSON.stringify(res.exceptionDetails)}`)
    }
    return res.result?.value
  }

  async screenshot(shotsDir, fileName) {
    if (!shotsDir) return
    const { data } = await this.send("Page.captureScreenshot", { format: "png" })
    fs.writeFileSync(path.join(shotsDir, fileName), Buffer.from(data, "base64"))
  }

  close() {
    this.ws.close()
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  if (opts.shotsDir) fs.mkdirSync(opts.shotsDir, { recursive: true })

  let serverHandle = null
  let baseUrl = opts.url
  if (!baseUrl) {
    serverHandle = await createStaticServer(opts.outDir)
    baseUrl = `http://127.0.0.1:${serverHandle.port}`
  }

  const browserExe = findBrowserExecutable()
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "site-audit-"))
  const debugPort = 9350 + Math.floor(Math.random() * 50)

  const browser = spawn(
    browserExe,
    [
      "--headless=new",
      "--disable-gpu",
      "--disable-extensions",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${userDataDir}`,
      "about:blank",
    ],
    { stdio: "ignore" }
  )

  let cdp = null
  try {
    let targets = []
    for (let i = 0; i < 30; i++) {
      try {
        const resp = await fetch(`http://127.0.0.1:${debugPort}/json/list`)
        targets = await resp.json()
        if (targets.some((t) => t.type === "page")) break
      } catch {
        // Browser debug socket not yet accepting connections.
      }
      await wait(250)
    }

    const pageTarget = targets.find((t) => t.type === "page")
    if (!pageTarget) throw new Error("Failed to attach to headless browser page target")

    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl)
    await cdp.ready
    await cdp.send("Page.enable")
    await cdp.send("Runtime.enable")
    await cdp.send("Network.enable")
    await cdp.send("Log.enable")
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    })

    const consoleErrors = []
    const exceptions = []
    const failedAssets = []

    const collectLogs = () => {
      for (const ev of cdp.events) {
        if (ev.method === "Runtime.consoleAPICalled" && ev.params.type === "error") {
          consoleErrors.push(ev.params.args.map((a) => a.value || a.description).join(" "))
        } else if (ev.method === "Runtime.exceptionThrown") {
          exceptions.push(ev.params.exceptionDetails.text)
        } else if (ev.method === "Log.entryAdded" && ev.params.entry.level === "error") {
          consoleErrors.push(ev.params.entry.text)
        } else if (ev.method === "Network.loadingFailed" && !ev.params.canceled) {
          failedAssets.push(`${ev.params.type}: ${ev.params.errorText}`)
        } else if (ev.method === "Network.responseReceived") {
          const { status, url } = ev.params.response
          if (status >= 400 && !url.includes("/does-not-exist")) {
            failedAssets.push(`HTTP ${status} ${url}`)
          }
        }
      }
      cdp.events.length = 0
    }

    const goto = async (routePath) => {
      await cdp.send("Page.navigate", { url: `${baseUrl}${routePath}` })
      await wait(700)
      await cdp.eval(
        `new Promise((resolve) => { if (document.readyState === "complete") resolve(); else window.addEventListener("load", resolve, { once: true }); })`
      )
      await wait(250)
      collectLogs()
    }

    const report = { baseUrl, desktop: {}, mobile: {}, interactions: {}, endpoints: {} }

    for (const ep of [
      "/cv.pdf",
      "/cv_de.pdf",
      "/manifest.webmanifest",
      "/feed.xml",
      "/robots.txt",
      "/sitemap.xml",
      "/.well-known/security.txt",
    ]) {
      const r = await fetch(`${baseUrl}${ep}`)
      report.endpoints[ep] = { status: r.status, bytes: (await r.arrayBuffer()).byteLength }
    }

    const routes = ["/", "/about", "/research", "/publications", "/tools", "/materials", "/cv", "/does-not-exist-check-404"]
    for (const r of routes) {
      await goto(r)
      if (r === "/") {
        await cdp.eval(`localStorage.setItem("site_theme", "light"); document.documentElement.dataset.theme = "light";`)
        await wait(150)
      }
      report.desktop[r] = await cdp.eval(`({
        title: document.title,
        h1: document.querySelector("h1")?.innerText?.trim() || "",
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        brokenImages: Array.from(document.querySelectorAll("img")).filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src),
      })`)
      const slug = r === "/" ? "home" : r.slice(1)
      if (opts.shotsDir && (r === "/" || r === "/research" || r === "/publications")) {
        await cdp.screenshot(opts.shotsDir, `desktop_light_${slug}.png`)
      }
    }

    await goto("/")
    await cdp.eval(`document.querySelector('button[aria-label*="dark mode"], button[aria-label*="dunklen Design"]')?.click()`)
    await wait(200)
    report.interactions.darkTheme = await cdp.eval(`document.documentElement.dataset.theme`)
    await cdp.screenshot(opts.shotsDir, "desktop_dark_home.png")
    await cdp.eval(`document.querySelector('button[aria-label*="light mode"], button[aria-label*="hellen Design"]')?.click()`)
    await wait(150)

    await cdp.eval(`Array.from(document.querySelectorAll("button")).find((b) => b.textContent.trim() === "DE")?.click()`)
    await wait(200)
    report.interactions.deToggle = await cdp.eval(`document.documentElement.lang === "de" && document.body.innerText.includes("Erlangen, Deutschland")`)
    await cdp.eval(`Array.from(document.querySelectorAll("button")).find((b) => b.textContent.trim() === "EN")?.click()`)

    await goto("/publications")
    await cdp.eval(`(() => { const selects = document.querySelectorAll("select"); selects[1].value = "preprint"; selects[1].dispatchEvent(new Event("change", { bubbles: true })); })()`)
    await wait(150)
    report.interactions.pubFiltered = await cdp.eval(`document.body.innerText.match(/Showing \\d+ of \\d+ publications \\(filtered\\)/)?.[0] || ""`)

    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    })
    for (const r of ["/", "/research", "/publications", "/tools", "/materials", "/cv"]) {
      await goto(r)
      report.mobile[r] = await cdp.eval(`({
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      })`)
    }
    await goto("/")
    await cdp.screenshot(opts.shotsDir, "mobile_light_home.png")

    collectLogs()
    report.consoleErrors = consoleErrors
    report.exceptions = exceptions
    report.failedAssets = failedAssets
    console.log(JSON.stringify(report, null, 2))

    const hasBrokenImages = Object.values(report.desktop).some((d) => d.brokenImages.length > 0)
    const hasDesktopOverflow = Object.values(report.desktop).some((d) => d.overflow)
    const hasMobileOverflow = Object.values(report.mobile).some((m) => m.overflow)
    if (exceptions.length > 0 || failedAssets.length > 0 || hasBrokenImages || hasDesktopOverflow || hasMobileOverflow) {
      process.exitCode = 1
    }
  } finally {
    if (cdp) {
      try {
        await cdp.send("Browser.close")
      } catch {
        // Ignore close errors during shutdown.
      }
      cdp.close()
    }
    try {
      browser.kill()
    } catch {
      // Ignore kill errors if already exited.
    }
    if (serverHandle) serverHandle.server.close()
    await wait(300)
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
    } catch {
      // Ignore transient temp dir cleanup lock.
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
