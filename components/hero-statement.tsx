"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, FileText, Mail } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import {
  identity,
  currentPosition,
  profileLinks,
  researchThemes,
} from "@/lib/academic-content"

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

export function HeroSection() {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"

  const roleLine = isDe ? t.identity.role : currentPosition
  const locationLine = isDe ? identity.location_de : identity.location
  const primaryProfileLinks = profileLinks.filter((link) => link.label !== "ResearchGate")

  return (
    <section className="container-layout grid gap-8 py-14 md:grid-cols-[minmax(0,1fr)_11.5rem] md:items-start md:py-20">
      <div className="order-2 max-w-2xl min-w-0 md:order-1">
        <h1 className="text-3xl font-semibold leading-[1.15] text-balance text-foreground md:text-4xl">
          {identity.name}
        </h1>

        <div className="mt-3.5 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
          <p className="font-medium text-foreground/90">{roleLine}</p>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span>{locationLine}</span>
            <span aria-hidden="true" className="text-muted-foreground/50">
              -
            </span>
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-accent-strong hover:underline underline-offset-4"
            >
              <Mail className="h-3 w-3 shrink-0" aria-hidden="true" />
              {identity.email}
            </a>
          </div>
        </div>

        <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.75] text-pretty text-muted-foreground sm:text-base sm:leading-[1.75] break-words">
          {t.identity.statement}
        </p>

        <div className="mt-7 flex flex-wrap gap-2.5">
          {primaryProfileLinks.map((link) => {
            const isCv = link.label === "CV"
            const label = isCv && isDe ? t.nav.cv : link.label

            return link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group trigger-secondary-chip touch-target"
              >
                {label}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                  aria-hidden="true"
                />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={isCv ? "btn-primary touch-target" : "trigger-secondary-chip touch-target"}
              >
                {isCv && <FileText className="h-3.5 w-3.5" aria-hidden="true" />}
                {label}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="order-1 h-36 w-36 overflow-hidden rounded-full bg-surface ring-1 ring-border ring-offset-4 ring-offset-background md:order-2 md:h-40 md:w-40 md:justify-self-end">
        <Image
          src="/personal-pic.png"
          alt={isDe ? `Porträt von ${identity.name}` : `Portrait of ${identity.name}`}
          width={400}
          height={400}
          priority
          className="aspect-square h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

export function HomepageResearchOverview() {
  const { lang } = useLanguage()
  const isDe = lang === "de"

  const caption = isDe
    ? "Schematische Übersicht integrierter Wellenleiterarchitekturen (oben: Ringresonatoren, Richtkoppler und Gitterkoppler) sowie repräsentativer Querschnittsgeometrien (unten)."
    : "Conceptual schematic of integrated photonic waveguide architectures (top: interferometric ring resonators, directional coupler, and grating couplers) with device cross-sections (bottom)."

  return (
    <div className="max-w-3xl space-y-7">
      <figure className="w-full max-w-xl space-y-2.5">
        <div className="figure-plate">
          <Image
            src="/images/homepage-toc.png"
            alt={caption}
            width={1200}
            height={750}
            priority
            className="figure-plate-img aspect-[1.6] h-auto w-full object-contain"
          />
        </div>
        <figcaption className="text-xs leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      </figure>

      <ol className="divide-y divide-border/80 border-y border-border/80">
        {researchThemes.map((theme, index) => {
          const num = String(index + 1).padStart(2, "0")
          const meta = pillarMeta[theme.id]
          const title = isDe && meta?.deTitle ? meta.deTitle : theme.title
          const summary = isDe ? meta?.deSummary : meta?.enSummary

          return (
            <li key={theme.id}>
              <Link
                href={`/research#${theme.id}`}
                className="group -mx-2 flex items-start justify-between gap-4 rounded-md px-2 py-4 transition-colors duration-150 hover:bg-background/70"
              >
                <div className="flex min-w-0 items-baseline gap-3.5">
                  <span className="shrink-0 font-mono text-xs font-semibold tabular-nums text-accent">
                    {num}
                  </span>
                  <div className="min-w-0 space-y-1">
                    <p className="text-[15px] font-semibold text-foreground transition-colors duration-150 group-hover:text-accent">
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
                  className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px] group-hover:text-accent"
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
