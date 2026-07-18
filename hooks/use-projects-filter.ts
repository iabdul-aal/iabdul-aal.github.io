import { useState, useMemo } from "react"
import type { Project } from "@/lib/academic-content"
import { groupByYear } from "@/lib/utils"

export function useProjectsFilter(initialProjects: readonly Project[]) {
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

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedTier("all")
    setSelectedYear("all")
  }

  const isFiltered = searchQuery !== "" || selectedTier !== "all" || selectedYear !== "all"

  return {
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
  }
}
