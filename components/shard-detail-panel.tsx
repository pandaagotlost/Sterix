"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShardStatusBadge } from "@/components/shard-status-badge"
import { useStatus } from "@/contexts/status-context"

export function ShardDetailPanel() {
  const { statistics } = useStatus()
  const [selectedShard, setSelectedShard] = useState(0)

  return (
    <Card className="bg-[#252632]/80 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Shard Status Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <ShardStatusBadge shardNumber={selectedShard} />
          <div className="bg-zinc-900 border border-zinc-800 rounded-md p-4">
            <h3 className="text-white font-medium mb-2">Shard Overview</h3>
            <p className="text-gray-300 text-sm">Total Shards: {statistics.shards}</p>
            <p className="text-gray-300 text-sm">All shards are currently operational with an average ping of 13ms.</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {Array.from({ length: Math.min(statistics.shards, 16) }, (_, i) => (
            <div
              key={i}
              onClick={() => setSelectedShard(i)}
              className={`flex items-center justify-center text-white font-medium rounded-md p-2 cursor-pointer 
                ${selectedShard === i ? "bg-[#9d7cff]" : "bg-green-500 hover:bg-green-600"}`}
            >
              {i}
            </div>
          ))}
          {statistics.shards > 16 && (
            <div className="flex items-center justify-center bg-zinc-800 text-white font-medium rounded-md p-2">
              +{statistics.shards - 16} more
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
