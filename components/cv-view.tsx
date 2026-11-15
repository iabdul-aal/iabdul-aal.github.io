"use client"

import { ArrowUpRight, Download, ExternalLink, Mail } from "lucide-react"
import { Trigger } from "@/components/ui/trigger"
import { Shell } from "@/components/ui/shell"
import { Row } from "@/components/ui/row"
import { ScientificText } from "@/components/ui/scientific-text"
import { SectionShell } from "@/components/layout/section-shell"
import cvData from "@/data/cv_data.json"
import { socialLinks } from "@/lib/social-links"
import { useLanguage } from "@/lib/i18n-context"

interface EntryProps {
  role: string
  period: string
  org: string
  location?: string
}

function Entry({ role, period, org, location }: EntryProps) {
  const cleanPeriod = period ? period.replace(/\s*--\s*/g, " - ") : ""
  return (
    <Row as="div">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4 gap-y-1 w-full min-w-0">
        <p className="text-sm font-semibold text-foreground break-words min-w-0 flex-1">
          <ScientificText text={role} />
        </p>
        {cleanPeriod && (
          <p className="text-xs font-mono text-muted-foreground tabular-nums shrink-0">
            {cleanPeriod}
          </p>
        )}
      </div>
      <p className="text-sm text-accent break-words min-w-0 mt-0.5">{org}</p>
      {location && (
        <p className="text-xs text-muted-foreground break-words min-w-0 mt-0.5">
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

  const { personalInfo: info } = cvData

  function de(base: string, deField?: string): string {
    return isDe && deField ? deField : base
  }

  return (
    <main className="pb-20">
      {/* Hero */}
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
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
          </div>

          {/* CV download card */}
          <Shell variant="secondary" className="self-start">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {t.ui.fullCvDoc}
            </p>
            <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
              {info.city && info.country && (
                <p>{`${info.city}, ${info.country}`}</p>
              )}
              <a
                href={`mailto:${info.email}`}
                className="flex items-center gap-1.5 text-accent hover:text-accent-strong hover:underline transition-colors"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {info.email}
              </a>
              {info.orcid && (
                <a
                  href={socialLinks.orcid}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-accent transition-colors"
                >
                  ORCID: {info.orcid}
                  <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Trigger variant="primary" className="touch-target" asChild>
                <a href="/cv.pdf" download>
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.ui.downloadPdfEn}
                </a>
              </Trigger>
              <Trigger variant="chip" className="touch-target" asChild>
                <a href="/cv_de.pdf" download>
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.ui.downloadPdfDe}
                </a>
              </Trigger>
              <Trigger variant="chip" className="touch-target" asChild>
                <a href={pdfUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.ui.openPdf}
                </a>
              </Trigger>
            </div>
          </Shell>
        </div>
      </div>

      {/* Education (no bullet points) */}
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

      {/* Research Experience (no bullet points) */}
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

      {/* Full CV PDF Document Preview */}
      <SectionShell label={t.sections.fullCvSection} alt>
        <div className="hidden md:block overflow-hidden rounded-md border border-border bg-card">
          <iframe
            src={pdfUrl}
            title={isDe ? "Lebenslauf PDF-Vorschau" : "Curriculum Vitae PDF preview"}
            className="h-[78vh] min-h-[600px] w-full min-w-0"
          />
        </div>

        {/* Mobile fallback card */}
        <div className="md:hidden rounded-md border border-border bg-card p-5 space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">{t.ui.fullCvDoc}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {isDe
                ? "Die eingebettete PDF-Vorschau ist für größere Bildschirme optimiert. Laden Sie den aktuellen Lebenslauf auf Englisch oder Deutsch direkt herunter."
                : "Inline PDF viewing is optimized for larger displays. Download the compiled English or German PDF directly below."}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Trigger variant="primary" className="touch-target" asChild>
              <a href="/cv.pdf" download>
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                {t.ui.downloadPdfEn}
              </a>
            </Trigger>
            <Trigger variant="chip" className="touch-target" asChild>
              <a href="/cv_de.pdf" download>
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                {t.ui.downloadPdfDe}
              </a>
            </Trigger>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap justify-end gap-2">
          <Trigger variant="chip" className="touch-target" asChild>
            <a href={pdfUrl} target="_blank" rel="noreferrer">
              {t.ui.fullCvPreview}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </Trigger>
        </div>
      </SectionShell>
    </main>
  )
}
