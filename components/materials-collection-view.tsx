import Link from "next/link"
import { ArrowLeft, ArrowRight, FileText } from "lucide-react"
import { JourneySection } from "@/components/journey-section"
import { getCollectionAssets, getMaterialCollection, type MaterialCollectionSlug } from "@/lib/materials-library"

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
  const collection = getMaterialCollection(slug)
  const assets = await getCollectionAssets(slug)

  const summaryStats = [
    { label: "Published Files", value: String(assets.length) },
    { label: "Collection", value: collection?.title ?? "Materials" },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/materials" className="text-accent hover:text-accent/80 mb-4 inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Materials
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{pageTitle}</h1>
        <p className="text-muted-foreground max-w-2xl mb-10">{pageDescription}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {summaryStats.map((item) => (
            <article key={item.label} className="p-4 rounded-xl border border-border bg-card/40">
              <p className="text-lg font-bold leading-none">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-2">{item.label}</p>
            </article>
          ))}
        </div>

        {assets.length > 0 ? (
          <div className="space-y-4">
            {assets.map((asset) => (
              <article key={asset.fileName} className="p-5 rounded-xl border border-border bg-card">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{asset.displayName}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{asset.extension} | {asset.sizeLabel}</p>
                    <p className="text-xs text-muted-foreground mt-2">Updated: {asset.updatedAt}</p>
                  </div>
                  <a
                    href={asset.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                  >
                    Open File <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
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
