import Link from "next/link"
import { ArrowLeft, FileSearch } from "lucide-react"

export const metadata = {
  title: "Summaries | Materials | Islam Abdulaal",
}

export default function SummariesPage() {
  const summaries = [
    {
      title: "Waveguide Design Heuristics",
      summary: "Practical rules of thumb for geometry choices, confinement, and loss trade-offs.",
      type: "Design Note",
    },
    {
      title: "PINNs in Photonic Inverse Design",
      summary: "Method-level summary on where PINNs help and where classical optimization still dominates.",
      type: "Method Brief",
    },
    {
      title: "Reading Strategy for Photonics Papers",
      summary: "A structured approach to extract assumptions, methods, and reusable insight from literature.",
      type: "Research Workflow",
    },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/materials" className="text-accent hover:text-accent/80 mb-4 inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Materials
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Technical Summaries</h1>
        <p className="text-muted-foreground max-w-2xl mb-10">
          Compact write-ups that convert dense technical material into clear, reusable insight.
        </p>

        <div className="space-y-5">
          {summaries.map((item) => (
            <article key={item.title} className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between gap-3 mb-2">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">{item.type}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <FileSearch className="w-4 h-4 text-accent mt-0.5" />
                <p>{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
