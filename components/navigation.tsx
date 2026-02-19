"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: "/about", label: "About" },
    { href: "/ventures", label: "Ventures" },
    { href: "/articles", label: "Articles" },
    { href: "/materials", label: "Materials" },
    { href: "/talks", label: "Talks" },
    { href: "/services", label: "Services" },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-foreground hover:text-accent transition-colors">
            <Image
              src="/logo.png"
              alt="Islam Abdulaal logo"
              width={42}
              height={42}
              className="inline-block h-8 w-auto align-middle"
            />
            <div className="hidden md:block">
              <p className="text-sm font-semibold leading-none">Islam I. Abdulaal</p>
              <p className="text-[11px] text-muted-foreground leading-none mt-1">ECE Undergraduate | Research Intern</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors",
                  isActive(link.href) ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button asChild size="sm">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-foreground hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2 border-t border-border">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-2 rounded transition-colors",
                  isActive(link.href)
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-card",
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="px-4 pt-2">
              <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
