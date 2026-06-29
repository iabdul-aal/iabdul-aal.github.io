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
            My research is organized by physical and computational themes rather than by isolated outputs. The common
            thread is the link between photonic device physics, reproducible simulation, and design methods that remain
            constrained by the underlying equations.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 lg:px-8">
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            AI, PINNs, and machine learning appear here as computational methods. The research identity remains centered
            on photonics, device physics, and scientific modeling.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="divide-y divide-border border-y border-border">
          {researchThemes.map((theme, index) => {
            const themeProjects = getProjectsForTheme(theme.id)
            const themePublications = publications.filter((pub) => pub.relatedThemes?.includes(theme.id))

            return (
              <article key={theme.title} id={theme.id} className="grid gap-6 py-10 md:grid-cols-[5rem_minmax(0,1fr)] scroll-mt-24">
                <p className="text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
                <div className="max-w-4xl">
                  <h2 className="text-2xl font-semibold leading-8 text-foreground">{theme.title}</h2>
                  <dl className="mt-6 grid gap-6">
                    <div className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)]">
                      <dt className="text-sm font-medium text-foreground">Problem</dt>
                      <dd className="text-sm leading-7 text-muted-foreground">{theme.problem}</dd>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)]">
                      <dt className="text-sm font-medium text-foreground">Methods</dt>
                      <dd className="text-sm leading-7 text-muted-foreground">{theme.methods}</dd>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)]">
                      <dt className="text-sm font-medium text-foreground">Physical relevance</dt>
                      <dd className="text-sm leading-7 text-muted-foreground">{theme.physicalRelevance}</dd>
                    </div>
                    
                    {themeProjects.length > 0 && (
                      <div className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)]">
                        <dt className="text-sm font-medium text-foreground">Related Projects</dt>
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
                      <div className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)]">
                        <dt className="text-sm font-medium text-foreground">Related Publications</dt>
                        <dd className="flex flex-col gap-3 text-sm leading-7">
                          {themePublications.map((pub) => (
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
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
