"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useBotStats } from "@/contexts/bot-stats-context"
import { Loader2, Save, Users, Server, MessageSquare, Clock, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminBotStatsPage() {
  const { stats, updateStats, isLoading } = useBotStats()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    servers: stats.servers,
    users: stats.users,
    commands: stats.commands,
    uptime: stats.uptime,
    supportServer: stats.supportServer,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    updateStats(formData)

    // Notify all tabs/windows about the update
    try {
      localStorage.setItem("sterix_stats_updated", Date.now().toString())
    } catch (error) {
      console.error("Error broadcasting stats update:", error)
    }

    toast({
      title: "Success",
      description: "Bot statistics updated successfully! Changes are now live for all users.",
    })
  }

  const handleReset = () => {
    setFormData({
      servers: stats.servers,
      users: stats.users,
      commands: stats.commands,
      uptime: stats.uptime,
      supportServer: stats.supportServer,
    })
  }

  return (
    <div className="min-h-screen bg-[#1a1b26]">
      <AdminSidebar />
      <div className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Bot Statistics Management</h1>
            <p className="text-gray-300 mt-1">Update bot statistics that appear across the website</p>
          </div>
          <div className="text-sm text-gray-400">Last updated: {stats.lastUpdated}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Statistics Display */}
          <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white">Current Live Statistics</CardTitle>
              <CardDescription className="text-gray-300">
                These are the current statistics shown to users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[#1a1b26] rounded-md">
                <Server className="h-5 w-5 text-[#5865f2]" />
                <div>
                  <p className="text-gray-300 text-sm">Servers</p>
                  <p className="text-white font-semibold">{stats.servers}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#1a1b26] rounded-md">
                <Users className="h-5 w-5 text-[#ff73fa]" />
                <div>
                  <p className="text-gray-300 text-sm">Users</p>
                  <p className="text-white font-semibold">{stats.users}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#1a1b26] rounded-md">
                <MessageSquare className="h-5 w-5 text-[#ffa629]" />
                <div>
                  <p className="text-gray-300 text-sm">Commands</p>
                  <p className="text-white font-semibold">{stats.commands}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#1a1b26] rounded-md">
                <Clock className="h-5 w-5 text-[#3498db]" />
                <div>
                  <p className="text-gray-300 text-sm">Uptime</p>
                  <p className="text-white font-semibold">{stats.uptime}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#1a1b26] rounded-md">
                <ExternalLink className="h-5 w-5 text-[#57f287]" />
                <div>
                  <p className="text-gray-300 text-sm">Support Server</p>
                  <a
                    href={stats.supportServer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5865f2] hover:underline text-sm"
                  >
                    {stats.supportServer}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Form */}
          <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Update Statistics</CardTitle>
              <CardDescription className="text-gray-300">
                Changes will be applied immediately across the entire website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="servers" className="text-gray-300">
                    Server Count
                  </Label>
                  <Input
                    id="servers"
                    value={formData.servers}
                    onChange={(e) => handleInputChange("servers", e.target.value)}
                    className="bg-[#1a1b26] border-gray-700 text-white"
                    placeholder="e.g., 1k+, 2.5k, 10,000+"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="users" className="text-gray-300">
                    User Count
                  </Label>
                  <Input
                    id="users"
                    value={formData.users}
                    onChange={(e) => handleInputChange("users", e.target.value)}
                    className="bg-[#1a1b26] border-gray-700 text-white"
                    placeholder="e.g., 500K+, 1M+, 2.5M"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commands" className="text-gray-300">
                    Commands Used
                  </Label>
                  <Input
                    id="commands"
                    value={formData.commands}
                    onChange={(e) => handleInputChange("commands", e.target.value)}
                    className="bg-[#1a1b26] border-gray-700 text-white"
                    placeholder="e.g., 450+, 1M+, 10M+"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="uptime" className="text-gray-300">
                    Uptime Percentage
                  </Label>
                  <Input
                    id="uptime"
                    value={formData.uptime}
                    onChange={(e) => handleInputChange("uptime", e.target.value)}
                    className="bg-[#1a1b26] border-gray-700 text-white"
                    placeholder="e.g., 99.97%, 99.9%"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportServer" className="text-gray-300">
                  Support Server URL
                </Label>
                <Input
                  id="supportServer"
                  value={formData.supportServer}
                  onChange={(e) => handleInputChange("supportServer", e.target.value)}
                  className="bg-[#1a1b26] border-gray-700 text-white"
                  placeholder="https://discord.gg/..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff] flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Reset
                </Button>
              </div>

              <div className="bg-[#1a1b26] p-4 rounded-md border border-gray-700">
                <h4 className="text-white font-medium mb-2">💡 Tips for Statistics</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Use "k" for thousands (e.g., "1.5k") and "M" for millions</li>
                  <li>• Add "+" to indicate "or more" (e.g., "500K+")</li>
                  <li>• Keep uptime as a percentage with decimals (e.g., "99.97%")</li>
                  <li>• Ensure the Discord invite link is valid and permanent</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
