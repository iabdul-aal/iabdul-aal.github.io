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
import { useLanguage } from "@/lib/i18n-context"

type ProjectsListProps = {
  initialProjects: readonly Project[]
  compact?: boolean
}

export function ProjectsList({ initialProjects, compact = false }: ProjectsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTier, setSelectedTier] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const { t, lang } = useLanguage()

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

  const categoryLabels = {
    major: lang === "de" ? "Haupt-Designpakete" : "Major Design Kits",
    minor: lang === "de" ? "Unterstützende Software" : "Supporting Software",
  }

  if (compact) {
    return (
      <div className="list-container">
        {initialProjects.map((project) => (
          <ProjectCard key={project.id} project={project} compact />
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
          onChange={(q) => setSearchQuery(q)}
          placeholder={t.ui.searchTools}
        />

        <div className="filter-row">
          <FilterSelect
            label="Tier:"
            showIcon
            value={selectedTier}
            onChange={(val) => setSelectedTier(val)}
            options={[
              { value: "all", label: "All Types" },
              { value: "major", label: categoryLabels.major },
              { value: "minor", label: categoryLabels.minor },
            ]}
          />

          {availableYears.length > 0 && (
            <FilterSelect
              label="Year:"
              value={selectedYear}
              onChange={(val) => setSelectedYear(val)}
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
          {t.ui.showing} {filteredProjects.length} {t.ui.of} {initialProjects.length} {t.ui.toolsLabel}
          {searchQuery || selectedTier !== "all" || selectedYear !== "all" ? ` ${t.ui.filtered}` : ""}
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
            {t.ui.clearFilters}
          </button>
        )}
      </div>

      {/* Projects list by year */}
      <div className="space-y-12">
        {filteredProjects.length === 0 ? (
          <EmptyState message={lang === "de" ? "Keine Softwarewerkzeuge zu den Kriterien gefunden." : "No software tools or design packages found matching criteria."} />
        ) : (
          projectsByYear.map(({ year, items }) => {
            const categories = [
              { key: "major", label: categoryLabels.major },
              { key: "minor", label: categoryLabels.minor },
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
