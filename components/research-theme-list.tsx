"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { Project } from "@/lib/academic-content"
import { PublicationRecord } from "@/types/publication"

interface ThemeItem {
  id: string
  title: string
  image?: string
  problem: string
  methods: string
  physicalRelevance: string
}

const germanThemeData: Record<string, Partial<ThemeItem>> = {
  "integrated-nanophotonics": {
    title: "Integrierte Nanophotonik",
    problem:
      "Erforschung der Wechselwirkung zwischen geführten optischen Moden, hybriden aktiven Materialien (Ferroelektrika, Flüssigkristalle, 2D-Schichten) und umgebenden akustischen, thermischen oder elektrostatischen Feldern in Resonator-, Photonic-Crystal- und BIC-Strukturen.",
    methods:
      "Vollwellen-Elektromagnetik-Simulation, Anisotrope Permittivitätstensor-Modellierung, Multiphysikalische Finite-Elemente-Kopplung, Wellenleiter-Dispersionsdesign und Resonanzanalyse.",
    physicalRelevance:
      "Externe Stimuli verändern den lokalen Permittivitätstensor dynamisch, verschieben Resonanzen und stimmen Ausbreitungskonstanten für aktive Abstimmbarkeit auf dem Chip ab.",
  },
  "quantum-photonics": {
    title: "Quantenphotonik",
    problem:
      "Skalierung integrierter Quantentechnologien durch Integration wellenleiterbasierter nichtlinearer Photonenpaar-Quellen und phasenstabilen Schnittstellen.",
    methods:
      "Nichtlineare Optikmodellierung, Quantenzustandstomographie, kohärente Wellenleitersimulation und rekonfigurierbares Schaltungsdesign.",
    physicalRelevance:
      "Steuerung nichtlinearer Wellenleiterkoeffizienten für hochpräzise Quantenzustandspräparation und Routing in photonischen Schaltungen.",
  },
  "intelligent-photonics": {
    title: "Intelligente Photonik",
    problem:
      "Beschleunigung des Bauelementdesigns durch Verknüpfung von Wellengleichungen mit Deep Learning und Entwicklung optischer neuromorpher Hardware.",
    methods:
      "Physikinformierte neuronale Netze (PINNs), Adjungierten- und gradientenfreie Optimierung, optische neuronale Netzwerke (ONN).",
    physicalRelevance:
      "Etablierung eines rahmengestützten Systems, in dem physikalische Wellenausbreitung das Netzwerktraining leitet.",
  },
}

interface ResearchThemeListProps {
  themes: readonly ThemeItem[]
  allProjects: readonly Project[]
  publications: PublicationRecord[]
}

export function ResearchThemeList({ themes, allProjects, publications }: ResearchThemeListProps) {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"

  return (
    <div className="divide-y divide-border border-t border-border">
      {themes.map((theme, idx) => {
        const themeProjects = allProjects.filter((p) => p.relatedThemes?.includes(theme.id))
        const themePublications = publications.filter((pub) => pub.relatedThemes?.includes(theme.id))
        const isEven = idx % 2 === 1

        const deData = isDe ? germanThemeData[theme.id] : undefined
        const title = deData?.title || theme.title
        const problem = deData?.problem || theme.problem
        const methods = deData?.methods || theme.methods
        const physicalRelevance = deData?.physicalRelevance || theme.physicalRelevance

        return (
          <article
            key={theme.id}
            id={theme.id}
            className={`py-8 sm:py-10 scroll-mt-24 ${
              isEven ? "-mx-5 px-5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 bg-surface/40" : ""
            }`}
          >
            <div className="space-y-5">
              {/* Theme Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-3">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">{title}</h2>
                </div>

                {themePublications.length > 0 && (
                  <Link href={`/publications?topic=${theme.id}`} className="btn-secondary">
                    <span>{t.ui.topicPublications}</span>
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
                        alt={`TOC figure for ${title}`}
                        width={480}
                        height={320}
                        priority={idx === 0}
                        loading={idx === 0 ? "eager" : "lazy"}
                        className="aspect-[1.5] h-auto w-full object-contain rounded-xs"
                      />
                    </div>
                    <p className="text-[11px] text-center text-muted-foreground italic font-medium">
                      {t.ui.modeProfile}
                    </p>
                  </div>
                )}

                <dl className="space-y-4">
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {t.ui.problem}
                    </dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-foreground/90">{problem}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {t.ui.methods}
                    </dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{methods}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {t.ui.physicalRelevance}
                    </dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{physicalRelevance}</dd>
                  </div>

                  {themeProjects.length > 0 && (
                    <div>
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        {t.ui.featuredTools}
                      </dt>
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
  )
}
