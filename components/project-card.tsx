"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { Project } from "@/lib/academic-content"
import { Row } from "@/components/ui/row"
import { useLanguage } from "@/lib/i18n-context"

export interface ProjectCardProps {
  project: Project
  tier?: "major" | "minor"
  compact?: boolean
}

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"

  const objective = project.objective
  const methods = project.methods
  const status = project.status

  return (
    <Row aria-label={project.title}>
      <div className="space-y-1.5 w-full">
        {/* Title */}
        <h3 className="text-sm font-semibold text-foreground leading-snug break-words w-full">
          {project.title}
        </h3>

        {/* Status & Year */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          <span className="text-muted-foreground">
            {[status, project.year].filter(Boolean).join(", ")}
          </span>
        </div>

        {/* Objective */}
        <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
          {objective}
        </p>

        {/* Methods (Full view only) */}
        {!compact && methods && (
          <p className="text-xs text-muted-foreground/90 leading-relaxed">
            <span className="font-semibold text-foreground">{t.ui.methods}: </span>
            {methods}
          </p>
        )}
      </div>

      {/* Action Links (Full view only) */}
      {!compact && project.links.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs pt-1">
          {project.links.map((link) => {
            const label =
              isDe
                ? link.label === "Code DOI"
                  ? "Code-DOI"
                  : link.label === "Dataset DOI"
                  ? "Datensatz-DOI"
                  : link.label === "Model DOI"
                  ? "Modell-DOI"
                  : link.label === "Paper"
                  ? "Publikation"
                  : link.label
                : link.label
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                {label}
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            )
          })}
        </div>
      )}
    </Row>
  )
}
