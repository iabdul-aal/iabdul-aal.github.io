import Link from "next/link"

export const metadata = {
  title: "Roadmaps | Materials | Islam Abdulaal",
}

export default function RoadmapsPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/materials" className="text-accent hover:text-accent/80 mb-4 inline-block">
          ← Back to Materials
        </Link>
        <h1 className="text-4xl font-bold mb-4">Learning Roadmaps</h1>
        <p className="text-muted-foreground">Coming soon...</p>
      </section>
    </main>
  )
}
