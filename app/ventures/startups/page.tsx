import Link from "next/link"
import { JourneySection } from "@/components/journey-section"
import { ArrowLeft, Rocket } from "lucide-react"

export const metadata = {
  title: "Startups | Ventures | Islam Abdulaal",
  description: "Startup initiatives and entrepreneurial ventures.",
}

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

  const summaryStats = [
    { label: "Concepts", value: String(startupConcepts.length) },
    { label: "Current Stage", value: "Discovery to Validation" },
    { label: "Orientation", value: "Research Translation" },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link href="/ventures" className="text-accent hover:text-accent/80 mb-4 inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Ventures
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6">Startups</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Early-stage startup concepts derived from integrated photonics research and engineering workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {summaryStats.map((item) => (
            <article key={item.label} className="p-4 rounded-xl border border-border bg-card/40">
              <p className="text-lg font-bold leading-none">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-2">{item.label}</p>
            </article>
          ))}
        </div>

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

      <JourneySection
        title="Discuss a Startup Direction"
        description="Continue with collaboration scoping, service alignment, or review of the broader venture portfolio."
        actions={[
          { href: "/contact", label: "Discuss Opportunities" },
          { href: "/services", label: "Match to Service Tracks", variant: "outline" },
          { href: "/ventures", label: "Back to Ventures", variant: "ghost" },
        ]}
      />
    </main>
  )
}
