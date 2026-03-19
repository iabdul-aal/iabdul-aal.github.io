"use client"

import { useState, type FormEvent } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

type ContactEmailFormProps = {
  recipientEmail: string
}

type FormState = {
  name: string
  email: string
  organization: string
  inquiryType: string
  subject: string
  message: string
}

const inquiryTypeOptions = [
  "Research collaboration",
  "Technical service request",
  "Mentorship request",
  "Speaking or workshop invitation",
  "General inquiry",
] as const

const initialState: FormState = {
  name: "",
  email: "",
  organization: "",
  inquiryType: inquiryTypeOptions[0],
  subject: "",
  message: "",
}

export function ContactEmailForm({ recipientEmail }: ContactEmailFormProps) {
  const [formState, setFormState] = useState<FormState>(initialState)

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setFormState((previous) => ({ ...previous, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const inquiryType = formState.inquiryType.trim() || "General inquiry"
    const subject = formState.subject.trim() || `${inquiryType} | Website Contact`
    const bodyLines = [
      `Name: ${formState.name.trim() || "N/A"}`,
      `Email: ${formState.email.trim() || "N/A"}`,
      `Organization: ${formState.organization.trim() || "N/A"}`,
      `Inquiry Type: ${inquiryType}`,
      "",
      "Message:",
      formState.message.trim(),
    ]

    const mailtoHref = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`
    window.location.href = mailtoHref
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="email-form">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">Name</span>
          <input
            type="text"
            required
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="input-focus-glow w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none transition-all"
            placeholder="Your name"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            required
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="input-focus-glow w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none transition-all"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">Organization or Lab</span>
          <input
            type="text"
            value={formState.organization}
            onChange={(event) => updateField("organization", event.target.value)}
            className="input-focus-glow w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none transition-all"
            placeholder="Optional"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Inquiry Type</span>
          <select
            value={formState.inquiryType}
            onChange={(event) => updateField("inquiryType", event.target.value)}
            className="input-focus-glow w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none transition-all"
          >
            {inquiryTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium">Subject</span>
        <input
          type="text"
          value={formState.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          className="input-focus-glow w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none transition-all"
          placeholder="Optional override for the email subject"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium">Message</span>
        <textarea
          required
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="input-focus-glow min-h-40 w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none transition-all"
          placeholder="Include your context, current stage, and the outcome you need."
        />
      </label>

      <div className="rounded-xl border border-border bg-background/40 p-4 text-xs text-muted-foreground">
        Best messages include:
        <div className="mt-2 space-y-1">
          <p>Project or topic context</p>
          <p>Where you are currently blocked</p>
          <p>What decision, deliverable, or next step you need</p>
        </div>
      </div>

      <Button type="submit" size="lg" className="transition-transform hover:scale-[1.02]">
        <Mail className="mr-2 h-5 w-5" />
        Open Draft in Email App
      </Button>
      <p className="text-xs text-muted-foreground">
        This form prepares a pre-filled email draft to {recipientEmail} in your default email app.
      </p>
    </form>
  )
}
