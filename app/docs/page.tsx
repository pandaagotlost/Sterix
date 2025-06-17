import { Card } from "@/components/ui/card"
import {
  Shield,
  TicketIcon,
  BarChart3,
  Zap,
  Users,
  Settings,
  ArrowRight,
  AlertTriangle,
  Info,
  Search,
  Play,
  BookOpen,
  Bell,
  Star,
  Lock,
  Terminal,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocsPage() {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#5865f2] to-[#4752c4] p-8 mb-8">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Sterix Documentation</h1>
            <Badge className="bg-white/20 text-white hover:bg-white/30 border-white/30">v1.2.0</Badge>
          </div>
          <p className="text-lg text-white/90 mb-6 max-w-2xl">
            Everything you need to know about setting up and using Sterix, the powerful Discord bot for your server.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/docs/installation"
              className="bg-white text-[#5865f2] hover:bg-gray-100 px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-1"
            >
              Add to Discord <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
            <Link
              href="/docs/quick-start"
              className="bg-[#4752c4] text-white hover:bg-[#3c45a5] px-4 py-2 rounded-md font-medium transition-colors border border-white/20"
            >
              Quick Start Guide
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5865f2]" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-48 md:w-64 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
      </div>

      {/* Quick Access Tabs */}
      <Tabs defaultValue="getting-started" className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] p-1">
          <TabsTrigger value="getting-started" className="data-[state=active]:bg-[#5865f2]">
            <Rocket className="h-4 w-4 mr-2" />
            Getting Started
          </TabsTrigger>
          <TabsTrigger value="commands" className="data-[state=active]:bg-[#5865f2]">
            <Terminal className="h-4 w-4 mr-2" />
            Commands
          </TabsTrigger>
          <TabsTrigger value="features" className="data-[state=active]:bg-[#5865f2]">
            <Zap className="h-4 w-4 mr-2" />
            Features
          </TabsTrigger>
          <TabsTrigger value="guides" className="data-[state=active]:bg-[#5865f2]">
            <BookOpen className="h-4 w-4 mr-2" />
            Guides
          </TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4 hover:border-[#5865f2] transition-colors group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-[#5865f2]/10 text-[#5865f2] group-hover:bg-[#5865f2]/20 transition-colors">
                  <Settings className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Installation</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Learn how to add Sterix to your Discord server and set up the basic configuration.
              </p>
              <Link href="/docs/installation" className="text-[#5865f2] text-sm hover:underline inline-block">
                View installation guide →
              </Link>
            </Card>

            <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4 hover:border-[#5865f2] transition-colors group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-[#5865f2]/10 text-[#5865f2] group-hover:bg-[#5865f2]/20 transition-colors">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Quick Start</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Get up and running with Sterix in minutes with our quick start guide.
              </p>
              <Link href="/docs/quick-start" className="text-[#5865f2] text-sm hover:underline inline-block">
                View quick start guide →
              </Link>
            </Card>

            <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4 hover:border-[#5865f2] transition-colors group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-[#5865f2]/10 text-[#5865f2] group-hover:bg-[#5865f2]/20 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Permissions</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Learn about the permissions Sterix needs to function properly in your server.
              </p>
              <Link href="/docs/permissions" className="text-[#5865f2] text-sm hover:underline inline-block">
                View permissions guide →
              </Link>
            </Card>
          </div>

          <div className="bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#1e1f22] dark:border-[#111214]">
              <h3 className="text-lg font-semibold text-white">Setup Process</h3>
            </div>
            <div className="p-4">
              <ol className="relative border-l border-[#4f545c]/30 ml-3 space-y-6">
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 bg-[#5865f2]/10 text-[#5865f2] border border-[#5865f2]/30">
                    1
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-1">Invite Sterix to your server</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Use our invite link to add Sterix to your Discord server with the required permissions.
                  </p>
                  <Link
                    href="/docs/installation"
                    className="text-[#5865f2] text-sm hover:underline inline-flex items-center"
                  >
                    View detailed steps <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </li>
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 bg-[#5865f2]/10 text-[#5865f2] border border-[#5865f2]/30">
                    2
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-1">Configure basic settings</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Set up the bot's prefix, language, and other basic settings to match your server's needs.
                  </p>
                  <Link
                    href="/docs/configuration"
                    className="text-[#5865f2] text-sm hover:underline inline-flex items-center"
                  >
                    View configuration guide <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </li>
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 bg-[#5865f2]/10 text-[#5865f2] border border-[#5865f2]/30">
                    3
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-1">Set up features</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Enable and configure the features you want to use in your server, such as moderation, welcome
                    messages, and more.
                  </p>
                  <Link
                    href="/docs/features"
                    className="text-[#5865f2] text-sm hover:underline inline-flex items-center"
                  >
                    Browse features <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </li>
              </ol>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="commands" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#2b2d31] dark:bg-[#1e1f22] rounded-md border border-[#1e1f22] dark:border-[#111214] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-[#5865f2]/20 text-[#5865f2] border-[#5865f2]/30">Slash Command</Badge>
                <span className="text-gray-400 text-sm">Moderation</span>
              </div>
              <div className="font-mono bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md text-white mb-3">
                /ban @user reason: Spamming
              </div>
              <p className="text-gray-300 text-sm">Bans a user from your server with an optional reason.</p>
              <div className="mt-3 flex justify-between items-center">
                <Link href="/docs/moderation" className="text-[#5865f2] text-sm hover:underline">
                  View all moderation commands
                </Link>
                <Button size="sm" className="h-8 bg-[#5865f2] hover:bg-[#4752c4]">
                  <Play className="h-3.5 w-3.5 mr-1" /> Try it
                </Button>
              </div>
            </div>

            <div className="bg-[#2b2d31] dark:bg-[#1e1f22] rounded-md border border-[#1e1f22] dark:border-[#111214] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-[#5865f2]/20 text-[#5865f2] border-[#5865f2]/30">Slash Command</Badge>
                <span className="text-gray-400 text-sm">Utility</span>
              </div>
              <div className="font-mono bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md text-white mb-3">
                /ticket create title: Help needed
              </div>
              <p className="text-gray-300 text-sm">Creates a new support ticket with the specified title.</p>
              <div className="mt-3 flex justify-between items-center">
                <Link href="/docs/tickets" className="text-[#5865f2] text-sm hover:underline">
                  View all ticket commands
                </Link>
                <Button size="sm" className="h-8 bg-[#5865f2] hover:bg-[#4752c4]">
                  <Play className="h-3.5 w-3.5 mr-1" /> Try it
                </Button>
              </div>
            </div>

            <div className="bg-[#2b2d31] dark:bg-[#1e1f22] rounded-md border border-[#1e1f22] dark:border-[#111214] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-[#5865f2]/20 text-[#5865f2] border-[#5865f2]/30">Prefix Command</Badge>
                <span className="text-gray-400 text-sm">Roles</span>
              </div>
              <div className="font-mono bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md text-white mb-3">
                .role add @user @Member
              </div>
              <p className="text-gray-300 text-sm">Adds a role to the specified user.</p>
              <div className="mt-3 flex justify-between items-center">
                <Link href="/docs/roles" className="text-[#5865f2] text-sm hover:underline">
                  View all role commands
                </Link>
                <Button size="sm" className="h-8 bg-[#5865f2] hover:bg-[#4752c4]">
                  <Play className="h-3.5 w-3.5 mr-1" /> Try it
                </Button>
              </div>
            </div>

            <div className="bg-[#2b2d31] dark:bg-[#1e1f22] rounded-md border border-[#1e1f22] dark:border-[#111214] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-[#5865f2]/20 text-[#5865f2] border-[#5865f2]/30">Prefix Command</Badge>
                <span className="text-gray-400 text-sm">Configuration</span>
              </div>
              <div className="font-mono bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md text-white mb-3">
                .prefix set !
              </div>
              <p className="text-gray-300 text-sm">Changes the bot's command prefix to the specified character.</p>
              <div className="mt-3 flex justify-between items-center">
                <Link href="/docs/configuration" className="text-[#5865f2] text-sm hover:underline">
                  View all configuration commands
                </Link>
                <Button size="sm" className="h-8 bg-[#5865f2] hover:bg-[#4752c4]">
                  <Play className="h-3.5 w-3.5 mr-1" /> Try it
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Link
              href="/docs/commands"
              className="bg-[#4f545c]/30 hover:bg-[#4f545c]/50 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center"
            >
              View all commands <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4 hover:border-[#5865f2] transition-colors group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-[#5865f2]/10 text-[#5865f2] group-hover:bg-[#5865f2]/20 transition-colors">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Moderation</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Powerful moderation tools to keep your server safe and well-managed.
              </p>
              <Link href="/docs/moderation" className="mt-3 text-[#5865f2] text-sm hover:underline inline-block">
                Learn more →
              </Link>
            </Card>

            <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4 hover:border-[#5865f2] transition-colors group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-[#5865f2]/10 text-[#5865f2] group-hover:bg-[#5865f2]/20 transition-colors">
                  <TicketIcon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Ticket System</h3>
              </div>
              <p className="text-gray-300 text-sm">Create and manage support tickets for your server members.</p>
              <Link href="/docs/tickets" className="mt-3 text-[#5865f2] text-sm hover:underline inline-block">
                Learn more →
              </Link>
            </Card>

            <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4 hover:border-[#5865f2] transition-colors group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-[#5865f2]/10 text-[#5865f2] group-hover:bg-[#5865f2]/20 transition-colors">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Logging</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Comprehensive logging of all server activities for better oversight.
              </p>
              <Link href="/docs/logging" className="mt-3 text-[#5865f2] text-sm hover:underline inline-block">
                Learn more →
              </Link>
            </Card>

            <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4 hover:border-[#5865f2] transition-colors group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-[#5865f2]/10 text-[#5865f2] group-hover:bg-[#5865f2]/20 transition-colors">
                  <Bell className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Welcome System</h3>
              </div>
              <p className="text-gray-300 text-sm">Create customized welcome messages and images for new members.</p>
              <Link href="/docs/welcome" className="mt-3 text-[#5865f2] text-sm hover:underline inline-block">
                Learn more →
              </Link>
            </Card>

            <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4 hover:border-[#5865f2] transition-colors group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-[#5865f2]/10 text-[#5865f2] group-hover:bg-[#5865f2]/20 transition-colors">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Reaction Roles</h3>
              </div>
              <p className="text-gray-300 text-sm">Let users self-assign roles by reacting to messages.</p>
              <Link href="/docs/reaction-roles" className="mt-3 text-[#5865f2] text-sm hover:underline inline-block">
                Learn more →
              </Link>
            </Card>

            <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4 hover:border-[#5865f2] transition-colors group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-[#5865f2]/10 text-[#5865f2] group-hover:bg-[#5865f2]/20 transition-colors">
                  <Star className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Giveaways</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Run interactive giveaways with customizable duration and requirements.
              </p>
              <Link href="/docs/giveaways" className="mt-3 text-[#5865f2] text-sm hover:underline inline-block">
                Learn more →
              </Link>
            </Card>
          </div>

          <div className="flex justify-center mt-4">
            <Link
              href="/docs/features"
              className="bg-[#4f545c]/30 hover:bg-[#4f545c]/50 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center"
            >
              View all features <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#2b2d31] dark:bg-[#1e1f22] rounded-lg border border-[#1e1f22] dark:border-[#111214] overflow-hidden">
              <div className="p-4 border-b border-[#1e1f22] dark:border-[#111214]">
                <h3 className="text-lg font-semibold text-white">Setting Up Auto-Moderation</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-300 text-sm mb-4">
                  Learn how to set up Sterix's powerful auto-moderation system to automatically detect and handle spam,
                  inappropriate content, and more.
                </p>
                <div className="bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md mb-4">
                  <div className="text-xs text-gray-400 mb-1">Step 1: Enable Auto-Mod</div>
                  <div className="font-mono text-sm text-white">/automod enable</div>
                </div>
                <div className="bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md mb-4">
                  <div className="text-xs text-gray-400 mb-1">Step 2: Configure Filters</div>
                  <div className="font-mono text-sm text-white">/automod filter spam level: high</div>
                </div>
                <Link
                  href="/docs/auto-moderation"
                  className="text-[#5865f2] text-sm hover:underline inline-flex items-center"
                >
                  View full guide <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="bg-[#2b2d31] dark:bg-[#1e1f22] rounded-lg border border-[#1e1f22] dark:border-[#111214] overflow-hidden">
              <div className="p-4 border-b border-[#1e1f22] dark:border-[#111214]">
                <h3 className="text-lg font-semibold text-white">Creating Custom Embeds</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-300 text-sm mb-4">
                  Learn how to create beautiful, customized embeds for announcements, rules, and more using Sterix's
                  embed builder.
                </p>
                <div className="bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md mb-4">
                  <div className="text-xs text-gray-400 mb-1">Step 1: Start the Embed Builder</div>
                  <div className="font-mono text-sm text-white">/embed create</div>
                </div>
                <div className="bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md mb-4">
                  <div className="text-xs text-gray-400 mb-1">Step 2: Add Content</div>
                  <div className="font-mono text-sm text-white">/embed title: Server Rules</div>
                </div>
                <Link href="/docs/embeds" className="text-[#5865f2] text-sm hover:underline inline-flex items-center">
                  View full guide <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Link
              href="/docs/guides"
              className="bg-[#4f545c]/30 hover:bg-[#4f545c]/50 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center"
            >
              View all guides <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      {/* Info Boxes Section */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#5865f2]/10 border border-[#5865f2]/30 rounded-md p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-[#5865f2] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">Need Help?</h3>
                <p className="text-gray-300 text-sm">
                  Join our Discord server for direct support from our team and community.
                </p>
                <Link
                  href="https://discord.gg/sterix"
                  className="text-[#5865f2] text-sm mt-2 inline-block hover:underline"
                >
                  Join Support Server →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">Required Permissions</h3>
                <p className="text-gray-300 text-sm">
                  Make sure Sterix has the necessary permissions to function properly.
                </p>
                <Link href="/docs/permissions" className="text-yellow-500 text-sm mt-2 inline-block hover:underline">
                  View Permission Guide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-[#4f545c] pt-6 mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-400 text-sm">Last Updated: March 26, 2025</div>
        <div className="flex items-center gap-4">
          <Link href="/docs/changelog" className="text-gray-400 hover:text-white text-sm">
            Changelog
          </Link>
          <Link href="/docs/faq" className="text-gray-400 hover:text-white text-sm">
            FAQ
          </Link>
          <Link href="/feedback" className="text-gray-400 hover:text-white text-sm">
            Feedback
          </Link>
        </div>
      </div>
    </div>
  )
}
