import Link from "next/link"
import { JourneySection } from "@/components/journey-section"
import { ArrowRight, BookOpenText, FileSpreadsheet, FileText, LayoutTemplate, Route } from "lucide-react"
import { getMaterialsOverview, type MaterialCollectionSlug } from "@/lib/materials-library"

export const metadata = {
  title: "Materials | Islam Abdulaal",
  description: "Slides, summaries, roadmaps, and reusable templates for integrated photonics and research workflows.",
}

const iconMap: Record<MaterialCollectionSlug, typeof LayoutTemplate> = {
  slides: LayoutTemplate,
  summaries: FileText,
  roadmaps: Route,
  templates: FileSpreadsheet,
}

export default async function MaterialsPage() {
  const overview = await getMaterialsOverview()

  const summaryStats = [
    { label: "Collections", value: String(overview.collections.length) },
    { label: "Published Files", value: String(overview.totalAssets) },
    { label: "Audience", value: "Students and Researchers" },
    { label: "Updates", value: "File-driven" },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="min-h-[50vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Materials</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              I publish practical learning assets here, including slides, summaries, roadmaps, and reusable templates.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {summaryStats.map((item) => (
              <article key={item.label} className="p-4 rounded-xl border border-border bg-card/40">
                <p className="text-lg font-bold leading-none">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-2">{item.label}</p>
              </article>
            ))}
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-12">Resource Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {overview.collections.map(({ collection, assets }) => {
              const Icon = iconMap[collection.slug]
              return (
                <article
                  key={collection.slug}
                  className="p-7 rounded-xl border border-border bg-card hover:border-accent transition-colors flex flex-col"
                >
                  <Icon className="w-8 h-8 text-accent mb-5" />
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold text-foreground">{collection.title}</h3>
                    <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">{assets.length} files</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-5 flex-grow">{collection.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {collection.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded text-xs bg-background text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">Upload path: <code>{collection.uploadPath}</code></p>
                  <Link href={collection.href} className="text-sm text-accent inline-flex items-center gap-2">
                    Open Collection
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpenText className="w-10 h-10 text-accent mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-foreground mb-6">Built for Continuous Updates</h2>
          <p className="text-lg text-muted-foreground mb-0">
            Once you add files under `public/materials/`, the materials pages update automatically on the next build.
          </p>
        </div>
      </section>

      <JourneySection
        title="Turn Learning Into Action"
        description="After reviewing materials, continue with mentorship support, topic requests, or article deep-dives."
        actions={[
          { href: "/mentorship", label: "Ask for Mentorship" },
          { href: "/contact", label: "Request Specific Material", variant: "outline" },
          { href: "/articles", label: "Read Related Articles", variant: "ghost" },
        ]}
      />
    </main>
  )
}
