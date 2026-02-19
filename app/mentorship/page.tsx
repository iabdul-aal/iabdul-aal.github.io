import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JourneySection } from "@/components/journey-section"
import { MessageCircle } from "lucide-react"

export const metadata = {
  title: "Mentorship",
  description:
    "Mentorship support by Islam I. Abdulaal for students and early researchers in integrated photonics and research skills.",
}

export default function MentorshipPage() {
  const sessions = [
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
      description: "Support for portfolio building, writing habits, and transitioning from learning to research output.",
    },
    {
      title: "Project Review",
      description: "Feedback on current work, bottlenecks, and how to improve technical communication.",
    },
  ]

  const summaryStats = [
    { label: "Session Themes", value: String(sessions.length) },
    { label: "Format", value: "1-on-1" },
    { label: "Audience", value: "Early Researchers" },
    { label: "Booking", value: "By Appointment" },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="min-h-[55vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Mentorship</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Mentorship support for students and early researchers working in integrated photonics and adjacent fields.
            </p>
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
          <h2 className="text-4xl font-bold mb-12">1-on-1 Session Themes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sessions.map((session) => (
              <article key={session.title} className="p-8 rounded-xl border border-border bg-card hover:border-accent transition-colors">
                <h3 className="text-xl font-bold mb-3">{session.title}</h3>
                <p className="text-muted-foreground">{session.description}</p>
                <p className="text-accent text-sm font-semibold mt-5">By appointment</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Quick Questions</h2>
            <p className="text-lg text-muted-foreground">
              For short questions, reach out through the contact page or LinkedIn.
            </p>
          </div>

          <div className="p-8 rounded-xl border border-border bg-background">
            <div className="flex items-center justify-center gap-4 mb-6">
              <MessageCircle className="w-8 h-8 text-accent" />
              <h3 className="text-2xl font-bold">Direct Message Options</h3>
            </div>
            <p className="text-center text-muted-foreground mb-6">
              For concise technical questions, send a short context summary with your current objective and challenge.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/contact">Use Contact Page</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href="https://www.linkedin.com/in/iabdul-aal" target="_blank" rel="noopener noreferrer">
                  Message on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <JourneySection
        title="Build Your Next Learning Step"
        description="Continue with structured materials, direct contact, or talks and workshops based on your current stage."
        actions={[
          { href: "/materials", label: "Open Learning Materials" },
          { href: "/contact", label: "Send a Mentorship Request", variant: "outline" },
          { href: "/talks", label: "Browse Talks", variant: "ghost" },
        ]}
      />
    </main>
  )
}
