import * as React from "react"

export interface EmptyStateProps {
  message?: string
}

export function EmptyState({ message = "Items will appear as they are published." }: EmptyStateProps) {
  return (
    <div className="py-8 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}
