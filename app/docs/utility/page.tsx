import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UtilityDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Utility Commands</h1>
        <p className="text-lg text-gray-300">
          Sterix provides a range of utility commands to help you manage your server more efficiently.
        </p>
      </div>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Embed Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.embed</h3>
            <p className="text-gray-300">Create a custom embed message.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.embed</code>
            </div>
            <p className="text-gray-300 text-sm">
              This will open an interactive embed builder to create custom embeds for your server.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Setup Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.setup</h3>
            <p className="text-gray-300">Shows all setup commands.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.setup</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.setup create</h3>
            <p className="text-gray-300">Create a custom alias.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.setup create [alias] [role]</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.setup delete</h3>
            <p className="text-gray-300">Delete a custom alias.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.setup delete [alias]</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.setup config</h3>
            <p className="text-gray-300">Configure custom aliases.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.setup config</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.setup reqrole</h3>
            <p className="text-gray-300">Set up required roles for custom alias roles.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.setup reqrole @Role</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Autoresponder Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ar</h3>
            <p className="text-gray-300">Shows all autoresponder commands.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ar</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ar create</h3>
            <p className="text-gray-300">Create an autoresponder trigger.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ar create [trigger] [response]</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ar delete</h3>
            <p className="text-gray-300">Delete an autoresponder trigger.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ar delete [trigger]</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ar edit</h3>
            <p className="text-gray-300">Edit an autoresponder response.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ar edit [trigger] [new response]</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ar config</h3>
            <p className="text-gray-300">Configure autoresponders.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ar config</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">List Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.list boosters</h3>
            <p className="text-gray-300">List all boosters in the server.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.list boosters</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.list inrole</h3>
            <p className="text-gray-300">List all members with a role.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.list inrole @Role</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.list emojis</h3>
            <p className="text-gray-300">List all emojis in the server.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.list emojis</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.list bots</h3>
            <p className="text-gray-300">List all bots in the server.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.list bots</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.list roles</h3>
            <p className="text-gray-300">List all roles in the server.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.list roles</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
