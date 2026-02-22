import type React from "react"
import type { Metadata } from "next"
import { Source_Serif_4, Space_Grotesk } from "next/font/google"
import Script from "next/script"
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

const isDevelopment = process.env.NODE_ENV !== "production"
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID?.trim()

const securityPolicy = {
  referrerPolicy: "strict-origin-when-cross-origin",
  permissionsPolicy:
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
  contentSecurityPolicy: [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://assets.calendly.com${googleAnalyticsId ? " https://www.googletagmanager.com" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src 'self' https://calendly.com https://assets.calendly.com${googleAnalyticsId ? " https://www.google-analytics.com https://region1.google-analytics.com" : ""}`,
    "frame-src 'self' https://calendly.com",
    "manifest-src 'self'",
    isDevelopment ? "" : "upgrade-insecure-requests",
  ]
    .filter(Boolean)
    .join("; "),
}

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
  referrer: "strict-origin-when-cross-origin",
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
      <head>
        <meta httpEquiv="Content-Security-Policy" content={securityPolicy.contentSecurityPolicy} />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta name="referrer" content={securityPolicy.referrerPolicy} />
        <meta httpEquiv="Permissions-Policy" content={securityPolicy.permissionsPolicy} />
      </head>
      <body className={`${spaceGrotesk.variable} ${sourceSerif.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:shadow-lg"
        >
          Skip to main content
        </a>
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}', { anonymize_ip: true });`}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navigation />
        <div id="main-content" role="main">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
