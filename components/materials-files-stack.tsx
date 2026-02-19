"use client"

import { useMemo, useState } from "react"
import { ArrowRight, CalendarDays } from "lucide-react"
import type { MaterialAsset } from "@/lib/materials-library"

const ALL_TYPES = "All file types"

type MaterialsFilesStackProps = {
  assets: MaterialAsset[]
}

export function MaterialsFilesStack({ assets }: MaterialsFilesStackProps) {
  const [query, setQuery] = useState("")
  const [fileType, setFileType] = useState(ALL_TYPES)

  const typeOptions = useMemo(
    () => [ALL_TYPES, ...Array.from(new Set(assets.map((asset) => asset.extension))).sort((a, b) => a.localeCompare(b))],
    [assets],
  )

  const filteredAssets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return assets.filter((asset) => {
      const matchesType = fileType === ALL_TYPES || asset.extension === fileType
      if (!matchesType) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      const searchable = `${asset.displayName} ${asset.fileName} ${asset.extension} ${asset.updatedAt}`.toLowerCase()
      return searchable.includes(normalizedQuery)
    })
  }, [assets, query, fileType])

  const hasFilters = query.trim().length > 0 || fileType !== ALL_TYPES

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-xl border border-border bg-card/60">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent mb-3">Search and Filters</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="File name or keyword"
              className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs text-muted-foreground">File Type</span>
            <select
              value={fileType}
              onChange={(event) => setFileType(event.target.value)}
              className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            >
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {filteredAssets.length} of {assets.length} files shown
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setFileType(ALL_TYPES)
              }}
              className="inline-flex h-9 items-center rounded-md border border-border px-3 text-xs text-accent hover:text-accent/80 hover:border-accent/50 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredAssets.length > 0 ? (
        <div className="space-y-4">
          {filteredAssets.map((asset) => (
            <article
              key={asset.fileName}
              className="group p-4 sm:p-6 rounded-xl border border-border bg-card hover:border-accent/80 hover:bg-card/95 transition-all"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                    {asset.extension}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground md:whitespace-nowrap">
                    <CalendarDays className="w-3.5 h-3.5 text-accent" />
                    Updated {asset.updatedAt}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold leading-snug group-hover:text-accent transition-colors">{asset.displayName}</h2>
                  <p className="text-sm text-muted-foreground mt-2">Size: {asset.sizeLabel}</p>
                </div>

                <div>
                  <a
                    href={asset.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                  >
                    Open File <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <article className="p-6 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground">No files match the selected filters yet.</p>
        </article>
      )}
    </div>
  )
}
