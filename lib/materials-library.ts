import { readdir, stat } from "node:fs/promises"
import { extname, join } from "node:path"

export type MaterialCollectionSlug = "slides" | "summaries" | "roadmaps" | "templates"

export type MaterialCollection = {
  slug: MaterialCollectionSlug
  title: string
  description: string
  href: string
  uploadPath: string
  tags: string[]
}

export type MaterialAsset = {
  fileName: string
  displayName: string
  href: string
  extension: string
  sizeLabel: string
  updatedAt: string
}

type MaterialAssetWithEpoch = MaterialAsset & {
  updatedAtEpoch: number
}

const MATERIALS_ROOT = join(process.cwd(), "public", "materials")

const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".ppt",
  ".pptx",
  ".doc",
  ".docx",
  ".xlsx",
  ".csv",
  ".zip",
  ".md",
  ".txt",
])

const collectionConfig: MaterialCollection[] = [
  {
    slug: "slides",
    title: "Presentation Slides",
    description:
      "I use this collection for lecture decks, workshop presentations, and visual explainers.",
    href: "/materials/slides",
    uploadPath: "/public/materials/slides/",
    tags: ["Lecture decks", "Workshop slides", "Visual explainers"],
  },
  {
    slug: "summaries",
    title: "Technical Summaries",
    description:
      "I publish concise summaries that turn dense papers and methods into practical notes.",
    href: "/materials/summaries",
    uploadPath: "/public/materials/summaries/",
    tags: ["Paper summaries", "Method notes", "Research workflows"],
  },
  {
    slug: "roadmaps",
    title: "Learning Roadmaps",
    description:
      "I map structured study paths from fundamentals to hands-on photonics and modeling practice.",
    href: "/materials/roadmaps",
    uploadPath: "/public/materials/roadmaps/",
    tags: ["Progression plans", "Milestones", "Project readiness"],
  },
  {
    slug: "templates",
    title: "Templates",
    description:
      "I keep reusable templates here for reporting, presentation structure, and technical documentation.",
    href: "/materials/templates",
    uploadPath: "/public/materials/templates/",
    tags: ["Report templates", "Slide structures", "Documentation assets"],
  },
]

function formatBytes(size: number): string {
  if (size < 1024) {
    return `${size} B`
  }

  const units = ["KB", "MB", "GB"]
  let value = size / 1024
  let unitIndex = 0

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

function toDisplayName(fileName: string): string {
  const withoutExtension = fileName.replace(/\.[^.]+$/, "")
  return withoutExtension
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function getMaterialCollections(): MaterialCollection[] {
  return collectionConfig
}

export function getMaterialCollection(slug: MaterialCollectionSlug): MaterialCollection | null {
  return collectionConfig.find((item) => item.slug === slug) ?? null
}

export async function getCollectionAssets(slug: MaterialCollectionSlug): Promise<MaterialAsset[]> {
  const folderPath = join(MATERIALS_ROOT, slug)

  let entries
  try {
    entries = await readdir(folderPath, { withFileTypes: true })
  } catch {
    return []
  }

  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name !== ".gitkeep" && name !== "README.md")

  const assets = await Promise.all(
    files.map(async (fileName) => {
      const extension = extname(fileName).toLowerCase()
      if (!ALLOWED_EXTENSIONS.has(extension)) {
        return null
      }

      const filePath = join(folderPath, fileName)
      const fileStat = await stat(filePath)

      return {
        fileName,
        displayName: toDisplayName(fileName) || fileName,
        href: `/materials/${slug}/${encodeURIComponent(fileName)}`,
        extension: extension.replace(".", "").toUpperCase(),
        sizeLabel: formatBytes(fileStat.size),
        updatedAt: formatDate(fileStat.mtime),
        updatedAtEpoch: fileStat.mtimeMs,
      } satisfies MaterialAssetWithEpoch
    }),
  )

  return assets
    .filter((item): item is MaterialAssetWithEpoch => item !== null)
    .sort((a, b) => {
      if (a.updatedAtEpoch === b.updatedAtEpoch) {
        return a.displayName.localeCompare(b.displayName)
      }
      return b.updatedAtEpoch - a.updatedAtEpoch
    })
    .map(({ updatedAtEpoch: _updatedAtEpoch, ...asset }) => asset)
}

export async function getMaterialsOverview() {
  const collections = getMaterialCollections()

  const withAssets = await Promise.all(
    collections.map(async (collection) => ({
      collection,
      assets: await getCollectionAssets(collection.slug),
    })),
  )

  const totalAssets = withAssets.reduce((acc, item) => acc + item.assets.length, 0)

  return {
    collections: withAssets,
    totalAssets,
  }
}
