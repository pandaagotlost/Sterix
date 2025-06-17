import { DiscordWidget } from "@/components/discord-widget"

export default function CommunityPage() {
  const serverId = "1308056184162357268"

  return (
    <div className="min-h-screen bg-[#36393F] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6">Sterix Community</h1>

          <div className="bg-[#2F3136] rounded-lg p-6 mb-8 border border-[#202225]">
            <h2 className="text-2xl font-semibold text-white mb-4">Join Our Discord Server</h2>
            <p className="text-[#DCDDDE] mb-6">
              Connect with other Sterix users, get support from our team, and stay updated on the latest features and
              announcements.
            </p>

            <div className="w-full mb-6">
              <DiscordWidget
                serverId={serverId}
                theme="dark"
                height="500px"
                className="shadow-lg border border-[#202225] rounded-md overflow-hidden"
              />
            </div>

            <div className="flex justify-center">
              <a
                href="https://discord.gg/Ra6r3XPrh9"
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium px-6 py-3 rounded-md transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Our Community
              </a>
            </div>
          </div>

          <div className="bg-[#2F3136] rounded-lg p-6 border border-[#202225]">
            <h2 className="text-2xl font-semibold text-white mb-4">Community Benefits</h2>

            <ul className="space-y-3 text-[#DCDDDE]">
              <li className="flex items-start">
                <span className="text-[#5865F2] mr-2">•</span>
                <span>Get help and support directly from our team and experienced users</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#5865F2] mr-2">•</span>
                <span>Be the first to know about new features and updates</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#5865F2] mr-2">•</span>
                <span>Share your feedback and suggestions to help shape the future of Sterix</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#5865F2] mr-2">•</span>
                <span>Connect with other server owners and share tips and tricks</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#5865F2] mr-2">•</span>
                <span>Participate in community events and giveaways</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
