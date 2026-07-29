import * as React from "react"
import { cn } from "@/lib/utils"

export interface RowProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "standard" | "grid"
  as?: React.ElementType
}

export function Row({ className, variant = "standard", as: Comp = "article", children, ...props }: RowProps) {
  const variantClass = variant === "grid" ? "list-row-grid" : "list-row"
  return (
    <Comp className={cn(variantClass, className)} {...props}>
      {children}
    </Comp>
  )
}
