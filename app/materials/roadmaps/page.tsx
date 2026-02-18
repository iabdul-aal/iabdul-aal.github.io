import Link from "next/link"
import { ArrowLeft, Milestone } from "lucide-react"
import { JourneySection } from "@/components/journey-section"

export const metadata = {
  title: "Roadmaps | Materials | Islam Abdulaal",
}

export default function RoadmapsPage() {
  const roadmaps = [
    {
      title: "Integrated Photonics Starter Path",
      duration: "8-12 weeks",
      checkpoints: ["Optics refresh", "Waveguide intuition", "First simulation exercises"],
    },
    {
      title: "Simulation to Design Workflow",
      duration: "10-14 weeks",
      checkpoints: ["Tool setup and calibration", "Benchmark structures", "Design iteration and reporting"],
    },
    {
      title: "Research Readiness Path",
      duration: "12-16 weeks",
      checkpoints: ["Literature mapping", "Method comparison", "Mini-project execution"],
    },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/materials" className="text-accent hover:text-accent/80 mb-4 inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Materials
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Roadmaps</h1>
        <p className="text-muted-foreground max-w-2xl mb-10">
          Curated progression paths for students and early researchers who want structured momentum.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmaps.map((roadmap) => (
            <article key={roadmap.title} className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between gap-3 mb-4">
                <Milestone className="w-5 h-5 text-accent" />
                <span className="text-xs text-accent">{roadmap.duration}</span>
              </div>
              <h2 className="text-lg font-semibold mb-4">{roadmap.title}</h2>
              <ul className="space-y-2">
                {roadmap.checkpoints.map((checkpoint) => (
                  <li key={checkpoint} className="text-sm text-muted-foreground border-l-2 border-accent/50 pl-3">
                    {checkpoint}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <JourneySection
        title="Move From Roadmap to Execution"
        description="Continue with mentorship support, full materials navigation, or direct outreach for guidance."
        actions={[
          { href: "/mentorship", label: "Book Mentorship Path" },
          { href: "/materials", label: "Back to Materials", variant: "outline" },
          { href: "/contact", label: "Request Guidance", variant: "ghost" },
        ]}
      />
    </main>
  )
}
