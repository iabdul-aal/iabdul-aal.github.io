import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested page could not be found.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function NotFound() {
  return (
    <main>
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-muted-foreground">404</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Page not found</h1>
          <p className="mt-4 text-base text-muted-foreground">This page does not exist or may have been moved.</p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Return home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
