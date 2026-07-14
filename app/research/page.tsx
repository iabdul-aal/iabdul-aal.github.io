import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { researchThemes } from "@/lib/academic-content"
import { getProjectsForTheme } from "@/lib/database"
import { loadPublications } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Research",
  description:
    "Research themes in computational integrated photonics, nonlinear and quantum photonics, inverse design, and physics-informed methods.",
  path: "/research",
})

export default async function ResearchPage() {
  const publications = await loadPublications()

  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">Research</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Themes in computational and integrated photonics
          </h1>
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            Research is organized by physical and computational themes rather than by isolated outputs. The common
            thread is the link between photonic device physics, reproducible simulation, and design methods
            constrained by the underlying equations.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            AI, PINNs, and machine learning appear here as computational methods. The research identity
            remains centered on photonics, device physics, and scientific modeling.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 lg:px-8">
        <div className="divide-y divide-border border-t border-border">
          {researchThemes.map((theme) => {
            const themeProjects = getProjectsForTheme(theme.id)
            const themePublications = publications.filter((pub) => pub.relatedThemes?.includes(theme.id))

            return (
              <article key={theme.title} id={theme.id} className="py-12 scroll-mt-24">
                <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">{theme.title}</h2>
                  </div>
                  <dl className="grid gap-6 max-w-3xl">
                    <div className="grid gap-1.5 sm:grid-cols-[9rem_minmax(0,1fr)]">
                      <dt className="text-sm font-medium text-foreground pt-0.5">Problem</dt>
                      <dd className="text-sm leading-7 text-muted-foreground">{theme.problem}</dd>
                    </div>
                    <div className="grid gap-1.5 sm:grid-cols-[9rem_minmax(0,1fr)]">
                      <dt className="text-sm font-medium text-foreground pt-0.5">Methods</dt>
                      <dd className="text-sm leading-7 text-muted-foreground">{theme.methods}</dd>
                    </div>
                    <div className="grid gap-1.5 sm:grid-cols-[9rem_minmax(0,1fr)]">
                      <dt className="text-sm font-medium text-foreground pt-0.5">Physical relevance</dt>
                      <dd className="text-sm leading-7 text-muted-foreground">{theme.physicalRelevance}</dd>
                    </div>

                    {themeProjects.length > 0 && (
                      <div className="grid gap-1.5 sm:grid-cols-[9rem_minmax(0,1fr)]">
                        <dt className="text-sm font-medium text-foreground pt-0.5">Related projects</dt>
                        <dd className="flex flex-wrap gap-3 text-sm leading-7">
                          {themeProjects.map((project) => (
                            <Link
                              key={project.id}
                              href={`/projects#${project.id}`}
                              className="inline-flex items-center gap-1 text-accent hover:text-accent-strong transition-colors"
                            >
                              {project.title}
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          ))}
                        </dd>
                      </div>
                    )}

                    {themePublications.length > 0 && (
                      <div className="grid gap-1.5 sm:grid-cols-[9rem_minmax(0,1fr)]">
                        <dt className="text-sm font-medium text-foreground pt-0.5">Related publications</dt>
                        <dd className="flex flex-col gap-2 text-sm leading-7">
                          {themePublications.map((pub) => (
                            <Link
                              key={pub.id}
                              href={`/publications#${pub.id}`}
                              className="inline-flex items-start gap-1 text-accent hover:text-accent-strong transition-colors"
                            >
                              <span className="underline decoration-dotted underline-offset-2">{pub.title} ({pub.year})</span>
                              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 mt-1" />
                            </Link>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
