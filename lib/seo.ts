import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

type PageMetadataInput = {
  title: string
  description: string
  path: string
  noIndex?: boolean
  keywords?: string[]
}

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/"
  }

  const trimmed = path.trim().replace(/^\/+|\/+$/g, "")
  return trimmed.length > 0 ? `/${trimmed}` : "/"
}

function toAbsoluteUrl(path: string): string {
  const normalized = normalizePath(path)
  return normalized === "/" ? siteConfig.url : `${siteConfig.url}${normalized}`
}

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  keywords,
}: PageMetadataInput): Metadata {
  const canonicalPath = normalizePath(path)
  const pageUrl = toAbsoluteUrl(canonicalPath)
  const socialTitle = title === siteConfig.title ? title : `${title} | ${siteConfig.name}`

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: pageUrl,
      title: socialTitle,
      description,
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
      title: socialTitle,
      description,
      images: [siteConfig.ogImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : undefined,
  }
}
