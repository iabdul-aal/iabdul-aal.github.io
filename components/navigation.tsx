"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { navigationItems, identity } from "@/lib/academic-content"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n-context"
import { LanguageToggle } from "@/components/ui/language-toggle"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const mobileNavRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  const getNavLabel = (href: string, defaultLabel: string) => {
    const key = href.replace("/", "") as keyof typeof t.nav
    return t.nav[key] || defaultLabel
  }

  // Close mobile menu on escape key & trap keyboard focus inside mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
        return
      }

      if (e.key === "Tab" && isOpen && mobileNavRef.current) {
        const focusables = mobileNavRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return

        const firstElement = focusables[0]
        const lastElement = focusables[focusables.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav className="container-layout flex h-14 items-center justify-between" aria-label="Main">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex min-w-0 items-center gap-3 text-foreground hover:text-accent transition-colors">
          <Image src="/logo.png" alt={`${identity.name} logo`} width={36} height={36} className="h-8 w-auto shrink-0" />
          <div className="min-w-0 truncate">
            <p className="text-sm font-semibold leading-tight truncate">{identity.name}</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden h-full items-center gap-1 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative flex h-14 items-center px-3 text-sm transition-colors",
                isActive(item.href)
                  ? "text-foreground font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-accent"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {getNavLabel(item.href, item.label)}
            </Link>
          ))}

          <div className="ms-2 ps-3 border-s border-border/50">
            <LanguageToggle />
          </div>
        </div>

        {/* Mobile Navigation Trigger & Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle />

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="h-4.5 w-4.5" aria-hidden="true" /> : <Menu className="h-4.5 w-4.5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div
          id="mobile-navigation"
          ref={mobileNavRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="border-t border-border bg-background lg:hidden overscroll-contain"
        >
          <div className="mx-auto grid max-w-6xl gap-1 px-5 py-4 sm:px-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm",
                  isActive(item.href)
                    ? "bg-secondary text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {getNavLabel(item.href, item.label)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
