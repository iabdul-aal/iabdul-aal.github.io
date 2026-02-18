import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type JourneyAction = {
  href: string
  label: string
  variant?: "default" | "outline" | "ghost"
}

type JourneySectionProps = {
  title: string
  description: string
  actions: JourneyAction[]
}

export function JourneySection({ title, description, actions }: JourneySectionProps) {
  return (
    <section className="py-20 bg-card border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-5">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {actions.map((action, index) => (
            <Button
              key={action.href + action.label}
              asChild
              size="lg"
              variant={action.variant ?? (index === 0 ? "default" : "outline")}
              className="w-full sm:w-auto"
            >
              <Link href={action.href}>
                {action.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
