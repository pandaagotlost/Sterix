"use client"

import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"
import { BarChart, Users, Server, Cpu, MemoryStickIcon as Memory, Database, HardDrive } from "lucide-react"
import { useStatus } from "@/contexts/status-context"

// System resource usage type
interface SystemResources {
  cpu: number
  memory: number
  disk: number
  uptime: string
}

export default function AdminDashboardPage() {
  const { currentUser } = useAuth()
  const { statistics } = useStatus()
  const [systemResources, setSystemResources] = useState<SystemResources>({
    cpu: 45,
    memory: 62,
    disk: 28,
    uptime: "7 days, 14 hours",
  })
  const [serverCount, setServerCount] = useState<number | null>(null)
  const [recentActivity, setRecentActivity] = useState<
    Array<{
      type: string
      message: string
      time: string
    }>
  >([])

  // Simulate fetching real server data
  useEffect(() => {
    // In a real app, this would be an API call to get actual server count
    const fetchServerCount = async () => {
      try {
        // This is a simulation - in a real app, you'd fetch from your API
        const count = localStorage.getItem("sterix_server_count")
        if (count) {
          setServerCount(Number.parseInt(count))
        } else {
          // Default fallback if no stored count
          setServerCount(Number.parseInt(statistics.servers.replace(/\D/g, "")) || 150)
        }
      } catch (error) {
        console.error("Error fetching server count:", error)
        setServerCount(150) // Fallback
      }
    }

    // Simulate fetching system resources
    const fetchSystemResources = async () => {
      try {
        // In a real app, this would be an API call to get actual system metrics
        // For demo purposes, we'll generate some realistic values
        setSystemResources({
          cpu: Math.floor(Math.random() * 30) + 20, // 20-50%
          memory: Math.floor(Math.random() * 25) + 45, // 45-70%
          disk: Math.floor(Math.random() * 15) + 20, // 20-35%
          uptime: "7 days, 14 hours",
        })
      } catch (error) {
        console.error("Error fetching system resources:", error)
      }
    }

    // Simulate fetching recent activity
    const fetchRecentActivity = async () => {
      try {
        // In a real app, this would be an API call to get actual activity
        const activities = [
          {
            type: "server_join",
            message: "Bot joined a new server: Gaming Community",
            time: "10 minutes ago",
          },
          {
            type: "server_leave",
            message: "Bot left server: Test Server",
            time: "1 hour ago",
          },
          {
            type: "system_update",
            message: "System updated to version 1.2.1",
            time: "3 hours ago",
          },
          {
            type: "error",
            message: "API rate limit reached on Discord API",
            time: "5 hours ago",
          },
          {
            type: "server_join",
            message: "Bot joined a new server: Anime Fans",
            time: "1 day ago",
          },
        ]
        setRecentActivity(activities)
      } catch (error) {
        console.error("Error fetching recent activity:", error)
      }
    }

    fetchServerCount()
    fetchSystemResources()
    fetchRecentActivity()

    // Set up interval to refresh data
    const interval = setInterval(() => {
      fetchSystemResources()
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [statistics.servers])

  return (
    <div className="min-h-screen bg-[#1a1b26]">
      <AdminSidebar />
      <div className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400 mb-6">Welcome back, {currentUser?.name}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card className="bg-[#252632]/80 border-gray-700">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <h3 className="text-white text-2xl font-bold">{statistics.users}</h3>
              </div>
              <div className="bg-[#9d7cff]/20 p-3 rounded-full">
                <Users className="h-6 w-6 text-[#9d7cff]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#252632]/80 border-gray-700">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Servers</p>
                <h3 className="text-white text-2xl font-bold">{serverCount || statistics.servers}</h3>
              </div>
              <div className="bg-[#7c4dff]/20 p-3 rounded-full">
                <Server className="h-6 w-6 text-[#7c4dff]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#252632]/80 border-gray-700">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Uptime</p>
                <h3 className="text-white text-2xl font-bold">{statistics.uptime}</h3>
              </div>
              <div className="bg-[#4dff91]/20 p-3 rounded-full">
                <BarChart className="h-6 w-6 text-[#4dff91]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#252632]/80 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 bg-[#1a1b26] rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "error"
                          ? "bg-red-500"
                          : activity.type === "server_join"
                            ? "bg-green-500"
                            : activity.type === "server_leave"
                              ? "bg-yellow-500"
                              : "bg-[#9d7cff]"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.message}</p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#252632]/80 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-[#9d7cff]" />
                      <p className="text-gray-300 text-sm">CPU Usage</p>
                    </div>
                    <p className="text-gray-300 text-sm">{systemResources.cpu}%</p>
                  </div>
                  <div className="w-full bg-[#1a1b26] rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        systemResources.cpu > 80
                          ? "bg-red-500"
                          : systemResources.cpu > 60
                            ? "bg-yellow-500"
                            : "bg-[#9d7cff]"
                      }`}
                      style={{ width: `${systemResources.cpu}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Memory className="h-4 w-4 text-[#7c4dff]" />
                      <p className="text-gray-300 text-sm">Memory Usage</p>
                    </div>
                    <p className="text-gray-300 text-sm">{systemResources.memory}%</p>
                  </div>
                  <div className="w-full bg-[#1a1b26] rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        systemResources.memory > 80
                          ? "bg-red-500"
                          : systemResources.memory > 60
                            ? "bg-yellow-500"
                            : "bg-[#7c4dff]"
                      }`}
                      style={{ width: `${systemResources.memory}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-[#4dc9ff]" />
                      <p className="text-gray-300 text-sm">Disk Usage</p>
                    </div>
                    <p className="text-gray-300 text-sm">{systemResources.disk}%</p>
                  </div>
                  <div className="w-full bg-[#1a1b26] rounded-full h-2">
                    <div className="bg-[#4dc9ff] h-2 rounded-full" style={{ width: `${systemResources.disk}%` }}></div>
                  </div>
                </div>

                <div className="p-3 bg-[#1a1b26] rounded-lg mt-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-[#4dff91]" />
                      <p className="text-gray-300 text-sm">Server Info</p>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Node.js:</span>
                      <span className="text-white">v18.17.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next.js:</span>
                      <span className="text-white">v14.0.3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Uptime:</span>
                      <span className="text-white">{systemResources.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Environment:</span>
                      <span className="text-white">Production</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
