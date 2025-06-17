"use client"

import { useBotStats } from "@/contexts/bot-stats-context"
import { Users, Server, MessageSquare, Clock } from "lucide-react"

export function HomeStatistics() {
  const { stats } = useBotStats()

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
      <div className="bg-[#252632]/50 rounded-lg p-4 text-center">
        <div className="flex justify-center mb-3">
          <Server className="h-6 w-6 text-[#5865f2]" />
        </div>
        <div className="text-3xl font-bold text-white">{stats.servers}</div>
        <div className="text-gray-400 text-sm">Servers</div>
      </div>

      <div className="bg-[#252632]/50 rounded-lg p-4 text-center">
        <div className="flex justify-center mb-3">
          <Users className="h-6 w-6 text-[#ff73fa]" />
        </div>
        <div className="text-3xl font-bold text-white">{stats.users}</div>
        <div className="text-gray-400 text-sm">Users</div>
      </div>

      <div className="bg-[#252632]/50 rounded-lg p-4 text-center">
        <div className="flex justify-center mb-3">
          <MessageSquare className="h-6 w-6 text-[#ffa629]" />
        </div>
        <div className="text-3xl font-bold text-white">{stats.commands}</div>
        <div className="text-gray-400 text-sm">Commands</div>
      </div>

      <div className="bg-[#252632]/50 rounded-lg p-4 text-center">
        <div className="flex justify-center mb-3">
          <Clock className="h-6 w-6 text-[#3498db]" />
        </div>
        <div className="text-3xl font-bold text-white">{stats.uptime}</div>
        <div className="text-gray-400 text-sm">Uptime</div>
      </div>
    </div>
  )
}
