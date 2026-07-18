"use client"

import Link from "next/link"
import { ArrowUpRight, Download, ExternalLink, Mail } from "lucide-react"
import { Trigger } from "@/components/ui/trigger"
import { Shell } from "@/components/ui/shell"
import { Row } from "@/components/ui/row"
import { SectionShell } from "@/components/layout/section-shell"
import cvData from "@/data/cv_data.json"
import { useLanguage } from "@/lib/i18n-context"
import type { PublicationRecord } from "@/types/publication"
import type { Project } from "@/lib/academic-content"

interface EntryProps {
  role: string
  period: string
  org: string
  location?: string
}

function Entry({ role, period, org, location }: EntryProps) {
  const cleanPeriod = period ? period.replace(/\s*--\s*/g, " – ") : ""
  return (
    <Row as="div">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4 gap-y-1 w-full min-w-0">
        <p className="text-sm font-semibold text-foreground break-words min-w-0 flex-1">{role}</p>
        <p className="text-xs text-muted-foreground tabular-nums shrink-0">{cleanPeriod}</p>
      </div>
      <p className="text-sm text-accent break-words min-w-0 mt-0.5">{org}</p>
      {location && <p className="text-xs text-muted-foreground break-words min-w-0 mt-0.5">{location}</p>}
    </Row>
  )
}

interface CvViewProps {
  totalPublicationsCount: number
  featuredPubs: PublicationRecord[]
  rankedTools: Project[]
}

interface ResearchExperienceEntry {
  role: string
  role_de?: string
  period: string
  period_de?: string
  org: string
  org_de?: string
  location?: string
  location_de?: string
}

export function CvView({ totalPublicationsCount, featuredPubs, rankedTools }: CvViewProps) {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"
  const pdfUrl = isDe ? "/cv_de.pdf" : "/cv.pdf"

  const { personalInfo: info } = cvData

  function de(base: string, de_field?: string): string {
    return isDe && de_field ? de_field : base
  }

  return (
    <main className="pb-20">
      {/* Hero */}
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t.headers.cvEyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
              {info.name}
            </h1>
            <p className="mt-1 text-sm text-accent">
              {de(info.specialization, info.specialization_de)}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground max-w-xl">
              {de(cvData.researchInterests, cvData.researchInterests_de)}
            </p>
          </div>

          {/* CV download card */}
          <Shell variant="secondary" className="self-start">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {t.ui.fullCvDoc}
            </p>
            <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
              <a
                href={`mailto:${info.email}`}
                className="flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {info.email}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <Trigger variant="primary" asChild>
                <a href={pdfUrl} download>
                  <Download className="h-3.5 w-3.5" />
                  {isDe ? t.ui.downloadPdfDe : t.ui.downloadPdf}
                </a>
              </Trigger>
              <Trigger variant="chip" asChild>
                <a href={pdfUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" />
                  {t.ui.openPdf}
                </a>
              </Trigger>
            </div>
          </Shell>
        </div>
      </div>

      {/* Education */}
      <SectionShell label={t.sections.education} alt>
        <div className="list-container">
          {cvData.education.map((ed) => (
            <Entry
              key={ed.degree}
              role={de(ed.degree, ed.degree_de)}
              period={ed.period}
              org={de(ed.institution, ed.institution_de)}
              location={de(ed.location, ed.location_de)}
            />
          ))}
        </div>
      </SectionShell>

      {/* Research Experience */}
      <SectionShell label={t.sections.researchExperience}>
        <div className="list-container">
          {(cvData.researchExperience as ResearchExperienceEntry[]).map((exp) => (
            <Entry
              key={exp.role + exp.org}
              role={de(exp.role, exp.role_de)}
              period={de(exp.period, exp.period_de)}
              org={de(exp.org, exp.org_de)}
              location={de(exp.location || "", exp.location_de)}
            />
          ))}
        </div>
      </SectionShell>

      {/* Featured Publications */}
      <SectionShell label={t.sections.featuredPublications} alt>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 w-full min-w-0">
          <p className="text-xs text-muted-foreground min-w-0">
            {isDe ? "Die am häufigsten zitierten Publikationen." : "Top citation-ranked papers."}{" "}
            {totalPublicationsCount} {t.ui.publications}.
          </p>
          <Link href="/publications" className="btn-secondary self-start sm:self-auto shrink-0">
            {t.ui.allPublications}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="list-container">
          {featuredPubs.map((pub) => (
            <Row key={pub.id} as="div">
              <h3 className="text-sm font-semibold text-foreground leading-snug break-words w-full">
                {pub.title}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
                <span className="text-muted-foreground">
                  {[pub.venue, pub.year].filter(Boolean).join(", ")}
                </span>
                {pub.badges?.map((badge) => {
                  const b = badge.toLowerCase()
                  const translatedBadge =
                    isDe
                      ? b.includes("invited")
                        ? "Eingeladener Beitrag"
                        : b.includes("featured")
                        ? "Ausgewählt"
                        : badge
                      : badge
                  return (
                    <span
                      key={badge}
                      className="badge-subtle text-amber-600 dark:text-amber-400 bg-amber-500/10 ring-amber-500/20"
                    >
                      {translatedBadge}
                    </span>
                  )
                })}
              </div>
            </Row>
          ))}
        </div>
      </SectionShell>

      {/* Featured Software */}
      {rankedTools.length > 0 && (
        <SectionShell label={t.sections.featuredSoftware}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 w-full min-w-0">
            <p className="text-xs text-muted-foreground min-w-0">
              {isDe ? "Zentrale Softwareplattformen." : "Key software platforms."}
            </p>
            <Link href="/tools" className="btn-secondary self-start sm:self-auto shrink-0">
              {t.ui.allTools}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-4">
            {rankedTools.slice(0, 1).map((tool) => (
              <div key={tool.id} className="featured-rule bg-card py-2">
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {tool.title}
                </p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {tool.objective}
                </p>
              </div>
            ))}
          </div>
        </SectionShell>
      )}

      {/* Full CV Preview */}
      <SectionShell label={t.sections.fullCvSection} alt>
        <div className="overflow-hidden rounded-md border border-border bg-card">
          <iframe
            src={pdfUrl}
            title="CV PDF preview"
            className="h-[75vh] sm:h-[82vh] min-h-[500px] sm:min-h-[600px] w-full min-w-0"
          />
        </div>
        <div className="mt-3 flex justify-end">
          <Trigger variant="chip" asChild>
            <a href={pdfUrl} target="_blank" rel="noreferrer">
              {t.ui.fullCvPreview}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Trigger>
        </div>
      </SectionShell>
    </main>
  )
}
