import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { PageHero } from "@/components/page-hero"
import { PublicationsList } from "@/components/publications-list"
import { createPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import type { Publication } from "@/components/publications"

export const metadata = createPageMetadata({
  title: "Publications",
  description:
    "Research publications by Islam I. Abdulaal in integrated photonics, nonlinear optics, metasurfaces, and physics-informed design.",
  path: "/publications",
  keywords: [
    "Islam Abdulaal publications",
    "integrated photonics research",
    "terahertz metasurfaces",
    "quasi-BIC biosensing",
    "nonlinear optics papers",
  ],
})

type RawPublication = {
  title?: string
  venue?: string
  year?: string
  doi?: string
  url?: string
}

const ARXIV_DOI_PREFIX = "10.48550/arxiv."

function extractArxivId(doi: string, url: string): string | undefined {
  const normalizedDoi = doi.trim().toLowerCase()
  if (normalizedDoi.startsWith(ARXIV_DOI_PREFIX)) {
    return doi.trim().slice(ARXIV_DOI_PREFIX.length)
  }

  const absMarker = "/abs/"
  const absIndex = url.indexOf(absMarker)
  if (absIndex >= 0) {
    return url.slice(absIndex + absMarker.length).trim() || undefined
  }

  return undefined
}

async function loadPublications(): Promise<Publication[]> {
  try {
    const filePath = join(process.cwd(), "publications.json")
    const raw = await readFile(filePath, "utf8")
    const parsed = JSON.parse(raw) as RawPublication[]

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.map((item) => {
      const doi = (item.doi ?? "").trim()
      const url = (item.url ?? "").trim()
      const resolvedUrl = url || (doi ? `https://doi.org/${doi}` : undefined)
      const venue = (item.venue ?? "").trim()
      const year = (item.year ?? "").trim()
      const parts = [venue, year].filter(Boolean)

      return {
        title: (item.title ?? "").trim() || "Untitled",
        status: parts.join(", ") || "Publication",
        arxiv: extractArxivId(doi, url),
        url: resolvedUrl,
      }
    })
  } catch {
    return []
  }
}

export default async function PublicationsPage() {
  const publications = await loadPublications()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Publications — Islam I. Abdulaal",
    url: `${siteConfig.url}/publications`,
    description: "Research publications by Islam I. Abdulaal.",
    mainEntity: publications.map((pub) => ({
      "@type": "ScholarlyArticle",
      name: pub.title,
      url: pub.url,
    })),
  }

  return (
    <main className="bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        kicker="Research Output"
        title="Publications"
        description="Peer-reviewed papers, preprints, and research contributions in integrated photonics, nonlinear optics, and physics-informed design."
      />

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PublicationsList publications={publications} />
        </div>
      </section>
    </main>
  )
}
