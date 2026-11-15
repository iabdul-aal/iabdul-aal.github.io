import type { Metadata } from "next"
import { NotFoundContent } from "@/components/not-found-content"

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The requested page could not be found on the academic website of Islam I. Abdulaal. Return to the main research profile or publications index.",
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
