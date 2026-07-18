import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} | Research Website`,
    short_name: siteConfig.name.split(" ").map((n, i, a) => i === a.length - 1 ? n : `${n.charAt(0)}.`).join(" "),
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
