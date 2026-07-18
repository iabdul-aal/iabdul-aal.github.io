import Image from "next/image"
import { ArrowUpRight, Mail } from "lucide-react"
import { aboutParagraphs, aboutEpigraph, aboutEpigraphAuthor, identity, profileLinks } from "@/lib/academic-content"
import { createPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: "About",
  description:
    `Research-oriented profile of ${siteConfig.name}, focused on integrated photonics.`,
  path: "/about",
})

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[13rem_minmax(0,1fr)] md:py-16 lg:px-8">
        <aside>
          <div className="w-40 overflow-hidden rounded-md border border-border bg-surface ring-2 ring-border">
            <Image
              src="/personal-pic.png"
              alt={`Portrait of ${identity.name}`}
              width={320}
              height={320}
              className="aspect-square h-auto w-full object-cover"
            />
          </div>
          <div className="mt-5 space-y-1 text-xs text-muted-foreground">
            <p className="font-semibold text-sm text-foreground">{identity.name}</p>
            {identity.affiliation && <p>{identity.affiliation}</p>}
            {identity.location && <p>{identity.location}</p>}
            <a
              href={`mailto:${identity.email}`}
              className="mt-2 inline-flex items-center gap-1.5 text-accent hover:text-accent-strong transition-colors"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {identity.email}
            </a>
          </div>
        </aside>

        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">About</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Research profile
          </h1>
          <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <figure className="mt-8 featured-rule py-2.5 px-4 text-muted-foreground text-sm max-w-2xl bg-surface/40 rounded-r-md border-l-2 border-l-accent">
            <blockquote className="italic">“{aboutEpigraph}”</blockquote>
            <figcaption className="mt-1.5 text-xs font-semibold not-italic text-foreground text-right">{aboutEpigraphAuthor}</figcaption>
          </figure>

          <div className="mt-10 border-t border-border pt-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Academic Profiles</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {profileLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="trigger-secondary-chip"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>

                ) : null,
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
