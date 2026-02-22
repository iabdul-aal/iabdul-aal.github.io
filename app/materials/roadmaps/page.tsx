import { MaterialsCollectionView } from "@/components/materials-collection-view"

import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Roadmaps",
  description: "Learning roadmaps from fundamentals to applied photonics and design workflows.",
  path: "/materials/roadmaps",
})

export default function RoadmapsPage() {
  return (
    <MaterialsCollectionView
      slug="roadmaps"
      pageTitle="Learning Roadmaps"
      pageDescription="I map clear learning progressions that move from fundamentals into applied photonics and modeling work."
      journeyTitle="Move From Roadmap to Execution"
      journeyDescription="Continue with mentorship support, full materials navigation, or direct outreach for guidance."
      journeyActions={[
        { href: "/mentorship", label: "Book Mentorship Path" },
        { href: "/materials", label: "Back to Materials", variant: "outline" },
        { href: "/contact", label: "Request Guidance", variant: "ghost" },
      ]}
    />
  )
}
