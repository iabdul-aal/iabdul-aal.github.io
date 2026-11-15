import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generic year grouper for publications, projects, talks, and materials.
 */
export function groupByYear<T>(
  items: T[],
  getYear: (item: T) => string
): { year: string; items: T[] }[] {
  const groups: { [year: string]: T[] } = {}
  items.forEach((item) => {
    const year = getYear(item) || "Other"
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(item)
  })

  return Object.keys(groups)
    .sort((a, b) => b.localeCompare(a))
    .map((year) => ({
      year,
      items: groups[year],
    }))
}

/**
 * Client-side DOM download helper for text files (BibTeX, RIS, etc.).
 */
export function downloadText(content: string, fileName: string, mimeType: string): void {
  if (typeof window === "undefined") return
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Format an ISO date string or Date object for display with UTC offset safety.
 */
export function formatDate(
  value: string | Date,
  style: "short" | "long" | "year" = "short",
  lang: "en" | "de" = "en"
): string {
  const date = typeof value === "string" ? new Date(value) : value
  if (isNaN(date.getTime())) return String(value)
  if (style === "year") return String(date.getUTCFullYear())
  const options: Intl.DateTimeFormatOptions =
    style === "long"
      ? { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
      : { year: "numeric", month: "short", timeZone: "UTC" }
  return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-US", options).format(date)
}

/**
 * Copy text using navigator.clipboard with textarea execCommand fallback.
 */
export async function copyTextWithFallback(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // fall through to textarea fallback
    }
  }

  if (typeof document === "undefined") return false
  try {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.setAttribute("readonly", "")
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand("copy")
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

