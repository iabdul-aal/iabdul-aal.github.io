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
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const mobileNavRef = useRef<HTMLDivElement>(null)
  const toggleBtnRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(false)
  const { t, lang } = useLanguage()
  const isDe = lang === "de"

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  const getNavLabel = (href: string, defaultLabel: string) => {
    const key = href.replace("/", "") as keyof typeof t.nav
    return t.nav[key] || defaultLabel
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen && mobileNavRef.current) {
      wasOpenRef.current = true
      const firstLink = mobileNavRef.current.querySelector<HTMLElement>("a[href]")
      firstLink?.focus()
    } else if (!isOpen && wasOpenRef.current) {
      wasOpenRef.current = false
      toggleBtnRef.current?.focus()
    }
  }, [isOpen])

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
        } else if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <nav
        className="container-layout flex h-16 items-center justify-between"
        aria-label={isDe ? "Hauptnavigation" : "Main"}
      >
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 text-foreground transition-colors duration-150 hover:text-accent"
        >
          <Image
            src="/logo.png"
            alt={`${identity.name} monogram`}
            width={36}
            height={36}
            priority
            className="h-8 w-auto shrink-0"
          />
          <span className="truncate text-sm font-semibold leading-tight tracking-[0.01em]">
            {identity.name}
          </span>
        </Link>

        <div className="hidden h-full items-center gap-1 lg:flex">
          {navigationItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-16 items-center px-3 text-sm transition-colors duration-150",
                  active
                    ? "font-semibold text-foreground after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-accent"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {getNavLabel(item.href, item.label)}
              </Link>
            )
          })}

          <div className="ms-2 flex items-center gap-1.5 border-s border-border/70 ps-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <ThemeToggle />

          <button
            ref={toggleBtnRef}
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:border-accent/60 hover:text-accent"
            aria-label={isDe ? "Navigation umschalten" : "Toggle navigation"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          id="mobile-navigation"
          ref={mobileNavRef}
          role="dialog"
          aria-modal="true"
          aria-label={isDe ? "Mobile Navigation" : "Mobile navigation"}
          className="border-t border-border bg-background/98 backdrop-blur-md lg:hidden overscroll-contain"
        >
          <div className="container-layout grid gap-1 py-4">
            {navigationItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "touch-target flex min-h-[44px] items-center rounded-md px-3.5 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-secondary font-semibold text-foreground"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                  )}
                >
                  {getNavLabel(item.href, item.label)}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
