import Link from "next/link"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { Button } from "@/components/ui/button"
import { ArrowRight, Atom, CircuitBoard, Microscope, Sparkles } from "lucide-react"
import { HighlightsSlider } from "@/components/highlights-slider"
import { highlights } from "@/lib/highlights"
import { siteConfig } from "@/lib/site-config"

export const metadata = {
  title: "Integrated Photonics and Research Work",
  description:
    "Current research work of Islam I. Abdulaal across integrated photonics, nonlinear photonics, and physics-informed design.",
}

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
      description: "Silicon photonics, waveguide engineering, and mode-division multiplexing systems.",
      icon: CircuitBoard,
    },
    {
      title: "Nonlinear Quantum Photonics",
      description: "SPDC-oriented architectures, quasi-BIC concepts, and quantum-compatible device design.",
      icon: Atom,
    },
    {
      title: "Physics-Informed Design",
      description: "PINN-assisted inverse design and multiphysics optimization for photonic components.",
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
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl animate-slow-float" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl animate-slow-float" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs md:text-sm text-muted-foreground animate-fade-up">
              <Microscope className="w-4 h-4 text-accent" />
              ECE Undergraduate | Research Intern | Alexandria University
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mt-6 animate-fade-up-delay">
              Islam I. Abdulaal
            </h1>

            <p className="text-base md:text-xl text-muted-foreground mt-6 max-w-3xl animate-fade-up-delay-2">
              I work on integrated photonics and research-focused engineering workflows. This website summarizes my
              current work, public outputs, and collaboration options.
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
              <div key={stat.label} className="rounded-xl border border-border bg-card/70 p-5">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {focusAreas.map((area) => {
              const Icon = area.icon
              return (
                <article
                  key={area.title}
                  className="rounded-xl border border-border bg-card/75 p-6 hover:border-accent transition-colors"
                >
                  <Icon className="w-7 h-7 text-accent mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{area.title}</h3>
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
