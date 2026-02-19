export type LogoSlot = {
  name: string
  filePath: string
  website: string
  group: "Affiliations" | "Profiles"
}

export const logoSlots: LogoSlot[] = [
  {
    name: "IEEE",
    filePath: "/logos/affiliations/IEEE.png",
    website: "https://www.ieee.org/",
    group: "Affiliations",
  },
  {
    name: "IEEE Solid-State Circuits Society",
    filePath: "/logos/affiliations/SSCS.png",
    website: "https://sscs.ieee.org/",
    group: "Affiliations",
  },
  {
    name: "IEEE Photonics Society",
    filePath: "/logos/affiliations/Photonics.webp",
    website: "https://www.photonicssociety.org/",
    group: "Affiliations",
  },
  {
    name: "Alexandria University",
    filePath: "/logos/affiliations/Alexandria Univeristy.webp",
    website: "https://alexu.edu.eg/",
    group: "Affiliations",
  },
  {
    name: "A*STAR IMRE",
    filePath: "/logos/affiliations/A Star.png",
    website: "https://www.a-star.edu.sg/imre",
    group: "Affiliations",
  },
  {
    name: "Egypt Scholars Advanced Labs Program",
    filePath: "/logos/affiliations/Egypt Scholars.png",
    website: "https://www.egyptscholars.org/",
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
