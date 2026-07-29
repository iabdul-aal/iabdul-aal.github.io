import { readFile } from "node:fs/promises"
import { join } from "node:path"

export type ProjectMetric = {
  stars: number
  forks: number
  watchers: number
  open_issues: number
  pushed_at: string
  zenodo?: {
    downloads: number
    unique_downloads: number
    views: number
    unique_views: number
  }
  score: number
}

type ProjectMetricsFile = {
  projects: Record<string, ProjectMetric>
  fetchedAt: string
}

export async function loadProjectMetrics(): Promise<ProjectMetricsFile> {
  try {
    const raw = await readFile(join(process.cwd(), "data", "project_metrics.json"), "utf8")
    return JSON.parse(raw) as ProjectMetricsFile
  } catch {
    return { projects: {}, fetchedAt: "" }
  }
}
