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

function formatFetchedAt(iso: string): string {
  if (!iso) return ""
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso))
  } catch {
    return ""
  }
}

export function CitationsBar({ scholar }: { scholar: ScholarMetricsInput }) {
  const { lang } = useLanguage()
  const isDe = lang === "de"
  const formattedDate = formatFetchedAt(scholar.fetchedAt)

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3 border-b border-border/70 text-xs">
      {/* Citation Metrics on One Line */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-base font-bold text-foreground tabular-nums">{scholar.citations.all}</span>
        <span className="text-xs text-muted-foreground">{isDe ? "Zitationen" : "Citations"}</span>
        <span className="text-border px-0.5">|</span>

        <span className="text-base font-bold text-foreground tabular-nums">{scholar.hIndex.all}</span>
        <span className="text-xs text-muted-foreground">{isDe ? "h-Index" : "h-index"}</span>
        <span className="text-border px-0.5">|</span>

        <span className="text-base font-bold text-foreground tabular-nums">{scholar.i10Index.all}</span>
        <span className="text-xs text-muted-foreground">{isDe ? "i10-Index" : "i10-index"}</span>
      </div>

      {/* Date & Google Scholar Link on Same Line */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
        {formattedDate && (
          <span className="text-[11px] italic">
            *{isDe ? `automatisch aktualisiert (${formattedDate})` : `auto-updated (${formattedDate})`}
          </span>
        )}
        <a
          href={socialLinks.scholar}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
        >
          Google Scholar
          <ArrowUpRight className="h-3 w-3 shrink-0" />
        </a>
      </div>
    </div>
  )
}
