import Image from "next/image"
import Link from "next/link"
import { access, readFile } from "node:fs/promises"
import { join } from "node:path"
import { ArrowUpRight, Download, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Publications, type Publication } from "@/components/publications"
import { personConfig } from "@/lib/site-config"
import { contactInfo, socialLinks } from "@/lib/social-links"
import { logoSlots } from "@/lib/logo-slots"

export const metadata = {
  title: "About",
  description:
    "Current background, research direction, affiliations, publications, and technical work of Islam I. Abdulaal.",
}

type OrcidPublication = {
  title?: string
  venue?: string
  year?: string
  doi?: string
  url?: string
}

type OrcidProfile = {
  fetchedAt?: string
  profile?: {
    biography?: string
    keywords?: string[]
  }
  educations?: Array<{
    degree?: string
    org?: string
    period?: string
    summary?: string
  }>
  memberships?: Array<{
    organization?: string
    detail?: string
  }>
}

type LogoSlotWithStatus = {
  name: string
  filePath: string
  website: string
  group: "Affiliations" | "Profiles"
  available: boolean
}

const ARXIV_DOI_PREFIX = "10.48550/arxiv."

function extractArxivId(doi: string, url: string): string | undefined {
  const normalizedDoi = doi.trim().toLowerCase()
  if (normalizedDoi.startsWith(ARXIV_DOI_PREFIX)) {
    return doi.trim().slice(ARXIV_DOI_PREFIX.length)
  }

  const absMarker = "/abs/"
  const absIndex = url.indexOf(absMarker)
  if (absIndex >= 0) {
    return url.slice(absIndex + absMarker.length).trim() || undefined
  }

  return undefined
}

function toPublicationStatus(venue: string, year: string): string {
  const parts = [venue.trim(), year.trim()].filter(Boolean)
  return parts.join(", ") || "Publication"
}

async function loadPublications(): Promise<Publication[]> {
  try {
    const filePath = join(process.cwd(), "publications.json")
    const raw = await readFile(filePath, "utf8")
    const parsed = JSON.parse(raw) as OrcidPublication[]

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.map((item) => {
      const doi = (item.doi ?? "").trim()
      const url = (item.url ?? "").trim()
      const resolvedUrl = url || (doi ? `https://doi.org/${doi}` : undefined)

      return {
        title: (item.title ?? "").trim() || "Untitled",
        status: toPublicationStatus(item.venue ?? "", item.year ?? ""),
        arxiv: extractArxivId(doi, url),
        url: resolvedUrl,
      }
    })
  } catch {
    return []
  }
}

async function loadOrcidProfile(): Promise<OrcidProfile | null> {
  try {
    const filePath = join(process.cwd(), "orcid_profile.json")
    const raw = await readFile(filePath, "utf8")
    const parsed = JSON.parse(raw) as OrcidProfile

    if (!parsed || typeof parsed !== "object") {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

async function loadLogoSlots(): Promise<LogoSlotWithStatus[]> {
  const resolved = await Promise.all(
    logoSlots.map(async (slot) => {
      const absolutePath = join(process.cwd(), "public", slot.filePath.replace(/^\/+/, ""))
      try {
        await access(absolutePath)
        return {
          ...slot,
          available: true,
        } satisfies LogoSlotWithStatus
      } catch {
        return {
          ...slot,
          available: false,
        } satisfies LogoSlotWithStatus
      }
    }),
  )

  return resolved
}

export default async function AboutPage() {
  const publications = await loadPublications()
  const orcidProfile = await loadOrcidProfile()
  const loadedLogos = await loadLogoSlots()

  const focusAreas = [
    {
      title: "Integrated Photonics",
      desc: "Silicon photonics, waveguide engineering, and PIC-level component development for compact and scalable optical systems.",
    },
    {
      title: "Nonlinear Photonics",
      desc: "SPDC-oriented architectures, nonlinear light-matter interactions, and design choices aligned with quantum photonics use cases.",
    },
    {
      title: "Physics-Informed Design",
      desc: "PINN-assisted inverse design and multiphysics-aware optimization to improve both model quality and design efficiency.",
    },
  ]

  const experience = [
    {
      role: "Research Intern",
      org: "NanoPhoto Lab, IMRE, A*STAR",
      period: "Sep 2025 - Present",
      summary:
        "Contributing to optimization-driven integrated quantum photonics workflows with emphasis on model reliability and practical design iteration.",
      highlights: [
        "Build simulation-to-learning pipelines for parameter exploration and fast design screening.",
        "Study trade-offs among optical performance, robustness, and computational cost.",
      ],
    },
    {
      role: "Research Intern",
      org: "Egypt Scholars Advanced Labs Program",
      period: "Jul 2025 - Sep 2025",
      summary:
        "Completed intensive research training in quantum photonics, including independent problem framing, simulation, and technical reporting.",
      highlights: [
        "Executed mentor-guided and self-directed technical tasks under research timelines.",
        "Strengthened communication of assumptions, methods, and model limitations.",
      ],
    },
    {
      role: "Research Intern",
      org: "OPST Group, Alexandria University",
      period: "Jul 2023 - Aug 2025",
      summary:
        "Worked on FBG-based sensing and photonic modeling for biomedical and communications contexts across both analysis and implementation tracks.",
      highlights: [
        "Modeled and analyzed FBG response under changing sensing conditions.",
        "Developed reproducible workflows for simulation setup and result interpretation.",
      ],
    },
  ]

  const education = [
    {
      degree: "B.Sc. in Electronics and Communications Engineering",
      org: "Alexandria University, Faculty of Engineering",
      period: "Aug 2021 - Aug 2026",
      summary:
        "CGPA: 3.39/4.0 (Distinct with Honors). Thesis focus: integrated Si transceiver and waveguide-based Ge/Si PIN photodetector modeling and design.",
      highlights: [
        "Training emphasis in electromagnetics, communications, semiconductor devices, and signal processing.",
        "Current thesis work combines device modeling with system-level photonic integration goals.",
      ],
    },
  ]

  const awards = [
    {
      title: "Alexandria University Technology Park (AUTP) Research Grant - Candidate (Withdrew due to time commitment)",
      period: "2025",
    },
    {
      title: "SSCS Student Travel Award (Withdrew due to visa issues)",
      period: "Nov 2025",
    },
    {
      title: "Distinction Grade - Dean's Honors for Academic Excellence",
      period: "2021 - 2025",
    },
    {
      title: "ICMTC Artificial Intelligence Contest (AIC-2) - 4th Place",
      period: "2024",
    },
  ]

  const memberships = {
    main: {
      name: "IEEE (Institute of Electrical and Electronics Engineers)",
      detail: "Student Member | 2025 - Present",
    },
    subs: [
      {
        name: "Solid-State Circuits Society (SSCS)",
        detail: "IEEE Society Membership | 2025 - Present",
      },
      {
        name: "Photonics Society",
        detail: "IEEE Society Membership | 2025 - Present",
      },
    ],
  }

  const currentPriorities = [
    "Physics-informed inverse design for compact integrated photonic components.",
    "Multiphysics workflows that connect device behavior to system-level constraints.",
    "Optimization strategies for quantum photonics building blocks and design robustness.",
    "Reproducible research pipelines for simulation, data generation, and validation.",
  ]

  const technicalStack = [
    {
      label: "Photonics & Simulation",
      items: [
        { name: "Lumerical", level: 5 },
        { name: "COMSOL Multiphysics", level: 4 },
        { name: "MATLAB", level: 4 },
      ],
    },
    {
      label: "Programming & ML",
      items: [
        { name: "Python", level: 5 },
        { name: "PyTorch", level: 4 },
      ],
    },
  ]

  const fallbackProfileParagraphs = [
    "I am an Electronics and Communications Engineering (ECE) undergraduate at Alexandria University, currently building my research experience in integrated photonics and device-level engineering.",
    "My recent work focuses on physics-informed and optimization-guided workflows for photonic device modeling and design.",
    "At NanoPhoto Lab (A*STAR), I contribute to integrated quantum photonics modeling tasks while strengthening reproducible simulation and analysis practices.",
  ]

  const profileParagraphs = fallbackProfileParagraphs
  const orcidKeywords = (orcidProfile?.profile?.keywords ?? []).slice(0, 6)

  const educationEntries = (orcidProfile?.educations && orcidProfile.educations.length > 0)
    ? orcidProfile.educations.map((item) => ({
        degree: item.degree ?? "Education",
        org: item.org ?? "",
        period: item.period ?? "",
        summary: item.summary ?? "",
        highlights: [] as string[],
      }))
    : education

  const mainMembership =
    orcidProfile?.memberships && orcidProfile.memberships.length > 0
      ? {
          name: orcidProfile.memberships[0].organization ?? memberships.main.name,
          detail: orcidProfile.memberships[0].detail ?? memberships.main.detail,
        }
      : memberships.main

  const summaryStats = [
    { label: "Publications", value: String(publications.length) },
    { label: "Focus Areas", value: String(focusAreas.length) },
    { label: "Awards", value: String(awards.length) },
    { label: "Memberships", value: String(1 + memberships.subs.length) },
  ]

  const sectionCardClass = "p-6 sm:p-7 rounded-2xl border border-border bg-card/40"

  return (
    <main className="bg-background text-foreground">
      <section className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <aside className="lg:col-span-1">
            <div className="w-full max-w-[340px] mx-auto lg:max-w-[300px] lg:mx-0 lg:sticky lg:top-24">
              <div className="relative w-full aspect-square bg-card rounded-xl border border-border overflow-hidden mb-6">
                <Image
                  src="/personal-pic.png"
                  alt="Islam I. Abdulaal"
                  fill
                  sizes="(max-width: 1024px) 300px, 320px"
                  className="object-cover"
                />
              </div>
              <h1 className="text-3xl font-bold mb-2">{personConfig.name}</h1>
              <p className="text-accent font-semibold mb-2">{personConfig.role}</p>
              <p className="text-sm text-muted-foreground mb-4">
                {personConfig.location} | {personConfig.affiliation}
              </p>
              <div className="mt-5 space-y-3">
                {orcidKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {orcidKeywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2.5 py-1 rounded-full border border-border text-xs text-muted-foreground bg-card/50"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-sm font-semibold text-foreground">Academic Profiles</p>
                <ul className="text-sm border border-border rounded-lg divide-y divide-border">
                  <li className="py-2.5 px-3 hover:bg-card/60 transition-colors">
                    <a
                      href={socialLinks.orcid}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
                    >
                      ORCID: {personConfig.orcid}
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </li>
                  <li className="py-2.5 px-3 hover:bg-card/60 transition-colors">
                    <a
                      href={socialLinks.scholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
                    >
                      Google Scholar Profile
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </li>
                  <li className="py-2.5 px-3 hover:bg-card/60 transition-colors">
                    <a
                      href="https://www.webofscience.com/wos/author/record/OLP-9224-2025"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
                    >
                      Researcher ID: {contactInfo.webOfScienceResearcherID}
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/contact">Contact</Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href="/cv.pdf" download>
                    <Download className="w-4 h-4 mr-2" />
                    CV
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={socialLinks.linktree} target="_blank" rel="noopener noreferrer">
                    More Profiles
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2 space-y-6">
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {summaryStats.map((item) => (
                <article key={item.label} className="p-4 rounded-xl border border-border bg-card/40">
                  <p className="text-xl font-bold leading-none">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-2">{item.label}</p>
                </article>
              ))}
            </section>

            <section id="profile" className={sectionCardClass}>
              <h2 className="text-3xl font-bold mb-4">Professional Profile</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {profileParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-5 p-5 rounded-xl border border-border bg-card/60">
                <p className="text-sm font-semibold mb-3">Current Priorities</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {currentPriorities.map((item) => (
                    <p key={item} className="px-3 py-2 rounded-md border border-border/60 bg-background/40">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <section id="research-focus" className={sectionCardClass}>
              <h2 className="text-2xl font-bold mb-4">Research Focus</h2>
              <p className="text-sm text-muted-foreground mb-4">
                My research interests connect photonic device physics, inverse design, and robust computational
                workflows for both classical and quantum-oriented platforms.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {focusAreas.map((item) => (
                  <article key={item.title} className="p-5 rounded-xl border border-border bg-background/70">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="education" className={sectionCardClass}>
              <h2 className="text-2xl font-bold mb-4">Education</h2>
              <div className="space-y-6">
                {educationEntries.map((item) => (
                  <article key={`${item.degree}-${item.org}`} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold">{item.degree}</h3>
                        <p className="text-sm text-accent">{item.org}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.period}</p>
                    </div>
                    {item.summary && <p className="text-sm text-muted-foreground">{item.summary}</p>}
                    {item.highlights.length > 0 && (
                      <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                        {item.highlights.map((point) => (
                          <p key={point} className="pl-3 border-l-2 border-border/70">
                            {point}
                          </p>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <section id="experience" className={sectionCardClass}>
              <h2 className="text-2xl font-bold mb-4">Experience</h2>
              <div className="space-y-6">
                {experience.map((item) => (
                  <article key={`${item.role}-${item.org}`} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold">{item.role}</h3>
                        <p className="text-sm text-accent">{item.org}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.period}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.summary}</p>
                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {item.highlights.map((point) => (
                        <p key={point} className="pl-3 border-l-2 border-border/70">
                          {point}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="ventures" className={sectionCardClass}>
              <h2 className="text-2xl font-bold mb-4">Ventures</h2>
              <p className="text-sm text-muted-foreground">
                Alongside research, I founded several venture and community projects to test practical applications of
                technical ideas. I am currently not active in day-to-day initiative operations.
              </p>
              <div className="mt-4">
                <Button asChild variant="outline">
                  <Link href="/ventures">
                    Explore Ventures
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </section>

          </div>
        </div>
      </section>

      <Publications publications={publications} />

      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Core Technical Stack</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Technical domains and tools I currently use in day-to-day research and prototyping.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {technicalStack.map((item) => (
              <article key={item.label} className="p-5 rounded-xl border border-border bg-background">
                <p className="text-sm font-semibold text-accent mb-3">{item.label}</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {item.items.map((tool) => (
                    <li key={tool.name} className="flex items-center justify-between gap-3">
                      <span>{tool.name}</span>
                      <span className="flex items-center gap-1" aria-label={`${tool.name} level ${tool.level} out of 5`}>
                        {[1, 2, 3, 4, 5].map((rank) => (
                          <Star
                            key={rank}
                            className={`w-3.5 h-3.5 ${rank <= tool.level ? "text-accent fill-current" : "text-muted-foreground/30"}`}
                          />
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-12 space-y-10">
            <section>
              <h3 className="text-2xl font-bold mb-4">Awards</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Selected recognitions and candidacies relevant to my academic and research track.
              </p>
              <div className="space-y-4">
                {awards.map((item) => (
                  <article key={`${item.title}-${item.period}`} className="p-5 rounded-xl border border-border bg-background">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.period}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4">Memberships</h3>
              <div className="space-y-4">
                <article className="p-5 rounded-xl border-2 border-accent/40 bg-background">
                  <p className="text-sm font-semibold">{mainMembership.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{mainMembership.detail}</p>
                </article>
                <div className="relative space-y-4 sm:pl-8">
                  <div className="hidden sm:block absolute left-3 top-2 bottom-2 w-px bg-border" aria-hidden="true" />
                  {memberships.subs.map((item) => (
                    <article key={item.name} className="relative p-5 rounded-xl border border-border/80 bg-background/90 sm:ml-4">
                      <p className="text-sm font-semibold">IEEE {item.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4">Affiliations and Profile Presence</h3>
              <p className="text-sm text-muted-foreground mb-4">
                These are my current affiliation and profile slots. Once a logo file is added, it will appear automatically.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loadedLogos.map((item) => (
                  <a
                    key={item.name}
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-border bg-background hover:border-accent transition-colors"
                  >
                    <div className="h-12 rounded-md border border-border/70 bg-card/70 flex items-center justify-center mb-3">
                      {item.available ? (
                        <Image
                          src={item.filePath}
                          alt={`${item.name} logo`}
                          width={140}
                          height={36}
                          className="max-h-8 w-auto object-contain"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Logo Slot Ready</span>
                      )}
                    </div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.group}</p>
                  </a>
                ))}
              </div>
            </section>

          </div>
        </div>
      </section>

      <section className="py-12 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Services</h3>
              <p className="text-sm text-muted-foreground mt-1">
                If useful, you can continue to services, mentorship, and collaboration options.
              </p>
            </div>
            <Button asChild>
              <Link href="/services">
                Explore Services
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
