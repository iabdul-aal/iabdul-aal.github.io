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
      <section className="min-h-[80vh] bg-background text-foreground flex items-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-center">
            <div className="space-y-4 max-w-xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
                Integrated Photonics Researcher
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl">
                ECE undergraduate at Alexandria University researching nonlinear optics, quantum photonics, and
                photonic-electronic co-design. Currently at NanoPhoto Lab, A*STAR.
              </p>
              <div className="flex gap-3 pt-3 flex-wrap justify-center">
                <Link href="/about">
                  <Button size="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    View Profile
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="default" variant="outline">
                    Contact Me
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Sections */}
      <section className="py-14 bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold mb-8 text-foreground">Explore My Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Research */}
            <Link href="/ventures" className="group">
              <div className="p-5 rounded-lg border border-border hover:border-accent transition-colors cursor-pointer h-full">
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">
                  Ventures
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Research initiatives and projects translating photonics innovations into practical impact.
                </p>
                <div className="flex items-center text-accent font-medium text-xs">
                  Explore <ArrowRight className="w-3 h-3 ml-2" />
                </div>
              </div>
            </Link>

            {/* Hardware Design */}
            <Link href="/services" className="group">
              <div className="p-5 rounded-lg border border-border hover:border-accent transition-colors cursor-pointer h-full">
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">
                  Hardware Design
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Photonic and electronic design services with portfolio samples and technical expertise.
                </p>
                <div className="flex items-center text-accent font-medium text-xs">
                  View Portfolio <ArrowRight className="w-3 h-3 ml-2" />
                </div>
              </div>
            </Link>

            {/* Resources */}
            <Link href="/materials" className="group">
              <div className="p-5 rounded-lg border border-border hover:border-accent transition-colors cursor-pointer h-full">
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">
                  Resources
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Lecture notes, slides, summaries, roadmaps, and learning materials.
                </p>
                <div className="flex items-center text-accent font-medium text-xs">
                  Browse <ArrowRight className="w-3 h-3 ml-2" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 bg-background border-top border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-foreground">Questions or Collaboration?</h2>
          <p className="text-base text-muted-foreground mb-6">
            Interested in research collaboration, mentorship, or technical discussions? Let's connect.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/mentorship">
              <Button size="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Book Mentorship Session
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="default" variant="outline">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
