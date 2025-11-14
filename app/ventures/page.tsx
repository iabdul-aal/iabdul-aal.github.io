import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Ventures | Islam Abdulaal",
  description: "Startups and initiatives in photonics and hardware innovation.",
}

export default function VenturesPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Ventures</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Startups and initiatives translating research into practical impact.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Collaborate <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Initiatives */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Initiatives</h2>
              <div className="p-8 rounded-lg border border-border bg-card text-center">
                <p className="text-muted-foreground text-lg">Coming soon...</p>
              </div>
            </div>

            {/* Startups */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Startup</h2>
              <div className="p-8 rounded-lg border border-border bg-card text-center">
                <p className="text-muted-foreground text-lg">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Interested in Collaboration?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Open to partnerships and technical discussions in photonics innovation.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
