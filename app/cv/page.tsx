import Link from "next/link"
import { Download, ExternalLink, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { identity, methodStack } from "@/lib/academic-content"
import { loadPublications } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "CV",
  description:
    "Curriculum vitae of Islam I. Abdulaal, including education, research experience, and technical methods.",
  path: "/cv",
})

const education = [
  {
    degree: "B.Sc. in Electronics and Communications Engineering",
    institution: "Alexandria University",
    period: "2021 – 2026",
    note: "Thesis: silicon photonic devices, waveguide-integrated photodetectors, and intra-data-center optical links.",
  },
] as const

type ExperienceItem = {
  role: string
  org: string
  orgUrl?: string
  period: string
  detail: string
}

const experience: readonly ExperienceItem[] = [
  {
    role: "Research Intern",
    org: "NanoPhoto Lab, IMRE, A*STAR",
    orgUrl: "https://www.nanophoto.org/team",
    period: "Sep 2025 – present",
    detail: "Physics-informed optimization for integrated quantum photonic source and detection structures.",
  },
  {
    role: "Research Intern",
    org: "OPST Group, Alexandria University",
    orgUrl: "https://www.alexu.edu.eg",
    period: "2023 – 2025",
    detail: "Photonic device simulation, analog and mixed-signal modeling, and integrated photonics design workflows.",
  },
]

export default async function CvPage() {
  const publications = await loadPublications()

  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-muted-foreground">CV</p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Curriculum vitae
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Academic CV covering education, research experience, and technical methods.
              The full publications list is on the{" "}
              <Link href="/publications" className="text-accent hover:text-accent-strong underline underline-offset-2">
                Publications
              </Link>{" "}
              page and projects on the{" "}
              <Link href="/projects" className="text-accent hover:text-accent-strong underline underline-offset-2">
                Projects
              </Link>{" "}
              page.
            </p>
          </div>

          <aside className="rounded-md border border-border bg-surface p-5">
            <p className="text-sm font-semibold text-foreground">{identity.name}</p>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{identity.shortTitle}</p>
            <p className="text-sm text-muted-foreground">{identity.affiliation} · {identity.location}</p>
            <div className="mt-5 grid gap-2">
              <Button asChild>
                <a href="/cv.pdf" download>
                  Download PDF
                  <Download aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/cv.pdf" target="_blank" rel="noreferrer">
                  Open PDF
                  <ExternalLink aria-hidden="true" />
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-foreground">Education</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {education.map((ed) => (
              <div key={ed.degree} className="grid gap-2 py-5 sm:grid-cols-[14rem_minmax(0,1fr)]">
                <div>
                  <p className="text-sm font-medium text-foreground">{ed.degree}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{ed.period}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{ed.institution}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{ed.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-foreground">Research Experience</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {experience.map((exp) => (
              <div key={exp.role + exp.org} className="grid gap-2 py-5 sm:grid-cols-[14rem_minmax(0,1fr)]">
                <div>
                  <p className="text-sm font-medium text-foreground">{exp.role}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{exp.period}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {exp.orgUrl ? (
                      <a href={exp.orgUrl} target="_blank" rel="noreferrer" className="text-accent hover:text-accent-strong hover:underline">
                        {exp.org}
                      </a>
                    ) : (
                      exp.org
                    )}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{exp.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              Publications
              <span className="ml-2 font-normal text-muted-foreground">({publications.length})</span>
            </h2>
            <Link
              href="/publications"
              className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-strong"
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 divide-y divide-border border-y border-border">
            {publications.map((pub) => (
              <div key={pub.id} className="py-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span
                  className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-border ${
                    pub.status === "published"
                      ? "bg-secondary text-foreground"
                      : "bg-surface text-muted-foreground"
                  }`}
                >
                  {pub.status === "published" ? "Published" : "Preprint"}
                </span>
                <p className="text-sm font-medium text-foreground">{pub.title}</p>
                <p className="text-xs text-muted-foreground">{[pub.venue, pub.year].filter(Boolean).join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-foreground">Methods and Tools</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {methodStack.map((item) => (
              <li key={item} className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-sm font-semibold text-foreground">PDF Preview</h2>
          <div className="overflow-hidden rounded-md border border-border bg-card">
            <iframe src="/cv.pdf" title="CV PDF preview" className="h-[72vh] min-h-[520px] w-full" />
          </div>
        </div>
      </section>
    </main>
  )
}
