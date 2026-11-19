"use client"

import { useState } from "react"
import { ArrowUpRight, Copy, Check, Download } from "lucide-react"

import { PublicationRecord } from "@/types/publication"
import { projects } from "@/lib/academic-content"
import { Badge } from "@/components/ui/badge"
import { ScientificText } from "@/components/ui/scientific-text"
import { downloadText } from "@/lib/utils"
import { Row } from "@/components/ui/row"
import { useLanguage } from "@/lib/i18n-context"
import { useCopyFeedback } from "@/hooks/use-copy-feedback"

export interface PublicationCardProps {
  publication: PublicationRecord
  compact?: boolean
}

type MicroLink = {
  label: string
  href: string
}

type OptionalPublicationFields = PublicationRecord & {
  codeUrl?: string
  datasetUrl?: string
  zenodoUrl?: string
  huggingfaceUrl?: string
  githubUrl?: string
  links?: readonly { readonly label: string; readonly href: string }[]
}

function classifyArtifactLink(label: string, href: string, isDe: boolean): string | null {
  const lowerHref = href.toLowerCase()
  const lowerLabel = label.toLowerCase()

  if (lowerHref.includes("github.com") || lowerLabel.includes("github") || lowerLabel === "repository") {
    return "GitHub"
  }
  if (lowerHref.includes("zenodo") || lowerLabel.includes("zenodo") || lowerLabel === "code doi") {
    return "Zenodo"
  }
  if (lowerHref.includes("huggingface.co/datasets") || lowerLabel.includes("dataset")) {
    return isDe ? "Datensatz" : "HuggingFace Dataset"
  }
  if (lowerHref.includes("huggingface") || lowerHref.includes("10.57967/hf") || lowerLabel.includes("model")) {
    return "HuggingFace"
  }
  return null
}

function collectArtifactLinks(publication: OptionalPublicationFields, isDe: boolean): MicroLink[] {
  const collected: MicroLink[] = []
  const seenHrefs = new Set<string>()

  const pushLink = (label: string, href?: string) => {
    if (!href) return
    const trimmed = href.trim()
    if (!trimmed || seenHrefs.has(trimmed)) return
    seenHrefs.add(trimmed)
    collected.push({ label, href: trimmed })
  }

  pushLink("GitHub", publication.githubUrl)
  pushLink("Zenodo", publication.zenodoUrl)
  pushLink("HuggingFace", publication.huggingfaceUrl)
  pushLink("Code", publication.codeUrl)
  pushLink(isDe ? "Datensatz" : "Dataset", publication.datasetUrl)

  if (Array.isArray(publication.links)) {
    publication.links.forEach((lnk) => {
      const mapped = classifyArtifactLink(lnk.label, lnk.href, isDe)
      pushLink(mapped ?? lnk.label, lnk.href)
    })
  }

  if (Array.isArray(publication.relatedProjects)) {
    publication.relatedProjects.forEach((projectId) => {
      const project = projects.find((p) => p.id === projectId)
      if (!project) return

      pushLink("GitHub", project.github)
      pushLink("Zenodo", project.zenodo)
      pushLink("HuggingFace", project.huggingface)
      pushLink(isDe ? "Datensatz" : "HuggingFace Dataset", project.huggingfaceDataset)

      project.links?.forEach((lnk) => {
        const mapped = classifyArtifactLink(lnk.label, lnk.href, isDe)
        if (mapped) {
          pushLink(mapped, lnk.href)
        }
      })
    })
  }

  return collected
}

export function PublicationCard({ publication, compact = false }: PublicationCardProps) {
  const [showAbstract, setShowAbstract] = useState(false)
  const { copied: copiedBibtex, copy } = useCopyFeedback(2200)
  const { t, lang } = useLanguage()
  const isDe = lang === "de"

  const handleDownloadRis = () => {
    downloadText(
      publication.ris,
      `${publication.id}.ris`,
      "application/x-research-info-systems"
    )
  }

  const doiHref = publication.doi
    ? publication.url && !publication.url.includes("arxiv.org")
      ? publication.url
      : `https://doi.org/${publication.doi}`
    : undefined

  const artifactLinks = collectArtifactLinks(publication as OptionalPublicationFields, isDe)

  return (
    <Row aria-label={publication.title}>
      <div className="space-y-1.5 w-full">
        <h3 className="text-[15px] font-semibold leading-snug text-foreground break-words w-full">
          <ScientificText text={publication.title} />
        </h3>

        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          <span className="text-muted-foreground tabular-nums">
            {[publication.venue, publication.year].filter(Boolean).join(", ")}
          </span>
          {publication.badges?.map((badge) => {
            const b = badge.toLowerCase()
            const translatedBadge = isDe
              ? b.includes("topical review")
                ? "Übersichtsartikel"
                : b.includes("invited")
                  ? "Eingeladener Beitrag"
                  : b.includes("featured")
                    ? "Ausgewählt"
                    : badge
              : badge
            return (
              <Badge key={badge} variant="published">
                {translatedBadge}
              </Badge>
            )
          })}
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
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

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-0.5 text-xs">
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
          {doiHref && (
            <a
              href={doiHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-secondary"
            >
              {t.ui.doi}
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                aria-hidden="true"
              />
            </a>
          )}
          {publication.arxiv && (
            <a
              href={`https://arxiv.org/abs/${publication.arxiv}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-secondary"
            >
              arXiv:{publication.arxiv}
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                aria-hidden="true"
              />
            </a>
          )}
          {publication.pdfUrl && (
            <a
              href={publication.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-secondary"
            >
              {t.ui.pdf}
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                aria-hidden="true"
              />
            </a>
          )}

          {artifactLinks.map((item) => (
            <a
              key={`${item.label}-${item.href}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-secondary"
            >
              {item.label}
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                aria-hidden="true"
              />
            </a>
          ))}

          <button
            type="button"
            onClick={() => copy(publication.bibtex)}
            className="btn-secondary"
            title={isDe ? "BibTeX kopieren" : "Copy BibTeX"}
          >
            {copiedBibtex ? (
              <Check className="h-3 w-3 text-accent" aria-hidden="true" />
            ) : (
              <Copy className="h-3 w-3" aria-hidden="true" />
            )}
            <span aria-live="polite">
              {copiedBibtex ? t.ui.copiedBibtex : t.ui.bibtex}
            </span>
          </button>

          {!compact && (
            <button
              type="button"
              onClick={handleDownloadRis}
              className="btn-secondary"
              title={isDe ? "RIS-Eintrag herunterladen" : "Download RIS record"}
            >
              <Download className="h-3 w-3" aria-hidden="true" />
              {t.ui.ris}
            </button>
          )}
        </div>

        {!compact && publication.abstract && (
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

      {!compact && publication.abstract && (
        <div
          id={`abstract-${publication.id}`}
          role="region"
          aria-label={t.ui.abstract}
          hidden={!showAbstract}
          className="mt-3 border-t border-border/50 pt-3"
        >
          <p className="border-s-2 border-accent/45 ps-3.5 text-[13px] leading-relaxed text-muted-foreground">
            <ScientificText text={publication.abstract} />
          </p>
        </div>
      )}
    </Row>
  )
}
