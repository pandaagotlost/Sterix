import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function IgnoreDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Ignore System</h1>
        <p className="text-lg text-gray-300">
          Sterix's ignore system allows you to configure which channels and users the bot should ignore commands from.
        </p>
      </div>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Channel Ignore Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ignore channel add</h3>
            <p className="text-gray-300">
              Add a channel to the ignore list. Sterix will not respond to commands in this channel.
            </p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ignore channel add #bot-spam</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ignore channel remove</h3>
            <p className="text-gray-300">Remove a channel from the ignore list.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ignore channel remove #bot-spam</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">User Ignore Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ignore user add</h3>
            <p className="text-gray-300">
              Add a user to the ignore list. Sterix will not respond to commands from this user.
            </p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ignore user add @User</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ignore user remove</h3>
            <p className="text-gray-300">Remove a user from the ignore list.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ignore user remove @User</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ignore user show</h3>
            <p className="text-gray-300">Show the list of ignored users.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ignore user show</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Bypass Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ignore bypass user add</h3>
            <p className="text-gray-300">
              Add a user to bypass the ignore list. This user can use commands in ignored channels.
            </p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ignore bypass user add @Moderator</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ignore bypass user show</h3>
            <p className="text-gray-300">Show users who bypass the ignore list.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ignore bypass user show</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ignore bypass user remove</h3>
            <p className="text-gray-300">Remove a user from the ignore bypass list.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ignore bypass user remove @Moderator</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
