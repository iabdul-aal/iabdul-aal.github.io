import cvData from "@/data/cv_data.json"

export const socialLinks = {
  linkedin: `https://www.linkedin.com/in/${cvData.personalInfo.linkedin}`,
  github: `https://github.com/${cvData.personalInfo.github}`,
  orcid: `https://orcid.org/${cvData.personalInfo.orcid}`,
  scholar: "https://scholar.google.com/citations?user=CPmqNv4AAAAJ&hl=en",
  semanticScholar: "https://www.semanticscholar.org/author/2383162313",
  openalex: "https://openalex.org/A5119839816",
  researchGate: "https://www.researchgate.net/profile/Islam-Abdulaal",
  arxiv: "https://arxiv.org/a/abdulaal_i_1.html",
  huggingface: "https://huggingface.co/iabdul-aal",
  nanophoto: "https://www.nanophoto.org/team",
  email: cvData.personalInfo.email,
  academicEmail: cvData.personalInfo.email,
} as const
