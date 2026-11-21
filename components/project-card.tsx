"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { getLocalizedProject, type Project } from "@/lib/academic-content"
import type { ProjectMetric } from "@/lib/project-metrics"
import { Row } from "@/components/ui/row"
import { ScientificText } from "@/components/ui/scientific-text"
import { useLanguage } from "@/lib/i18n-context"

export interface ProjectCardProps {
  project: Project
  metrics?: ProjectMetric
  compact?: boolean
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

function collectProjectLinks(project: Project, isDe: boolean): ResolvedLink[] {
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

  const { title, status, objective, methods, results } = getLocalizedProject(project, isDe)
  const resolvedLinks = collectProjectLinks(project, isDe)
  const metricsSummary = buildMetricsSummary(metrics, isDe)
  const metaParts = [status, project.year, ...metricsSummary].filter(Boolean)

  return (
    <Row aria-label={title}>
      <div className="space-y-1.5 w-full">
        <h3 className="text-[15px] font-semibold leading-snug text-foreground break-words w-full">
          <ScientificText text={title} />
        </h3>

        {metaParts.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tabular-nums text-muted-foreground">
            <span>{metaParts.join(", ")}</span>
          </div>
        )}

        <p className="text-[13px] leading-relaxed text-pretty text-muted-foreground">
          <ScientificText text={objective} />
        </p>

        {!compact && results && (
          <p className="pt-0.5 text-xs leading-relaxed text-foreground/90">
            <span className="font-semibold text-foreground">
              {isDe ? "Ergebnisse: " : "Verification: "}
            </span>
            <ScientificText text={results} />
          </p>
        )}

        {!compact && methods && (
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">{t.ui.methods}: </span>
            {methods}
          </p>
        )}
      </div>

      {resolvedLinks.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 pt-0.5 text-xs">
          {resolvedLinks.map((link) => (
            <a
              key={`${link.label}-${link.href}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-secondary"
            >
              {link.label}
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      )}
    </Row>
  )
}
