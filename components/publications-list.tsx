"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Download, Copy, Check } from "lucide-react"
import { PublicationRecord, getPublicationCategory } from "@/types/publication"
import { researchThemes } from "@/lib/academic-content"
import { PublicationCard } from "@/components/publication-card"
import { SearchInput } from "@/components/ui/search-input"
import { FilterSelect } from "@/components/ui/filter-select"
import { EmptyState } from "@/components/ui/empty-state"
import { YearGroupHeader } from "@/components/year-group-header"
import { downloadText, groupByYear } from "@/lib/utils"
import { Shell } from "@/components/ui/shell"


type PublicationsListProps = {
  publications: PublicationRecord[]
  compact?: boolean
}

export function PublicationsList({ publications, compact = false }: PublicationsListProps) {
  const searchParams = useSearchParams()
  const urlTopic = searchParams?.get("topic") || "all"
  const urlType = searchParams?.get("type") || searchParams?.get("status") || "all"

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopicState, setSelectedTopic] = useState<string | null>(null)
  const [selectedTypeState, setSelectedType] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [pageSize, setPageSize] = useState(compact ? 5 : 10)
  const [copiedAllBib, setCopiedAllBib] = useState(false)

  const selectedTopic = selectedTopicState ?? urlTopic
  const selectedType = selectedTypeState ?? urlType


  const availableYears = useMemo(() => {
    const years = new Set<string>()
    publications.forEach((pub) => {
      if (pub.year) years.add(pub.year.toString())
    })
    return Array.from(years).sort((a, b) => b.localeCompare(a))
  }, [publications])

  const availableTopics = useMemo(() => {
    const ids = new Set<string>()
    publications.forEach((pub) => {
      pub.relatedThemes?.forEach((themeId) => ids.add(themeId))
    })
    return Array.from(ids).map((id) => ({
      id,
      title: researchThemes.find((t) => t.id === id)?.title ?? id,
    }))
  }, [publications])

  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        query === "" ||
        pub.title.toLowerCase().includes(query) ||
        pub.authors.some((author) => author.toLowerCase().includes(query)) ||
        (pub.venue && pub.venue.toLowerCase().includes(query))

      const matchesTopic =
        selectedTopic === "all" || pub.relatedThemes?.includes(selectedTopic)

      const matchesType =
        selectedType === "all" || getPublicationCategory(pub) === selectedType

      const matchesYear =
        selectedYear === "all" || pub.year?.toString() === selectedYear

      return matchesSearch && matchesTopic && matchesType && matchesYear
    })
  }, [publications, searchQuery, selectedTopic, selectedType, selectedYear])

  const visiblePublications = useMemo(() => {
    return filteredPublications.slice(0, pageSize)
  }, [filteredPublications, pageSize])

  const publicationsByYear = useMemo(() => {
    return groupByYear(visiblePublications, (pub) => pub.year)
  }, [visiblePublications])

  const handleCopyAllBibtex = async () => {
    const allBibtex = filteredPublications.map((p) => p.bibtex).join("\n\n")
    try {
      await navigator.clipboard.writeText(allBibtex)
      setCopiedAllBib(true)
      setTimeout(() => setCopiedAllBib(false), 2000)
    } catch {
      // fallback
    }
  }

  const handleDownloadAllRis = () => {
    const allRis = filteredPublications.map((p) => p.ris).join("\n\n")
    downloadText(allRis, "publications.ris", "application/x-research-info-systems")
  }

  if (compact) {
    return (
      <div>
        {visiblePublications.map((pub) => (
          <PublicationCard key={pub.id} publication={pub} compact />
        ))}
      </div>
    )
  }

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
            placeholder="Search by title, author, or venue..."
          />


        <div className="filter-row">
          <FilterSelect
            label="Filter:"
            showIcon
            value={selectedType}
            onChange={(val) => {
              setSelectedType(val)
              setPageSize(10)
            }}
            options={[
              { value: "all", label: "All Formats" },
              { value: "journal", label: "Journal Articles" },
              { value: "conference", label: "Conference Papers" },
              { value: "preprint", label: "Preprints" },
            ]}
          />

          {availableTopics.length > 0 && (
            <FilterSelect
              label="Topic:"
              value={selectedTopic}
              onChange={(val) => {
                setSelectedTopic(val)
                setPageSize(10)
              }}
              options={[
                { value: "all", label: "All Topics" },
                ...availableTopics.map((t) => ({ value: t.id, label: t.title })),
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

      {/* Info & Export Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>
          Showing {Math.min(visiblePublications.length, filteredPublications.length)} of {filteredPublications.length} publications
          {searchQuery || selectedTopic !== "all" || selectedType !== "all" || selectedYear !== "all" ? " (filtered)" : ""}
        </p>

        <div className="flex items-center gap-3">
          {(searchQuery || selectedTopic !== "all" || selectedType !== "all" || selectedYear !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("")
                setSelectedTopic("all")
                setSelectedType("all")
                setSelectedYear("all")
                setPageSize(10)
              }}
              className="text-accent hover:text-accent-strong hover:underline"
            >
              Clear filters
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyAllBibtex}
            className="btn-secondary"
            title="Copy BibTeX for current view"
          >
            {copiedAllBib ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
            {copiedAllBib ? "Copied BibTeX" : "Export BibTeX"}
          </button>

          <button
            type="button"
            onClick={handleDownloadAllRis}
            className="btn-secondary"
            title="Download RIS for current view"
          >
            <Download className="h-3 w-3" />
            Export RIS
          </button>
        </div>
      </div>

      {/* Publications list by year */}
      <div className="space-y-12">
        {visiblePublications.length === 0 ? (
          <EmptyState message="No publications found matching search criteria." />
        ) : (
          publicationsByYear.map(({ year, items }) => {
            const categories = [
              { key: "journal", label: "Journal Articles" },
              { key: "preprint", label: "Preprints" },
              { key: "conference", label: "Conference Papers" },
            ]
            const itemsByCategory = categories
              .map((cat) => ({
                label: cat.label,
                list: items.filter((p) => getPublicationCategory(p) === cat.key),
              }))
              .filter((group) => group.list.length > 0)

            return (
              <div key={year} className="space-y-6">
                <YearGroupHeader year={year} count={items.length} />
                <div className="space-y-6">
                  {itemsByCategory.map((group) => (
                    <div key={group.label} className="space-y-2">
                      <div className="category-divider">
                        <span>{group.label}</span>
                        <span className="h-px flex-1 bg-border/60" />
                      </div>
                      <div className="list-container">
                        {group.list.map((pub) => (
                          <PublicationCard key={pub.id} publication={pub} />
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

      {filteredPublications.length > visiblePublications.length && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setPageSize((prev) => prev + 10)}
            className="btn-primary"
          >
            Show more publications
          </button>
        </div>
      )}

    </div>
  )
}
