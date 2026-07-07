import { readFile } from "node:fs/promises"
import { join } from "node:path"

export type CitationCount = {
  all: number
  since2021: number
}

export type ScholarMetrics = {
  citations: CitationCount
  hIndex: CitationCount
  i10Index: CitationCount
  citationsPerYear: { year: number; count: number }[]
  fetchedAt: string
}

const FALLBACK: ScholarMetrics = {
  citations: { all: 0, since2021: 0 },
  hIndex: { all: 0, since2021: 0 },
  i10Index: { all: 0, since2021: 0 },
  citationsPerYear: [],
  fetchedAt: "",
}

export async function loadScholarMetrics(): Promise<ScholarMetrics> {
  try {
    const raw = await readFile(join(process.cwd(), "scholar_metrics.json"), "utf8")
    const parsed = JSON.parse(raw) as ScholarMetrics
    return parsed
  } catch {
    return FALLBACK
  }
}

export function formatFetchedAt(iso: string): string {
  if (!iso) return ""
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso))
  } catch {
    return ""
  }
}
