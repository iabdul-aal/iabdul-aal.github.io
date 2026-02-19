"use client"

import { useMemo, useState } from "react"
import { ArrowUpRight, CalendarDays, GitFork, Globe, Star } from "lucide-react"
import type { GitHubRepository } from "@/lib/github-repos"

type ProjectsStackProps = {
  repositories: GitHubRepository[]
}

const ALL_LANGUAGES = "All languages"
const ALL_TYPES = "All repository types"
const ALL_STATUS = "Any status"

function getRepositoryYear(value: string): string {
  const matched = value.match(/\b(19|20)\d{2}\b/)
  return matched?.[0] ?? "Unknown"
}

export function ProjectsStack({ repositories }: ProjectsStackProps) {
  const [query, setQuery] = useState("")
  const [language, setLanguage] = useState(ALL_LANGUAGES)
  const [repoType, setRepoType] = useState(ALL_TYPES)
  const [status, setStatus] = useState(ALL_STATUS)

  const languageOptions = useMemo(() => {
    const values = repositories
      .map((repo) => repo.language || "Unspecified")
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))

    return [ALL_LANGUAGES, ...Array.from(new Set(values))]
  }, [repositories])

  const filteredRepositories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return repositories.filter((repo) => {
      const repoLanguage = repo.language || "Unspecified"
      const matchesLanguage = language === ALL_LANGUAGES || repoLanguage === language
      const matchesType =
        repoType === ALL_TYPES || (repoType === "Original repositories" && !repo.isFork) || (repoType === "Forked repositories" && repo.isFork)
      const matchesStatus =
        status === ALL_STATUS || (status === "Active only" && !repo.isArchived) || (status === "Archived only" && repo.isArchived)

      if (!matchesLanguage || !matchesType || !matchesStatus) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      const searchable = `${repo.name} ${repo.description} ${repo.language} ${repo.topics.join(" ")} ${getRepositoryYear(repo.updatedAtIso)}`.toLowerCase()
      return searchable.includes(normalizedQuery)
    })
  }, [repositories, query, language, repoType, status])

  const hasFilters =
    query.trim().length > 0 || language !== ALL_LANGUAGES || repoType !== ALL_TYPES || status !== ALL_STATUS

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-xl border border-border bg-card/60">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent mb-3">Search and Filters</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Repository, topic, or keyword"
              className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Language</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            >
              {languageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Repository Type</span>
            <select
              value={repoType}
              onChange={(event) => setRepoType(event.target.value)}
              className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            >
              {[ALL_TYPES, "Original repositories", "Forked repositories"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            >
              {[ALL_STATUS, "Active only", "Archived only"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {filteredRepositories.length} of {repositories.length} repositories shown
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setLanguage(ALL_LANGUAGES)
                setRepoType(ALL_TYPES)
                setStatus(ALL_STATUS)
              }}
              className="inline-flex h-9 items-center rounded-md border border-border px-3 text-xs text-accent hover:text-accent/80 hover:border-accent/50 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredRepositories.length > 0 ? (
        <div className="space-y-4">
          {filteredRepositories.map((repo) => (
            <article
              key={repo.url}
              className="group w-full rounded-xl border border-border bg-card p-4 sm:p-6 hover:border-accent/80 hover:bg-card/95 transition-all"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                    {repo.isFork ? "Forked Repository" : "Repository"}
                    {repo.isArchived ? " | Archived" : ""}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground md:whitespace-nowrap">
                    <CalendarDays className="w-3.5 h-3.5 text-accent" />
                    Updated {repo.updatedAt}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="text-xl font-bold leading-snug group-hover:text-accent transition-colors">{repo.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {repo.description || "Repository details are available on GitHub."}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>{repo.language || "Unspecified language"}</span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-accent" />
                    {repo.stars}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-accent" />
                    {repo.forks}
                  </span>
                </div>

                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {repo.topics.map((topic) => (
                      <span key={`${repo.url}-${topic}`} className="px-2 py-1 rounded text-xs bg-background text-muted-foreground">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                  >
                    Open Repository <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                    >
                      Live Link <Globe className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <article className="p-6 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground">No repositories match the selected filters yet.</p>
        </article>
      )}
    </div>
  )
}
