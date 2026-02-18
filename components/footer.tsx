import Link from "next/link"
import { Linkedin, Mail, Github } from "lucide-react"
import { socialLinks } from "@/lib/social-links"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Personal website for research, initiatives, collaboration opportunities, and technical community impact.
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Built for clear navigation from profile review to direct collaboration.
            </p>
          </div>

          {/* Start Here */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Start Here</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  Research Profile
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-muted-foreground hover:text-accent transition-colors">
                  Key Highlights
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ventures" className="text-muted-foreground hover:text-accent transition-colors">
                  Ventures
                </Link>
              </li>
              <li>
                <Link href="/materials" className="text-muted-foreground hover:text-accent transition-colors">
                  Materials
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="text-muted-foreground hover:text-accent transition-colors">
                  Mentorship
                </Link>
              </li>
              <li>
                <Link href="/talks" className="text-muted-foreground hover:text-accent transition-colors">
                  Talks
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-muted-foreground hover:text-accent transition-colors">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Email:{" "}
              <a href={`mailto:${socialLinks.email}`} className="text-accent hover:text-accent/80">
                {socialLinks.email}
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-2">Typical response: 24-72 hours</p>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Islam I. Abdulaal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
