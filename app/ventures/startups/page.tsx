import { PageHero } from "@/components/page-hero"
import { Rocket } from "lucide-react"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Startup Track",
  description: "Startup concepts and early venture hypotheses connected to research translation work.",
  path: "/ventures/startups",
})

export default function StartupsPage() {
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

  return (
    <main className="bg-background text-foreground">
      <PageHero
        kicker="Ventures"
        title="Startup Track"
        description="Early-stage concepts I am validating to connect sensing research with practical product direction."
        actions={[
          { label: "Back to Ventures", href: "/ventures", variant: "outline" },
          { label: "Discuss Opportunities", href: "/contact", variant: "ghost" },
        ]}
      />

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
