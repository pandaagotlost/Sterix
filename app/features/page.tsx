import { NavBar } from "@/components/nav-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Music, Bot, MessageSquare, Bell, Users, Zap, Settings } from "lucide-react"

const features = [
  {
    title: "Moderation",
    description: "Keep your server clean with powerful moderation tools including ban, kick, mute, and more.",
    icon: Shield,
  },
  {
    title: "Music System",
    description: "Play high-quality music from various sources with queue management and controls.",
    icon: Music,
  },
  {
    title: "Auto Moderation",
    description: "Automatically filter spam, inappropriate content, and enforce server rules.",
    icon: Bot,
  },
  {
    title: "Welcome Messages",
    description: "Customize welcome messages and farewell messages for your server members.",
    icon: Bell,
  },
  {
    title: "Role Management",
    description: "Easily manage roles with reaction roles and self-assignable roles.",
    icon: Users,
  },
  {
    title: "Anti-Raid Protection",
    description: "Protect your server from raids and unwanted mass joins with advanced security.",
    icon: Zap,
  },
  {
    title: "Server Statistics",
    description: "Track your server's growth and activity with detailed statistics.",
    icon: Settings,
  },
]

export default function FeaturesPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#1a1b26] pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Features</h1>
            <p className="text-lg text-gray-300">
              Discover all the powerful features that Sterix offers to enhance your Discord server experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-[#252632]/80 border-gray-700 hover:border-[#9d7cff] transition-colors">
                <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                  <feature.icon className="h-6 w-6 text-[#9d7cff]" />
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
