import { ExternalLink } from "lucide-react"
import { socialLinks } from "@/lib/social-links"

export const metadata = {
  title: "Highlights",
  description:
    "Selected highlights from Islam I. Abdulaal's research journey, publications, programs, and community leadership.",
}

export default function HighlightsPage() {
  const highlights = [
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
    },
    {
      title: "IEEE Student Leadership",
      date: "2025",
      category: "Leadership",
      description: "Led student chapter activities and technical community engagement in circuits and systems topics.",
    },
    {
      title: "Public Technical Writing",
      date: "2025",
      category: "Outreach",
      description: "Published educational photonics explainers and technical reflections for broader engineering audiences.",
      link: socialLinks.medium,
    },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="min-h-[50vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Highlights</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Major updates across research progress, publication activity, and technical community work.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                  >
                    View source <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
