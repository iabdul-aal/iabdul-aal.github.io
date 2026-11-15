import type { Metadata } from "next"
import { createPageMetadata, generatePersonSchema } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import { CvView } from "@/components/cv-view"

export const metadata: Metadata = createPageMetadata({
  title: "Curriculum Vitae and Academic Record",
  description:
    `Academic curriculum vitae, education, research experience, and compiled English and German PDF documents for ${siteConfig.name}.`,
  path: "/cv",
  keywords: [
    `${siteConfig.name} CV`,
    "Curriculum Vitae PDF",
    "Academic Record",
    "Research Experience",
    "FAU Erlangen-Nürnberg",
    "Max Planck School of Photonics",
  ],
})

export default function CvPage() {
  // ProfilePage: mainEntity references the Person defined in root layout JSON-LD.
  const personSchema = generatePersonSchema()
  const personSchemaWithoutContext = Object.fromEntries(
    Object.entries(personSchema).filter(([k]) => k !== "@context")
  )
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `Curriculum Vitae: ${siteConfig.name}`,
    mainEntity: personSchemaWithoutContext,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CvView />
    </>
  )
}
