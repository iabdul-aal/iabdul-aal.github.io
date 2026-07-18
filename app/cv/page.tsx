import { loadPaperMetrics } from "@/lib/paper-metrics"
import { loadProjectMetrics } from "@/lib/project-metrics"
import { loadPublications, rankPublications, rankTools } from "@/lib/publications"
import { projects } from "@/lib/academic-content"
import { createPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import { CvView } from "@/components/cv-view"

export const metadata = createPageMetadata({
  title: "CV",
  description: `Curriculum vitae summary of ${siteConfig.name}, with links to the full academic CV document.`,
  path: "/cv",
})

export default async function CvPage() {
  const [publications, paperMetrics, projectMetrics] = await Promise.all([
    loadPublications(),
    loadPaperMetrics(),
    loadProjectMetrics(),
  ])

  const rankedPublications = rankPublications(publications, paperMetrics)
  const featuredPubs = rankedPublications.slice(0, 2)
  const rankedTools = rankTools(projects, projectMetrics)

  return (
    <CvView
      totalPublicationsCount={publications.length}
      featuredPubs={featuredPubs}
      rankedTools={rankedTools}
    />
  )
}
