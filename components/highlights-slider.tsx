"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import type { HighlightItem } from "@/lib/highlights"
import { Button } from "@/components/ui/button"

interface HighlightsSliderProps {
  items: HighlightItem[]
  intervalMs?: number
}

function slideIndex(index: number, total: number): number {
  if (total === 0) {
    return 0
  }
  return ((index % total) + total) % total
}

export function HighlightsSlider({ items, intervalMs = 7000 }: HighlightsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const total = items.length

  useEffect(() => {
    if (total < 2 || isPaused) {
      return
    }

    const timer = setInterval(() => {
      setActiveIndex((current) => slideIndex(current + 1, total))
    }, intervalMs)

    return () => clearInterval(timer)
  }, [intervalMs, total, isPaused])

  if (total === 0) {
    return null
  }

  const current = items[slideIndex(activeIndex, total)]
  const canNavigate = total > 1

  return (
    <div
      className="rounded-xl border border-border bg-card/70 p-6 sm:p-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false)
        }
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold">
          {current.category}
        </span>
        <span className="text-xs text-muted-foreground">{current.date}</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-semibold leading-tight">{current.title}</h3>
      <p className="text-sm sm:text-base text-muted-foreground mt-3">{current.description}</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        {current.link ? (
          current.link.startsWith("/") ? (
            <Button asChild variant="outline" size="sm">
              <Link href={current.link}>
                Open Related Page
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm">
              <a href={current.link} target="_blank" rel="noopener noreferrer">
                View Source
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          )
        ) : (
          <span className="text-sm text-muted-foreground">Source not listed</span>
        )}

        <div className="flex items-center gap-2">
          {items.map((item, idx) => (
            <button
              key={`${item.title}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === activeIndex ? "w-6 bg-accent" : "w-3 bg-border"}`}
              aria-label={`Show highlight ${idx + 1}`}
              aria-pressed={idx === activeIndex}
            />
          ))}
        </div>
      </div>

      {canNavigate && (
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveIndex((currentIndex) => slideIndex(currentIndex - 1, total))}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:border-accent transition-colors"
            aria-label="Previous highlight"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((currentIndex) => slideIndex(currentIndex + 1, total))}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:border-accent transition-colors"
            aria-label="Next highlight"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
