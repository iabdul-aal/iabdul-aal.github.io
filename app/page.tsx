import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, FileText } from "lucide-react"
import { PublicationsList } from "@/components/publications-list"
import { ProjectsList } from "@/components/projects-list"
import { ActivityFeed } from "@/components/activity-feed"
import { SectionShell } from "@/components/layout/section-shell"
import { HeroStatement, HomepageResearchOverview } from "@/components/hero-statement"
import {
  identity,
  profileLinks,
  projects,
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

  const featuredPubs = rankedPublications.slice(0, 2)
  const activityItems = activity.items.slice(0, 4)

  const primaryProfileLinks = profileLinks.filter(
    (link) => link.label !== "ResearchGate"
  )

  return (
    <main>
      {/* Hero section: two-column layout with portrait */}
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-6 md:grid-cols-[minmax(0,1fr)_11rem] md:items-start md:py-16 lg:px-8">
        <div className="max-w-2xl order-2 md:order-1">
          <h1 className="text-3xl font-semibold leading-tight text-balance text-foreground md:text-4xl">
            {identity.name}
          </h1>

          <HeroStatement />

          {/* Profile links: primary for CV, secondary chips for external scholarly profiles */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {primaryProfileLinks.map((link) => {
              const isCv = link.label === "CV"
              return link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="trigger-secondary-chip touch-target"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={isCv ? "btn-primary touch-target" : "trigger-secondary-chip touch-target"}
                >
                  {isCv && <FileText className="h-3.5 w-3.5" aria-hidden="true" />}
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="w-36 h-36 overflow-hidden rounded-full border border-border bg-surface md:justify-self-end order-1 md:order-2">
          <Image
            src="/personal-pic.png"
            alt={`Portrait of ${identity.name}`}
            width={400}
            height={400}
            priority
            className="aspect-square h-auto w-full object-cover"
          />
        </div>
      </section>

      {/* Research Overview */}
      <SectionShell label="Research Overview" href="/research" linkLabel="Full overview" i18nKey="researchOverview" alt>
        <HomepageResearchOverview />
      </SectionShell>

      {/* Featured Tool */}
      {rankedProjects.length > 0 && (
        <SectionShell
          label="Featured Tool"
          href="/tools"
          linkLabel="All tools"
          i18nLinkLabel="allTools"
          i18nKey="featuredTool"
        >
          <ProjectsList
            initialProjects={rankedProjects.slice(0, 1)}
            metricsMap={projectMetrics.projects}
            compact
          />
        </SectionShell>
      )}

      {/* Selected Publications */}
      <SectionShell
        label="Selected Publications"
        href="/publications"
        linkLabel="All publications"
        i18nLinkLabel="allPublications"
        i18nKey="selectedPublications"
        alt
      >
        <PublicationsList publications={featuredPubs} compact />
      </SectionShell>

      {/* Recent Activity */}
      {activityItems.length > 0 && (
        <SectionShell label="Recent Activity" i18nKey="recentActivity">
          <ActivityFeed items={activityItems} />
        </SectionShell>
      )}
    </main>
  )
}
