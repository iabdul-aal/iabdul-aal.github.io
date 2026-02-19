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
    <section className="py-12 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-xl border border-border bg-card flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">{description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {actions.map((action) => (
              <Button key={`${action.href}-${action.label}`} asChild variant={action.variant ?? "default"} className="w-full sm:w-auto">
                <Link href={action.href}>
                  {action.label}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
