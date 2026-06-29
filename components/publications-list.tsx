"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Copy, FileText } from "lucide-react"
import type { PublicationRecord } from "@/lib/publications"

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
              <p className="text-sm text-muted-foreground">
                {[publication.venue, publication.year].filter(Boolean).join(", ")}
                {publication.submitted ? `, submitted ${publication.submitted}` : ""}
              </p>
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
