import { PublicationsList } from "@/components/publications-list"
import { loadPublications } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

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
  const publications = await loadPublications()

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

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 lg:px-8">
        <PublicationsList publications={publications} />
      </section>
    </main>
  )
}
