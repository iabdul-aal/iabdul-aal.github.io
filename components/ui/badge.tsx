import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "published" | "preprint" | "invited" | "custom"
}

export function Badge({ className, variant = "custom", children, ...props }: BadgeProps) {
  const variantStyles = {
    published: "bg-accent/10 text-accent ring-accent/20",
    preprint: "bg-muted text-muted-foreground ring-border",
    invited: "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20",
    custom: "bg-secondary text-secondary-foreground ring-border",
  }[variant]

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-inset transition-colors",
        variantStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
