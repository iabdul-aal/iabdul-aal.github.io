export type PublicationRecord = {
  id: string
  title: string
  authors: string[]
  venue: string
  year: string
  doi?: string
  url?: string
  arxiv?: string
  pdfUrl?: string
  abstract?: string
  submitted?: string
  subjects?: string[]
  bibtex: string
  ris: string
  status: "published" | "preprint"
  badges?: string[]
  relatedThemes?: string[]
  relatedProjects?: string[]
}

/**
 * Determine publication category for UI filtering.
 */
export function getPublicationCategory(pub: PublicationRecord): "journal" | "conference" | "preprint" {
  if (pub.status === "preprint") return "preprint"
  const v = pub.venue.toLowerCase()
  if (v.includes("proc") || v.includes("conf") || v.includes("symp") || v.includes("ieee")) {
    return "conference"
  }
  return "journal"
}
