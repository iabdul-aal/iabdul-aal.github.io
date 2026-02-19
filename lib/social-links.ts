export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/iabdul-aal",
  twitter: "https://x.com/iabdul_aal",
  telegramBot: "https://t.me/iabdul_aal_bot",
  telegramChannel: "https://t.me/iabdul_aal",
  github: "https://github.com/iabdul-aal",
  orcid: "https://orcid.org/0009-0004-9300-3936",
  scholar: "https://scholar.google.com/citations?user=CPmqNv4AAAAJ&hl=en",
  semanticScholar: "https://www.semanticscholar.org/author/Islam-I.-Abdulaal",
  researchGate: "https://www.researchgate.net/profile/Islam-Abdulaal",
  linktree: "https://linktr.ee/iabdul-aal",
  medium: "https://iabdul-aal.medium.com/",
  mediumRss: "https://medium.com/feed/@iabdul-aal",
  arxiv: "https://arxiv.org/abs/2510.00357",
  nanophoto: "https://www.nanophoto.org/team",
  hwCarnivalEvent: "https://events.vtools.ieee.org/m/526669",
  hwCarnivalFeature: "https://www.bibalex.org/en/MediaGallery/Default/specialevents",
  hwCarnivalFeatureBA: "https://www.bibalex.org/en/event/details?documentid=44040&keywords=HW-Carnival",
  siCastYoutube: "https://www.youtube.com/@si-cast",
  featuredTalkYoutube: "https://www.youtube.com/watch?v=mEboydO5pEk&t=4s",
  email: "iabdul-aal@ieee.org",
  academicEmail: "eslam.ibrahim2026@alexu.edu.eg",
  phone: "+20120460921",
  whatsapp: "https://wa.me/20120460921",
}

export const professionalSocialProfiles = [
  { key: "linkedin", name: "LinkedIn", url: socialLinks.linkedin },
  { key: "github", name: "GitHub", url: socialLinks.github },
  { key: "orcid", name: "ORCID", url: socialLinks.orcid },
  { key: "scholar", name: "Google Scholar", url: socialLinks.scholar },
  { key: "semanticScholar", name: "Semantic Scholar", url: socialLinks.semanticScholar },
  { key: "researchGate", name: "ResearchGate", url: socialLinks.researchGate },
  { key: "medium", name: "Medium", url: socialLinks.medium },
  { key: "arxiv", name: "arXiv", url: socialLinks.arxiv },
] as const

export type ProfessionalSocialProfileKey = (typeof professionalSocialProfiles)[number]["key"]

export const contactInfo = {
  email: socialLinks.email,
  secondaryEmail: socialLinks.academicEmail,
  phone: socialLinks.phone,
  whatsapp: socialLinks.whatsapp,
  location: "Alexandria, Egypt",
  timezone: "EET (UTC+2)",
  webOfScienceResearcherID: "OLP-9224-2025",
}
