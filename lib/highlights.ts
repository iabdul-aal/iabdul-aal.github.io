import { socialLinks } from "@/lib/social-links"

export type HighlightItem = {
  title: string
  date: string
  category: string
  description: string
  link?: string
}

export const highlights: HighlightItem[] = [
  {
    title: "Research Intern",
    date: "2025 - Present",
    category: "Current Stage",
    description:
      "Working across integrated photonics research workflows with emphasis on simulation quality, model reliability, and practical execution.",
    link: socialLinks.nanophoto,
  },
  {
    title: "Integrated Quantum Photonics*",
    date: "Current Focus",
    category: "Current Focus",
    description:
      "Focused on integrated quantum photonics design, physics-informed optimization, and reproducible technical workflows.",
    link: "/about#research-focus",
  },
  {
    title: "SSCS STGA Award",
    date: "2025",
    category: "Award",
    description:
      "Recognized through the SSCS Student Travel Grant Award (STGA) program for chapter and technical engagement.",
    link: socialLinks.linkedin,
  },
  {
    title: "arXiv Preprint Published",
    date: "2025",
    category: "Publication",
    description:
      "Published preprint on terahertz quasi-BIC metasurfaces for biosensing and high-speed wireless communications.",
    link: socialLinks.arxiv,
  },
  {
    title: "AUTP Research Grant Application",
    date: "2025",
    category: "Funding",
    description: "Applied with a photonics-focused proposal and completed technical preparation during the review stage.",
  },
  {
    title: "Public Writing and Talks",
    date: "2025",
    category: "Public Work",
    description: "Publishing technical articles and delivering public sessions for students and early-career engineers.",
    link: "/articles",
  },
  {
    title: "Founded Initiative Tracks",
    date: "2025",
    category: "Initiatives",
    description: "Founded HW Carnival, Si-Cast, Si-Clash, and AlexDuino as student-facing technical learning tracks.",
    link: "/ventures",
  },
]
