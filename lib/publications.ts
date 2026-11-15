import { readFile } from "node:fs/promises"
import { join } from "node:path"

type RawPublication = {
  title?: string
  venue?: string
  volume?: string
  issue?: string
  pages?: string
  year?: string
  doi?: string
  url?: string
  arxiv?: string
  authors?: string[]
  abstract?: string
  image?: string
  date?: string
  type?: string
  publisher?: string
  pdfUrl?: string
  badges?: string[]
}

import { PublicationRecord, getPublicationCategory } from "@/types/publication"
export type { PublicationRecord }
export { getPublicationCategory }

const ARXIV_DOI_PREFIX = "10.48550/arxiv."

const publicationOverrides: Record<
  string,
  Partial<
    Pick<
      PublicationRecord,
      "authors" | "submitted" | "subjects" | "relatedThemes" | "relatedProjects" | "title" | "pdfUrl" | "badges" | "abstract"
    >
  > & { bibtexKey?: string; primaryClass?: string; doi?: string }
> = {
  "2510.00357": {
    doi: "10.1088/2040-8986/ae8605",
    authors: ["Islam I. Abdulaal", "Abdelrahman W. A. Elsayed", "Omar A. M. Abdelraouf"],
    submitted: "30 Sep 2025",
    subjects: ["Optics", "Systems and Control", "Medical Physics"],
    bibtexKey: "abdulaal2026recent",
    primaryClass: "physics.optics",
    relatedThemes: ["integrated-nanophotonics"],
    relatedProjects: [],
    badges: ["Topical Review"],
    abstract:
      "Bound states in the continuums (BICs) have emerged as a revolutionary paradigm in terahertz (THz) photonics, enabling metasurfaces with theoretically infinite quality factors (Q-factors) and unprecedented light-matter control. This review synthesizes a decade of progress in THz-BIC research, tracing the evolution from foundational symmetry-protected designs to application-optimized quasi-BICs. We dissect multipolar origins, topological robustness, and symmetry-breaking strategies underpinning high-Q resonances, alongside computational frameworks for predictive design. The timeline highlights key milestones: early dielectric metasurfaces with high Q-factor, flexible biosensors achieving microgram detection limits, and Kerker-conditioned gas spectrometers reducing path lengths by few orders of magnitude. Emerging frontiers in reconfigurable BICs and chiral quantum photonics are critically evaluated. Despite breakthroughs, scalability barriers persist for 6G integration, including nano-fabrication tolerances, material loss tradeoffs, and dynamic control gaps. This review establishes BIC metasurfaces as pivotal enablers of compact, high-efficiency THz technologies poised to bridge the gap between fundamental discovery and commercialization of THz-based 6G communication and MedTech.",
  },
  "2606.21945": {
    authors: [
      "Amir H. M. Labeb",
      "Basmala Sallam",
      "Abdelrahman W. Elsayed",
      "Islam I. Abdulaal",
      "Amany M. Kamal",
      "Omar A. M. Abdelraouf",
    ],
    submitted: "20 Jun 2026",
    subjects: ["Optics"],
    bibtexKey: "labeb2026beyond",
    primaryClass: "physics.optics",
    relatedThemes: ["intelligent-photonics"],
    relatedProjects: [],
    abstract:
      "Physics-informed neural networks (PINNs) constitute a rapidly maturing class of scientific machine learning models in which the governing equations of a physical system are embedded directly into the training objective as soft constraints. By enforcing partial differential equations (PDEs), conservation laws, and constitutive relationships during optimization, PINNs enable the construction of models that are simultaneously data-efficient, physically consistent, and capable of operating in regimes where measurements are sparse or indirect. In contrast to conventional deep learning, where the loss is typically defined solely in terms of data misfit, the learning task in PINNs is reformulated as a constrained optimization problem in which admissible solutions are confined to the manifold defined by the underlying physics. This review provides a comprehensive assessment of recent developments in physics-informed machine learning with an emphasis on PINN-based formulations for forward modelling, inverse design, and equation discovery across nanophotonics, fluid mechanics, astronomy, and biomedical engineering. Particular attention is devoted to how physical knowledge is injected at different stages of the modelling pipeline, including synthetic data generation, non-dimensionalization and scaling, architecture selection, loss design, and post-training regularization. We highlight emerging strategies for multi-physics coupling, transfer learning across parameter and geometry spaces, and rigorous benchmarking against established numerical solvers. Finally, the review discusses interpretability, uncertainty quantification, and hardware acceleration, and articulates how physics-informed learning is reshaping engineering practice by enabling digital twins and design workflows that combine simulation and data in a unified differentiable framework.",
  },
  "10.20944/preprints202609.1239.v1": {
    doi: "10.20944/preprints202609.1239.v1",
    authors: ["Islam I. Abdulaal", "Omar A. M. Abdelraouf"],
    submitted: "15 Sep 2026",
    subjects: ["Optics", "Quantum Physics", "Computational Physics"],
    bibtexKey: "abdulaal2026nanophotonetmpm",
    primaryClass: "physics.optics",
    relatedThemes: ["intelligent-photonics", "quantum-photonics", "integrated-nanophotonics"],
    relatedProjects: ["nanophotonet-mpm"],
    abstract:
      "Integrated quantum photonics requires chip-scale biphoton sources, but phase matching, nonlinear coupling, loss, and spectral purity are coupled in high-index anisotropic waveguides. We present NanoPhotoNet-MPM, a physics-informed neural surrogate for modal spontaneous parametric down-conversion (SPDC) in monoclinic NbOCl₂ waveguides (d₂₂ ≈ 100 pm V⁻¹). The framework couples a DeepONet transverse eigensolver, regularised by the full-vectorial Helmholtz equations, with a quantum coupled-wave-equation propagator trained on 70 audited finite-difference eigenmode geometries. The trained model predicts a degenerate phase-matched crossing at w = 283.13 nm and h = 500.00 nm with an effective-index MAE of (4.16 ± 0.75) × 10⁻³, outperforming Gaussian process regression and plain multi-layer perceptron baselines by one to two orders of magnitude while guaranteeing wave-equation consistency. Joint spectral amplitude analysis at the degenerate design yields a heralded purity of P = 0.122 (K = 8.20), limited by symmetry-enforced group-velocity mismatch. A multi-mode genetic-algorithm search across Type-0, Type-I, and Type-II SPDC configurations identifies a Type-II design (m_p = 4, m_s = 0, m_i = 1) at w = 592.0 nm and h = 270.0 nm that reaches P ≈ 0.350 at L = 0.5 mm with 95.9% idler survival under realistic propagation loss. The resulting framework is a generalizable surrogate-assisted design and active-learning guidance method for anisotropic van der Waals quantum photonic platforms.",
  },
}

function normalizeChemicalSubscripts(value: string): string {
  return value.replace(/<sub>\s*2\s*<\/sub>/gi, "₂").replace(/<[^>]+>/g, "")
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
  venue: string
  volume?: string
  issue?: string
  pages?: string
  year: string
  doi?: string
  url?: string
  arxiv?: string
  isPreprint: boolean
  bibtexKey?: string
  primaryClass?: string
}): string {
  const key = publication.bibtexKey ?? createBibtexKey(publication.title, publication.year)
  const isArxivPreprint = publication.isPreprint && Boolean(publication.arxiv)
  const entryType = isArxivPreprint ? "unpublished" : publication.isPreprint ? "misc" : "article"
  const fields = [
    ["title", `{${escapeBibtex(publication.title)}}`],
    publication.authors.length > 0
      ? ["author", `{${publication.authors.map(toBibtexAuthor).join(" and ")}}`]
      : undefined,
    !publication.isPreprint && publication.venue ? ["journal", `{${publication.venue}}`] : undefined,
    publication.isPreprint && publication.venue && !publication.arxiv
      ? ["howpublished", `{${publication.venue}}`]
      : undefined,
    isArxivPreprint && publication.arxiv ? ["note", `{arXiv:${publication.arxiv}}`] : undefined,
    publication.volume ? ["volume", `{${publication.volume}}`] : undefined,
    publication.issue ? ["number", `{${publication.issue}}`] : undefined,
    publication.pages ? ["pages", `{${publication.pages}}`] : undefined,
    publication.year ? ["year", `{${publication.year}}`] : undefined,
    publication.arxiv ? ["eprint", `{${publication.arxiv}}`] : undefined,
    publication.arxiv ? ["archivePrefix", "{arXiv}"] : undefined,
    publication.primaryClass ? ["primaryClass", `{${publication.primaryClass}}`] : undefined,
    publication.doi ? ["doi", `{${publication.doi}}`] : undefined,
    publication.url ? ["url", `{${publication.url}}`] : undefined,
  ].filter((field): field is [string, string] => Boolean(field))

  const body = fields.map(([name, value]) => `  ${name} = ${value}`).join(",\n")
  return `@${entryType}{${key},\n${body}\n}`
}

function createRis(publication: {
  title: string
  authors: string[]
  venue: string
  volume?: string
  issue?: string
  pages?: string
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

  if (publication.volume) {
    lines.push(`VL  - ${publication.volume}`)
  }
  if (publication.issue) {
    lines.push(`IS  - ${publication.issue}`)
  }
  if (publication.pages) {
    lines.push(`SP  - ${publication.pages}`)
  }
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
    const raw = await readFile(join(process.cwd(), "data", "publications.json"), "utf8")
    const parsed = JSON.parse(raw) as RawPublication[]

    if (!Array.isArray(parsed)) {
      return []
    }

    const sortKeys = new Map<string, string>()

    const records = parsed
      .map((item): PublicationRecord | null => {
        const doi = (item.doi ?? "").trim() || undefined
        const url = (item.url ?? "").trim() || (doi ? `https://doi.org/${doi}` : undefined)
        const arxiv = (item.arxiv ?? "").trim() || extractArxivId(doi ?? "", url ?? "")

        const overrideEntry = Object.entries(publicationOverrides).find(([key, val]) => {
          return (
            key === arxiv ||
            (doi && key.toLowerCase() === doi.toLowerCase()) ||
            (doi && val.doi && val.doi.toLowerCase() === doi.toLowerCase())
          )
        })
        const override = overrideEntry ? overrideEntry[1] : undefined

        const rawTitle = (override?.title ?? item.title ?? "").trim()
        const title = normalizeChemicalSubscripts(rawTitle)
        if (!title) {
          return null
        }

        const date = (item.date ?? "").trim()
        const year = (item.year ?? "").trim() || (date.match(/^\d{4}/)?.[0] ?? "")
        const venue = (item.venue ?? item.publisher ?? "").trim() || (arxiv ? "arXiv preprint" : "Publication")
        const authors = item.authors && item.authors.length > 0 ? item.authors : override?.authors ?? []

        const isPreprint = Boolean(
          item.type === "preprint" ||
            (arxiv && (!doi || doi.toLowerCase().startsWith(ARXIV_DOI_PREFIX))) ||
            venue.toLowerCase().includes("preprint") ||
            venue.toLowerCase().includes("working paper") ||
            (doi && doi.toLowerCase().includes("preprints")),
        )
        const badges = Array.from(new Set([...(item.badges ?? []), ...(override?.badges ?? [])]))
        const pdfUrl =
          (item.pdfUrl ?? override?.pdfUrl ?? "").trim() ||
          (isPreprint && arxiv ? `https://arxiv.org/pdf/${arxiv}` : undefined)

        const id = slugify(`${year}-${title}`)
        sortKeys.set(id, date || year)

        return {
          id,
          title,
          authors,
          venue,
          year,
          doi,
          url,
          arxiv,
          pdfUrl,
          abstract: override?.abstract ?? item.abstract,
          submitted: override?.submitted,
          subjects: override?.subjects,
          status: isPreprint ? "preprint" : "published",
          badges: badges.length > 0 ? badges : undefined,
          relatedThemes: override?.relatedThemes ?? [],
          relatedProjects: override?.relatedProjects ?? [],
          bibtex: createBibtex({
            title,
            authors,
            venue,
            volume: item.volume,
            issue: item.issue,
            pages: item.pages,
            year,
            doi,
            url,
            arxiv,
            isPreprint,
            bibtexKey: override?.bibtexKey,
            primaryClass: override?.primaryClass,
          }),
          ris: createRis({
            title,
            authors,
            venue,
            volume: item.volume,
            issue: item.issue,
            pages: item.pages,
            year,
            doi,
            url,
            arxiv,
            bibtexKey: override?.bibtexKey,
          }),
        }
      })
      .filter((item): item is PublicationRecord => item !== null)
      .sort((a, b) => {
        const yearDiff = Number(b.year || 0) - Number(a.year || 0)
        if (yearDiff !== 0) return yearDiff
        const dateA = sortKeys.get(a.id) ?? a.year
        const dateB = sortKeys.get(b.id) ?? b.year
        if (dateA !== dateB) return dateB.localeCompare(dateA)
        return a.title.localeCompare(b.title)
      })

    return records
  } catch {
    return []
  }
}

/**
 * Rank publications by citation count (OpenAlex metric) with fallback to natural order.
 */
export function rankPublications(
  publications: PublicationRecord[],
  paperMetrics: { papers: Record<string, { cited_by_count?: number; openalex_id?: string; title?: string }> },
): PublicationRecord[] {
  return [...publications].sort((a, b) => {
    const getMetric = (pub: PublicationRecord) => {
      if (paperMetrics.papers[pub.id]) return paperMetrics.papers[pub.id]
      return Object.values(paperMetrics.papers).find(
        (m) =>
          (pub.doi && m.openalex_id && m.openalex_id.toLowerCase().includes(pub.doi.toLowerCase())) ||
          (pub.title &&
            m.title &&
            m.title.toLowerCase().replace(/[^a-z0-9]/g, "") === pub.title.toLowerCase().replace(/[^a-z0-9]/g, "")),
      )
    }
    const ca = getMetric(a)?.cited_by_count ?? -1
    const cb = getMetric(b)?.cited_by_count ?? -1
    if (ca !== cb) return cb - ca
    return 0
  })
}

/**
 * Rank tools/projects by engagement score with fallback to default order.
 */
export function rankTools<T extends { id: string; tier?: string }>(
  projects: readonly T[],
  projectMetrics: { projects: Record<string, { score?: number }> },
): T[] {
  const majorProjects = projects.filter((p) => p.tier !== "minor")
  return [...majorProjects].sort((a, b) => {
    const sa = projectMetrics.projects[a.id]?.score ?? 0
    const sb = projectMetrics.projects[b.id]?.score ?? 0
    return sb - sa
  })
}
