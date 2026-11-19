export type ProjectTier = "major" | "minor"

export type ProjectLink = {
  readonly label: string
  readonly href: string
}

export type Project = {
  readonly id: string
  readonly title: string
  readonly title_de?: string
  readonly status: string
  readonly status_de?: string
  readonly objective: string
  readonly objective_de?: string
  readonly methods: string
  readonly methods_de?: string
  readonly tools: readonly string[]
  readonly results: string
  readonly results_de?: string
  readonly github?: string
  readonly zenodo?: string
  readonly huggingface?: string
  readonly huggingfaceDataset?: string
  readonly paperDoi?: string
  readonly links: readonly ProjectLink[]
  readonly relatedThemes: readonly string[]
  readonly tier: ProjectTier
  readonly year: string
}
