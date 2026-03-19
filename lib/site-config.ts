import { socialLinks } from "@/lib/social-links"

export const siteConfig = {
  name: "Islam I. Abdulaal",
  title: "Islam I. Abdulaal | Academic Profile",
  description:
    "Academic website of Islam I. Abdulaal with research profile, publications, projects, talks, materials, and contact information.",
  url: "https://iabdul-aal.github.io",
  locale: "en_US",
  ogImage: "/personal-pic.png",
  repositoryOwner: "iabdul-aal",
  repositoryName: "iabdul-aal.github.io",
  repositoryBranch: "main",
  orcidId: "0009-0004-9300-3936",
  keywords: [
    "Islam I. Abdulaal",
    "photonics researcher",
    "integrated photonics",
    "quantum photonics",
    "neuromorphic photonics",
    "nanophotonics",
    "computational photonics",
    "Alexandria University",
    "NanoPhoto Lab",
    "A*STAR",
    "arXiv",
    "ORCID",
    "GitHub",
    "Max Planck fit",
  ],
  sameAs: [
    socialLinks.orcid,
    socialLinks.scholar,
    socialLinks.semanticScholar,
    socialLinks.researchGate,
    socialLinks.github,
    socialLinks.linkedin,
  ],
} as const

export const personConfig = {
  name: "Islam I. Abdulaal",
  givenName: "Islam",
  familyName: "Abdulaal",
  role: "Photonics Researcher and B.Sc. (Hons.) Candidate",
  affiliation: "Alexandria University",
  lab: "NanoPhoto Lab, A*STAR",
  location: "Alexandria, Egypt",
  email: socialLinks.email,
  phone: socialLinks.phone,
  orcid: siteConfig.orcidId,
  focusAreas: [
    "Integrated photonics",
    "Neuromorphic photonics",
    "Quantum photonics",
    "Nanophotonics",
    "Computational photonics",
  ],
} as const
