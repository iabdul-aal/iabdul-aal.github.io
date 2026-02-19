"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
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

const ALL_TYPES = "All collections"
const ALL_STATES = "Any file state"

const iconMap: Record<MaterialCollectionSlug, typeof LayoutTemplate> = {
  slides: LayoutTemplate,
  summaries: FileText,
  roadmaps: Route,
  templates: FileSpreadsheet,
}

export function MaterialsStack({ items }: MaterialsStackProps) {
  const [query, setQuery] = useState("")
  const [collectionType, setCollectionType] = useState(ALL_TYPES)
  const [fileState, setFileState] = useState(ALL_STATES)

  const typeOptions = useMemo(
    () => [
      { label: ALL_TYPES, value: ALL_TYPES },
      ...items.map((item) => ({ label: item.title, value: item.slug })),
    ],
    [items],
  )

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return items.filter((item) => {
      const matchesType = collectionType === ALL_TYPES || item.slug === collectionType
      const matchesFileState =
        fileState === ALL_STATES ||
        (fileState === "With files" && item.fileCount > 0) ||
        (fileState === "No files yet" && item.fileCount === 0)

      if (!matchesType || !matchesFileState) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      const searchable = `${item.title} ${item.description} ${item.tags.join(" ")}`.toLowerCase()
      return searchable.includes(normalizedQuery)
    })
  }, [items, query, collectionType, fileState])

  const hasFilters =
    query.trim().length > 0 || collectionType !== ALL_TYPES || fileState !== ALL_STATES

  return (
    <div className="space-y-8">
      <div className="p-5 rounded-xl border border-border bg-card/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Collection, method, or keyword"
              className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Collection</span>
            <select
              value={collectionType}
              onChange={(event) => setCollectionType(event.target.value)}
              className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Files</span>
            <select
              value={fileState}
              onChange={(event) => setFileState(event.target.value)}
              className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            >
              {[ALL_STATES, "With files", "No files yet"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {filteredItems.length} of {items.length} collections shown
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setCollectionType(ALL_TYPES)
                setFileState(ALL_STATES)
              }}
              className="text-xs text-accent hover:text-accent/80 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => {
            const Icon = iconMap[item.slug]
            return (
              <article
                key={item.slug}
                className="p-7 rounded-xl border border-border bg-card hover:border-accent transition-colors flex flex-col"
              >
                <Icon className="w-8 h-8 text-accent mb-5" />
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">{item.fileCount} files</span>
                </div>
                <p className="text-muted-foreground text-sm mb-5 flex-grow">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {item.tags.map((tag) => (
                    <span key={`${item.slug}-${tag}`} className="px-2 py-1 rounded text-xs bg-background text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={item.href} className="text-sm text-accent inline-flex items-center gap-2">
                  Open Collection
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </article>
            )
          })}
        </div>
      ) : (
        <article className="p-6 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground">No material collections match the selected filters yet.</p>
        </article>
      )}
    </div>
  )
}
