"use client"

import { Badge } from "@/components/ui/badge"
import { Row } from "@/components/ui/row"
import { ScientificText } from "@/components/ui/scientific-text"
import { activityTypeLabel } from "@/lib/academic-content"
import { formatDate } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n-context"

export type ActivityItem = {
  type: string
  title: string
  detail: string
  date: string
  date_iso: string
}

export interface ActivityFeedProps {
  items: ActivityItem[]
  limit?: number
}

const germanActivityLabels: Record<string, string> = {
  paper: "Veröffentlichung",
  preprint: "Preprint",
  software: "Software",
  position: "Position",
  milestone: "Ausbildung",
  award: "Auszeichnung",
  talk: "Vortrag",
  article: "Artikel",
}

const germanActivityTranslations: Record<string, { title: string; detail: string }> = {
  "Began M.Sc. in Advanced Optical Technologies (MAOT) at FAU Erlangen-Nürnberg": {
    title: "Beginn des M.Sc. Advanced Optical Technologies (MAOT) an der FAU Erlangen-Nürnberg",
    detail:
      "Aufnahme des Masterstudiums mit Schwerpunkten in computergestützter Photonik, Lichtphysik und biomedizinischer Optik.",
  },
  "Joined Max Planck School of Photonics (Cohort 8 Study Phase)": {
    title: "Aufnahme in die Max Planck School of Photonics (Kohorte 8, Studienphase)",
    detail:
      "Ausgewählt als Promotionsstipendiat im deutschlandweiten Photonik-Graduiertenprogramm.",
  },
  "Co-initiated Optica Egypt Local Section": {
    title: "Mitgründung der Optica-Lokalsektion Ägypten",
    detail:
      "Tätigkeit als Gründungs-Vorstandsmitglied und Webmaster nach offizieller Anerkennung durch Optica.",
  },
  "Completed B.Sc. in Electronics and Communications Engineering at Alexandria University": {
    title: "Abschluss des B.Sc. in Elektronik und Kommunikationstechnik an der Universität Alexandria",
    detail:
      "Abschluss mit CGPA 3,39/4,0 und fünfmaliger Auszeichnung auf der Dekanatsliste (2021 bis 2026).",
  },
  "Joined NanoPhoto Lab, IMRE, A*STAR as a research intern": {
    title: "Forschungspraktikum am NanoPhoto Lab, IMRE, A*STAR",
    detail:
      "Durchführung von FDTD- und physikinformierten Optimierungsstudien für integrierte Quantenlichtquellen.",
  },
}

const germanDetailTranslations: Record<string, string> = {
  "Posted research preprint on Preprints.org covering nanophotonic inverse design.":
    "Forschungs-Preprint auf Preprints.org zum nanophotonischen Inversdesign veröffentlicht.",
  "Peer-reviewed article published in Journal of Optics covering nanophotonics.":
    "Peer-Review-Artikel im Journal of Optics im Bereich Nanophotonik veröffentlicht.",
  "Posted preprint manuscript on arXiv covering physics-informed scientific modeling.":
    "Preprint-Manuskript auf arXiv zur physikinformierten wissenschaftlichen Modellierung veröffentlicht.",
  "Delivered public technical orientation talk hosted by IEEE SSCS AUSC.":
    "Öffentlicher technischer Orientierungsvortrag im Rahmen der IEEE SSCS AUSC.",
  "Published introductory electronics and communications engineering article on Medium.":
    "Einführender Fachartikel zu Elektronik und Kommunikationstechnik auf Medium veröffentlicht.",
}

export function ActivityFeed({ items, limit = 4 }: ActivityFeedProps) {
  const { lang } = useLanguage()
  const isDe = lang === "de"
  const visibleItems = items.slice(0, limit)

  if (visibleItems.length === 0) {
    return null
  }

  const getLabel = (type: string) => {
    if (isDe) {
      return germanActivityLabels[type] ?? type
    }
    return activityTypeLabel[type] ?? type
  }

  return (
    <div className="list-container">
      {visibleItems.map((item) => {
        const deEntry = isDe ? germanActivityTranslations[item.title] : undefined
        const title = deEntry?.title ?? item.title
        const detail = deEntry?.detail ?? (isDe ? germanDetailTranslations[item.detail] ?? item.detail : item.detail)

        return (
          <Row
            key={`${item.date_iso}-${item.title}`}
            variant="grid"
            className="sm:grid-cols-[5.5rem_minmax(0,1fr)]"
          >
            <p className="pt-0.5 text-xs tabular-nums text-muted-foreground">
              {formatDate(item.date_iso || item.date, "short", lang)}
            </p>
            <div className="min-w-0 w-full">
              <div className="mb-1.5 flex items-center gap-2">
                <Badge variant="custom">{getLabel(item.type)}</Badge>
              </div>
              <h3 className="text-[15px] font-medium leading-snug text-foreground break-words min-w-0 w-full">
                <ScientificText text={title} />
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground break-words min-w-0 w-full">
                <ScientificText text={detail} />
              </p>
            </div>
          </Row>
        )
      })}
    </div>
  )
}
