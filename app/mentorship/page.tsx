import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { MessageCircle } from "lucide-react"
import { socialLinks } from "@/lib/social-links"

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
        kicker="Mentorship"
        title="Mentorship and Guidance"
        description="Structured support for students and early researchers who need clarity on direction and execution."
        actions={[
          { label: "Use Contact Page", href: "/contact" },
          { label: "Ask via Telegram Bot", href: socialLinks.telegramBot, external: true, variant: "outline" },
        ]}
      />

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
          <div className="p-8 rounded-xl border border-border bg-background">
            <div className="flex items-center gap-3 mb-5">
              <MessageCircle className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-bold">Direct Questions</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              For concise technical questions, send a short context summary and your current objective.
            </p>
            <div className="flex gap-4 flex-wrap">
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
              <Button asChild variant="ghost" className="w-full sm:w-auto">
                <a href={socialLinks.telegramChannel} target="_blank" rel="noopener noreferrer">
                  View Telegram Channel
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
