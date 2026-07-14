import Link from "next/link"
import { Download, ExternalLink, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { identity, methodStack, projects } from "@/lib/academic-content"
import { loadPublications } from "@/lib/publications"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "CV",
  description:
    "Curriculum vitae of Islam I. Abdulaal, including education, research experience, publications, projects, and technical methods.",
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

const experience = [
  {
    role: "Research Intern",
    org: "NanoPhoto Lab",
    period: "Sep 2025 – present",
    detail: "Physics-informed optimization for integrated quantum photonic source and detection structures.",
  },
  {
    role: "Research Intern",
    org: "OPST Group, Alexandria University",
    period: "2023 – 2025",
    detail: "Photonic device simulation, analog and mixed-signal modeling, and integrated photonics design workflows.",
  },
] as const

export default async function CvPage() {
  const publications = await loadPublications()

  return (
    <main>
      {/* Header */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-muted-foreground">CV</p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Curriculum vitae
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Academic CV covering education, research experience, publications, projects, and technical methods.
              The PDF version is provided for formal review and download.
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

      {/* Education */}
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

      {/* Research experience */}
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
                  <p className="text-sm font-medium text-foreground">{exp.org}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{exp.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <h2 className="text-sm font-semibold text-foreground">Publications</h2>
            <Link href="/publications" className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-strong">
              Full list
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {publications.map((pub) => (
              <div key={pub.id} className="py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs text-muted-foreground">
                    {[pub.venue, pub.year].filter(Boolean).join(", ")}
                  </p>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-border ${pub.status === "published" ? "bg-secondary text-foreground" : "bg-surface text-muted-foreground"}`}>
                    {pub.status === "published" ? "Published" : "Preprint"}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-foreground">{pub.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {pub.authors.map((a, i) => (
                    <span key={a}>
                      {a.includes("Abdulaal") ? <strong className="font-semibold text-foreground">{a}</strong> : a}
                      {i < pub.authors.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                {pub.doi && (
                  <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-accent hover:text-accent-strong">
                    DOI: {pub.doi}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <h2 className="text-sm font-semibold text-foreground">Selected Projects</h2>
            <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-strong">
              Full list
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {projects.map((project) => (
              <div key={project.id} className="py-4">
                <p className="text-xs text-muted-foreground">{project.status}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{project.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{project.objective}</p>
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="mt-1.5 mr-4 inline-flex items-center gap-1 text-xs text-accent hover:text-accent-strong">
                    {link.label}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methods */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-foreground">Methods and Tools</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {methodStack.map((item) => (
              <li key={item} className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PDF embed */}
      <section className="border-t border-border">
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
