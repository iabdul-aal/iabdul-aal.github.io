"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Language, TranslationSchema, translations } from "@/lib/i18n"

type LanguageContextType = {
  lang: Language
  setLang: (lang: Language) => void
  t: TranslationSchema
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = "i18n_lang"

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en"
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language
    if (saved === "en" || saved === "de") {
      return saved
    }
    if (navigator.language.toLowerCase().startsWith("de")) {
      return "de"
    }
  } catch {
    // fallback
  }
  return "en"
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
    }
  }, [lang])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    try {
      localStorage.setItem(STORAGE_KEY, newLang)
    } catch {
      // localStorage write error ignored
    }
  }

  const value: LanguageContextType = {
    lang,
    setLang,
    t: translations[lang] || translations.en,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    return {
      lang: "en" as Language,
      setLang: () => {},
      t: translations.en,
    }
  }
  return context
}
