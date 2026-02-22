import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string
    changeFrequency: "daily" | "weekly" | "monthly" | "yearly" | "always" | "hourly" | "never"
    priority: number
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/about", changeFrequency: "monthly", priority: 0.9 },
    { path: "/articles", changeFrequency: "weekly", priority: 0.8 },
    { path: "/projects", changeFrequency: "weekly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { path: "/materials", changeFrequency: "weekly", priority: 0.8 },
    { path: "/materials/slides", changeFrequency: "monthly", priority: 0.7 },
    { path: "/materials/summaries", changeFrequency: "monthly", priority: 0.7 },
    { path: "/materials/roadmaps", changeFrequency: "monthly", priority: 0.7 },
    { path: "/materials/templates", changeFrequency: "monthly", priority: 0.7 },
    { path: "/mentorship", changeFrequency: "monthly", priority: 0.8 },
    { path: "/services", changeFrequency: "monthly", priority: 0.7 },
    { path: "/talks", changeFrequency: "monthly", priority: 0.7 },
    { path: "/ventures", changeFrequency: "monthly", priority: 0.7 },
    { path: "/ventures/startups", changeFrequency: "monthly", priority: 0.6 },
    { path: "/ventures/non-profit", changeFrequency: "monthly", priority: 0.6 },
  ]

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
