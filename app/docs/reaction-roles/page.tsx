import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReactionRolesDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Reaction Roles</h1>
        <p className="text-lg text-gray-300">This feature documentation is currently not available.</p>
      </div>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Feature Not Available</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            The documentation for Reaction Roles is currently being developed. This feature may not be available in the
            main bot yet or its documentation is still in progress.
          </p>

          <div className="space-y-2 mt-4">
            <h3 className="font-semibold text-white">Available Documentation</h3>
            <p className="text-gray-300">
              In the meantime, you can explore our available documentation for other features:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
              <li>
                <a href="/docs/moderation" className="text-[#9d7cff] hover:underline">
                  Moderation Commands
                </a>
              </li>
              <li>
                <a href="/docs/music" className="text-[#9d7cff] hover:underline">
                  Music System
                </a>
              </li>
              <li>
                <a href="/docs/auto-mod" className="text-[#9d7cff] hover:underline">
                  Auto-Moderation
                </a>
              </li>
              <li>
                <a href="/docs/welcome" className="text-[#9d7cff] hover:underline">
                  Welcome System
                </a>
              </li>
              <li>
                <a href="/docs/anti-raid" className="text-[#9d7cff] hover:underline">
                  Anti-Raid Protection
                </a>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
