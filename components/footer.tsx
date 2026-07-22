"use client"

import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"
import { identity, navigationItems, profileLinks } from "@/lib/academic-content"
import { useLanguage } from "@/lib/i18n-context"
import { LanguageToggle } from "@/components/ui/language-toggle"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  const getNavLabel = (href: string, defaultLabel: string) => {
    const key = href.replace("/", "") as keyof typeof t.nav
    return t.nav[key] || defaultLabel
  }

  return (
    <footer className="mt-16 sm:mt-24 border-t border-border bg-surface">
      <div className="container-layout grid gap-8 py-8 md:gap-10 md:py-10 md:grid-cols-3">
        <section>
          <h2 className="text-sm font-semibold text-foreground">{identity.name}</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{t.identity.compactStatement}</p>
          <a
            href={`mailto:${identity.email}`}
            className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:text-accent-strong"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {identity.email}
          </a>
        </section>

        <section className="md:justify-self-center">
          <h2 className="text-sm font-semibold text-foreground">{t.sections.sections}</h2>
          <div className="mt-3 grid gap-2 text-sm">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
                {getNavLabel(item.href, item.label)}
              </Link>
            ))}
          </div>
        </section>

        <section className="md:justify-self-end">
          <h2 className="text-sm font-semibold text-foreground">{t.sections.profiles}</h2>

          <div className="mt-3 grid gap-2 text-sm">
            {profileLinks.filter((l) => l.external).map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
              >
                {item.label}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="mt-4 pt-2">
            <LanguageToggle />
          </div>
        </section>
      </div>

      <div className="border-t border-border">
        <div className="container-layout py-4 text-xs text-muted-foreground">
          © {currentYear} {identity.name}. {t.sections.footerCopyright}
        </div>
      </div>
    </footer>
  )
}
