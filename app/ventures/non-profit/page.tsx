import Image from "next/image"
import { PageHero } from "@/components/page-hero"
import { Users } from "lucide-react"

export const metadata = {
  title: "Community Initiatives",
  description: "Community and non-profit initiatives focused on technical education access and student support.",
}

const ACCENT_LOGO_FILTER =
  "brightness(0) saturate(100%) invert(68%) sepia(18%) saturate(744%) hue-rotate(352deg) brightness(94%) contrast(89%)"

export default function NonProfitPage() {
  const initiatives = [
    {
      name: "IEEE SSCS Student Chapter",
      role: "Chapter Chair",
      period: "Feb 2025 - Oct 2025",
      description:
        "Supported chapter restructuring, coordinated volunteers, and helped organize technical events with industry and academic experts.",
      impact: ["500+ students served", "30 universities reached", "80+ events organized"],
      logoPath: "/logos/platforms/SSCS AUSC.png",
    },
    {
      name: "Education Clinic",
      role: "General Coordinator",
      period: "Aug 2021 - Sep 2023",
      description:
        "Coordinated a volunteer organization focused on educational access and upskilling programs across MENA.",
      impact: ["250k+ students reached", "80+ team members", "3 core programs"],
      logoPath: "/logos/platforms/Education Clinic.png",
    },
  ]

  return (
    <main className="bg-background text-foreground">
      <PageHero
        kicker="Ventures"
        title="Community and Non-Profit Initiatives"
        description="Founding and chapter roles focused on student development, technical education access, and community capacity building."
        actions={[
          { label: "Back to Ventures", href: "/ventures", variant: "outline" },
          { label: "Discuss Collaboration", href: "/contact", variant: "ghost" },
        ]}
      />

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
                    {initiative.logoPath && (
                      <span className="mb-3 inline-flex h-11 min-w-24 items-center justify-center rounded-md border border-border/70 bg-background/60 px-3">
                        <Image
                          src={initiative.logoPath}
                          alt={`${initiative.name} logo`}
                          width={112}
                          height={32}
                          className="max-h-full w-auto object-contain"
                          style={{ filter: ACCENT_LOGO_FILTER }}
                        />
                      </span>
                    )}
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
    </main>
  )
}
