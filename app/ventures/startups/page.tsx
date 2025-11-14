import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Startups | Ventures | Islam Abdulaal",
  description: "Startup initiatives and entrepreneurial ventures.",
}

export default function StartupsPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Header */}
      <section className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link href="/ventures" className="text-accent hover:text-accent/80 mb-4 inline-block">
            ← Back to Ventures
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6">Startups</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Early-stage ventures leveraging research for commercial impact.
          </p>
        </div>

        <div className="p-8 rounded-lg border border-border bg-card text-center">
          <p className="text-muted-foreground mb-4">Currently building startup portfolio...</p>
          <Link href="/contact">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Discuss Opportunities</Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
