import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "katex/dist/katex.min.css"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { personConfig, siteConfig } from "@/lib/site-config"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const securityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ")

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  manifest: "/manifest.webmanifest",
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: "Islam I. Abdulaal Academic Website",
  keywords: [...siteConfig.keywords],
  authors: [{ name: personConfig.name, url: siteConfig.url }],
  creator: personConfig.name,
  publisher: personConfig.name,
  category: "science",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
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
    card: "summary",
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
    icon: [{ url: "/favicon.png?v=2", type: "image/png" }],
    shortcut: "/favicon.png?v=2",
    apple: "/favicon.png?v=2",
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#b68c61",
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
      affiliation: [
        {
          "@type": "CollegeOrUniversity",
          name: personConfig.affiliation,
        },
        {
          "@type": "Organization",
          name: "NanoPhoto Lab, IMRE, A*STAR",
        },
      ],
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
    <html lang="en" className={inter.variable}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={securityPolicy} />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:shadow-sm"
        >
          Skip to main content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Navigation />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
