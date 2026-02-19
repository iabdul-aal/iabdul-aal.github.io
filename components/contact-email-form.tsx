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
  subject: string
  message: string
}

const initialState: FormState = {
  name: "",
  email: "",
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

    const subject = formState.subject.trim() || "Website Contact Form"
    const bodyLines = [
      `Name: ${formState.name.trim() || "N/A"}`,
      `Email: ${formState.email.trim() || "N/A"}`,
      "",
      formState.message.trim(),
    ]

    const mailtoHref = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`
    window.location.href = mailtoHref
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="email-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-2">
          <span className="text-sm font-medium">Name</span>
          <input
            type="text"
            required
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
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
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="space-y-2 block">
        <span className="text-sm font-medium">Subject</span>
        <input
          type="text"
          required
          value={formState.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
          placeholder="How can I help?"
        />
      </label>
      <label className="space-y-2 block">
        <span className="text-sm font-medium">Message</span>
        <textarea
          required
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="w-full min-h-40 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
          placeholder="Share your context and objective."
        />
      </label>
      <Button type="submit" size="lg">
        <Mail className="w-5 h-5 mr-2" />
        Open Draft in Email App
      </Button>
      <p className="text-xs text-muted-foreground">
        This form prepares a pre-filled email draft to {recipientEmail} in your default email app.
      </p>
    </form>
  )
}
