import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JourneySection } from "@/components/journey-section"
import { ArrowRight, Building2, FlaskConical, Handshake, Rocket, Users2 } from "lucide-react"

export const metadata = {
  title: "Ventures | Islam Abdulaal",
  description: "Startups and initiatives including HW Carnival, Si-Cast, Si-Clash, and AlexDuino.",
}

export default function VenturesPage() {
  const ventureTracks = [
    {
      title: "Startup Exploration",
      description:
        "Translating photonics and sensing research into early-stage product hypotheses and technical validation plans.",
      icon: Rocket,
      href: "/ventures/startups",
      cta: "View Startup Track",
      stage: "Stage: Concept to Prototype",
    },
    {
      title: "Research-to-Industry Pilots",
      description:
        "Structured pilot collaborations for simulation, inverse design, and photonic-electronic integration problems.",
      icon: FlaskConical,
      href: "/services",
      cta: "Explore Collaboration Formats",
      stage: "Stage: Open for pilot scoping",
    },
    {
      title: "Community and Non-Profit Initiatives",
      description:
        "Education and technical capacity-building programs across student communities and volunteer networks.",
      icon: Users2,
      href: "/ventures/non-profit",
      cta: "See Community Impact",
      stage: "Stage: Active engagement",
    },
  ]

  const flagshipInitiatives = [
    {
      name: "HW Carnival",
      summary:
        "A funded hardware initiative and community program with broad student engagement and public feature coverage.",
      status: "Flagship",
    },
    {
      name: "Si-Cast",
      summary:
        "An initiative track focused on structured technical content and engineering knowledge transfer.",
      status: "Active",
    },
    {
      name: "Si-Clash",
      summary:
        "A challenge-oriented initiative model designed to strengthen practical engineering problem solving.",
      status: "Active",
    },
    {
      name: "AlexDuino",
      summary:
        "A practical prototyping initiative centered on embedded systems and hands-on electronics development.",
      status: "Active",
    },
  ]

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-[55vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Ventures</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Venture paths that translate integrated photonics research into technical pilots, products, and social
              impact.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                Start a Collaboration <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">Active Venture Tracks</h2>
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

      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-10">Flagship Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flagshipInitiatives.map((item) => (
              <article key={item.name} className="p-6 rounded-xl border border-border bg-background">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
                  <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">{item.status}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-10">Collaboration Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Technical Pilot Collaboration",
                description:
                  "Problem-first engagements with clear simulation goals, milestones, and documented outcomes.",
                icon: Building2,
              },
              {
                title: "Research Partnership",
                description:
                  "Co-development of methods, datasets, and manuscripts in applied integrated photonics.",
                icon: Handshake,
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="p-6 rounded-xl border border-border bg-background">
                  <div className="flex items-start gap-4">
                    <Icon className="w-6 h-6 text-accent mt-0.5" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <JourneySection
        title="Move to the Right Venture Track"
        description="Continue to startup concepts, technical service scoping, or direct collaboration outreach."
        actions={[
          { href: "/ventures/startups", label: "Review Startup Track" },
          { href: "/services", label: "Check Service Formats", variant: "outline" },
          { href: "/contact", label: "Start Collaboration", variant: "ghost" },
        ]}
      />
    </main>
  )
}
