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

type LogoMarkSize = "sm" | "md"

const ARXIV_DOI_PREFIX = "10.48550/arxiv."
const ACCENT_LOGO_FILTER =
  "brightness(0) saturate(100%) invert(68%) sepia(18%) saturate(744%) hue-rotate(352deg) brightness(94%) contrast(89%)"

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

function parseMembershipDetail(detail: string): { role: string; period: string } {
  const [rolePart, periodPart] = detail.split("|").map((part) => part.trim())
  return {
    role: rolePart || detail.trim(),
    period: periodPart || "",
  }
}

function normalizeMembershipName(name: string): string {
  const trimmed = name.trim()
  const ieeeWrappedName = trimmed.match(/^IEEE\s*\(([^)]+)\)$/i)?.[1]
  if (ieeeWrappedName) {
    return ieeeWrappedName.trim()
  }

  return trimmed
    .replace(/^IEEE\s+/i, "")
    .replace(/\s+\(IEEE\)\s*$/i, "")
    .replace(/\s+\(SSCS\)\s*$/i, "")
    .trim()
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

function buildLogoAcronym(label: string): string {
  const tokens = label
    .replace(/[()]/g, " ")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .slice(0, 3)

  if (tokens.length === 0) {
    return "LOGO"
  }

  return tokens
    .map((token) => token.charAt(0).toUpperCase())
    .join("")
}

function LogoMark({
  slot,
  label,
  size = "md",
}: {
  slot?: LogoSlotWithStatus
  label: string
  size?: LogoMarkSize
}) {
  const containerClass =
    size === "sm"
      ? "h-10 min-w-20 px-2.5"
      : "h-12 min-w-24 px-3"
  const imageWidth = size === "sm" ? 88 : 112
  const imageHeight = size === "sm" ? 28 : 36
  const mark = (
    <span className={`inline-flex items-center justify-center ${containerClass}`}>
      {slot?.available ? (
        <Image
          src={slot.filePath}
          alt={`${slot.name} logo`}
          width={imageWidth}
          height={imageHeight}
          className="max-h-full w-auto object-contain"
          style={{ filter: ACCENT_LOGO_FILTER }}
        />
      ) : (
        <span className="text-[10px] font-medium tracking-wide text-muted-foreground">{buildLogoAcronym(label)}</span>
      )}
    </span>
  )

  if (slot?.available && slot.website) {
    return (
      <a
        href={slot.website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${slot.name}`}
        className="inline-flex rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
      >
        {mark}
      </a>
    )
  }

  return mark
}

export default async function AboutPage() {
  const publications = await loadPublications()
  const orcidProfile = await loadOrcidProfile()
  const loadedLogos = await loadLogoSlots()
  const logoByName = new Map(loadedLogos.map((slot) => [slot.name, slot]))

  const ieeeLogo = logoByName.get("IEEE")
  const ieeeSscsLogo = logoByName.get("IEEE Solid-State Circuits Society")
  const ieeePhotonicsLogo = logoByName.get("IEEE Photonics Society")
  const alexandriaLogo = logoByName.get("Alexandria University")
  const astarImreLogo = logoByName.get("A*STAR IMRE")
  const egyptScholarsLogo = logoByName.get("Egypt Scholars Advanced Labs Program")
  const orcidLogo = logoByName.get("ORCID")
  const scholarLogo = logoByName.get("Google Scholar")
  const webOfScienceLogo = logoByName.get("Web of Science")

  const academicProfiles = [
    {
      label: `ORCID: ${personConfig.orcid}`,
      href: socialLinks.orcid,
      logo: orcidLogo,
      logoLabel: "ORCID",
    },
    {
      label: "Google Scholar Profile",
      href: socialLinks.scholar,
      logo: scholarLogo,
      logoLabel: "Google Scholar",
    },
    {
      label: `Researcher ID: ${contactInfo.webOfScienceResearcherID}`,
      href: "https://www.webofscience.com/wos/author/record/OLP-9224-2025",
      logo: webOfScienceLogo,
      logoLabel: "Web of Science",
    },
  ]

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
    },
    {
      role: "Research Intern",
      org: "Egypt Scholars Advanced Labs Program",
      period: "Jul 2025 - Sep 2025",
      summary:
        "Completed intensive research training in quantum photonics, including independent problem framing, simulation, and technical reporting.",
    },
    {
      role: "Research Intern",
      org: "OPST Group, Alexandria University",
      period: "Jul 2023 - Aug 2025",
      summary:
        "Worked on FBG-based sensing and photonic modeling for biomedical and communications contexts across both analysis and implementation tracks.",
    },
  ]

  const education = [
    {
      degree: "B.Sc. in Electronics and Communications Engineering",
      org: "Alexandria University, Faculty of Engineering",
      period: "Aug 2021 - Aug 2026",
      summary:
        "CGPA: 3.39/4.0 (Distinct with Honors). Thesis focus: integrated Si transceiver and waveguide-based Ge/Si PIN photodetector modeling and design.",
    },
  ]

  const awards = [
    {
      title: "Alexandria University Technology Park Research Grant (Applied and shortlisted; later declined due to schedule constraints)",
      period: "2025",
    },
    {
      title: "SSCS Student Travel Award (Selected; travel not completed due to visa timing)",
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
      name: "Institute of Electrical and Electronics Engineers",
      detail: "Student Member | 2025 - Present",
    },
    subs: [
      {
        name: "Solid-State Circuits Society",
        detail: "Student Member | 2025 - Present",
      },
      {
        name: "Photonics Society",
        detail: "Student Member | 2025 - Present",
      },
    ],
  }

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
    "I am an Electronics and Communications Engineering (ECE) undergraduate at Alexandria University, currently focused on integrated photonics and device-level engineering work.",
    "My recent projects combine physics-informed modeling, optimization-guided design, and reproducible simulation workflows.",
    "At NanoPhoto Lab (A*STAR), I contribute to integrated quantum photonics tasks while improving model reliability and reporting quality.",
  ]

  const profileParagraphs = fallbackProfileParagraphs
  const orcidKeywords = (orcidProfile?.profile?.keywords ?? []).slice(0, 6)
  const educationEntries = (orcidProfile?.educations && orcidProfile.educations.length > 0)
    ? orcidProfile.educations.map((item) => ({
        degree: item.degree ?? "Education",
        org: item.org ?? "",
        period: item.period ?? "",
        summary: item.summary ?? "",
      }))
    : education

  const orcidPrimaryMembership = orcidProfile?.memberships?.[0]
  const orcidPrimaryMembershipName = (orcidPrimaryMembership?.organization ?? "").trim()
  const orcidPrimaryMembershipDetail = (orcidPrimaryMembership?.detail ?? "").trim()
  const shouldUseOrcidMembershipName =
    orcidPrimaryMembershipName.length > 0 && orcidPrimaryMembershipName.toLowerCase() !== "ieee"
  const shouldUseOrcidMembershipDetail =
    orcidPrimaryMembershipDetail.length > 0 && orcidPrimaryMembershipDetail.toLowerCase() !== "member"

  const mainMembership =
    orcidPrimaryMembership
      ? {
          name: shouldUseOrcidMembershipName ? orcidPrimaryMembershipName : memberships.main.name,
          detail: shouldUseOrcidMembershipDetail ? orcidPrimaryMembershipDetail : memberships.main.detail,
        }
      : memberships.main
  const mainMembershipDisplayName = normalizeMembershipName(mainMembership.name)
  const mainMembershipDetail = parseMembershipDetail(mainMembership.detail)
  const showMainMembershipCommunityLink =
    mainMembership.name.toLowerCase().includes("ieee") ||
    mainMembership.name.toLowerCase().includes("electrical and electronics engineers")

  const resolveMembershipLogo = (name: string): LogoSlotWithStatus | undefined => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes("solid-state") || lowerName.includes("sscs")) {
      return ieeeSscsLogo
    }
    if (lowerName.includes("photonics")) {
      return ieeePhotonicsLogo
    }
    if (lowerName.includes("ieee") || lowerName.includes("electrical and electronics engineers")) {
      return ieeeLogo
    }
    return undefined
  }

  const resolveOrgLogo = (org: string): LogoSlotWithStatus | undefined => {
    const lowerOrg = org.toLowerCase()
    if (lowerOrg.includes("alexandria")) {
      return alexandriaLogo
    }
    if (lowerOrg.includes("egypt scholars")) {
      return egyptScholarsLogo
    }
    if (lowerOrg.includes("a*star") || lowerOrg.includes("imre")) {
      return astarImreLogo
    }
    return undefined
  }

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
              <p className="text-accent font-semibold mb-2">ECE Undergraduate</p>
              <p className="text-sm text-muted-foreground mb-2">
                Alexandria University
              </p>
              <div className="space-y-3">
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
                <ul className="list-none pl-0 text-sm border border-border rounded-lg divide-y divide-border">
                  {academicProfiles.map((profile) => (
                    <li key={profile.label} className="py-2.5 px-3 hover:bg-card/60 transition-colors">
                      <a
                        href={profile.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
                      >
                        {profile.label}
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
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
            <section id="profile" className={`${sectionCardClass} scroll-mt-24`}>
              <h2 className="text-3xl font-bold mb-4">Professional Profile</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {profileParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section id="research-focus" className={`${sectionCardClass} scroll-mt-24`}>
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

            <section id="education" className={`${sectionCardClass} scroll-mt-24`}>
              <h2 className="text-2xl font-bold mb-4">Education</h2>
              <div className="space-y-6">
                {educationEntries.map((item) => (
                  <article key={`${item.degree}-${item.org}`} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                    {item.org && (
                      <p className="mb-2 inline-flex flex-col items-start gap-1 text-sm text-accent">
                        <LogoMark slot={resolveOrgLogo(item.org)} label={item.org} size="sm" />
                        <span>{item.org}</span>
                      </p>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 className="font-semibold">{item.degree}</h3>
                      <p className="text-sm text-muted-foreground">{item.period}</p>
                    </div>
                    {item.summary && <p className="text-sm text-muted-foreground">{item.summary}</p>}
                  </article>
                ))}
              </div>
            </section>

            <section id="experience" className={`${sectionCardClass} scroll-mt-24`}>
              <h2 className="text-2xl font-bold mb-4">Experience</h2>
              <div className="space-y-6">
                {experience.map((item) => (
                  <article key={`${item.role}-${item.org}`} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                    <p className="mb-2 inline-flex flex-col items-start gap-1 text-sm text-accent">
                      <LogoMark slot={resolveOrgLogo(item.org)} label={item.org} size="sm" />
                      <span>{item.org}</span>
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 className="font-semibold">{item.role}</h3>
                      <p className="text-sm text-muted-foreground">{item.period}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.summary}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="ventures" className={`${sectionCardClass} scroll-mt-24`}>
              <h2 className="text-2xl font-bold mb-4">Ventures</h2>
              <p className="text-sm text-muted-foreground">
                Alongside research, I founded venture and community projects to test practical applications of
                technical ideas.
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

      <div id="publications" className="scroll-mt-24">
        <Publications publications={publications} />
      </div>

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
                <ul className="list-none space-y-3 pl-0 text-sm text-muted-foreground">
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
            <section id="awards" className="scroll-mt-24">
              <h3 className="text-2xl font-bold mb-4">Awards</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Selected recognitions and applications.
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

            <section id="memberships" className="scroll-mt-24">
              <h3 className="text-2xl font-bold mb-4">Memberships</h3>
              <div className="space-y-4">
                <article className="p-5 rounded-xl border-2 border-accent/40 bg-background">
                  {showMainMembershipCommunityLink ? (
                    <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
                      <LogoMark slot={resolveMembershipLogo(mainMembership.name)} label={mainMembership.name} />
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <p className="text-sm font-semibold">{mainMembershipDisplayName}</p>
                        <a
                          href="https://ieee-collabratec.ieee.org/app/p/iabdul-aal"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md border border-accent/40 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/10 transition-colors"
                        >
                          Collabratec
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </div>
                      <span aria-hidden="true" />
                      <div className="flex w-full items-center justify-between gap-3 text-sm text-muted-foreground">
                        <span>{mainMembershipDetail.role}</span>
                        {mainMembershipDetail.period && <span className="whitespace-nowrap text-right">{mainMembershipDetail.period}</span>}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 min-w-0 sm:flex-1">
                      <LogoMark slot={resolveMembershipLogo(mainMembership.name)} label={mainMembership.name} />
                      <div className="w-full min-w-0">
                        <p className="text-sm font-semibold">{mainMembershipDisplayName}</p>
                        <div className="mt-1 flex w-full items-start gap-2 text-sm text-muted-foreground">
                          <span>{mainMembershipDetail.role}</span>
                          {mainMembershipDetail.period && (
                            <span className="ml-auto whitespace-nowrap text-right">{mainMembershipDetail.period}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </article>
                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:pl-8">
                  <div className="hidden sm:block absolute left-3 top-2 bottom-2 w-px bg-border" aria-hidden="true" />
                  {memberships.subs.map((item) => {
                    const itemDetail = parseMembershipDetail(item.detail)
                    const membershipDisplayName = normalizeMembershipName(item.name)
                    return (
                      <article key={item.name} className="relative p-5 rounded-xl border border-border/80 bg-background/90 sm:ml-4">
                        <div className="flex w-full items-start gap-3">
                          <LogoMark slot={resolveMembershipLogo(item.name)} label={item.name} />
                          <div className="w-full min-w-0">
                            <p className="text-sm font-semibold">{membershipDisplayName}</p>
                            <div className="mt-1 flex w-full items-start gap-2 text-sm text-muted-foreground">
                              <span>{itemDetail.role}</span>
                              {itemDetail.period && <span className="ml-auto whitespace-nowrap text-right">{itemDetail.period}</span>}
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
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
