"use client"

import { useState, useMemo } from "react"
import { Project } from "@/lib/academic-content"
import { ProjectCard } from "@/components/project-card"
import { SearchInput } from "@/components/ui/search-input"
import { FilterSelect } from "@/components/ui/filter-select"
import { EmptyState } from "@/components/ui/empty-state"
import { YearGroupHeader } from "@/components/year-group-header"
import { Shell } from "@/components/ui/shell"
import { groupByYear } from "@/lib/utils"

type ProjectsListProps = {
  initialProjects: readonly Project[]
}

export function ProjectsList({ initialProjects }: ProjectsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTier, setSelectedTier] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")

  const availableYears = useMemo(() => {
    const years = new Set<string>()
    initialProjects.forEach((p) => {
      if (p.year) years.add(p.year.toString())
    })
    return Array.from(years).sort((a, b) => b.localeCompare(a))
  }, [initialProjects])

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        query === "" ||
        project.title.toLowerCase().includes(query) ||
        project.objective.toLowerCase().includes(query) ||
        project.methods.toLowerCase().includes(query) ||
        project.tools.some((t) => t.toLowerCase().includes(query))

      const matchesTier = selectedTier === "all" || project.tier === selectedTier
      const matchesYear = selectedYear === "all" || project.year === selectedYear

      return matchesSearch && matchesTier && matchesYear
    })
  }, [initialProjects, searchQuery, selectedTier, selectedYear])

  const projectsByYear = useMemo(() => {
    return groupByYear(filteredProjects, (p) => p.year)
  }, [filteredProjects])

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <Shell variant="primary">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by title, objective, methods, or tools..."
        />

        <div className="filter-row">
          <FilterSelect
            label="Tier:"
            showIcon
            value={selectedTier}
            onChange={setSelectedTier}
            options={[
              { value: "all", label: "All Packages" },
              { value: "major", label: "Major Design Kits" },
              { value: "minor", label: "Supporting Software" },
            ]}
          />

          {availableYears.length > 0 && (
            <FilterSelect
              label="Year:"
              value={selectedYear}
              onChange={setSelectedYear}
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
          Showing {filteredProjects.length} of {initialProjects.length} tools
          {searchQuery || selectedTier !== "all" || selectedYear !== "all" ? " (filtered)" : ""}
        </p>
        {(searchQuery || selectedTier !== "all" || selectedYear !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("")
              setSelectedTier("all")
              setSelectedYear("all")
            }}
            className="text-accent hover:text-accent-strong hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Projects list by year */}
      <div className="space-y-12">
        {filteredProjects.length === 0 ? (
          <EmptyState message="No software tools or design packages found matching criteria." />
        ) : (
          projectsByYear.map(({ year, items }) => {
            const categories = [
              { key: "major", label: "Major Design Kits" },
              { key: "minor", label: "Supporting Software" },
            ]
            const itemsByCategory = categories
              .map((cat) => ({
                label: cat.label,
                list: items.filter((p) => (p.tier || "major") === cat.key),
              }))
              .filter((group) => group.list.length > 0)

            return (
              <div key={year} className="space-y-6">
                <YearGroupHeader year={year} count={items.length} />
                <div className="space-y-6">
                  {itemsByCategory.map((group) => (
                    <div key={group.label} className="space-y-3">
                      <div className="category-divider">
                        <span>{group.label}</span>
                        <span className="h-px flex-1 bg-border/60" />
                      </div>
                      <div className="list-container">
                        {group.list.map((project) => (
                          <ProjectCard key={project.id} project={project} />
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

    </div>
  )
}
