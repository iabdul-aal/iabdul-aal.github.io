import { Suspense } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PublicationsList } from "@/components/publications-list"

import { PageHeader } from "@/components/layout/page-header"
import { loadPublications } from "@/lib/publications"
import { loadScholarMetrics, formatFetchedAt } from "@/lib/scholar-metrics"
import { createPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import { socialLinks } from "@/lib/social-links"

export const metadata = createPageMetadata({
  title: "Publications",
  description:
    `Publications and preprints by ${siteConfig.name} in integrated photonics, nonlinear optics, metasurfaces, and physics-informed computational methods.`,
  path: "/publications",
  keywords: [
    `${siteConfig.name} publications`,
    "computational photonics publications",
    "integrated photonics preprints",
    "terahertz quasi-BIC metasurfaces",
    "physics-informed photonics",
    "intelligent photonics",
  ],
})

// ── Single Responsibility: one citation metric stat ─────────────────────────
function MetricStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-2xl font-semibold leading-none text-foreground tabular-nums">{value}</p>
      <p className="mt-1.5 text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

export default async function PublicationsPage() {
  const [publications, scholar] = await Promise.all([
    loadPublications(),
    loadScholarMetrics(),
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Publications - ${siteConfig.name}`,
    url: `${siteConfig.url}/publications`,
    description: `Research publications and preprints by ${siteConfig.name}.`,
    mainEntity: publications.map((publication) => ({
      "@type": "ScholarlyArticle",
      "@id": `${siteConfig.url}/publications#${publication.id}`,
      headline: publication.title,
      name: publication.title,
      author: publication.authors.map((author) => ({
        "@type": "Person",
        name: author,
      })),
      datePublished: publication.year,
      isPartOf: publication.venue,
      sameAs: publication.url,
      identifier: publication.doi
        ? {
            "@type": "PropertyValue",
            propertyID: "DOI",
            value: publication.doi,
          }
        : undefined,
    })),
  }

  const updatedAt = formatFetchedAt(scholar.fetchedAt)

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <PageHeader
        eyebrow="Publications"
        title="Papers, preprints, and citable outputs"
        description="Peer-reviewed journal articles, preprints, and citable technical reports in integrated photonics and computational device design."
        i18nKey="pub"
      />

      {/* Scholar metrics bar */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-8">
              <MetricStat label="Citations" value={scholar.citations.all} />
              <MetricStat label="h-index" value={scholar.hIndex.all} />
              <MetricStat label="i10-index" value={scholar.i10Index.all} />
            </div>
            <div className="flex items-center gap-3">
              {updatedAt && (
                <p className="text-xs text-muted-foreground">Updated {updatedAt}</p>
              )}
              <Link
                href={socialLinks.scholar}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Google Scholar
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-10 text-sm text-muted-foreground">Loading publications list...</div>}>
          <PublicationsList publications={publications} />
        </Suspense>
      </section>
    </main>
  )
}
