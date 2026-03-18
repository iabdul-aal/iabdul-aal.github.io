import { PageHero } from "@/components/page-hero"
import Link from "next/link"
import { Check, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { socialLinks } from "@/lib/social-links"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Current collaboration and technical support scope by Islam I. Abdulaal in integrated photonics, simulation workflows, and student mentorship.",
  path: "/services",
})

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

  const mentorshipSessions = [
    {
      title: "Research Direction",
      description: "Clarify topic scope, reading priorities, and milestone planning for photonics-related projects.",
    },
    {
      title: "Technical Guidance",
      description: "Discuss simulation strategy, modeling assumptions, and practical implementation trade-offs.",
    },
    {
      title: "Academic Growth",
      description: "Support for profile building, writing habits, and transitioning from learning to research output.",
    },
    {
      title: "Project Review",
      description: "Feedback on current work, bottlenecks, and how to improve technical communication.",
    },
  ]

  return (
    <main className="bg-background text-foreground">
      <PageHero
        kicker="Services"
        title="Collaboration Support"
        description="Focused support for photonics modeling, research workflow design, physics-informed optimization, and student mentorship."
        actions={[
          { label: "Start a Discussion", href: "/contact" },
          { label: "Jump to Mentorship", href: "#mentorship", variant: "outline" },
        ]}
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent mb-2">What I Offer</p>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Service Tracks</h2>
          <p className="text-sm text-muted-foreground mb-12 max-w-[72ch]">
            Each track is scoped around practical deliverables and clear constraints.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceTracks.map((track) => (
              <article key={track.title} className="group p-6 sm:p-7 rounded-xl border border-border bg-card hover:border-accent/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{track.title}</h3>
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

      <section className="py-16 md:py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent mb-2">How It Works</p>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Typical Engagement Flow</h2>
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
                  <div className="p-6 rounded-xl border border-border bg-background hover:border-accent/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 h-full">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="mentorship" className="py-16 md:py-20 bg-background scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent mb-2">Free Service</p>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Mentorship for Students</h2>
          <p className="text-sm text-muted-foreground mb-12 max-w-[72ch]">
            Structured support for students who need clarity on direction and execution. Mentorship sessions are offered free of charge.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentorshipSessions.map((session) => (
              <article key={session.title} className="group p-6 sm:p-7 rounded-xl border border-border bg-card hover:border-accent/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{session.title}</h3>
                <p className="text-muted-foreground">{session.description}</p>
                <p className="text-accent text-sm font-semibold mt-5 group-hover:translate-x-0.5 transition-transform">By appointment</p>
              </article>
            ))}
          </div>

          <div className="mt-10 p-6 sm:p-7 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-5">
              <MessageCircle className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-bold">Direct Questions</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              For concise technical questions, send a short context summary and your current objective.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/contact">Use Contact Page</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href={socialLinks.telegramBot} target="_blank" rel="noopener noreferrer">
                  Ask via Telegram Bot
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  Message on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

