import Image from "next/image"
import { PageHero } from "@/components/page-hero"
import { ArrowUpRight, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { socialLinks } from "@/lib/social-links"

export const metadata = {
  title: "Startup Track",
  description: "Current startup work and early venture concepts related to my technical background.",
}

export default function StartupsPage() {
  const startupConcepts = [
    {
      title: "Octides | AI Design Engine for Synthetic Biology",
      status: "Discovery",
      summary:
        "Octides is developing an AI-powered design engine for optimizing cell-free crude extract systems, dramatically accelerating synthetic biology workflows from weeks to hours.",
      milestones: [
        "Part of Seedstars",
        "Part of CTCN",
        "Supported by the Irish and Netherlands embassies",
      ],
    },
    {
      title: "Inverse Design Service Layer for PIC Teams",
      status: "Validation",
      summary:
        "A focused service model applying PINN-driven optimization to shorten photonic design iteration loops.",
      milestones: ["Workflow prototyping", "Benchmark case studies", "Documentation pipeline"],
    },
  ]

  return (
    <main className="bg-background text-foreground">
      <PageHero
        kicker="Ventures"
        title="Startup Track"
        description="Startups I founded or worked with, plus early concepts I am validating."
        actions={[
          { label: "Back to Ventures", href: "/ventures", variant: "outline" },
          { label: "Discuss Opportunities", href: "/contact", variant: "ghost" },
        ]}
      />

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-3 rounded-xl border border-border bg-card/70 px-4 py-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/70 bg-background/60 p-1">
            <Image
              src="/logos/platforms/Octides.webp"
              alt="Octides logo"
              width={32}
              height={32}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-sm text-muted-foreground">One startup in this portfolio: Octides</span>
        </div>
        <div className="mt-4">
          <Button asChild variant="outline" size="sm">
            <a href={socialLinks.octidesLinkedIn} target="_blank" rel="noopener noreferrer">
              Octides on LinkedIn
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </section>

      <section className="pb-16 md:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {startupConcepts.map((concept) => (
            <article
              key={concept.title}
              className="p-6 rounded-xl border border-border bg-card hover:border-accent transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <Rocket className="w-5 h-5 text-accent" />
                <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">{concept.status}</span>
              </div>
              <h2 className="text-xl font-semibold mb-3">{concept.title}</h2>
              <p className="text-sm text-muted-foreground mb-5">{concept.summary}</p>
              <div className="space-y-2">
                {concept.milestones.map((milestone) => (
                  <p key={milestone} className="text-xs text-muted-foreground border-l-2 border-accent/50 pl-3">
                    {milestone}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
