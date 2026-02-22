import { MaterialsCollectionView } from "@/components/materials-collection-view"

import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Slides",
  description: "Presentation slides for teaching sessions, workshops, and technical explainers.",
  path: "/materials/slides",
})

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
