import Link from "next/link"
import { ArrowLeft, FileSearch } from "lucide-react"
import { JourneySection } from "@/components/journey-section"

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

  const summaryStats = [
    { label: "Summaries", value: String(summaries.length) },
    { label: "Depth", value: "Compact" },
    { label: "Use Case", value: "Research Workflow" },
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {summaryStats.map((item) => (
            <article key={item.label} className="p-4 rounded-xl border border-border bg-card/40">
              <p className="text-lg font-bold leading-none">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-2">{item.label}</p>
            </article>
          ))}
        </div>

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

      <JourneySection
        title="Continue the Research Workflow"
        description="Move from summaries to practical roadmaps, materials overview, or direct discussion."
        actions={[
          { href: "/materials/roadmaps", label: "Go to Roadmaps" },
          { href: "/materials", label: "Back to Materials", variant: "outline" },
          { href: "/contact", label: "Discuss a Topic", variant: "ghost" },
        ]}
      />
    </main>
  )
}
