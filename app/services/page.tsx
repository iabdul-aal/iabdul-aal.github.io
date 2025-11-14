import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

export const metadata = {
  title: "Hardware Design Services | Islam Abdulaal",
  description: "Custom hardware design services for photonic and electronic systems with portfolio samples.",
}

export default function PortfolioPage() {
  const designPackages = [
    {
      title: "Custom Photonic Design",
      description: "Design and simulation of integrated photonic devices",
      features: [
        "Waveguide design and optimization",
        "Mode analysis and coupling",
        "Lumerical FDTD simulations",
        "Performance specifications",
        "Design documentation",
      ],
    },
    {
      title: "Electronic Circuit Design",
      description: "ASIC and circuit design for control and readout",
      features: [
        "Analog IC design",
        "Mixed-signal systems",
        "PCB layout planning",
        "Simulation and verification",
        "Technical documentation",
      ],
    },
    {
      title: "System Integration",
      description: "End-to-end photonic-electronic system design",
      features: [
        "Photonic subsystem design",
        "Electronics integration",
        "Packaging considerations",
        "Performance analysis",
        "Design trade-off studies",
      ],
    },
  ]

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Hardware Design Services</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Custom photonic and electronic system design with technical portfolio samples.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Start a Project <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Design Packages */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">Design Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {designPackages.map((pkg) => (
              <div
                key={pkg.title}
                className="p-8 rounded-lg border border-border bg-card hover:border-accent transition-colors"
              >
                <h3 className="text-xl font-bold text-foreground mb-3">{pkg.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{pkg.description}</p>
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Samples */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">Project Samples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-lg border border-border bg-background">
              <h3 className="text-2xl font-bold text-foreground mb-4">Multi-Parameter Vital Monitoring Sensor</h3>
              <p className="text-muted-foreground mb-6">
                FBG-based photonic sensor for respiratory disease detection (asthma, COPD). Includes Lumerical
                simulations, MATLAB modeling, and system design.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-background text-muted-foreground text-xs">Fiber Optics</span>
                <span className="px-3 py-1 rounded-full bg-background text-muted-foreground text-xs">Biomedical</span>
                <span className="px-3 py-1 rounded-full bg-background text-muted-foreground text-xs">Simulation</span>
              </div>
            </div>

            <div className="p-8 rounded-lg border border-border bg-background">
              <h3 className="text-2xl font-bold text-foreground mb-4">Silicon Photonic Transceiver</h3>
              <p className="text-muted-foreground mb-6">
                400 Gb/s integrated silicon transceiver with mode division multiplexing (MDM) for intra-data center
                communications. Full system design and simulation.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-background text-muted-foreground text-xs">
                  Silicon Photonics
                </span>
                <span className="px-3 py-1 rounded-full bg-background text-muted-foreground text-xs">Transceivers</span>
                <span className="px-3 py-1 rounded-full bg-background text-muted-foreground text-xs">MDM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Start a Design Project?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Discuss your hardware design needs and project specifications.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Contact for Design Work
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
