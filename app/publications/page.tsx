import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PublicationsList } from "@/components/publications-list"
import { loadPublications } from "@/lib/publications"
import { loadScholarMetrics, formatFetchedAt } from "@/lib/scholar-metrics"
import { createPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import { socialLinks } from "@/lib/social-links"

export const metadata = createPageMetadata({
  title: "Publications",
  description:
    "Publications and preprints by Islam I. Abdulaal in integrated photonics, nonlinear optics, metasurfaces, and physics-informed computational methods.",
  path: "/publications",
  keywords: [
    "Islam Abdulaal publications",
    "computational photonics publications",
    "integrated photonics preprints",
    "terahertz quasi-BIC metasurfaces",
    "physics-informed photonics",
  ],
})

export default async function PublicationsPage() {
  const [publications, scholar] = await Promise.all([
    loadPublications(),
    loadScholarMetrics(),
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Publications - Islam I. Abdulaal",
    url: `${siteConfig.url}/publications`,
    description: "Research publications and preprints by Islam I. Abdulaal.",
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

  const metricsItems = [
    { label: "Citations", value: scholar.citations.all },
    { label: "h-index", value: scholar.hIndex.all },
    { label: "i10-index", value: scholar.i10Index.all },
  ]

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">Publications</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Papers, preprints, and citable research outputs
          </h1>
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            Publication records are kept minimal and citation-friendly, with direct links to arXiv, DOI records, PDFs
            where available, and BibTeX entries.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-8">
              {metricsItems.map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-semibold leading-none text-foreground tabular-nums">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {updatedAt && (
                <p className="text-xs text-muted-foreground">
                  Updated {updatedAt}
                </p>
              )}
              <Link
                href={socialLinks.scholar}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-strong transition-colors"
              >
                Google Scholar
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-6 lg:px-8">
        <PublicationsList publications={publications} />
      </section>
    </main>
  )
}

