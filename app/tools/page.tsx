import type { Metadata } from "next"
import { projects } from "@/lib/academic-content"
import { createPageMetadata, generateSoftwareSchema } from "@/lib/seo"
import { ProjectsList } from "@/components/projects-list"
import { PageHeader } from "@/components/layout/page-header"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = createPageMetadata({
  title: "Open Source Solvers and Design Kits",
  description:
    `Open-source computational solvers, surrogate modeling frameworks, and citable design packages by ${siteConfig.name} in integrated photonics and PINN inverse design.`,
  path: "/tools",
  keywords: [
    "NanoPhotoNet-MPM",
    "FBG Coupled Mode Solver",
    "Ge-on-Si PIN Photodetector Kit",
    "Open Source Computational Photonics",
    "PINN PyTorch Solvers",
    "Zenodo Code DOIs",
  ],
})

export default function ProjectsPage() {
  const jsonLd = generateSoftwareSchema()

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHeader
        eyebrow="Tools"
        title="Software tools and codebases"
        description="Software tools and codebases are documented when they support reproducible simulations, public code availability, or citable engineering artifacts for photonics research."
        i18nKey="tools"
      />

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 lg:px-8">
        <ProjectsList initialProjects={projects} />
      </section>
    </main>
  )
}
