import { Suspense } from "react"
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
  description:
    `Peer-reviewed journal articles, conference contributions, and preprints by ${siteConfig.name} in integrated photonics, quantum sources, and PINN inverse design.`,
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

  const jsonLd = generatePublicationsSchema()

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHeader
        eyebrow="Publications"
        title="Publications and preprints"
        description="Peer-reviewed journal articles, invited contributions, preprints, and talks on integrated photonics, nonlinear optics, and computational surrogates."
        i18nKey="pub"
      />

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 lg:px-8">
        <CitationsBar scholar={scholar} />

        <Suspense fallback={<div className="text-sm text-muted-foreground">Loading publications...</div>}>
          <PublicationsList publications={publications} />
        </Suspense>
      </section>
    </main>
  )
}
