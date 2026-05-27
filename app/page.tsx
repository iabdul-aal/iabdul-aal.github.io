import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PublicationsList } from "@/components/publications-list"
import { identity, profileLinks, projects, recentActivity, researchThemes } from "@/lib/academic-content"
import { loadPublications } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: siteConfig.title,
  description: identity.statement,
  path: "/",
})

export default async function Home() {
  const publications = await loadPublications()
  const selectedProjects = projects.slice(0, 2)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: siteConfig.title,
    url: siteConfig.url,
    about: {
      "@type": "Person",
      name: identity.name,
    },
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-6 md:grid-cols-[minmax(0,1fr)_11rem] md:items-start md:py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">{identity.shortTitle}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-balance text-foreground md:text-5xl">
            {identity.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{identity.statement}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {profileLinks.map((link) =>
              link.external ? (
                <Button key={link.label} asChild variant="outline">
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </Button>
              ) : (
                <Button key={link.label} asChild variant={link.label === "CV" ? "default" : "outline"}>
                  <Link href={link.href}>
                    {link.label}
                    {link.label === "CV" ? <FileText aria-hidden="true" /> : null}
                  </Link>
                </Button>
              ),
            )}
          </div>
        </div>

        <div className="w-36 overflow-hidden rounded-md border border-border bg-surface md:justify-self-end">
          <Image
            src="/personal-pic.png"
            alt="Portrait of Islam I. Abdulaal"
            width={320}
            height={320}
            priority
            className="aspect-square h-auto w-full object-cover"
          />
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-6 md:grid-cols-[16rem_minmax(0,1fr)] lg:px-8">
          <div>
            <p className="text-sm font-semibold text-foreground">Research Summary</p>
          </div>
          <div className="max-w-3xl">
            <p className="text-base leading-8 text-muted-foreground">
              My work is organized around integrated nanophotonics, nonlinear and quantum photonics,
              physics-informed computational methods, inverse design, and photonic system modeling. The emphasis is on
              connecting device physics to computational workflows that remain interpretable and reproducible.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {researchThemes.slice(0, 4).map((theme) => (
                <Link
                  key={theme.title}
                  href="/research"
                  className="rounded-md border border-border bg-card p-4 text-sm transition-colors hover:border-accent"
                >
                  <span className="font-medium text-foreground">{theme.title}</span>
                  <span className="mt-2 block leading-6 text-muted-foreground">{theme.problem}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[16rem_minmax(0,1fr)]">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Selected Projects</h2>
            <Link href="/projects" className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-strong">
              View all projects
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-5">
            {selectedProjects.map((project) => (
              <article key={project.title} className="rounded-md border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground">{project.status}</p>
                <h3 className="mt-2 text-xl font-semibold leading-7 text-foreground">{project.title}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{project.objective}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 md:grid-cols-[16rem_minmax(0,1fr)] lg:px-8">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Selected Publication</h2>
            <Link
              href="/publications"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-strong"
            >
              Publications
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <PublicationsList publications={publications.slice(0, 1)} compact />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 md:grid-cols-[16rem_minmax(0,1fr)] lg:px-8">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {recentActivity.map((item) => (
            <article key={`${item.date}-${item.title}`} className="grid gap-3 py-5 sm:grid-cols-[5rem_minmax(0,1fr)]">
              <p className="text-sm text-muted-foreground">{item.date}</p>
              <div>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
