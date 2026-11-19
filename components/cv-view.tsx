"use client"

import { ArrowUpRight, Download, ExternalLink, FileText, Mail } from "lucide-react"
import { Trigger } from "@/components/ui/trigger"
import { Shell } from "@/components/ui/shell"
import { Row } from "@/components/ui/row"
import { ScientificText } from "@/components/ui/scientific-text"
import { SectionShell } from "@/components/layout/section-shell"
import cvData from "@/data/cv_data.json"
import { identity } from "@/lib/academic-content"
import { socialLinks } from "@/lib/social-links"
import { useLanguage } from "@/lib/i18n-context"

interface EntryProps {
  role: string
  period: string
  org: string
  location?: string
}

function Entry({ role, period, org, location }: EntryProps) {
  const cleanPeriod = period ? period.replace(/\s*--\s*/g, " \u2013 ") : ""
  return (
    <Row as="div">
      <div className="flex w-full min-w-0 flex-col gap-x-4 gap-y-1 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="min-w-0 flex-1 break-words text-[15px] font-semibold text-foreground">
          <ScientificText text={role} />
        </p>
        {cleanPeriod && (
          <p className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
            {cleanPeriod}
          </p>
        )}
      </div>
      <p className="mt-1 min-w-0 break-words text-sm text-accent">{org}</p>
      {location && (
        <p className="mt-0.5 min-w-0 break-words text-xs text-muted-foreground">
          {location}
        </p>
      )}
    </Row>
  )
}

interface EducationEntry {
  degree: string
  degree_de?: string
  period: string
  period_de?: string
  institution: string
  institution_de?: string
  location?: string
  location_de?: string
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

export function CvView() {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"
  const pdfUrl = isDe ? "/cv_de.pdf" : "/cv.pdf"
  const pdfFileName = isDe ? "cv_de.pdf" : "cv.pdf"

  const { personalInfo: info } = cvData

  function de(base: string, deField?: string): string {
    return isDe && deField ? deField : base
  }

  return (
    <main className="pb-20">
      <div className="container-layout py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-start">
          <div>
            <p className="eyebrow-label">{t.headers.cvEyebrow}</p>
            <h1 className="mt-3 text-3xl font-semibold leading-[1.15] text-foreground md:text-4xl">
              {identity.name}
            </h1>
            <p className="mt-2 text-sm font-medium text-accent">
              {de(info.specialization, info.specialization_de)}
            </p>
            <p className="mt-4 max-w-[60ch] text-sm leading-7 text-muted-foreground">
              {de(cvData.researchInterests, cvData.researchInterests_de)}
            </p>
          </div>

          <Shell variant="secondary" className="self-start">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {t.ui.fullCvDoc}
            </p>
            <div className="mb-4 space-y-1.5 text-xs text-muted-foreground">
              <p>{isDe ? identity.location_de : identity.location}</p>
              <a
                href={`mailto:${identity.email}`}
                className="flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-accent-strong hover:underline underline-offset-4"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {identity.email}
              </a>
              {identity.orcid && (
                <a
                  href={socialLinks.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 tabular-nums transition-colors hover:text-accent hover:underline underline-offset-4"
                >
                  ORCID: {identity.orcid}
                  <ArrowUpRight
                    className="h-3 w-3 shrink-0 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Trigger variant={isDe ? "chip" : "primary"} className="touch-target" asChild>
                <a href="/cv.pdf" download>
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.ui.downloadPdfEn}
                </a>
              </Trigger>
              <Trigger variant={isDe ? "primary" : "chip"} className="touch-target" asChild>
                <a href="/cv_de.pdf" download>
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.ui.downloadPdfDe}
                </a>
              </Trigger>
              <Trigger variant="chip" className="touch-target" asChild>
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.ui.openPdf}
                </a>
              </Trigger>
            </div>
          </Shell>
        </div>
      </div>

      <SectionShell label={t.sections.education} alt>
        <div className="list-container">
          {(cvData.education as EducationEntry[]).map((ed) => (
            <Entry
              key={ed.degree + ed.institution}
              role={de(ed.degree, ed.degree_de)}
              period={de(ed.period, ed.period_de)}
              org={de(ed.institution, ed.institution_de)}
              location={de(ed.location || "", ed.location_de)}
            />
          ))}
        </div>
      </SectionShell>

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

      <SectionShell label={t.sections.fullCvSection} alt>
        <div className="hidden overflow-hidden rounded-lg border border-border bg-card md:block">
          <div className="flex items-center justify-between border-b border-border/80 bg-surface/70 px-4 py-2.5 text-xs">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <FileText className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {pdfFileName}
            </span>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-secondary"
            >
              {t.ui.fullCvPreview}
              <ExternalLink
                className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                aria-hidden="true"
              />
            </a>
          </div>
          <iframe
            src={pdfUrl}
            title={isDe ? "Lebenslauf PDF-Vorschau" : "Curriculum Vitae PDF preview"}
            className="h-[78vh] min-h-[600px] w-full min-w-0 bg-card"
          />
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-card p-5 md:hidden">
          <div className="space-y-1.5">
            <h3 className="text-sm font-semibold text-foreground">{t.ui.fullCvDoc}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {isDe
                ? "Die eingebettete PDF-Vorschau ist für größere Bildschirme optimiert. Laden Sie den aktuellen Lebenslauf auf Englisch oder Deutsch direkt herunter."
                : "Inline PDF viewing is optimized for larger displays. Download the compiled English or German PDF directly below."}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Trigger variant={isDe ? "chip" : "primary"} className="touch-target" asChild>
              <a href="/cv.pdf" download>
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                {t.ui.downloadPdfEn}
              </a>
            </Trigger>
            <Trigger variant={isDe ? "primary" : "chip"} className="touch-target" asChild>
              <a href="/cv_de.pdf" download>
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                {t.ui.downloadPdfDe}
              </a>
            </Trigger>
            <Trigger variant="chip" className="touch-target" asChild>
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                {t.ui.fullCvPreview}
              </a>
            </Trigger>
          </div>
        </div>
      </SectionShell>
    </main>
  )
}
