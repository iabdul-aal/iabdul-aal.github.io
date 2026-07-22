"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { Project } from "@/lib/academic-content"
import { Badge } from "@/components/ui/badge"
import { Row } from "@/components/ui/row"
import { useLanguage } from "@/lib/i18n-context"

export interface ProjectCardProps {
  project: Project
  tier?: "major" | "minor"
  compact?: boolean
}

const germanProjectTranslations: Record<
  string,
  { objective?: string; methods?: string; status?: string }
> = {
  "nanophotonet-mpm": {
    status: "In Begutachtung",
    objective:
      "Ein physikinformierter neuronaler Ersatz-Framework zur Kombination von EigenmodeDeepONet-Transversaleigensolver, deterministischer Physikschicht und CWE-PINN-Propagator für das Inversdesign modal phasenangepasster Biphotonen-Quantenlichtquellen in anisotropen NbOCl2-Wellenleitern.",
    methods:
      "Physikinformierte neuronale Netze (PINNs), DeepOperator Networks (DeepONet), gekoppelte Wellengleichungen, Finite-Differenzen-Eigenmoden-Solver (FDE) und genetische Algorithmen.",
  },
  "fbg-coupled-mode-solver": {
    status: "Veröffentlicht / Open Source",
    objective:
      "Transfersystem- und Kopplungswellenmodelle für Faser-Bragg-Gitter (FBG) zur schnellen Auslegung optischer Sensoren.",
    methods: "Gekoppelte Modentheorie (CMT), Transfer-Matrix-Methode (TMM) und FDTD-Validierung.",
  },
}

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"

  const deTrans = isDe ? germanProjectTranslations[project.id] : undefined
  const objective = deTrans?.objective || project.objective
  const methods = deTrans?.methods || project.methods
  const status = deTrans?.status || project.status

  return (
    <Row aria-label={project.title}>
      <div className="space-y-1.5 w-full">
        {/* Title */}
        <h3 className="text-sm font-semibold text-foreground leading-snug break-words w-full">
          {project.title}
        </h3>

        {/* Status Badge & Year */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          <span className="text-muted-foreground">{project.year}</span>
          {status && <Badge variant="invited">{status}</Badge>}
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
