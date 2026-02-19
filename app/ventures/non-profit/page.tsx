import Link from "next/link"
import { JourneySection } from "@/components/journey-section"
import { ArrowLeft, Users } from "lucide-react"

export const metadata = {
  title: "Community Initiatives",
  description: "Founded community and non-profit initiatives focused on technical education access and student support.",
}

export default function NonProfitPage() {
  const initiatives = [
    {
      name: "IEEE SSCS Student Chapter",
      role: "Former Chapter Chair",
      period: "Feb 2025 - Oct 2025",
      description:
        "Supported chapter restructuring, coordinated volunteers, and helped organize technical events with industry and academic experts.",
      impact: ["500+ students served", "30 universities reached", "80+ events organized"],
    },
    {
      name: "HW Carnival Technical Day",
      role: "Founder (Former Program Lead)",
      period: "Dec 25, 2025",
      description:
        "Founded the initiative and helped deliver competition finals and technical activities at Bibliotheca Alexandrina.",
      impact: ["AlexDuino track", "Si-Clash track", "Si-Cast track"],
    },
    {
      name: "Education Clinic",
      role: "Founder and Former General Coordinator",
      period: "Aug 2021 - Sep 2023",
      description:
        "Founded and coordinated a volunteer organization focused on educational access and upskilling programs across MENA.",
      impact: ["250k+ students reached", "80+ team members", "3 core programs"],
    },
  ]

  const summaryStats = [
    { label: "Founded Initiatives", value: String(initiatives.length) },
    { label: "Focus", value: "Community Impact" },
    { label: "Mode", value: "Founder | Not currently active" },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link href="/ventures" className="text-accent hover:text-accent/80 mb-4 inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Ventures
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">Non-Profit Initiatives</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            I founded these initiatives to widen access to technical learning, research exposure, and engineering mentorship.
            I am currently not active in operating these programs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {summaryStats.map((item) => (
            <article key={item.label} className="p-4 rounded-xl border border-border bg-card/40">
              <p className="text-lg font-bold leading-none">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-2">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {initiatives.map((initiative) => (
              <article
                key={initiative.name}
                className="p-6 md:p-8 rounded-xl border border-border bg-card hover:border-accent transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 text-accent text-sm mb-2">
                      <Users className="w-4 h-4" />
                      Community Work
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

      <JourneySection
        title="Continue From Community Impact"
        description="You can review the full ventures map, startup track, or open a direct collaboration discussion."
        actions={[
          { href: "/ventures", label: "Back to Ventures" },
          { href: "/ventures/startups", label: "See Startup Track", variant: "outline" },
          { href: "/contact", label: "Discuss Collaboration", variant: "ghost" },
        ]}
      />
    </main>
  )
}
