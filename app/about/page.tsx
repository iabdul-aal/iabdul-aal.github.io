import Image from "next/image"
import Link from "next/link"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Publications } from "@/components/publications"
import { personConfig } from "@/lib/site-config"
import { contactInfo, socialLinks } from "@/lib/social-links"

export const metadata = {
  title: "About",
  description:
    "Background, research direction, affiliations, publications, and technical competencies of Islam I. Abdulaal.",
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

  const coreProfiles = [
    { name: "LinkedIn", url: socialLinks.linkedin },
    { name: "ORCID", url: socialLinks.orcid },
    { name: "Google Scholar", url: socialLinks.scholar },
    { name: "Semantic Scholar", url: socialLinks.semanticScholar },
    { name: "ResearchGate", url: socialLinks.researchGate },
    { name: "IEEE Collabratec", url: socialLinks.collabratec },
    { name: "Frontiers Loop", url: socialLinks.frontiersLoop },
    { name: "SciProfiles", url: socialLinks.sciprofiles },
    { name: "Academia", url: socialLinks.academia },
    { name: "arXiv", url: socialLinks.arxiv },
  ]

  const professionalChannels = [
    { name: "Medium", url: socialLinks.medium },
    { name: "X (Twitter)", url: socialLinks.twitter },
    { name: "Bluesky", url: socialLinks.bluesky },
    { name: "Telegram", url: socialLinks.telegram },
    { name: "GitHub", url: socialLinks.github },
  ]

  const profileCollections = [
    { name: "Linktree", url: socialLinks.linktree },
    { name: "Gravatar", url: socialLinks.gravatar },
    { name: "F6S", url: socialLinks.f6s },
  ]

  const focusAreas = [
    {
      title: "Integrated Photonics",
      desc: "Silicon photonics, waveguide engineering, and PIC-level system design.",
    },
    {
      title: "Quantum and Nonlinear Optics",
      desc: "SPDC-oriented architectures and nonlinear effects for quantum-compatible platforms.",
    },
    {
      title: "Physics-Informed ML",
      desc: "PINN-based methods for inverse design and multiphysics-aware optimization.",
    },
    {
      title: "Photonic-Electronic Co-design",
      desc: "Cross-domain integration between photonic subsystems and electronic readout/control.",
    },
  ]

  const experience = [
    {
      role: "Research Intern",
      org: "NanoPhoto Lab, IMRE, A*STAR",
      period: "Sep 2025 - Present",
      summary:
        "Working on physics-informed optimization and integrated quantum photonics design workflows.",
    },
    {
      role: "Research Intern",
      org: "Egypt Scholars Advanced Labs Program",
      period: "Jul 2025 - Sep 2025",
      summary: "Completed intensive research training focused on quantum photonics and independent problem execution.",
    },
    {
      role: "Undergraduate Researcher",
      org: "OPST Group, Alexandria University",
      period: "Jul 2023 - Aug 2025",
      summary: "Worked on FBG-based sensing and photonic modeling for biomedical and communication use cases.",
    },
    {
      role: "Chapter Chair",
      org: "IEEE SSCS Alexandria University Student Branch Chapter",
      period: "2025",
      summary:
        "Led chapter-scale technical programs including HW Carnival, a funded initiative with approximately USD 10,000 support.",
    },
  ]

  const leadershipAndAwards = [
    {
      title: "HW Carnival (Funded Initiative)",
      detail:
        "Organized and led HW Carnival as a hardware-focused initiative supported by approximately USD 10,000 funding.",
      links: [
        { label: "Feature Article", href: socialLinks.hwCarnivalFeature },
        { label: "Event Listing", href: socialLinks.hwCarnivalEvent },
      ],
    },
    {
      title: "SSCS STGA Award",
      detail:
        "Recipient of SSCS STGA recognition for chapter and technical contribution activity.",
      links: [{ label: "Profile", href: socialLinks.linkedin }],
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
                <Link href="/contact">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Contact</Button>
                </Link>
                <a href="/cv.pdf" download>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    CV
                  </Button>
                </a>
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
                  I am an Electronics and Communications Engineering undergraduate at Alexandria University, focused on
                  integrated photonics research and device-level engineering.
                </p>
                <p>
                  My recent research direction centers on silicon photonics, quantum and nonlinear optics, and
                  physics-informed design methods for photonic structures.
                </p>
                <p>
                  I currently contribute as a Research Intern at NanoPhoto Lab (A*STAR), where I work on optimization
                  workflows and modeling methods for integrated quantum photonics.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Research Focus</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <h2 className="text-2xl font-bold mb-4">Leadership and Awards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leadershipAndAwards.map((item) => (
                  <article key={item.title} className="p-5 rounded-xl border border-border bg-card/70">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.detail}</p>
                    <div className="flex flex-wrap gap-3">
                      {item.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-accent hover:text-accent/80"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Academic and Professional Profiles</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-3">Research Identity</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {coreProfiles.map((profile) => (
                      <a
                        key={profile.name}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-lg border border-border bg-card hover:border-accent transition-colors text-sm font-semibold text-center"
                      >
                        {profile.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-3">Professional Channels</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {professionalChannels.map((profile) => (
                      <a
                        key={profile.name}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-lg border border-border bg-card hover:border-accent transition-colors text-sm font-semibold text-center"
                      >
                        {profile.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-3">Profile Collections</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {profileCollections.map((profile) => (
                      <a
                        key={profile.name}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-lg border border-border bg-card hover:border-accent transition-colors text-sm font-semibold text-center"
                      >
                        {profile.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                Web of Science ResearcherID:{" "}
                <span className="text-accent">{contactInfo.webOfScienceResearcherID}</span>
              </p>
            </section>
          </div>
        </div>
      </section>

      <Publications publications={publications} />

      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">Technical Competencies</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Key tools and technical stack used across photonics research, simulation workflows, and
                photonic-electronic studies.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Photonics Tools", value: "Lumerical, COMSOL, MATLAB" },
                { label: "Programming", value: "Python, C/C++, MATLAB" },
                { label: "ML Stack", value: "PyTorch, TensorFlow, PINNs" },
                { label: "Systems", value: "FPGA/ASIC workflow exposure" },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-lg border border-border bg-background">
                  <p className="text-sm font-semibold text-accent mb-2">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
