import type { Metadata } from "next"
import { personConfig, siteConfig } from "@/lib/site-config"
import cvData from "@/data/cv_data.json"
import publicationsData from "@/data/publications.json"

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
  keywords = [...siteConfig.keywords],
}: PageMetadataInput): Metadata {
  const canonicalPath = normalizePath(path)
  const pageUrl = toAbsoluteUrl(canonicalPath)
  const socialTitle = title === siteConfig.title ? title : `${title} | ${siteConfig.name}`

  return {
    title: title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: canonicalPath,
        de: canonicalPath === "/" ? "/?lang=de" : `${canonicalPath}?lang=de`,
        "x-default": canonicalPath,
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      alternateLocale: ["de_DE"],
      url: pageUrl,
      title: socialTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@iabdul_aal",
      creator: "@iabdul_aal",
      title: socialTitle,
      description,
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
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

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personConfig.name,
    givenName: personConfig.givenName,
    familyName: personConfig.familyName,
    url: siteConfig.url,
    image: `${siteConfig.url}/personal-pic.png`,
    jobTitle: personConfig.role,
    worksFor: {
      "@type": "EducationalOrganization",
      name: personConfig.affiliation,
    },
    alumniOf: cvData.education.map((ed) => ({
      "@type": "EducationalOrganization",
      name: ed.institution,
    })),
    sameAs: [...siteConfig.sameAs],
    knowsAbout: [
      "Integrated Photonics",
      "Nonlinear Photonics",
      "Quantum Photonics",
      "Inverse Design",
      "Physics-Informed Neural Networks",
      "Finite-Difference Time-Domain (FDTD)",
    ],
  }
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: personConfig.name,
    },
    inLanguage: ["en", "de"],
  }
}

export function generatePublicationsSchema() {
  const pubs = publicationsData as Array<{
    title: string
    venue: string
    year: string
    doi?: string
    url?: string
    authors: string[]
    abstract?: string
  }>
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Publications of ${siteConfig.name}`,
    description: "Peer-reviewed journal articles, preprints, and research publications",
    numberOfItems: pubs.length,
    itemListElement: pubs.map((pub, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "ScholarlyArticle",
        name: pub.title,
        headline: pub.title,
        abstract: pub.abstract,
        datePublished: pub.year,
        author: (pub.authors || []).map((name) => ({
          "@type": "Person",
          name,
        })),
        publisher: pub.venue ? { "@type": "Organization", name: pub.venue } : undefined,
        sameAs: pub.doi ? `https://doi.org/${pub.doi}` : pub.url,
        url: pub.url || (pub.doi ? `https://doi.org/${pub.doi}` : undefined),
      },
    })),
  }
}

export function generateSoftwareSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Open Source Solvers and Tools by ${siteConfig.name}`,
    description: "Open-source software solvers, surrogate modeling kits, and computational artifacts",
    itemListElement: cvData.tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: tool.title,
        description: tool.objective,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cross-platform",
        author: {
          "@type": "Person",
          name: personConfig.name,
        },
        url: tool.links[0]?.href,
      },
    })),
  }
}
