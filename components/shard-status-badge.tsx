"use client"

import { useStatus } from "@/contexts/status-context"

export function ShardStatusBadge({ shardNumber }: { shardNumber: number }) {
  const { statistics } = useStatus()

  // You can add logic here to check if a specific shard is online
  const isOnline = true

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-md p-2 text-white">
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`}></div>
        <span className="font-medium">Shard {shardNumber}</span>
      </div>
      <div className="mt-1 text-xs">
        <div>Uptime: 20d</div>
        <div>Ping: 13ms</div>
        <div>Servers: 1.1k+</div>
        <div>Members: 500k</div>
      </div>
    </div>
  )
}
