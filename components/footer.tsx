import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"
import { identity, navigationItems, profileLinks } from "@/lib/academic-content"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 sm:mt-24 border-t border-border bg-surface">
      <div className="container-layout grid gap-8 py-8 md:gap-10 md:py-10 md:grid-cols-3">
        <section>
          <h2 className="text-sm font-semibold text-foreground">{identity.name}</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{identity.compactStatement}</p>
          <a
            href={`mailto:${identity.email}`}
            className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:text-accent-strong"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {identity.email}
          </a>
        </section>

        <section className="md:justify-self-center">
          <h2 className="text-sm font-semibold text-foreground">Sections</h2>
          <div className="mt-3 grid gap-2 text-sm">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="md:justify-self-end">
          <h2 className="text-sm font-semibold text-foreground">Profiles</h2>

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
        </section>
      </div>

      <div className="border-t border-border">
        <div className="container-layout py-4 text-xs text-muted-foreground">
          © {currentYear} {identity.name}. Research profile and selected academic work.
        </div>
      </div>
    </footer>

  )
}
