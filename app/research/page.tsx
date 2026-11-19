import type { Metadata } from "next"
import { researchThemes } from "@/lib/academic-content"
import { loadPublications } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import { PageHeader } from "@/components/layout/page-header"
import { ResearchThemeList } from "@/components/research-theme-list"

export const metadata: Metadata = createPageMetadata({
  title: "Integrated Photonics and Inverse Design Research",
  description: `Research themes in integrated nanophotonics, quantum photonics, photonic inverse design, and physics-informed neural surrogates by ${siteConfig.name}.`,
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
        i18nKey="research"
        noBorder
      />

      <ResearchThemeList
        themes={researchThemes}
        publications={publications}
      />
    </main>
  )
}
