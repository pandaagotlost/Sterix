import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, Check, Info } from "lucide-react"

export default function PermissionsDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Bot Permissions</h1>
        <p className="text-lg text-gray-300">
          Understanding the permissions Sterix needs to function properly in your Discord server.
        </p>
      </div>

      {/* Alert box */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-white mb-1">Important Note</h3>
          <p className="text-gray-300 text-sm">
            Sterix requires certain permissions to function properly. Without these permissions, some features may not
            work as expected. Make sure to give the bot the necessary permissions when adding it to your server.
          </p>
        </div>
      </div>

      <Card className="bg-[#2b2d31] border-[#1e1f22]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#5865f2]" />
            Required Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-white">Manage Server</span>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-300">Required for configuring server-wide settings.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-white">Manage Roles</span>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-300">Needed for reaction roles and role management commands.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-white">Manage Channels</span>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-300">Required for creating and managing ticket channels.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-white">Kick Members</span>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-300">Needed for moderation commands like kick.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-white">Ban Members</span>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-300">Required for ban and tempban commands.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-white">Manage Messages</span>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-300">Needed for message cleanup and auto-moderation.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-white">Read Message History</span>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-300">Required for logging and message context.</p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-white">Send Messages</span>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-300">Needed for the bot to respond to commands.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#2b2d31] border-[#1e1f22]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Info className="h-5 w-5 text-[#5865f2]" />
            Permission Hierarchy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Discord uses a role hierarchy system. Sterix can only manage roles that are positioned below its highest
            role. For best results, place the Sterix role near the top of your server's role list.
          </p>

          <div className="bg-[#36393f] p-4 rounded-md">
            <h3 className="font-semibold text-white mb-3">Recommended Role Setup</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span>Server Owner</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span>Administrators</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-4 h-4 bg-[#5865f2] rounded-full"></div>
                <span>Sterix Bot</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Moderators</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span>Custom Roles</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                <span>Members</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#2b2d31] border-[#1e1f22]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Troubleshooting Permission Issues
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="bg-[#36393f] p-3 rounded-md">
              <h3 className="font-medium text-white mb-2">Bot can't create channels or roles</h3>
              <p className="text-sm text-gray-300">
                Check that Sterix has the "Manage Channels" and "Manage Roles" permissions, and that its role is
                positioned above any roles it needs to manage.
              </p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <h3 className="font-medium text-white mb-2">Bot can't send messages in certain channels</h3>
              <p className="text-sm text-gray-300">
                Verify channel-specific permissions. The bot may be affected by channel permission overwrites that
                restrict its ability to send messages.
              </p>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <h3 className="font-medium text-white mb-2">Bot can't ban or kick members</h3>
              <p className="text-sm text-gray-300">
                Ensure Sterix has the "Ban Members" and "Kick Members" permissions, and that it's not trying to moderate
                users with roles higher than its own.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
