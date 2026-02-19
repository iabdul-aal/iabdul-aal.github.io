import Link from "next/link"
import { Mail } from "lucide-react"
import { SocialProfileIconRow } from "@/components/social-profile-links"
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
            <div className="mt-4">
              <Link href="/contact" className="text-sm text-accent hover:text-accent/80">
                Start a conversation
              </Link>
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
            <SocialProfileIconRow limit={6} />
            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <p>
                Email: <a href={`mailto:${socialLinks.email}`} className="text-accent hover:text-accent/80">{socialLinks.email}</a>
              </p>
              <p>
                Academic: <a href={`mailto:${socialLinks.academicEmail}`} className="text-accent hover:text-accent/80">{socialLinks.academicEmail}</a>
              </p>
              <p>{contactInfo.location}</p>
            </div>
            <a
              href={`mailto:${socialLinks.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
              Email Me
            </a>
          </section>
        </div>

        <div className="border-t border-border pt-6 text-xs text-muted-foreground">
          <p>&copy; {currentYear} Islam I. Abdulaal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
