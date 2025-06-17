import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sterixbot.xyz" // Replace with your actual domain

  // Core pages
  const routes = [
    "",
    "/features",
    "/commands",
    "/premium",
    "/docs",
    "/support",
    "/community",
    "/about",
    "/faq",
    "/status",
    "/terms",
    "/privacy",
    "/changelog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Documentation pages
  const docRoutes = [
    "/docs/introduction",
    "/docs/quick-start",
    "/docs/installation",
    "/docs/features",
    "/docs/moderation",
    "/docs/automod",
    "/docs/logging",
    "/docs/music",
    "/docs/welcome",
    "/docs/reaction-roles",
    "/docs/custom-roles",
    "/docs/tickets",
    "/docs/giveaway",
    "/docs/security",
    "/docs/permissions",
    "/docs/slash-commands",
    "/docs/prefix-commands",
    "/docs/voice",
    "/docs/utility",
    "/docs/general",
    "/docs/anti-raid",
    "/docs/boost-message",
    "/docs/ignore",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...docRoutes]
}
