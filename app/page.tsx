import Link from "next/link"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import {
  ArrowRight,
  Atom,
  BookOpenText,
  Brain,
  CircuitBoard,
  FileText,
  FolderKanban,
  GraduationCap,
  Handshake,
  MessagesSquare,
  Microscope,
  Sparkles,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { HighlightsSlider } from "@/components/highlights-slider"
import { JourneySection } from "@/components/journey-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import { highlights } from "@/lib/highlights"
import { getMaterialsOverview } from "@/lib/materials-library"
import { createPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: "Photonics Research",
  description:
    "Research work of Islam I. Abdulaal across integrated photonics, neuromorphic photonics, quantum photonics, nonlinear photonics, nanophotonics, and computational photonics.",
  path: "/",
})

type FocusArea = {
  title: string
  description: string
  icon: typeof CircuitBoard
}

type DesktopFocusArea = FocusArea & {
  tag: string
  col: string
  mt: string
  isCenter?: boolean
}

type MobileFocusArea = FocusArea & {
  tag: string
  highlight?: boolean
}

async function countJsonItems(filePath: string): Promise<number> {
  try {
    const raw = await readFile(filePath, "utf8")
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.length : 0
  } catch {
    return 0
  }
}

export default async function Home() {
  const [publicationCount, talkCount, materialsOverview] = await Promise.all([
    countJsonItems(join(process.cwd(), "publications.json")),
    countJsonItems(join(process.cwd(), "talks.json")),
    getMaterialsOverview(),
  ])

  const focusAreas: FocusArea[] = [
    {
      title: "Integrated Photonics",
      description: "Silicon photonics, waveguide engineering, and scalable on-chip optical systems.",
      icon: CircuitBoard,
    },
    {
      title: "Neuromorphic Photonics",
      description: "Photonic neural networks, optical computing primitives, and brain-inspired processing.",
      icon: Brain,
    },
    {
      title: "Quantum Photonics",
      description: "Integrated sources, nonlinear generation paths, and quantum-compatible device design.",
      icon: Atom,
    },
    {
      title: "Nanophotonics",
      description: "Metasurfaces, resonant nanostructures, and sub-wavelength light control.",
      icon: Zap,
    },
    {
      title: "Computational Photonics",
      description: "Physics-informed optimization, inverse design, and reproducible simulation workflows.",
      icon: Sparkles,
    },
  ]

  const collaborationTracks = [
    {
      title: "Research Collaboration",
      description: "For labs, students, and teams working on photonics design, modeling, or applied research.",
      href: "/contact",
      cta: "Discuss collaboration",
      icon: Handshake,
    },
    {
      title: "Technical Services",
      description: "Scoped support for simulation planning, workflow design, and physics-informed optimization.",
      href: "/services",
      cta: "View services",
      icon: FolderKanban,
    },
    {
      title: "Mentorship",
      description: "Free guidance for students moving from coursework into serious research execution.",
      href: "/services#mentorship",
      cta: "Open mentorship",
      icon: GraduationCap,
    },
    {
      title: "Speaking and Workshops",
      description: "Talks for technical communities, student chapters, and early-career engineering audiences.",
      href: "/talks",
      cta: "See talk topics",
      icon: MessagesSquare,
    },
  ]

  const destinationCards = [
    {
      title: "About",
      description: "Background, affiliations, technical stack, and professional profile.",
      href: "/about",
      icon: Microscope,
    },
    {
      title: "Publications",
      description: "Research output, preprints, and publication metadata.",
      href: "/publications",
      icon: BookOpenText,
    },
    {
      title: "Projects",
      description: "Repository-level portfolio pulled from GitHub.",
      href: "/projects",
      icon: FolderKanban,
    },
    {
      title: "Materials",
      description: "Slides, summaries, templates, and practical learning resources.",
      href: "/materials",
      icon: FileText,
    },
  ]

  const achievementStats = [
    { label: "Publications", value: String(publicationCount) },
    { label: "Public Talks", value: String(talkCount) },
    { label: "Learning Resources", value: String(materialsOverview.totalAssets) },
  ]

  const desktopFocusAreas: DesktopFocusArea[] = [
    { ...focusAreas[4], tag: "Modeling & Software", col: "col-start-2", mt: "" },
    { ...focusAreas[1], tag: "Architecture", col: "col-start-1", mt: "-mt-4" },
    { ...focusAreas[0], tag: "Core Platform", col: "col-start-2", mt: "-mt-4", isCenter: true },
    { ...focusAreas[2], tag: "Architecture", col: "col-start-3", mt: "-mt-4" },
    { ...focusAreas[3], tag: "Materials & Physics", col: "col-start-2", mt: "mt-4" },
  ]

  const mobileFocusAreas: MobileFocusArea[] = [
    { ...focusAreas[4], tag: "Modeling & Software" },
    { ...focusAreas[0], tag: "Core Platform", highlight: true },
    { ...focusAreas[1], tag: "Architecture" },
    { ...focusAreas[2], tag: "Architecture" },
    { ...focusAreas[3], tag: "Materials & Physics" },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    about: {
      "@type": "Person",
      name: "Islam I. Abdulaal",
    },
  }

  return (
    <main className="text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden border-b border-border/70">
        <div className="pointer-events-none absolute inset-0 hero-grid opacity-30" />
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-[80px] animate-slow-float" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-400/15 blur-[80px] animate-slow-float" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-end">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs text-muted-foreground md:text-sm animate-fade-up">
                <Microscope className="h-4 w-4 text-accent" />
                Photonics research, technical communication, and collaboration
              </div>

              <h1 className="mt-6 font-display text-4xl leading-tight md:text-6xl lg:text-7xl animate-fade-up-delay">
                Islam I. Abdulaal
              </h1>

              <p className="mt-6 max-w-3xl text-base text-muted-foreground md:text-xl animate-fade-up-delay-2">
                I work on integrated, neuromorphic, quantum, nonlinear, nano-, and computational photonics. This site
                brings together my research profile, publications, technical materials, and collaboration paths in one
                place.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-3">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/publications">View Publications</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto group/link">
                  <Link href="/contact">
                    Discuss Collaboration <ArrowRight className="h-4 w-4 arrow-slide" />
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 text-xs text-muted-foreground md:text-sm animate-fade-up-delay-3">
                <span className="rounded-full border border-border bg-card/60 px-3 py-1.5">Integrated photonics</span>
                <span className="rounded-full border border-border bg-card/60 px-3 py-1.5">Quantum photonics</span>
                <span className="rounded-full border border-border bg-card/60 px-3 py-1.5">PINN-guided workflows</span>
                <span className="rounded-full border border-border bg-card/60 px-3 py-1.5">Mentorship and talks</span>
              </div>
            </div>

            <ScrollReveal className="lg:justify-self-end">
              <aside className="rounded-2xl border border-border bg-card/75 p-6 glow-border">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Start Here</p>
                <h2 className="mt-3 text-2xl font-semibold">Choose the path that matches your goal.</h2>
                <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                  <Link
                    href="/about"
                    className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3 transition-colors hover:border-accent/60 hover:text-foreground"
                  >
                    <span>Review profile and affiliations</span>
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </Link>
                  <Link
                    href="/materials"
                    className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3 transition-colors hover:border-accent/60 hover:text-foreground"
                  >
                    <span>Browse materials and practical resources</span>
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </Link>
                  <Link
                    href="/services"
                    className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3 transition-colors hover:border-accent/60 hover:text-foreground"
                  >
                    <span>See services, mentorship, and support scope</span>
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </Link>
                </div>
              </aside>
            </ScrollReveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 animate-fade-up-delay-3">
            {achievementStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card/70 p-5 transition-all duration-300 hover:scale-[1.03] hover:border-accent hover:shadow-md hover:shadow-accent/5 glow-border"
              >
                <p className="text-2xl font-bold leading-none md:text-3xl">{stat.value}</p>
                <p className="mt-2 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Research Scope</p>
                <h2 className="mt-2 font-display text-3xl md:text-4xl">Current Focus</h2>
              </div>
              <Link href="/about#research-focus" className="text-sm text-accent transition-colors hover:text-accent/80">
                See details
              </Link>
            </div>
          </ScrollReveal>

          <div className="relative max-w-5xl mx-auto mt-12 mb-8">
            {/* Background connecting lines for Diamond (Desktop only) */}
            <div className="absolute inset-0 hidden md:block pointer-events-none z-0">
               <div className="absolute left-1/2 top-[15%] bottom-[15%] w-[2px] bg-gradient-to-b from-transparent via-accent/30 to-transparent -translate-x-1/2" />
               <div className="absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent -translate-y-1/2" />
            </div>

            {/* Desktop UI: Diamond Layout */}
            <div className="hidden md:grid grid-cols-3 gap-6 relative z-10">
              {desktopFocusAreas.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className={`${item.col} ${item.mt} ${item.isCenter ? "relative z-20 scale-105" : "relative z-10"}`}
                  >
                    <ScrollReveal delay={index * 100} direction="up" className="h-full">
                      <article
                        className={`group flex h-full flex-col items-center rounded-2xl border p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10 ${
                          item.isCenter
                            ? "border-accent/50 bg-card/60 shadow-lg shadow-accent/10"
                            : "border-border bg-card/40 glow-border"
                        }`}
                      >
                        {item.isCenter && <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />}
                        <span
                          className={`relative z-10 mb-5 rounded-full py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] ${
                            item.isCenter ? "bg-accent/20 px-3 text-accent" : "bg-accent/10 px-2 text-accent/80"
                          }`}
                        >
                          {item.tag}
                        </span>
                        <Icon
                          className={`relative z-10 mb-4 text-accent transition-transform duration-500 group-hover:scale-110 ${
                            item.isCenter ? "h-9 w-9" : "h-8 w-8"
                          }`}
                        />
                        <h3
                          className={`relative z-10 mb-3 font-bold transition-colors group-hover:text-accent ${
                            item.isCenter ? "text-2xl" : "text-xl"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </article>
                    </ScrollReveal>
                  </div>
                )
              })}
            </div>

            {/* Mobile UI: Stack */}
            <div className="flex flex-col gap-5 md:hidden">
              {mobileFocusAreas.map((item, index) => {
                const Icon = item.icon
                return (
                  <ScrollReveal key={item.title} delay={index * 50} direction="up">
                    <article
                      className={`group flex flex-col items-center rounded-xl border p-6 text-center transition-all duration-300 ${
                        item.highlight
                          ? "border-accent/50 bg-card/60 shadow-md shadow-accent/10"
                          : "border-border bg-card/75 glow-border"
                      }`}
                    >
                      <span
                        className={`mb-4 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${
                          item.highlight ? "bg-accent/20 text-accent" : "bg-accent/10 text-accent/80"
                        }`}
                      >
                        {item.tag}
                      </span>
                      <Icon className="mb-4 h-7 w-7 text-accent transition-transform duration-500 group-hover:scale-110" />
                      <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-accent">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </article>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-card/40 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Work With Me</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">Collaboration Paths</h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                The site is structured around clear next steps, whether you are looking for research collaboration,
                technical support, mentorship, or speaking.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {collaborationTracks.map((track, index) => {
              const Icon = track.icon
              return (
                <ScrollReveal key={track.title} delay={index * 80} direction="up">
                  <article className="group flex h-full flex-col rounded-xl border border-border bg-background/70 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/5 glow-border">
                    <Icon className="mb-5 h-7 w-7 text-accent transition-transform group-hover:scale-110" />
                    <h3 className="mb-3 text-xl font-semibold transition-colors group-hover:text-accent">{track.title}</h3>
                    <p className="mb-6 flex-1 text-sm text-muted-foreground">{track.description}</p>
                    <Link href={track.href} className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80">
                      {track.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Explore</p>
                <h2 className="mt-2 font-display text-3xl md:text-4xl">Key Sections</h2>
              </div>
              <Link href="/about" className="text-sm text-accent transition-colors hover:text-accent/80">
                View full profile
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {destinationCards.map((card, index) => {
              const Icon = card.icon
              return (
                <ScrollReveal key={card.title} delay={index * 80} direction="up">
                  <article className="group h-full rounded-xl border border-border bg-card/75 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/5 glow-border">
                    <Icon className="mb-4 h-6 w-6 text-accent transition-transform group-hover:scale-110" />
                    <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-accent">{card.title}</h3>
                    <p className="mb-5 text-sm text-muted-foreground">{card.description}</p>
                    <Link href={card.href} className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80">
                      Open section
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section id="highlights" className="border-y border-border/70 bg-card/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8 flex items-center justify-between gap-4">
              <h2 className="font-display text-3xl md:text-4xl">Recent Highlights</h2>
              <Link href="/about" className="text-sm text-accent transition-colors hover:text-accent/80">
                View profile
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <HighlightsSlider items={highlights} />
          </ScrollReveal>
        </div>
      </section>

      <JourneySection
        title="Need a fast path?"
        description="If you already know why you are here, jump straight to the contact page or review the service and mentorship scope before reaching out."
        actions={[
          { href: "/contact", label: "Open Contact" },
          { href: "/services", label: "Review Services", variant: "outline" },
        ]}
      />
    </main>
  )
}
