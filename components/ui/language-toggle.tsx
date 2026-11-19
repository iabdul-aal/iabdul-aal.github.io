"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()
  const isDe = lang === "de"

  return (
    <div
      className="inline-flex items-center gap-0.5 text-xs text-muted-foreground"
      role="group"
      aria-label={isDe ? "Sprachauswahl" : "Language selection"}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cn(
          "touch-target rounded px-1.5 py-1 transition-colors duration-150",
          lang === "en"
            ? "font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <span className="select-none text-muted-foreground/45" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        onClick={() => setLang("de")}
        aria-pressed={lang === "de"}
        className={cn(
          "touch-target rounded px-1.5 py-1 transition-colors duration-150",
          lang === "de"
            ? "font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        DE
      </button>
    </div>
  )
}
