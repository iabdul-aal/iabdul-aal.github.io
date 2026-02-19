import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { ArrowRight, FlaskConical, Rocket, Users2 } from "lucide-react"
import { socialLinks } from "@/lib/social-links"

export const metadata = {
  title: "Ventures",
  description:
    "Founded initiatives and venture directions across startup exploration, technical pilots, and student community programs.",
}

export default function VenturesPage() {
  const startupPortfolio = [
    {
      name: "Octides",
      relation: "Founded / Worked On",
      description:
        "Octides is developing an AI-powered design engine for optimizing cell-free crude extract systems, dramatically accelerating synthetic biology workflows from weeks to hours.",
      supportNote:
        "Part of Seedstars and CTCN, with support from the Irish and Netherlands embassies.",
      href: "/ventures/startups",
      logo: "/logos/platforms/Octides.webp",
      externalHref: socialLinks.octidesLinkedIn,
      externalLabel: "LinkedIn",
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
    {
      title: "Community and Non-Profit Initiatives",
      description:
        "Student-focused education and technical capacity-building programs in volunteer engineering communities.",
      icon: Users2,
      href: "/ventures/non-profit",
      cta: "See Initiative Background",
    },
  ]

  const foundedInitiatives = [
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

  return (
    <main className="bg-background text-foreground">
      <PageHero
        kicker="Ventures"
        title="Ventures and Initiatives"
        description="A concise view of startup work, pilot directions, and founded student initiatives."
        actions={[
          { label: "Discuss Collaboration", href: "/contact" },
          { label: "Explore Services", href: "/services", variant: "outline" },
        ]}
      />

      <section className="py-16 md:py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Startup Work</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-[72ch]">Current startup activity in one place.</p>
          <div className="grid grid-cols-1 gap-6">
            {startupPortfolio.map((startup) => (
              <article key={startup.name} className="p-7 rounded-xl border border-accent/40 bg-background">
                <div className="mb-4 flex items-center gap-3">
                  {startup.logo ? (
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-md border border-border/70 bg-background/60 p-1">
                      <Image
                        src={startup.logo}
                        alt={`${startup.name} logo`}
                        width={48}
                        height={48}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-md border border-border/70 bg-background/60">
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
                  <Button asChild size="sm">
                    <Link href={startup.href}>
                      Open Startup Track
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
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

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Other Venture Directions</h2>
          <p className="text-sm text-muted-foreground mb-12 max-w-[72ch]">
            Additional tracks I use to test ideas in practical settings.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Founded Initiatives</h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-[72ch]">
            Programs I started to support technical learning communities and student-led execution.
          </p>
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
    </main>
  )
}
