"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, FileText, Mail } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { aboutParagraphs, aboutEpigraph, aboutEpigraphAuthor, identity, profileLinks } from "@/lib/academic-content"
import { personConfig } from "@/lib/site-config"
import { useLanguage } from "@/lib/i18n-context"

const germanAboutParagraphs = [
  "Die Forschungsaktivitäten konzentrieren sich auf wellengleichungsbeschränkte numerische Elektrodynamik und Bauelementsimulation in der integrierten Nanophotonik. Übergeordnetes Ziel ist die Entwicklung reproduzierbarer Berechnungsworkflows von der elektromagnetischen Theorie bis hin zu fertigbaren Geometrien durch FDTD-Simulationen, Kopplungsmodenanalyse und physikinformiertes Inversdesign.",
  "Die wissenschaftlichen Schwerpunkte erstrecken sich über drei Kernbereiche: integrierte aktive Nanophotonik, nichtlineare Quantenphotonik und physikinformierte neuronale Surrogate. Im Bereich der Quantenphotonik stehen wellenleiterbasierte Quellen verschränkter Photonenpaare durch spontane parametrische Fluoreszenz (SPDC) sowie die Optimierung modaler Phasenanpassung im Fokus.",
  "Um den Rechenaufwand iterativer Vollwellensimulationen zu reduzieren, werden physikinformierte neuronale Netze und Operator-Architekturen mit exakten Differentialgleichungs-Formulierungen kombiniert. Das akademische Fundament im Ingenieurwesen an der Universität Alexandria wird durch Forschungsarbeiten am NanoPhoto Lab des Instituts für Materialforschung und Ingenieurwesen (IMRE), A*STAR ergänzt.",
]

export function AboutView() {
  const { lang } = useLanguage()
  const isDe = lang === "de"

  return (
    <main>
      <PageHeader
        eyebrow="About"
        title="Research profile"
        description="Academic background and research specialization in integrated photonics and inverse design."
        i18nKey="about"
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 sm:px-6 md:grid-cols-[13rem_minmax(0,1fr)] lg:px-8">
        {/* Profile Sidebar */}
        <aside className="space-y-4">
          <div className="w-40 overflow-hidden rounded-md border border-border bg-surface ring-2 ring-border">
            <Image
              src="/personal-pic.png"
              alt={`Portrait of ${identity.name}`}
              width={320}
              height={320}
              className="aspect-square h-auto w-full object-cover"
            />
          </div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">{identity.name}</p>
            <p>{personConfig.role}</p>
            <p>{personConfig.affiliation}</p>
            <p>{personConfig.location}</p>
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex items-center gap-1 pt-1 text-accent hover:underline"
            >
              <Mail className="h-3 w-3 shrink-0" />
              {identity.email}
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <article className="space-y-8 min-w-0">
          {/* Biography */}
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            {(isDe ? germanAboutParagraphs : aboutParagraphs).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Quote — no box, just a left border rule */}
          <blockquote className="border-l-2 border-accent pl-4 space-y-1">
            <p className="text-sm italic text-foreground/80 leading-relaxed">
              &ldquo;{aboutEpigraph}&rdquo;
            </p>
            <p className="text-xs font-semibold text-foreground text-right">{aboutEpigraphAuthor}</p>
          </blockquote>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {profileLinks.map((link) => {
              const isCv = link.label === "CV"
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className={isCv ? "btn-primary" : "trigger-secondary-chip"}
                >
                  {isCv
                    ? <><FileText className="h-3.5 w-3.5" aria-hidden="true" />{link.label}</>
                    : <>{link.label}<ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /></>}
                </Link>
              )
            })}
          </div>
        </article>
      </section>
    </main>
  )
}
