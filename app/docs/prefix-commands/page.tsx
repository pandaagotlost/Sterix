import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, MessageSquare, Users, Settings, Info, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function PrefixCommandsDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Prefix Commands</h1>
        <p className="text-lg text-gray-300">
          In addition to slash commands, Sterix supports traditional text-based prefix commands.
        </p>
      </div>

      <div className="bg-[#5865f2]/10 border border-[#5865f2]/30 rounded-md p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-[#5865f2] mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-white mb-1">Default Prefix</h3>
          <p className="text-gray-300 text-sm">
            The default prefix for Sterix is <code className="bg-[#36393f] px-1 py-0.5 rounded text-white">.</code>{" "}
            (dot). You can change this using the{" "}
            <code className="bg-[#36393f] px-1 py-0.5 rounded text-white">.prefix set</code> command.
          </p>
        </div>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-white mb-1">Slash Commands vs Prefix Commands</h3>
          <p className="text-gray-300 text-sm">
            While prefix commands are still supported, we recommend using slash commands when possible as they provide
            better autocomplete, parameter validation, and are more intuitive for new users.
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
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.ban @user [reason]</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Bans a user from your server with an optional reason.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.ban @TroubleMaker Spamming in channels</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.kick @user [reason]</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300">Kicks a user from your server with an optional reason.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.kick @TroubleMaker Please follow the rules</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">
                  .mute @user [duration] [reason]
                </code>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300">Temporarily mutes a user for the specified duration.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.mute @TroubleMaker 1h Excessive caps</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.clear [amount]</code>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300">
                Deletes the specified number of messages from the current channel.
              </p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.clear 50</div>
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
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.role add @user @role</code>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300">Adds a role to the specified user.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.role add @FriendlyUser @Trusted</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.role remove @user @role</code>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300">Removes a role from the specified user.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.role remove @FriendlyUser @Trusted</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.role create [name] [color]</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Creates a new role with the specified name and color.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.role create VIP #ffcc00</div>
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
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.ticket create [title]</code>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Everyone</Badge>
              </div>
              <p className="text-sm text-gray-300">Creates a new support ticket with the specified title.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.ticket create Need help with commands</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.ticket close [reason]</code>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300">Closes the current ticket channel with an optional reason.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.ticket close Issue resolved</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">
                  .giveaway start [duration] [winners] [prize]
                </code>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300">Starts a new giveaway with the specified parameters.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.giveaway start 24h 2 Discord Nitro</div>
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
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.prefix set [prefix]</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Changes the bot's command prefix for your server.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.prefix set !</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.welcome channel #channel</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Sets the channel for welcome messages.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.welcome channel #welcome</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.welcome message [message]</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">
                Sets the welcome message. Use {"{user}"} to mention the new member.
              </p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.welcome message Welcome {"{user}"} to our server!</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-[#2b2d31] border border-[#1e1f22] rounded-lg p-5">
        <h3 className="text-xl font-bold text-white mb-4">Command Variables</h3>

        <p className="text-gray-300 mb-4">
          Some commands support variables that are replaced with actual values when the command is executed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#36393f] p-3 rounded-md">
            <div className="font-medium text-white mb-2">{"{user}"}</div>
            <p className="text-sm text-gray-300">Mentions the user (e.g., @Username)</p>
          </div>

          <div className="bg-[#36393f] p-3 rounded-md">
            <div className="font-medium text-white mb-2">{"{username}"}</div>
            <p className="text-sm text-gray-300">The user's name without mention</p>
          </div>

          <div className="bg-[#36393f] p-3 rounded-md">
            <div className="font-medium text-white mb-2">{"{server}"}</div>
            <p className="text-sm text-gray-300">The name of your Discord server</p>
          </div>

          <div className="bg-[#36393f] p-3 rounded-md">
            <div className="font-medium text-white mb-2">{"{count}"}</div>
            <p className="text-sm text-gray-300">The current member count of the server</p>
          </div>
        </div>
      </div>
    </div>
  )
}
