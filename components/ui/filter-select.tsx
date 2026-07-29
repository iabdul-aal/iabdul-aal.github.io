"use client"

import * as React from "react"
import { useId } from "react"
import { SlidersHorizontal } from "lucide-react"
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

export function FilterSelect({ label, value, options, onChange, showIcon = false }: FilterSelectProps) {
  const id = useId()
  const { t } = useLanguage()

  const translateOptionLabel = (optLabel: string) => {
    if (optLabel === "All Years") return t.ui.allYears
    if (optLabel === "All Topics") return t.ui.allTopics
    if (optLabel === "All Types") return t.ui.allTypes
    if (optLabel === "All Formats") return t.ui.allFormats
    return optLabel
  }

  const translateLabel = (lbl?: string) => {
    if (!lbl) return lbl
    if (t.ui?.allYears === "Alle Jahre") {
      if (lbl === "Year:") return "Jahr:"
      if (lbl === "Topic:") return "Thema:"
      if (lbl === "Filter:") return "Filter:"
      if (lbl === "Format:") return "Format:"
      if (lbl === "Type:") return "Typ:"
      if (lbl === "Tier:") return "Kategorie:"
    }
    return lbl
  }

  return (
    <div className="flex items-center gap-2 max-w-full min-w-0">
      {label && (
        <label
          htmlFor={id}
          className="text-muted-foreground font-medium flex items-center gap-1 cursor-pointer shrink-0 text-xs"
        >
          {showIcon && <SlidersHorizontal className="h-3 w-3" aria-hidden="true" />}
          {translateLabel(label)}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-border bg-card px-2 py-1 text-[11px] font-medium text-foreground outline-none transition-colors focus:border-accent max-w-full min-w-0 truncate"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {translateOptionLabel(opt.label)}
          </option>
        ))}
      </select>
    </div>
  )
}
