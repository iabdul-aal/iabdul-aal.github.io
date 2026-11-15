"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { Project } from "@/lib/academic-content"
import type { ProjectMetric } from "@/lib/project-metrics"
import { Row } from "@/components/ui/row"
import { ScientificText } from "@/components/ui/scientific-text"
import { useLanguage } from "@/lib/i18n-context"

export interface ProjectCardProps {
  project: Project
  metrics?: ProjectMetric
  tier?: "major" | "minor"
  compact?: boolean
}

type ExtendedProject = Project & {
  github?: string
  zenodo?: string
  huggingface?: string
  huggingfaceDataset?: string
  paperDoi?: string
  title_de?: string
  objective_de?: string
  methods_de?: string
  results_de?: string
}

type ResolvedLink = {
  label: string
  href: string
}

function normalizeHref(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return ""
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed
  }
  return `https://doi.org/${trimmed}`
}

function translateLinkLabel(label: string, isDe: boolean): string {
  if (!isDe) return label
  const map: Record<string, string> = {
    "Code DOI": "Code-DOI",
    "Dataset DOI": "Datensatz-DOI",
    "Model DOI": "Modell-DOI",
    "HuggingFace Dataset": "HuggingFace-Datensatz",
    Dataset: "Datensatz",
    Paper: "Publikation",
    Repository: "Repositorium",
  }
  return map[label] ?? label
}

function collectProjectLinks(project: ExtendedProject, isDe: boolean): ResolvedLink[] {
  const result: ResolvedLink[] = []
  const seen = new Set<string>()

  const push = (label: string, rawHref?: string) => {
    if (!rawHref) return
    const href = normalizeHref(rawHref)
    if (!href || seen.has(href)) return
    seen.add(href)
    result.push({ label: translateLinkLabel(label, isDe), href })
  }

  if (Array.isArray(project.links)) {
    project.links.forEach((lnk) => push(lnk.label, lnk.href))
  }

  push("GitHub", project.github)
  push("Zenodo", project.zenodo)
  push("HuggingFace", project.huggingface)
  push("HuggingFace Dataset", project.huggingfaceDataset)
  push("Paper", project.paperDoi)

  return result
}

function buildMetricsSummary(metrics: ProjectMetric | undefined, isDe: boolean): string[] {
  if (!metrics) return []
  const items: string[] = []
  if (typeof metrics.stars === "number" && metrics.stars > 0) {
    items.push(`${metrics.stars} ${isDe ? "Sterne" : metrics.stars === 1 ? "star" : "stars"}`)
  }
  if (typeof metrics.forks === "number" && metrics.forks > 0) {
    items.push(`${metrics.forks} ${metrics.forks === 1 ? "fork" : "forks"}`)
  }
  const zenodoDownloads = metrics.zenodo?.downloads ?? 0
  if (zenodoDownloads > 0) {
    items.push(`${zenodoDownloads} ${isDe ? "Zenodo-Downloads" : "Zenodo downloads"}`)
  }
  const hfMetric = metrics.huggingface?.downloads
  if (typeof hfMetric === "number" && hfMetric > 0) {
    items.push(`${hfMetric} ${isDe ? "HuggingFace-Downloads" : "HuggingFace downloads"}`)
  }
  return items
}

export function ProjectCard({ project, metrics, compact = false }: ProjectCardProps) {
  const { lang, t } = useLanguage()
  const isDe = lang === "de"
  const ext = project as ExtendedProject

  const title = isDe && ext.title_de ? ext.title_de : project.title
  const objective = isDe && ext.objective_de ? ext.objective_de : project.objective
  const methods = isDe && ext.methods_de ? ext.methods_de : project.methods
  const results = isDe && ext.results_de ? ext.results_de : project.results
  const status = isDe && project.status === "Prerelease" ? "Vorabversion" : project.status

  const resolvedLinks = collectProjectLinks(ext, isDe)
  const metricsSummary = buildMetricsSummary(metrics, isDe)
  const metaParts = [status, project.year, ...metricsSummary].filter(Boolean)

  return (
    <Row aria-label={title}>
      <div className="space-y-1.5 w-full">
        {/* Title */}
        <h3 className="text-sm font-semibold text-foreground leading-snug break-words w-full">
          <ScientificText text={title} />
        </h3>

        {/* Status, Year, and non-zero engagement metadata */}
        {metaParts.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span>{metaParts.join(" · ")}</span>
          </div>
        )}

        {/* Objective */}
        <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
          <ScientificText text={objective} />
        </p>

        {/* Results and Methods (Full view) */}
        {!compact && results && (
          <p className="text-xs text-foreground/85 leading-relaxed">
            <span className="font-semibold text-foreground">
              {isDe ? "Ergebnisse: " : "Verification: "}
            </span>
            <ScientificText text={results} />
          </p>
        )}

        {!compact && methods && (
          <p className="text-xs text-muted-foreground/90 leading-relaxed">
            <span className="font-semibold text-foreground">{t.ui.methods}: </span>
            {methods}
          </p>
        )}
      </div>

      {/* Action Links */}
      {resolvedLinks.length > 0 && (
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs pt-0.5">
          {resolvedLinks.map((link) => (
            <a
              key={`${link.label}-${link.href}`}
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
