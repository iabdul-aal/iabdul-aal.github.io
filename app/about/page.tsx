import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
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
      title: "Nonlinear Photonics",
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
      role: "Research Intern",
      org: "OPST Group, Alexandria University",
      period: "Jul 2023 - Aug 2025",
      summary: "Worked on FBG-based sensing and photonic modeling for biomedical and communications use cases.",
    },
  ]

  const education = [
    {
      degree: "B.Sc. in Electronics and Communications Engineering",
      org: "Alexandria University, Faculty of Engineering",
      period: "Aug 2021 - Aug 2026",
      summary: "CGPA: 3.39/4.0 (Distinct with Honors). Thesis focus: integrated Si transceiver and waveguide-based Ge/Si PIN photodetector modeling and design.",
    },
  ]

  const awards = [
    {
      title: "Alexandria University Technology Park (AUTP) Research Grant - Candidate (Withdrew due to time commitment)",
      period: "2025",
    },
    {
      title: "SSCS Student Travel Award (Withdrew due to visa issues)",
      period: "Nov 2025",
    },
    {
      title: "Distinction Grade - Dean's Honors for Academic Excellence",
      period: "2021 - 2025",
    },
    {
      title: "ICMTC Artificial Intelligence Contest (AIC-2) - 4th Place",
      period: "2024",
    },
  ]

  const memberships = [
    {
      name: "Institute of Electrical and Electronics Engineers (IEEE)",
      detail: "Student Member | 2025 - Present",
    },
    {
      name: "IEEE Solid-State Circuits Society (SSCS)",
      detail: "Member | 2025 - Present",
    },
    {
      name: "IEEE Photonics Society",
      detail: "Member | 2025 - Present",
    },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <aside className="lg:col-span-1">
            <div className="sticky top-24 w-full max-w-[300px]">
              <div className="relative w-full aspect-square bg-card rounded-xl border border-border overflow-hidden mb-6">
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
              <div className="mt-5 space-y-3">
                <p className="text-sm font-semibold text-foreground">Academic Profiles</p>
                <ul className="text-sm border border-border rounded-lg divide-y divide-border">
                  <li className="py-2.5 px-3">
                    <a
                      href={socialLinks.orcid}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
                    >
                      ORCID: {personConfig.orcid}
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </li>
                  <li className="py-2.5 px-3">
                    <a
                      href={socialLinks.scholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
                    >
                      Google Scholar Profile
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </li>
                  <li className="py-2.5 px-3">
                    <a
                      href="https://www.webofscience.com/wos/author/record/OLP-9224-2025"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
                    >
                      Researcher ID: {contactInfo.webOfScienceResearcherID}
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
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
              <h2 className="text-2xl font-bold mb-4">Education</h2>
              <div className="space-y-6">
                {education.map((item) => (
                  <article key={`${item.degree}-${item.org}`} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold">{item.degree}</h3>
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

          </div>
        </div>
      </section>

      <Publications publications={publications} />

      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Core Technical Stack</h2>
          <div className="space-y-4">
            {[
              { label: "Photonics Tools", value: "Lumerical, COMSOL, MATLAB" },
              { label: "Programming", value: "Python, C/C++, MATLAB" },
              { label: "ML Workflow", value: "PyTorch, TensorFlow, PINNs" },
            ].map((item) => (
              <article
                key={item.label}
                className="p-5 rounded-xl border border-border bg-background sm:flex sm:items-center sm:justify-between gap-4"
              >
                <p className="text-sm font-semibold text-accent">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-2 sm:mt-0">{item.value}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 space-y-10">
            <section>
              <h3 className="text-2xl font-bold mb-4">Awards</h3>
              <div className="space-y-4">
                {awards.map((item) => (
                  <article key={`${item.title}-${item.period}`} className="p-5 rounded-xl border border-border bg-background">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.period}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4">Memberships</h3>
              <div className="space-y-4">
                {memberships.map((item) => (
                  <article key={item.name} className="p-5 rounded-xl border border-border bg-background">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
