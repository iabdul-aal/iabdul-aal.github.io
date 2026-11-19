"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

export interface PageHeaderProps {
  eyebrow: string
  title: string
  description?: string
  actions?: React.ReactNode
  maxWidth?: "3xl" | "4xl" | "5xl"
  i18nKey?: "about" | "research" | "pub" | "tools" | "materials" | "cv"
  noBorder?: boolean
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  maxWidth = "3xl",
  i18nKey,
  noBorder = false,
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
      displayDescription = t.headers.aboutDesc
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
    <section
      className={cn(
        "container-layout pt-12 pb-8 sm:pt-14 sm:pb-9 md:pt-16 md:pb-10 min-w-0 w-full",
        !noBorder && "border-b border-border/70 mb-8 sm:mb-10"
      )}
    >
      <div className={cn(maxWidthClass, "min-w-0 w-full")}>
        <p className="eyebrow-label">{displayEyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold leading-[1.18] text-balance text-foreground md:text-4xl break-words min-w-0 w-full">
          {displayTitle}
        </h1>
        {displayDescription && (
          <p className="mt-4 max-w-[64ch] text-[15px] leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-7.5 break-words min-w-0 w-full">
            {displayDescription}
          </p>
        )}
        {actions && <div className="mt-7 flex flex-wrap gap-3 min-w-0 w-full">{actions}</div>}
      </div>
    </section>
  )
}
