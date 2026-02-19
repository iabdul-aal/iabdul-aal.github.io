import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JourneySection } from "@/components/journey-section"
import { ArrowRight, CalendarDays, MessageSquareText, Presentation, Users } from "lucide-react"
import { loadTalks } from "@/lib/talks"

export const metadata = {
  title: "Talks",
  description:
    "Talks and workshop sessions by Islam I. Abdulaal across integrated photonics, nonlinear photonics, and practical research execution.",
}

function formatTalkDate(date: string, year: string) {
  if (date) {
    const parsed = new Date(date)
    if (!Number.isNaN(parsed.getTime())) {
      return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(parsed)
    }
  }

  return year || "Date not listed"
}

export default async function TalksPage() {
  const talks = await loadTalks()
  const featuredTalk = talks.find((item) => item.featured) ?? talks[0]

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
      title: "Engineering Communication",
      description: "I cover how to present technical work with clarity for students, teams, and mixed audiences.",
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

  const summaryStats = [
    { label: "Published Sessions", value: String(talks.length) },
    { label: "Themes", value: String(themes.length) },
    { label: "Formats", value: String(formats.length) },
    { label: "Delivery", value: "Onsite / Remote" },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="min-h-[55vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Talks and Workshops</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              I share sessions on integrated photonics, research execution, and technical communication with student and
              professional audiences.
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {summaryStats.map((item) => (
              <article key={item.label} className="p-4 rounded-xl border border-border bg-card/40">
                <p className="text-lg font-bold leading-none">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-2">{item.label}</p>
              </article>
            ))}
          </div>

          <h2 className="text-4xl font-bold mb-12">What I Cover</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold">Latest Public Sessions</h2>
              <p className="text-sm text-muted-foreground mt-2">
                This list auto-updates from public sources in `talks.json`.
              </p>
            </div>
            <p className="text-xs text-muted-foreground">{talks.length} sessions listed</p>
          </div>

          <div className="space-y-4">
            {talks.map((talk) => (
              <article key={talk.url} className="p-5 rounded-xl border border-border bg-card">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold leading-snug">{talk.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{talk.event}</p>
                    <p className="text-xs text-accent mt-2">{talk.source} | {talk.format}</p>
                  </div>
                  <div className="text-sm text-muted-foreground inline-flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-accent" />
                    {formatTalkDate(talk.date, talk.year)}
                  </div>
                </div>
                <a
                  href={talk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                >
                  Watch Session <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </article>
            ))}
          </div>

          {featuredTalk && (
            <article className="mt-8 p-6 rounded-xl border border-accent/40 bg-background">
              <p className="text-xs text-accent font-semibold">Featured Session</p>
              <h3 className="text-xl font-semibold mt-2">{featuredTalk.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                A highlighted public talk that reflects how I communicate technical ideas to broader audiences.
              </p>
              <a
                href={featuredTalk.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
              >
                Open Featured Talk <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </article>
          )}
        </div>
      </section>

      <JourneySection
        title="Plan the Right Session"
        description="If you share your audience level and objective, I can shape the talk format and depth accordingly."
        actions={[
          { href: "/contact", label: "Invite for a Talk" },
          { href: "/services", label: "Review Service Scope", variant: "outline" },
          { href: "/mentorship", label: "Mentorship Path", variant: "ghost" },
        ]}
      />
    </main>
  )
}
