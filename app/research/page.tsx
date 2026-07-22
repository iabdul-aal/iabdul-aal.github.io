import "katex/dist/katex.min.css"
import { researchThemes, projects } from "@/lib/academic-content"
import { loadPublications } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"
import { PageHeader } from "@/components/layout/page-header"
import { ResearchThemeList } from "@/components/research-theme-list"

export const metadata = createPageMetadata({
  title: "Research",
  description:
    "Research themes in integrated photonics, nonlinear and quantum photonics, inverse design, and physics-informed methods.",
  path: "/research",
})

export default async function ResearchPage() {
  const publications = await loadPublications()

  return (
    <main>
      <PageHeader
        eyebrow="Research"
        title="Research themes in integrated photonics"
        description="Research is organized by physical and computational theme rather than by individual output. The underlying methodology is full-wave electromagnetic simulation and device physics, connecting structural geometry to optical and electrical behavior."
        i18nKey="research"
      />

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 lg:px-8">
        <ResearchThemeList
          themes={researchThemes}
          allProjects={projects}
          publications={publications}
        />
      </section>
    </main>
  )
}
