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
  const { t } = useLanguage()
  const defaultPlaceholder = placeholder || t.ui.searchPlaceholder

  return (
    <div className={cn("relative w-full", className)}>
      <Search className="absolute top-3 start-3 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
      <input
        type="search"
        aria-label={ariaLabel ?? defaultPlaceholder}
        placeholder={defaultPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-border/80 bg-card ps-9 pe-9 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-1 focus:ring-accent/80 shadow-2xs"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-3 end-3 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
