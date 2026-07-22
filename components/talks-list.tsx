"use client"

import { useState, useMemo } from "react"
import { ArrowUpRight } from "lucide-react"
import { SearchInput } from "@/components/ui/search-input"
import { FilterSelect } from "@/components/ui/filter-select"
import { EmptyState } from "@/components/ui/empty-state"
import { YearGroupHeader } from "@/components/year-group-header"
import { Shell } from "@/components/ui/shell"
import { Row } from "@/components/ui/row"
import { groupByYear, formatDate } from "@/lib/utils"

import { useLanguage } from "@/lib/i18n-context"

export type TalkType = {
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

const germanFormatMap: Record<string, string> = {
  "Poster Presentation": "Posterpräsentation",
  "Technical Workshop": "Technischer Workshop",
  "Lecture": "Vorlesung",
  "Seminar Talk": "Seminarvortrag",
  "Conference Talk": "Konferenzvortrag",
}

export function TalksList({ talks }: TalksListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedFormat, setSelectedFormat] = useState<string>("all")
  const [pageSize, setPageSize] = useState(10)
  const { t, lang } = useLanguage()

  const translateFormat = (fmt: string) => {
    if (lang === "de") {
      return germanFormatMap[fmt] || fmt
    }
    return fmt
  }

  const availableYears = useMemo(() => {
    const years = new Set<string>()
    talks.forEach((talk) => {
      if (talk.year) years.add(talk.year.toString())
    })
    return Array.from(years).sort((a, b) => b.localeCompare(a))
  }, [talks])

  const availableFormats = useMemo(() => {
    const formats = new Set<string>()
    talks.forEach((talk) => {
      if (talk.format) formats.add(talk.format)
    })
    return Array.from(formats).sort((a, b) => a.localeCompare(b))
  }, [talks])

  const filteredTalks = useMemo(() => {
    return talks.filter((talk) => {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        query === "" ||
        talk.title.toLowerCase().includes(query) ||
        talk.event.toLowerCase().includes(query) ||
        talk.format.toLowerCase().includes(query) ||
        talk.source.toLowerCase().includes(query)
      const matchesYear =
        selectedYear === "all" || talk.year?.toString() === selectedYear
      const matchesFormat =
        selectedFormat === "all" || talk.format === selectedFormat
      return matchesSearch && matchesYear && matchesFormat
    })
  }, [talks, searchQuery, selectedYear, selectedFormat])

  const visibleTalks = useMemo(() => {
    return filteredTalks.slice(0, pageSize)
  }, [filteredTalks, pageSize])

  const talksByYear = useMemo(() => {
    return groupByYear(visibleTalks, (talk) => talk.year)
  }, [visibleTalks])

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <Shell variant="primary">
        <SearchInput
          value={searchQuery}
          onChange={(q) => {
            setSearchQuery(q)
            setPageSize(10)
          }}
          placeholder={t.ui.searchTalks}
        />

        <div className="filter-row">
          {availableFormats.length > 0 && (
            <FilterSelect
              label="Filter:"
              showIcon
              value={selectedFormat}
              onChange={(val) => {
                setSelectedFormat(val)
                setPageSize(10)
              }}
              options={[
                { value: "all", label: "All Formats" },
                ...availableFormats.map((fmt) => ({ value: fmt, label: translateFormat(fmt) })),
              ]}
            />
          )}

          {availableYears.length > 0 && (
            <FilterSelect
              label="Year:"
              value={selectedYear}
              onChange={(val) => {
                setSelectedYear(val)
                setPageSize(10)
              }}
              options={[
                { value: "all", label: "All Years" },
                ...availableYears.map((y) => ({ value: y, label: y })),
              ]}
            />
          )}
        </div>
      </Shell>

      {/* Info indicator */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>
          {t.ui.showing} {Math.min(visibleTalks.length, filteredTalks.length)} {t.ui.of} {filteredTalks.length} {t.ui.sessions}
          {searchQuery || selectedYear !== "all" || selectedFormat !== "all" ? ` ${t.ui.filtered}` : ""}
        </p>
        {(searchQuery || selectedYear !== "all" || selectedFormat !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("")
              setSelectedYear("all")
              setSelectedFormat("all")
              setPageSize(10)
            }}
            className="text-accent hover:text-accent-strong hover:underline"
          >
            {t.ui.clearFilters}
          </button>
        )}
      </div>

      <div className="space-y-12">
        {visibleTalks.length === 0 ? (
          <EmptyState message={lang === "de" ? "Keine Vorträge zu den Kriterien gefunden." : "No sessions found matching search criteria."} />
        ) : (
          talksByYear.map(({ year, items }) => {
            const formats = Array.from(new Set(items.map((t) => t.format || "Session")))
            const itemsByFormat = formats.map((fmt) => ({
              label: fmt,
              list: items.filter((t) => (t.format || "Session") === fmt),
            }))

            return (
              <div key={year} className="space-y-6">
                <YearGroupHeader year={year} count={items.length} />
                <div className="space-y-6">
                  {itemsByFormat.map((group) => (
                    <div key={group.label} className="space-y-2">
                      <div className="category-divider">
                        <span>{translateFormat(group.label)}</span>
                        <span className="h-px flex-1 bg-border/60" />
                      </div>
                      <div className="list-container">
                        {group.list.map((talk) => (
                          <Row
                            key={talk.url || talk.title}
                            variant="grid"
                            className="sm:grid-cols-[5.5rem_minmax(0,1fr)_auto]"
                          >
                            <p className="text-xs text-muted-foreground pt-1">
                              {formatDate(talk.date || talk.year, "short")}
                            </p>
                            <div>
                              <h3 className="text-base font-semibold leading-snug text-foreground">{talk.title}</h3>
                              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                {talk.event}
                                {talk.source ? `, ${talk.source}` : ""}
                              </p>
                            </div>
                            {talk.url && (
                              <a
                                href={talk.url}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-secondary md:justify-self-end h-fit"
                              >
                                {t.ui.source}
                                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                              </a>
                            )}
                          </Row>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>

      {filteredTalks.length > visibleTalks.length && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setPageSize((prev) => prev + 10)}
            className="btn-primary"
          >
            {t.ui.showMoreSessions}
          </button>
        </div>
      )}
    </div>
  )
}


