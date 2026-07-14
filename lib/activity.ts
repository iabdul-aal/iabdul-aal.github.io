import { readFile } from "node:fs/promises"
import { join } from "node:path"

export type ActivityItem = {
  date_iso: string
  date: string
  type: "paper" | "preprint" | "talk" | "article" | "milestone" | "position" | "software" | string
  title: string
  detail: string
}

type ActivityFile = {
  items: ActivityItem[]
  fetchedAt: string
}

export async function loadActivity(): Promise<ActivityFile> {
  try {
    const raw = await readFile(join(process.cwd(), "activity.json"), "utf8")
    return JSON.parse(raw) as ActivityFile
  } catch {
    return { items: [], fetchedAt: "" }
  }
}
