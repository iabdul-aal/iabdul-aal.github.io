import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Atom, BookOpenText, CircuitBoard, Microscope, Sparkles } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { socialLinks } from "@/lib/social-links"

export const metadata = {
  title: "Integrated Photonics Research Portfolio",
  description:
    "Islam I. Abdulaal's portfolio in integrated photonics, quantum and nonlinear optics, physics-informed photonic design, and research mentorship.",
}

export default function Home() {
  const focusAreas = [
    {
      title: "Integrated Photonics",
      description: "Silicon photonics, waveguide engineering, and mode-division multiplexing systems.",
      icon: CircuitBoard,
    },
    {
      title: "Quantum and Nonlinear Optics",
      description: "SPDC-oriented architectures, quasi-BIC concepts, and quantum-compatible device design.",
      icon: Atom,
    },
    {
      title: "Physics-Informed Design",
      description: "PINN-assisted inverse design and multiphysics optimization for photonic components.",
      icon: Sparkles,
    },
  ]

  const highlights = [
    {
      title: "arXiv Preprint",
      description:
        "Terahertz quasi-BIC metasurfaces for biosensing and high-speed wireless communication applications.",
      href: socialLinks.arxiv,
      cta: "Read preprint",
    },
    {
      title: "NanoPhoto Lab Profile",
      description:
        "Current work stream includes integrated quantum photonics optimization and photonic design research.",
      href: socialLinks.nanophoto,
      cta: "View profile",
    },
    {
      title: "Medium Technical Writing",
      description: "Public educational writing on photonics fundamentals and emerging photonic technologies.",
      href: socialLinks.medium,
      cta: "Read articles",
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
              Integrated Photonics Researcher | Alexandria University | NanoPhoto Lab (A*STAR)
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mt-6 animate-fade-up-delay">
              Islam I. Abdulaal
            </h1>

            <p className="text-base md:text-xl text-muted-foreground mt-6 max-w-3xl animate-fade-up-delay-2">
              I work on integrated photonics, quantum and nonlinear optics, and physics-informed design workflows for
              photonic devices. This website presents my research track, publications, writing, and collaboration
              channels.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-2">
              <Link href="/about">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  View Research Profile
                </Button>
              </Link>
              <Link href="/news">
                <Button size="lg" variant="outline">
                  Key Highlights
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="ghost" className="text-accent hover:text-accent-foreground">
                  Contact <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 animate-fade-up-delay-2">
            {[
              { label: "Current Focus", value: "Integrated + Quantum Photonics" },
              { label: "Current Affiliation", value: "NanoPhoto Lab, A*STAR" },
              { label: "Academic Home", value: "Alexandria University" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card/70 p-5">
                <p className="text-sm font-semibold text-accent">{stat.label}</p>
                <p className="text-sm md:text-base text-foreground mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl md:text-4xl">Research Focus Areas</h2>
            <Link href="/about" className="text-sm text-accent hover:text-accent/80 transition-colors">
              Explore full background
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

      <section className="py-16 border-y border-border/70 bg-card/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl mb-8">Verified Public Footprint</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {highlights.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-border bg-background/80 p-6 hover:border-accent transition-colors"
              >
                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                <p className="text-xs text-accent mt-4 inline-flex items-center gap-2">
                  {item.cta}
                  <ArrowRight className="w-3 h-3" />
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpenText className="w-10 h-10 text-accent mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl mb-4">Open to Research Collaboration and Mentorship</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            I welcome collaborations in photonic device design, research engineering, and educational initiatives for
            students entering integrated photonics.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/services">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Research Services
              </Button>
            </Link>
            <Link href="/mentorship">
              <Button size="lg" variant="outline">
                Mentorship
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="ghost" className="text-accent hover:text-accent-foreground">
                Get in touch <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
