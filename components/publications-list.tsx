"use client"

import Link from "next/link"
import { useState, useMemo } from "react"
import { ArrowUpRight, Check, Copy, FileText, Search, SlidersHorizontal } from "lucide-react"
import type { PublicationRecord } from "@/lib/publications"
import { researchThemes, projects } from "@/lib/academic-content"

type PublicationsListProps = {
  publications: PublicationRecord[]
  compact?: boolean
}

export function PublicationsList({ publications, compact = false }: PublicationsListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [pageSize, setPageSize] = useState(compact ? 5 : 10)

  async function copyBibtex(publication: PublicationRecord) {
    await navigator.clipboard.writeText(publication.bibtex)
    setCopiedId(`bibtex-${publication.id}`)
    window.setTimeout(() => setCopiedId(null), 1800)
  }

  async function copyRis(publication: PublicationRecord) {
    await navigator.clipboard.writeText(publication.ris)
    setCopiedId(`ris-${publication.id}`)
    window.setTimeout(() => setCopiedId(null), 1800)
  }

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
      const matchesSearch =
        searchQuery === "" ||
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (pub.venue && pub.venue.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTopic =
        selectedTopic === "all" || pub.relatedThemes?.includes(selectedTopic)

      const matchesStatus =
        selectedStatus === "all" || pub.status === selectedStatus

      return matchesSearch && matchesTopic && matchesStatus
    })
  }, [publications, searchQuery, selectedTopic, selectedStatus])

  const visiblePublications = useMemo(() => {
    return filteredPublications.slice(0, pageSize)
  }, [filteredPublications, pageSize])

  if (publications.length === 0) {
    return (
      <article className="rounded-md border border-border bg-surface p-6">
        <p className="text-sm text-muted-foreground">Publication records will be added after stable public release.</p>
      </article>
    )
  }

  return (
    <div className="space-y-6">
      {!compact && (
        <div className="space-y-4 rounded-lg border border-border bg-surface p-4">
          <div className="relative">
            <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search publications by title, author, or journal..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setPageSize(10)
              }}
              className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-medium flex items-center gap-1">
                <SlidersHorizontal className="h-3 w-3" /> Filter:
              </span>
              <div className="flex rounded border border-border bg-card p-0.5">
                {[
                  { id: "all", label: "All" },
                  { id: "published", label: "Published" },
                  { id: "preprint", label: "Preprints" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSelectedStatus(opt.id)
                      setPageSize(10)
                    }}
                    className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      selectedStatus === opt.id
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {availableTopics.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground font-medium">Topic:</span>
                <select
                  value={selectedTopic}
                  onChange={(e) => {
                    setSelectedTopic(e.target.value)
                    setPageSize(10)
                  }}
                  className="rounded border border-border bg-card px-2 py-1 text-[11px] font-medium text-foreground outline-none focus:border-accent"
                >
                  <option value="all">All Topics</option>
                  {availableTopics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {!compact && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <p>
            Showing {Math.min(visiblePublications.length, filteredPublications.length)} of {filteredPublications.length} publications
            {searchQuery || selectedTopic !== "all" || selectedStatus !== "all" ? " (filtered)" : ""}
          </p>
          {(searchQuery || selectedTopic !== "all" || selectedStatus !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedTopic("all")
                setSelectedStatus("all")
                setPageSize(10)
              }}
              className="text-accent hover:text-accent-strong hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      <div className="divide-y divide-border border-y border-border bg-card rounded-md border overflow-hidden">
        {visiblePublications.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No publications found matching the active filter criteria.</p>
          </div>
        ) : (
          visiblePublications.map((publication) => (
            <article key={publication.id} id={publication.id} className="scroll-mt-24 p-6 hover:bg-surface/30 transition-colors">
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_12rem]">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      {[publication.venue, publication.year].filter(Boolean).join(", ")}
                      {publication.submitted ? `, submitted ${publication.submitted}` : ""}
                    </p>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-border ${
                        publication.status === "published"
                          ? "bg-secondary text-foreground"
                          : "bg-surface text-muted-foreground"
                      }`}
                    >
                      {publication.status === "published" ? "Published" : "Preprint"}
                    </span>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold leading-7 text-foreground">{publication.title}</h2>

                  {publication.authors.length > 0 && (
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {publication.authors.map((author, index) => (
                        <span key={author}>
                          {author.includes("Abdulaal") ? <strong className="font-semibold text-foreground">{author}</strong> : author}
                          {index < publication.authors.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  )}

                  {publication.relatedThemes && publication.relatedThemes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {publication.relatedThemes.map((themeId) => {
                        const theme = researchThemes.find((t) => t.id === themeId)
                        if (!theme) return null
                        return (
                          <Link
                            key={themeId}
                            href={`/research#${themeId}`}
                            className="inline-block max-w-[16rem] truncate rounded border border-border bg-surface px-2.5 py-1 text-xs text-accent hover:border-accent hover:bg-card transition-colors"
                            title={theme.title}
                          >
                            {theme.title}
                          </Link>
                        )
                      })}
                    </div>
                  )}

                  {publication.relatedProjects && publication.relatedProjects.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {publication.relatedProjects.map((projectId) => {
                        const project = projects.find((p) => p.id === projectId)
                        if (!project) return null
                        return (
                          <Link
                            key={projectId}
                            href={`/projects#${projectId}`}
                            className="inline-block max-w-[16rem] truncate rounded border border-border bg-surface px-2.5 py-1 text-xs text-accent hover:border-accent hover:bg-card transition-colors"
                            title={project.title}
                          >
                            {project.title}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-start gap-2 md:justify-end md:self-start">
                  {publication.url && (
                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-foreground hover:border-accent hover:text-accent"
                    >
                      Record
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                  {publication.pdfUrl && (
                    <a
                      href={publication.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-foreground hover:border-accent hover:text-accent"
                    >
                      {publication.status === "published" && publication.arxiv ? "Preprint PDF" : "PDF"}
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => copyBibtex(publication)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-foreground hover:border-accent hover:text-accent"
                  >
                    {copiedId === `bibtex-${publication.id}` ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    BibTeX
                  </button>
                  <button
                    type="button"
                    onClick={() => copyRis(publication)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-foreground hover:border-accent hover:text-accent"
                  >
                    {copiedId === `ris-${publication.id}` ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    RIS
                  </button>
                </div>
              </div>

              {!compact && publication.abstract && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-accent">Abstract</summary>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{publication.abstract}</p>
                </details>
              )}
            </article>
          ))
        )}
      </div>

      {filteredPublications.length > visiblePublications.length && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setPageSize((prev) => prev + 10)}
            className="inline-flex h-10 items-center justify-center rounded-md border border-border px-6 text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            Show more publications
          </button>
        </div>
      )}
    </div>
  )
}
