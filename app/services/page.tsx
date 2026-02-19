import { PageHero } from "@/components/page-hero"
import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Services",
  description:
    "Current collaboration and technical support scope by Islam I. Abdulaal in integrated photonics and simulation workflows.",
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

  return (
    <main className="bg-background text-foreground">
      <PageHero
        kicker="Services"
        title="Collaboration Support"
        description="Focused support for photonics modeling, research workflow design, and physics-informed optimization."
        actions={[
          { label: "Start a Discussion", href: "/contact" },
          { label: "Review Mentorship", href: "/mentorship", variant: "outline" },
        ]}
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-3">Service Tracks</h2>
          <p className="text-sm text-muted-foreground mb-12 max-w-[72ch]">
            Each track is scoped around practical deliverables and clear constraints.
          </p>
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

      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-3">Typical Engagement Flow</h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-[72ch]">
            A lightweight sequence to keep scope, execution, and delivery aligned from the first conversation.
          </p>
          <div className="relative">
            <div className="timeline-line-animate absolute left-4 top-0 bottom-0 w-px bg-border/80 md:left-0 md:right-0 md:top-4 md:bottom-auto md:h-px md:w-full" />
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
              {process.map((item, index) => (
                <article
                  key={item.step}
                  className="timeline-step-reveal relative pl-12 md:pl-0 md:pt-9"
                  style={{ animationDelay: `${index * 140}ms` }}
                >
                  <div className="timeline-node-pulse absolute left-[2px] top-1 w-7 h-7 rounded-full border border-accent/60 bg-background text-accent flex items-center justify-center text-sm font-semibold md:left-1/2 md:-translate-x-1/2 md:top-0">
                    {item.step}
                  </div>
                  <div className="p-6 rounded-xl border border-border bg-background hover:border-accent transition-colors h-full">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-xl border border-accent/40 bg-card">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div className="max-w-3xl">
                <span className="inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                  Free Service
                </span>
                <h2 className="text-3xl font-bold mt-3">Mentorship for Students</h2>
                <p className="text-sm text-muted-foreground mt-3 max-w-[72ch]">
                  I offer free mentorship sessions for direction clarity, technical planning, and practical academic growth.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/mentorship">Open Mentorship</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Request a Session</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
