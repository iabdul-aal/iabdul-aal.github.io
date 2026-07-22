"use client"

import * as React from "react"

import { SearchInput } from "@/components/ui/search-input"
import { FilterSelect } from "@/components/ui/filter-select"
import { EmptyState } from "@/components/ui/empty-state"
import { YearGroupHeader } from "@/components/year-group-header"
import { Shell } from "@/components/ui/shell"
import { MaterialCard, MaterialItem } from "@/components/material-card"

import { useLanguage } from "@/lib/i18n-context"

export type { MaterialItem }

export interface MaterialsListProps {
  items: MaterialItem[]
}

const germanCategoryMap: Record<string, string> = {
  "Public Sessions": "Öffentliche Vorträge",
  "Medium Articles": "Medium-Artikel",
  "Technical Summaries": "Technische Zusammenfassungen",
  "Lecture Decks": "Vorlesungsfolien",
  "Learning Roadmaps": "Lern-Roadmaps",
}

export function MaterialsList({ items: initialItems }: MaterialsListProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedType, setSelectedType] = React.useState("all")
  const [selectedYear, setSelectedYear] = React.useState("all")
  const [pageSize, setPageSize] = React.useState(15)
  const { t, lang } = useLanguage()

  const translateCategory = (cat: string) => {
    if (lang === "de") {
      return germanCategoryMap[cat] || cat
    }
    return cat
  }

  // Extract unique categories and years for dropdowns
  const availableTypes = React.useMemo(() => {
    const set = new Set(initialItems.map((i) => i.categoryLabel))
    return Array.from(set)
  }, [initialItems])

  const availableYears = React.useMemo(() => {
    const set = new Set(initialItems.map((i) => i.year))
    return Array.from(set).sort((a, b) => Number(b) - Number(a))
  }, [initialItems])

  // Filter items
  const filteredItems = React.useMemo(() => {
    return initialItems.filter((item) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.formatLabel.toLowerCase().includes(q) ||
        (item.event && item.event.toLowerCase().includes(q))

      const matchesType = selectedType === "all" || item.categoryLabel === selectedType
      const matchesYear = selectedYear === "all" || item.year === selectedYear

      return matchesSearch && matchesType && matchesYear
    })
  }, [initialItems, searchQuery, selectedType, selectedYear])

  const visibleItems = filteredItems.slice(0, pageSize)

  // Group visible items by year
  const itemsByYear = React.useMemo(() => {
    const map = new Map<string, MaterialItem[]>()
    visibleItems.forEach((item) => {
      const year = item.year || "Other"
      if (!map.has(year)) {
        map.set(year, [])
      }
      map.get(year)!.push(item)
    })
    return Array.from(map.entries()).sort((a, b) => Number(b[0]) - Number(a[0]))
  }, [visibleItems])

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <Shell variant="primary">
        <SearchInput
          value={searchQuery}
          onChange={(q) => {
            setSearchQuery(q)
            setPageSize(15)
          }}
          placeholder={t.ui.searchMaterials}
        />

        <div className="filter-row">
          <FilterSelect
            label="Type:"
            showIcon
            value={selectedType}
            onChange={(val) => {
              setSelectedType(val)
              setPageSize(15)
            }}
            options={[
              { value: "all", label: "All Types" },
              ...availableTypes.map((t) => ({ value: t, label: translateCategory(t) })),
            ]}
          />

          {availableYears.length > 0 && (
            <FilterSelect
              label="Year:"
              value={selectedYear}
              onChange={(val) => {
                setSelectedYear(val)
                setPageSize(15)
              }}
              options={[
                { value: "all", label: "All Years" },
                ...availableYears.map((y) => ({ value: y, label: y })),
              ]}
            />
          )}
        </div>
      </Shell>

      {/* Info & Clear Filter row */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>
          {t.ui.showing} {Math.min(visibleItems.length, filteredItems.length)} {t.ui.of} {filteredItems.length} {t.ui.materialsLabel}
          {searchQuery || selectedType !== "all" || selectedYear !== "all" ? ` ${t.ui.filtered}` : ""}
        </p>
        {(searchQuery || selectedType !== "all" || selectedYear !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("")
              setSelectedType("all")
              setSelectedYear("all")
              setPageSize(15)
            }}
            className="cursor-pointer text-accent hover:text-accent-strong hover:underline font-medium"
          >
            {t.ui.clearFilters}
          </button>
        )}
      </div>

      {/* Grouped by Year */}
      <div className="space-y-12">
        {filteredItems.length === 0 ? (
          <EmptyState message={lang === "de" ? "Keine Materialien zu den Kriterien gefunden." : "No materials found matching search criteria."} />
        ) : (
          itemsByYear.map(([year, items]) => {
            const categories = Array.from(new Set(items.map((i) => i.categoryLabel)))
            const itemsByCategory = categories.map((cat) => ({
              label: cat,
              list: items.filter((i) => i.categoryLabel === cat),
            }))

            return (
              <div key={year} className="space-y-6">
                <YearGroupHeader year={year} count={items.length} />
                <div className="space-y-6">
                  {itemsByCategory.map((group) => (
                    <div key={group.label} className="space-y-3">
                      <div className="category-divider">
                        <span>{translateCategory(group.label)}</span>
                        <span className="h-px flex-1 bg-border/60" />
                      </div>
                      <div className="list-container">
                        {group.list.map((item) => (
                          <MaterialCard key={item.id} item={item} />
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

      {/* Pagination */}
      {filteredItems.length > visibleItems.length && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setPageSize((prev) => prev + 15)}
            className="btn-primary"
          >
            {t.ui.showMoreMaterials}
          </button>
        </div>
      )}

    </div>
  )
}
