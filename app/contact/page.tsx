import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { Mail, MapPin, MessageSquareText, Phone } from "lucide-react"
import { socialLinks } from "@/lib/social-links"

export const metadata = {
  title: "Contact",
  description:
    "Contact Islam I. Abdulaal for research collaboration, speaking, mentorship, and technical consulting opportunities.",
}

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "IEEE Email",
      value: socialLinks.email,
      description: "Primary channel for collaboration and professional inquiries",
      href: `mailto:${socialLinks.email}`,
    },
    {
      icon: Phone,
      title: "Phone",
      value: socialLinks.phone,
      description: "WhatsApp-enabled number",
      href: `tel:${socialLinks.phone}`,
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Alexandria, Egypt",
      description: "Open to remote collaboration",
    },
  ]

  return (
    <main className="bg-background text-foreground">
      <PageHero
        kicker="Contact"
        title="Start a Conversation"
        description="Use this page for collaboration, talks, mentorship requests, or technical service discussions."
        actions={[
          { label: "Send Email", href: `mailto:${socialLinks.email}`, external: true },
          { label: "Message on LinkedIn", href: socialLinks.linkedin, external: true, variant: "outline" },
        ]}
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {contactMethods.map((method) => {
              const Icon = method.icon
              const content = (
                <>
                  <Icon className="w-8 h-8 text-accent mb-4" />
                  <h2 className="text-xl font-bold mb-2">{method.title}</h2>
                  <p className="text-accent font-semibold mb-2">{method.value}</p>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </>
              )

              if (method.href) {
                return (
                  <a
                    key={method.title}
                    href={method.href}
                    className="p-8 rounded-xl border border-border bg-card hover:border-accent transition-colors"
                  >
                    {content}
                  </a>
                )
              }

              return (
                <article key={method.title} className="p-8 rounded-xl border border-border bg-card">
                  {content}
                </article>
              )
            })}
          </div>

          <div className="p-8 rounded-xl border border-border bg-card">
            <h2 className="text-3xl font-bold mb-4">Quick Actions</h2>
            <p className="text-muted-foreground mb-6">
              Share your objective and expected timeline in your first message.
            </p>
            <div className="space-y-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={`mailto:${socialLinks.email}?subject=Collaboration Inquiry`}>
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <MessageSquareText className="w-5 h-5 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-6">Typical response window: 24-72 hours.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
