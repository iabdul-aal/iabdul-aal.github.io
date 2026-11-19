"use client"

import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"
import { identity, navigationItems, profileLinks } from "@/lib/academic-content"
import { useLanguage } from "@/lib/i18n-context"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export interface FooterProps {
  lastUpdated?: string
}

export function Footer({ lastUpdated }: FooterProps) {
  const currentYear = lastUpdated ? Number(lastUpdated.slice(0, 4)) : new Date().getFullYear()
  const { t, lang } = useLanguage()

  const formattedLastUpdated = lastUpdated
    ? new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${lastUpdated}T00:00:00Z`))
    : null

  const getNavLabel = (href: string, defaultLabel: string) => {
    const key = href.replace("/", "") as keyof typeof t.nav
    return t.nav[key] || defaultLabel
  }

  return (
    <footer className="mt-16 border-t border-border bg-surface sm:mt-24">
      <div className="container-layout grid gap-10 py-10 md:grid-cols-3 md:py-12">
        <section>
          <h2 className="text-sm font-semibold text-foreground">{identity.name}</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            {t.identity.compactStatement}
          </p>
          <a
            href={`mailto:${identity.email}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-strong hover:underline underline-offset-4"
          >
            <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {identity.email}
          </a>
        </section>

        <section className="md:justify-self-center">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {t.sections.sections}
          </h2>
          <div className="mt-3.5 grid gap-2 text-sm">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {getNavLabel(item.href, item.label)}
              </Link>
            ))}
          </div>
        </section>

        <section className="md:justify-self-end">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {t.sections.profiles}
          </h2>

          <div className="mt-3.5 grid gap-2 text-sm">
            {profileLinks
              .filter((l) => l.external)
              .map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                    aria-hidden="true"
                  />
                </a>
              ))}
          </div>

          <div className="mt-5 flex items-center gap-2 border-t border-border/60 pt-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </section>
      </div>

      <div className="border-t border-border/80">
        <div className="container-layout flex flex-col gap-1.5 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {currentYear} {identity.name}. {t.sections.footerCopyright}
          </span>
          {formattedLastUpdated && (
            <span className="tabular-nums">
              {t.ui.lastUpdated}: {formattedLastUpdated}
            </span>
          )}
        </div>
      </div>
    </footer>
  )
}
