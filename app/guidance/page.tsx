import { redirect } from "next/navigation"

export const metadata = {
  title: "Guidance",
  description: "This page redirects to Mentorship.",
}

export default function GuidancePage() {
  redirect("/mentorship")
}
