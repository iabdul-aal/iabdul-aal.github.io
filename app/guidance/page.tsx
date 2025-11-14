import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { redirect } from "next/navigation"

export const metadata = {
  title: "1-on-1 Guidance | Islam Abdulaal",
  description: "Free 1-on-1 guidance sessions and mentorship. Send questions via Telegram and get direct answers.",
}

export default function GuidancePage() {
  redirect("/mentorship")
  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">1-on-1 Guidance Sessions</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Free personalized guidance for career development, technical challenges, research direction, or portfolio
              feedback.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Schedule a Session
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What to Discuss */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">What We Can Discuss</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Career Development",
                description:
                  "Navigate the photonics and electronics industry, skill development, and professional growth.",
              },
              {
                title: "Technical Challenges",
                description: "Debug specific technical issues, design problems, or simulation challenges.",
              },
              {
                title: "Research Direction",
                description: "Discuss research ideas, paper topics, experimental design, or publication strategy.",
              },
              {
                title: "Portfolio & Projects",
                description: "Review your work, get feedback on projects, and strengthen your professional profile.",
              },
              {
                title: "Education & Learning",
                description: "Guidance on learning paths, resource recommendations, and skill building.",
              },
              {
                title: "General Mentorship",
                description: "Open-ended mentorship conversations about your goals and aspirations.",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Questions */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Quick Questions?</h2>
          <div className="p-8 rounded-lg border border-border bg-background">
            <p className="text-lg text-foreground mb-6">
              Send your questions directly via Telegram bot and I'll answer them on my Telegram channel. Answers will
              also be posted here for everyone to learn from.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Ask on Telegram
                </Button>
              </a>
              <Link href="#answered-questions">
                <Button size="lg" variant="outline">
                  View Answered Questions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Book a Slot",
                description: "Click schedule below to find an available time that works for you.",
              },
              {
                step: "2",
                title: "Prepare Your Questions",
                description: "Think about what you'd like to discuss - technical, career, or general mentorship.",
              },
              {
                step: "3",
                title: "Have a Conversation",
                description: "Direct 1-on-1 discussion with personalized guidance and insights.",
              },
            ].map((item) => (
              <div key={item.step} className="p-8 rounded-lg border border-border bg-card text-center">
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Book?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Free 1-on-1 sessions available. Schedule your time and bring your questions.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Schedule Your Session
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
