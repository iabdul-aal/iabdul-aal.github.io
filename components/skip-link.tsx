"use client"

import { useLanguage } from "@/lib/i18n-context"

export function SkipLink() {
  const { lang } = useLanguage()
  const isDe = lang === "de"

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:shadow-sm"
    >
      {isDe ? "Direkt zum Inhalt" : "Skip to main content"}
    </a>
  )
}
