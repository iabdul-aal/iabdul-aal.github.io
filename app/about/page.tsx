"use client"

import Image from "next/image"
import { ArrowUpRight, Mail } from "lucide-react"
import { aboutParagraphs, aboutEpigraph, aboutEpigraphAuthor, identity, profileLinks } from "@/lib/academic-content"
import { useLanguage } from "@/lib/i18n-context"

const germanAboutParagraphs = [
  "Die Forschungsaktivitäten konzentrieren sich auf wellengleichungsbeschränkte numerische Modellierung und Bauelementsimulation in der integrierten Nanophotonik. Übergeordnetes Ziel ist die Entwicklung reproduzierbarer Berechnungsworkflows von der elektromagnetischen Theorie bis hin zu fertigbaren Geometrien durch FDTD-Simulationen, Kopplungsmodenanalyse und physikinformiertes Inversdesign.",
  "Veröffentlichte Peer-Review-Arbeiten umfassen einen Beitrag im Journal of Optics über Terahertz-BIC-Metasurflächen. Eingereichte Arbeiten umfassen einen Preprint über physikinformierte Inversdesign-Pipelines für SPDC-Quellen.",
]

export default function AboutPage() {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"

  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[13rem_minmax(0,1fr)] md:py-16 lg:px-8">
        <aside>
          <div className="w-40 overflow-hidden rounded-md border border-border bg-surface ring-2 ring-border">
            <Image
              src="/personal-pic.png"
              alt={`Portrait of ${identity.name}`}
              width={320}
              height={320}
              className="aspect-square h-auto w-full object-cover"
            />
          </div>
          <div className="mt-5 space-y-1 text-xs text-muted-foreground">
            <p className="font-semibold text-sm text-foreground">{identity.name}</p>
            {identity.affiliation && <p>{identity.affiliation}</p>}
            {identity.location && <p>{identity.location}</p>}
            <a
              href={`mailto:${identity.email}`}
              className="mt-2 inline-flex items-center gap-1.5 text-accent hover:text-accent-strong transition-colors"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {identity.email}
            </a>
          </div>
        </aside>

        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t.headers.aboutEyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            {t.headers.aboutTitle}
          </h1>

          <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
            {(isDe ? germanAboutParagraphs : aboutParagraphs).map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <figure className="mt-8 featured-rule py-2.5 px-4 text-muted-foreground text-sm max-w-2xl bg-surface/40 rounded-r-md">
            <blockquote className="italic">“{isDe ? t.identity.aboutEpigraph : aboutEpigraph}”</blockquote>
            <figcaption className="mt-1.5 text-xs font-semibold not-italic text-foreground text-right">
              {aboutEpigraphAuthor}
            </figcaption>
          </figure>

          <div className="mt-10 border-t border-border pt-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t.sections.academicProfiles}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {profileLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="trigger-secondary-chip"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : null,
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
