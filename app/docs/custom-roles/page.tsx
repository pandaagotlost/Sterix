import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CustomRolesDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Custom Roles</h1>
        <p className="text-lg text-gray-300">
          Sterix allows you to create custom role commands that members can use to assign themselves specific roles.
        </p>
      </div>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Setting Up Custom Roles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            The Custom Roles system allows you to create commands that users can use to get specific roles. Here's how
            to set it up:
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">1. Set Required Role (Required) </h3>
            <p className="text-gray-300">
              First, you can set a role that users need to have before they can use custom role commands:
            </p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.setup reqrole @role </code>
            </div>
            <p className="text-gray-300 text-sm">
              This step is optional. If you skip it, all users can use the custom role commands.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">2. Create Custom Role Commands</h3>
            <p className="text-gray-300">Create a custom command that gives a specific role:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.setup create (aliases) (role) </code>
            </div>
            <p className="text-gray-300 text-sm">
              This creates a command <code>.red</code> that gives the @Red role.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">3. View Your Custom Role Commands</h3>
            <p className="text-gray-300">Check what custom role commands you've set up:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.setup list</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">4. Delete Custom Role Commands</h3>
            <p className="text-gray-300">Remove a custom role command if needed:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.setup delete (aliases) </code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Using Custom Role Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Once you've set up custom role commands, users can get roles by using the command:
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">Example Usage</h3>
            <p className="text-gray-300">If you created a command for the Red role:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.red @member </code>
            </div>
            <p className="text-gray-300">
              This will give the user the Red role. If they already have the role, it will remove it.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Command Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="font-semibold text-white">Custom Role Setup Commands</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <code className="bg-[#1a1b26] px-2 py-1 rounded">.setup reqrole</code> - Setups reqrole for customrole
                commands
              </li>
              <li>
                <code className="bg-[#1a1b26] px-2 py-1 rounded">.setup create &lt;aliases&gt; &lt;role&gt;</code> -
                Setups custom aliase role for the server
              </li>
              <li>
                <code className="bg-[#1a1b26] px-2 py-1 rounded">.setup delete &lt;aliases&gt;</code> - Delete a custom
                aliase role for the server
              </li>
              <li>
                <code className="bg-[#1a1b26] px-2 py-1 rounded">.setup list</code> - Shows custom aliases role for the
                server
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
