import { Button } from "@/components/ui/button"
import { JourneySection } from "@/components/journey-section"
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

  const summaryStats = [
    { label: "Channels", value: String(contactMethods.length) },
    { label: "Response Window", value: "24-72h" },
    { label: "Location", value: "Alexandria" },
    { label: "Mode", value: "Remote-first" },
  ]

  return (
    <main className="bg-background text-foreground">
      <section className="min-h-[50vh] flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Contact</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              For research collaboration, speaking invitations, mentorship requests, or technical service discussions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {summaryStats.map((item) => (
              <article key={item.label} className="p-4 rounded-xl border border-border bg-card/40">
                <p className="text-lg font-bold leading-none">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-2">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl border border-border bg-card">
              <h2 className="text-3xl font-bold mb-4">Collaboration Scope</h2>
              <p className="text-muted-foreground mb-6">
                Best fit inquiries usually include a clear technical objective, timeline expectation, and current
                project context.
              </p>
              <div className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Integrated photonics research projects",
                  "Simulation and method design discussions",
                  "Student mentorship and guidance",
                  "Speaking and workshop invitations",
                ].map((item) => (
                  <p key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card">
              <h2 className="text-3xl font-bold mb-4">Quick Actions</h2>
              <p className="text-muted-foreground mb-6">
                Choose your preferred channel and include your inquiry details to speed up response quality.
              </p>
              <div className="space-y-4">
                <Button asChild size="lg" className="w-full">
                  <a href={`mailto:${socialLinks.email}?subject=Collaboration Inquiry`}>
                    <Mail className="w-5 h-5 mr-2" />
                    Send Email
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <a href={`mailto:${socialLinks.academicEmail}?subject=Academic Inquiry`}>
                    <Mail className="w-5 h-5 mr-2" />
                    Academic Email
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                    <Phone className="w-5 h-5 mr-2" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <MessageSquareText className="w-5 h-5 mr-2" />
                    Message on LinkedIn
                  </a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-6">Typical response window: 24-72 hours.</p>
            </div>
          </div>

          <div className="mt-8 p-8 rounded-xl border border-border bg-card">
            <h2 className="text-2xl font-bold mb-4">How to Get a Faster, Better Response</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              {[
                "State your objective in one sentence (collaboration, mentorship, speaking, or consultation).",
                "Include your timeline and expected deliverable.",
                "Add relevant links or context files to avoid extra back-and-forth.",
              ].map((item) => (
                <p key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <JourneySection
        title="Need More Context Before Reaching Out?"
        description="You can review services, profile details, and recent highlights first, then return to contact."
        actions={[
          { href: "/services", label: "Review Services" },
          { href: "/about", label: "Read Full Profile", variant: "outline" },
          { href: "/news", label: "See Highlights", variant: "ghost" },
        ]}
      />
    </main>
  )
}
