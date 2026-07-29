import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "chip"
  asChild?: boolean
}

export function Trigger({ className, variant = "secondary", asChild = false, ...props }: TriggerProps) {
  const Comp = asChild ? Slot : "button"
  const variantClass =
    variant === "primary"
      ? "trigger-primary"
      : variant === "chip"
      ? "trigger-secondary-chip"
      : "trigger-secondary"

  return <Comp className={cn(variantClass, className)} {...props} />
}
