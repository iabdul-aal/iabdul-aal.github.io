import { cache } from "react"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { PreprintMeta, PublicationRecord, getPublicationCategory } from "@/types/publication"

export type { PreprintMeta, PublicationRecord }
export { getPublicationCategory }

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
  preprintServer?: string
  preprintId?: string
  preprintUrl?: string
  authors?: string[]
  abstract?: string
  image?: string
  date?: string
  type?: string
  publisher?: string
  pdfUrl?: string
  badges?: string[]
}

const ARXIV_DOI_PREFIX = "10.48550/arxiv."

const GENERIC_PREPRINT_VENUES = new Set([
  "",
  "preprint",
  "working paper",
  "posted content",
  "unspecified venue",
  "publication",
  "arxiv preprint",
])

type PreprintServerRule = {
  server: string
  doiPrefixes?: readonly string[]
  hostPatterns?: readonly string[]
  venuePatterns?: readonly string[]
  extract?: (doi: string, url: string) => { id?: string; url?: string; version?: string; pdfUrl?: string }
}

const PREPRINT_SERVER_RULES: readonly PreprintServerRule[] = [
  {
    server: "arXiv",
    doiPrefixes: [ARXIV_DOI_PREFIX],
    hostPatterns: ["arxiv.org/"],
    venuePatterns: ["arxiv"],
    extract: (doi, url) => {
      const id = extractArxivId(doi, url)
      if (!id) return {}
      return {
        id,
        url: `https://arxiv.org/abs/${id}`,
        pdfUrl: `https://arxiv.org/pdf/${id}`,
      }
    },
  },
  {
    server: "Preprints.org",
    doiPrefixes: ["10.20944/preprints"],
    hostPatterns: ["preprints.org/"],
    venuePatterns: ["preprints.org"],
    extract: (doi, url) => {
      const doiMatch = doi.trim().match(/^10\.20944\/preprints([0-9.]+?)(?:\.(v\d+))?$/i)
      if (doiMatch) {
        const baseId = doiMatch[1]
        const version = doiMatch[2]?.toLowerCase()
        const id = version ? `${baseId}.${version}` : baseId
        const manuscriptUrl = version
          ? `https://www.preprints.org/manuscript/${baseId}/${version}`
          : `https://www.preprints.org/manuscript/${baseId}`
        return { id, version, url: manuscriptUrl }
      }
      const urlMatch = url.match(/preprints\.org\/manuscript\/([^/?#]+)(?:\/(v\d+))?/i)
      if (urlMatch) {
        const baseId = urlMatch[1]
        const version = urlMatch[2]?.toLowerCase()
        return {
          id: version ? `${baseId}.${version}` : baseId,
          version,
          url,
        }
      }
      return {}
    },
  },
  {
    server: "Optica Open",
    doiPrefixes: ["10.1364/opticaopen"],
    hostPatterns: ["preprints.opticaopen.org", "opticaopen.org"],
    venuePatterns: ["optica open"],
    extract: (doi) => {
      const m = doi.trim().match(/^10\.1364\/opticaopen\.(.+)$/i)
      return m ? { id: m[1] } : {}
    },
  },
  {
    server: "TechRxiv",
    doiPrefixes: ["10.36227/techrxiv"],
    hostPatterns: ["techrxiv.org"],
    venuePatterns: ["techrxiv"],
    extract: (doi) => {
      const m = doi.trim().match(/^10\.36227\/(techrxiv\.[^/]+)$/i)
      return m ? { id: m[1] } : {}
    },
  },
  {
    server: "medRxiv",
    doiPrefixes: [],
    hostPatterns: ["medrxiv.org"],
    venuePatterns: ["medrxiv"],
    extract: (doi) => {
      const m = doi.trim().match(/^10\.1101\/(.+)$/i)
      return m ? { id: m[1] } : {}
    },
  },
  {
    server: "bioRxiv",
    doiPrefixes: ["10.1101/"],
    hostPatterns: ["biorxiv.org"],
    venuePatterns: ["biorxiv"],
    extract: (doi) => {
      const m = doi.trim().match(/^10\.1101\/(.+)$/i)
      return m ? { id: m[1] } : {}
    },
  },
  {
    server: "chemRxiv",
    doiPrefixes: ["10.26434/chemrxiv"],
    hostPatterns: ["chemrxiv.org"],
    venuePatterns: ["chemrxiv"],
    extract: (doi) => {
      const m = doi.trim().match(/^10\.26434\/(chemrxiv-.+)$/i)
      return m ? { id: m[1] } : {}
    },
  },
  {
    server: "Research Square",
    doiPrefixes: ["10.21203/rs."],
    hostPatterns: ["researchsquare.com"],
    venuePatterns: ["research square"],
    extract: (doi) => {
      const m = doi.trim().match(/^10\.21203\/(rs\.[^/]+)$/i)
      return m ? { id: m[1] } : {}
    },
  },
  {
    server: "PsyArXiv",
    doiPrefixes: ["10.31234/"],
    venuePatterns: ["psyarxiv"],
  },
  {
    server: "SocArXiv",
    doiPrefixes: ["10.31235/"],
    venuePatterns: ["socarxiv"],
  },
  {
    server: "EarthArXiv",
    doiPrefixes: ["10.31223/"],
    venuePatterns: ["eartharxiv"],
  },
  {
    server: "OSF Preprints",
    doiPrefixes: ["10.31219/"],
    hostPatterns: ["osf.io/preprints", "osf.io/"],
    venuePatterns: ["osf preprints"],
  },
  {
    server: "SSRN",
    doiPrefixes: ["10.2139/ssrn."],
    hostPatterns: ["ssrn.com"],
    venuePatterns: ["ssrn"],
    extract: (doi) => {
      const m = doi.trim().match(/^10\.2139\/ssrn\.(\d+)$/i)
      return m ? { id: m[1] } : {}
    },
  },
  {
    server: "HAL",
    hostPatterns: ["hal.science", "hal.archives-ouvertes.fr"],
    venuePatterns: ["hal"],
  },
]

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

  for (const marker of ["/abs/", "/pdf/"]) {
    const markerIndex = url.indexOf(marker)
    if (markerIndex >= 0 && url.toLowerCase().includes("arxiv.org")) {
      return url.slice(markerIndex + marker.length).replace(/\.pdf$/i, "").trim() || undefined
    }
  }

  return undefined
}

function resolvePreprintInfo(input: {
  doi?: string
  url?: string
  venue?: string
  arxiv?: string
  type?: string
  preprintServer?: string
  preprintId?: string
  preprintUrl?: string
}): { isPreprint: boolean; preprint?: PreprintMeta; inferredPdfUrl?: string } {
  const doi = (input.doi ?? "").trim()
  const lowerDoi = doi.toLowerCase()
  const url = (input.url ?? "").trim()
  const lowerUrl = url.toLowerCase()
  const rawVenue = (input.venue ?? "").trim()
  const lowerVenue = rawVenue.toLowerCase()
  const explicitArxiv = (input.arxiv ?? "").trim() || extractArxivId(doi, url)

  let matchedRule: PreprintServerRule | undefined
  for (const rule of PREPRINT_SERVER_RULES) {
    if (rule.server === "arXiv" && explicitArxiv) {
      matchedRule = rule
      break
    }
    if (rule.doiPrefixes?.some((prefix) => lowerDoi.startsWith(prefix))) {
      matchedRule = rule
      break
    }
    if (rule.hostPatterns?.some((host) => lowerUrl.includes(host))) {
      matchedRule = rule
      break
    }
    if (rule.venuePatterns?.some((pat) => lowerVenue.includes(pat))) {
      matchedRule = rule
      break
    }
  }

  const isPrimaryArxiv = Boolean(
    explicitArxiv && (!doi || lowerDoi.startsWith(ARXIV_DOI_PREFIX)),
  )

  const isPreprint = Boolean(
    input.type === "preprint" ||
      input.type === "working-paper" ||
      input.type === "posted-content" ||
      isPrimaryArxiv ||
      lowerVenue.includes("preprint") ||
      lowerVenue.includes("working paper") ||
      lowerVenue.includes("posted content") ||
      (matchedRule && matchedRule.server !== "arXiv"),
  )

  if (!matchedRule && !isPreprint && !explicitArxiv) {
    return { isPreprint: false }
  }

  // Published papers with an arXiv companion copy preserve `preprint` metadata for the chip,
  // while `isPreprint` remains false so they remain categorized under published articles.
  const extracted =
    matchedRule?.server === "arXiv" && explicitArxiv
      ? {
          id: explicitArxiv,
          url: `https://arxiv.org/abs/${explicitArxiv}`,
          pdfUrl: `https://arxiv.org/pdf/${explicitArxiv}`,
        }
      : matchedRule?.extract?.(doi, url) ?? {}

  const server =
    (input.preprintServer ?? "").trim() ||
    matchedRule?.server ||
    (!GENERIC_PREPRINT_VENUES.has(lowerVenue) ? rawVenue : "Preprint")

  const resolvedId = (input.preprintId ?? "").trim() || extracted.id
  const resolvedUrl =
    (input.preprintUrl ?? "").trim() ||
    extracted.url ||
    (url || (doi ? `https://doi.org/${doi}` : undefined))

  return {
    isPreprint,
    preprint: server
      ? {
          server,
          id: resolvedId,
          url: resolvedUrl,
          version: extracted.version,
        }
      : undefined,
    inferredPdfUrl: extracted.pdfUrl,
  }
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
  preprint?: PreprintMeta
  isPreprint: boolean
  bibtexKey?: string
  primaryClass?: string
}): string {
  const key = publication.bibtexKey ?? createBibtexKey(publication.title, publication.year)
  const isArxivPreprint = publication.isPreprint && Boolean(publication.arxiv)
  const entryType = isArxivPreprint ? "unpublished" : publication.isPreprint ? "misc" : "article"
  const howpublished =
    publication.isPreprint && !isArxivPreprint
      ? publication.preprint?.server || publication.venue || "Preprint"
      : undefined
  const fields = [
    ["title", `{${escapeBibtex(publication.title)}}`],
    publication.authors.length > 0
      ? ["author", `{${publication.authors.map(toBibtexAuthor).join(" and ")}}`]
      : undefined,
    !publication.isPreprint && publication.venue ? ["journal", `{${publication.venue}}`] : undefined,
    howpublished ? ["howpublished", `{${howpublished}}`] : undefined,
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
  preprint?: PreprintMeta
  isPreprint: boolean
  bibtexKey?: string
}): string {
  const key = publication.bibtexKey ?? createBibtexKey(publication.title, publication.year)
  const lowerVenue = publication.venue.toLowerCase()
  const isConf =
    !publication.isPreprint &&
    (lowerVenue.includes("proc") || lowerVenue.includes("conf") || lowerVenue.includes("symp"))
  const risType = publication.isPreprint ? "UNPB" : isConf ? "CONF" : "JOUR"

  const lines: string[] = [
    `TY  - ${risType}`,
    `T1  - ${escapeBibtex(publication.title)}`,
  ]

  publication.authors.forEach((author) => {
    lines.push(`AU  - ${toBibtexAuthor(author)}`)
  })

  if (publication.isPreprint) {
    const serverLabel = publication.preprint?.server || publication.venue || "Preprint"
    lines.push(`PB  - ${serverLabel}`)
  } else {
    const joValue = publication.venue || (publication.arxiv ? `arXiv:${publication.arxiv}` : "Publication")
    lines.push(`JO  - ${joValue}`)
  }

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

export const loadPublications = cache(async (): Promise<PublicationRecord[]> => {
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
        const rawArxiv = (item.arxiv ?? "").trim() || extractArxivId(doi ?? "", url ?? "")

        const overrideEntry = Object.entries(publicationOverrides).find(([key, val]) => {
          return (
            key === rawArxiv ||
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
        const rawVenue = (item.venue ?? item.publisher ?? "").trim()
        const preprintInfo = resolvePreprintInfo({
          doi,
          url,
          venue: rawVenue,
          arxiv: rawArxiv,
          type: item.type,
          preprintServer: item.preprintServer,
          preprintId: item.preprintId,
          preprintUrl: item.preprintUrl,
        })
        const isPreprint = preprintInfo.isPreprint
        const venue =
          isPreprint && GENERIC_PREPRINT_VENUES.has(rawVenue.toLowerCase())
            ? preprintInfo.preprint?.server || "Preprint"
            : rawVenue || preprintInfo.preprint?.server || "Publication"
        const arxiv =
          rawArxiv ||
          (preprintInfo.preprint?.server === "arXiv" ? preprintInfo.preprint.id : undefined)

        const authors = item.authors && item.authors.length > 0 ? item.authors : override?.authors ?? []
        const badges = Array.from(new Set([...(item.badges ?? []), ...(override?.badges ?? [])]))
        const pdfUrl =
          (item.pdfUrl ?? override?.pdfUrl ?? "").trim() ||
          (isPreprint ? preprintInfo.inferredPdfUrl : undefined)

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
          preprint: preprintInfo.preprint,
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
            preprint: preprintInfo.preprint,
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
            preprint: preprintInfo.preprint,
            isPreprint,
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
})

/**
 * Rank publications by citation count (OpenAlex metric) with fallback to natural order.
 */
export function rankPublications(
  publications: PublicationRecord[],
  paperMetrics: { papers: Record<string, { cited_by_count?: number; openalex_id?: string; title?: string }> },
): PublicationRecord[] {
  const byTitleKey = new Map<string, number>()
  const metricValues = Object.values(paperMetrics.papers)

  for (const m of metricValues) {
    if (m.title && typeof m.cited_by_count === "number") {
      byTitleKey.set(m.title.toLowerCase().replace(/[^a-z0-9]/g, ""), m.cited_by_count)
    }
  }

  const getCitations = (pub: PublicationRecord): number => {
    const direct = paperMetrics.papers[pub.id]
    if (direct && typeof direct.cited_by_count === "number") {
      return direct.cited_by_count
    }
    if (pub.doi) {
      const doiLower = pub.doi.toLowerCase()
      const byDoi = metricValues.find((m) => m.openalex_id?.toLowerCase().includes(doiLower))
      if (byDoi && typeof byDoi.cited_by_count === "number") {
        return byDoi.cited_by_count
      }
    }
    if (pub.title) {
      const titleKey = pub.title.toLowerCase().replace(/[^a-z0-9]/g, "")
      const byTitle = byTitleKey.get(titleKey)
      if (typeof byTitle === "number") {
        return byTitle
      }
    }
    return -1
  }

  const citationMap = new Map(publications.map((pub) => [pub.id, getCitations(pub)]))

  return [...publications].sort((a, b) => {
    const ca = citationMap.get(a.id) ?? -1
    const cb = citationMap.get(b.id) ?? -1
    return cb - ca
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
