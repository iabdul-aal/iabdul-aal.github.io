import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, ExternalLink } from "lucide-react"

export const metadata = {
  title: "Articles | Islam Abdulaal",
  description: "Published articles and technical writing on Medium about photonics research and hardware innovation.",
}

export default function ArticlesPage() {
  const mediumArticles = [
    {
      title: "Integrated Photonics: Foundations and Applications",
      excerpt:
        "Deep dive into the fundamentals of integrated photonics, key technologies, and real-world applications in communications and computing.",
      date: "2024",
      readTime: "12 min read",
      url: "https://medium.com/",
      featured: true,
    },
    {
      title: "Physics-Informed Neural Networks for Photonic Design",
      excerpt:
        "Exploring how machine learning and physics constraints can accelerate the design of optimal photonic devices.",
      date: "2024",
      readTime: "15 min read",
      url: "https://medium.com/",
      featured: true,
    },
    {
      title: "Quantum Photonics: Building Practical Systems",
      excerpt:
        "Technical overview of integrated quantum photonic devices and their role in quantum computing and quantum networks.",
      date: "2024",
      readTime: "10 min read",
      url: "https://medium.com/",
      featured: true,
    },
  ]

  const featured = mediumArticles.filter((a) => a.featured)
  const recent = mediumArticles.filter((a) => !a.featured)

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Articles</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Technical writing and research reflections published on Medium about integrated photonics and hardware
              innovation.
            </p>
            <a href="https://medium.com/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Read on Medium <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-foreground mb-12">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featured.map((article) => (
                <Link
                  key={article.title}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-8 rounded-lg border border-border bg-card hover:border-accent transition-colors group cursor-pointer"
                >
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-grow">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:text-accent transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      {recent.length > 0 && (
        <section className="py-20 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-foreground mb-12">Latest Articles</h2>
            <div className="space-y-6">
              {recent.map((article) => (
                <Link
                  key={article.title}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-lg border border-border bg-background hover:border-accent transition-colors group cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </div>
                        <span className="text-border">•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Follow for More</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Follow my Medium profile to get notified when new articles are published on photonics research and hardware
            development.
          </p>
          <a href="https://medium.com/" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Follow on Medium
            </Button>
          </a>
        </div>
      </section>
    </main>
  )
}
