import * as React from "react"
import { SlidersHorizontal } from "lucide-react"

export interface FilterSelectOption {
  value: string
  label: string
}

export interface FilterSelectProps {
  label?: string
  value: string
  options: FilterSelectOption[]
  onChange: (value: string) => void
  showIcon?: boolean
}

export function FilterSelect({ label, value, options, onChange, showIcon = false }: FilterSelectProps) {
  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="text-muted-foreground font-medium flex items-center gap-1">
          {showIcon && <SlidersHorizontal className="h-3 w-3" aria-hidden="true" />}
          {label}
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-border bg-card px-2 py-1 text-[11px] font-medium text-foreground outline-none transition-colors focus:border-accent"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
