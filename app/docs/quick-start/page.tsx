import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function QuickStartDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Quick Start</h1>
        <p className="text-lg text-gray-300">
          Get started with Sterix quickly with these essential commands and features.
        </p>
      </div>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Essential Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">Here are some essential commands to get you started with Sterix:</p>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">Help Command</h3>
            <p className="text-gray-300">Get a list of all available commands:</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.help</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">Server Setup</h3>
            <p className="text-gray-300">Set up essential features for your server:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
              <li>
                <code className="bg-[#1a1b26] px-2 py-1 rounded">.welcome setup</code> - Set up welcome messages
              </li>
              <li>
                <code className="bg-[#1a1b26] px-2 py-1 rounded">.autorole humans add @Role</code> - Set up auto-roles
                for new members
              </li>
              <li>
                <code className="bg-[#1a1b26] px-2 py-1 rounded">.logging setup</code> - Set up server logging
              </li>
              <li>
                <code className="bg-[#1a1b26] px-2 py-1 rounded">.automod enable</code> - Enable auto-moderation
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">Next Steps</h3>
            <p className="text-gray-300">
              Once you've set up the basics, explore more advanced features in our documentation:
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Link
                href="/docs/moderation"
                className="bg-[#1a1b26] p-3 rounded-md text-[#9d7cff] hover:bg-[#252632] transition-colors"
              >
                Moderation Commands
              </Link>
              <Link
                href="/docs/music"
                className="bg-[#1a1b26] p-3 rounded-md text-[#9d7cff] hover:bg-[#252632] transition-colors"
              >
                Music System
              </Link>
              <Link
                href="/docs/auto-mod"
                className="bg-[#1a1b26] p-3 rounded-md text-[#9d7cff] hover:bg-[#252632] transition-colors"
              >
                Auto-Moderation
              </Link>
              <Link
                href="/docs/anti-raid"
                className="bg-[#1a1b26] p-3 rounded-md text-[#9d7cff] hover:bg-[#252632] transition-colors"
              >
                Anti-Raid Protection
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
