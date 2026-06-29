import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/lib/academic-content"
import { getThemesForProject } from "@/lib/database"
import { loadPublications } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"

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
        <div className="divide-y divide-border border-y border-border">
          {projects.map((project) => {
            const projectThemes = getThemesForProject(project.relatedThemes)
            const projectPublications = publications.filter((pub) => pub.relatedProjects?.includes(project.id))

            return (
              <article key={project.id} id={project.id} className="py-10 scroll-mt-24">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
                  <div className="max-w-3xl">
                    <p className="text-sm text-muted-foreground">{project.status}</p>
                    <h2 className="mt-2 text-2xl font-semibold leading-8 text-foreground">{project.title}</h2>

                    <dl className="mt-6 grid gap-5">
                      <div>
                        <dt className="text-sm font-medium text-foreground">Objective</dt>
                        <dd className="mt-2 text-sm leading-7 text-muted-foreground">{project.objective}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-foreground">Methods</dt>
                        <dd className="mt-2 text-sm leading-7 text-muted-foreground">{project.methods}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-foreground">Results and Status</dt>
                        <dd className="mt-2 text-sm leading-7 text-muted-foreground">{project.results}</dd>
                      </div>

                      {projectThemes.length > 0 && (
                        <div>
                          <dt className="text-sm font-medium text-foreground">Related Topics</dt>
                          <dd className="mt-2 flex flex-wrap gap-3 text-sm leading-7">
                            {projectThemes.map((theme) => (
                              <Link
                                key={theme.id}
                                href={`/research#${theme.id}`}
                                className="inline-flex items-center gap-1 text-accent hover:text-accent-strong transition-colors"
                              >
                                {theme.title}
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </Link>
                            ))}
                          </dd>
                        </div>
                      )}

                      {projectPublications.length > 0 && (
                        <div>
                          <dt className="text-sm font-medium text-foreground">Related Publications</dt>
                          <dd className="mt-2 flex flex-col gap-3 text-sm leading-7">
                            {projectPublications.map((pub) => (
                              <Link
                                key={pub.id}
                                href={`/publications#${pub.id}`}
                                className="inline-flex items-start gap-1 text-accent hover:text-accent-strong transition-colors"
                              >
                                <span className="underline decoration-dotted">{pub.title} ({pub.year})</span>
                                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 mt-1" />
                              </Link>
                            ))}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <aside className="rounded-md border border-border bg-surface p-5 md:self-start">
                    <h3 className="text-sm font-semibold text-foreground">Tools</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <li key={tool} className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">
                          {tool}
                        </li>
                      ))}
                    </ul>

                    {project.links.length > 0 && (
                      <div className="mt-6 grid gap-2">
                        {project.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-strong"
                          >
                            {link.label}
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    )}
                  </aside>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
