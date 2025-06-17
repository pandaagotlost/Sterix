import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GeneralDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">General Commands</h1>
        <p className="text-lg text-gray-300">
          Sterix provides a variety of general utility commands to help you manage your server and get information about
          users, roles, and more.
        </p>
      </div>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Information Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.avatar</h3>
            <p className="text-gray-300">Get the avatar of a user.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.avatar @User</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.banner user</h3>
            <p className="text-gray-300">Get the banner of a user.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.banner user @User</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.banner server</h3>
            <p className="text-gray-300">Get the banner of the server.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.banner server</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.servericon</h3>
            <p className="text-gray-300">Get the server's icon.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.servericon</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.membercount</h3>
            <p className="text-gray-300">Get the total number of members in the server.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.membercount</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Server Information Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.serverinfo</h3>
            <p className="text-gray-300">Get detailed information about the server.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.serverinfo</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.userinfo</h3>
            <p className="text-gray-300">Get information about a user.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.userinfo @User</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.roleinfo</h3>
            <p className="text-gray-300">Get information about a role.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.roleinfo @Role</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.botinfo</h3>
            <p className="text-gray-300">Get information about the bot.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.botinfo</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.channelinfo</h3>
            <p className="text-gray-300">Get information about a specific channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.channelinfo #channel</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Utility Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.poll</h3>
            <p className="text-gray-300">Create a poll for server members to vote on.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.poll "Is this a good bot?" "Yes" "No" "Maybe"</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.snipe</h3>
            <p className="text-gray-300">View the last deleted message in the channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.snipe</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boosts</h3>
            <p className="text-gray-300">View the server's boost status.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boosts</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.joined-at</h3>
            <p className="text-gray-300">Check when a user joined the server.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.joined-at @User</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ping</h3>
            <p className="text-gray-300">Check the bot's ping.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ping</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Bot Information Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.stats</h3>
            <p className="text-gray-300">Get the bot's statistics.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.stats</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.uptime</h3>
            <p className="text-gray-300">View the bot's uptime.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.uptime</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.invite</h3>
            <p className="text-gray-300">Get the bot's invite link.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.invite</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.vote</h3>
            <p className="text-gray-300">Vote for the bot on a voting platform.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.vote</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.github</h3>
            <p className="text-gray-300">Get the bot's GitHub link.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.github</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
