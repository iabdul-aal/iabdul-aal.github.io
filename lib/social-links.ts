import cvData from "@/data/cv_data.json"

export const socialLinks = {
  linkedin: `https://www.linkedin.com/in/${cvData.personalInfo.linkedin}`,
  github: `https://github.com/${cvData.personalInfo.github}`,
  orcid: `https://orcid.org/${cvData.personalInfo.orcid}`,
  scholar: "https://scholar.google.com/citations?user=CPmqNv4AAAAJ&hl=en",
  semanticScholar: "https://www.semanticscholar.org/author/Islam-I.-Abdulaal",
  researchGate: "https://www.researchgate.net/profile/Islam-Abdulaal",
  arxiv: "https://arxiv.org/a/abdulaal_i_1.html",
  nanophoto: "https://www.nanophoto.org/team",
  email: cvData.personalInfo.email,
  academicEmail: cvData.personalInfo.email,
  phone: cvData.personalInfo.phone,
} as const
