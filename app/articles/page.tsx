import { Button } from "@/components/ui/button"
import { JourneySection } from "@/components/journey-section"
import { ArrowRight, ExternalLink } from "lucide-react"
import { socialLinks } from "@/lib/social-links"
import { getMediumArticles, type MediumArticle } from "@/lib/medium-feed"

export const metadata = {
  title: "Articles",
  description:
    "Technical writing by Islam I. Abdulaal on integrated photonics, nonlinear quantum photonics, and practical photonics education.",
}

export default async function ArticlesPage() {
  const fallbackArticles: MediumArticle[] = [
    {
      title: "From Fiber to Future: How Fiber Bragg Grating Sensors Are Revolutionizing Biomedical Monitoring",
      excerpt:
        "A practical overview of FBG sensing and why photonic sensors matter for healthcare monitoring applications.",
      url: "https://medium.com/@iabdul-aal/from-fiber-to-future-how-fiber-bragg-grating-sensors-are-revolutionizing-biomedical-monitoring-e46ec94acfed",
      tag: "Biomedical Photonics",
      publishedAt: "2025",
    },
    {
      title: "Nonlinear Optics and Integrated Photonics: Enabling the Next Generation of Optical Technologies",
      excerpt:
        "Explains how nonlinear effects and integrated platforms combine to unlock advanced optical systems.",
      url: "https://medium.com/@iabdul-aal/nonlinear-optics-and-integrated-photonics-enabling-the-next-generation-of-optical-technologies-534f6f6ed667",
      tag: "Nonlinear Optics",
      publishedAt: "2025",
    },
    {
      title: "Integrated Photonics: Powering the Future of Data Centers and Cloud Infrastructure",
      excerpt:
        "A systems-level view of why integrated photonics is central to high-bandwidth cloud and data-center networks.",
      url: "https://medium.com/@iabdul-aal/integrated-photonics-powering-the-future-of-data-centers-and-cloud-infrastructure-3f47abbe9973",
      tag: "Data Center Photonics",
      publishedAt: "2025",
    },
    {
      title: "Why Photonics Is Important?",
      excerpt: "An accessible primer on photonics impact across communications, sensing, and future technologies.",
      url: "https://medium.com/@iabdul-aal/why-photonics-is-important-aec1bb7f8d65",
      tag: "Photonics Education",
      publishedAt: "2025",
    },
  ]

  const rssArticles = await getMediumArticles(8)
  const articles = rssArticles.length > 0 ? rssArticles : fallbackArticles
  const usingLiveFeed = rssArticles.length > 0
  const summaryStats = [
    { label: "Articles", value: String(articles.length) },
    { label: "Source", value: usingLiveFeed ? "Live RSS" : "Fallback" },
    { label: "Primary Topic", value: "Integrated Photonics" },
    { label: "Format", value: "Technical Explainers" },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="min-h-[55vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Articles and Writing</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Auto-updating publications from Medium, focused on integrated photonics, nonlinear quantum photonics, and
              practical research communication.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={socialLinks.medium} target="_blank" rel="noopener noreferrer">
                Visit Medium Profile <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
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

          <div className="mb-12">
            <h2 className="text-4xl font-bold">Latest Articles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <a
                key={article.title}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-8 rounded-xl border border-border bg-card hover:border-accent transition-colors group"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold mb-4 w-fit">
                  {article.tag}
                </span>
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{article.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-grow">{article.excerpt}</p>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-accent inline-flex items-center gap-2">
                    Read article <ArrowRight className="w-4 h-4" />
                  </span>
                  <span className="text-xs text-muted-foreground">{article.publishedAt}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Follow New Publications</h2>
          <p className="text-lg text-muted-foreground mb-8">
            New explainers and research-oriented articles are published on Medium.
          </p>
          <Button asChild size="lg">
            <a href={socialLinks.medium} target="_blank" rel="noopener noreferrer">
              Follow on Medium
            </a>
          </Button>
        </div>
      </section>

      <JourneySection
        title="Continue Through the Knowledge Track"
        description="After reading articles, move to structured materials, workshops, or direct discussion."
        actions={[
          { href: "/materials", label: "Open Materials" },
          { href: "/talks", label: "Browse Talks", variant: "outline" },
          { href: "/contact", label: "Discuss a Topic", variant: "ghost" },
        ]}
      />
    </main>
  )
}
