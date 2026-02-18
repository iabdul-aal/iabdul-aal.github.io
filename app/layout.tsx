import type React from "react"
import type { Metadata } from "next"
import { Source_Serif_4, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://iabdul-aal.github.io"),
  title: "Islam I. Abdulaal | Integrated Photonics Research",
  description:
    "Research portfolio of Islam I. Abdulaal, focused on integrated photonics, quantum photonics, nonlinear optics, and photonic-electronic co-design.",
  applicationName: "Islam Abdulaal Research Portfolio",
  keywords: [
    "integrated photonics",
    "quantum photonics",
    "nonlinear optics",
    "silicon photonics",
    "PINNs",
    "Alexandria University",
  ],
  authors: [{ name: "Islam I. Abdulaal" }],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${sourceSerif.variable} font-sans antialiased`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
