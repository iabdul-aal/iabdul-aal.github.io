import { socialLinks } from "@/lib/social-links"

type GitHubApiRepo = {
  name?: string
  html_url?: string
  description?: string | null
  homepage?: string | null
  language?: string | null
  topics?: string[]
  stargazers_count?: number
  forks_count?: number
  updated_at?: string
  private?: boolean
  archived?: boolean
  fork?: boolean
}

const EXCLUDED_REPOSITORY_NAMES = new Set(["iabdul-aal", "iabdul-aal.github.io"])

export type GitHubRepository = {
  name: string
  url: string
  description: string
  homepage: string
  language: string
  topics: string[]
  stars: number
  forks: number
  updatedAt: string
  updatedAtIso: string
  isArchived: boolean
  isFork: boolean
}

function extractGitHubUsername(profileUrl: string): string {
  try {
    const url = new URL(profileUrl)
    return url.pathname.split("/").filter(Boolean)[0] ?? ""
  } catch {
    return ""
  }
}

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return "Date not listed"
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

function normalizeRepo(repo: GitHubApiRepo): GitHubRepository | null {
  const name = (repo.name ?? "").trim()
  const url = (repo.html_url ?? "").trim()
  const normalizedName = name.toLowerCase()

  if (!name || !url || repo.private || EXCLUDED_REPOSITORY_NAMES.has(normalizedName)) {
    return null
  }

  const updatedAtIso = (repo.updated_at ?? "").trim()

  return {
    name,
    url,
    description: (repo.description ?? "").trim(),
    homepage: (repo.homepage ?? "").trim(),
    language: (repo.language ?? "").trim(),
    topics: Array.isArray(repo.topics) ? repo.topics.filter(Boolean).slice(0, 6) : [],
    stars: Number(repo.stargazers_count ?? 0),
    forks: Number(repo.forks_count ?? 0),
    updatedAt: formatDate(updatedAtIso),
    updatedAtIso,
    isArchived: Boolean(repo.archived),
    isFork: Boolean(repo.fork),
  }
}

function dateScore(value: string): number {
  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? 0 : parsed
}

export async function getGitHubRepositories(limit = 60): Promise<GitHubRepository[]> {
  const username = extractGitHubUsername(socialLinks.github)
  if (!username) {
    return []
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=public`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "iabdul-aal-website",
        },
        next: { revalidate: 21600 },
      },
    )

    if (!response.ok) {
      return []
    }

    const raw = (await response.json()) as GitHubApiRepo[]
    if (!Array.isArray(raw)) {
      return []
    }

    const normalized = raw.map(normalizeRepo).filter((repo): repo is GitHubRepository => repo !== null)

    const deduped = normalized.filter(
      (repo, index, repos) => repos.findIndex((candidate) => candidate.url === repo.url) === index,
    )

    const sorted = deduped.sort((a, b) => {
      const updatedDiff = dateScore(b.updatedAtIso) - dateScore(a.updatedAtIso)
      if (updatedDiff !== 0) {
        return updatedDiff
      }
      return a.name.localeCompare(b.name)
    })

    return limit > 0 ? sorted.slice(0, limit) : sorted
  } catch {
    return []
  }
}
