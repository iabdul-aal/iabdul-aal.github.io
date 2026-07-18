import Link from "next/link"
import { Download, ExternalLink, ArrowUpRight, Mail } from "lucide-react"
import { Trigger } from "@/components/ui/trigger"
import { Shell } from "@/components/ui/shell"
import { Row } from "@/components/ui/row"
import { SectionShell } from "@/components/layout/section-shell"
import { projects } from "@/lib/academic-content"
import { loadPaperMetrics } from "@/lib/paper-metrics"
import { loadProjectMetrics } from "@/lib/project-metrics"
import { loadPublications, rankPublications, rankTools } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"
import cvData from "@/data/cv_data.json"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: "CV",
  description:
    `Curriculum vitae summary of ${siteConfig.name}, with links to the full academic CV document.`,
  path: "/cv",
})

// ── Single-Responsibility: one row of CV timeline entry ──────────────────────
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

export default async function CvPage() {
  const [publications, paperMetrics, projectMetrics] = await Promise.all([
    loadPublications(),
    loadPaperMetrics(),
    loadProjectMetrics(),
  ])

  const rankedPublications = rankPublications(publications, paperMetrics)
  const featuredPubs = rankedPublications.slice(0, 2)
  const rankedTools = rankTools(projects, projectMetrics)

  const { personalInfo: info } = cvData

  return (
    <main className="pb-20">
      {/* Hero */}
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Curriculum Vitae
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
              {info.name}
            </h1>
            <p className="mt-1 text-sm text-accent">{info.specialization}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground max-w-xl">
              {cvData.researchInterests}
            </p>
          </div>

          {/* CV download card — Shell (secondary = card variant) */}
          <Shell variant="secondary" className="self-start">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Full CV Documents
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
                <a href="/cv.pdf" download>
                  <Download className="h-3.5 w-3.5" />
                  Download PDF
                </a>
              </Trigger>
              <Trigger variant="chip" asChild>
                <a href="/cv.pdf" target="_blank" rel="noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open PDF
                </a>
              </Trigger>
            </div>
          </Shell>
        </div>
      </div>

      {/* Education */}
      <SectionShell label="Education" alt>
        <div className="list-container">
          {cvData.education.map((ed) => (
            <Entry
              key={ed.degree}
              role={ed.degree}
              period={ed.period}
              org={ed.institution}
              location={ed.location}
            />
          ))}
        </div>
      </SectionShell>

      {/* Research Experience */}
      <SectionShell label="Research Experience">
        <div className="list-container">
          {cvData.researchExperience.map((exp) => (
            <Entry
              key={exp.role + exp.org}
              role={exp.role}
              period={exp.period}
              org={exp.org}
              location={exp.location}
            />
          ))}
        </div>
      </SectionShell>

      {/* Featured Publications */}
      <SectionShell label="Featured Publications" alt>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-muted-foreground">
            Top citation-ranked papers. {publications.length} total.
          </p>
          <Link href="/publications" className="btn-secondary">
            All publications
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
                {pub.badges?.map((badge) => (
                  <span
                    key={badge}
                    className="badge-subtle text-amber-600 dark:text-amber-400 bg-amber-500/10 ring-amber-500/20"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </Row>
          ))}
        </div>
      </SectionShell>

      {/* Featured Software */}
      {rankedTools.length > 0 && (
        <SectionShell label="Featured Software">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-muted-foreground">Key software platforms.</p>
            <Link href="/projects" className="btn-secondary">
              All tools
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-4">
            {rankedTools.slice(0, 1).map((tool) => (
              <div key={tool.id} className="featured-rule bg-card py-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {tool.status}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">{tool.title}</p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {tool.objective}
                </p>
                {tool.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-3">
                    {tool.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionShell>
      )}

      {/* Full CV Preview */}
      <SectionShell label="Full CV Document" alt>
        <div className="hidden md:block overflow-hidden rounded-md border border-border bg-card">
          <iframe
            src="/cv.pdf"
            title="CV PDF preview"
            className="h-[82vh] min-h-[600px] w-full min-w-0"
          />
        </div>
        <div className="md:hidden">
          <Trigger variant="chip" asChild className="w-full justify-center">
            <a href="/cv.pdf" target="_blank" rel="noreferrer">
              Open Full PDF CV in browser
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Trigger>
        </div>
      </SectionShell>
    </main>
  )
}
