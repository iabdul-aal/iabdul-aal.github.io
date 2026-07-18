import { researchThemes, projects } from "./academic-content"
import { loadPublications, PublicationRecord } from "./publications"

export async function getPublicationsForTheme(themeId: string): Promise<PublicationRecord[]> {
  const all = await loadPublications()
  return all.filter((pub) => pub.relatedThemes?.includes(themeId))
}

export function getProjectsForTheme(themeId: string) {
  return projects.filter((project) => {
    const p = project as { readonly relatedThemes: readonly string[]; readonly tier?: string }
    return p.tier !== "minor" && p.relatedThemes?.includes(themeId)
  })
}

export function getThemesForProject(projectRelatedThemes: readonly string[]) {
  return researchThemes.filter((theme) => projectRelatedThemes.includes(theme.id))
}

export async function getPublicationsForProject(projectId: string): Promise<PublicationRecord[]> {
  const all = await loadPublications()
  return all.filter((pub) => pub.relatedProjects?.includes(projectId))
}
