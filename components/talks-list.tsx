"use client"

import { useState, useMemo } from "react"
import { ArrowUpRight, Search } from "lucide-react"

type TalkType = {
  title: string
  event: string
  date: string
  year: string
  url: string
  source: string
  format: string
  featured?: boolean
}

type TalksListProps = {
  talks: TalkType[]
}

function formatTalkDate(talk: TalkType): string {
  if (talk.date) {
    try {
      const dt = new Date(talk.date)
      return dt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    } catch {
      // fallback
    }
  }
  return talk.year || "Recent"
}

export function TalksList({ talks }: TalksListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [pageSize, setPageSize] = useState(10)

  const filteredTalks = useMemo(() => {
    return talks.filter((talk) => {
      const query = searchQuery.toLowerCase()
      return (
        query === "" ||
        talk.title.toLowerCase().includes(query) ||
        talk.event.toLowerCase().includes(query) ||
        talk.format.toLowerCase().includes(query) ||
        talk.source.toLowerCase().includes(query)
      )
    })
  }, [talks, searchQuery])

  const visibleTalks = useMemo(() => {
    return filteredTalks.slice(0, pageSize)
  }, [filteredTalks, pageSize])

  return (
    <div className="space-y-6">
      {/* Search bar — canonical filter panel */}
      <div className="space-y-4 rounded-lg border border-border bg-surface p-4">
        <div className="relative">
          <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search talks by title, event, format, or organizer..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setPageSize(10)
            }}
            className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      {/* Info indicator */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>
          Showing {Math.min(visibleTalks.length, filteredTalks.length)} of {filteredTalks.length} sessions
          {searchQuery ? " (filtered)" : ""}
        </p>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("")
              setPageSize(10)
            }}
            className="text-accent hover:text-accent-strong hover:underline"
          >
            Clear search
          </button>
        )}
      </div>

      <div className="divide-y divide-border border-y border-border">
        {visibleTalks.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground">No sessions found matching search criteria.</p>
          </div>
        ) : (
          visibleTalks.map((talk) => (
            <article key={talk.url} className="grid gap-4 py-6 md:grid-cols-[10rem_minmax(0,1fr)_8rem] hover:bg-surface/30 transition-colors">
              <p className="text-sm text-muted-foreground">{formatTalkDate(talk)}</p>
              <div>
                <p className="text-sm text-muted-foreground">{talk.format}</p>
                <h3 className="mt-1 text-lg font-semibold leading-7 text-foreground">{talk.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {talk.event}
                  {talk.source ? `, ${talk.source}` : ""}
                </p>
              </div>
              <a
                href={talk.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-fit items-center gap-1.5 text-sm text-accent hover:text-accent-strong md:justify-self-end"
              >
                Source
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </article>
          ))
        )}
      </div>

      {filteredTalks.length > visibleTalks.length && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setPageSize((prev) => prev + 10)}
            className="inline-flex h-10 items-center justify-center rounded-md border border-border px-6 text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            Show more sessions
          </button>
        </div>
      )}
    </div>
  )
}
