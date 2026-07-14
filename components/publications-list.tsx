"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, Check, Copy, FileText } from "lucide-react"
import type { PublicationRecord } from "@/lib/publications"
import { researchThemes, projects } from "@/lib/academic-content"

type PublicationsListProps = {
  publications: PublicationRecord[]
  compact?: boolean
}

export function PublicationsList({ publications, compact = false }: PublicationsListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  async function copyBibtex(publication: PublicationRecord) {
    await navigator.clipboard.writeText(publication.bibtex)
    setCopiedId(publication.id)
    window.setTimeout(() => setCopiedId(null), 1800)
  }

  if (publications.length === 0) {
    return (
      <article className="rounded-md border border-border bg-surface p-6">
        <p className="text-sm text-muted-foreground">Publication records will be added after stable public release.</p>
      </article>
    )
  }

  return (
    <div className="divide-y divide-border border-y border-border">
      {publications.map((publication) => (
        <article key={publication.id} id={publication.id} className="scroll-mt-24 py-6">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_12rem]">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {[publication.venue, publication.year].filter(Boolean).join(", ")}
                  {publication.submitted ? `, submitted ${publication.submitted}` : ""}
                </p>
                <span
                  className={
                    publication.status === "published"
                      ? "rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-secondary text-foreground ring-1 ring-border"
                      : "rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-surface text-muted-foreground ring-1 ring-border"
                  }
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
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Topics:</span>
                  {publication.relatedThemes.map((themeId) => {
                    const theme = researchThemes.find((t) => t.id === themeId)
                    if (!theme) return null
                    return (
                      <Link
                        key={themeId}
                        href={`/research#${themeId}`}
                        className="rounded-md border border-border bg-surface px-2 py-0.5 text-accent hover:border-accent hover:text-accent-strong transition-colors"
                      >
                        {theme.title}
                      </Link>
                    )
                  })}
                </div>
              )}

              {publication.relatedProjects && publication.relatedProjects.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Projects:</span>
                  {publication.relatedProjects.map((projectId) => {
                    const project = projects.find((p) => p.id === projectId)
                    if (!project) return null
                    return (
                      <Link
                        key={projectId}
                        href={`/projects#${projectId}`}
                        className="rounded-md border border-border bg-surface px-2 py-0.5 text-accent hover:border-accent hover:text-accent-strong transition-colors"
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
                  PDF
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
              <button
                type="button"
                onClick={() => copyBibtex(publication)}
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-foreground hover:border-accent hover:text-accent"
              >
                {copiedId === publication.id ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                BibTeX
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
      ))}
    </div>
  )
}
