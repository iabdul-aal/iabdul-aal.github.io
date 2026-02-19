import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/articles",
    "/contact",
    "/materials",
    "/materials/slides",
    "/materials/summaries",
    "/materials/roadmaps",
    "/materials/templates",
    "/mentorship",
    "/services",
    "/talks",
    "/ventures",
    "/ventures/startups",
    "/ventures/non-profit",
  ]

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }))
}
