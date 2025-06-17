import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, Check, User, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SecurityDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Security Module</h1>
        <p className="text-lg text-gray-300">
          Protect your server from malicious actions with Sterix's Anti-Nuke system.
        </p>
      </div>

      <div className="bg-[#5865f2]/10 border border-[#5865f2]/30 rounded-md p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-[#5865f2] mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-white mb-1">What is Anti-Nuke?</h3>
          <p className="text-gray-300 text-sm">
            Anti-Nuke is a security system that protects your server from mass bans, kicks, channel deletions, and other
            harmful actions that could damage your server. It monitors for suspicious activity and takes action based on
            your configured settings.
          </p>
        </div>
      </div>

      <Card className="bg-[#2b2d31] border-[#1e1f22]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#5865f2]" />
            Anti-Nuke Commands
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.antinuke</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Shows all Anti-Nuke commands and current status.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.antinuke enable</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Enable the Anti-Nuke system for your server.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.antinuke disable</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Disable the Anti-Nuke system for your server.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.antinuke show</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Show the current Anti-Nuke settings for your server.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.antinuke punishment set</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Set the punishment for Anti-Nuke violations (ban, kick, etc.).</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#2b2d31] border-[#1e1f22]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5 text-[#5865f2]" />
            Whitelist Commands
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.whitelist &lt;user&gt;</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Add a user to the whitelist to bypass Anti-Nuke checks.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.whitelist @TrustedMod</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.whitelist reset</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Reset the entire whitelist, removing all whitelisted users.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#2b2d31] border-[#1e1f22]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-[#5865f2]" />
            Extra Owner Commands
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.extraowner set</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Owner</Badge>
              </div>
              <p className="text-sm text-gray-300">Add an owner to bypass Anti-Nuke checks (server owner only).</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.extraowner set @TrustedAdmin</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.extraowner remove</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Owner</Badge>
              </div>
              <p className="text-sm text-gray-300">Remove an owner from the bypass list.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.extraowner remove @FormerAdmin</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.extraowner show</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
              </div>
              <p className="text-sm text-gray-300">Show the list of bypass owners.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.extraowner reset</code>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Owner</Badge>
              </div>
              <p className="text-sm text-gray-300">Reset the bypass owners list, removing all extra owners.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-[#2b2d31] border border-[#1e1f22] rounded-lg p-5">
        <h3 className="text-xl font-bold text-white mb-4">Security Best Practices</h3>

        <div className="space-y-4">
          <div className="flex gap-3">
            <Check className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">Limit Whitelisted Users</h4>
              <p className="text-sm text-gray-300">
                Only whitelist users you completely trust. Each whitelisted user is a potential security risk if their
                account is compromised.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Check className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">Regular Audits</h4>
              <p className="text-sm text-gray-300">
                Regularly review your whitelist and extra owners list to ensure only necessary users have these
                privileges.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Check className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">Strict Punishments</h4>
              <p className="text-sm text-gray-300">
                Set strict punishments for violations to ensure maximum security for your server.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
