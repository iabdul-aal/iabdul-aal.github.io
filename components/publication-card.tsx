"use client"

import { useState } from "react"
import { ArrowUpRight, Copy, Check, Download } from "lucide-react"

import { PublicationRecord } from "@/types/publication"
import { Badge } from "@/components/ui/badge"
import { downloadText } from "@/lib/utils"
import { Row } from "@/components/ui/row"

import { useLanguage } from "@/lib/i18n-context"

export interface PublicationCardProps {
  publication: PublicationRecord
  compact?: boolean
}

export function PublicationCard({ publication, compact = false }: PublicationCardProps) {
  const [showAbstract, setShowAbstract] = useState(false)
  const [copiedBibtex, setCopiedBibtex] = useState(false)
  const { t, lang } = useLanguage()

  const handleCopyBibtex = async () => {
    try {
      await navigator.clipboard.writeText(publication.bibtex)
      setCopiedBibtex(true)
      setTimeout(() => setCopiedBibtex(false), 2000)
    } catch {
      // fallback: clipboard unavailable
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
        {/* h3 — below h2 section/year headings in the page hierarchy */}
        <h3 className="text-sm font-semibold text-foreground leading-snug break-words w-full">
          {publication.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          <span className="text-muted-foreground">
            {[publication.venue, publication.year].filter(Boolean).join(", ")}
          </span>
          {publication.badges?.map((badge) => {
            const b = badge.toLowerCase()
            const translatedBadge =
              lang === "de"
                ? b.includes("invited")
                  ? "Eingeladener Beitrag"
                  : b.includes("featured")
                  ? "Ausgewählt"
                  : badge
                : badge
            return (
              <Badge key={badge} variant="invited">
                {translatedBadge}
              </Badge>
            )
          })}
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {publication.authors.map((author, idx) => {
            const isMe = author.toLowerCase().includes("abdulaal")
            return (
              <span key={`${author}-${idx}`}>
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
              {copiedBibtex ? t.ui.copied : t.ui.bibtex}
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
              aria-expanded={showAbstract}
              aria-controls={`abstract-${publication.id}`}
              className="btn-secondary"
            >
              {showAbstract ? t.ui.hideAbstract : t.ui.abstract}
            </button>
          )}
        </div>
      )}

      {publication.abstract && (
        <div
          id={`abstract-${publication.id}`}
          role="region"
          aria-label="Abstract"
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: showAbstract ? "40rem" : "0", opacity: showAbstract ? 1 : 0 }}
        >
          <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground pt-2 border-t border-border/40">
            {publication.abstract}
          </p>
        </div>
      )}
    </Row>
  )
}
