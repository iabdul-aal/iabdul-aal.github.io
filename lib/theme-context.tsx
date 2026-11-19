"use client"

import React, { createContext, useCallback, useContext, useEffect, useState } from "react"

export type Theme = "light" | "dark"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = "site_theme"

function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") return "light"
  try {
    const attr = document.documentElement.dataset.theme
    if (attr === "light" || attr === "dark") return attr
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === "light" || saved === "dark") return saved
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  } catch {
    return "light"
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initial = resolveInitialTheme()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(initial)
    setMounted(true)

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemChange = (e: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          const next: Theme = e.matches ? "dark" : "light"
          setThemeState(next)
          delete document.documentElement.dataset.theme
        }
      } catch {
        // ignore storage errors
      }
    }
    mq.addEventListener("change", handleSystemChange)
    return () => mq.removeEventListener("change", handleSystemChange)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = next
    }
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // storage may be restricted in private browsing modes
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    return {
      theme: "light" as Theme,
      toggleTheme: () => {},
      setTheme: () => {},
      mounted: false,
    }
  }
  return ctx
}
