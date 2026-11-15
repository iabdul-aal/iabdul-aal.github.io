"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n-context"

export interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  ariaLabel?: string
}

export function SearchInput({ value, onChange, placeholder, className, ariaLabel }: SearchInputProps) {
  const { t, lang } = useLanguage()
  const defaultPlaceholder = placeholder || t.ui.searchPlaceholder

  return (
    <div className={cn("relative w-full", className)}>
      <Search className="pointer-events-none absolute top-1/2 start-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <input
        type="search"
        aria-label={ariaLabel ?? defaultPlaceholder}
        placeholder={defaultPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-md border border-border bg-card ps-9 pe-11 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-200 focus:border-accent focus:ring-1 focus:ring-accent/80 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="touch-target absolute inset-y-0 end-0 flex w-11 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          aria-label={lang === "de" ? "Suche leeren" : "Clear search"}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
