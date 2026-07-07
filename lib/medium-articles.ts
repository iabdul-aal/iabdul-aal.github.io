import { readFile } from "node:fs/promises"
import { join } from "node:path"

export type MediumArticle = {
  title: string
  url: string
  publishedAt: string
  year: string
  excerpt: string
  tags: string[]
  thumbnail: string
}

export type MediumArticlesData = {
  articles: MediumArticle[]
  fetchedAt: string
}

const FALLBACK: MediumArticlesData = {
  articles: [],
  fetchedAt: "",
}

export async function loadMediumArticles(): Promise<MediumArticlesData> {
  try {
    const raw = await readFile(join(process.cwd(), "medium_articles.json"), "utf8")
    return JSON.parse(raw) as MediumArticlesData
  } catch {
    return FALLBACK
  }
}

export function formatArticleDate(iso: string): string {
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
