import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BoostMessageDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Boost Message System</h1>
        <p className="text-lg text-gray-300">
          Sterix allows you to customize messages and rewards for users who boost your server, helping you show
          appreciation to your supporters.
        </p>
      </div>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Boost Role Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boostrole add</h3>
            <p className="text-gray-300">Add a role to be automatically assigned to users who boost your server.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boostrole add @Booster</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boostrole remove</h3>
            <p className="text-gray-300">Remove a role from the BoostMessage system.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boostrole remove @Booster</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boostrole config</h3>
            <p className="text-gray-300">View the current BoostMessage role configuration.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boostrole config</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boostrole reset</h3>
            <p className="text-gray-300">Reset all BoostMessage role settings.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boostrole reset</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Boost Channel Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boost channel add</h3>
            <p className="text-gray-300">Set a channel where boost messages will be sent.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boost channel add #server-boosts</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boost channel remove</h3>
            <p className="text-gray-300">Remove a channel from the BoostMessage system.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boost channel remove #server-boosts</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boost channel</h3>
            <p className="text-gray-300">View the current boost message channel settings.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boost channel</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Boost Message Customization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boost embed</h3>
            <p className="text-gray-300">Set up a custom embed for boost messages.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boost embed</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boost image</h3>
            <p className="text-gray-300">Set a custom image for boost messages.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boost image [image URL]</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boost message</h3>
            <p className="text-gray-300">Set a custom message for when users boost the server.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boost message Thank you {"{user}"} for boosting our server!</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boost ping</h3>
            <p className="text-gray-300">Configure whether to ping users when they boost.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boost ping enable</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boost test</h3>
            <p className="text-gray-300">Test the boost message system to see how it looks.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boost test</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boost thumbnail</h3>
            <p className="text-gray-300">Set a thumbnail image for boost message embeds.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boost thumbnail [image URL]</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boost autodel</h3>
            <p className="text-gray-300">Configure automatic deletion of boost messages after a certain time.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boost autodel 1h</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.boost</h3>
            <p className="text-gray-300">General boost message management and configuration.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.boost</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
