"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
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
  const [animKey, setAnimKey] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)
  const total = items.length

  useEffect(() => {
    if (total < 2 || isPaused) {
      return
    }

    const timer = setInterval(() => {
      setActiveIndex((current) => slideIndex(current + 1, total))
      setAnimKey((k) => k + 1)
    }, intervalMs)

    return () => clearInterval(timer)
  }, [intervalMs, total, isPaused])

  if (total === 0) {
    return null
  }

  const current = items[slideIndex(activeIndex, total)]
  const canNavigate = total > 1

  const goTo = (idx: number) => {
    setActiveIndex(idx)
    setAnimKey((k) => k + 1)
  }

  return (
    <div
      className="rounded-xl border border-border bg-card/70 p-6 sm:p-8 glow-border"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false)
        }
      }}
    >
      {/* Slide content with crossfade */}
      <div key={`${activeIndex}-${animKey}`} className="animate-crossfade-in">
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
              <Button asChild variant="outline" size="sm" className="group/link">
                <Link href={current.link}>
                  Open Related Page
                  <ExternalLink className="w-4 h-4 ml-2 arrow-slide" />
                </Link>
              </Button>
            ) : (
              <Button asChild variant="outline" size="sm" className="group/link">
                <a href={current.link} target="_blank" rel="noopener noreferrer">
                  View Source
                  <ExternalLink className="w-4 h-4 ml-2 arrow-slide" />
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
                onClick={() => goTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-6 bg-accent" : "w-3 bg-border hover:bg-accent/40"}`}
                aria-label={`Show highlight ${idx + 1}`}
                aria-pressed={idx === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar + navigation */}
      <div className="mt-4 flex items-center gap-3">
        {canNavigate && (
          <>
            <button
              type="button"
              onClick={() => goTo(slideIndex(activeIndex - 1, total))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:border-accent hover:text-accent transition-all duration-200"
              aria-label="Previous highlight"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(slideIndex(activeIndex + 1, total))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:border-accent hover:text-accent transition-all duration-200"
              aria-label="Next highlight"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Auto-progress bar */}
        {canNavigate && !isPaused && (
          <div className="flex-1 h-0.5 bg-border/50 rounded-full overflow-hidden">
            <div
              key={`progress-${animKey}`}
              ref={progressRef}
              className="h-full bg-accent/40 rounded-full progress-bar"
              style={{ animationDuration: `${intervalMs}ms` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
