"use client"

import { useLanguage } from "@/lib/i18n-context"
import { identity, currentPosition } from "@/lib/academic-content"

export function HeroStatement() {
  const { lang, t } = useLanguage()

  return (
    <div className="min-w-0 w-full">
      <p className="mt-4 text-base leading-8 text-muted-foreground break-words min-w-0 w-full">
        {t.identity.statement}
      </p>

      {(identity.affiliation || identity.location) && (
        <p className="mt-2 text-xs text-muted-foreground">
          {[identity.affiliation, identity.location].filter(Boolean).join(" • ")}
        </p>
      )}

      {/* Pulsing current-position indicator */}
      <div className="mt-4 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          {lang === "de" ? t.identity.role : currentPosition}
        </span>
      </div>
    </div>
  )
}

export function HomepageResearchText() {
  const { t } = useLanguage()
  return (
    <p className="text-base leading-8 text-muted-foreground">
      {t.identity.homepageStatement}
    </p>
  )
}
