import Link from "next/link"
import { ArrowRight, FileSpreadsheet, FileText, LayoutTemplate, Route } from "lucide-react"
import type { MaterialCollectionSlug } from "@/lib/materials-library"

type MaterialsStackItem = {
  slug: MaterialCollectionSlug
  title: string
  description: string
  href: string
  tags: string[]
  fileCount: number
}

type MaterialsStackProps = {
  items: MaterialsStackItem[]
}

const iconMap: Record<MaterialCollectionSlug, typeof LayoutTemplate> = {
  slides: LayoutTemplate,
  summaries: FileText,
  roadmaps: Route,
  templates: FileSpreadsheet,
}

export function MaterialsStack({ items }: MaterialsStackProps) {
  if (items.length === 0) {
    return (
      <article className="p-6 rounded-xl border border-border bg-card">
        <p className="text-sm text-muted-foreground">No material collections are available right now.</p>
      </article>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const Icon = iconMap[item.slug]
        return (
          <article
            key={item.slug}
            className="group w-full rounded-xl border border-border bg-card p-4 sm:p-6 hover:border-accent/80 hover:bg-card/95 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex items-start gap-4 min-w-0">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/70 bg-background/60 shrink-0">
                  <Icon className="w-5 h-5 text-accent" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={`${item.slug}-${tag}`}
                        className="px-2 py-1 rounded text-xs bg-background text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={item.href} className="text-sm text-accent inline-flex items-center gap-2">
                    Open Collection
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded h-fit md:whitespace-nowrap">
                {item.fileCount} files
              </span>
            </div>
          </article>
        )
      })}
    </div>
  )
}
