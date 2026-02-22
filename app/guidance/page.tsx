import { redirect } from "next/navigation"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Guidance",
  description: "This page redirects to Mentorship.",
  path: "/guidance",
  noIndex: true,
})

export default function GuidancePage() {
  redirect("/mentorship")
}
