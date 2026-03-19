import { Mail, MapPin, Phone, CalendarClock } from "lucide-react"
import { ContactEmailForm } from "@/components/contact-email-form"
import { MeetingBookingPanel } from "@/components/meeting-booking-panel"
import { PageHero } from "@/components/page-hero"
import { ScrollReveal } from "@/components/scroll-reveal"
import { createPageMetadata } from "@/lib/seo"
import { socialLinks } from "@/lib/social-links"

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Islam I. Abdulaal for research collaboration, speaking, mentorship, and technical consulting opportunities.",
  path: "/contact",
})

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: socialLinks.email,
      description: "Best for detailed collaboration requests and async technical context.",
      href: `mailto:${socialLinks.email}`,
    },
    {
      icon: CalendarClock,
      title: "Schedule",
      value: "Book a call",
      description: "Best for scoped discussions, mentorship, and live project review.",
      href: socialLinks.calendly,
    },
    {
      icon: Phone,
      title: "Phone / WhatsApp",
      value: socialLinks.phone,
      description: "Useful when a shorter back-and-forth is enough.",
      href: socialLinks.whatsapp,
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Alexandria, Egypt",
      description: "Open to remote collaboration across labs, teams, and student communities.",
    },
  ]

  const requestGuidance = [
    "State the topic, project, or organization clearly.",
    "Explain the current stage and where you are blocked.",
    "Ask for a concrete next step, deliverable, or decision.",
  ]

  return (
    <main className="bg-background text-foreground">
      <PageHero
        kicker="Contact"
        title="Start a Useful Conversation"
        description="Use this page for research collaboration, speaking invitations, mentorship requests, or technical service discussions. The fastest path depends on whether your request is better handled asynchronously or live."
        actions={[
          { label: "Send Email", href: `mailto:${socialLinks.email}`, external: true },
          { label: "Book a Call", href: socialLinks.calendly, external: true, variant: "outline" },
        ]}
      />

      <section className="bg-background py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              const content = (
                <>
                  <Icon className="mb-4 h-8 w-8 text-accent" />
                  <h2 className="mb-2 text-xl font-bold">{method.title}</h2>
                  <p className="mb-2 font-semibold text-accent">{method.value}</p>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </>
              )

              if (method.href) {
                return (
                  <ScrollReveal key={method.title} delay={index * 100} direction="up">
                    <a
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group block h-full rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/5 glow-border"
                    >
                      {content}
                    </a>
                  </ScrollReveal>
                )
              }

              return (
                <ScrollReveal key={method.title} delay={index * 100} direction="up">
                  <article className="group h-full rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/5 glow-border">
                    {content}
                  </article>
                </ScrollReveal>
              )
            })}
          </div>

          <div className="mt-10 rounded-xl border border-border bg-card/70 p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Before You Reach Out</p>
            <h2 className="mt-2 text-2xl font-semibold">The most useful requests are specific.</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {requestGuidance.map((item) => (
                <div key={item} className="rounded-xl border border-border bg-background/40 p-4 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-2">
            <article id="email-form-section" className="rounded-xl border border-border bg-card p-8">
              <h2 className="font-display text-3xl md:text-4xl">Email Draft Builder</h2>
              <p className="mb-6 mt-3 text-muted-foreground">
                Use this when you need to send context, links, and a clearly scoped request.
              </p>
              <ContactEmailForm recipientEmail={socialLinks.email} />
            </article>

            <MeetingBookingPanel bookingUrl={socialLinks.calendly} />
          </div>
        </div>
      </section>
    </main>
  )
}
