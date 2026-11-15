"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, FileText, Mail } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import {
  aboutParagraphs,
  identity,
  profileLinks,
} from "@/lib/academic-content"
import { personConfig } from "@/lib/site-config"
import { socialLinks } from "@/lib/social-links"
import { useLanguage } from "@/lib/i18n-context"

const germanAboutParagraphs = [
  "Islam I. Abdulaal ist Doktorand in der Studienphase an der Max Planck School of Photonics und studiert im Masterstudiengang Advanced Optical Technologies (MAOT) an der Friedrich-Alexander-Universität Erlangen-Nürnberg. Zuvor erwarb er den B.Sc. in Elektronik und Kommunikationstechnik an der Universität Alexandria und forschte im Bereich integrierter Photonik am NanoPhoto Lab (IMRE, A*STAR) sowie in der OPST-Gruppe an der Universität Alexandria.",
  "Seine Forschungsschwerpunkte liegen in der integrierten Nanophotonik, der Quantenphotonik und der intelligenten Photonik und verbinden Vollwellen-Elektrodynamik mit physikinformierten neuronalen Surrogaten für Wellenleitermodellierung und inverses Bauelementdesign.",
  "Er ist studentisches Mitglied des Elitenetzwerks Bayern, Gründungs-Vorstandsmitglied der Optica-Lokalsektion Ägypten und war zuvor Vorsitzender des IEEE Solid-State Circuits Society Student Branch Chapter an der Universität Alexandria.",
]

export function AboutView() {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"

  const orcidValue = "orcid" in identity && typeof identity.orcid === "string"
    ? identity.orcid
    : personConfig.orcid

  return (
    <main>
      <PageHeader
        eyebrow={t.headers.aboutEyebrow}
        title={t.headers.aboutTitle}
        description={t.headers.aboutDesc}
        i18nKey="about"
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 sm:px-6 md:grid-cols-[14rem_minmax(0,1fr)] lg:px-8">
        {/* Profile Sidebar */}
        <aside className="space-y-4">
          <div className="w-40 overflow-hidden rounded-md border border-border bg-surface">
            <Image
              src="/personal-pic.png"
              alt={`Portrait of ${identity.name}`}
              width={400}
              height={400}
              className="aspect-square h-auto w-full object-cover"
            />
          </div>
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <p className="text-sm font-semibold text-foreground">{identity.name}</p>
            <p className="leading-relaxed text-foreground/85">
              {isDe ? "Doktorand (Studienphase)" : "Ph.D. Candidate (Study Phase)"}
            </p>
            <p className="leading-relaxed">
              {isDe
                ? "Max Planck School of Photonics · FAU Erlangen-Nürnberg (MAOT)"
                : "Max Planck School of Photonics · FAU Erlangen-Nürnberg (MAOT)"}
            </p>
            <p>{identity.location || personConfig.location}</p>
            <div className="pt-1 space-y-1">
              <a
                href={`mailto:${identity.email}`}
                className="inline-flex items-center gap-1.5 text-accent hover:text-accent-strong hover:underline"
              >
                <Mail className="h-3 w-3 shrink-0" aria-hidden="true" />
                {identity.email}
              </a>
              {orcidValue && (
                <p>
                  <a
                    href={socialLinks.orcid}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-accent hover:underline"
                  >
                    ORCID: {orcidValue}
                    <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
                  </a>
                </p>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <article className="space-y-8 min-w-0">
          {/* Concise Biography */}
          <div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">
            {(isDe ? germanAboutParagraphs : aboutParagraphs).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {profileLinks.map((link) => {
              const isCv = link.label === "CV"
              return link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="trigger-secondary-chip touch-target"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={isCv ? "btn-primary touch-target" : "trigger-secondary-chip touch-target"}
                >
                  {isCv && <FileText className="h-3.5 w-3.5" aria-hidden="true" />}
                  {link.label}
                </Link>
              )
            })}
          </div>
        </article>
      </section>
    </main>
  )
}
