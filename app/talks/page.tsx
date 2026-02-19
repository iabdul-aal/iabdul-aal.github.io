import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JourneySection } from "@/components/journey-section"
import { ArrowRight, MessageSquareText, Presentation, Users } from "lucide-react"
import { socialLinks } from "@/lib/social-links"

export const metadata = {
  title: "Talks",
  description:
    "Speaking topics and workshop formats by Islam I. Abdulaal across integrated photonics, nonlinear quantum photonics, and research methodology.",
}

export default function TalksPage() {
  const topics = [
    {
      title: "Integrated Photonics Fundamentals",
      description: "From waveguides to PIC architectures, with engineering trade-offs and practical design framing.",
    },
    {
      title: "Physics-Informed Photonic Design",
      description: "How physics-aware ML methods can complement classical simulation and optimization workflows.",
    },
    {
      title: "Photonics for Data and Communication Systems",
      description: "Device-to-system view of why integrated photonics matters in modern digital infrastructure.",
    },
    {
      title: "Research Skill Building for Students",
      description: "How to move from coursework to literature-based technical projects and early publication readiness.",
    },
  ]

  const formats = [
    {
      title: "Technical Talks",
      icon: Presentation,
      detail: "Short focused sessions for student chapters, research groups, and technical communities.",
    },
    {
      title: "Interactive Workshops",
      icon: Users,
      detail: "Applied sessions on problem framing, simulation planning, and research execution patterns.",
    },
    {
      title: "Mentorship Q&A",
      icon: MessageSquareText,
      detail: "Open-format sessions for early researchers seeking direction in photonics-related work.",
    },
  ]

  const summaryStats = [
    { label: "Topics", value: String(topics.length) },
    { label: "Formats", value: String(formats.length) },
    { label: "Delivery", value: "Talks & Workshops" },
    { label: "Mode", value: "Onsite / Remote" },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="min-h-[55vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Talks and Workshops</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Speaking sessions focused on integrated photonics, nonlinear quantum photonics, and research skill development.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/contact">
                Invite Me to Speak <ArrowRight className="w-4 h-4 ml-2" />
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
          <h2 className="text-4xl font-bold mb-12">Speaking Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.map((topic) => (
              <article key={topic.title} className="p-7 rounded-xl border border-border bg-card hover:border-accent transition-colors">
                <h3 className="text-xl font-semibold mb-3">{topic.title}</h3>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-10">Formats</h2>
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
          <h2 className="text-3xl font-bold mb-6">Featured Talk</h2>
          <article className="p-7 rounded-xl border border-border bg-card">
            <h3 className="text-xl font-semibold mb-3">Recent Public Talk</h3>
            <p className="text-sm text-muted-foreground mb-5">
              A public session covering practical research thinking and technical communication for engineering learners.
            </p>
            <a
              href={socialLinks.featuredTalkYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
            >
              Watch on YouTube <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </article>
        </div>
      </section>

      <JourneySection
        title="Plan the Right Session"
        description="Move forward by requesting a talk, reviewing service scope, or opening a mentorship conversation."
        actions={[
          { href: "/contact", label: "Invite for a Talk" },
          { href: "/services", label: "Review Service Scope", variant: "outline" },
          { href: "/mentorship", label: "Mentorship Path", variant: "ghost" },
        ]}
      />
    </main>
  )
}
