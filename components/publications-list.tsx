"use client"

import { useEffect, useState, useMemo } from "react"
import { Download, Copy, Check } from "lucide-react"
import { PublicationRecord, getPublicationCategory } from "@/types/publication"
import { researchThemes } from "@/lib/academic-content"
import { PublicationCard } from "@/components/publication-card"
import { SearchInput } from "@/components/ui/search-input"
import { FilterSelect } from "@/components/ui/filter-select"
import { EmptyState } from "@/components/ui/empty-state"
import { YearGroupHeader } from "@/components/year-group-header"
import { copyTextWithFallback, downloadText, groupByYear } from "@/lib/utils"
import { Shell } from "@/components/ui/shell"
import { useLanguage } from "@/lib/i18n-context"

type PublicationsListProps = {
  publications: PublicationRecord[]
  compact?: boolean
}

const germanThemeTitles: Record<string, string> = {
  "integrated-nanophotonics": "Integrierte Nanophotonik",
  "quantum-photonics": "Quantenphotonik",
  "intelligent-photonics": "Intelligente Photonik",
}

export function PublicationsList({ publications, compact = false }: PublicationsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [pageSize, setPageSize] = useState(compact ? 5 : 10)
  const [copiedAllBib, setCopiedAllBib] = useState(false)
  const { t, lang } = useLanguage()
  const isDe = lang === "de"

  useEffect(() => {
    if (compact || typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    const topicParam = params.get("topic")
    const typeParam = params.get("type") || params.get("status")
    queueMicrotask(() => {
      if (topicParam) setSelectedTopic(topicParam)
      if (typeParam) setSelectedType(typeParam)
    })
  }, [compact])

  const categoryLabels = {
    journal: isDe ? "Zeitschriftenartikel" : "Journal Articles",
    preprint: "Preprints",
    conference: isDe ? "Konferenzbeiträge" : "Conference Papers",
  }

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
      title: isDe
        ? germanThemeTitles[id] ?? researchThemes.find((theme) => theme.id === id)?.title ?? id
        : researchThemes.find((theme) => theme.id === id)?.title ?? id,
    }))
  }, [publications, isDe])

  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        query === "" ||
        pub.title.toLowerCase().includes(query) ||
        pub.authors.some((author) => author.toLowerCase().includes(query)) ||
        (pub.venue && pub.venue.toLowerCase().includes(query)) ||
        (pub.abstract && pub.abstract.toLowerCase().includes(query))

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
    const allBib = filteredPublications.map((p) => p.bibtex).join("\n\n")
    const ok = await copyTextWithFallback(allBib)
    if (!ok) return
    setCopiedAllBib(true)
    setTimeout(() => setCopiedAllBib(false), 2000)
  }

  const handleDownloadAllRis = () => {
    const allRis = filteredPublications.map((p) => p.ris).join("\n\n")
    downloadText(allRis, "publications.ris", "application/x-research-info-systems")
  }

  if (compact) {
    return (
      <div className="list-container">
        {visiblePublications.map((pub) => (
          <PublicationCard key={pub.id} publication={pub} compact />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <Shell variant="primary">
        <SearchInput
          value={searchQuery}
          onChange={(q) => {
            setSearchQuery(q)
            setPageSize(10)
          }}
          placeholder={t.ui.searchPubs}
        />

        <div className="filter-row">
          {availableTopics.length > 0 && (
            <FilterSelect
              label={isDe ? "Thema:" : "Topic:"}
              showIcon
              value={selectedTopic}
              onChange={(val) => {
                setSelectedTopic(val)
                setPageSize(10)
              }}
              options={[
                { value: "all", label: t.ui.allTopics },
                ...availableTopics.map((topic) => ({ value: topic.id, label: topic.title })),
              ]}
            />
          )}

          <FilterSelect
            label={isDe ? "Typ:" : "Type:"}
            value={selectedType}
            onChange={(val) => {
              setSelectedType(val)
              setPageSize(10)
            }}
            options={[
              { value: "all", label: t.ui.allTypes },
              { value: "journal", label: categoryLabels.journal },
              { value: "preprint", label: categoryLabels.preprint },
              { value: "conference", label: categoryLabels.conference },
            ]}
          />

          {availableYears.length > 0 && (
            <FilterSelect
              label={isDe ? "Jahr:" : "Year:"}
              value={selectedYear}
              onChange={(val) => {
                setSelectedYear(val)
                setPageSize(10)
              }}
              options={[
                { value: "all", label: t.ui.allYears },
                ...availableYears.map((y) => ({ value: y, label: y })),
              ]}
            />
          )}
        </div>
      </Shell>

      {/* Info and Export Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>
          {t.ui.showing} {Math.min(visiblePublications.length, filteredPublications.length)} {t.ui.of} {filteredPublications.length} {t.ui.publications}
          {searchQuery || selectedTopic !== "all" || selectedType !== "all" || selectedYear !== "all" ? ` ${t.ui.filtered}` : ""}
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
              {t.ui.clearFilters}
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyAllBibtex}
            className="btn-secondary"
            title={isDe ? "BibTeX für aktuelle Ansicht kopieren" : "Copy BibTeX for current view"}
          >
            {copiedAllBib ? <Check className="h-3 w-3 text-accent" aria-hidden="true" /> : <Copy className="h-3 w-3" aria-hidden="true" />}
            <span aria-live="polite">{copiedAllBib ? t.ui.copiedBibtex : t.ui.exportBibtex}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadAllRis}
            className="btn-secondary"
            title={isDe ? "RIS für aktuelle Ansicht herunterladen" : "Download RIS for current view"}
          >
            <Download className="h-3 w-3" aria-hidden="true" />
            {t.ui.exportRis}
          </button>
        </div>
      </div>

      {/* Publications list by year */}
      <div className="space-y-12">
        {visiblePublications.length === 0 ? (
          <EmptyState
            message={
              isDe
                ? "Publikationen werden angezeigt, sobald Einträge den Filterkriterien entsprechen."
                : "Publications will appear as entries match the selected criteria."
            }
          />
        ) : (
          publicationsByYear.map(({ year, items }) => {
            const categories = [
              { key: "journal", label: categoryLabels.journal },
              { key: "preprint", label: categoryLabels.preprint },
              { key: "conference", label: categoryLabels.conference },
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
            {t.ui.showMorePubs}
          </button>
        </div>
      )}
    </div>
  )
}
