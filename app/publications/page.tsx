import type { Metadata } from "next"
import { PublicationsList } from "@/components/publications-list"
import { CitationsBar } from "@/components/citations-bar"
import { PageHeader } from "@/components/layout/page-header"
import { loadPublications } from "@/lib/publications"
import { loadScholarMetrics } from "@/lib/scholar-metrics"
import { createPageMetadata, generatePublicationsSchema } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = createPageMetadata({
  title: "Publications and Peer-Reviewed Research",
  description: `Peer-reviewed journal articles, conference contributions, and preprints by ${siteConfig.name} in integrated photonics, quantum sources, and inverse design.`,
  path: "/publications",
  keywords: [
    `${siteConfig.name} publications`,
    "Journal of Optics publication",
    "Terahertz quasi-BIC metasurfaces",
    "NanoPhotoNet-MPM paper",
    "Physics-informed SPDC quantum sources",
    "Google Scholar citations",
  ],
})

export default async function PublicationsPage() {
  const [publications, scholar] = await Promise.all([
    loadPublications(),
    loadScholarMetrics(),
  ])

  const jsonLd = generatePublicationsSchema(publications)

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHeader
        eyebrow="Publications"
        title="Papers, preprints, and citable outputs"
        i18nKey="pub"
      />

      <section className="container-layout pb-16">
        <CitationsBar scholar={scholar} publicationsCount={publications.length} />

        <PublicationsList publications={publications} />
      </section>
    </main>
  )
}
