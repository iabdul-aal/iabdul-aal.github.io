import { ArrowUpRight, Download, Presentation, BookOpen, Compass, Layout } from "lucide-react"
import { loadTalks, type TalkEntry } from "@/lib/talks"
import { getMaterialsOverview } from "@/lib/materials-library"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Materials",
  description:
    "Presentation slides, lecture decks, technical summaries, learning roadmaps, and public sessions by Islam I. Abdulaal.",
  path: "/materials",
})

function formatTalkDate(talk: TalkEntry): string {
  if (talk.date) {
    const parsed = new Date(talk.date)
    if (!Number.isNaN(parsed.getTime())) {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(parsed)
    }
  }
  return talk.year || "Date not listed"
}

// Icon mapper for the resource categories
function getCollectionIcon(slug: string) {
  switch (slug) {
    case "slides":
      return <Presentation className="h-5 w-5 text-accent" />
    case "summaries":
      return <BookOpen className="h-5 w-5 text-accent" />
    case "roadmaps":
      return <Compass className="h-5 w-5 text-accent" />
    case "templates":
    default:
      return <Layout className="h-5 w-5 text-accent" />
  }
}

export default async function MaterialsPage() {
  const talks = await loadTalks()
  const { collections } = await getMaterialsOverview()

  return (
    <main>
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">Materials</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Technical resources and public sessions
          </h1>
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            A repository of lecture decks, technical summaries, structured study paths, and templates, alongside a chronological record of technical talks, workshops, and public sessions.
          </p>
        </div>
      </section>

      {/* Dynamic Resource Collections */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-foreground">Technical Resources</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Downloadable documents, slides, and study roadmaps. Drop files in the designated public folders to add them here.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {collections.map(({ collection, assets }) => (
              <div key={collection.slug} id={collection.slug} className="rounded-md border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-md border border-border bg-surface p-2">
                    {getCollectionIcon(collection.slug)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{collection.title}</h3>
                    <p className="text-xs text-muted-foreground">{assets.length} {assets.length === 1 ? 'file' : 'files'}</p>
                  </div>
                </div>
                
                <p className="mt-4 text-sm text-muted-foreground leading-6">
                  {collection.description}
                </p>

                {assets.length > 0 ? (
                  <ul className="mt-5 divide-y divide-border border-t border-border">
                    {assets.map((asset) => (
                      <li key={asset.fileName} className="flex items-center justify-between py-3 text-sm">
                        <span className="truncate font-medium text-foreground max-w-[70%]" title={asset.displayName}>
                          {asset.displayName}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{asset.extension} • {asset.sizeLabel}</span>
                          <a
                            href={asset.href}
                            download
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card hover:bg-surface hover:text-accent"
                            title="Download file"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-5 border-t border-dashed border-border pt-4">
                    <p className="text-xs italic text-muted-foreground">
                      Resources will be listed as they are uploaded.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chronological Talks List */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-foreground">Chronological Sessions</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Record of technical talks, workshops, and posters. Items are kept concise and source-linked.
        </p>

        <div className="mt-8 divide-y divide-border border-y border-border">
          {talks.map((talk) => (
            <article key={talk.url} className="grid gap-4 py-6 md:grid-cols-[10rem_minmax(0,1fr)_8rem]">
              <p className="text-sm text-muted-foreground">{formatTalkDate(talk)}</p>
              <div>
                <p className="text-sm text-muted-foreground">{talk.format}</p>
                <h3 className="mt-1 text-lg font-semibold leading-7 text-foreground">{talk.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {talk.event}
                  {talk.source ? `, ${talk.source}` : ""}
                </p>
              </div>
              <a
                href={talk.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-fit items-center gap-1.5 text-sm text-accent hover:text-accent-strong md:justify-self-end"
              >
                Source
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
