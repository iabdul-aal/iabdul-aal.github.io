import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { JourneySection } from "@/components/journey-section"
import { socialLinks } from "@/lib/social-links"

export const metadata = {
  title: "Highlights",
  description:
    "Selected updates from Islam I. Abdulaal's academic work, publications, initiatives, and community activities.",
}

export default function HighlightsPage() {
  const highlights = [
    {
      title: "HW Carnival Student Initiative (USD 10,000 Funding Support)",
      date: "2025",
      category: "Initiative",
      description:
        "Founded HW Carnival, a funded student hardware initiative with public feature coverage.",
      link: socialLinks.hwCarnivalFeature,
    },
    {
      title: "Expansion of Initiative Tracks (Si-Cast, Si-Clash, AlexDuino)",
      date: "Founded in 2025 (currently inactive)",
      category: "Initiatives",
      description:
        "Founded Si-Cast, Si-Clash, and AlexDuino as student-facing technical learning tracks; I am no longer active in daily operations.",
      link: "/ventures",
    },
    {
      title: "SSCS STGA Award",
      date: "2025",
      category: "Award",
      description:
        "Recognized through the SSCS Student Travel Grant Award (STGA) program for chapter and technical engagement.",
      link: socialLinks.linkedin,
    },
    {
      title: "arXiv Preprint Published",
      date: "2025",
      category: "Publication",
      description:
        "Published preprint on terahertz quasi-BIC metasurfaces for biosensing and high-speed wireless communications.",
      link: socialLinks.arxiv,
    },
    {
      title: "Research Internship at NanoPhoto Lab (A*STAR)",
      date: "2025 - Present",
      category: "Research Role",
      description:
        "Contributing to integrated photonics and physics-informed optimization workflows in a research-lab setting.",
      link: socialLinks.nanophoto,
    },
    {
      title: "Egypt Scholars Advanced Labs Program",
      date: "2025",
      category: "Advanced Training",
      description: "Completed intensive research training focused on advanced photonics topics and independent research execution.",
    },
    {
      title: "Research Grant Support",
      date: "2025",
      category: "Funding",
      description: "Co-developed technical work packages that supported a funded research direction in photonic sensing.",
      link: socialLinks.hwCarnivalEvent,
    },
    {
      title: "IEEE Student Chapter Work",
      date: "2025",
      category: "Student Activity",
      description: "Supported student chapter activities and technical community engagement in circuits and systems topics.",
    },
    {
      title: "Public Technical Writing",
      date: "2025",
      category: "Outreach",
      description: "Published educational photonics explainers and technical reflections for broader engineering audiences.",
      link: socialLinks.medium,
    },
  ]

  const summaryStats = [
    { label: "Highlights", value: String(highlights.length) },
    { label: "Latest Year", value: "2025" },
    { label: "Coverage", value: "Research + Initiatives" },
    { label: "Format", value: "Milestone Feed" },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="min-h-[50vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Highlights</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Selected updates from my research, training, and initiative history.
            </p>
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

          <div className="space-y-6">
            {highlights.map((item) => (
              <article key={`${item.title}-${item.date}`} className="p-6 rounded-xl border border-border bg-card">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold mb-3">
                      {item.category}
                    </span>
                    <h2 className="text-xl font-bold">{item.title}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {item.link &&
                  (item.link.startsWith("/") ? (
                    <Link href={item.link} className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80">
                      Open related page <ExternalLink className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                    >
                      View source <ExternalLink className="w-4 h-4" />
                    </a>
                  ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <JourneySection
        title="Go From Highlights to Action"
        description="After reviewing recent milestones, continue to profile details, venture activity, or direct contact."
        actions={[
          { href: "/about", label: "Review Full Profile" },
          { href: "/ventures", label: "Explore Venture Work", variant: "outline" },
          { href: "/contact", label: "Start a Conversation", variant: "ghost" },
        ]}
      />
    </main>
  )
}
