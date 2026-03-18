import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ArrowUpRight, BookOpen, ExternalLink } from "lucide-react"
import { PageHero } from "@/components/page-hero"
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

      {/* Publications List */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {publications.length === 0 ? (
            <article className="p-8 rounded-2xl border border-border bg-card/40 text-center">
              <BookOpen className="w-10 h-10 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Publication records will be added here as they become available.
              </p>
            </article>
          ) : (
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <article
                  key={`${pub.title}-${pub.status}`}
                  className="group relative p-6 sm:p-7 rounded-2xl border border-border bg-card/40 hover:border-accent/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Accent side bar */}
                  <span className="pointer-events-none absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-accent/40 group-hover:bg-accent/70 transition-colors" aria-hidden="true" />

                  <div className="flex flex-col gap-3">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      {pub.status && (
                        <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                          {pub.status}
                        </span>
                      )}
                      {pub.arxiv && (
                        <span className="inline-flex items-center rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">
                          arXiv: {pub.arxiv}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-bold leading-snug group-hover:text-accent transition-colors">
                      {pub.title}
                    </h2>

                    {/* Actions */}
                    {pub.url && (
                      <div className="flex items-center gap-4 mt-1">
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
                        >
                          View Publication <ExternalLink className="w-4 h-4" />
                        </a>
                        {pub.arxiv && (
                          <a
                            href={`https://arxiv.org/abs/${pub.arxiv}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                          >
                            arXiv <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
