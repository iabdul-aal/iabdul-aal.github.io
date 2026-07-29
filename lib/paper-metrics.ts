import { readFile } from "node:fs/promises"
import { join } from "node:path"

export type PaperMetric = {
  cited_by_count: number
  referenced_works_count: number
  title: string
  openalex_id: string
}

type PaperMetricsFile = {
  papers: Record<string, PaperMetric>
  fetchedAt: string
}

export async function loadPaperMetrics(): Promise<PaperMetricsFile> {
  try {
    const raw = await readFile(join(process.cwd(), "data", "paper_metrics.json"), "utf8")
    return JSON.parse(raw) as PaperMetricsFile
  } catch {
    return { papers: {}, fetchedAt: "" }
  }
}
