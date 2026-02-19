import { FileText } from "lucide-react"
import { JourneySection } from "@/components/journey-section"
import { MaterialsFilesStack } from "@/components/materials-files-stack"
import { PageHero } from "@/components/page-hero"
import { getCollectionAssets, type MaterialCollectionSlug } from "@/lib/materials-library"

type JourneyAction = {
  href: string
  label: string
  variant?: "default" | "outline" | "ghost"
}

type MaterialsCollectionViewProps = {
  slug: MaterialCollectionSlug
  pageTitle: string
  pageDescription: string
  journeyTitle: string
  journeyDescription: string
  journeyActions: JourneyAction[]
}

export async function MaterialsCollectionView({
  slug,
  pageTitle,
  pageDescription,
  journeyTitle,
  journeyDescription,
  journeyActions,
}: MaterialsCollectionViewProps) {
  const assets = await getCollectionAssets(slug)
  const publishedFiles = String(assets.length)

  return (
    <main className="bg-background text-foreground">
      <PageHero
        kicker="Materials Collection"
        title={pageTitle}
        description={pageDescription}
        actions={[
          { label: "Back to Materials", href: "/materials", variant: "outline" },
          { label: "Request a Resource", href: "/contact", variant: "ghost" },
        ]}
      />

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-xs">
          <article className="p-4 rounded-xl border border-border bg-card/40">
            <p className="text-lg font-bold leading-none">{publishedFiles}</p>
            <p className="text-xs text-muted-foreground mt-2">Published Files</p>
          </article>
        </div>

        {assets.length > 0 ? (
          <MaterialsFilesStack assets={assets} />
        ) : (
          <article className="p-8 rounded-xl border border-border bg-card">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h2 className="text-lg font-semibold mb-2">No files published yet</h2>
                <p className="text-sm text-muted-foreground">
                  This collection is being prepared and will be updated soon.
                </p>
              </div>
            </div>
          </article>
        )}
      </section>

      <JourneySection title={journeyTitle} description={journeyDescription} actions={journeyActions} />
    </main>
  )
}
