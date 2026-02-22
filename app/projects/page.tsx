import { PageHero } from "@/components/page-hero"
import { ProjectsStack } from "@/components/projects-stack"
import { getGitHubRepositories } from "@/lib/github-repos"
import { socialLinks } from "@/lib/social-links"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Project portfolio from GitHub repositories across photonics, engineering workflows, and applied technical experiments.",
  path: "/projects",
})

export default async function ProjectsPage() {
  const repositories = await getGitHubRepositories(60)

  return (
    <main className="bg-background text-foreground">
      <PageHero
        kicker="Projects"
        title="Projects and Repositories"
        description="A repository-level view of my technical portfolio, synced from GitHub and structured for quick browsing."
        actions={[
          { label: "Visit GitHub", href: socialLinks.github, external: true },
          { label: "Discuss a Project", href: "/contact", variant: "outline" },
        ]}
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold">Project Stack</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Use search and filters at the top, then browse full-width repository blocks below.
            </p>
          </div>
          <ProjectsStack repositories={repositories} />
        </div>
      </section>
    </main>
  )
}
