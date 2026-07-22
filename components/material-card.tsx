"use client"

import * as React from "react"
import { ArrowUpRight, Download } from "lucide-react"
import { Row } from "@/components/ui/row"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n-context"

export interface MaterialItem {
  id: string
  type: "slide" | "summary" | "roadmap" | "template" | "article" | "talk"
  categoryLabel: string
  title: string
  year: string
  date?: string
  description?: string
  formatLabel: string
  url: string
  isDownload?: boolean
  event?: string
  source?: string
}

export interface MaterialCardProps {
  item: MaterialItem
}

const germanFormatLabelMap: Record<string, string> = {
  "Medium Article": "Medium-Artikel",
  "Session": "Vortrag",
  "Technical Talk": "Technischer Vortrag",
  "Featured Public Talk": "Ausgewählter öffentlicher Vortrag",
}

const germanEventMap: Record<string, string> = {
  "Featured Public Talk": "Ausgewählter öffentlicher Vortrag",
  "Public Sessions": "Öffentliche Vorträge",
}

const germanDescriptionMap: Record<string, string> = {
  "Presentation slides, lecture decks, and seminar visual materials.":
    "Präsentationsfolien, Vorlesungsunterlagen und visuelle Seminarmaterialien.",
  "Technical notes, executive summaries, and condensed literature reviews.":
    "Technische Notizen, Zusammenfassungen und komprimierte Literaturübersichten.",
  "Structured learning paths, field overviews, and topic reading guides.":
    "Strukturierte Lernpfade, Fachgebietsübersichten und Leseempfehlungen.",
  "Clean document, slide deck, and presentation templates for academic workflows.":
    "Vorlagen für Dokumente, Folien und Präsentationen im akademischen Workflow.",
}

export function MaterialCard({ item }: MaterialCardProps) {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"

  const formatLabel = isDe ? germanFormatLabelMap[item.formatLabel] || item.formatLabel : item.formatLabel
  const eventText = isDe && item.event ? germanEventMap[item.event] || item.event : item.event
  const descriptionText = isDe && item.description ? germanDescriptionMap[item.description] || item.description : item.description

  return (
    <Row aria-label={item.title}>
      <div className="space-y-1.5 w-full">
        {/* Title */}
        <h3 className="text-base font-semibold leading-snug text-foreground break-words w-full">
          {item.title}
        </h3>

        {/* Date, Category, Format Badge */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          <span className="text-muted-foreground">
            {item.date ? formatDate(item.date, "short") : item.year}
          </span>
          <Badge variant="custom">{formatLabel}</Badge>
        </div>

        {/* Description */}
        {descriptionText && (
          <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
            {descriptionText}
          </p>
        )}

        {/* Event & Source metadata */}
        {eventText && (
          <p className="text-xs text-muted-foreground/90 leading-relaxed">
            <span className="font-semibold text-foreground">{isDe ? "Veranstaltung:" : "Event:"} </span>
            {eventText}
            {item.source ? ` (${item.source})` : ""}
          </p>
        )}
      </div>

      {/* Action Links */}
      {item.url && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs pt-1">
          <a
            href={item.url}
            target={item.isDownload ? undefined : "_blank"}
            rel={item.isDownload ? undefined : "noreferrer"}
            download={item.isDownload ? true : undefined}
            className="btn-secondary"
          >
            {item.isDownload ? (isDe ? "Herunterladen" : "Download") : t.ui.source}
            {item.isDownload ? (
              <Download className="h-3 w-3" aria-hidden="true" />
            ) : (
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            )}
          </a>
        </div>
      )}
    </Row>
  )
}
