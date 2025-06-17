import { Card } from "@/components/ui/card"
import { Shield, MessageSquare, TicketIcon, BarChart3, Code, FileText, Users } from "lucide-react"

export default function IntroductionPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Introduction</h1>
        <p className="text-lg text-gray-300">
          Welcome to the Sterix documentation. Learn how to integrate and use all features of our Discord bot.
        </p>
      </div>

      <section id="key-features" className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Key Features</h2>

        <p className="text-gray-300">
          Sterix offers an array of features to make server management and user engagement more effective. The following
          are some of its key features:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-[#161b22] border-gray-800 p-4 hover:border-violet-500 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="h-6 w-6 text-violet-500" />
              <h3 className="text-xl font-semibold text-white">Moderation</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Powerful moderation tools to keep your server safe and well-managed.
            </p>
          </Card>

          <Card className="bg-[#161b22] border-gray-800 p-4 hover:border-violet-500 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <TicketIcon className="h-6 w-6 text-violet-500" />
              <h3 className="text-xl font-semibold text-white">Ticket system</h3>
            </div>
            <p className="text-gray-300 text-sm">Create and manage support tickets for your server members.</p>
          </Card>

          <Card className="bg-[#161b22] border-gray-800 p-4 hover:border-violet-500 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <BarChart3 className="h-6 w-6 text-violet-500" />
              <h3 className="text-xl font-semibold text-white">Logging</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Comprehensive logging of all server activities for better oversight.
            </p>
          </Card>

          <Card className="bg-[#161b22] border-gray-800 p-4 hover:border-violet-500 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <FileText className="h-6 w-6 text-violet-500" />
              <h3 className="text-xl font-semibold text-white">Embeds</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Create beautiful, customizable embeds for your server announcements.
            </p>
          </Card>

          <Card className="bg-[#161b22] border-gray-800 p-4 hover:border-violet-500 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <Code className="h-6 w-6 text-violet-500" />
              <h3 className="text-xl font-semibold text-white">Custom commands</h3>
            </div>
            <p className="text-gray-300 text-sm">Create custom commands tailored to your server's needs.</p>
          </Card>

          <Card className="bg-[#161b22] border-gray-800 p-4 hover:border-violet-500 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <MessageSquare className="h-6 w-6 text-violet-500" />
              <h3 className="text-xl font-semibold text-white">Suggestion system</h3>
            </div>
            <p className="text-gray-300 text-sm">Allow members to submit and vote on suggestions for your server.</p>
          </Card>

          <Card className="bg-[#161b22] border-gray-800 p-4 hover:border-violet-500 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="h-6 w-6 text-violet-500" />
              <h3 className="text-xl font-semibold text-white">Role Management</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Advanced role management with reaction roles and self-assignable roles.
            </p>
          </Card>
        </div>
      </section>

      <section id="conclusion" className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Conclusion</h2>

        <p className="text-gray-300">
          In conclusion, Sterix stands as a comprehensive Discord bot that revolutionizes server management and enhances
          user engagement. With its wide array of features, from moderation tools to custom commands, Sterix provides
          everything you need to create a well-organized, engaging, and secure Discord server.
        </p>

        <p className="text-gray-300">
          Whether you're running a small community server or managing a large organization, Sterix scales to meet your
          needs with both free and premium features designed to make Discord server management easier and more
          effective.
        </p>
      </section>
    </div>
  )
}
