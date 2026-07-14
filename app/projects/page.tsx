import { projects } from "@/lib/academic-content"
import { loadPublications } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"
import { ProjectsList } from "@/components/projects-list"

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Selected research projects by Islam I. Abdulaal in integrated photonics, computational photonics, metasurfaces, and optical sensing.",
  path: "/projects",
})

export default async function ProjectsPage() {
  const publications = await loadPublications()

  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">Projects</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Selected technical research projects
          </h1>
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            Projects are included only when they reinforce the central research trajectory: integrated photonics,
            computational modeling, nonlinear and quantum photonics, and physically grounded design workflows.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 lg:px-8">
        <ProjectsList initialProjects={projects} publications={publications} />
      </section>
    </main>
  )
}
