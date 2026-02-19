import Link from "next/link"
import { JourneySection } from "@/components/journey-section"
import { ArrowRight, BookOpenText, FileText, LayoutTemplate, Route } from "lucide-react"

export const metadata = {
  title: "Materials | Islam Abdulaal",
  description: "Slides, summaries, and learning roadmaps for integrated photonics and related research skills.",
}

export default function MaterialsPage() {
  const collections = [
    {
      title: "Presentation Slides",
      description:
        "Concise visual decks covering integrated photonics fundamentals, device-level intuition, and system-level framing.",
      icon: LayoutTemplate,
      href: "/materials/slides",
      tags: ["Concept visuals", "Teaching-friendly", "Updated periodically"],
    },
    {
      title: "Technical Summaries",
      description:
        "Short technical briefs extracting key ideas from papers, methods, and simulation workflows in photonics research.",
      icon: FileText,
      href: "/materials/summaries",
      tags: ["Paper digestion", "Method notes", "Research acceleration"],
    },
    {
      title: "Learning Roadmaps",
      description:
        "Step-by-step progression paths for students moving from theory to practical photonic design and experimentation.",
      icon: Route,
      href: "/materials/roadmaps",
      tags: ["Beginner to advanced", "Tool progression", "Project checkpoints"],
    },
  ]

  const summaryStats = [
    { label: "Collections", value: String(collections.length) },
    { label: "Audience", value: "Students & Researchers" },
    { label: "Coverage", value: "Theory to Practice" },
    { label: "Updates", value: "Periodic" },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="min-h-[50vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Materials</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Practical educational resources designed to make integrated photonics and research execution easier to
              learn.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {summaryStats.map((item) => (
              <article key={item.label} className="p-4 rounded-xl border border-border bg-card/40">
                <p className="text-lg font-bold leading-none">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-2">{item.label}</p>
              </article>
            ))}
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-12">Resource Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection) => {
              const Icon = collection.icon
              return (
                <article
                  key={collection.title}
                  className="p-7 rounded-xl border border-border bg-card hover:border-accent transition-colors flex flex-col"
                >
                  <Icon className="w-8 h-8 text-accent mb-5" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{collection.title}</h3>
                  <p className="text-muted-foreground text-sm mb-5 flex-grow">{collection.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {collection.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded text-xs bg-background text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={collection.href} className="text-sm text-accent inline-flex items-center gap-2">
                    Open Collection
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpenText className="w-10 h-10 text-accent mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-foreground mb-6">Designed for Students and Early Researchers</h2>
          <p className="text-lg text-muted-foreground mb-0">
            Materials focus on clarity, progressive depth, and direct usefulness for coursework, projects, and research
            onboarding.
          </p>
        </div>
      </section>

      <JourneySection
        title="Turn Learning Into Action"
        description="After reviewing materials, continue with mentorship support, topic requests, or article deep-dives."
        actions={[
          { href: "/mentorship", label: "Ask for Mentorship" },
          { href: "/contact", label: "Request Specific Material", variant: "outline" },
          { href: "/articles", label: "Read Related Articles", variant: "ghost" },
        ]}
      />
    </main>
  )
}
