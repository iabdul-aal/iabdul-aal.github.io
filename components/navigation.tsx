"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { navigationItems } from "@/lib/academic-content"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8" aria-label="Main">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-foreground hover:text-accent transition-colors">
          <Image src="/logo.png" alt="Islam Abdulaal logo" width={40} height={40} className="h-10 w-auto" />
          <div className="truncate">
            <p className="text-sm font-semibold leading-none">Islam I. Abdulaal</p>
            <p className="text-xs font-normal text-muted-foreground">Photonics researcher</p>
          </div>
        </Link>

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
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      {isOpen && (
        <div id="mobile-navigation" className="border-t border-border bg-background lg:hidden">
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
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
