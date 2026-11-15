"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()
  const isDe = lang === "de"

  return (
    <div
      className="inline-flex items-center gap-1 text-xs text-muted-foreground"
      role="group"
      aria-label={isDe ? "Sprachauswahl" : "Language selection"}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cn(
          "touch-target transition-colors hover:text-foreground px-1.5 py-0.5",
          lang === "en" ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <span className="text-muted-foreground/50 select-none">/</span>
      <button
        type="button"
        onClick={() => setLang("de")}
        aria-pressed={lang === "de"}
        className={cn(
          "touch-target transition-colors hover:text-foreground px-1.5 py-0.5",
          lang === "de" ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        DE
      </button>
    </div>
  )
}
