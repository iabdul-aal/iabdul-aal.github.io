"use client"

import { useMemo, useState } from "react"
import { ArrowRight, CalendarDays } from "lucide-react"
import type { TalkEntry } from "@/lib/talks"

type TalksStackProps = {
  talks: TalkEntry[]
}

const ALL_FORMATS = "All formats"
const ALL_SOURCES = "All sources"
const ALL_YEARS = "All years"

function formatTalkDate(date: string, year: string) {
  if (date) {
    const parsed = new Date(date)
    if (!Number.isNaN(parsed.getTime())) {
      return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(parsed)
    }
  }

  return year || "Date not listed"
}

function getTalkYear(item: TalkEntry): string {
  if (item.year) {
    return item.year
  }
  if (item.date) {
    const matched = item.date.match(/\b(19|20)\d{2}\b/)
    if (matched?.[0]) {
      return matched[0]
    }
  }
  return "Unknown"
}

export function TalksStack({ talks }: TalksStackProps) {
  const [query, setQuery] = useState("")
  const [format, setFormat] = useState(ALL_FORMATS)
  const [source, setSource] = useState(ALL_SOURCES)
  const [year, setYear] = useState(ALL_YEARS)

  const formatOptions = useMemo(
    () => [ALL_FORMATS, ...Array.from(new Set(talks.map((item) => item.format))).sort((a, b) => a.localeCompare(b))],
    [talks],
  )

  const sourceOptions = useMemo(
    () => [ALL_SOURCES, ...Array.from(new Set(talks.map((item) => item.source))).sort((a, b) => a.localeCompare(b))],
    [talks],
  )

  const yearOptions = useMemo(() => {
    const years = Array.from(new Set(talks.map((item) => getTalkYear(item))))
    const knownYears = years.filter((item) => /^\d{4}$/.test(item)).sort((a, b) => Number(b) - Number(a))
    return years.includes("Unknown") ? [ALL_YEARS, ...knownYears, "Unknown"] : [ALL_YEARS, ...knownYears]
  }, [talks])

  const filteredTalks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return talks.filter((talk) => {
      const matchesFormat = format === ALL_FORMATS || talk.format === format
      const matchesSource = source === ALL_SOURCES || talk.source === source
      const matchesYear = year === ALL_YEARS || getTalkYear(talk) === year

      if (!matchesFormat || !matchesSource || !matchesYear) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      const searchable = `${talk.title} ${talk.event} ${talk.source} ${talk.format}`.toLowerCase()
      return searchable.includes(normalizedQuery)
    })
  }, [talks, query, format, source, year])

  const selectedTalk = filteredTalks.find((item) => item.featured) ?? filteredTalks[0]
  const hasFilters =
    query.trim().length > 0 || format !== ALL_FORMATS || source !== ALL_SOURCES || year !== ALL_YEARS

  return (
    <div className="space-y-6">
      {filteredTalks.length > 0 ? (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {filteredTalks.length} of {talks.length} sessions shown
          </p>
          <div className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory">
            {filteredTalks.map((talk) => (
              <article key={talk.url} className="min-w-[300px] md:min-w-[380px] max-w-[460px] shrink-0 snap-start p-6 rounded-xl border border-border bg-card">
                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg font-semibold leading-snug">{talk.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{talk.event}</p>
                    <p className="text-xs text-accent mt-2">
                      {talk.source} | {talk.format}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground inline-flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-accent" />
                    {formatTalkDate(talk.date, talk.year)}
                  </div>
                </div>
                <a
                  href={talk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                >
                  Watch Session <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <article className="p-6 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground">No talk sessions match the selected filters yet.</p>
        </article>
      )}

      {selectedTalk && (
        <article className="p-6 rounded-xl border border-accent/40 bg-background">
          <p className="text-xs text-accent font-semibold">Selected Session</p>
          <h3 className="text-xl font-semibold mt-2">{selectedTalk.title}</h3>
          <p className="text-sm text-muted-foreground mt-2">
            One recent public session that reflects my current talk style and technical scope.
          </p>
          <a
            href={selectedTalk.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
          >
            Open Session <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </article>
      )}

      <div className="p-5 rounded-xl border border-border bg-card/60">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent mb-3">Categorize</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Talk title or event"
              className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Format</span>
            <select
              value={format}
              onChange={(event) => setFormat(event.target.value)}
              className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            >
              {formatOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Source</span>
            <select
              value={source}
              onChange={(event) => setSource(event.target.value)}
              className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            >
              {sourceOptions.map((option) => (
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
              className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
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
            {filteredTalks.length} of {talks.length} sessions shown
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setFormat(ALL_FORMATS)
                setSource(ALL_SOURCES)
                setYear(ALL_YEARS)
              }}
              className="inline-flex h-9 items-center rounded-md border border-border px-3 text-xs text-accent hover:text-accent/80 hover:border-accent/50 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
