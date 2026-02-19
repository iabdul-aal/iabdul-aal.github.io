import type React from "react"
import type { Metadata } from "next"
import { Source_Serif_4, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { personConfig, siteConfig } from "@/lib/site-config"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  manifest: "/manifest.webmanifest",
  title: {
    default: siteConfig.title,
    template: "%s | Islam I. Abdulaal",
  },
  description: siteConfig.description,
  applicationName: "Islam Abdulaal Research Website",
  keywords: siteConfig.keywords,
  authors: [{ name: personConfig.name, url: siteConfig.url }],
  creator: personConfig.name,
  publisher: personConfig.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Islam I. Abdulaal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@iabdul_aal",
    creator: "@iabdul_aal",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: personConfig.name,
      givenName: personConfig.givenName,
      familyName: personConfig.familyName,
      url: siteConfig.url,
      image: `${siteConfig.url}/personal-pic.png`,
      jobTitle: personConfig.role,
      worksFor: {
        "@type": "Organization",
        name: personConfig.lab,
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: personConfig.affiliation,
      },
      knowsAbout: personConfig.focusAreas,
      sameAs: siteConfig.sameAs,
      email: `mailto:${personConfig.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: personConfig.location,
      },
      identifier: {
        "@type": "PropertyValue",
        propertyID: "ORCID",
        value: personConfig.orcid,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: {
        "@id": `${siteConfig.url}/#person`,
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${sourceSerif.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:shadow-lg"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navigation />
        <div id="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
