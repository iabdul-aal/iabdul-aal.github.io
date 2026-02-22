import { PageHero } from "@/components/page-hero"
import { ArticlesStack } from "@/components/articles-stack"
import { socialLinks } from "@/lib/social-links"
import { getMediumArticles, type MediumArticle } from "@/lib/medium-feed"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Articles",
  description:
    "Writing by Islam I. Abdulaal across photonics, engineering execution, entrepreneurship, and practical life wisdom.",
  path: "/articles",
})

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

  return (
    <main className="bg-background text-foreground">
      <PageHero
        kicker="Articles"
        title="Articles and Writing"
        description="I write about research, engineering execution, entrepreneurship, and practical lessons from real projects."
        actions={[
          { label: "Visit Medium", href: socialLinks.medium, external: true },
          { label: "Open Materials", href: "/materials", variant: "outline" },
        ]}
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold">Article Stack</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Use search and filters at the top, then browse full-width article blocks below.
            </p>
          </div>

          <ArticlesStack articles={articles} />
        </div>
      </section>
    </main>
  )
}
