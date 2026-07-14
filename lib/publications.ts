import { readFile } from "node:fs/promises"
import { join } from "node:path"

type RawPublication = {
  title?: string
  venue?: string
  year?: string
  doi?: string
  url?: string
  arxiv?: string
  authors?: string[]
  abstract?: string
  image?: string
  date?: string
  publisher?: string
}

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
  relatedThemes?: string[]
  relatedProjects?: string[]
}

const ARXIV_DOI_PREFIX = "10.48550/arxiv."

const publicationOverrides: Record<
  string,
  Partial<Pick<PublicationRecord, "authors" | "submitted" | "subjects" | "relatedThemes" | "relatedProjects">> & { bibtexKey?: string; primaryClass?: string; doi?: string }
> = {
  "2510.00357": {
    doi: "10.1088/2040-8986/ae8605",
    authors: ["Islam I. Abdulaal", "Abdelrahman W. A. Elsayed", "Omar A. M. Abdelraouf"],
    submitted: "30 Sep 2025",
    subjects: ["Optics", "Systems and Control", "Medical Physics"],
    bibtexKey: "abdulaal2025terahertz",
    primaryClass: "physics.optics",
    relatedThemes: ["integrated-nanophotonics"],
    relatedProjects: [],
  },
  "2606.21945": {
    authors: [
      "Amir H. M. Labeb",
      "Basmala Sallam",
      "Abdelrahman W. Elsayed",
      "Islam I. Abdulaal",
      "Amany M. Kamal",
      "Omar A. M. Abdelraouf"
    ],
    submitted: "20 Jun 2026",
    subjects: ["Optics"],
    bibtexKey: "labeb2026beyond",
    primaryClass: "physics.optics",
    relatedThemes: ["physics-informed-design"],
    relatedProjects: [],
  },
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function extractArxivId(doi: string, url: string): string | undefined {
  const normalizedDoi = doi.trim().toLowerCase()
  if (normalizedDoi.startsWith(ARXIV_DOI_PREFIX)) {
    return doi.trim().slice(ARXIV_DOI_PREFIX.length)
  }

  const absMarker = "/abs/"
  const absIndex = url.indexOf(absMarker)
  if (absIndex >= 0) {
    return url.slice(absIndex + absMarker.length).trim() || undefined
  }

  return undefined
}

function toBibtexAuthor(author: string): string {
  const parts = author.trim().split(/\s+/)
  if (parts.length < 2) {
    return author.trim()
  }

  const family = parts[parts.length - 1]
  const given = parts.slice(0, -1).join(" ")
  return `${family}, ${given}`
}

function escapeBibtex(value: string): string {
  return value.replace(/[{}]/g, "")
}

function createBibtexKey(title: string, year: string): string {
  const firstToken = slugify(title).split("-").filter(Boolean)[0] ?? "publication"
  return `abdulaal${year || "nd"}${firstToken}`
}

function createBibtex(publication: {
  title: string
  authors: string[]
  year: string
  doi?: string
  url?: string
  arxiv?: string
  bibtexKey?: string
  primaryClass?: string
}): string {
  const key = publication.bibtexKey ?? createBibtexKey(publication.title, publication.year)
  const fields = [
    ["title", `{${escapeBibtex(publication.title)}}`],
    publication.authors.length > 0
      ? ["author", `{${publication.authors.map(toBibtexAuthor).join(" and ")}}`]
      : undefined,
    publication.year ? ["year", `{${publication.year}}`] : undefined,
    publication.arxiv ? ["eprint", `{${publication.arxiv}}`] : undefined,
    publication.arxiv ? ["archivePrefix", "{arXiv}"] : undefined,
    publication.primaryClass ? ["primaryClass", `{${publication.primaryClass}}`] : undefined,
    publication.doi ? ["doi", `{${publication.doi}}`] : undefined,
    publication.url ? ["url", `{${publication.url}}`] : undefined,
  ].filter((field): field is [string, string] => Boolean(field))

  const body = fields.map(([name, value]) => `  ${name} = ${value}`).join(",\n")
  return `@misc{${key},\n${body}\n}`
}

function createRis(publication: {
  title: string
  authors: string[]
  venue: string
  year: string
  doi?: string
  url?: string
  arxiv?: string
  bibtexKey?: string
}): string {
  const key = publication.bibtexKey ?? createBibtexKey(publication.title, publication.year)
  const lines: string[] = [
    "TY  - JOUR",
    `T1  - ${escapeBibtex(publication.title)}`,
  ]

  publication.authors.forEach((author) => {
    lines.push(`AU  - ${toBibtexAuthor(author)}`)
  })

  const joValue = publication.venue || (publication.arxiv ? `arXiv preprint arXiv:${publication.arxiv}` : "Publication")
  lines.push(`JO  - ${joValue}`)

  if (publication.year) {
    lines.push(`Y1  - ${publication.year}`)
  }
  if (publication.doi) {
    lines.push(`DO  - ${publication.doi}`)
  }
  if (publication.url) {
    lines.push(`UR  - ${publication.url}`)
  }
  lines.push(`ID  - ${key}`)
  lines.push("ER  - ")

  return lines.join("\n")
}

export async function loadPublications(): Promise<PublicationRecord[]> {
  try {
    const raw = await readFile(join(process.cwd(), "publications.json"), "utf8")
    const parsed = JSON.parse(raw) as RawPublication[]

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .map((item): PublicationRecord | null => {
        const title = (item.title ?? "").trim()
        if (!title) {
          return null
        }

        const doi = (item.doi ?? "").trim() || undefined
        const url = (item.url ?? "").trim() || (doi ? `https://doi.org/${doi}` : undefined)
        const arxiv = (item.arxiv ?? "").trim() || extractArxivId(doi ?? "", url ?? "")

        const overrideEntry = Object.entries(publicationOverrides).find(([key, val]) => {
          return key === arxiv || (doi && val.doi && val.doi.toLowerCase() === doi.toLowerCase())
        })
        const override = overrideEntry ? overrideEntry[1] : undefined

        const year = (item.year ?? item.date ?? "").trim()
        const venue = (item.venue ?? item.publisher ?? "").trim() || (arxiv ? "arXiv preprint" : "Publication")
        const authors = item.authors && item.authors.length > 0 ? item.authors : override?.authors ?? []

        const isPreprint = Boolean(arxiv && (!doi || doi.toLowerCase().startsWith(ARXIV_DOI_PREFIX)))

        return {
          id: slugify(`${year}-${title}`),
          title,
          authors,
          venue,
          year,
          doi,
          url,
          arxiv,
          pdfUrl: arxiv ? `https://arxiv.org/pdf/${arxiv}` : undefined,
          abstract: item.abstract,
          submitted: override?.submitted,
          subjects: override?.subjects,
          status: isPreprint ? "preprint" : "published",
          relatedThemes: override?.relatedThemes ?? [],
          relatedProjects: override?.relatedProjects ?? [],
          bibtex: createBibtex({
            title,
            authors,
            year,
            doi,
            url,
            arxiv,
            bibtexKey: override?.bibtexKey,
            primaryClass: override?.primaryClass,
          }),
          ris: createRis({
            title,
            authors,
            venue,
            year,
            doi,
            url,
            arxiv,
            bibtexKey: override?.bibtexKey,
          }),
        }
      })
      .filter((item): item is PublicationRecord => item !== null)
      .sort((a, b) => Number(b.year || 0) - Number(a.year || 0) || a.title.localeCompare(b.title))
  } catch {
    return []
  }
}
