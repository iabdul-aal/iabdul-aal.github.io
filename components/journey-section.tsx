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
  void title
  void description
  void actions
  return null
}
