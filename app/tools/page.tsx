import type { Metadata } from "next"
import { projects } from "@/lib/academic-content"
import { loadProjectMetrics } from "@/lib/project-metrics"
import { createPageMetadata, generateSoftwareSchema } from "@/lib/seo"
import { ProjectsList } from "@/components/projects-list"
import { PageHeader } from "@/components/layout/page-header"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = createPageMetadata({
  title: "Open Source Solvers and Design Kits",
  description: `Open-source computational solvers, surrogate modeling kits, and citable design packages by ${siteConfig.name} in integrated photonics and inverse design.`,
  path: "/tools",
  keywords: [
    "NanoPhotoNet-MPM",
    "Ge-on-Si PIN Photodetector Kit",
    "Open Source Computational Photonics",
    "PINN PyTorch Solvers",
    "Zenodo Code DOIs",
  ],
})

export default async function ProjectsPage() {
  const projectMetrics = await loadProjectMetrics()
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
        i18nKey="tools"
      />

      <section className="container-layout pb-16">
        <ProjectsList initialProjects={projects} metricsMap={projectMetrics.projects} />
      </section>
    </main>
  )
}
