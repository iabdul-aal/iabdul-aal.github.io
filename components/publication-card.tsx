"use client"

import { useState } from "react"
import { ArrowUpRight, Copy, Check, Download } from "lucide-react"

import { PublicationRecord } from "@/types/publication"
import { Badge } from "@/components/ui/badge"
import { downloadText } from "@/lib/utils"


import { Row } from "@/components/ui/row"


export interface PublicationCardProps {
  publication: PublicationRecord
  compact?: boolean
}

export function PublicationCard({ publication, compact = false }: PublicationCardProps) {
  const [showAbstract, setShowAbstract] = useState(false)
  const [copiedBibtex, setCopiedBibtex] = useState(false)

  const handleCopyBibtex = async () => {
    try {
      await navigator.clipboard.writeText(publication.bibtex)
      setCopiedBibtex(true)
      setTimeout(() => setCopiedBibtex(false), 2000)
    } catch {
      // fallback
    }
  }

  const handleDownloadRis = () => {
    downloadText(
      publication.ris,
      `${publication.id}.ris`,
      "application/x-research-info-systems"
    )
  }

  return (
    <Row aria-label={publication.title}>


      <div className="space-y-1.5 w-full">
        <h2 className="text-sm font-semibold text-foreground leading-snug break-words w-full">
          {publication.title}
        </h2>

        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          <span className="text-muted-foreground">
            {[publication.venue, publication.year].filter(Boolean).join(", ")}
          </span>
          {publication.badges?.map((badge) => (
            <Badge key={badge} variant="invited">
              {badge}
            </Badge>
          ))}
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {publication.authors.map((author, idx) => {
            const isMe = author.toLowerCase().includes("abdulaal")
            return (
              <span key={author}>
                {idx > 0 && ", "}
                <span className={isMe ? "font-semibold text-foreground" : undefined}>
                  {author}
                </span>
              </span>
            )
          })}
        </p>
      </div>


      {!compact && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {publication.doi && (
              <a
                href={publication.url ?? `https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                DOI
                <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
            {publication.arxiv && (
              <a
                href={`https://arxiv.org/abs/${publication.arxiv}`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                arXiv:{publication.arxiv}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
            {publication.pdfUrl && (
              <a
                href={publication.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                PDF
                <ArrowUpRight className="h-3 w-3" />
              </a>
            )}

            <button
              type="button"
              onClick={handleCopyBibtex}
              className="btn-secondary"
              title="Copy BibTeX"
            >
              {copiedBibtex ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
              {copiedBibtex ? "Copied" : "BibTeX"}
            </button>

            <button
              type="button"
              onClick={handleDownloadRis}
              className="btn-secondary"
              title="Download RIS record"
            >
              <Download className="h-3 w-3" />
              RIS
            </button>
          </div>

          {publication.abstract && (
            <button
              type="button"
              onClick={() => setShowAbstract((prev) => !prev)}
              className="btn-secondary"
            >
              {showAbstract ? "Hide Abstract" : "Abstract"}
            </button>
          )}
        </div>

      )}

      {showAbstract && publication.abstract && (
        <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground pt-2 border-t border-border/40">
          {publication.abstract}
        </p>
      )}
    </Row>
  )
}



