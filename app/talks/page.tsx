import { JourneySection } from "@/components/journey-section"
import { PageHero } from "@/components/page-hero"
import { TalksStack } from "@/components/talks-stack"
import { MessageSquareText, Presentation, Users } from "lucide-react"
import { loadTalks } from "@/lib/talks"

export const metadata = {
  title: "Talks",
  description:
    "Speaking sessions by Islam I. Abdulaal across technical topics, entrepreneurship, and practical growth for students and early-career audiences.",
}

export default async function TalksPage() {
  const talks = await loadTalks()

  const themes = [
    {
      title: "Integrated Photonics",
      description: "I explain device-level fundamentals and how they map into full PIC architecture decisions.",
    },
    {
      title: "Research Workflow",
      description: "I share practical methods for moving from theory and papers to reproducible technical execution.",
    },
    {
      title: "Entrepreneurship and Execution",
      description: "I discuss how to validate ideas, build initiatives, and move from concept to practical impact.",
    },
    {
      title: "Career and Life Wisdom",
      description: "I share practical lessons on discipline, consistency, and decision-making through different career phases.",
    },
  ]

  const formats = [
    {
      title: "Technical Talks",
      icon: Presentation,
      detail: "Focused sessions for student chapters, labs, and engineering communities.",
    },
    {
      title: "Interactive Workshops",
      icon: Users,
      detail: "Hands-on formats around problem framing, modeling strategy, and reporting quality.",
    },
    {
      title: "Mentorship Q&A",
      icon: MessageSquareText,
      detail: "Open sessions for students and early researchers who need direction and feedback.",
    },
  ]

  return (
    <main className="bg-background text-foreground">
      <PageHero
        kicker="Talks"
        title="Talks and Workshops"
        description="Sessions across technical topics, entrepreneurship, and practical career growth for students and early-career audiences."
        actions={[
          { label: "Invite Me to Speak", href: "/contact" },
          { label: "Browse Services", href: "/services", variant: "outline" },
        ]}
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-3">What I Cover</h2>
          <p className="text-sm text-muted-foreground mb-12 max-w-[72ch]">
            Session topics are adapted to audience level, from fundamentals and methods to execution mindset and practical career strategy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themes.map((theme) => (
              <article key={theme.title} className="p-7 rounded-xl border border-border bg-card">
                <h3 className="text-xl font-semibold mb-3">{theme.title}</h3>
                <p className="text-sm text-muted-foreground">{theme.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-3">Session Formats</h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-[72ch]">
            Choose the format that matches your objective, audience size, and available session time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formats.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="p-6 rounded-xl border border-border bg-background">
                  <Icon className="w-7 h-7 text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Talk Stack</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Browse talks in horizontal slots. Use categorize controls at the end of this section.
            </p>
          </div>

          <TalksStack talks={talks} />
        </div>
      </section>

      <JourneySection
        title="Plan the Right Session"
        description="Share your audience level and objective, and I can shape a session across technical, entrepreneurial, or personal-development themes."
        actions={[
          { href: "/contact", label: "Invite for a Talk" },
          { href: "/services", label: "Review Service Scope", variant: "outline" },
          { href: "/mentorship", label: "Mentorship Path", variant: "ghost" },
        ]}
      />
    </main>
  )
}
