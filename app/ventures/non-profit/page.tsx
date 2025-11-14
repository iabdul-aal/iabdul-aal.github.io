import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Non-Profit Initiatives | Ventures | Islam Abdulaal",
  description: "Non-profit initiatives and social impact projects.",
}

export default function NonProfitPage() {
  const initiatives = [
    {
      name: "IEEE SSCS Student Chapter",
      role: "Chapter Chair",
      period: "Feb 2025 - Oct 2025",
      description:
        "Led restructuring of IEEE Solid-State Circuits Society student chapter. Managed 200+ volunteers, organized 80+ technical events with 35+ industry/academic experts. Established partnerships with government entities and semiconductor companies.",
      impact: ["500+ students served", "30 universities reached", "80+ events organized"],
    },
    {
      name: "Education Clinic",
      role: "General Coordinator",
      period: "Aug 2021 - Sep 2023",
      description:
        "Led volunteer organization serving 250,000+ students across MENA region. Developed and launched 3 major programs spanning academic support and technical skill development. Organized webinars featuring faculty from top-100 universities.",
      impact: ["250k+ students", "80+ members", "3 major programs"],
    },
  ]

  return (
    <main className="bg-background text-foreground">
      {/* Header */}
      <section className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link href="/ventures" className="text-accent hover:text-accent/80 mb-4 inline-block">
            ← Back to Ventures
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6">Non-Profit Initiatives</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Impact-driven initiatives in education and community engagement.
          </p>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {initiatives.map((initiative, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg border border-border bg-card hover:border-accent transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{initiative.name}</h3>
                    <p className="text-accent font-semibold mb-2">{initiative.role}</p>
                    <p className="text-muted-foreground text-sm">{initiative.period}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{initiative.description}</p>

                <div className="flex flex-wrap gap-2">
                  {initiative.impact.map((item) => (
                    <span key={item} className="px-3 py-1 rounded-full bg-background text-muted-foreground text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Interested in Impact?</h2>
          <p className="text-lg text-muted-foreground mb-8">Open to collaborating on community-driven initiatives.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
