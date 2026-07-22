import * as React from "react"

export interface YearGroupHeaderProps {
  year: string
  count?: number
}

export function YearGroupHeader({ year, count }: YearGroupHeaderProps) {
  return (
    <h2 className="year-header">
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        {year}
      </span>
      {count !== undefined && (
        <span className="text-xs font-normal text-muted-foreground">
          {count} {count === 1 ? "item" : "items"}
        </span>
      )}
    </h2>
  )
}
