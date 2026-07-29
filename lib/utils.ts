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
  style: "short" | "long" | "year" = "short"
): string {
  const date = typeof value === "string" ? new Date(value) : value
  if (isNaN(date.getTime())) return String(value)
  if (style === "year") return String(date.getUTCFullYear())
  const options: Intl.DateTimeFormatOptions =
    style === "long"
      ? { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
      : { year: "numeric", month: "short", timeZone: "UTC" }
  return new Intl.DateTimeFormat("en", options).format(date)
}

