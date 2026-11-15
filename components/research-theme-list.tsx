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
    <div className="divide-y divide-border">
      {themes.map((theme, idx) => {
        const themePublications = publications.filter((pub) => pub.relatedThemes?.includes(theme.id))
        const isEven = idx % 2 === 1
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
          <article
            key={theme.id}
            id={theme.id}
            className={`py-8 sm:py-10 scroll-mt-24 ${
              isEven ? "-mx-5 px-5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 bg-surface/40" : ""
            }`}
          >
            <div className="space-y-5">
              {/* Theme Header Bar */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 border-b border-border/70 pb-3 min-w-0 w-full">
                <h2 className="flex items-baseline gap-2.5 text-lg sm:text-xl font-semibold text-foreground break-words min-w-0">
                  <span className="font-mono text-xs font-semibold tabular-nums text-accent shrink-0">
                    {num}
                  </span>
                  <span>{title}</span>
                </h2>

                {themePublications.length > 0 && (
                  <Link
                    href={`/publications?topic=${theme.id}`}
                    className="btn-secondary self-start md:self-auto shrink-0"
                  >
                    <span>{t.ui.topicPublications}</span>
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                )}
              </div>

              {/* Body Grid */}
              <div className="grid gap-8 md:grid-cols-[17rem_minmax(0,1fr)] items-start min-w-0 w-full">
                {theme.image && (
                  <figure className="space-y-2 shrink-0 w-full max-w-full">
                    <div className="overflow-hidden rounded-md border border-border bg-card p-1.5">
                      <Image
                        src={theme.image}
                        alt={caption}
                        width={480}
                        height={300}
                        priority={idx === 0}
                        loading={idx === 0 ? "eager" : "lazy"}
                        className="aspect-[1.6] h-auto w-full object-contain rounded-sm"
                      />
                    </div>
                    <figcaption className="text-[11px] leading-relaxed text-muted-foreground">
                      {caption}
                    </figcaption>
                  </figure>
                )}

                <dl className="space-y-4 min-w-0 w-full">
                  <div className="min-w-0 w-full">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {t.ui.problem}
                    </dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-foreground/90 break-words min-w-0 w-full">
                      {problem}
                    </dd>
                  </div>
                  <div className="min-w-0 w-full">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {t.ui.methods}
                    </dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground break-words min-w-0 w-full">
                      {methods}
                    </dd>
                  </div>
                  <div className="min-w-0 w-full">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {t.ui.physicalRelevance}
                    </dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground break-words min-w-0 w-full">
                      {physicalRelevance}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
