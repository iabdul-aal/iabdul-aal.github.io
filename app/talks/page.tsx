import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JourneySection } from "@/components/journey-section"
import { TalksStack } from "@/components/talks-stack"
import { ArrowRight, MessageSquareText, Presentation, Users } from "lucide-react"
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
      <section className="min-h-[55vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Talks and Workshops</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              This page lists sessions where I speak about technical topics, entrepreneurship, and practical growth for
              student and early-career audiences.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/contact">
                Invite Me to Speak <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">What I Cover</h2>
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
          <h2 className="text-4xl font-bold mb-10">Session Formats</h2>
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
              Filter by format, source, and year, or search by event and session title.
            </p>
          </div>

          <TalksStack talks={talks} />
        </div>
      </section>

      <JourneySection
        title="Plan the Right Session"
        description="If you share your audience level and objective, I can shape a session across technical, entrepreneurial, or personal-development themes."
        actions={[
          { href: "/contact", label: "Invite for a Talk" },
          { href: "/services", label: "Review Service Scope", variant: "outline" },
          { href: "/mentorship", label: "Mentorship Path", variant: "ghost" },
        ]}
      />
    </main>
  )
}
