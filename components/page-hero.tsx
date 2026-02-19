import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type HeroAction = {
  label: string
  href: string
  variant?: "default" | "outline" | "ghost"
  external?: boolean
}

type PageHeroProps = {
  kicker?: string
  title: string
  description: string
  actions?: HeroAction[]
  className?: string
  contentClassName?: string
}

function HeroActionButton({ action }: { action: HeroAction }) {
  const icon = action.external ? <ArrowUpRight className="w-4 h-4 ml-2" /> : <ArrowRight className="w-4 h-4 ml-2" />
  const opensInNewTab = action.href.startsWith("http://") || action.href.startsWith("https://")

  if (action.external) {
    return (
      <Button asChild variant={action.variant ?? "outline"} className="w-full sm:w-auto">
        <a href={action.href} target={opensInNewTab ? "_blank" : undefined} rel={opensInNewTab ? "noopener noreferrer" : undefined}>
          {action.label}
          {icon}
        </a>
      </Button>
    )
  }

  return (
    <Button asChild variant={action.variant ?? "default"} className="w-full sm:w-auto">
      <Link href={action.href}>
        {action.label}
        {icon}
      </Link>
    </Button>
  )
}

export function PageHero({
  kicker,
  title,
  description,
  actions = [],
  className,
  contentClassName,
}: PageHeroProps) {
  return (
    <section className={cn("pt-16 pb-10 md:pt-20 md:pb-12 border-b border-border/70", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-4xl space-y-4", contentClassName)}>
          {kicker && (
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              {kicker}
            </p>
          )}
          <h1 className="font-display text-3xl md:text-5xl leading-tight text-balance">{title}</h1>
          <p className="text-base text-muted-foreground max-w-[68ch] leading-relaxed">{description}</p>
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {actions.map((action) => (
                <HeroActionButton key={`${action.href}-${action.label}`} action={action} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
