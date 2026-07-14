import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PublicationsList } from "@/components/publications-list"
import { identity, profileLinks, projects, researchThemes } from "@/lib/academic-content"
import { loadActivity } from "@/lib/activity"
import { loadPaperMetrics } from "@/lib/paper-metrics"
import { loadProjectMetrics } from "@/lib/project-metrics"
import { loadPublications } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: siteConfig.title,
  description: identity.statement,
  path: "/",
})

const activityTypeLabel: Record<string, string> = {
  paper: "Paper",
  preprint: "Preprint",
  software: "Software",
  position: "Position",
  milestone: "Education",
  talk: "Talk",
  article: "Article",
}

export default async function Home() {
  const [publications, paperMetrics, projectMetrics, activity] = await Promise.all([
    loadPublications(),
    loadPaperMetrics(),
    loadProjectMetrics(),
    loadActivity(),
  ])

  // Rank publications by citation count; fall back to default order (newest first)
  const rankedPublications = [...publications].sort((a, b) => {
    const ca = paperMetrics.papers[a.id]?.cited_by_count ?? -1
    const cb = paperMetrics.papers[b.id]?.cited_by_count ?? -1
    if (ca !== cb) return cb - ca
    return 0
  })

  // Rank projects by composite engagement score (stars × 10 + forks × 5 + zenodo downloads × 2 + views)
  const rankedProjects = [...projects].sort((a, b) => {
    const sa = projectMetrics.projects[a.id]?.score ?? 0
    const sb = projectMetrics.projects[b.id]?.score ?? 0
    return sb - sa
  })

  const featuredProject = rankedProjects[0]
  const featuredPubs = rankedPublications.slice(0, 2)

  // Use auto-generated activity if available, otherwise show nothing
  const activityItems = activity.items.slice(0, 4)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: siteConfig.title,
    url: siteConfig.url,
    mainEntity: {
      "@type": "Person",
      name: identity.name,
      "@id": `${siteConfig.url}/#person`,
    },
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-6 md:grid-cols-[minmax(0,1fr)_13rem] md:items-start md:py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground">{identity.shortTitle}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-balance text-foreground md:text-5xl">
            {identity.name}
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground">{identity.statement}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {identity.affiliation}, {identity.location}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              Research Intern at NanoPhoto Lab, IMRE, A*STAR
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {profileLinks.map((link) =>
              link.external ? (
                <Button key={link.label} asChild variant="outline" size="sm">
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </Button>
              ) : (
                <Button key={link.label} asChild variant={link.label === "CV" ? "default" : "outline"} size="sm">
                  <Link href={link.href}>
                    {link.label}
                    {link.label === "CV" ? <FileText aria-hidden="true" /> : null}
                  </Link>
                </Button>
              ),
            )}
          </div>
        </div>

        <div className="w-44 overflow-hidden rounded-md border border-border bg-surface ring-4 ring-border md:justify-self-end">
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
            <p className="text-sm font-semibold text-foreground">Research</p>
            <Link
              href="/research"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-strong"
            >
              Full overview
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="max-w-3xl">
            <p className="text-base leading-8 text-muted-foreground">
              Work organized around integrated nanophotonics, nonlinear and quantum photonics,
              physics-informed computational methods, and inverse design. The emphasis is connecting
              device physics to computational workflows that remain interpretable and reproducible.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {researchThemes.map((theme) => (
                <Link
                  key={theme.id}
                  href={`/research#${theme.id}`}
                  className="inline-block max-w-[16rem] truncate rounded border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground hover:border-accent hover:bg-card hover:text-foreground transition-colors"
                  title={theme.title}
                >
                  {theme.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[16rem_minmax(0,1fr)]">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Featured Project</h2>
            <Link href="/projects" className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-strong">
              All projects
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <article className="rounded-md border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">{featuredProject.status}</p>
            <h3 className="mt-2 text-xl font-semibold leading-7 text-foreground">{featuredProject.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{featuredProject.objective}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {featuredProject.tools.slice(0, 5).map((tool) => (
                <span key={tool} className="rounded border border-border bg-surface px-2 py-0.5 text-xs text-muted-foreground">
                  {tool}
                </span>
              ))}
            </div>

            {featuredProject.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {featuredProject.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-strong"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 md:grid-cols-[16rem_minmax(0,1fr)] lg:px-8">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Selected Publications</h2>
            <Link
              href="/publications"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-strong"
            >
              All publications
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <PublicationsList publications={featuredPubs} compact />
        </div>
      </section>

      {activityItems.length > 0 && (
        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 md:grid-cols-[16rem_minmax(0,1fr)] lg:px-8">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {activityItems.map((item) => (
              <article key={`${item.date_iso}-${item.title}`} className="grid gap-3 py-5 sm:grid-cols-[6rem_minmax(0,1fr)]">
                <p className="text-sm text-muted-foreground">{item.date}</p>
                <div>
                  <span className="inline-block shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-border bg-secondary text-muted-foreground">
                    {activityTypeLabel[item.type] ?? item.type}
                  </span>
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
