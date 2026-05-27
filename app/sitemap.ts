import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const routes: Array<{
    path: string
    changeFrequency: "daily" | "weekly" | "monthly" | "yearly" | "always" | "hourly" | "never"
    priority: number
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/about", changeFrequency: "monthly", priority: 0.9 },
    { path: "/research", changeFrequency: "monthly", priority: 1.0 },
    { path: "/publications", changeFrequency: "monthly", priority: 0.9 },
    { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
    { path: "/materials", changeFrequency: "monthly", priority: 0.7 },
    { path: "/cv", changeFrequency: "monthly", priority: 0.8 },
  ]

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
