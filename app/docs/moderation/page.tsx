import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Shield,
  AlertTriangle,
  Info,
  Check,
  Copy,
  Play,
  ArrowRight,
  MessageSquare,
  Clock,
  Ban,
  UserX,
} from "lucide-react"
import Link from "next/link"

export default function ModerationPage() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section id="overview" className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#5865f2]/10 text-[#5865f2]">
            <Shield className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Moderation Commands</h2>
        </div>

        <p className="text-gray-300">
          Sterix provides a comprehensive set of moderation tools to help you keep your server safe and well-managed.
          These commands allow you to warn, mute, kick, and ban users, as well as manage your server's moderation logs.
        </p>

        <div className="bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] rounded-md p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-[#5865f2] mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white mb-1">Permissions Required</h3>
              <p className="text-gray-300 text-sm">
                To use moderation commands, you need the appropriate permissions in your server. Sterix also needs the
                corresponding permissions to execute these actions.
              </p>
              <Link href="/docs/permissions" className="text-[#5865f2] text-sm mt-2 inline-block hover:underline">
                View required permissions →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Command List */}
      <section id="usage" className="space-y-6">
        <h3 className="text-xl font-bold text-white border-b border-[#4f545c]/30 pb-2">Available Commands</h3>

        <Tabs defaultValue="slash" className="w-full">
          <TabsList className="w-full justify-start mb-4 bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] p-1">
            <TabsTrigger value="slash" className="data-[state=active]:bg-[#5865f2]">
              Slash Commands
            </TabsTrigger>
            <TabsTrigger value="prefix" className="data-[state=active]:bg-[#5865f2]">
              Prefix Commands
            </TabsTrigger>
          </TabsList>

          <TabsContent value="slash" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Ban className="h-4 w-4 text-[#5865f2]" />
                    <h4 className="font-semibold text-white">Ban</h4>
                  </div>
                  <Badge className="bg-[#5865f2]/20 text-[#5865f2] border-[#5865f2]/30">Slash Command</Badge>
                </div>
                <div className="font-mono bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md text-white mb-3 flex items-center justify-between">
                  <span>/ban @user reason: Spamming</span>
                  <button className="text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-300 text-sm mb-3">Bans a user from your server with an optional reason.</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">Required Permission: Ban Members</div>
                  <Button size="sm" className="h-7 bg-[#5865f2] hover:bg-[#4752c4]">
                    <Play className="h-3 w-3 mr-1" /> Try it
                  </Button>
                </div>
              </Card>

              <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <UserX className="h-4 w-4 text-[#5865f2]" />
                    <h4 className="font-semibold text-white">Kick</h4>
                  </div>
                  <Badge className="bg-[#5865f2]/20 text-[#5865f2] border-[#5865f2]/30">Slash Command</Badge>
                </div>
                <div className="font-mono bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md text-white mb-3 flex items-center justify-between">
                  <span>/kick @user reason: Breaking rules</span>
                  <button className="text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-300 text-sm mb-3">Kicks a user from your server with an optional reason.</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">Required Permission: Kick Members</div>
                  <Button size="sm" className="h-7 bg-[#5865f2] hover:bg-[#4752c4]">
                    <Play className="h-3 w-3 mr-1" /> Try it
                  </Button>
                </div>
              </Card>

              <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#5865f2]" />
                    <h4 className="font-semibold text-white">Timeout</h4>
                  </div>
                  <Badge className="bg-[#5865f2]/20 text-[#5865f2] border-[#5865f2]/30">Slash Command</Badge>
                </div>
                <div className="font-mono bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md text-white mb-3 flex items-center justify-between">
                  <span>/timeout @user duration: 1h reason: Spam</span>
                  <button className="text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-300 text-sm mb-3">Temporarily mutes a user for the specified duration.</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">Required Permission: Moderate Members</div>
                  <Button size="sm" className="h-7 bg-[#5865f2] hover:bg-[#4752c4]">
                    <Play className="h-3 w-3 mr-1" /> Try it
                  </Button>
                </div>
              </Card>

              <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-[#5865f2]" />
                    <h4 className="font-semibold text-white">Warn</h4>
                  </div>
                  <Badge className="bg-[#5865f2]/20 text-[#5865f2] border-[#5865f2]/30">Slash Command</Badge>
                </div>
                <div className="font-mono bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md text-white mb-3 flex items-center justify-between">
                  <span>/warn @user reason: Inappropriate language</span>
                  <button className="text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Issues a warning to a user and logs it in the moderation logs.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">Required Permission: Manage Messages</div>
                  <Button size="sm" className="h-7 bg-[#5865f2] hover:bg-[#4752c4]">
                    <Play className="h-3 w-3 mr-1" /> Try it
                  </Button>
                </div>
              </Card>
            </div>

            <div className="flex justify-center mt-4">
              <Link
                href="/docs/moderation/commands"
                className="bg-[#4f545c]/30 hover:bg-[#4f545c]/50 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center"
              >
                View all moderation commands <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="prefix" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Ban className="h-4 w-4 text-[#5865f2]" />
                    <h4 className="font-semibold text-white">Ban</h4>
                  </div>
                  <Badge className="bg-[#5865f2]/20 text-[#5865f2] border-[#5865f2]/30">Prefix Command</Badge>
                </div>
                <div className="font-mono bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md text-white mb-3 flex items-center justify-between">
                  <span>.ban @user Spamming</span>
                  <button className="text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-300 text-sm mb-3">Bans a user from your server with an optional reason.</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">Required Permission: Ban Members</div>
                  <Button size="sm" className="h-7 bg-[#5865f2] hover:bg-[#4752c4]">
                    <Play className="h-3 w-3 mr-1" /> Try it
                  </Button>
                </div>
              </Card>

              <Card className="bg-[#2b2d31] dark:bg-[#1e1f22] border-[#1e1f22] dark:border-[#111214] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <UserX className="h-4 w-4 text-[#5865f2]" />
                    <h4 className="font-semibold text-white">Kick</h4>
                  </div>
                  <Badge className="bg-[#5865f2]/20 text-[#5865f2] border-[#5865f2]/30">Prefix Command</Badge>
                </div>
                <div className="font-mono bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md text-white mb-3 flex items-center justify-between">
                  <span>.kick @user Breaking rules</span>
                  <button className="text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-300 text-sm mb-3">Kicks a user from your server with an optional reason.</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">Required Permission: Kick Members</div>
                  <Button size="sm" className="h-7 bg-[#5865f2] hover:bg-[#4752c4]">
                    <Play className="h-3 w-3 mr-1" /> Try it
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Examples Section */}
      <section id="examples" className="space-y-6">
        <h3 className="text-xl font-bold text-white border-b border-[#4f545c]/30 pb-2">Examples</h3>

        <div className="bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1e1f22] dark:border-[#111214]">
            <h4 className="text-lg font-semibold text-white">Banning a User</h4>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md mb-4">
                  <div className="text-xs text-gray-400 mb-1">Command</div>
                  <div className="font-mono text-sm text-white">/ban @user reason: Spamming in multiple channels</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-300">
                    <span className="font-semibold text-white">User:</span> The user to ban (mention or ID)
                  </div>
                  <div className="text-sm text-gray-300">
                    <span className="font-semibold text-white">Reason:</span> Optional reason for the ban
                  </div>
                  <div className="text-sm text-gray-300">
                    <span className="font-semibold text-white">Result:</span> The user will be banned from the server
                    and a confirmation message will be sent
                  </div>
                </div>
              </div>
              <div className="bg-[#1e1f22] dark:bg-[#111214] rounded-md p-4 flex flex-col items-center justify-center">
                <div className="w-full max-w-sm bg-[#36393f] rounded-md p-4 border border-[#4f545c]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div>
                      <div className="text-white font-medium">Sterix</div>
                      <div className="text-xs text-gray-400">BOT</div>
                    </div>
                  </div>
                  <div className="border-l-4 border-red-500 pl-3 py-1">
                    <div className="text-white">User Banned</div>
                    <div className="text-sm text-gray-300">@user has been banned from the server.</div>
                    <div className="text-sm text-gray-400">Reason: Spamming in multiple channels</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-4">Example of ban confirmation message</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Permissions Section */}
      <section id="permissions" className="space-y-6">
        <h3 className="text-xl font-bold text-white border-b border-[#4f545c]/30 pb-2">Required Permissions</h3>

        <div className="bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1e1f22] dark:border-[#111214]">
            <h4 className="text-lg font-semibold text-white">Permissions Overview</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-300 text-sm mb-4">
              For moderation commands to work properly, both you and the bot need specific permissions. Here's a
              breakdown of the required permissions:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-md bg-[#5865f2]/10 text-[#5865f2]">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Ban Command</h5>
                  <p className="text-sm text-gray-400">You need: Ban Members</p>
                  <p className="text-sm text-gray-400">Bot needs: Ban Members</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-md bg-[#5865f2]/10 text-[#5865f2]">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Kick Command</h5>
                  <p className="text-sm text-gray-400">You need: Kick Members</p>
                  <p className="text-sm text-gray-400">Bot needs: Kick Members</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-md bg-[#5865f2]/10 text-[#5865f2]">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Timeout Command</h5>
                  <p className="text-sm text-gray-400">You need: Moderate Members</p>
                  <p className="text-sm text-gray-400">Bot needs: Moderate Members</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-md bg-[#5865f2]/10 text-[#5865f2]">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Warn Command</h5>
                  <p className="text-sm text-gray-400">You need: Manage Messages</p>
                  <p className="text-sm text-gray-400">Bot needs: Send Messages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section id="troubleshooting" className="space-y-6">
        <h3 className="text-xl font-bold text-white border-b border-[#4f545c]/30 pb-2">Troubleshooting</h3>

        <div className="bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1e1f22] dark:border-[#111214]">
            <h4 className="text-lg font-semibold text-white">Common Issues</h4>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="bg-[#1e1f22] dark:bg-[#111214] rounded-md p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-white mb-1">Command Not Working</h5>
                    <p className="text-gray-300 text-sm">
                      If a moderation command isn't working, check that both you and the bot have the required
                      permissions. Also ensure that the bot's role is higher in the role hierarchy than the user you're
                      trying to moderate.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1e1f22] dark:bg-[#111214] rounded-md p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-white mb-1">Can't Ban Certain Users</h5>
                    <p className="text-gray-300 text-sm">
                      You cannot ban users with roles higher than yours or the bot's. Server owners cannot be banned.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1e1f22] dark:bg-[#111214] rounded-md p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-white mb-1">No Confirmation Message</h5>
                    <p className="text-gray-300 text-sm">
                      If you don't see a confirmation message after using a moderation command, check that the bot has
                      permission to send messages in that channel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-[#4f545c]/30 pb-2">Related Pages</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/docs/auto-mod"
            className="bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] rounded-md p-4 hover:border-[#5865f2] transition-colors"
          >
            <h4 className="font-semibold text-white mb-1">Auto Moderation</h4>
            <p className="text-sm text-gray-400">Set up automatic moderation for your server.</p>
          </Link>

          <Link
            href="/docs/logging"
            className="bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] rounded-md p-4 hover:border-[#5865f2] transition-colors"
          >
            <h4 className="font-semibold text-white mb-1">Moderation Logs</h4>
            <p className="text-sm text-gray-400">Track all moderation actions in your server.</p>
          </Link>

          <Link
            href="/docs/anti-raid"
            className="bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] rounded-md p-4 hover:border-[#5865f2] transition-colors"
          >
            <h4 className="font-semibold text-white mb-1">Anti-Raid Protection</h4>
            <p className="text-sm text-gray-400">Protect your server from raids and spam attacks.</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
