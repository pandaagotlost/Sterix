import { NavBar } from "@/components/nav-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function FeaturesPage() {
  const features = [
    {
      title: "Anti-Raid Protection",
      description: "Advanced protection against server raids with automatic detection and mitigation.",
      badge: "Security",
      icon: "🛡️",
      link: "/docs/anti-raid",
    },
    {
      title: "Auto-Moderation",
      description: "Intelligent content filtering and automatic moderation to keep your server clean.",
      badge: "Moderation",
      icon: "🤖",
      link: "/docs/auto-mod",
    },
    {
      title: "Custom Roles",
      description: "Create and manage custom roles with advanced permission settings.",
      badge: "Management",
      icon: "👑",
      link: "/docs/custom-roles",
    },
    {
      title: "Logging System",
      description: "Comprehensive logging of all server activities for better oversight.",
      badge: "Utility",
      icon: "📝",
      link: "/docs/logging",
    },
    {
      title: "Moderation Tools",
      description: "Powerful tools for server moderators to manage users and content.",
      badge: "Moderation",
      icon: "🔨",
      link: "/docs/moderation",
    },
    {
      title: "Music System",
      description: "High-quality music playback with playlist support and advanced controls.",
      badge: "Entertainment",
      icon: "🎵",
      link: "/docs/music",
    },
    {
      title: "Welcome Messages",
      description: "Customizable welcome messages and images for new server members.",
      badge: "Engagement",
      icon: "👋",
      link: "/docs/welcome",
    },
    {
      title: "Reaction Roles",
      description: "Assign roles to users based on their reactions to messages.",
      badge: "Management",
      icon: "🎭",
      link: "/docs/reaction-roles",
    },
    {
      title: "Ticket System",
      description: "Create and manage support tickets for your server members.",
      badge: "Support",
      icon: "🎫",
      link: "/docs/tickets",
    },
  ]

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#1a1b26] pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-white mb-4">Sterix Features</h1>
              <p className="text-lg text-gray-300">
                Explore the powerful features that make Sterix the ultimate Discord bot for your server
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Link href={feature.link} key={index} className="block transition-transform hover:scale-105">
                  <Card className="h-full bg-[#252632]/80 border-gray-700 hover:border-violet-500 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <span className="text-3xl">{feature.icon}</span>
                        <Badge className="bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 border-violet-500/50">
                          {feature.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-white mt-2">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to transform your Discord server?</h2>
              <Link
                href="https://discord.com/oauth2/authorize?client_id=1286376669770420304&permissions=2113268958&scope=bot%20applications.commands"
                className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Add Sterix to Discord
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
