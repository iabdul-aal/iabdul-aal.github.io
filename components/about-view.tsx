"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, FileText, Mail } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import {
  aboutParagraphs,
  germanAboutParagraphs,
  identity,
  profileLinks,
} from "@/lib/academic-content"
import { socialLinks } from "@/lib/social-links"
import { useLanguage } from "@/lib/i18n-context"

export function AboutView() {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"

  return (
    <main>
      <PageHeader
        eyebrow={t.headers.aboutEyebrow}
        title={t.headers.aboutTitle}
        description={t.headers.aboutDesc}
        i18nKey="about"
      />

      <section className="container-layout grid gap-10 pb-16 md:grid-cols-[14.5rem_minmax(0,1fr)] md:gap-12">
        <aside className="space-y-4">
          <div className="w-40 overflow-hidden rounded-lg border border-border bg-surface">
            <Image
              src="/personal-pic.png"
              alt={isDe ? `Porträt von ${identity.name}` : `Portrait of ${identity.name}`}
              width={400}
              height={400}
              priority
              className="aspect-square h-auto w-full object-cover"
            />
          </div>
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <p className="text-sm font-semibold text-foreground">{identity.name}</p>
            <p className="leading-relaxed text-foreground/90">
              {isDe ? "Doktorand (Studienphase)" : "Ph.D. Candidate (Study Phase)"}
            </p>
            <p className="leading-relaxed">
              Max Planck School of Photonics · FAU Erlangen-Nürnberg (MAOT)
            </p>
            <p>{isDe ? identity.location_de : identity.location}</p>
            <div className="space-y-1.5 border-t border-border/60 pt-2.5">
              <a
                href={`mailto:${identity.email}`}
                className="inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-accent-strong hover:underline underline-offset-4"
              >
                <Mail className="h-3 w-3 shrink-0" aria-hidden="true" />
                {identity.email}
              </a>
              {identity.orcid && (
                <p>
                  <a
                    href={socialLinks.orcid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 tabular-nums text-muted-foreground transition-colors hover:text-accent hover:underline underline-offset-4"
                  >
                    ORCID: {identity.orcid}
                    <ArrowUpRight
                      className="h-3 w-3 shrink-0 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                      aria-hidden="true"
                    />
                  </a>
                </p>
              )}
            </div>
          </div>
        </aside>

        <article className="min-w-0 space-y-8">
          <div className="max-w-[66ch] space-y-4 text-[15px] leading-[1.75] text-muted-foreground">
            {(isDe ? germanAboutParagraphs : aboutParagraphs).map((para, i) => (
              <p key={i} className="text-pretty">
                {para}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 border-t border-border/70 pt-6">
            {profileLinks.map((link) => {
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
                    className="h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
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
        </article>
      </section>
    </main>
  )
}
