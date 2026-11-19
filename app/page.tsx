import { PublicationsList } from "@/components/publications-list"
import { ProjectsList } from "@/components/projects-list"
import { ActivityFeed } from "@/components/activity-feed"
import { SectionShell } from "@/components/layout/section-shell"
import { HeroSection, HomepageResearchOverview } from "@/components/hero-statement"
import { projects } from "@/lib/academic-content"
import { loadActivity } from "@/lib/activity"
import { loadPaperMetrics } from "@/lib/paper-metrics"
import { loadProjectMetrics } from "@/lib/project-metrics"
import { loadPublications, rankPublications, rankTools } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
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

  return (
    <main>
      <HeroSection />

      <SectionShell
        label="Research Overview"
        href="/research"
        linkLabel="Full overview"
        i18nKey="researchOverview"
        alt
      >
        <HomepageResearchOverview />
      </SectionShell>

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

      {activityItems.length > 0 && (
        <SectionShell label="Recent Activity" i18nKey="recentActivity">
          <ActivityFeed items={activityItems} />
        </SectionShell>
      )}
    </main>
  )
}
