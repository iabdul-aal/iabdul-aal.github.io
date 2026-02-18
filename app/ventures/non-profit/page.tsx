import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users } from "lucide-react"

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
        "Led a full chapter restructuring, coordinated volunteers, and organized technical events with industry and academic experts.",
      impact: ["500+ students served", "30 universities reached", "80+ events organized"],
    },
    {
      name: "Education Clinic",
      role: "General Coordinator",
      period: "Aug 2021 - Sep 2023",
      description:
        "Coordinated a volunteer organization focused on broad educational access and upskilling programs across MENA.",
      impact: ["250k+ students reached", "80+ team members", "3 flagship programs"],
    },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link href="/ventures" className="text-accent hover:text-accent/80 mb-4 inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Ventures
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6">Non-Profit Initiatives</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Education and community initiatives aimed at widening access to technical learning and research exposure.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {initiatives.map((initiative) => (
              <article
                key={initiative.name}
                className="p-8 rounded-xl border border-border bg-card hover:border-accent transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 text-accent text-sm mb-2">
                      <Users className="w-4 h-4" />
                      Community Leadership
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">{initiative.name}</h2>
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Interested in Community Collaboration?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Open to programs that connect students and early researchers with practical engineering opportunities.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
