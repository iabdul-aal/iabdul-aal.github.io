import { PageHero } from "@/components/page-hero"
import { MaterialsStack } from "@/components/materials-stack"
import { getMaterialsOverview } from "@/lib/materials-library"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Materials",
  description: "Slides, summaries, roadmaps, and reusable templates for integrated photonics and research workflows.",
  path: "/materials",
})

export default async function MaterialsPage() {
  const overview = await getMaterialsOverview()
  const collectionCards = overview.collections.map(({ collection, assets }) => ({
    slug: collection.slug,
    title: collection.title,
    description: collection.description,
    href: collection.href,
    tags: collection.tags,
    fileCount: assets.length,
  }))

  return (
    <main className="bg-background text-foreground">
      <PageHero
        kicker="Materials"
        title="Materials Library"
        description="A practical library of slides, summaries, roadmaps, and templates for faster learning and cleaner project execution."
        actions={[
          { label: "Open Mentorship", href: "/mentorship" },
          { label: "Request Material", href: "/contact", variant: "outline" },
        ]}
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground">Resource Stack</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Start with a collection below. Each collection has its own file-level search and filters.
            </p>
          </div>
          <MaterialsStack items={collectionCards} />
        </div>
      </section>
    </main>
  )
}
