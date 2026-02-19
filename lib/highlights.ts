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
    title: "HW Carnival Student Initiative (USD 10,000 Funding Support)",
    date: "2025",
    category: "Initiative",
    description: "Founded HW Carnival, a funded student hardware initiative with public feature coverage.",
    link: socialLinks.hwCarnivalFeature,
  },
  {
    title: "Expansion of Initiative Tracks (Si-Cast, Si-Clash, AlexDuino)",
    date: "Founded in 2025 (currently inactive)",
    category: "Initiatives",
    description:
      "Founded Si-Cast, Si-Clash, and AlexDuino as student-facing technical learning tracks; I am no longer active in daily operations.",
    link: "/ventures",
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
    title: "Research Internship at NanoPhoto Lab (A*STAR)",
    date: "2025 - Present",
    category: "Research Role",
    description:
      "Contributing to integrated photonics and physics-informed optimization workflows in a research-lab setting.",
    link: socialLinks.nanophoto,
  },
  {
    title: "Egypt Scholars Advanced Labs Program",
    date: "2025",
    category: "Advanced Training",
    description: "Completed intensive research training focused on advanced photonics topics and independent research execution.",
  },
  {
    title: "Research Grant Support",
    date: "2025",
    category: "Funding",
    description: "Co-developed technical work packages that supported a funded research direction in photonic sensing.",
    link: socialLinks.hwCarnivalEvent,
  },
  {
    title: "IEEE Student Chapter Work",
    date: "2025",
    category: "Student Activity",
    description: "Supported student chapter activities and technical community engagement in circuits and systems topics.",
  },
  {
    title: "Public Technical Writing",
    date: "2025",
    category: "Outreach",
    description: "Published educational photonics explainers and technical reflections for broader engineering audiences.",
    link: socialLinks.medium,
  },
]
