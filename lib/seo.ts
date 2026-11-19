import type { Metadata } from "next"
import { personConfig, siteConfig } from "@/lib/site-config"
import type { PublicationRecord } from "@/types/publication"
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
    title,
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
          width: 400,
          height: 400,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
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
    ],
    alumniOf: cvData.education.map((ed) => ({
      "@type": "EducationalOrganization",
      name: ed.institution,
    })),
    knowsAbout: personConfig.focusAreas,
    sameAs: [...siteConfig.sameAs],
    email: `mailto:${personConfig.email}`,
    ...(personConfig.location
      ? { address: { "@type": "PostalAddress", addressLocality: personConfig.location } }
      : {}),
    identifier: {
      "@type": "PropertyValue",
      propertyID: "ORCID",
      value: personConfig.orcid,
    },
  }
}

export function generateRootSchema() {
  const person = generatePersonSchema()
  const personNode = Object.fromEntries(Object.entries(person).filter(([k]) => k !== "@context"))

  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode,
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
}

export function generatePublicationsSchema(publications?: PublicationRecord[]) {
  const pubs: Array<{
    title: string
    venue: string
    year: string
    doi?: string
    url?: string
    authors: string[]
    abstract?: string
  }> =
    publications ??
    (publicationsData as Array<{
      title: string
      venue: string
      year: string
      doi?: string
      url?: string
      authors: string[]
      abstract?: string
    }>)

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
