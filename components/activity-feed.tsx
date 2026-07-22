"use client"

import { Badge } from "@/components/ui/badge"
import { Row } from "@/components/ui/row"
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
  talk: "Vortrag",
  article: "Artikel",
}

export function ActivityFeed({ items, limit = 4 }: ActivityFeedProps) {
  const { lang } = useLanguage()
  const visibleItems = items.slice(0, limit)

  if (visibleItems.length === 0) {
    return null
  }

  const getLabel = (type: string) => {
    if (lang === "de") {
      return germanActivityLabels[type] ?? type
    }
    return activityTypeLabel[type] ?? type
  }

  return (
    <div className="list-container">
      {visibleItems.map((item) => (
        <Row key={`${item.date_iso}-${item.title}`} variant="grid" className="sm:grid-cols-[5.5rem_minmax(0,1fr)]">
          <p className="text-xs text-muted-foreground pt-0.5">{formatDate(item.date_iso || item.date)}</p>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="custom">{getLabel(item.type)}</Badge>
            </div>
            <h3 className="font-medium text-sm text-foreground">{item.title}</h3>
            <p className="mt-1 text-xs leading-6 text-muted-foreground">{item.detail}</p>
          </div>
        </Row>
      ))}
    </div>
  )
}
