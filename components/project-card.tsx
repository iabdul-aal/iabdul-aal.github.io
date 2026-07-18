import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { Project } from "@/lib/academic-content"
import { Badge } from "@/components/ui/badge"
import { Row } from "@/components/ui/row"

export interface ProjectCardProps {
  project: Project
  tier?: "major" | "minor"
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Row aria-label={project.title}>
      <div className="space-y-1.5 w-full">
        {/* Full-width Title */}
        <h3 className="text-base font-semibold text-foreground leading-snug break-words w-full">
          {project.title}
        </h3>

        {/* Status Badge & Year */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          <span className="text-muted-foreground">{project.year}</span>
          {project.status && <Badge variant="invited">{project.status}</Badge>}
        </div>

        {/* Objective */}
        <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
          {project.objective}
        </p>

        {/* Methods */}
        {project.methods && (
          <p className="text-xs text-muted-foreground/90 leading-relaxed">
            <span className="font-semibold text-foreground">Methods: </span>
            {project.methods}
          </p>
        )}
      </div>

      {/* Action Links */}
      {project.links.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs pt-1">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              {link.label}
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </Row>
  )
}


