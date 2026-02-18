import { Button } from "@/components/ui/button"
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
      title: "Email",
      value: "eslam.ibrahim2026@alexu.edu.eg",
      description: "Primary channel for collaboration and professional inquiries",
      href: "mailto:eslam.ibrahim2026@alexu.edu.eg",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+20-120-460-9271",
      description: "Available by prior scheduling",
      href: "tel:+201204609271",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Alexandria, Egypt",
      description: "Open to remote collaboration",
      href: "#",
    },
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

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method) => {
              const Icon = method.icon
              return (
                <a key={method.title} href={method.href} className="p-8 rounded-xl border border-border bg-card hover:border-accent transition-colors">
                  <Icon className="w-8 h-8 text-accent mb-4" />
                  <h2 className="text-xl font-bold mb-2">{method.title}</h2>
                  <p className="text-accent font-semibold mb-2">{method.value}</p>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </a>
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
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Integrated photonics research projects",
                  "Simulation and method design discussions",
                  "Student mentorship and guidance",
                  "Speaking and workshop invitations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card">
              <h2 className="text-3xl font-bold mb-4">Quick Actions</h2>
              <p className="text-muted-foreground mb-6">
                Choose your preferred channel and include your inquiry details to speed up response quality.
              </p>
              <div className="space-y-4">
                <a href={`mailto:${socialLinks.email}?subject=Collaboration Inquiry`}>
                  <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Mail className="w-5 h-5 mr-2" />
                    Send Email
                  </Button>
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="w-full">
                    <MessageSquareText className="w-5 h-5 mr-2" />
                    Message on LinkedIn
                  </Button>
                </a>
              </div>
              <p className="text-xs text-muted-foreground mt-6">Typical response window: 24-72 hours.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
