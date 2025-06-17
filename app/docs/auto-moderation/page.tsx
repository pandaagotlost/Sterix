import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, Check, X, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AutomodDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Automod Module</h1>
        <p className="text-lg text-gray-300">
          Automatically moderate your server with Sterix's powerful automod system.
        </p>
      </div>

      <div className="bg-[#5865f2]/10 border border-[#5865f2]/30 rounded-md p-4 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-[#5865f2] mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-white mb-1">What is Automod?</h3>
          <p className="text-gray-300 text-sm">
            Automod automatically detects and takes action against inappropriate content, spam, excessive mentions, and
            other unwanted behavior in your server without requiring manual moderation.
          </p>
        </div>
      </div>

      <Card className="bg-[#2b2d31] border-[#1e1f22]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-[#5865f2]" />
            Automod Commands
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.automod</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Shows all automod commands and current status.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.automod enable</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Enable Automod on your server.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.automod disable</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Disable Automod on your server.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.automod ignore</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Manage whitelisted roles and channels for Automod.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.automod ignore #staff-chat</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.automod unignore</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Remove channels and roles from the whitelist.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.automod unignore #general</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.automod punishment</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">
                Set the punishment for automod events (delete, warn, mute, kick, ban).
              </p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.automod punishment mute 10m</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-[#2b2d31] border border-[#1e1f22] rounded-lg p-5">
        <h3 className="text-xl font-bold text-white mb-4">What Automod Detects</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#36393f] p-3 rounded-md">
            <div className="font-medium text-white mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              Spam Detection
            </div>
            <p className="text-sm text-gray-300">Detects message spam, emoji spam, and mention spam</p>
          </div>

          <div className="bg-[#36393f] p-3 rounded-md">
            <div className="font-medium text-white mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              Inappropriate Content
            </div>
            <p className="text-sm text-gray-300">Filters profanity, slurs, and NSFW content</p>
          </div>

          <div className="bg-[#36393f] p-3 rounded-md">
            <div className="font-medium text-white mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              Invite Links
            </div>
            <p className="text-sm text-gray-300">Blocks Discord invite links to other servers</p>
          </div>

          <div className="bg-[#36393f] p-3 rounded-md">
            <div className="font-medium text-white mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              Mass Mentions
            </div>
            <p className="text-sm text-gray-300">Prevents users from mass mentioning members</p>
          </div>

          <div className="bg-[#36393f] p-3 rounded-md">
            <div className="font-medium text-white mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              Excessive Caps
            </div>
            <p className="text-sm text-gray-300">Detects messages with excessive capital letters</p>
          </div>

          <div className="bg-[#36393f] p-3 rounded-md">
            <div className="font-medium text-white mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              Malicious Links
            </div>
            <p className="text-sm text-gray-300">Blocks potentially harmful or phishing links</p>
          </div>
        </div>
      </div>

      <div className="bg-[#2b2d31] border border-[#1e1f22] rounded-lg p-5">
        <h3 className="text-xl font-bold text-white mb-4">Automod Best Practices</h3>

        <div className="space-y-4">
          <div className="flex gap-3">
            <Check className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">Whitelist Moderator Channels</h4>
              <p className="text-sm text-gray-300">
                Use the ignore command to whitelist channels where moderators discuss moderation issues to prevent false
                positives.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <X className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">Don't Over-Whitelist</h4>
              <p className="text-sm text-gray-300">
                Only whitelist channels and roles that truly need to be exempt from automod. Too many exemptions reduce
                effectiveness.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Check className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">Escalating Punishments</h4>
              <p className="text-sm text-gray-300">
                Consider setting up escalating punishments for repeat offenders through the punishment command.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
