import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

export const metadata = {
  title: "Materials | Islam Abdulaal",
  description: "Lecture notes, slides, summaries, and learning roadmaps on integrated photonics.",
}

export default function MaterialsPage() {
  const resources = [
    {
      id: 1,
      title: "Integrated Photonics Fundamentals",
      description:
        "Comprehensive lecture notes covering foundational concepts in photonics, optical principles, and device basics.",
      type: "Lecture Notes",
      category: "Slides",
      topics: ["Photonics Basics", "Optical Principles", "Device Fundamentals"],
      featured: true,
    },
    {
      id: 2,
      title: "Photonics for Beginners Roadmap",
      description:
        "Step-by-step learning roadmap designed to take you from zero knowledge to proficient in integrated photonics.",
      type: "Learning Roadmap",
      category: "Roadmaps",
      topics: ["Getting Started", "Linear Pathway", "Best Practices"],
      featured: true,
    },
    {
      id: 3,
      title: "Silicon Photonics Design Guide",
      description: "Technical guide covering waveguide design, mode analysis, coupling, and simulation best practices.",
      type: "Technical Guide",
      category: "Summaries",
      topics: ["Waveguides", "Simulation", "Lumerical"],
      featured: true,
    },
    {
      id: 4,
      title: "Quantum Photonics Primer",
      description:
        "Introduction to quantum photonic systems, quantum gates, and integrated quantum circuits for researchers.",
      type: "Technical Primer",
      category: "Slides",
      topics: ["Quantum Photonics", "Quantum Gates", "Theory"],
      featured: false,
    },
    {
      id: 5,
      title: "Nonlinear Optics Fundamentals",
      description:
        "Detailed lecture notes on nonlinear optical effects, their applications, and computational approaches.",
      type: "Lecture Notes",
      category: "Summaries",
      topics: ["Nonlinear Optics", "Theory", "Simulations"],
      featured: false,
    },
    {
      id: 6,
      title: "Data Center Optics Overview",
      description:
        "Technical overview of optical technologies used in modern data center interconnects and communications.",
      type: "Technical Guide",
      category: "Roadmaps",
      topics: ["Data Centers", "Communications", "MDM"],
      featured: false,
    },
  ]

  const featured = resources.filter((r) => r.featured)
  const additional = resources.filter((r) => !r.featured)

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Materials</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Lecture notes, slides, summaries, and roadmaps for learning integrated photonics.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((resource) => (
              <div
                key={resource.id}
                className="p-8 rounded-lg border border-border bg-card hover:border-accent transition-colors flex flex-col"
              >
                <div className="mb-4">
                  <FileText className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{resource.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-grow">{resource.description}</p>
                <div className="mb-6 pt-6 border-t border-border">
                  <p className="text-accent text-sm font-semibold mb-2">{resource.type}</p>
                  <p className="text-muted-foreground text-xs mb-3">{resource.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {resource.topics.map((topic) => (
                      <span key={topic} className="px-2 py-1 rounded text-xs bg-background text-muted-foreground">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Access Resource
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additional.map((resource) => (
              <div
                key={resource.id}
                className="p-6 rounded-lg border border-border bg-background hover:border-accent transition-colors flex items-start gap-4"
              >
                <FileText className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-foreground mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{resource.description}</p>
                  <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-border">
                    <div>
                      <p className="text-xs text-accent font-semibold">{resource.type}</p>
                      <p className="text-xs text-muted-foreground">{resource.category}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Need Custom Learning Materials?</h2>
          <p className="text-lg text-muted-foreground mb-8">Reach out if you need specific educational content.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Request Materials
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
