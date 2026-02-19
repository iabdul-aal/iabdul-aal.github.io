import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FlaskConical, Rocket, Users2 } from "lucide-react"
import { socialLinks } from "@/lib/social-links"

export const metadata = {
  title: "Ventures | Islam Abdulaal",
  description:
    "Startup and initiative tracks including HW Carnival, Si-Cast, Si-Clash, and AlexDuino across technical innovation and community impact.",
}

export default function VenturesPage() {
  const ventureTracks = [
    {
      title: "Startup Exploration",
      description:
        "Translating photonics and sensing research into early-stage product hypotheses with scoped validation milestones.",
      icon: Rocket,
      href: "/ventures/startups",
      cta: "View Startup Track",
      stage: "Concept to Prototype",
    },
    {
      title: "Research-to-Industry Pilots",
      description:
        "Structured pilot collaborations for simulation, inverse design, and photonic-electronic integration challenges.",
      icon: FlaskConical,
      href: "/services",
      cta: "Explore Collaboration Formats",
      stage: "Open for pilot scoping",
    },
    {
      title: "Community and Non-Profit Initiatives",
      description:
        "Education and technical capacity-building programs for student communities and volunteer engineering networks.",
      icon: Users2,
      href: "/ventures/non-profit",
      cta: "See Community Impact",
      stage: "Active engagement",
    },
  ]

  const flagshipInitiatives = [
    {
      name: "HW Carnival",
      summary:
        "Competition and technical day hosted at Bibliotheca Alexandrina on December 25, 2025, covering AlexDuino, Si-Clash, and Si-Cast tracks.",
      status: "Flagship",
      href: socialLinks.hwCarnivalEvent,
    },
    {
      name: "Si-Cast",
      summary:
        "Track focused on structured technical content and practical engineering communication.",
      status: "Active",
      href: socialLinks.siCastYoutube,
    },
    {
      name: "Si-Clash",
      summary:
        "Challenge-oriented track designed to strengthen practical design thinking and implementation skills.",
      status: "Active",
    },
    {
      name: "AlexDuino",
      summary:
        "Hands-on prototyping track centered on embedded systems and real hardware execution.",
      status: "Active",
    },
  ]

  const summaryStats = [
    { label: "Venture Tracks", value: String(ventureTracks.length) },
    { label: "Flagship Initiatives", value: String(flagshipInitiatives.length) },
    { label: "Orientation", value: "Research to Impact" },
    { label: "Status", value: "Active" },
  ]

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">Ventures</h1>
            <p className="text-lg md:text-2xl text-muted-foreground">
              Venture pathways that translate integrated photonics research into technical pilots, products, and social
              impact.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/contact">
                Contact <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {summaryStats.map((item) => (
              <article key={item.label} className="p-4 rounded-xl border border-border bg-card/40">
                <p className="text-lg font-bold leading-none">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-2">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Active Venture Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ventureTracks.map((track) => {
              const Icon = track.icon
              return (
                <article
                  key={track.title}
                  className="p-7 rounded-xl border border-border bg-card hover:border-accent transition-colors flex flex-col"
                >
                  <Icon className="w-7 h-7 text-accent mb-5" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{track.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">{track.description}</p>
                  <p className="text-xs text-accent mb-5">{track.stage}</p>
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

      <section className="py-16 md:py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Flagship Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flagshipInitiatives.map((item) => (
              <article key={item.name} className="p-6 rounded-xl border border-border bg-background">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
                  <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">{item.status}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.summary}</p>
                {"href" in item && item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs text-accent hover:text-accent/80"
                  >
                    {item.name === "Si-Cast" ? "View YouTube channel" : "View event details"} <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
