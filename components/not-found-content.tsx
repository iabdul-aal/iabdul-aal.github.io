"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n-context"

export function NotFoundContent() {
  const { lang } = useLanguage()
  const isDe = lang === "de"

  return (
    <main>
      <section className="py-24 sm:py-32">
        <div className="container-layout max-w-2xl text-center">
          <p className="eyebrow-label font-mono tabular-nums">404</p>
          <h1 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            {isDe ? "Seite nicht gefunden" : "Page not found"}
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            {isDe
              ? "Die angeforderte Seite existiert nicht oder wurde verschoben."
              : "The requested page does not exist or may have been moved."}
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/" className="btn-primary touch-target">
              {isDe ? "Zur Startseite" : "Return home"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
