"use client"

import { useState } from "react"
import { CalendarClock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

type MeetingBookingPanelProps = {
  bookingUrl: string
}

export function MeetingBookingPanel({ bookingUrl }: MeetingBookingPanelProps) {
  const [showEmbed, setShowEmbed] = useState(false)

  return (
    <article id="meeting-booking" className="rounded-xl border border-border bg-card p-8">
      <h2 className="font-display text-3xl md:text-4xl">Meeting Booking</h2>
      <p className="mt-3 text-muted-foreground">
        Use booking when a live discussion will move the work forward faster than email.
      </p>

      <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
        <div className="rounded-xl border border-border bg-background/40 p-4">
          Best for scoped collaboration discussions, project reviews, and mentorship sessions.
        </div>
        <div className="rounded-xl border border-border bg-background/40 p-4">
          Include your objective and current stage in the booking notes before confirming.
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Open Booking Page
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        {!showEmbed && (
          <Button type="button" variant="outline" onClick={() => setShowEmbed(true)}>
            <CalendarClock className="h-4 w-4" />
            Load Embedded Calendar
          </Button>
        )}
      </div>

      {showEmbed ? (
        <div className="mt-6 h-[760px] overflow-hidden rounded-xl border border-border">
          <iframe
            src={`${bookingUrl}?hide_gdpr_banner=1`}
            title="Meeting booking calendar"
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-background/30 p-6 text-sm text-muted-foreground">
          The embedded calendar is loaded only on request to keep the page lighter and avoid third-party requests by
          default.
        </div>
      )}
    </article>
  )
}
