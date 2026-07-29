export type ProjectTier = "major" | "minor"

export type ProjectLink = {
  readonly label: string
  readonly href: string
}

export type ProjectType = {
  readonly id: string
  readonly title: string
  readonly status: string
  readonly objective: string
  readonly methods: string
  readonly tools: readonly string[]
  readonly results: string
  readonly links: readonly ProjectLink[]
  readonly relatedThemes: readonly string[]
  readonly tier: ProjectTier
  readonly year: string
}
