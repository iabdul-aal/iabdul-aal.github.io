import { socialLinks } from "@/lib/social-links"

export type MediumArticle = {
  title: string
  excerpt: string
  url: string
  tag: string
  publishedAt: string
}

function stripCdata(value: string) {
  return value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim()
}

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}

function extractTag(item: string, tag: string) {
  const match = item.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"))
  if (!match?.[1]) return ""
  return decodeEntities(stripCdata(match[1]))
}

function extractCategories(item: string) {
  const matches = item.match(/<category>([\s\S]*?)<\/category>/gi) ?? []
  return matches
    .map((match) => match.replace(/<\/?category>/gi, ""))
    .map((value) => decodeEntities(stripCdata(value)))
    .filter(Boolean)
}

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(date)
}

function toExcerpt(rawDescription: string, maxLength = 180) {
  const plain = stripHtml(rawDescription)
  if (plain.length <= maxLength) return plain
  return `${plain.slice(0, maxLength).trimEnd()}...`
}

export async function getMediumArticles(limit = 6): Promise<MediumArticle[]> {
  try {
    const response = await fetch(socialLinks.mediumRss)
    if (!response.ok) return []

    const xml = await response.text()
    const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? []

    return items.slice(0, limit).map((item) => {
      const title = extractTag(item, "title")
      const url = extractTag(item, "link")
      const publishedAt = formatDate(extractTag(item, "pubDate"))
      const description = extractTag(item, "description")
      const categories = extractCategories(item)

      return {
        title,
        url,
        publishedAt,
        excerpt: toExcerpt(description),
        tag: categories[0] || "Medium Article",
      }
    })
  } catch {
    return []
  }
}
