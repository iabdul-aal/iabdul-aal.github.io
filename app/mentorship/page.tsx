import { redirect } from "next/navigation"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Mentorship",
  description: "This page redirects to Services.",
  path: "/mentorship",
  noIndex: true,
})

export default function MentorshipPage() {
  redirect("/services#mentorship")
}
