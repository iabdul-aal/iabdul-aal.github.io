import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import { AboutView } from "@/components/about-view"

export const metadata: Metadata = createPageMetadata({
  title: "About and Academic Background",
  description:
    `Biography, academic background, research interests, and institutional affiliations of ${siteConfig.name} in integrated photonics and inverse design.`,
  path: "/about",
  keywords: [
    `${siteConfig.name} About`,
    "Academic Biography",
    "Integrated Photonics Research",
    "Alexandria University",
    "A*STAR IMRE",
  ],
})

export default function AboutPage() {
  return <AboutView />
}
