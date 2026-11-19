import { cache } from "react"
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

export const loadScholarMetrics = cache(async (): Promise<ScholarMetrics> => {
  try {
    const raw = await readFile(join(process.cwd(), "data", "scholar_metrics.json"), "utf8")
    return JSON.parse(raw) as ScholarMetrics
  } catch {
    return FALLBACK
  }
})
