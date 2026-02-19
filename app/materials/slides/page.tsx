import Link from "next/link"
import { ArrowLeft, Presentation } from "lucide-react"
import { JourneySection } from "@/components/journey-section"

export const metadata = {
  title: "Slides | Materials | Islam Abdulaal",
}

export default function SlidesPage() {
  const slideDecks = [
    {
      title: "Integrated Photonics Foundations",
      summary: "A visual-first introduction to waveguides, modes, coupling, and PIC building blocks.",
      audience: "Beginner-friendly",
    },
    {
      title: "Silicon Photonics for Data Communications",
      summary: "System context and design considerations for high-speed intra-data-center links.",
      audience: "Intermediate",
    },
    {
      title: "Nonlinear and Quantum Photonics Primer",
      summary: "Core nonlinear processes with emphasis on practical device implications.",
      audience: "Intermediate to advanced",
    },
  ]

  const summaryStats = [
    { label: "Decks", value: String(slideDecks.length) },
    { label: "Format", value: "Visual-first" },
    { label: "Audience", value: "Beginner to Advanced" },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/materials" className="text-accent hover:text-accent/80 mb-4 inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Materials
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Presentation Slides</h1>
        <p className="text-muted-foreground max-w-2xl mb-10">
          Short, structured decks designed for quick learning and workshop delivery.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {summaryStats.map((item) => (
            <article key={item.label} className="p-4 rounded-xl border border-border bg-card/40">
              <p className="text-lg font-bold leading-none">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-2">{item.label}</p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slideDecks.map((deck) => (
            <article key={deck.title} className="p-6 rounded-xl border border-border bg-card">
              <Presentation className="w-6 h-6 text-accent mb-4" />
              <h2 className="text-lg font-semibold mb-2">{deck.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{deck.summary}</p>
              <p className="text-xs text-accent">{deck.audience}</p>
            </article>
          ))}
        </div>
      </section>

      <JourneySection
        title="After Slides, What Next?"
        description="Continue with detailed summaries, roadmaps, or direct mentorship support."
        actions={[
          { href: "/materials/summaries", label: "Read Summaries" },
          { href: "/materials/roadmaps", label: "View Roadmaps", variant: "outline" },
          { href: "/mentorship", label: "Request Mentorship", variant: "ghost" },
        ]}
      />
    </main>
  )
}
