"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n-context"

export function NotFoundContent() {
  const { lang } = useLanguage()
  const isDe = lang === "de"

  return (
    <main>
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-muted-foreground">404</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            {isDe ? "Seite nicht gefunden" : "Page not found"}
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            {isDe
              ? "Die angeforderte Seite existiert nicht oder wurde verschoben."
              : "This page does not exist or may have been moved."}
          </p>
          <div className="mt-8">
            <Link href="/" className="trigger-secondary-chip touch-target">
              {isDe ? "Zur Startseite" : "Return home"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
