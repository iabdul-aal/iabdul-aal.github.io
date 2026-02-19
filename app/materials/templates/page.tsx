import { MaterialsCollectionView } from "@/components/materials-collection-view"

export const metadata = {
  title: "Templates",
}

export default function TemplatesPage() {
  return (
    <MaterialsCollectionView
      slug="templates"
      pageTitle="Templates"
      pageDescription="I keep reusable templates here for reports, project structure, and technical communication."
      journeyTitle="Use Templates With the Full Library"
      journeyDescription="After templates, continue with slides, summaries, or mentorship support."
      journeyActions={[
        { href: "/materials/slides", label: "Open Slides" },
        { href: "/materials/summaries", label: "Read Summaries", variant: "outline" },
        { href: "/mentorship", label: "Get Mentorship", variant: "ghost" },
      ]}
    />
  )
}
