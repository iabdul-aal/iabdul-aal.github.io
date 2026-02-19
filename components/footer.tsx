import Link from "next/link"
import { ArrowRight, Link2, Linkedin, Mail, Send, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { contactInfo, socialLinks } from "@/lib/social-links"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const primaryLinks = [
    { href: "/about", label: "About" },
    { href: "/articles", label: "Articles" },
    { href: "/ventures", label: "Ventures" },
    { href: "/services", label: "Services" },
    { href: "/mentorship", label: "Mentorship" },
    { href: "/materials", label: "Materials" },
    { href: "/talks", label: "Talks" },
    { href: "/contact", label: "Contact" },
  ]

  const connectLinks = [
    { name: "LinkedIn", href: socialLinks.linkedin, icon: Linkedin },
    { name: "X", href: socialLinks.twitter, icon: Twitter },
    { name: "Telegram", href: socialLinks.telegramBot, icon: Send },
    { name: "All Profiles", href: socialLinks.linktree, icon: Link2 },
  ]

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-8">
          <section>
            <h2 className="font-semibold text-foreground mb-4">Website Overview</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I use this website to document my current academic work, research learning progress, and technical
              activities. If you would like to connect, the contact page is the fastest path.
            </p>
            <div className="mt-5">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/contact">
                  Start a conversation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-4">Navigate</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {primaryLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-accent transition-colors py-1">
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-4">Connect</h2>
            <div className="flex flex-wrap items-center gap-4">
              {connectLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors"
                    aria-label={item.name}
                    title={item.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{contactInfo.location}</p>
            <div className="mt-4">
              <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                <a href={`mailto:${contactInfo.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email Me
                </a>
              </Button>
            </div>
          </section>
        </div>

        <div className="border-t border-border pt-6 text-xs text-muted-foreground">
          <p>&copy; {currentYear} Islam I. Abdulaal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
