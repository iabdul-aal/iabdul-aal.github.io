"use client"

import * as React from "react"
import { ArrowUpRight, Download } from "lucide-react"
import { Row } from "@/components/ui/row"
import { Badge } from "@/components/ui/badge"
import { ScientificText } from "@/components/ui/scientific-text"
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
  Session: "Vortrag",
  "Technical Talk": "Technischer Vortrag",
  "Featured Public Talk": "Ausgewählter öffentlicher Vortrag",
}

const germanEventMap: Record<string, string> = {
  "Featured Public Talk": "Ausgewählter öffentlicher Vortrag",
  "Public Sessions": "Öffentliche Vorträge",
}

const germanDescriptionMap: Record<string, string> = {
  "Lecture decks, seminar slides, and presentation materials.":
    "Vorlesungsfolien, Seminarunterlagen und Präsentationsmaterialien.",
  "Concise write-ups and notes summarizing dense literature or methodologies.":
    "Kompakte Ausarbeitungen und Notizen zu Fachliteratur und Methoden.",
  "Structured self-study pathways for photonics and scientific computing.":
    "Strukturierte Lernpfade für Photonik und wissenschaftliches Rechnen.",
  "Reusable templates for reports, presentations, and code documentation.":
    "Wiederverwendbare Vorlagen für Berichte, Präsentationen und Codedokumentation.",
  "Structured technical roadmap covering advanced coursework, specialization tracks, and laboratory skill development in electronics and communications engineering.":
    "Strukturierter technischer Leitfaden zu fortgeschrittenen Studienmodulen, Vertiefungsrichtungen und Laborpraxis in der Elektronik und Kommunikationstechnik.",
  "Comparative overview of technical domains, research pathways, and industry specializations within electronics and communications engineering.":
    "Vergleichender Überblick über technische Fachgebiete, Forschungspfade und Spezialisierungen in der Elektronik und Kommunikationstechnik.",
  "An overview for Electronics and Communications Engineering undergraduates on core curriculum structure, technical fundamentals, and systematic academic planning.":
    "Überblick für Studierende der Elektronik und Kommunikationstechnik zu Studienaufbau, technischen Grundlagen und systematischer Studienplanung.",
  "Foundational introduction to the Electronics and Communications Engineering discipline, its core sub-fields, and undergraduate curriculum organization.":
    "Grundlegende Einführung in das Fachgebiet Elektronik und Kommunikationstechnik, seine Teilbereiche und die Struktur des Grundstudiums.",
}

export function MaterialCard({ item }: MaterialCardProps) {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"

  const formatLabel = isDe ? germanFormatLabelMap[item.formatLabel] || item.formatLabel : item.formatLabel
  const eventText = isDe && item.event ? germanEventMap[item.event] || item.event : item.event
  const descriptionText =
    isDe && item.description ? germanDescriptionMap[item.description] || item.description : item.description

  return (
    <Row aria-label={item.title}>
      <div className="space-y-1.5 w-full">
        <h3 className="text-[15px] font-semibold leading-snug text-foreground break-words w-full">
          <ScientificText text={item.title} />
        </h3>

        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          <span className="tabular-nums text-muted-foreground">
            {item.date ? formatDate(item.date, "short", lang) : item.year}
          </span>
          <Badge variant="custom">{formatLabel}</Badge>
        </div>

        {descriptionText && (
          <p className="text-[13px] leading-relaxed text-pretty text-muted-foreground">
            <ScientificText text={descriptionText} />
          </p>
        )}

        {eventText && (
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">
              {isDe ? "Veranstaltung:" : "Event:"}{" "}
            </span>
            {eventText}
            {item.source ? ` (${item.source})` : ""}
          </p>
        )}
      </div>

      {item.url && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-0.5 text-xs">
          <a
            href={item.url}
            target={item.isDownload ? undefined : "_blank"}
            rel={item.isDownload ? undefined : "noopener noreferrer"}
            download={item.isDownload ? true : undefined}
            className="group btn-secondary"
          >
            {item.isDownload ? (isDe ? "Herunterladen" : "Download") : t.ui.source}
            {item.isDownload ? (
              <Download className="h-3 w-3" aria-hidden="true" />
            ) : (
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                aria-hidden="true"
              />
            )}
          </a>
        </div>
      )}
    </Row>
  )
}
