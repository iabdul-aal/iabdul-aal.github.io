"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/publications", label: "Publications" },
  { href: "/projects", label: "Projects" },
  { href: "/materials", label: "Materials" },
  { href: "/talks", label: "Talks" },
  { href: "/services", label: "Services" },
  { href: "/articles", label: "Articles" },
  { href: "/ventures", label: "Ventures" },
] as const

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  const closeMenu = () => {
    if (!isOpen) return

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }

    setIsClosing(true)
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
      closeTimeoutRef.current = null
    }, 200)
  }

  useEffect(() => {
    closeMenu()
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 border-b border-border transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-black/5"
          : "bg-background/90 backdrop-blur-md",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-foreground transition-colors hover:text-accent">
            <Image
              src="/logo.png"
              alt="Islam Abdulaal logo"
              width={42}
              height={42}
              className="inline-block h-8 w-auto align-middle"
            />
            <div className="hidden md:block">
              <p className="text-sm font-semibold leading-none">Islam I. Abdulaal</p>
              <p className="mt-1 text-[11px] leading-none text-muted-foreground">Postgraduate Student</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "group relative inline-flex h-9 items-center text-sm transition-colors",
                  isActive(link.href) ? "font-semibold text-accent" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-[1px] left-0 h-[2px] bg-accent transition-all duration-300 ease-out",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button asChild size="sm">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-accent lg:hidden"
            onClick={() => {
              if (isOpen) {
                closeMenu()
                return
              }

              setIsOpen(true)
              setIsClosing(false)
            }}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div
            id="mobile-navigation"
            className={cn(
              "space-y-2 border-t border-border pb-4 lg:hidden",
              isClosing ? "animate-slide-up-out" : "animate-slide-down",
            )}
          >
            {navigationLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded px-4 py-2 transition-all duration-200",
                  isActive(link.href)
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-card hover:text-foreground",
                )}
                style={{ animationDelay: isClosing ? "0ms" : `${index * 30}ms` }}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}

            <div className="px-4 pt-2">
              <Button asChild className="w-full" onClick={closeMenu}>
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
