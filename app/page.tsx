import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Atom, BookOpenText, CircuitBoard, Handshake, Sparkles } from "lucide-react"

export const metadata = {
  title: "Islam Abdulaal | Integrated Photonics Researcher",
  description:
    "ECE undergraduate researcher specializing in integrated photonics, nonlinear optics, and quantum photonics. Research Intern at NanoPhoto Lab, A*STAR.",
}

export default function Home() {
  const focusAreas = [
    {
      title: "Integrated Photonics Devices",
      description: "Waveguide engineering, silicon photonics, and mode-division multiplexing architectures.",
      icon: CircuitBoard,
    },
    {
      title: "Quantum and Nonlinear Optics",
      description: "SPDC-based sources, quasi-BIC metasurfaces, and quantum-compatible integrated platforms.",
      icon: Atom,
    },
    {
      title: "Physics-Informed AI",
      description: "PINN-driven inverse design and multiphysics optimization for faster photonic development cycles.",
      icon: Sparkles,
    },
  ]

  const sitePaths = [
    {
      title: "About and Publications",
      description: "Biography, research experience, core competencies, and publication record.",
      href: "/about",
      cta: "View Profile",
    },
    {
      title: "Ventures and Initiatives",
      description: "How research outcomes are translated into products, partnerships, and community impact.",
      href: "/ventures",
      cta: "Explore Ventures",
    },
    {
      title: "Learning Materials",
      description: "Slides, roadmaps, and technical summaries for students entering integrated photonics.",
      href: "/materials",
      cta: "Browse Materials",
    },
    {
      title: "Mentorship and Guidance",
      description: "1-on-1 support for research direction, technical planning, and academic growth.",
      href: "/mentorship",
      cta: "Get Mentorship",
    },
  ]

  return (
    <main className="text-foreground">
      <section className="relative overflow-hidden border-b border-border/70">
        <div className="pointer-events-none absolute inset-0 hero-grid opacity-30" />
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl animate-slow-float" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl animate-slow-float" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs md:text-sm text-muted-foreground animate-fade-up">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Integrated Photonics | Quantum Devices | Physics-Informed ML
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mt-6 animate-fade-up-delay">
              Researching and engineering scalable photonic systems.
            </h1>
            <p className="text-base md:text-xl text-muted-foreground mt-6 max-w-3xl animate-fade-up-delay-2">
              I am Islam I. Abdulaal, an Electronics and Communications Engineering undergraduate at Alexandria
              University and Research Intern at NanoPhoto Lab (A*STAR), working at the intersection of integrated
              photonics, nonlinear optics, and device-aware machine learning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-2">
              <Link href="/about">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Explore Research Profile
                </Button>
              </Link>
              <Link href="/ventures">
                <Button size="lg" variant="outline">
                  View Ventures
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="ghost" className="text-accent hover:text-accent-foreground">
                  Start a Conversation <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 animate-fade-up-delay-2">
            {[
              { label: "Research Themes", value: "6+" },
              { label: "Advanced Training", value: "300+ hrs" },
              { label: "Research Grant Secured", value: "USD 15k" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card/70 p-5">
                <p className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl md:text-4xl">Current Focus Areas</h2>
            <Link href="/about" className="text-sm text-accent hover:text-accent/80 transition-colors">
              Full research overview
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-display text-3xl md:text-4xl mb-5">How This Website Is Structured</h2>
              <p className="text-muted-foreground mb-6">
                This website is built as a research-first portfolio: publication context, venture translation, open
                learning resources, and mentorship opportunities.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Discuss Collaboration <Handshake className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {sitePaths.map((path) => (
                <Link
                  key={path.title}
                  href={path.href}
                  className="group block rounded-xl border border-border bg-background/80 p-5 hover:border-accent transition-colors"
                >
                  <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">{path.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
                  <p className="text-xs text-accent mt-4 inline-flex items-center gap-2">
                    {path.cta}
                    <ArrowRight className="w-3 h-3" />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpenText className="w-10 h-10 text-accent mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl mb-4">Open to Research, Mentorship, and Joint Builds</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            If your team is working on integrated photonics, quantum device design, or photonic-electronic
            co-development, I am available for focused collaborations and technical contributions.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/mentorship">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Book Mentorship
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline">
                Review Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="ghost" className="text-accent hover:text-accent-foreground">
                Contact <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
