"use client"

import { useEffect, useState } from "react"
import { Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type DetailsPopupProps = {
  title: string
  summary: string
  details?: string[]
  triggerLabel?: string
}

export function DetailsPopup({
  title,
  summary,
  details = [],
  triggerLabel = "More details",
}: DetailsPopupProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <>
      <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Info className="w-4 h-4 mr-1.5" />
        {triggerLabel}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <article
            className="relative w-full max-w-xl rounded-xl border border-border bg-card p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="text-xl font-bold">{title}</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                aria-label="Close details popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{summary}</p>
            {details.length > 0 && (
              <div className="mt-4 space-y-2">
                {details.map((item) => (
                  <p key={item} className="rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm text-muted-foreground">
                    {item}
                  </p>
                ))}
              </div>
            )}
          </article>
        </div>
      )}
    </>
  )
}
