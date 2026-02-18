import type { LucideIcon } from "lucide-react"
import { BookOpenText, FileSearch, FileText, FlaskConical, Github, Linkedin } from "lucide-react"
import { professionalSocialProfiles, type ProfessionalSocialProfileKey } from "@/lib/social-links"
import { cn } from "@/lib/utils"

const iconMap: Record<ProfessionalSocialProfileKey, LucideIcon> = {
  linkedin: Linkedin,
  github: Github,
  orcid: BookOpenText,
  scholar: BookOpenText,
  semanticScholar: FileSearch,
  researchGate: FlaskConical,
  medium: FileText,
  arxiv: FileText,
}

type SocialProfileGridProps = {
  className?: string
}

export function SocialProfileGrid({ className }: SocialProfileGridProps) {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 gap-3", className)}>
      {professionalSocialProfiles.map((profile) => {
        const Icon = iconMap[profile.key]
        return (
          <a
            key={profile.key}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg border border-border bg-card hover:border-accent transition-colors text-sm font-semibold text-left"
            aria-label={profile.name}
            title={profile.name}
          >
            <span className="inline-flex items-center gap-2">
              <Icon className="w-4 h-4 text-accent" />
              <span>{profile.name}</span>
            </span>
          </a>
        )
      })}
    </div>
  )
}

type SocialProfileIconRowProps = {
  className?: string
  limit?: number
}

export function SocialProfileIconRow({ className, limit = 6 }: SocialProfileIconRowProps) {
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {professionalSocialProfiles.slice(0, limit).map((profile) => {
        const Icon = iconMap[profile.key]
        return (
          <a
            key={profile.key}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
            aria-label={profile.name}
            title={profile.name}
          >
            <Icon className="w-5 h-5" />
          </a>
        )
      })}
    </div>
  )
}
