"use client"

import { Project } from "@/lib/academic-content"
import type { ProjectMetric } from "@/lib/project-metrics"
import { ProjectCard } from "@/components/project-card"
import { SearchInput } from "@/components/ui/search-input"
import { FilterSelect } from "@/components/ui/filter-select"
import { EmptyState } from "@/components/ui/empty-state"
import { YearGroupHeader } from "@/components/year-group-header"
import { Shell } from "@/components/ui/shell"
import { useLanguage } from "@/lib/i18n-context"
import { useProjectsFilter } from "@/hooks/use-projects-filter"

type ProjectsListProps = {
  initialProjects: readonly Project[]
  metricsMap?: Record<string, ProjectMetric>
  compact?: boolean
}

export function ProjectsList({ initialProjects, metricsMap, compact = false }: ProjectsListProps) {
  const { t, lang } = useLanguage()
  const isDe = lang === "de"

  const {
    searchQuery,
    setSearchQuery,
    selectedTier,
    setSelectedTier,
    selectedYear,
    setSelectedYear,
    availableYears,
    filteredProjects,
    projectsByYear,
    resetFilters,
    isFiltered,
  } = useProjectsFilter(initialProjects)

  const categoryLabels = {
    major: t.ui.citableSoftware,
    minor: t.ui.supportingUtilities,
  }

  if (compact) {
    return (
      <div className="list-container">
        {initialProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            metrics={metricsMap?.[project.id]}
            compact
          />
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
          onChange={(q) => setSearchQuery(q)}
          placeholder={t.ui.searchTools}
        />

        <div className="filter-row">
          <FilterSelect
            label={isDe ? "Kategorie:" : "Category:"}
            showIcon
            value={selectedTier}
            onChange={(val) => setSelectedTier(val)}
            options={[
              { value: "all", label: t.ui.allCategories },
              { value: "major", label: categoryLabels.major },
              { value: "minor", label: categoryLabels.minor },
            ]}
          />

          {availableYears.length > 0 && (
            <FilterSelect
              label={isDe ? "Jahr:" : "Year:"}
              value={selectedYear}
              onChange={(val) => setSelectedYear(val)}
              options={[
                { value: "all", label: t.ui.allYears },
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
          {isFiltered ? ` ${t.ui.filtered}` : ""}
        </p>
        {isFiltered && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-accent hover:text-accent-strong hover:underline"
          >
            {t.ui.clearFilters}
          </button>
        )}
      </div>

      {/* Projects list by year */}
      <div className="space-y-12">
        {filteredProjects.length === 0 ? (
          <EmptyState
            message={
              isDe
                ? "Softwarewerkzeuge werden angezeigt, sobald Einträge den Filterkriterien entsprechen."
                : "Software tools will appear as entries match the selected criteria."
            }
          />
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
                          <ProjectCard
                            key={project.id}
                            project={project}
                            metrics={metricsMap?.[project.id]}
                          />
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
