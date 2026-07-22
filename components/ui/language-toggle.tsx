"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n-context"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className="inline-flex items-center rounded-md border border-border/80 bg-surface/60 p-0.5 text-xs"
      role="group"
      aria-label="Language selection"
    >
      <Globe className="ms-1.5 me-1 h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
          lang === "en"
            ? "bg-accent text-accent-foreground font-semibold shadow-2xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("de")}
        aria-pressed={lang === "de"}
        className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
          lang === "de"
            ? "bg-accent text-accent-foreground font-semibold shadow-2xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        DE
      </button>
    </div>
  )
}
