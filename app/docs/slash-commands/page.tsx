import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, Shield, MessageSquare, Users, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SlashCommandsDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Slash Commands</h1>
        <p className="text-lg text-gray-300">
          Sterix supports Discord's slash commands for easy and intuitive interaction.
        </p>
      </div>

      <div className="bg-[#5865f2]/10 border border-[#5865f2]/30 rounded-md p-4 flex items-start gap-3">
        <Command className="h-5 w-5 text-[#5865f2] mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-white mb-1">Using Slash Commands</h3>
          <p className="text-gray-300 text-sm">
            Type <code className="bg-[#36393f] px-1 py-0.5 rounded text-white">/</code> in any channel where Sterix has
            access to see a list of available commands. Discord will show autocomplete suggestions as you type.
          </p>
        </div>
      </div>

      <Card className="bg-[#2b2d31] border-[#1e1f22]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#5865f2]" />
            Moderation Commands
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">/ban</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300 mb-2">Bans a user from your server.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm">
                <div className="text-gray-400">Options:</div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="text-[#5865f2]">user</div>
                  <div className="text-gray-300">The user to ban</div>
                  <div className="text-[#5865f2]">reason</div>
                  <div className="text-gray-300">Reason for the ban (optional)</div>
                  <div className="text-[#5865f2]">delete_days</div>
                  <div className="text-gray-300">Days of messages to delete (0-7)</div>
                </div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">/kick</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300 mb-2">Kicks a user from your server.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm">
                <div className="text-gray-400">Options:</div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="text-[#5865f2]">user</div>
                  <div className="text-gray-300">The user to kick</div>
                  <div className="text-[#5865f2]">reason</div>
                  <div className="text-gray-300">Reason for the kick (optional)</div>
                </div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">/warn</code>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300 mb-2">Issues a warning to a user.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm">
                <div className="text-gray-400">Options:</div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="text-[#5865f2]">user</div>
                  <div className="text-gray-300">The user to warn</div>
                  <div className="text-[#5865f2]">reason</div>
                  <div className="text-gray-300">Reason for the warning</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#2b2d31] border-[#1e1f22]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-[#5865f2]" />
            Role Management Commands
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">/role add</code>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300 mb-2">Adds a role to a user.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm">
                <div className="text-gray-400">Options:</div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="text-[#5865f2]">user</div>
                  <div className="text-gray-300">The user to add the role to</div>
                  <div className="text-[#5865f2]">role</div>
                  <div className="text-gray-300">The role to add</div>
                </div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">/role remove</code>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300 mb-2">Removes a role from a user.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm">
                <div className="text-gray-400">Options:</div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="text-[#5865f2]">user</div>
                  <div className="text-gray-300">The user to remove the role from</div>
                  <div className="text-[#5865f2]">role</div>
                  <div className="text-gray-300">The role to remove</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#2b2d31] border-[#1e1f22]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-[#5865f2]" />
            Utility Commands
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">/ticket create</code>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Everyone</Badge>
              </div>
              <p className="text-sm text-gray-300 mb-2">Creates a new support ticket.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm">
                <div className="text-gray-400">Options:</div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="text-[#5865f2]">title</div>
                  <div className="text-gray-300">Title of the ticket</div>
                  <div className="text-[#5865f2]">description</div>
                  <div className="text-gray-300">Description of your issue (optional)</div>
                </div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">/giveaway start</code>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300 mb-2">Starts a new giveaway.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm">
                <div className="text-gray-400">Options:</div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="text-[#5865f2]">prize</div>
                  <div className="text-gray-300">The prize for the giveaway</div>
                  <div className="text-[#5865f2]">duration</div>
                  <div className="text-gray-300">Duration of the giveaway (e.g., 1h, 1d)</div>
                  <div className="text-[#5865f2]">winners</div>
                  <div className="text-gray-300">Number of winners (default: 1)</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#2b2d31] border-[#1e1f22]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-[#5865f2]" />
            Configuration Commands
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">/config prefix</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300 mb-2">Changes the bot's command prefix for text commands.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm">
                <div className="text-gray-400">Options:</div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="text-[#5865f2]">prefix</div>
                  <div className="text-gray-300">The new prefix to use</div>
                </div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">/config welcome</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300 mb-2">Configures the welcome message system.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm">
                <div className="text-gray-400">Options:</div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="text-[#5865f2]">channel</div>
                  <div className="text-gray-300">The channel for welcome messages</div>
                  <div className="text-[#5865f2]">message</div>
                  <div className="text-gray-300">The welcome message template</div>
                  <div className="text-[#5865f2]">enabled</div>
                  <div className="text-gray-300">Enable or disable welcome messages</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-[#2b2d31] border border-[#1e1f22] rounded-lg p-5">
        <h3 className="text-xl font-bold text-white mb-4">Command Examples</h3>

        <div className="space-y-4">
          <div>
            <h4 className="text-white font-medium mb-2">Banning a user</h4>
            <div className="bg-[#36393f] p-3 rounded-md font-mono text-sm text-white">
              /ban user:@TroubleMaker reason:Spamming delete_days:1
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Creating a ticket</h4>
            <div className="bg-[#36393f] p-3 rounded-md font-mono text-sm text-white">
              /ticket create title:Need help with bot description:I can't get the music commands to work
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Starting a giveaway</h4>
            <div className="bg-[#36393f] p-3 rounded-md font-mono text-sm text-white">
              /giveaway start prize:Discord Nitro duration:24h winners:2
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
