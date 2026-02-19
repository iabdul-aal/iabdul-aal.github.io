import { ExternalLink } from "lucide-react"

export interface Publication {
  title: string
  arxiv?: string
  status: string
  url?: string
}

interface PublicationsProps {
  publications: Publication[]
}

export function Publications({ publications }: PublicationsProps) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-foreground mb-12">Publications</h2>
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
                className="p-6 rounded-lg border border-border bg-card hover:border-accent transition-colors"
              >
                <h3 className="text-lg font-bold text-foreground mb-2">{pub.title}</h3>
                {pub.arxiv && <p className="text-sm text-accent font-semibold mb-2">arXiv: {pub.arxiv}</p>}
                <p className="text-muted-foreground text-sm mb-4">{pub.status}</p>
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
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
