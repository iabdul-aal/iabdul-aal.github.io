import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { SkipLink } from "@/components/skip-link"
import { LanguageProvider } from "@/lib/i18n-context"
import { personConfig, siteConfig } from "@/lib/site-config"
import activityData from "@/data/activity.json"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const securityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'self'",
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
  applicationName: `${siteConfig.name} Academic Website`,
  keywords: [...siteConfig.keywords],
  authors: [{ name: personConfig.name, url: siteConfig.url }],
  creator: personConfig.name,
  publisher: personConfig.name,
  category: "science",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      de: "/?lang=de",
      "x-default": "/",
    },
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "profile",
    locale: siteConfig.locale,
    alternateLocale: ["de_DE"],
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 400,
        height: 400,
        alt: personConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#b68c61" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1714" },
  ],
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
      jobTitle: [personConfig.role, personConfig.role_de],
      affiliation: [
        ...(personConfig.affiliation ? [{ "@type": "CollegeOrUniversity", name: personConfig.affiliation }] : []),
        ...(personConfig.lab ? [{ "@type": "Organization", name: personConfig.lab }] : []),
      ].filter(Boolean),
      knowsAbout: personConfig.focusAreas,
      sameAs: siteConfig.sameAs,
      email: `mailto:${personConfig.email}`,
      ...(personConfig.location ? { address: { "@type": "PostalAddress", addressLocality: personConfig.location } } : {}),
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
      inLanguage: ["en", "de"],
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
  const fetchedDate =
    typeof activityData.fetchedAt === "string" && activityData.fetchedAt.length >= 10
      ? activityData.fetchedAt.slice(0, 10)
      : undefined

  return (
    <html lang="en" dir="ltr" className={inter.variable}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={securityPolicy} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} Activity Feed`} href="/feed.xml" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <LanguageProvider>
          <SkipLink />
          <Navigation />
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <Footer lastUpdated={fetchedDate} />
        </LanguageProvider>
      </body>
    </html>
  )
}
