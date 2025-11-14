"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "eslam.ibrahim2026@alexu.edu.eg",
      description: "Preferred contact method",
      href: "mailto:eslam.ibrahim2026@alexu.edu.eg",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+20-120-460-9271",
      description: "Available for calls (EET)",
      href: "tel:+201204609271",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Alexandria, Egypt",
      description: "Based in Alexandria",
      href: "#",
    },
  ]

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Get in Touch</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Interested in research collaboration, mentorship, or discussing photonics innovation? I'd love to hear
              from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method) => {
              const IconComponent = method.icon
              return (
                <a
                  key={method.title}
                  href={method.href}
                  className="p-8 rounded-lg border border-border bg-card hover:border-accent transition-colors group"
                >
                  <IconComponent className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{method.title}</h3>
                  <p
                    className={`${method.title === "Email" ? "text-lg font-bold text-accent" : "text-accent font-semibold"} mb-2`}
                  >
                    {method.value}
                  </p>
                  <p className="text-muted-foreground text-sm">{method.description}</p>
                </a>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="p-8 rounded-lg border border-border bg-card">
                <h2 className="text-3xl font-bold text-foreground mb-8">Send a Message</h2>

                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="text-5xl mb-4">✓</div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Message Received!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-accent"
                      >
                        <option value="">Select a subject</option>
                        <option value="research">Research Collaboration</option>
                        <option value="mentorship">Mentorship Inquiry</option>
                        <option value="hardware">Hardware Design Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell me about your inquiry..."
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground flex items-center justify-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Response Time */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">Response Time</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  I typically respond to inquiries within 48 hours. For urgent matters, please include "URGENT" in the
                  subject line.
                </p>
                <div className="p-4 rounded bg-background border border-border">
                  <p className="text-sm text-accent font-semibold">Average Response: 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Connect?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you have a specific inquiry or just want to say hello, I'm here to help. Reach out today!
          </p>
        </div>
      </section>
    </main>
  )
}
