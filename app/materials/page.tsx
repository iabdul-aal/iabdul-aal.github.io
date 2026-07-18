import { loadTalks } from "@/lib/talks"
import { getMaterialsOverview } from "@/lib/materials-library"
import { loadMediumArticles, formatArticleDate } from "@/lib/medium-articles"
import { createPageMetadata } from "@/lib/seo"
import { MaterialsList, MaterialItem } from "@/components/materials-list"
import { PageHeader } from "@/components/layout/page-header"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: "Materials",
  description:
    `Presentation slides, lecture decks, technical summaries, learning roadmaps, articles, and public sessions by ${siteConfig.name}.`,
  path: "/materials",
})

export default async function MaterialsPage() {
  const [talks, { collections }, { articles: mediumArticles }] = await Promise.all([
    loadTalks(),
    getMaterialsOverview(),
    loadMediumArticles(),
  ])

  // Build unified materials array
  const allMaterials: MaterialItem[] = []

  // 1. Add Technical Resources
  collections.forEach(({ collection, assets }) => {
    assets.forEach((asset) => {
      const year = asset.updatedAt.slice(-4) || "2026"
      allMaterials.push({
        id: `asset-${asset.fileName}`,
        type: (collection.slug === "slides"
          ? "slide"
          : collection.slug === "summaries"
          ? "summary"
          : collection.slug === "roadmaps"
          ? "roadmap"
          : "template") as MaterialItem["type"],

        categoryLabel: collection.title,
        title: asset.displayName,
        year,
        date: asset.updatedAt,
        description: collection.description,
        formatLabel: `${asset.extension} • ${asset.sizeLabel}`,
        url: asset.href,
        isDownload: true,
      })
    })
  })

  // 2. Add Medium Articles
  mediumArticles.forEach((article) => {
    const year = article.year || "2026"
    allMaterials.push({
      id: `article-${article.url}`,
      type: "article",
      categoryLabel: "Medium Articles",
      title: article.title,
      year,
      date: formatArticleDate(article.publishedAt) || year,
      description: article.excerpt,
      formatLabel: "Medium Article",
      url: article.url,
      isDownload: false,
    })
  })

  // 3. Add Public Sessions (Talks, Workshops)
  talks.forEach((talk) => {
    const year = String(talk.year || "2026")
    allMaterials.push({
      id: `talk-${talk.url || talk.title}`,
      type: "talk",
      categoryLabel: "Public Sessions",
      title: talk.title,
      year,
      date: talk.date || year,
      description: undefined,
      event: talk.event,
      source: talk.source,
      formatLabel: talk.format || "Session",
      url: talk.url,
      isDownload: false,
    })
  })

  return (
    <main>
      <PageHeader
        eyebrow="Materials"
        title="Technical materials, articles, and public sessions"
        description="Downloadable teaching and reference materials, technical articles, and a chronological record of talks, workshops, and poster presentations."
        i18nKey="materials"
      />

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 lg:px-8">
        <MaterialsList items={allMaterials} />
      </section>
    </main>
  )
}
