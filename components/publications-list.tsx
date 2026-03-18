"use client"

import { useMemo, useState } from "react"
import { ArrowUpRight, ExternalLink, Star } from "lucide-react"
import type { Publication } from "@/components/publications"

type PublicationsListProps = {
  publications: Publication[]
  featured?: boolean
}

const ALL_VENUES = "All venues"
const ALL_YEARS = "All years"

function extractYear(status: string): string {
  const match = status.match(/\b(19|20)\d{2}\b/)
  return match?.[0] ?? "Unknown"
}

function extractVenue(status: string): string {
  const parts = status.split(",").map((s) => s.trim())
  const nonYearParts = parts.filter((p) => !/^\d{4}$/.test(p))
  return nonYearParts.join(", ") || "Unspecified"
}

export function PublicationsList({ publications, featured = false }: PublicationsListProps) {
  const [query, setQuery] = useState("")
  const [venue, setVenue] = useState(ALL_VENUES)
  const [year, setYear] = useState(ALL_YEARS)

  const venueOptions = useMemo(() => {
    const venues = Array.from(new Set(publications.map((p) => extractVenue(p.status)))).sort((a, b) =>
      a.localeCompare(b),
    )
    return [ALL_VENUES, ...venues]
  }, [publications])

  const yearOptions = useMemo(() => {
    const years = Array.from(new Set(publications.map((p) => extractYear(p.status))))
    const knownYears = years.filter((y) => /^\d{4}$/.test(y)).sort((a, b) => Number(b) - Number(a))
    return years.includes("Unknown") ? [ALL_YEARS, ...knownYears, "Unknown"] : [ALL_YEARS, ...knownYears]
  }, [publications])

  const filteredPublications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return publications.filter((pub) => {
      const matchesVenue = venue === ALL_VENUES || extractVenue(pub.status) === venue
      const matchesYear = year === ALL_YEARS || extractYear(pub.status) === year

      if (!matchesVenue || !matchesYear) return false
      if (!normalizedQuery) return true

      const searchable = `${pub.title} ${pub.status} ${pub.arxiv ?? ""}`.toLowerCase()
      return searchable.includes(normalizedQuery)
    })
  }, [publications, query, venue, year])

  const hasFilters = query.trim().length > 0 || venue !== ALL_VENUES || year !== ALL_YEARS

  if (publications.length === 0) {
    return (
      <article className="p-8 rounded-2xl border border-border bg-card/40 text-center">
        <p className="text-muted-foreground">Publication records will be added here as they become available.</p>
      </article>
    )
  }

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-xl border border-border bg-card/60">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent mb-3">Search and Filters</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title, venue, or keyword"
              className="w-full h-11 rounded-md border border-border bg-card px-3 text-sm outline-none transition-all input-focus-glow"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Venue</span>
            <select
              value={venue}
              onChange={(event) => setVenue(event.target.value)}
              className="w-full h-11 rounded-md border border-border bg-card px-3 text-sm outline-none transition-all input-focus-glow"
            >
              {venueOptions.map((option) => (
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
              className="w-full h-11 rounded-md border border-border bg-card px-3 text-sm outline-none transition-all input-focus-glow"
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
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {filteredPublications.length} of {publications.length} publications shown
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setVenue(ALL_VENUES)
                setYear(ALL_YEARS)
              }}
              className="inline-flex h-9 items-center rounded-md border border-border px-3 text-xs text-accent hover:text-accent/80 hover:border-accent/50 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredPublications.length > 0 ? (
        <div className="space-y-4">
          {filteredPublications.map((pub) => (
            <article
              key={`${pub.title}-${pub.status}`}
              className="group relative p-6 sm:p-7 rounded-2xl border border-border bg-card/40 hover:border-accent/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5"
            >
              <span
                className="pointer-events-none absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-accent/40 group-hover:bg-accent/70 transition-colors"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </span>
                  )}
                  {pub.status && (
                    <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      {pub.status}
                    </span>
                  )}
                  {pub.arxiv && (
                    <span className="inline-flex items-center rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">
                      arXiv: {pub.arxiv}
                    </span>
                  )}
                </div>

                <h2 className="text-lg sm:text-xl font-bold leading-snug group-hover:text-accent transition-colors">
                  {pub.title}
                </h2>

                {pub.url && (
                  <div className="flex items-center gap-4 mt-1">
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors group/link"
                    >
                      View Publication{" "}
                      <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
                    </a>
                    {pub.arxiv && (
                      <a
                        href={`https://arxiv.org/abs/${pub.arxiv}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors group/link"
                      >
                        arXiv{" "}
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <article className="p-6 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground">No publications match the selected filters.</p>
        </article>
      )}
    </div>
  )
}
