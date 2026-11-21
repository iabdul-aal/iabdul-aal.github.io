import type { Metadata } from "next"
import { loadTalks } from "@/lib/talks"
import { getMaterialsOverview } from "@/lib/materials-library"
import { loadMediumArticles } from "@/lib/medium-articles"
import { createPageMetadata } from "@/lib/seo"
import { MaterialsList, MaterialItem } from "@/components/materials-list"
import { PageHeader } from "@/components/layout/page-header"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = createPageMetadata({
  title: "Academic Materials, Slides and Technical Articles",
  description: `Downloadable lecture slides, presentation decks, technical summaries, learning roadmaps, and public talk records by ${siteConfig.name}.`,
  path: "/materials",
  keywords: [
    "Academic Presentation Decks",
    "Integrated Photonics Lecture Notes",
    "Medium Articles",
    "Public Talk Record",
    "Downloadable Research Summaries",
  ],
})

export default async function MaterialsPage() {
  const [talks, { collections }, { articles: mediumArticles }] = await Promise.all([
    loadTalks(),
    getMaterialsOverview(),
    loadMediumArticles(),
  ])

  const allMaterials: MaterialItem[] = []

  talks.forEach((talk) => {
    allMaterials.push({
      id: `talk-${talk.url || talk.title}`,
      type: "talk",
      categoryLabel: "Talks and Sessions",
      title: talk.title,
      year: talk.year,
      date: talk.date,
      formatLabel: talk.format || "Technical Talk",
      url: talk.url || "",
      isDownload: false,
      event: talk.event,
      source: talk.source,
    })
  })

  collections.forEach(({ collection, assets }) => {
    assets.forEach((asset) => {
      const year = asset.updatedAt.slice(-4) || "2026"
      allMaterials.push({
        id: `asset-${collection.slug}-${asset.fileName}`,
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
        formatLabel: `${asset.extension}, ${asset.sizeLabel}`,
        url: asset.href,
        isDownload: true,
      })
    })
  })

  mediumArticles.forEach((article) => {
    const year = article.year || "2026"
    allMaterials.push({
      id: `article-${article.url}`,
      type: "article",
      categoryLabel: "Medium Articles",
      title: article.title,
      year,
      date: article.publishedAt,
      description: article.excerpt,
      formatLabel: "Medium Article",
      url: article.url,
      isDownload: false,
    })
  })

  return (
    <main>
      <PageHeader
        eyebrow="Materials"
        title="Technical materials, notes, and public sessions"
        i18nKey="materials"
      />

      <section className="container-layout pb-16">
        <MaterialsList items={allMaterials} />
      </section>
    </main>
  )
}
