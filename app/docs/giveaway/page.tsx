import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, Clock, RefreshCw, List } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function GiveawayDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Giveaway Module</h1>
        <p className="text-lg text-gray-300">
          Create and manage giveaways in your server with Sterix's giveaway commands.
        </p>
      </div>

      <Card className="bg-[#2b2d31] border-[#1e1f22]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Gift className="h-5 w-5 text-[#5865f2]" />
            Giveaway Commands
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.giveaway start</code>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300">Start a new giveaway in your server.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.giveaway start 24h 2 Discord Nitro</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.giveaway end</code>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300">End an active giveaway early.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.giveaway end [message-id]</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.giveaway reroll</code>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300">Reroll a giveaway to select new winners.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.giveaway reroll [message-id]</div>
              </div>
            </div>

            <div className="bg-[#36393f] p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <code className="bg-[#1e1f22] px-2 py-1 rounded text-white font-mono">.giveaway list</code>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Mod</Badge>
              </div>
              <p className="text-sm text-gray-300">List all active giveaways in your server.</p>
              <div className="bg-[#1e1f22] p-2 rounded-md text-sm mt-2">
                <div className="text-gray-400">Example:</div>
                <div className="text-white font-mono mt-1">.giveaway list</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-[#2b2d31] border border-[#1e1f22] rounded-lg p-5">
        <h3 className="text-xl font-bold text-white mb-4">Giveaway Tips</h3>

        <div className="space-y-4">
          <div className="flex gap-3">
            <Clock className="h-5 w-5 text-[#5865f2] mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">Duration Format</h4>
              <p className="text-sm text-gray-300">
                Use time formats like <code className="bg-[#36393f] px-1 py-0.5 rounded text-white">1h</code> (1 hour),
                <code className="bg-[#36393f] px-1 py-0.5 rounded text-white">1d</code> (1 day), or
                <code className="bg-[#36393f] px-1 py-0.5 rounded text-white">1w</code> (1 week) when setting giveaway
                duration.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <RefreshCw className="h-5 w-5 text-[#5865f2] mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">Rerolling Winners</h4>
              <p className="text-sm text-gray-300">
                You can reroll winners multiple times if needed. This is useful if a winner doesn't claim their prize.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <List className="h-5 w-5 text-[#5865f2] mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">Multiple Winners</h4>
              <p className="text-sm text-gray-300">
                You can specify multiple winners when starting a giveaway by adding a number after the duration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
