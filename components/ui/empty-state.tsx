"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n-context"

export interface EmptyStateProps {
  message?: string
}

export function EmptyState({ message }: EmptyStateProps) {
  const { lang } = useLanguage()
  const fallback =
    lang === "de"
      ? "Einträge werden angezeigt, sobald sie veröffentlicht sind."
      : "Items will appear as they are published."

  return (
    <div role="status" aria-live="polite" className="py-8 text-center">
      <p className="text-sm text-muted-foreground">{message ?? fallback}</p>
    </div>
  )
}
