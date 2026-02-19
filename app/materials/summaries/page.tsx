import { MaterialsCollectionView } from "@/components/materials-collection-view"

export const metadata = {
  title: "Summaries | Materials | Islam Abdulaal",
}

export default function SummariesPage() {
  return (
    <MaterialsCollectionView
      slug="summaries"
      pageTitle="Technical Summaries"
      pageDescription="I publish concise technical summaries to help students and researchers move faster with more clarity."
      journeyTitle="Continue the Research Workflow"
      journeyDescription="Move from summaries to practical roadmaps, full materials navigation, or direct discussion."
      journeyActions={[
        { href: "/materials/roadmaps", label: "Go to Roadmaps" },
        { href: "/materials", label: "Back to Materials", variant: "outline" },
        { href: "/contact", label: "Discuss a Topic", variant: "ghost" },
      ]}
    />
  )
}
