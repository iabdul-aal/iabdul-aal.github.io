import * as React from "react"
import { cn } from "@/lib/utils"

export interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary"
}

export function Shell({ className, variant = "secondary", children, ...props }: ShellProps) {
  const variantClass = variant === "primary" ? "shell-primary" : "shell-secondary"
  return (
    <div className={cn(variantClass, className)} {...props}>
      {children}
    </div>
  )
}
