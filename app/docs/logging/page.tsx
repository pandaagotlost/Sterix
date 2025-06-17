import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoggingDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Logging System</h1>
        <p className="text-lg text-gray-300">
          Sterix provides a comprehensive logging system to keep track of all important events in your server.
        </p>
      </div>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Setting Up Logging</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            The Logging system records various server events and sends them to a designated channel. Here's how to set
            it up:
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">1. Setup Logging</h3>
            <p className="text-gray-300">Set up the logging system with the following command:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.logging setup</code>
            </div>
            <p className="text-gray-300 text-sm">
              This will guide you through the setup process, including selecting which events to log and where to log
              them.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">2. Check Logging Status</h3>
            <p className="text-gray-300">Verify your logging configuration:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.logging status</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">3. Reset Logging (If Needed)</h3>
            <p className="text-gray-300">If you need to start over, you can reset all logging settings:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.logging reset</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Logged Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">The Logging system can track various events, including:</p>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Member joins and leaves</li>
            <li>Message edits and deletions</li>
            <li>Role changes</li>
            <li>Channel creations, edits, and deletions</li>
            <li>Voice channel activity</li>
            <li>Server settings changes</li>
            <li>Moderation actions (bans, kicks, etc.)</li>
            <li>Nickname and username changes</li>
          </ul>

          <p className="text-gray-300 mt-4">
            Each type of event can be sent to a different channel if desired, allowing you to organize your logs
            effectively.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Command Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="font-semibold text-white">Logging Commands</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <code className="bg-[#1a1b26] px-2 py-1 rounded">.logging setup</code> - Setup logging features
              </li>
              <li>
                <code className="bg-[#1a1b26] px-2 py-1 rounded">.logging reset</code> - Resets all Logging Config
              </li>
              <li>
                <code className="bg-[#1a1b26] px-2 py-1 rounded">.logging status</code> - Show Logging Status of this
                Guild
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
