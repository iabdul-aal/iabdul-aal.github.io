import Link from "next/link"
import { Button } from "@/components/ui/button"
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
              <ul className="space-y-2">
                {concept.milestones.map((milestone) => (
                  <li key={milestone} className="text-xs text-muted-foreground border-l-2 border-accent/50 pl-3">
                    {milestone}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="p-8 rounded-xl border border-border bg-card mt-8">
          <h3 className="text-2xl font-semibold mb-3">Partnership Interest</h3>
          <p className="text-muted-foreground mb-6">
            Looking for collaborators in photonic product strategy, applied R&D, and prototype-to-pilot execution.
          </p>
          <Link href="/contact">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Discuss Opportunities</Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
