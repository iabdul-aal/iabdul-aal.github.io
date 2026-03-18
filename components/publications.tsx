import Link from "next/link"
import { ArrowUpRight, ExternalLink, Star } from "lucide-react"

export interface Publication {
  title: string
  arxiv?: string
  status: string
  url?: string
}

interface PublicationsProps {
  publications: Publication[]
  featured?: boolean
}

export function Publications({ publications, featured = false }: PublicationsProps) {
  const heading = featured ? "Featured Publications" : "Publications"

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2 className="text-4xl font-bold text-foreground">{heading}</h2>
          {featured && (
            <Link
              href="/publications"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              View All Publications
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>
        {publications.length === 0 ? (
          <article className="p-6 rounded-lg border border-border bg-card">
            <p className="text-sm text-muted-foreground">
              Publication records will be added here soon.
            </p>
          </article>
        ) : (
          <div className="space-y-6">
            {publications.map((pub) => (
              <div
                key={`${pub.title}-${pub.status}`}
                className="group relative p-6 rounded-2xl border border-border bg-card/40 hover:border-accent/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5"
              >
                {featured && (
                  <span className="pointer-events-none absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-accent/40 group-hover:bg-accent/70 transition-colors" aria-hidden="true" />
                )}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
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
                  <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">{pub.title}</h3>
                  {pub.url && (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 text-sm font-semibold transition-colors flex items-center gap-2 w-fit"
                    >
                      View Publication <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
