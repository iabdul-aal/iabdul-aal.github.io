import Image from "next/image"
import Link from "next/link"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SocialProfileGrid } from "@/components/social-profile-links"
import { Publications } from "@/components/publications"
import { personConfig } from "@/lib/site-config"
import { contactInfo, socialLinks } from "@/lib/social-links"

export const metadata = {
  title: "About",
  description:
    "Background, research direction, affiliations, publications, initiatives, and technical competencies of Islam I. Abdulaal.",
}

export default function AboutPage() {
  const publications = [
    {
      title: "Terahertz quasi-BIC metasurfaces for ultra-sensitive biosensing and high-speed wireless communications",
      arxiv: "2510.00357",
      status: "arXiv preprint, 2025",
      url: socialLinks.arxiv,
    },
    {
      title: "Physics-informed SPDC inverse design for integrated quantum photonics",
      status: "In preparation",
    },
    {
      title: "Physics-informed multiphysics workflows for photonic forward and inverse modeling",
      status: "In preparation",
    },
  ]

  const focusAreas = [
    {
      title: "Integrated Photonics",
      desc: "Silicon photonics, waveguide engineering, and PIC-level system design.",
    },
    {
      title: "Nonlinear Quantum Photonics",
      desc: "SPDC-oriented architectures and nonlinear effects for quantum-compatible platforms.",
    },
    {
      title: "Physics-Informed Design",
      desc: "PINN-assisted inverse design and multiphysics-aware optimization.",
    },
  ]

  const experience = [
    {
      role: "Research Intern",
      org: "NanoPhoto Lab, IMRE, A*STAR",
      period: "Sep 2025 - Present",
      summary: "Working on optimization and integrated quantum photonics design workflows.",
    },
    {
      role: "Research Intern",
      org: "Egypt Scholars Advanced Labs Program",
      period: "Jul 2025 - Sep 2025",
      summary: "Completed intensive research training in quantum photonics and independent problem execution.",
    },
    {
      role: "Undergraduate Researcher",
      org: "OPST Group, Alexandria University",
      period: "Jul 2023 - Aug 2025",
      summary: "Worked on FBG-based sensing and photonic modeling for biomedical and communications use cases.",
    },
  ]

  const highlights = [
    {
      title: "HW Carnival",
      detail:
        "Led a funded technical initiative (approximately USD 10,000) with a technical day at Bibliotheca Alexandrina on December 25, 2025.",
      links: [
        { label: "Feature", href: socialLinks.hwCarnivalFeature },
        { label: "Event", href: socialLinks.hwCarnivalEvent },
      ],
    },
    {
      title: "SSCS STGA Award",
      detail: "Recognized by IEEE SSCS for chapter leadership and technical contribution.",
      links: [{ label: "LinkedIn", href: socialLinks.linkedin }],
    },
    {
      title: "Initiatives",
      detail: "Built and supported Si-Cast, Si-Clash, and AlexDuino tracks for practical engineering training.",
      links: [{ label: "Ventures", href: "/ventures" }],
    },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative w-full max-w-[300px] aspect-square bg-card rounded-xl border border-border overflow-hidden mb-6">
                <Image
                  src="/personal-pic.png"
                  alt="Islam I. Abdulaal"
                  fill
                  sizes="(max-width: 1024px) 300px, 320px"
                  className="object-cover"
                />
              </div>
              <h1 className="text-3xl font-bold mb-2">{personConfig.name}</h1>
              <p className="text-accent font-semibold mb-2">{personConfig.role}</p>
              <p className="text-sm text-muted-foreground mb-4">
                {personConfig.location} | {personConfig.affiliation}
              </p>
              <a
                href={socialLinks.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:text-accent/80 transition-colors"
              >
                ORCID: {personConfig.orcid}
              </a>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/contact">Contact</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="/cv.pdf" download>
                    <Download className="w-4 h-4 mr-2" />
                    CV
                  </a>
                </Button>
              </div>
              <div className="mt-5 text-sm text-muted-foreground space-y-2">
                <p>
                  IEEE Email:{" "}
                  <a href={`mailto:${socialLinks.email}`} className="text-accent hover:text-accent/80">
                    {socialLinks.email}
                  </a>
                </p>
                <p>
                  WhatsApp:{" "}
                  <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">
                    {contactInfo.phone}
                  </a>
                </p>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-3xl font-bold mb-4">Professional Profile</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I am an Electronics and Communications Engineering (ECE) undergraduate at Alexandria University
                  focused on integrated photonics and device-level research engineering.
                </p>
                <p>
                  I currently contribute at NanoPhoto Lab (A*STAR) on optimization and modeling workflows for
                  integrated quantum photonics.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Research Focus</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {focusAreas.map((item) => (
                  <article key={item.title} className="p-5 rounded-xl border border-border bg-card/70">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Experience</h2>
              <div className="space-y-6">
                {experience.map((item) => (
                  <article key={`${item.role}-${item.org}`} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold">{item.role}</h3>
                        <p className="text-sm text-accent">{item.org}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.period}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.summary}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Selected Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {highlights.map((item) => (
                  <article key={item.title} className="p-5 rounded-xl border border-border bg-card/70">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.detail}</p>
                    <div className="flex flex-wrap gap-3">
                      {item.links.map((link) => {
                        const isExternal = link.href.startsWith("http")
                        if (isExternal) {
                          return (
                            <a
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-accent hover:text-accent/80"
                            >
                              {link.label}
                            </a>
                          )
                        }

                        return (
                          <Link key={link.label} href={link.href} className="text-xs text-accent hover:text-accent/80">
                            {link.label}
                          </Link>
                        )
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Professional Profiles</h2>
              <SocialProfileGrid />
              <p className="mt-5 text-sm text-muted-foreground">
                Web of Science ResearcherID:{" "}
                <span className="text-accent">{contactInfo.webOfScienceResearcherID}</span>
              </p>
            </section>
          </div>
        </div>
      </section>

      <Publications publications={publications} />

      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Core Technical Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Photonics Tools", value: "Lumerical, COMSOL, MATLAB" },
              { label: "Programming", value: "Python, C/C++, MATLAB" },
              { label: "ML Workflow", value: "PyTorch, TensorFlow, PINNs" },
            ].map((item) => (
              <div key={item.label} className="p-5 rounded-lg border border-border bg-background">
                <p className="text-sm font-semibold text-accent mb-2">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
