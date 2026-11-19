"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/i18n-context"

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()
  const { lang } = useLanguage()
  const isDe = lang === "de"
  const isDark = mounted && theme === "dark"

  const label = isDark
    ? isDe
      ? "Zum hellen Design wechseln"
      : "Switch to light mode"
    : isDe
      ? "Zum dunklen Design wechseln"
      : "Switch to dark mode"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="touch-target inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-secondary/70 hover:text-foreground"
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Moon className="h-3.5 w-3.5" aria-hidden="true" />
      )}
    </button>
  )
}
