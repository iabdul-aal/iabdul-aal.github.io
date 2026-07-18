import { projects } from "@/lib/academic-content"
import { createPageMetadata } from "@/lib/seo"
import { ProjectsList } from "@/components/projects-list"
import { PageHeader } from "@/components/layout/page-header"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: "Tools",
  description:
    `Selected software tools, codebases, and citable design packages by ${siteConfig.name} in integrated photonics and computational device modeling.`,
  path: "/tools",
})

export default function ProjectsPage() {
  return (
    <main>
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
