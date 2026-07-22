"use client"

import * as React from "react"

import { SearchInput } from "@/components/ui/search-input"
import { FilterSelect } from "@/components/ui/filter-select"
import { EmptyState } from "@/components/ui/empty-state"
import { YearGroupHeader } from "@/components/year-group-header"
import { Shell } from "@/components/ui/shell"
import { MaterialCard, MaterialItem } from "@/components/material-card"

export type { MaterialItem }

export interface MaterialsListProps {
  items: MaterialItem[]
}

export function MaterialsList({ items: initialItems }: MaterialsListProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedType, setSelectedType] = React.useState("all")
  const [selectedYear, setSelectedYear] = React.useState("all")
  const [pageSize, setPageSize] = React.useState(15)

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
      if (!map.has(year)) map.set(year, [])
      map.get(year)!.push(item)
    })

    return Array.from(map.entries())
      .map(([year, list]) => ({ year, list }))
      .sort((a, b) => Number(b.year) - Number(a.year))
  }, [visibleItems])

  return (
    <div className="space-y-6">
      {/* Search & Filter Panel */}
      <Shell variant="primary">
        <SearchInput
          value={searchQuery}
          onChange={(q) => {
            setSearchQuery(q)
            setPageSize(15)
          }}
          placeholder="Search materials, articles, and public sessions..."
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
              ...availableTypes.map((t) => ({ value: t, label: t })),
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
          Showing {Math.min(visibleItems.length, filteredItems.length)} of {filteredItems.length} materials
          {searchQuery || selectedType !== "all" || selectedYear !== "all" ? " (filtered)" : ""}
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
            Clear filters
          </button>
        )}
      </div>

      {/* Items List by Year */}
      <div className="space-y-12">
        {visibleItems.length === 0 ? (
          <EmptyState message="No materials or sessions found matching search criteria." />
        ) : (
          itemsByYear.map(({ year, list }) => {
            const categories = Array.from(new Set(list.map((i) => i.categoryLabel)))
            const itemsByCategory = categories.map((cat) => ({
              label: cat,
              subList: list.filter((i) => i.categoryLabel === cat),
            }))

            return (
              <div key={year} className="space-y-6">
                <YearGroupHeader year={year} count={list.length} />

                <div className="space-y-6">
                  {itemsByCategory.map((group) => (
                    <div key={group.label} className="space-y-2">
                      <div className="category-divider">
                        <span>{group.label}</span>
                        <span className="h-px flex-1 bg-border/60" />
                      </div>

                      <div className="list-container">
                        {group.subList.map((item) => (
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

      {/* Show More Pagination */}
      {filteredItems.length > visibleItems.length && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setPageSize((prev) => prev + 15)}
            className="btn-primary"
          >
            Show more materials
          </button>
        </div>
      )}

    </div>
  )
}
