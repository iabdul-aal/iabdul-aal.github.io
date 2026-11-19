import type { Metadata } from "next"
import { NotFoundContent } from "@/components/not-found-content"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: `The requested page could not be found on the academic website of ${siteConfig.name}. Return to the main research profile or publications index.`,
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
  return <NotFoundContent />
}
