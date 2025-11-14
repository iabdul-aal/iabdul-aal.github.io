import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Islam Abdulaal | Integrated Photonics Researcher",
  description:
    "ECE undergraduate researcher specializing in integrated photonics, nonlinear optics, and quantum photonics. Research Intern at NanoPhoto Lab, A*STAR.",
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen bg-background text-foreground flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
                Integrated Photonics Researcher
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-lg">
                ECE undergraduate at Alexandria University researching nonlinear optics, quantum photonics, and
                photonic-electronic co-design. Currently at NanoPhoto Lab, A*STAR.
              </p>
              <div className="flex gap-4 pt-4 flex-wrap">
                <Link href="/about">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    View Profile
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Me
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="aspect-square bg-card rounded-lg border border-border flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="text-6xl mb-4">🔬</div>
                  <p>Research in Progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Sections */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-foreground">Explore My Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Research */}
            <Link href="/ventures" className="group">
              <div className="p-6 rounded-lg border border-border hover:border-accent transition-colors cursor-pointer h-full">
                <h3 className="text-2xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors">
                  Ventures
                </h3>
                <p className="text-muted-foreground mb-4">
                  Research initiatives and projects translating photonics innovations into practical impact.
                </p>
                <div className="flex items-center text-accent font-medium text-sm">
                  Explore <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>

            {/* Hardware Design */}
            <Link href="/services" className="group">
              <div className="p-6 rounded-lg border border-border hover:border-accent transition-colors cursor-pointer h-full">
                <h3 className="text-2xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors">
                  Hardware Design
                </h3>
                <p className="text-muted-foreground mb-4">
                  Photonic and electronic design services with portfolio samples and technical expertise.
                </p>
                <div className="flex items-center text-accent font-medium text-sm">
                  View Portfolio <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>

            {/* Resources */}
            <Link href="/materials" className="group">
              <div className="p-6 rounded-lg border border-border hover:border-accent transition-colors cursor-pointer h-full">
                <h3 className="text-2xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors">
                  Resources
                </h3>
                <p className="text-muted-foreground mb-4">
                  Lecture notes, slides, summaries, roadmaps, and learning materials.
                </p>
                <div className="flex items-center text-accent font-medium text-sm">
                  Browse <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">Questions or Collaboration?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Interested in research collaboration, mentorship, or technical discussions? Let's connect.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/mentorship">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Book Mentorship Session
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
