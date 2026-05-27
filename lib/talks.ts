import { readFile } from "node:fs/promises"
import { join } from "node:path"

export type TalkEntry = {
  title: string
  event: string
  date: string
  year: string
  url: string
  source: string
  format: string
  featured?: boolean
}

const TALKS_PATH = join(process.cwd(), "talks.json")

const fallbackTalks: TalkEntry[] = [
  {
    title: "Recent Public Talk",
    event: "Featured Public Session",
    date: "",
    year: "2025",
    url: "https://www.youtube.com/watch?v=mEboydO5pEk&t=4s",
    source: "YouTube",
    format: "Technical Talk",
    featured: true,
  },
]

function dateScore(item: TalkEntry): number {
  if (item.date) {
    const timestamp = Date.parse(item.date)
    if (!Number.isNaN(timestamp)) {
      return timestamp
    }
  }

  if (item.year && /^\d{4}$/.test(item.year)) {
    return Date.UTC(Number(item.year), 0, 1)
  }

  return 0
}

function normalizeTalk(item: Partial<TalkEntry>): TalkEntry | null {
  const title = (item.title ?? "").trim()
  const url = (item.url ?? "").trim()

  if (!title || !url) {
    return null
  }

  const date = (item.date ?? "").trim()
  const year = (item.year ?? "").trim() || (date.match(/^\d{4}/)?.[0] ?? "")

  return {
    title,
    event: (item.event ?? "Talk").trim() || "Talk",
    date,
    year,
    url,
    source: (item.source ?? "Public source").trim() || "Public source",
    format: (item.format ?? "Technical Talk").trim() || "Technical Talk",
    featured: Boolean(item.featured),
  }
}

export async function loadTalks(): Promise<TalkEntry[]> {
  try {
    const raw = await readFile(TALKS_PATH, "utf8")
    const parsed = JSON.parse(raw) as Partial<TalkEntry>[]

    if (!Array.isArray(parsed)) {
      return fallbackTalks
    }

    const talks = parsed
      .map((item) => normalizeTalk(item))
      .filter((item): item is TalkEntry => item !== null)

    if (talks.length === 0) {
      return fallbackTalks
    }

    const deduped = talks.filter(
      (talk, index, list) => list.findIndex((candidate) => candidate.url === talk.url) === index,
    )

    return deduped.sort((a, b) => {
      const scoreDiff = dateScore(b) - dateScore(a)
      if (scoreDiff !== 0) {
        return scoreDiff
      }
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1
      }
      return a.title.localeCompare(b.title)
    })
  } catch {
    return fallbackTalks
  }
}
