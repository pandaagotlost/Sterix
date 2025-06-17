import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WelcomeDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Welcome System</h1>
        <p className="text-lg text-gray-300">
          Sterix provides a customizable welcome system to greet new members and assign roles automatically.
        </p>
      </div>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Setting Up Welcome Messages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            The Welcome system sends customized messages when users join your server. Here's how to set it up:
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">1. Enable Welcome System</h3>
            <p className="text-gray-300">First, enable the welcome system with the following command:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.welcome enable</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">2. Set Up Welcome Channel and Message</h3>
            <p className="text-gray-300">Configure the welcome channel and message:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.welcome setup</code>
            </div>
            <p className="text-gray-300 text-sm">
              This will guide you through setting up the welcome channel and customizing the welcome message.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">3. Configure Additional Settings</h3>
            <p className="text-gray-300">Adjust additional welcome settings:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.welcome config</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Setting Up Auto-Roles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            The Auto-Role system automatically assigns roles to new members when they join.
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">1. Add Auto-Roles for Humans</h3>
            <p className="text-gray-300">Set roles to be automatically assigned to human users:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.autorole humans add @Member</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">2. Add Auto-Roles for Bots</h3>
            <p className="text-gray-300">Set roles to be automatically assigned to bots:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.autorole bots add @Bot</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">3. Configure Auto-Role Settings</h3>
            <p className="text-gray-300">Adjust additional auto-role settings:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.autorole config</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Command Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Welcome Commands</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.welcome enable</code> - Enable the welcome system
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.welcome disable</code> - Disable the welcome system
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.welcome setup</code> - Set up the welcome system
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.welcome config</code> - Configure welcome settings
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">Auto-Role Commands</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.autorole</code> - Shows all autoroles commands
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.autorole humans add</code> - Add auto role for
                  humans
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.autorole humans remove</code> - Remove auto role for
                  humans
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.autorole bots add</code> - Add auto role for bots
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.autorole bots remove</code> - Remove auto role for
                  bots
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.autorole config</code> - Configure auto role
                  settings
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.autorole reset all</code> - Reset all auto roles
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.autorole reset bots</code> - Reset bot auto roles
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.autorole reset humans</code> - Reset human auto
                  roles
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
