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
      desc: "Silicon photonics, waveguide engineering, and PIC-level component development for compact and scalable optical systems.",
    },
    {
      title: "Nonlinear Photonics",
      desc: "SPDC-oriented architectures, nonlinear light-matter interactions, and design choices aligned with quantum photonics use cases.",
    },
    {
      title: "Physics-Informed Design",
      desc: "PINN-assisted inverse design and multiphysics-aware optimization to improve both model quality and design efficiency.",
    },
  ]

  const experience = [
    {
      role: "Research Intern",
      org: "NanoPhoto Lab, IMRE, A*STAR",
      period: "Sep 2025 - Present",
      summary:
        "Contributing to optimization-driven integrated quantum photonics workflows with emphasis on model reliability and practical design iteration.",
      highlights: [
        "Build simulation-to-learning pipelines for parameter exploration and fast design screening.",
        "Study trade-offs among optical performance, robustness, and computational cost.",
      ],
    },
    {
      role: "Research Intern",
      org: "Egypt Scholars Advanced Labs Program",
      period: "Jul 2025 - Sep 2025",
      summary:
        "Completed intensive research training in quantum photonics, including independent problem framing, simulation, and technical reporting.",
      highlights: [
        "Executed mentor-guided and self-directed technical tasks under research timelines.",
        "Strengthened communication of assumptions, methods, and model limitations.",
      ],
    },
    {
      role: "Research Intern",
      org: "OPST Group, Alexandria University",
      period: "Jul 2023 - Aug 2025",
      summary:
        "Worked on FBG-based sensing and photonic modeling for biomedical and communications contexts across both analysis and implementation tracks.",
      highlights: [
        "Modeled and analyzed FBG response under changing sensing conditions.",
        "Developed reproducible workflows for simulation setup and result interpretation.",
      ],
    },
  ]

  const education = [
    {
      degree: "B.Sc. in Electronics and Communications Engineering",
      org: "Alexandria University, Faculty of Engineering",
      period: "Aug 2021 - Aug 2026",
      summary:
        "CGPA: 3.39/4.0 (Distinct with Honors). Thesis focus: integrated Si transceiver and waveguide-based Ge/Si PIN photodetector modeling and design.",
      highlights: [
        "Training emphasis in electromagnetics, communications, semiconductor devices, and signal processing.",
        "Current thesis work combines device modeling with system-level photonic integration goals.",
      ],
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
      name: "IEEE (Institute of Electrical and Electronics Engineers)",
      detail: "Base Membership: Student Member | 2025 - Present",
    },
    {
      name: "IEEE Society Add-On: Solid-State Circuits Society (SSCS)",
      detail: "Requires IEEE membership first | 2025 - Present",
    },
    {
      name: "IEEE Society Add-On: Photonics Society",
      detail: "Requires IEEE membership first | 2025 - Present",
    },
  ]

  const currentPriorities = [
    "Physics-informed inverse design for compact integrated photonic components.",
    "Multiphysics workflows that connect device behavior to system-level constraints.",
    "Optimization strategies for quantum photonics building blocks and design robustness.",
    "Reproducible research pipelines for simulation, data generation, and validation.",
  ]

  const technicalStack = [
    {
      label: "Photonics & Simulation",
      items: ["Lumerical FDTD/MODE", "COMSOL Multiphysics", "MATLAB", "Device and waveguide modeling"],
    },
    {
      label: "Programming & Compute",
      items: ["Python", "C/C++", "MATLAB scripting", "Data analysis workflows"],
    },
    {
      label: "ML & Optimization",
      items: ["PyTorch", "TensorFlow", "Physics-Informed Neural Networks (PINNs)", "Design-space optimization"],
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
                <Button asChild variant="outline">
                  <a href={socialLinks.linktree} target="_blank" rel="noopener noreferrer">
                    More Profiles
                    <ArrowUpRight className="w-4 h-4 ml-2" />
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
                  I am an Electronics and Communications Engineering (ECE) undergraduate at Alexandria University with
                  a research focus on integrated photonics and device-level engineering.
                </p>
                <p>
                  My recent work centers on physics-informed and optimization-guided workflows that support faster,
                  more reliable design decisions for photonic devices.
                </p>
                <p>
                  I currently contribute at NanoPhoto Lab (A*STAR), where I work on integrated quantum photonics
                  modeling flows that balance performance, robustness, and practical computation constraints.
                </p>
              </div>
              <div className="mt-5 p-5 rounded-xl border border-border bg-card/60">
                <p className="text-sm font-semibold mb-3">Current Priorities</p>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  {currentPriorities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Research Focus</h2>
              <p className="text-sm text-muted-foreground mb-4">
                My research interests connect photonic device physics, inverse design, and robust computational
                workflows for both classical and quantum-oriented platforms.
              </p>
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
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                      {item.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
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
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                      {item.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
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
          <p className="text-sm text-muted-foreground mb-4">
            Technical domains and tools I currently use in day-to-day research and prototyping.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {technicalStack.map((item) => (
              <article key={item.label} className="p-5 rounded-xl border border-border bg-background">
                <p className="text-sm font-semibold text-accent mb-3">{item.label}</p>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  {item.items.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-12 space-y-10">
            <section>
              <h3 className="text-2xl font-bold mb-4">Awards</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Selected recognitions and candidacies relevant to my academic and research track.
              </p>
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
              <p className="text-sm text-muted-foreground mb-4">
                Professional membership structure follows IEEE base membership first, then society add-ons.
              </p>
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
