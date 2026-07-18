"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className="inline-flex items-center gap-1 text-xs text-muted-foreground"
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cn(
          "transition-colors hover:text-foreground px-1 py-0.5",
          lang === "en" ? "font-semibold text-foreground" : "text-muted-foreground/60"
        )}
      >
        EN
      </button>
      <span className="text-muted-foreground/30 select-none">/</span>
      <button
        type="button"
        onClick={() => setLang("de")}
        aria-pressed={lang === "de"}
        className={cn(
          "transition-colors hover:text-foreground px-1 py-0.5",
          lang === "de" ? "font-semibold text-foreground" : "text-muted-foreground/60"
        )}
      >
        DE
      </button>
    </div>
  )
}
