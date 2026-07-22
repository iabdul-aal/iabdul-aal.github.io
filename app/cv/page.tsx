"use client"

import { Download, ExternalLink, Mail } from "lucide-react"
import { Trigger } from "@/components/ui/trigger"
import { Shell } from "@/components/ui/shell"
import { Row } from "@/components/ui/row"
import { SectionShell } from "@/components/layout/section-shell"
import cvData from "@/data/cv_data.json"
import { useLanguage } from "@/lib/i18n-context"

interface EntryProps {
  role: string
  period: string
  org: string
  location: string
}

function Entry({ role, period, org, location }: EntryProps) {
  return (
    <Row as="div">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-0.5">
        <p className="text-sm font-semibold text-foreground">{role}</p>
        <p className="text-xs text-muted-foreground tabular-nums">{period}</p>
      </div>
      <p className="text-sm text-accent">{org}</p>
      <p className="text-xs text-muted-foreground">{location}</p>
    </Row>
  )
}

const germanCvTranslations: Record<string, string> = {
  "B.Sc. in Electronics and Communications Engineering": "B.Sc. in Elektronik und Kommunikationstechnik",
  "Alexandria University, Faculty of Engineering": "Universität Alexandria, Fakultät für Ingenieurwissenschaften",
  "Research Intern": "Forschungspraktikant",
  "Onsite": "Vor Ort",
  "Remote": "Remote",
  "Hybrid": "Hybrid",
  "Present": "Heute",
  "Board Member": "Vorstandsmitglied",
  "Chairman": "Vorsitzender",
  "General Coordinator": "Hauptkoordinator",
  "Tutor / Mentor": "Tutor / Mentor",
}

export default function CvPage() {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"
  const pdfUrl = isDe ? "/cv_de.pdf" : "/cv.pdf"

  const { personalInfo: info } = cvData

  const translateText = (text: string) => {
    if (!isDe) return text
    return germanCvTranslations[text] || text.replace("Present", "Heute")
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
            <p className="mt-1 text-sm text-accent">{isDe ? t.identity.role : info.specialization}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground max-w-xl">
              {isDe ? t.identity.statement : cvData.researchInterests}
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
              role={translateText(ed.degree)}
              period={translateText(ed.period)}
              org={translateText(ed.institution)}
              location={translateText(ed.location)}
            />
          ))}
        </div>
      </SectionShell>

      {/* Research Experience */}
      <SectionShell label={t.sections.researchExperience}>
        <div className="list-container">
          {cvData.researchExperience.map((exp) => (
            <Entry
              key={exp.role + exp.org}
              role={translateText(exp.role)}
              period={translateText(exp.period)}
              org={exp.org}
              location={translateText(exp.location)}
            />
          ))}
        </div>
      </SectionShell>

      {/* Full CV Preview */}
      <SectionShell label={t.sections.fullCvSection} alt>
        <div className="hidden md:block overflow-hidden rounded-md border border-border bg-card">
          <iframe
            src={pdfUrl}
            title="CV PDF preview"
            className="h-[82vh] min-h-[600px] w-full min-w-0"
          />
        </div>
        <div className="md:hidden">
          <Trigger variant="chip" asChild className="w-full justify-center">
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
