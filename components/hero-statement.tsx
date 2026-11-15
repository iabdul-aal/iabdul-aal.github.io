"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { identity, currentPosition, researchThemes } from "@/lib/academic-content"

const pillarMeta: Record<
  string,
  {
    enSummary: string
    deTitle: string
    deSummary: string
  }
> = {
  "integrated-nanophotonics": {
    enSummary:
      "Active guided-mode, cavity, and BIC metasurface electrodynamics in anisotropic and hybrid material platforms.",
    deTitle: "Integrierte Nanophotonik",
    deSummary:
      "Elektrodynamik geführter Moden, Resonatoren und BIC-Metastrukturen in anisotropen sowie hybriden Materialplattformen.",
  },
  "quantum-photonics": {
    enSummary:
      "Waveguide-integrated spontaneous parametric down-conversion sources and coherent on-chip photon routing.",
    deTitle: "Quantenphotonik",
    deSummary:
      "Wellenleiterintegrierte Photonenpaar-Quellen durch spontane parametrische Fluoreszenz und kohärente On-Chip-Verteilung.",
  },
  "intelligent-photonics": {
    enSummary:
      "Physics-informed neural surrogates and wave-equation-constrained inverse design for photonic devices.",
    deTitle: "Intelligente Photonik",
    deSummary:
      "Physikinformierte neuronale Surrogate und wellengleichungsbeschränktes Inversdesign für photonische Bauelemente.",
  },
}

export function HeroStatement() {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"

  const roleLine = isDe ? t.identity.role : currentPosition
  const affiliationLine = t.identity.affiliation
  const showAffiliationSeparately =
    Boolean(affiliationLine) &&
    !roleLine.toLowerCase().includes("fau") &&
    !roleLine.toLowerCase().includes("photonics")

  return (
    <div className="min-w-0 w-full space-y-3 mt-3">
      <div className="space-y-1 text-xs leading-relaxed text-muted-foreground">
        <p className="font-medium text-foreground/90">{roleLine}</p>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {showAffiliationSeparately && <span>{affiliationLine}</span>}
          {showAffiliationSeparately && identity.location && (
            <span aria-hidden="true" className="text-border">
              /
            </span>
          )}
          {identity.location && <span>{identity.location}</span>}
          {identity.email && (
            <>
              <span aria-hidden="true" className="text-border">
                /
              </span>
              <a
                href={`mailto:${identity.email}`}
                className="inline-flex items-center gap-1 text-accent hover:text-accent-strong hover:underline"
              >
                <Mail className="h-3 w-3 shrink-0" aria-hidden="true" />
                {identity.email}
              </a>
            </>
          )}
        </div>
      </div>

      <p className="pt-1 text-base leading-7 text-muted-foreground break-words min-w-0 w-full">
        {t.identity.statement}
      </p>
    </div>
  )
}

export function HomepageResearchText() {
  const { t } = useLanguage()
  return (
    <p className="text-sm leading-7 text-muted-foreground">
      {t.identity.homepageStatement}
    </p>
  )
}

export function HomepageResearchOverview() {
  const { lang } = useLanguage()
  const isDe = lang === "de"

  const caption = isDe
    ? "Schematische Übersicht integrierter Wellenleiterarchitekturen (oben: Ringresonatoren, Richtkoppler und Gitterkoppler) sowie repräsentativer Querschnittsgeometrien (unten)."
    : "Conceptual schematic of integrated photonic waveguide architectures (top: interferometric ring resonators, directional coupler, and grating couplers) with device cross-sections (bottom)."

  return (
    <div className="max-w-3xl space-y-6">
      <figure className="w-full max-w-xl space-y-2">
        <div className="overflow-hidden rounded-md border border-border bg-card">
          <Image
            src="/images/homepage-toc.png"
            alt={caption}
            width={800}
            height={500}
            priority
            className="aspect-[1.6] h-auto w-full object-contain p-2"
          />
        </div>
        <figcaption className="text-xs leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      </figure>

      <ol className="divide-y divide-border border-y border-border">
        {researchThemes.map((theme, index) => {
          const num = String(index + 1).padStart(2, "0")
          const meta = pillarMeta[theme.id]
          const title = isDe && meta?.deTitle ? meta.deTitle : theme.title
          const summary = isDe ? meta?.deSummary : meta?.enSummary

          return (
            <li key={theme.id}>
              <Link
                href={`/research#${theme.id}`}
                className="group flex items-start justify-between gap-4 py-3.5 transition-colors hover:bg-surface/60 px-1 rounded-sm"
              >
                <div className="flex items-baseline gap-3.5 min-w-0">
                  <span className="font-mono text-xs font-semibold tabular-nums text-accent shrink-0">
                    {num}
                  </span>
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                      {title}
                    </p>
                    {summary && (
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {summary}
                      </p>
                    )}
                  </div>
                </div>
                <ArrowUpRight
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-accent transition-colors"
                  aria-hidden="true"
                />
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
