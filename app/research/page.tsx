import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import "katex/dist/katex.min.css"
import { researchThemes } from "@/lib/academic-content"
import { getProjectsForTheme } from "@/lib/database"
import { loadPublications } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"
import { PageHeader } from "@/components/layout/page-header"

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
      />

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="divide-y divide-border border-t border-border">
          {researchThemes.map((theme, idx) => {
            const themeProjects = getProjectsForTheme(theme.id)
            const themePublications = publications.filter((pub) => pub.relatedThemes?.includes(theme.id))
            const isEven = idx % 2 === 1

            return (
              <article
                key={theme.title}
                id={theme.id}
                className={`py-8 sm:py-10 scroll-mt-24 ${
                  isEven ? "-mx-5 px-5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 bg-surface/40" : ""
                }`}
              >
                <div className="space-y-5">
                  {/* Theme Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-3">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">{theme.title}</h2>
                    </div>


                    {themePublications.length > 0 && (
                      <Link
                        href={`/publications?topic=${theme.id}`}
                        className="btn-secondary"
                      >
                        <span>Topic publications</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>

                  {/* Body Grid */}
                  <div className="grid gap-8 md:grid-cols-[16rem_minmax(0,1fr)] items-start">
                    {theme.image && (
                      <div className="space-y-2 shrink-0">
                        <div className="overflow-hidden rounded-md border border-border/80 bg-surface p-1 shadow-2xs">
                          <Image
                            src={theme.image}
                            alt={`TOC figure for ${theme.title}`}
                            width={480}
                            height={320}
                            priority={idx === 0}
                            loading={idx === 0 ? "eager" : "lazy"}
                            className="aspect-[1.5] h-auto w-full object-contain rounded-xs"
                          />
                        </div>
                        <p className="text-[11px] text-center text-muted-foreground italic font-medium">
                          Mode profile / structure
                        </p>
                      </div>
                    )}


                    <dl className="space-y-4">
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Problem</dt>
                        <dd className="mt-0.5 text-sm leading-relaxed text-foreground/90">{theme.problem}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Methods</dt>
                        <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{theme.methods}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Physical Relevance</dt>
                        <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{theme.physicalRelevance}</dd>
                      </div>

                      {themeProjects.length > 0 && (
                        <div>
                          <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Featured Tools</dt>
                          <dd className="flex flex-wrap gap-2">
                            {themeProjects.map((project) => (
                              <Link
                                key={project.id}
                                href={`/projects#${project.id}`}
                                className="trigger-secondary-chip truncate max-w-[18rem]"
                                title={project.title}
                              >
                                {project.title}
                              </Link>

                            ))}
                          </dd>
                        </div>
                      )}

                    </dl>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

      </section>
    </main>
  )
}
