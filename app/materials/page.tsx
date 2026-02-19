import { JourneySection } from "@/components/journey-section"
import { BookOpenText } from "lucide-react"
import { MaterialsStack } from "@/components/materials-stack"
import { getMaterialsOverview } from "@/lib/materials-library"

export const metadata = {
  title: "Materials",
  description: "Slides, summaries, roadmaps, and reusable templates for integrated photonics and research workflows.",
}

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
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground">Resource Stack</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Filter by collection type, file state, or keywords.
            </p>
          </div>
          <MaterialsStack items={collectionCards} />
        </div>
      </section>

      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpenText className="w-10 h-10 text-accent mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-foreground mb-6">Built for Practical Learning</h2>
          <p className="text-lg text-muted-foreground mb-0">
            These resources are organized for fast review, deeper study, and smoother project execution.
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
