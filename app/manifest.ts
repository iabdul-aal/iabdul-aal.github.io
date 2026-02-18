import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Islam I. Abdulaal | Research Website",
    short_name: "I. Abdulaal",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a1723",
    theme_color: "#0a1723",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  }
}
