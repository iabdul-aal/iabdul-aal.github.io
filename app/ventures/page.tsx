import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JourneySection } from "@/components/journey-section"
import { ArrowRight, FlaskConical, Rocket, Users2 } from "lucide-react"
import { socialLinks } from "@/lib/social-links"

export const metadata = {
  title: "Ventures",
  description:
    "Founded initiatives and venture directions across startup exploration, technical pilots, and student community programs.",
}

export default function VenturesPage() {
  const ventureTracks = [
    {
      title: "Startup Exploration",
      description:
        "Exploring how photonics and sensing ideas can be shaped into realistic early-stage product hypotheses, including Octides.",
      icon: Rocket,
      logo: "/logos/platforms/Octides.webp",
      logoAlt: "Octides logo",
      href: "/ventures/startups",
      cta: "View Startup Track",
      stage: "Concept to Prototype",
    },
    {
      title: "Research-to-Industry Pilots",
      description:
        "Testing small pilot formats for simulation, inverse design, and photonic-electronic integration problems.",
      icon: FlaskConical,
      href: "/services",
      cta: "Explore Collaboration Formats",
      stage: "Open for pilot scoping",
    },
    {
      title: "Community and Non-Profit Initiatives",
      description:
        "Student-focused education and technical capacity-building programs in volunteer engineering communities.",
      icon: Users2,
      href: "/ventures/non-profit",
      cta: "See Initiative Background",
      stage: "Founded | Not currently active",
    },
  ]

  const foundedInitiatives = [
    {
      name: "HW Carnival",
      summary:
        "Founded initiative with a technical day hosted at Bibliotheca Alexandrina on December 25, 2025, covering AlexDuino, Si-Clash, and Si-Cast tracks.",
      status: "Founded | Inactive",
      href: socialLinks.hwCarnivalEvent,
    },
    {
      name: "Si-Cast",
      summary:
        "Founded technical content track focused on practical engineering communication and peer learning.",
      status: "Founded | Inactive",
      href: socialLinks.siCastYoutube,
    },
    {
      name: "Si-Clash",
      summary:
        "Founded challenge-oriented track for improving practical design thinking and implementation skills.",
      status: "Founded | Inactive",
    },
    {
      name: "AlexDuino",
      summary:
        "Founded hands-on prototyping track centered on embedded systems and real hardware execution.",
      status: "Founded | Inactive",
    },
  ]

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">Ventures</h1>
            <p className="text-lg md:text-2xl text-muted-foreground">
              I founded these initiatives to build practical student-focused technical programs. I am currently not
              active in daily initiative operations.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/contact">
                Contact <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Current Venture Directions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ventureTracks.map((track) => {
              const Icon = track.icon
              return (
                <article
                  key={track.title}
                  className="p-7 rounded-xl border border-border bg-card hover:border-accent transition-colors flex flex-col"
                >
                  {track.logo ? (
                    <div className="relative h-8 w-28 mb-5">
                      <Image
                        src={track.logo}
                        alt={track.logoAlt ?? `${track.title} logo`}
                        fill
                        sizes="112px"
                        className="object-contain object-left"
                      />
                    </div>
                  ) : (
                    <Icon className="w-7 h-7 text-accent mb-5" />
                  )}
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Founded Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {foundedInitiatives.map((item) => (
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

      <JourneySection
        title="Continue the Venture Track"
        description="Move into startup concepts, community initiatives, or service-based collaboration formats."
        actions={[
          { href: "/ventures/startups", label: "Open Startup Track" },
          { href: "/ventures/non-profit", label: "View Community Initiatives", variant: "outline" },
          { href: "/services", label: "Map to Services", variant: "ghost" },
        ]}
      />
    </main>
  )
}
