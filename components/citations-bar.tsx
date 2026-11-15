"use client"

import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { socialLinks } from "@/lib/social-links"

export type ScholarMetricsInput = {
  citations: { all: number; since2021: number }
  hIndex: { all: number; since2021: number }
  i10Index: { all: number; since2021: number }
  fetchedAt: string
}

const OPENALEX_FALLBACK_URL = "https://openalex.org/authors/A5119839816"

function formatFetchedAt(iso: string, lang: "en" | "de"): string {
  if (!iso) return ""
  try {
    return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-US", {
      year: "numeric",
      month: "short",
      timeZone: "UTC",
    }).format(new Date(iso))
  } catch {
    return ""
  }
}

export function CitationsBar({
  scholar,
  publicationsCount,
}: {
  scholar: ScholarMetricsInput
  publicationsCount?: number
}) {
  const { lang } = useLanguage()
  const isDe = lang === "de"
  const formattedDate = formatFetchedAt(scholar.fetchedAt, lang)

  const openAlexUrl =
    "openalex" in socialLinks && typeof socialLinks.openalex === "string" && socialLinks.openalex
      ? socialLinks.openalex
      : OPENALEX_FALLBACK_URL

  const totalCitations = scholar.citations?.all ?? 0
  const hasPubs = typeof publicationsCount === "number" && publicationsCount > 0
  const hasCitations = totalCitations > 0

  const summaryParts: string[] = []
  if (hasPubs) {
    summaryParts.push(
      isDe
        ? `${publicationsCount} ${publicationsCount === 1 ? "Publikation" : "Publikationen"}`
        : `${publicationsCount} ${publicationsCount === 1 ? "publication" : "publications"}`
    )
  }
  if (hasCitations) {
    summaryParts.push(
      isDe
        ? `${totalCitations} ${totalCitations === 1 ? "Zitation" : "Zitationen"}`
        : `${totalCitations} ${totalCitations === 1 ? "citation" : "citations"}`
    )
  }

  const indexLinks = [
    { label: "Google Scholar", href: socialLinks.scholar },
    { label: "ORCID", href: socialLinks.orcid },
    { label: "OpenAlex", href: openAlexUrl },
    { label: "Semantic Scholar", href: socialLinks.semanticScholar },
  ].filter((item) => Boolean(item.href))

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border/70 py-3 text-xs text-muted-foreground">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {summaryParts.length > 0 ? (
          <span className="text-foreground/85">{summaryParts.join(" · ")}</span>
        ) : (
          <span>{isDe ? "Bibliografische Nachweise" : "Scholarly index profiles"}</span>
        )}
        {formattedDate && (
          <span className="text-[11px] text-muted-foreground">
            ({isDe ? `Stand ${formattedDate}` : `indexed ${formattedDate}`})
          </span>
        )}
      </div>

      <nav aria-label={isDe ? "Wissenschaftliche Profile" : "Scholarly indexes"} className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {indexLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-accent hover:text-accent-strong hover:underline transition-colors"
          >
            {item.label}
            <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
          </a>
        ))}
      </nav>
    </div>
  )
}
