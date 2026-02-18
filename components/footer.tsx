import Link from "next/link"
import { Linkedin, Mail, Github } from "lucide-react"
import { socialLinks } from "@/lib/social-links"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Research-focused portfolio documenting work in integrated photonics, quantum devices, nonlinear optics,
              and photonic-electronic co-design.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Pages</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  About & CV
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-muted-foreground hover:text-accent transition-colors">
                  Articles
                </Link>
              </li>
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
                <Link href="/news" className="text-muted-foreground hover:text-accent transition-colors">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="text-muted-foreground hover:text-accent transition-colors">
                  Mentorship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact
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
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Islam I. Abdulaal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
