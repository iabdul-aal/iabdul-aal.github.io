"use client"

import Link from "next/link"
import { useState, useMemo } from "react"
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react"
import type { PublicationRecord } from "@/lib/publications"
import { researchThemes } from "@/lib/academic-content"

type ProjectType = {
  readonly id: string
  readonly title: string
  readonly status: string
  readonly objective: string
  readonly methods: string
  readonly results: string
  readonly tools: readonly string[]
  readonly links: readonly { readonly label: string; readonly href: string }[]
  readonly relatedThemes: readonly string[]
}

type ProjectsListProps = {
  initialProjects: readonly ProjectType[]
  publications: PublicationRecord[]
}

export function ProjectsList({ initialProjects, publications }: ProjectsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<string>("all")
  const [pageSize, setPageSize] = useState(6)

  // Extract all unique tools for helper metrics or tag lists if needed, or filter by topic
  const availableTopics = useMemo(() => {
    const ids = new Set<string>()
    initialProjects.forEach((proj) => {
      proj.relatedThemes?.forEach((themeId) => ids.add(themeId))
    })
    return Array.from(ids).map((id) => ({
      id,
      title: researchThemes.find((t) => t.id === id)?.title ?? id,
    }))
  }, [initialProjects])

  // Filter projects by search query and selected topic
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((proj) => {
      const matchesSearch =
        searchQuery === "" ||
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.methods.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.tools.some((tool) => tool.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTopic =
        selectedTopic === "all" || proj.relatedThemes?.includes(selectedTopic)

      return matchesSearch && matchesTopic
    })
  }, [initialProjects, searchQuery, selectedTopic])

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, pageSize)
  }, [filteredProjects, pageSize])

  return (
    <div className="space-y-6">
      {/* Search and Filters Header */}
      <div className="space-y-4 rounded-lg border border-border bg-surface p-4">
        <div className="relative">
          <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search projects by title, objective, methods, or tools..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setPageSize(6)
            }}
            className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        {availableTopics.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted-foreground font-medium flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3" /> Filter by Topic:
            </span>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => {
                  setSelectedTopic("all")
                  setPageSize(6)
                }}
                className={`rounded px-2.5 py-1 text-[11px] font-medium border transition-colors ${
                  selectedTopic === "all"
                    ? "bg-secondary text-foreground border-accent"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-accent"
                }`}
              >
                All Topics
              </button>
              {availableTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopic(topic.id)
                    setPageSize(6)
                  }}
                  className={`rounded px-2.5 py-1 text-[11px] font-medium border transition-colors ${
                    selectedTopic === topic.id
                      ? "bg-secondary text-foreground border-accent"
                      : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-accent"
                  }`}
                >
                  {topic.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Info indicator */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>
          Showing {Math.min(visibleProjects.length, filteredProjects.length)} of {filteredProjects.length} projects
          {searchQuery || selectedTopic !== "all" ? " (filtered)" : ""}
        </p>
        {(searchQuery || selectedTopic !== "all") && (
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedTopic("all")
              setPageSize(6)
            }}
            className="text-accent hover:text-accent-strong hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Projects List Grid / List */}
      <div className="divide-y divide-border border-y border-border bg-card rounded-md border overflow-hidden">
        {visibleProjects.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No projects found matching the active search/filter criteria.</p>
          </div>
        ) : (
          visibleProjects.map((project) => {
            const projectPublications = publications.filter((pub) => pub.relatedProjects?.includes(project.id))

            return (
              <article key={project.id} id={project.id} className="scroll-mt-24 p-8 hover:bg-surface/30 transition-colors">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
                  <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">{project.status}</p>
                    <h2 className="mt-2 text-xl font-bold leading-8 text-foreground">{project.title}</h2>

                    <dl className="mt-6 grid gap-5">
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Objective</dt>
                        <dd className="mt-1 text-sm leading-7 text-muted-foreground">{project.objective}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Methods</dt>
                        <dd className="mt-1 text-sm leading-7 text-muted-foreground">{project.methods}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Results and Status</dt>
                        <dd className="mt-1 text-sm leading-7 text-muted-foreground">{project.results}</dd>
                      </div>

                      {projectPublications.length > 0 && (
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Related Publications</dt>
                          <dd className="mt-2 flex flex-wrap gap-2">
                            {projectPublications.map((pub) => (
                              <Link
                                key={pub.id}
                                href={`/publications#${pub.id}`}
                                className="inline-flex max-w-[22rem] items-baseline gap-1.5 truncate rounded border border-border bg-surface px-2.5 py-1 text-xs text-accent hover:border-accent hover:bg-card transition-colors"
                                title={pub.title}
                              >
                                <span className="truncate">{pub.title}</span>
                                <span className="shrink-0 text-muted-foreground">, {pub.year}</span>
                              </Link>
                            ))}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <aside className="rounded-md border border-border bg-surface p-5 md:self-start">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tools Used</h3>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {project.tools.map((tool) => (
                        <li key={tool} className="rounded border border-border bg-card px-2 py-0.5 text-xs text-muted-foreground">
                          {tool}
                        </li>
                      ))}
                    </ul>

                    {project.links.length > 0 && (
                      <div className="mt-6 grid gap-2">
                        {project.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-strong"
                          >
                            {link.label}
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    )}
                  </aside>
                </div>
              </article>
            )
          })
        )}
      </div>

      {filteredProjects.length > visibleProjects.length && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setPageSize((prev) => prev + 6)}
            className="inline-flex h-10 items-center justify-center rounded-md border border-border px-6 text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            Show more projects
          </button>
        </div>
      )}
    </div>
  )
}
