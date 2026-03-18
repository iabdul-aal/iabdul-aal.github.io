import Link from "next/link"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { Button } from "@/components/ui/button"
import { ArrowRight, Atom, Brain, CircuitBoard, Microscope, Sparkles, Waves, Zap } from "lucide-react"
import { HighlightsSlider } from "@/components/highlights-slider"
import { highlights } from "@/lib/highlights"
import { siteConfig } from "@/lib/site-config"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Photonics Research",
  description:
    "Research work of Islam I. Abdulaal across integrated photonics, neuromorphic photonics, quantum photonics, nonlinear photonics, nanophotonics, and computational photonics.",
  path: "/",
})

async function countJsonItems(fileName: string): Promise<number> {
  try {
    const raw = await readFile(join(process.cwd(), fileName), "utf8")
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.length : 0
  } catch {
    return 0
  }
}

export default async function Home() {
  const [publicationCount, talkCount] = await Promise.all([
    countJsonItems("publications.json"),
    countJsonItems("talks.json"),
  ])

  const focusAreas = [
    {
      title: "Integrated Photonics",
      description: "Silicon photonics, waveguide engineering, and scalable on-chip optical systems.",
      icon: CircuitBoard,
    },
    {
      title: "Neuromorphic Photonics",
      description: "Photonic neural networks, optical computing primitives, and brain-inspired processing.",
      icon: Brain,
    },
    {
      title: "Quantum Photonics",
      description: "SPDC architectures, entangled photon-pair sources, and quantum-compatible integrated device design.",
      icon: Atom,
    },
    {
      title: "Nonlinear Photonics",
      description: "Quasi-BIC concepts, nonlinear light-matter interactions, and frequency conversion in integrated platforms.",
      icon: Waves,
    },
    {
      title: "Nanophotonics",
      description: "Sub-wavelength structures, metasurfaces, and nanostructured resonators.",
      icon: Zap,
    },
    {
      title: "Computational Photonics",
      description: "PINN-assisted inverse design and data-driven photonic device modeling.",
      icon: Sparkles,
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    about: {
      "@type": "Person",
      name: "Islam I. Abdulaal",
    },
  }

  const achievementStats = [
    { label: "Publications", value: String(publicationCount) },
    { label: "Public Talks", value: String(talkCount) },
    { label: "Founded Initiatives", value: "4" },
  ]

  return (
    <main className="text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden border-b border-border/70">
        <div className="pointer-events-none absolute inset-0 hero-grid opacity-30" />
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-[80px] animate-slow-float" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-400/15 blur-[80px] animate-slow-float" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs md:text-sm text-muted-foreground animate-fade-up">
              <Microscope className="w-4 h-4 text-accent" />
              Postgraduate Student
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mt-6 animate-fade-up-delay">
              Islam I. Abdulaal
            </h1>

            <p className="text-base md:text-xl text-muted-foreground mt-6 max-w-3xl animate-fade-up-delay-2">
              Photonics researcher working at the intersection of integrated, neuromorphic, quantum, nonlinear, nano-,
              and computational photonics — summarizing current work, publications, and collaboration options.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-2">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/about">View Profile</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="/contact">
                  Contact <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 animate-fade-up-delay-2">
            {achievementStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card/70 p-5 transition-all duration-300 hover:scale-[1.03] hover:border-accent hover:shadow-md hover:shadow-accent/5">
                <p className="text-2xl md:text-3xl font-bold leading-none">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl md:text-4xl">Current Focus</h2>
            <Link href="/about" className="text-sm text-accent hover:text-accent/80 transition-colors">
              See details
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {focusAreas.map((area) => {
              const Icon = area.icon
              return (
                <article
                  key={area.title}
                  className="group rounded-xl border border-border bg-card/75 p-6 hover:border-accent/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                >
                  <Icon className="w-7 h-7 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{area.title}</h3>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="highlights" className="py-16 border-y border-border/70 bg-card/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl md:text-4xl">Recent Highlights</h2>
            <Link href="/about" className="text-sm text-accent hover:text-accent/80 transition-colors">
              View profile
            </Link>
          </div>
          <HighlightsSlider items={highlights} />
        </div>
      </section>

    </main>
  )
}
