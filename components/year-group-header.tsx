"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n-context"

export interface YearGroupHeaderProps {
  year: string
  count?: number
}

export function YearGroupHeader({ year, count }: YearGroupHeaderProps) {
  const { lang } = useLanguage()
  const isDe = lang === "de"
  const unit = isDe
    ? count === 1
      ? "Eintrag"
      : "Einträge"
    : count === 1
      ? "item"
      : "items"

  return (
    <h2 className="year-header">
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        {year}
      </span>
      {count !== undefined && (
        <span className="text-xs font-normal text-muted-foreground">
          {count} {unit}
        </span>
      )}
    </h2>
  )
}
