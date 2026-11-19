"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { PublicationRecord } from "@/types/publication"

interface ThemeItem {
  id: string
  title: string
  image?: string
  problem: string
  methods: string
  physicalRelevance: string
}

const themeCaptions: Record<string, { en: string; de: string }> = {
  "integrated-nanophotonics": {
    en: "Conceptual schematic of guided optical confinement in a high-index ridge waveguide architecture.",
    de: "Schematische Darstellung der geführten optischen Modenbegrenzung in einem hochbrechenden Stegwellenleiter.",
  },
  "quantum-photonics": {
    en: "Conceptual schematic of a photonic crystal resonator coupled to an integrated Y-branch splitter separating pump and biphoton channels.",
    de: "Schematische Darstellung eines photonischen Kristallresonators mit integriertem Y-Verzweiger zur Trennung von Pump- und Biphotonenkanälen.",
  },
  "intelligent-photonics": {
    en: "Conceptual schematic coupling a physics-informed neural surrogate to a photonic microcavity inverse-design loop.",
    de: "Schematische Darstellung der Kopplung eines physikinformierten neuronalen Surrogats an eine Inversdesign-Schleife für Mikroresonatoren.",
  },
}

const germanThemeData: Record<string, Partial<ThemeItem>> = {
  "integrated-nanophotonics": {
    title: "Integrierte Nanophotonik",
    problem:
      "Erforschung der Wechselwirkung zwischen geführten optischen Moden, hybriden aktiven Materialien (Ferroelektrika, Flüssigkristalle, 2D-Schichten) und umgebenden akustischen, thermischen oder elektrostatischen Feldern in Resonator-, Photonic-Crystal- und BIC-Strukturen.",
    methods:
      "Vollwellen-Elektromagnetik-Simulation, anisotrope Permittivitätstensor-Modellierung, multiphysikalische Finite-Elemente-Kopplung, Wellenleiter-Dispersionsdesign und Resonanzanalyse.",
    physicalRelevance:
      "Externe Stimuli verändern den lokalen Permittivitätstensor dynamisch, verschieben Resonanzen und stimmen Ausbreitungskonstanten für aktive Abstimmbarkeit auf dem Chip ab.",
  },
  "quantum-photonics": {
    title: "Quantenphotonik",
    problem:
      "Skalierung integrierter Quantentechnologien durch Integration wellenleiterbasierter nichtlinearer Photonenpaar-Quellen und phasenstabiler Schnittstellen.",
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
      "Physikinformierte neuronale Netze (PINNs), Adjungierten- und gradientenfreie Optimierung sowie optische neuronale Netzwerke (ONN).",
    physicalRelevance:
      "Etablierung eines rahmengestützten Systems, in dem physikalische Wellenausbreitung das Netzwerktraining leitet.",
  },
}

interface ResearchThemeListProps {
  themes: readonly ThemeItem[]
  publications: PublicationRecord[]
}

export function ResearchThemeList({ themes, publications }: ResearchThemeListProps) {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"

  return (
    <div>
      {themes.map((theme, idx) => {
        const themePublications = publications.filter((pub) => pub.relatedThemes?.includes(theme.id))
        const isAlt = idx % 2 === 1
        const num = String(idx + 1).padStart(2, "0")

        const deData = isDe ? germanThemeData[theme.id] : undefined
        const title = deData?.title || theme.title
        const problem = deData?.problem || theme.problem
        const methods = deData?.methods || theme.methods
        const physicalRelevance = deData?.physicalRelevance || theme.physicalRelevance
        const caption = themeCaptions[theme.id]
          ? isDe
            ? themeCaptions[theme.id].de
            : themeCaptions[theme.id].en
          : title

        return (
          <section
            key={theme.id}
            id={theme.id}
            className={`scroll-mt-20 border-t border-border/80 ${isAlt ? "bg-surface" : ""}`}
          >
            <article className="container-layout py-10 sm:py-14">
              <div className="space-y-6">
                <div className="flex flex-col gap-2 border-b border-border/70 pb-3.5 md:flex-row md:items-center md:justify-between md:gap-4 min-w-0 w-full">
                  <h2 className="flex items-baseline gap-3 text-lg font-semibold text-foreground sm:text-xl break-words min-w-0">
                    <span className="shrink-0 font-mono text-xs font-semibold tabular-nums text-accent">
                      {num}
                    </span>
                    <span>{title}</span>
                  </h2>

                  {themePublications.length > 0 && (
                    <Link
                      href={`/publications?topic=${theme.id}`}
                      className="group btn-secondary shrink-0 self-start md:self-auto"
                    >
                      <span>{t.ui.topicPublications}</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                        aria-hidden="true"
                      />
                    </Link>
                  )}
                </div>

                <div className="grid items-start gap-8 md:grid-cols-[18.5rem_minmax(0,1fr)] lg:grid-cols-[20rem_minmax(0,1fr)] min-w-0 w-full">
                  {theme.image && (
                    <figure className="w-full max-w-full shrink-0 space-y-2.5">
                      <div className="figure-plate">
                        <Image
                          src={theme.image}
                          alt={caption}
                          width={1200}
                          height={750}
                          priority={idx === 0}
                          className="figure-plate-img aspect-[1.6] h-auto w-full object-contain"
                        />
                      </div>
                      <figcaption className="text-[11px] leading-relaxed text-muted-foreground">
                        {caption}
                      </figcaption>
                    </figure>
                  )}

                  <dl className="divide-y divide-border/50 min-w-0 w-full">
                    <div className="pb-4 min-w-0 w-full">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                        {t.ui.problem}
                      </dt>
                      <dd className="mt-1.5 max-w-[66ch] text-sm leading-[1.7] text-foreground/90 break-words">
                        {problem}
                      </dd>
                    </div>
                    <div className="py-4 min-w-0 w-full">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {t.ui.methods}
                      </dt>
                      <dd className="mt-1.5 max-w-[66ch] text-sm leading-[1.7] text-muted-foreground break-words">
                        {methods}
                      </dd>
                    </div>
                    <div className="pt-4 min-w-0 w-full">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {t.ui.physicalRelevance}
                      </dt>
                      <dd className="mt-1.5 max-w-[66ch] text-sm leading-[1.7] text-muted-foreground break-words">
                        {physicalRelevance}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </article>
          </section>
        )
      })}
    </div>
  )
}
