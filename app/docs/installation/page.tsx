import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InstallationDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Installation</h1>
        <p className="text-lg text-gray-300">Learn how to add Sterix to your Discord server.</p>
      </div>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Adding Sterix to Your Server</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">Adding Sterix to your Discord server is quick and easy:</p>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">1. Use the Invite Link</h3>
            <p className="text-gray-300">Click the "Add to Discord" button on our website or use the following link:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <a
                href="https://discord.com/oauth2/authorize?client_id=1286376669770420304&permissions=2113268958&scope=bot%20applications.commands"
                className="text-[#9d7cff] hover:underline"
              >
                https://discord.com/oauth2/authorize?client_id=1286376669770420304&permissions=2113268958&scope=bot%20applications.commands
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">2. Select Your Server</h3>
            <p className="text-gray-300">Choose the server where you want to add Sterix from the dropdown menu.</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">3. Authorize the Bot</h3>
            <p className="text-gray-300">Review the permissions and click "Authorize" to add Sterix to your server.</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">4. Complete Verification</h3>
            <p className="text-gray-300">If prompted, complete the CAPTCHA verification to confirm you're not a bot.</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">5. Start Using Sterix</h3>
            <p className="text-gray-300">
              Once Sterix joins your server, you can start using commands right away! Use{" "}
              <code className="bg-[#1a1b26] px-2 py-1 rounded">.help</code> to see a list of available commands.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
