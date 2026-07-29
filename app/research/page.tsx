import type { Metadata } from "next"
import { researchThemes } from "@/lib/academic-content"
import { loadPublications } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import { PageHeader } from "@/components/layout/page-header"
import { ResearchThemeList } from "@/components/research-theme-list"

export const metadata: Metadata = createPageMetadata({
  title: "Integrated Photonics and Inverse Design Research",
  description:
    `Research themes in integrated nanophotonics, nonlinear quantum photonics, photonic inverse design, and physics-informed neural surrogates by ${siteConfig.name}.`,
  path: "/research",
  keywords: [
    "Integrated Photonics Research",
    "Physics-Informed Neural Networks",
    "SPDC Quantum Sources",
    "Nonlinear Photonics",
    "Eigenmode Solvers",
    `${siteConfig.name} Research`,
  ],
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
          publications={publications}
        />
      </section>
    </main>
  )
}
