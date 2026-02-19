import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JourneySection } from "@/components/journey-section"
import { ArrowRight, Check } from "lucide-react"

export const metadata = {
  title: "Services",
  description:
    "Research and technical service tracks by Islam I. Abdulaal for integrated photonics, simulation, and photonic-electronic co-design.",
}

export default function ServicesPage() {
  const serviceTracks = [
    {
      title: "Photonic Device Design Support",
      description: "Design and simulation assistance for integrated photonic components and sub-systems.",
      scope: ["Waveguide and coupling studies", "Mode and loss analysis", "Simulation workflow planning", "Design documentation"],
    },
    {
      title: "Research Workflow Engineering",
      description: "Structured technical support for early-stage research teams and student projects.",
      scope: ["Problem framing and scope definition", "Literature-driven baseline design", "Experiment/simulation milestones", "Result packaging for reporting"],
    },
    {
      title: "Physics-Informed Optimization Support",
      description: "Method-level support for physics-aware modeling and inverse-design style investigations.",
      scope: ["PINN problem setup guidance", "Model and objective selection", "Validation strategy review", "Iteration and trade-off analysis"],
    },
  ]

  const mentorship = {
    title: "Mentorship",
    badge: "Free Service",
    description:
      "1-on-1 guidance for students and early researchers in integrated photonics and research workflows.",
    scope: [
      "Research direction and milestone planning",
      "Technical review of simulation approach",
      "Feedback on project communication and structure",
      "Session scheduling through mentorship page",
    ],
  }

  const process = [
    {
      step: "1",
      title: "Scope Call",
      detail: "Define the technical objective, constraints, and expected outputs.",
    },
    {
      step: "2",
      title: "Execution Plan",
      detail: "Set the workflow, milestones, and review checkpoints.",
    },
    {
      step: "3",
      title: "Delivery",
      detail: "Deliver analysis artifacts, recommendations, and next-step options.",
    },
  ]

  const summaryStats = [
    { label: "Service Tracks", value: String(serviceTracks.length) },
    { label: "Mentorship", value: mentorship.badge },
    { label: "Engagement Steps", value: String(process.length) },
    { label: "Delivery", value: "Structured" },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="min-h-[55vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Research and Technical Services</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Practical support for integrated photonics research, simulation planning, and technical delivery.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/contact">
                Start a Discussion <ArrowRight className="w-4 h-4 ml-2" />
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

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Service Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceTracks.map((track) => (
              <article key={track.title} className="p-8 rounded-xl border border-border bg-card hover:border-accent transition-colors">
                <h3 className="text-xl font-bold mb-3">{track.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{track.description}</p>
                <div className="space-y-3">
                  {track.scope.map((item) => (
                    <p key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-3xl font-bold">{mentorship.title}</h2>
            <span className="text-xs text-accent bg-accent/10 rounded-full px-3 py-1.5">{mentorship.badge}</span>
          </div>
          <article className="p-8 rounded-xl border border-border bg-background">
            <p className="text-sm text-muted-foreground mb-6 max-w-3xl">{mentorship.description}</p>
            <div className="space-y-3 mb-6">
              {mentorship.scope.map((item) => (
                <p key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
            <Link href="/mentorship" className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80">
              Book mentorship <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </article>
        </div>
      </section>

      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-10">Typical Engagement Flow</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map((item) => (
              <article key={item.step} className="p-6 rounded-xl border border-border bg-background">
                <div className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <JourneySection
        title="Ready to Scope a Project?"
        description="Use contact for project context and timeline, or review profile and venture tracks before starting."
        actions={[
          { href: "/contact", label: "Start a Project Discussion" },
          { href: "/about", label: "Review Full Profile", variant: "outline" },
          { href: "/ventures", label: "See Venture Tracks", variant: "ghost" },
        ]}
      />
    </main>
  )
}
