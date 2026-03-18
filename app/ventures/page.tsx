import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ArrowRight, FlaskConical, Rocket, Users2 } from "lucide-react"
import { socialLinks } from "@/lib/social-links"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Ventures",
  description:
    "Founded initiatives and venture directions across startup exploration, technical pilots, and student community programs.",
  path: "/ventures",
})

const ACCENT_LOGO_FILTER =
  "brightness(0) saturate(100%) invert(68%) sepia(18%) saturate(744%) hue-rotate(352deg) brightness(94%) contrast(89%)"

export default function VenturesPage() {
  const startupPortfolio = [
    {
      name: "Octides",
      relation: "Founded / Worked On",
      description:
        "Octides is developing an AI-powered design engine for optimizing cell-free crude extract systems, dramatically accelerating synthetic biology workflows from weeks to hours.",
      supportNote:
        "Part of Seedstars and CTCN, with support from the Irish and Netherlands embassies.",
      logo: "/logos/platforms/Octides.webp",
      externalHref: socialLinks.octidesLinkedIn,
      externalLabel: "LinkedIn",
    },
  ]

  const startupConcepts = [
    {
      title: "Photonic Sensor Intelligence Stack",
      status: "Discovery",
      summary:
        "A software and sensing workflow for translating FBG measurement streams into actionable biomedical indicators.",
      milestones: ["Sensor architecture mapping", "Signal processing baseline", "Pilot partner scouting"],
    },
    {
      title: "Inverse Design Service Layer for PIC Teams",
      status: "Validation",
      summary:
        "A focused service model applying PINN-driven optimization to shorten photonic design iteration loops.",
      milestones: ["Workflow prototyping", "Benchmark case studies", "Documentation pipeline"],
    },
    {
      title: "Education-to-Research Transition Platform",
      status: "Scoping",
      summary:
        "A resource platform to help students move from coursework to publication-ready photonics research projects.",
      milestones: ["Curriculum framework", "Mentorship track design", "Community onboarding"],
    },
  ]

  const communityInitiatives = [
    {
      name: "IEEE SSCS AUSC",
      role: "Chapter Chair",
      period: "Feb 2025 - Oct 2025",
      description:
        "Supported chapter restructuring, coordinated volunteers, and helped organize technical events with industry and academic experts.",
      impact: ["500+ students served", "30 universities reached", "80+ events organized"],
      logoPath: "/logos/platforms/SSCS AUSC.png",
    },
    {
      name: "Education Clinic",
      role: "General Coordinator",
      period: "Aug 2021 - Sep 2023",
      description:
        "Coordinated a volunteer organization focused on educational access and upskilling programs across MENA.",
      impact: ["250k+ students reached", "80+ team members", "3 core programs"],
      logoPath: "/logos/platforms/Education Clinic.png",
    },
  ]

  const foundedInitiatives = [
    {
      name: "HW Carnival",
      summary:
        "Founded and chaired a student-led technical day at Bibliotheca Alexandrina in December 2025, covering the AlexDuino, Si-Clash, and Si-Cast tracks.",
      status: "Founded",
      href: socialLinks.hwCarnivalEvent,
    },
    {
      name: "Si-Cast",
      summary:
        "Founded technical content track focused on practical engineering communication and peer learning.",
      status: "Founded",
      href: socialLinks.siCastYoutube,
    },
    {
      name: "Si-Clash",
      summary:
        "Founded challenge-oriented track for improving practical design thinking and implementation skills.",
      status: "Founded",
    },
    {
      name: "AlexDuino",
      summary:
        "Founded hands-on prototyping track centered on embedded systems and real hardware execution.",
      status: "Founded",
    },
  ]

  const ventureTracks = [
    {
      title: "Research-to-Industry Pilots",
      description:
        "Testing small pilot formats for simulation, inverse design, and photonic-electronic integration problems.",
      icon: FlaskConical,
      href: "/services",
      cta: "Explore Collaboration Formats",
    },
  ]

  return (
    <main className="bg-background text-foreground">
      <PageHero
        kicker="Ventures"
        title="Ventures and Initiatives"
        description="A concise view of startup work, pilot directions, community initiatives, and founded programs."
        actions={[
          { label: "Discuss Collaboration", href: "/contact" },
          { label: "Explore Services", href: "/services", variant: "outline" },
        ]}
      />

      {/* Startup Portfolio */}
      <section className="py-16 md:py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">Startup Work</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-[72ch]">Current startup activity in one place.</p>
          <div className="grid grid-cols-1 gap-6">
            {startupPortfolio.map((startup) => (
              <article key={startup.name} className="p-6 sm:p-7 rounded-xl border border-accent/40 bg-background">
                <div className="mb-4 flex items-center gap-3">
                  {startup.logo ? (
                    <div className="inline-flex h-16 min-w-36 items-center justify-center px-4">
                      <Image
                        src={startup.logo}
                        alt={`${startup.name} logo`}
                        width={156}
                        height={44}
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                  ) : (
                    <div className="inline-flex h-16 w-16 items-center justify-center">
                      <Rocket className="w-6 h-6 text-accent" />
                    </div>
                  )}
                  <span className="inline-flex h-8 items-center text-xs text-accent bg-accent/10 rounded-md px-2.5">
                    {startup.relation}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{startup.name}</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4">{startup.description}</p>
                <p className="text-sm text-accent mb-6">{startup.supportNote}</p>
                <div className="flex flex-wrap gap-3">
                  {startup.externalHref && startup.externalLabel && (
                    <Button asChild size="sm" variant="outline">
                      <a href={startup.externalHref} target="_blank" rel="noopener noreferrer">
                        {startup.externalLabel}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Startup Track — Concepts */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent mb-2">Startup Track</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">Early-Stage Concepts</h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-[72ch]">
            Concepts I am validating to connect sensing research with practical product direction.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {startupConcepts.map((concept, index) => (
              <ScrollReveal key={concept.title} delay={index * 100} direction="up">
                <article
                  className="group p-6 sm:p-7 rounded-xl border border-border bg-card hover:border-accent/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 glow-border h-full"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <Rocket className="w-5 h-5 text-accent" />
                    <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">{concept.status}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">{concept.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{concept.summary}</p>
                  <div className="space-y-2">
                    {concept.milestones.map((milestone) => (
                      <p key={milestone} className="text-xs text-muted-foreground border-l-2 border-accent/50 pl-3">
                        {milestone}
                      </p>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other Venture Directions */}
      <section className="py-16 md:py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">Other Venture Directions</h2>
          <p className="text-sm text-muted-foreground mb-12 max-w-[72ch]">
            Additional tracks I use to test ideas in practical settings.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ventureTracks.map((track) => {
              const Icon = track.icon
              return (
                <article
                  key={track.title}
                  className="group p-6 sm:p-7 rounded-xl border border-border bg-background hover:border-accent/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 flex flex-col"
                >
                  <Icon className="w-7 h-7 text-accent mb-5 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">{track.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">{track.description}</p>
                  <Link href={track.href} className="text-sm text-accent hover:text-accent/80 inline-flex items-center gap-2">
                    {track.cta}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Community & Non-Profit Initiatives */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent mb-2">Community Work</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">Community Initiatives</h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-[72ch]">
            Founding and chapter roles focused on student development, technical education access, and community capacity building.
          </p>
          <div className="space-y-8">
            {communityInitiatives.map((initiative) => (
              <article
                key={initiative.name}
                className="p-6 sm:p-7 rounded-xl border border-border bg-card hover:border-accent/60 transition-colors"
              >
                <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-3">
                    {initiative.logoPath && (
                      <span className="inline-flex h-14 min-w-32 items-center justify-center px-1">
                        <Image
                          src={initiative.logoPath}
                          alt={`${initiative.name} logo`}
                          width={144}
                          height={44}
                          className="h-[34px] w-auto object-contain"
                          style={{ filter: ACCENT_LOGO_FILTER }}
                        />
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-foreground leading-snug">{initiative.name}</h3>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-accent/12 px-3 py-1 text-xs font-semibold text-accent">
                    Community Work
                  </span>
                </div>

                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-accent font-semibold">{initiative.role}</p>
                  <p className="text-muted-foreground text-sm">{initiative.period}</p>
                </div>

                <p className="text-muted-foreground mb-6">{initiative.description}</p>

                <div className="flex flex-wrap gap-2">
                  {initiative.impact.map((item) => (
                    <span key={item} className="px-3 py-1 rounded-full bg-background text-muted-foreground text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Founded Initiatives */}
      <section className="py-16 md:py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">Founded Initiatives</h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-[72ch]">
            Programs I started to support technical learning communities and student-led execution.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {foundedInitiatives.map((item, index) => (
              <ScrollReveal key={item.name} delay={index * 80} direction="up">
                <article className="group p-6 sm:p-7 rounded-xl border border-border bg-background hover:border-accent/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 glow-border h-full">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">{item.name}</h3>
                    <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">{item.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                  {"href" in item && item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-xs text-accent hover:text-accent/80 group/link"
                    >
                      {item.name === "Si-Cast" ? "View YouTube channel" : "View event details"} <ArrowRight className="w-3 h-3 arrow-slide" />
                    </a>
                  )}
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
