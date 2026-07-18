import * as React from "react"

export interface PageHeaderProps {
  eyebrow: string
  title: string
  description?: string
  actions?: React.ReactNode
  maxWidth?: "3xl" | "4xl" | "5xl"
}

export function PageHeader({ eyebrow, title, description, actions, maxWidth = "3xl" }: PageHeaderProps) {
  const maxWidthClass = {
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
  }[maxWidth]

  return (
    <section className="mx-auto max-w-6xl px-5 pt-10 pb-6 sm:px-6 md:pt-14 md:pb-8 lg:px-8">

      <div className={maxWidthClass}>
        <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            {description}
          </p>
        )}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  )
}
