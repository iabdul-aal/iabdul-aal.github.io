import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Publications } from "@/components/publications"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "About | Islam I. Abdulaal",
  description:
    "ECE undergraduate researcher specializing in integrated photonics, nanophotonics, and quantum photonics at Alexandria University.",
}

export default function AboutPage() {
  const publications = [
    {
      title: "Terahertz quasi-BIC metasurfaces for ultra-sensitive biosensing and high-speed wireless communications",
      arxiv: "2510.00357",
      status: "Submitted to Journal of Optics (IOP), 2025",
      url: "https://arxiv.org/abs/2510.00357",
    },
    {
      title: "NbOCl₂ₓ-based SPDC inverse design using Physics-Informed Neural Networks",
      status: "In Preparation, 2026",
    },
    {
      title:
        "Physics-informed machine learning multiphysics for forward modelling, inverse design, and equation discovery",
      status: "In Preparation, 2026",
    },
  ]

  const profiles = [
    { name: "Google Scholar", url: "https://scholar.google.com" },
    { name: "Research Gate", url: "https://www.researchgate.net" },
    { name: "LinkedIn", url: "https://linkedin.com/in/iabdul-aal" },
    { name: "GitHub", url: "https://github.com/iabdul-aal" },
    { name: "Medium", url: "https://medium.com/@iabdul-aal" },
    { name: "Twitter", url: "https://twitter.com/iabdul_aal" },
    { name: "Telegram", url: "https://t.me/iabdul_aal" },
  ]

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Profile */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="grid grid-cols-[auto,1fr] gap-4 items-center mb-6">
                <div className="flex-shrink-0">
                  <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-[270px] md:h-[270px] bg-card rounded-lg border border-border overflow-hidden">
                    <Image
                      src="/personal-pic.png"
                      alt="Personal Picture"
                      fill
                      sizes="(max-width: 640px) 160px, (max-width: 1024px) 224px, 270px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Islam I. Abdulaal</h1>
                  <div className="flex flex-wrap gap-3 mb-4 text-sm">
                    <a
                      href="https://orcid.org/0009-0004-9300-3936"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
                    >
                      ORCID: 0009-0004-9300-3936
                    </a>
                    <span className="text-muted-foreground">•</span>
                    <a
                      href="https://publons.com/researcher"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
                    >
                      ResearcherID: Available
                    </a>
                  </div>
                  <p className="text-accent font-semibold mb-2">Research Intern, Integrated Photonics</p>
                  <p className="text-muted-foreground text-sm mb-4">
                    Alexandria, Egypt • +20-120-460-9271 • eslam.ibrahim2026@alexu.edu.eg
                  </p>
                  <div className="flex gap-3">
                    <Link href="/contact">
                      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1">Get in Touch</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Expertise */}
          <div className="md:col-span-2 space-y-8">
            {/* Bio */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Professional Biography</h2>
              <div className="prose prose-invert text-muted-foreground space-y-4">
                <p>
                  Islam I. Abdulaal is pursuing a B.Sc. (Hons.) in Electronics and Communications Engineering at
                  Alexandria University, graduating in 2026. Since 2023, he has been a researcher with the OPST Group at
                  Alexandria University, focusing on Fiber Bragg Grating (FBG)-based optical sensing for biomedical
                  monitoring.
                </p>
                <p>
                  In 2025, he joined NanoPhoto Lab at A*STAR, Singapore, as a Research Intern through the Egypt Scholars
                  Advanced Labs Program, working on Physics-Informed Neural Networks (PINNs) for optimizing integrated
                  quantum light source and detection structures. His bachelor thesis investigates silicon photonic
                  devices and on-chip Mode Division Multiplexing (MDM) for intra-data center systems.
                </p>
                <p>
                  He has completed over 300 hours of advanced training in ASIC design, PCB/FPGA systems, and AI, and
                  developed multiple DSP and embedded systems projects. Islam is an active IEEE Student Member and
                  previously served as Chair of the IEEE Solid-State Circuits Society (SSCS) Alexandria University
                  Student Branch Chapter.
                </p>
              </div>
            </section>

            {/* Core Expertise */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Research Interests</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Integrated Photonics",
                    desc: "Silicon photonics, waveguide design, photonic integrated circuits (PICs)",
                  },
                  {
                    title: "Nanophotonics",
                    desc: "Metamaterials, BICs, 2D-material-based photonic devices",
                  },
                  { title: "Nonlinear Optics", desc: "SPDC, parametric down-conversion, quantum light sources" },
                  {
                    title: "Photonic-Electronic Co-design",
                    desc: "All-optical neural networks, programmable photonics, optical communications",
                  },
                  {
                    title: "Physics-Informed ML",
                    desc: "PINNs, inverse design, digital twins for photonic systems",
                  },
                  {
                    title: "Biomedical Sensing",
                    desc: "FBG sensors, optical biosensing, respiratory disease detection",
                  },
                ].map((expertise) => (
                  <div
                    key={expertise.title}
                    className="p-4 rounded-lg border border-border bg-card/50 hover:border-accent transition-colors"
                  >
                    <h3 className="font-semibold text-foreground mb-2">{expertise.title}</h3>
                    <p className="text-sm text-muted-foreground">{expertise.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education & Credentials */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Education</h2>
              <div className="space-y-6">
                {[
                  {
                    degree: "B.Sc. (Hons.) in Electronics and Communications Engineering",
                    institution: "Alexandria University, Faculty of Engineering",
                    year: "2026 (Expected)",
                    focus:
                      "CGPA: 3.39/4.0 (Distinct with Honors). Thesis: Intra-DC IEEE 802.3 Ethernet MDM-based 400 Gb/s Integrated Si Transceiver",
                  },
                ].map((edu, idx) => (
                  <div key={idx} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                    <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-accent text-sm mb-1">{edu.institution}</p>
                    <p className="text-muted-foreground text-sm">{edu.focus}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience Highlights */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Research Experience</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Research Intern",
                    company: "NanoPhoto Lab, IMRE, A*STAR",
                    period: "Sep 2025 – Present",
                    desc: "Physics-Informed Neural Networks (PINNs) for inverse design of integrated quantum light sources. Contributing to review papers on metamaterial bound states in continuum (BICs) and quantum photonics applications.",
                  },
                  {
                    title: "Research Intern",
                    company: "Egypt Scholars Advanced Labs Program",
                    period: "Jul 2025 – Sep 2025",
                    desc: "Completed intensive 10-week training developing independent research capabilities. Generated 12 million training data points for PINN benchmarking on NbOCl2x SPDC inverse design.",
                  },
                  {
                    title: "Undergraduate Researcher",
                    company: "OPST Group, Alexandria University",
                    period: "Jul 2023 – Aug 2025",
                    desc: "FBG-based optical sensing for biomedical monitoring. Co-authored research proposal securing USD 15k funding. Developed MATLAB models and Lumerical simulations for fiber mode coupling and detection systems.",
                  },
                ].map((exp, idx) => (
                  <div key={idx} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{exp.title}</h3>
                        <p className="text-accent text-sm">{exp.company}</p>
                      </div>
                      <span className="text-muted-foreground text-sm">{exp.period}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">Academic & Professional Profiles</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
            {profiles.map((profile) => (
              <a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-border bg-card hover:border-accent hover:bg-card/80 transition-all group"
              >
                <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors text-center">
                  {profile.name}
                </p>
              </a>
            ))}
          </div>

          {/* Collabratec membership section */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Collabratec</h3>
                <p className="text-muted-foreground text-sm">IEEE professional collaboration platform</p>
              </div>
              <a
                href="https://www.collabratec.ieee.org"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-accent hover:text-accent/80 text-sm font-semibold transition-colors flex items-center gap-2"
              >
                Visit <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Publications publications={publications} />

      {/* CV Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">Complete Curriculum Vitae</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Download my full CV for detailed information about publications, technical training, awards, and
                professional experience.
              </p>
              <a href="/cv.pdf" download>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Download className="w-5 h-5 mr-2" />
                  Download CV (PDF)
                </Button>
              </a>
            </div>

            {/* CV Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Publications", value: "3+" },
                { label: "Training Hours", value: "300+" },
                { label: "Research Years", value: "2+" },
                { label: "Awards & Recognition", value: "5+" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-lg border border-border bg-background text-center">
                  <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Technologies */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">Technical Skills & Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                category: "Photonic Simulation & Design",
                skills: [
                  "Lumerical (FDTD, MODE, INTERCONNECT)",
                  "COMSOL FEM Solver",
                  "MATLAB modeling",
                  "Python scientific computing",
                ],
              },
              {
                category: "Electronic Design & Verification",
                skills: [
                  "Cadence Virtuoso & Spectre",
                  "SPICE simulation (LTspice, NGspice)",
                  "Verilog/VHDL design & verification",
                  "Analog/Mixed-Signal (Verilog-A, AMS)",
                ],
              },
              {
                category: "Machine Learning & Programming",
                skills: [
                  "PyTorch, TensorFlow (PINNs, Deep Learning)",
                  "Python, C/C++, MATLAB, Assembly",
                  "FPGA/CPLD (Xilinx, Altera)",
                  "Git, Linux, LaTeX, Jupyter",
                ],
              },
            ].map((skillGroup) => (
              <div key={skillGroup.category} className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-xl font-semibold text-foreground mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.skills.map((skill) => (
                    <li key={skill} className="text-muted-foreground text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Collaborate?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're interested in research partnerships, mentorship, or other opportunities, I'd love to hear
            from you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/mentorship">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Book a Mentorship Session
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Me
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
