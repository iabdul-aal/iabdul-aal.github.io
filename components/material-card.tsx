import * as React from "react"
import { ArrowUpRight, Download } from "lucide-react"
import { Row } from "@/components/ui/row"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

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

export function MaterialCard({ item }: MaterialCardProps) {
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
          <Badge variant="custom">{item.formatLabel}</Badge>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
            {item.description}
          </p>
        )}

        {/* Event & Source metadata */}
        {item.event && (
          <p className="text-xs text-muted-foreground/90 leading-relaxed">
            <span className="font-semibold text-foreground">Event: </span>
            {item.event}
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
            {item.isDownload ? "Download" : "Source"}
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
