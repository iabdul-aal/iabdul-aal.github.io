export type LogoSlot = {
  name: string
  filePath: string
  website: string
  group: "Affiliations" | "Profiles"
}

export const logoSlots: LogoSlot[] = [
  {
    name: "IEEE",
    filePath: "/logos/affiliations/ieee.svg",
    website: "https://www.ieee.org/",
    group: "Affiliations",
  },
  {
    name: "IEEE Solid-State Circuits Society",
    filePath: "/logos/affiliations/ieee-sscs.svg",
    website: "https://sscs.ieee.org/",
    group: "Affiliations",
  },
  {
    name: "IEEE Photonics Society",
    filePath: "/logos/affiliations/ieee-photonics.svg",
    website: "https://www.photonicssociety.org/",
    group: "Affiliations",
  },
  {
    name: "Alexandria University",
    filePath: "/logos/affiliations/alexandria-university.svg",
    website: "https://alexu.edu.eg/",
    group: "Affiliations",
  },
  {
    name: "A*STAR IMRE",
    filePath: "/logos/affiliations/astar-imre.svg",
    website: "https://www.a-star.edu.sg/imre",
    group: "Affiliations",
  },
  {
    name: "ORCID",
    filePath: "/logos/platforms/orcid.svg",
    website: "https://orcid.org/",
    group: "Profiles",
  },
  {
    name: "Google Scholar",
    filePath: "/logos/platforms/google-scholar.svg",
    website: "https://scholar.google.com/",
    group: "Profiles",
  },
  {
    name: "Web of Science",
    filePath: "/logos/platforms/web-of-science.svg",
    website: "https://www.webofscience.com/",
    group: "Profiles",
  },
]
