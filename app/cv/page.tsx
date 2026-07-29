import type { Metadata } from "next"
import { loadPaperMetrics } from "@/lib/paper-metrics"
import { loadProjectMetrics } from "@/lib/project-metrics"
import { loadPublications, rankPublications, rankTools } from "@/lib/publications"
import { projects } from "@/lib/academic-content"
import { createPageMetadata, generatePersonSchema } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import { CvView } from "@/components/cv-view"

export const metadata: Metadata = createPageMetadata({
  title: "Curriculum Vitae and Academic Record",
  description:
    `Academic curriculum vitae, research experience, education, publications summary, and official PDF download for ${siteConfig.name}.`,
  path: "/cv",
  keywords: [
    `${siteConfig.name} CV`,
    "Curriculum Vitae PDF",
    "Academic Record",
    "Research Experience",
    "Electronics and Communications Engineering",
  ],
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

  // ProfilePage: mainEntity references the Person defined in root layout JSON-LD.
  // Omit @context from nested object to avoid invalid nested @context per JSON-LD 1.1.
  const personSchema = generatePersonSchema()
  const personSchemaWithoutContext = Object.fromEntries(
    Object.entries(personSchema).filter(([k]) => k !== "@context")
  )
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `Curriculum Vitae - ${siteConfig.name}`,
    mainEntity: personSchemaWithoutContext,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CvView
        totalPublicationsCount={publications.length}
        featuredPubs={featuredPubs}
        rankedTools={rankedTools}
      />
    </>
  )
}
