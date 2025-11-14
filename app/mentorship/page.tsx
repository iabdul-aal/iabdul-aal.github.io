import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export const metadata = {
  title: "Mentorship | Islam Abdulaal",
  description: "One-on-one mentorship sessions and technical guidance. Ask questions via Telegram bot.",
}

export default function MentorshipPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Mentorship</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Free one-on-one mentorship sessions and technical guidance in integrated photonics, hardware design, and
              research methodology.
            </p>
          </div>
        </div>
      </section>

      {/* Mentorship Sessions */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">1-on-1 Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Research Guidance",
                description: "Discuss research methodology, literature review, and problem-solving approaches.",
              },
              {
                title: "Technical Mentoring",
                description: "Get guidance on photonics design, simulation tools, and technical challenges.",
              },
              {
                title: "Career Development",
                description: "Explore career paths in research, industry, and entrepreneurship.",
              },
              {
                title: "Project Collaboration",
                description: "Collaborate on research projects and technical initiatives.",
              },
            ].map((session, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg border border-border bg-card hover:border-accent transition-colors"
              >
                <h3 className="text-xl font-bold text-foreground mb-3">{session.title}</h3>
                <p className="text-muted-foreground mb-6">{session.description}</p>
                <span className="text-accent font-semibold">Free • By appointment</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Q&A via Telegram */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Q&A Community</h2>
            <p className="text-lg text-muted-foreground">
              Have quick questions? Ask via our Telegram bot and get answers posted on the community channel.
            </p>
          </div>

          <div className="p-8 rounded-lg border border-border bg-background">
            <div className="flex items-center justify-center gap-4 mb-6">
              <MessageCircle className="w-8 h-8 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Telegram Q&A Bot</h3>
            </div>
            <p className="text-center text-muted-foreground mb-6">
              Submit your questions through our Telegram bot. Selected questions and answers will be featured on the
              community channel and featured on this website.
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://t.me/islambotQA" target="_blank" rel="noopener noreferrer">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Ask a Question</Button>
              </a>
              <a href="https://t.me/islamchannel" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Join Community</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">How to Get Started</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Book a Session",
                description: "Reach out via email or contact form to schedule a 1-on-1 mentorship session.",
              },
              {
                step: 2,
                title: "Ask Questions",
                description: "Send quick questions via our Telegram bot for community Q&A.",
              },
              {
                step: 3,
                title: "Get Answers",
                description: "Receive guidance in mentorship sessions or see answers on our community channel.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 p-6 rounded-lg border border-border bg-card">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether it's a one-on-one session or a quick question, I'm here to help.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Book a Session
              </Button>
            </Link>
            <a href="https://t.me/islambotQA" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">
                Ask via Telegram
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
