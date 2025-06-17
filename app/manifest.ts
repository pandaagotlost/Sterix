import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sterix Discord Bot",
    short_name: "Sterix",
    description: "A powerful Discord bot for moderation, music, and more",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1b1e",
    theme_color: "#5865F2",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
