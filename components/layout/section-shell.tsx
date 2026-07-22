"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"

export interface SectionShellProps {
  label: string
  href?: string
  linkLabel?: string
  alt?: boolean
  children: React.ReactNode
  id?: string
  i18nKey?: keyof typeof import("@/lib/i18n").translations["en"]["sections"]
}

export function SectionShell({
  label,
  href,
  linkLabel = "View details",
  alt = false,
  children,
  id,
  i18nKey,
}: SectionShellProps) {
  const { t } = useLanguage()

  const displayLabel = i18nKey && t.sections[i18nKey] ? t.sections[i18nKey] : label

  return (
    <section id={id} className={`border-t border-border${alt ? " bg-surface" : ""}`}>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-6 md:grid-cols-[13rem_minmax(0,1fr)] lg:px-8">
        <div className="md:sticky md:top-20 md:self-start">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {displayLabel}
          </h2>
          {href && (
            <Link href={href} className="mt-3 btn-secondary">
              {linkLabel}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}
