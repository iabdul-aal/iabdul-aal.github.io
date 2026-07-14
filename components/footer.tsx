import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"
import { identity, navigationItems } from "@/lib/academic-content"
import { socialLinks } from "@/lib/social-links"

const profileLinks = [
  { label: "ORCID", href: socialLinks.orcid },
  { label: "Google Scholar", href: socialLinks.scholar },
  { label: "GitHub", href: socialLinks.github },
  { label: "ResearchGate", href: socialLinks.researchGate },
] as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
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

        <section>
          <h2 className="text-sm font-semibold text-foreground">Sections</h2>
          <div className="mt-3 grid gap-2 text-sm">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-foreground">Profiles</h2>
          <div className="mt-3 grid gap-2 text-sm">
            {profileLinks.map((item) => (
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
        <div className="mx-auto max-w-6xl px-5 py-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {currentYear} {identity.name}. Research profile and selected academic work.
        </div>
      </div>
    </footer>
  )
}
