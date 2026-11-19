"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { TranslationSchema } from "@/lib/i18n"

export interface SectionShellProps {
  label: string
  href?: string
  linkLabel?: string
  i18nLinkLabel?: keyof TranslationSchema["ui"]
  alt?: boolean
  children: React.ReactNode
  id?: string
  i18nKey?: keyof TranslationSchema["sections"]
}

const germanLinkLabels: Record<string, string> = {
  "Full overview": "Vollständige Übersicht",
  "All publications": "Alle Publikationen",
  "All tools": "Alle Werkzeuge",
  "View details": "Details anzeigen",
}

export function SectionShell({
  label,
  href,
  linkLabel = "View details",
  i18nLinkLabel,
  alt = false,
  children,
  id,
  i18nKey,
}: SectionShellProps) {
  const { lang, t } = useLanguage()

  const displayLabel = i18nKey && t.sections[i18nKey] ? t.sections[i18nKey] : label

  let displayLinkLabel = linkLabel
  if (i18nLinkLabel && t.ui[i18nLinkLabel]) {
    displayLinkLabel = t.ui[i18nLinkLabel]
  } else if (lang === "de") {
    displayLinkLabel = germanLinkLabels[linkLabel] || linkLabel
  }

  return (
    <section id={id} className={`border-t border-border/80${alt ? " bg-surface" : ""}`}>
      <div className="container-layout grid gap-8 py-12 md:grid-cols-[13.5rem_minmax(0,1fr)] md:py-16">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="mb-3 h-px w-6 bg-accent/65" aria-hidden="true" />
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {displayLabel}
          </h2>
          {href && (
            <Link href={href} className="group mt-3 btn-secondary">
              {displayLinkLabel}
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                aria-hidden="true"
              />
            </Link>
          )}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}
