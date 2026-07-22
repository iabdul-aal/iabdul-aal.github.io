import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, FileText } from "lucide-react"
import { PublicationsList } from "@/components/publications-list"
import { ProjectCard } from "@/components/project-card"
import { ActivityFeed } from "@/components/activity-feed"
import { SectionShell } from "@/components/layout/section-shell"
import {
  identity,
  profileLinks,
  projects,
  researchThemes,
  currentPosition,
  homepageResearchStatement,
} from "@/lib/academic-content"
import { loadActivity } from "@/lib/activity"
import { loadPaperMetrics } from "@/lib/paper-metrics"
import { loadProjectMetrics } from "@/lib/project-metrics"
import { loadPublications, rankPublications, rankTools } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: siteConfig.title,
  description: identity.statement,
  path: "/",
})

export default async function Home() {

  const [publications, paperMetrics, projectMetrics, activity] = await Promise.all([
    loadPublications(),
    loadPaperMetrics(),
    loadProjectMetrics(),
    loadActivity(),
  ])

  const rankedPublications = rankPublications(publications, paperMetrics)
  const rankedProjects = rankTools(projects, projectMetrics)

  const featuredProject = rankedProjects.length > 0 ? rankedProjects[0] : null
  const featuredPubs = rankedPublications.slice(0, 2)
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* ── Hero ── unique two-column layout with portrait ───────────────── */}
      <section className="hero-glow-bg mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-6 md:grid-cols-[minmax(0,1fr)_11rem] md:items-start md:py-16 lg:px-8">
        <div className="max-w-2xl order-2 md:order-1">
          <h1 className="text-3xl font-semibold leading-tight text-balance text-foreground md:text-4xl">
            {identity.name}
          </h1>
          <p className="mt-4 text-base leading-8 text-muted-foreground">{identity.statement}</p>

          {(identity.affiliation || identity.location) && (
            <p className="mt-2 text-xs text-muted-foreground">
              {[identity.affiliation, identity.location].filter(Boolean).join(" • ")}
            </p>
          )}

          {/* Pulsing current-position indicator */}
          <div className="mt-4 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {currentPosition}
            </span>
          </div>

          {/* Profile links — primary for CV, secondary (chip) for all external */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {profileLinks.map((link) => {
              const isCv = link.label === "CV"
              return link.external ? (
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
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={isCv ? "btn-primary" : "trigger-secondary-chip"}
                >
                  {link.label}
                  {isCv && <FileText className="h-3.5 w-3.5" aria-hidden="true" />}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="w-36 h-36 overflow-hidden rounded-full border border-border bg-surface ring-2 ring-border md:justify-self-end order-1 md:order-2">
          <Image
            src="/personal-pic.png"
            alt={`Portrait of ${identity.name}`}
            width={320}
            height={320}
            priority
            className="aspect-square h-auto w-full object-cover"
          />
        </div>
      </section>

      {/* ── Research Overview ─────────────────────────────────────────────── */}
      <SectionShell label="Research" href="/research" linkLabel="Full overview" alt>
        <div className="max-w-3xl space-y-6">
          <p className="text-base leading-8 text-muted-foreground">
            {homepageResearchStatement}
          </p>

          <div className="overflow-hidden rounded-md border border-border bg-card w-full max-w-xl">
            <Image
              src="/images/homepage-toc.png"
              alt="Research profile graphical abstract"
              width={800}
              height={500}
              priority
              className="aspect-[1.6] h-auto w-full object-contain p-2"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {researchThemes.map((theme) => (
              <Link
                key={theme.id}
                href={`/research#${theme.id}`}
                className="trigger-secondary-chip truncate max-w-[16rem]"
                title={theme.title}
              >
                {theme.title}
              </Link>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* ── Featured Tool ─────────────────────────────────────────────────── */}
      {featuredProject && (
        <SectionShell label="Featured Tool" href="/projects" linkLabel="All tools">
          <ProjectCard project={featuredProject} />
        </SectionShell>
      )}

      {/* ── Selected Publications ─────────────────────────────────────────── */}
      <SectionShell label="Selected Publications" href="/publications" linkLabel="All publications" alt>
        <Suspense fallback={<div className="text-xs text-muted-foreground">Loading publications...</div>}>
          <PublicationsList publications={featuredPubs} compact />
        </Suspense>
      </SectionShell>

      {/* ── Recent Activity ───────────────────────────────────────────────── */}
      {activityItems.length > 0 && (
        <SectionShell label="Recent Activity">
          <ActivityFeed items={activityItems} />
        </SectionShell>
      )}
    </main>
  )
}
