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
    background_color: "#fafafa",
    theme_color: "#b68c61",
    icons: [
      {
        src: "/favicon.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  }
}
