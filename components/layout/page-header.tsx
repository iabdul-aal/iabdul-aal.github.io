"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n-context"

export interface PageHeaderProps {
  eyebrow: string
  title: string
  description?: string
  actions?: React.ReactNode
  maxWidth?: "3xl" | "4xl" | "5xl"
  i18nKey?: "about" | "research" | "pub" | "tools" | "materials" | "cv"
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  maxWidth = "3xl",
  i18nKey,
}: PageHeaderProps) {
  const { t } = useLanguage()

  const maxWidthClass = {
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
  }[maxWidth]

  let displayEyebrow = eyebrow
  let displayTitle = title
  let displayDescription = description

  if (i18nKey && t.headers) {
    if (i18nKey === "about") {
      displayEyebrow = t.headers.aboutEyebrow
      displayTitle = t.headers.aboutTitle
    } else if (i18nKey === "research") {
      displayEyebrow = t.headers.researchEyebrow
      displayTitle = t.headers.researchTitle
      displayDescription = t.headers.researchDesc
    } else if (i18nKey === "pub") {
      displayEyebrow = t.headers.pubEyebrow
      displayTitle = t.headers.pubTitle
      displayDescription = t.headers.pubDesc
    } else if (i18nKey === "tools") {
      displayEyebrow = t.headers.toolsEyebrow
      displayTitle = t.headers.toolsTitle
      displayDescription = t.headers.toolsDesc
    } else if (i18nKey === "materials") {
      displayEyebrow = t.headers.materialsEyebrow
      displayTitle = t.headers.materialsTitle
      displayDescription = t.headers.materialsDesc
    } else if (i18nKey === "cv") {
      displayEyebrow = t.headers.cvEyebrow
      displayTitle = t.headers.cvTitle
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-5 pt-10 pb-6 sm:px-6 md:pt-14 md:pb-8 lg:px-8">
      <div className={maxWidthClass}>
        <p className="text-sm font-medium text-muted-foreground">{displayEyebrow}</p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground md:text-4xl">
          {displayTitle}
        </h1>
        {displayDescription && (
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            {displayDescription}
          </p>
        )}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  )
}
