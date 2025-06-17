import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AntiRaidDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Anti-Raid Protection</h1>
        <p className="text-lg text-gray-300">
          Sterix provides powerful anti-raid and anti-nuke protection to keep your server safe from malicious attacks.
        </p>
      </div>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Setting Up Anti-Nuke</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            The Anti-Nuke system protects your server from mass deletions, bans, and other destructive actions. Here's
            how to set it up:
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">1. Enable Anti-Nuke</h3>
            <p className="text-gray-300">First, enable the Anti-Nuke system with the following command:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.antinuke enable</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">2. Set Punishment</h3>
            <p className="text-gray-300">Choose what happens to users who trigger the Anti-Nuke system:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.antinuke punishment set ban</code>
            </div>
            <p className="text-gray-300 text-sm">Available punishments: ban, kick, strip (remove all roles)</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">3. Whitelist Trusted Users</h3>
            <p className="text-gray-300">Add trusted users who should bypass the Anti-Nuke system:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.whitelist @User#1234</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">4. Add Extra Owners</h3>
            <p className="text-gray-300">Add users who should have owner-level bypass:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.extraowner set @User#1234</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">5. Check Your Settings</h3>
            <p className="text-gray-300">Verify your Anti-Nuke configuration:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.antinuke show</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Protected Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">The Anti-Nuke system protects against the following actions:</p>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Mass channel deletions</li>
            <li>Mass role deletions</li>
            <li>Mass member bans</li>
            <li>Mass member kicks</li>
            <li>Webhook spam</li>
            <li>Bot additions with dangerous permissions</li>
            <li>Permission changes that grant dangerous permissions</li>
          </ul>

          <p className="text-gray-300 mt-4">
            When a user performs too many of these actions in a short time, the Anti-Nuke system will automatically
            apply the configured punishment.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Command Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Anti-Nuke Commands</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.antinuke</code> - Shows all Anti-Nuke commands
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.antinuke enable</code> - Enable the Anti-Nuke system
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.antinuke disable</code> - Disable the Anti-Nuke
                  system
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.antinuke show</code> - Show the current Anti-Nuke
                  settings
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.antinuke punishment set</code> - Set the punishment
                  for violations
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">Whitelist Commands</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.whitelist &lt;user&gt;</code> - Add a user to bypass
                  Anti-Nuke
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.whitelist reset</code> - Reset the bypass whitelist
                  list
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.extraowner set</code> - Add an owner to bypass
                  Anti-Nuke
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.extraowner remove</code> - Remove an owner from the
                  bypass list
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.extraowner show</code> - Show the list of bypass
                  owners
                </li>
                <li>
                  <code className="bg-[#1a1b26] px-2 py-1 rounded">.extraowner reset</code> - Reset the bypass owners
                  list
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
