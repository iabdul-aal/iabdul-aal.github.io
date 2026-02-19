"use client"

import { useMemo, useState } from "react"
import { ArrowRight } from "lucide-react"
import type { MediumArticle } from "@/lib/medium-feed"

type ArticlesStackProps = {
  articles: MediumArticle[]
}

const ALL_TOPICS = "All topics"
const ALL_YEARS = "All years"

function getArticleYear(value: string): string {
  const match = value.match(/\b(19|20)\d{2}\b/)
  return match?.[0] ?? "Unknown"
}

export function ArticlesStack({ articles }: ArticlesStackProps) {
  const [query, setQuery] = useState("")
  const [topic, setTopic] = useState(ALL_TOPICS)
  const [year, setYear] = useState(ALL_YEARS)

  const topicOptions = useMemo(
    () => [ALL_TOPICS, ...Array.from(new Set(articles.map((article) => article.tag))).sort((a, b) => a.localeCompare(b))],
    [articles],
  )

  const yearOptions = useMemo(() => {
    const years = Array.from(new Set(articles.map((article) => getArticleYear(article.publishedAt))))
    const knownYears = years.filter((item) => item !== "Unknown").sort((a, b) => Number(b) - Number(a))
    return years.includes("Unknown") ? [ALL_YEARS, ...knownYears, "Unknown"] : [ALL_YEARS, ...knownYears]
  }, [articles])

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return articles.filter((article) => {
      const matchesTopic = topic === ALL_TOPICS || article.tag === topic
      const articleYear = getArticleYear(article.publishedAt)
      const matchesYear = year === ALL_YEARS || articleYear === year

      if (!matchesTopic || !matchesYear) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      const searchable = `${article.title} ${article.excerpt} ${article.tag}`.toLowerCase()
      return searchable.includes(normalizedQuery)
    })
  }, [articles, query, topic, year])

  const hasFilters = query.trim().length > 0 || topic !== ALL_TOPICS || year !== ALL_YEARS

  return (
    <div className="space-y-8">
      <div className="p-5 rounded-xl border border-border bg-card/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title, topic, or keyword"
              className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Topic</span>
            <select
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            >
              {topicOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Year</span>
            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            >
              {yearOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {filteredArticles.length} of {articles.length} articles shown
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setTopic(ALL_TOPICS)
                setYear(ALL_YEARS)
              }}
              className="text-xs text-accent hover:text-accent/80 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-8 rounded-xl border border-border bg-card hover:border-accent transition-colors group"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold mb-4 w-fit">
                {article.tag}
              </span>
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{article.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 flex-grow">{article.excerpt}</p>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-accent inline-flex items-center gap-2">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
                <span className="text-xs text-muted-foreground">{article.publishedAt}</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <article className="p-6 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground">No articles match the selected filters yet.</p>
        </article>
      )}
    </div>
  )
}
