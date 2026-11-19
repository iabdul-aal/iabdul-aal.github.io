"use client"

import * as React from "react"
import { useId } from "react"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"

export interface FilterSelectOption {
  value: string
  label: string
}

export interface FilterSelectProps {
  label?: string
  value: string
  options: FilterSelectOption[]
  onChange: (value: string) => void
  showIcon?: boolean
}

export function FilterSelect({
  label,
  value,
  options,
  onChange,
  showIcon = false,
}: FilterSelectProps) {
  const id = useId()
  const { t, lang } = useLanguage()

  const translateOptionLabel = (optLabel: string) => {
    if (optLabel === "All Years") return t.ui.allYears
    if (optLabel === "All Topics") return t.ui.allTopics
    if (optLabel === "All Types") return t.ui.allTypes
    if (optLabel === "All Formats") return t.ui.allFormats
    if (optLabel === "All Categories") return t.ui.allCategories
    return optLabel
  }

  const translateLabel = (lbl?: string) => {
    if (!lbl || lang !== "de") return lbl
    const map: Record<string, string> = {
      "Year:": "Jahr:",
      "Topic:": "Thema:",
      "Filter:": "Filter:",
      "Format:": "Format:",
      "Type:": "Typ:",
      "Tier:": "Kategorie:",
      "Category:": "Kategorie:",
    }
    return map[lbl] ?? lbl
  }

  return (
    <div className="flex items-center gap-2 max-w-full min-w-0">
      {label && (
        <label
          htmlFor={id}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 text-xs font-medium text-muted-foreground"
        >
          {showIcon && <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground/80" aria-hidden="true" />}
          {translateLabel(label)}
        </label>
      )}
      <div className="relative min-w-0 max-w-full">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8.5 max-w-full min-w-0 appearance-none truncate rounded-md border border-border bg-card ps-2.5 pe-7 text-xs font-medium text-foreground outline-none transition-colors duration-150 hover:border-accent/60 focus:border-accent focus:ring-1 focus:ring-accent/60"
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-card text-card-foreground"
            >
              {translateOptionLabel(opt.label)}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute end-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
