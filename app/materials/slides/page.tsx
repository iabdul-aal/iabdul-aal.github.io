import { MaterialsCollectionView } from "@/components/materials-collection-view"

export const metadata = {
  title: "Slides",
}

export default function SlidesPage() {
  return (
    <MaterialsCollectionView
      slug="slides"
      pageTitle="Presentation Slides"
      pageDescription="I use this section for teaching decks, workshop sessions, and visual technical explainers."
      journeyTitle="After Slides, What Next?"
      journeyDescription="Continue with summaries, roadmaps, or direct mentorship support based on your stage."
      journeyActions={[
        { href: "/materials/summaries", label: "Read Summaries" },
        { href: "/materials/roadmaps", label: "View Roadmaps", variant: "outline" },
        { href: "/mentorship", label: "Request Mentorship", variant: "ghost" },
      ]}
    />
  )
}
