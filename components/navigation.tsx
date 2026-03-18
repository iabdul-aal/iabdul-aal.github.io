"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/publications", label: "Publications" },
    { href: "/ventures", label: "Ventures" },
    { href: "/projects", label: "Projects" },
    { href: "/articles", label: "Articles" },
    { href: "/materials", label: "Materials" },
    { href: "/talks", label: "Talks" },
    { href: "/services", label: "Services" },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  const closeMenu = useCallback(() => {
    if (!isOpen) return
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 200)
  }, [isOpen])

  useEffect(() => {
    closeMenu()
  }, [pathname, closeMenu])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
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
              <p className="text-[11px] text-muted-foreground leading-none mt-1">Postgraduate Student</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative inline-flex h-9 items-center text-sm transition-colors",
                  isActive(link.href) ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                {/* Animated underline indicator */}
                <span
                  className={cn(
                    "absolute -bottom-[1px] left-0 h-[2px] bg-accent transition-all duration-300 ease-out",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
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
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center text-foreground hover:text-accent transition-colors"
            onClick={() => {
              if (isOpen) {
                closeMenu()
              } else {
                setIsOpen(true)
              }
            }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation — Animated */}
        {isOpen && (
          <div
            className={cn(
              "lg:hidden pb-4 space-y-2 border-t border-border",
              isClosing ? "animate-slide-up-out" : "animate-slide-down",
            )}
          >
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-2 rounded transition-all duration-200",
                  isActive(link.href)
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-card",
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
