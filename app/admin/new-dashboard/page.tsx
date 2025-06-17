"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import {
  Loader2,
  Server,
  Users,
  MessageSquare,
  Clock,
  Activity,
  Shield,
  LogIn,
  BarChart3,
  Cpu,
  HardDrive,
  MemoryStickIcon as Memory,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface BotInfo {
  id: string
  username: string
  avatar: string | null
  discriminator: string
}

interface Guild {
  id: string
  name: string
  icon: string | null
  owner: boolean
  permissions: string
}

export default function AdminDashboard() {
  const { toast } = useToast()
  const router = useRouter()
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [botInfo, setBotInfo] = useState<BotInfo | null>(null)
  const [guilds, setGuilds] = useState<Guild[]>([])

  // System metrics (these would be fetched from your backend in a real app)
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 42,
    memory: 68,
    disk: 35,
    uptime: "5d 12h 34m",
  })

  // Check if token exists in localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("discord_bot_token")
    if (storedToken) {
      setToken(storedToken)
      handleLogin(storedToken, false)
    }
  }, [])

  const handleLogin = async (tokenToUse = token, showToast = true) => {
    if (!tokenToUse) {
      toast({
        title: "Error",
        description: "Please enter your bot token",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/discord/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: tokenToUse }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to authenticate")
      }

      const data = await response.json()

      setBotInfo(data.bot)
      setGuilds(data.guilds)
      setIsLoggedIn(true)

      // Store token in localStorage for persistence
      localStorage.setItem("discord_bot_token", tokenToUse)

      if (showToast) {
        toast({
          title: "Success",
          description: "Successfully logged in to bot",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      if (showToast) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to login. Please try again.",
          variant: "destructive",
        })
      }
      // Clear invalid token
      localStorage.removeItem("discord_bot_token")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setBotInfo(null)
    setGuilds([])
    setToken("")
    localStorage.removeItem("discord_bot_token")

    toast({
      title: "Logged out",
      description: "Successfully logged out from bot",
    })
  }

  const getAvatarUrl = (user: BotInfo) => {
    if (!user.avatar) return null
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
  }

  return (
    <div className="min-h-screen bg-[#1E1F22] text-[#DCDDDE]">
      <AdminHeader isLoggedIn={isLoggedIn} botInfo={botInfo} onLogout={handleLogout} />
      <AdminSidebar />

      <main className="ml-64 p-8 pt-24">
        {!isLoggedIn ? (
          <Card className="max-w-md mx-auto bg-[#2B2D31] border-[#1E1F22]">
            <CardHeader>
              <CardTitle className="text-white">Bot Login</CardTitle>
              <CardDescription className="text-[#B9BBBE]">
                Enter your Discord bot token to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token" className="text-[#DCDDDE]">
                    Bot Token
                  </Label>
                  <Input
                    id="token"
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="bg-[#202225] border-0 text-[#DCDDDE] placeholder:text-[#72767D] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
                    placeholder="Enter your Discord bot token"
                  />
                  <p className="text-xs text-[#B9BBBE]">Your token is stored locally and never sent to our servers.</p>
                </div>
                <Button
                  onClick={() => handleLogin()}
                  disabled={isLoading}
                  className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Login to Bot
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#3F4147] pt-4">
              <p className="text-xs text-[#B9BBBE]">
                Don't have a bot? Visit the{" "}
                <a
                  href="https://discord.com/developers/applications"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5865F2] hover:underline"
                >
                  Discord Developer Portal
                </a>{" "}
                to create one.
              </p>
            </CardFooter>
          </Card>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-[#B9BBBE] mt-1">Overview of your Discord bot</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-[#2B2D31] border-[#1E1F22]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#B9BBBE] text-sm font-medium">Total Servers</p>
                      <h3 className="text-white text-2xl font-bold mt-1">{guilds.length}</h3>
                    </div>
                    <div className="bg-[#5865F2]/20 p-2 rounded-lg">
                      <Server className="h-6 w-6 text-[#5865F2]" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-[#B9BBBE]">
                    <Activity className="h-3 w-3 mr-1 text-green-400" />
                    <span className="text-green-400">+12%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2B2D31] border-[#1E1F22]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#B9BBBE] text-sm font-medium">Total Users</p>
                      <h3 className="text-white text-2xl font-bold mt-1">1.2M</h3>
                    </div>
                    <div className="bg-[#FF73FA]/20 p-2 rounded-lg">
                      <Users className="h-6 w-6 text-[#FF73FA]" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-[#B9BBBE]">
                    <Activity className="h-3 w-3 mr-1 text-green-400" />
                    <span className="text-green-400">+8%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2B2D31] border-[#1E1F22]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#B9BBBE] text-sm font-medium">Commands Used</p>
                      <h3 className="text-white text-2xl font-bold mt-1">3.4M</h3>
                    </div>
                    <div className="bg-[#FFA629]/20 p-2 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-[#FFA629]" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-[#B9BBBE]">
                    <Activity className="h-3 w-3 mr-1 text-green-400" />
                    <span className="text-green-400">+15%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2B2D31] border-[#1E1F22]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#B9BBBE] text-sm font-medium">Uptime</p>
                      <h3 className="text-white text-2xl font-bold mt-1">{systemMetrics.uptime}</h3>
                    </div>
                    <div className="bg-[#3498DB]/20 p-2 rounded-lg">
                      <Clock className="h-6 w-6 text-[#3498DB]" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-[#B9BBBE]">
                    <Shield className="h-3 w-3 mr-1 text-green-400" />
                    <span>99.9% availability</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="bg-[#2B2D31] border-[#1E1F22] lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Command Usage</CardTitle>
                  <CardDescription className="text-[#B9BBBE]">Top commands used in the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <BarChart3 className="h-24 w-24 text-[#72767D]" />
                    <p className="text-[#B9BBBE] ml-4">Chart data will appear here</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2B2D31] border-[#1E1F22]">
                <CardHeader>
                  <CardTitle className="text-white">System Resources</CardTitle>
                  <CardDescription className="text-[#B9BBBE]">Current resource usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Cpu className="h-4 w-4 text-[#5865F2] mr-2" />
                        <span className="text-[#DCDDDE]">CPU Usage</span>
                      </div>
                      <span className="text-white font-medium">{systemMetrics.cpu}%</span>
                    </div>
                    <Progress value={systemMetrics.cpu} className="h-2 bg-[#202225]" indicatorColor="bg-[#5865F2]" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Memory className="h-4 w-4 text-[#FF73FA] mr-2" />
                        <span className="text-[#DCDDDE]">Memory Usage</span>
                      </div>
                      <span className="text-white font-medium">{systemMetrics.memory}%</span>
                    </div>
                    <Progress value={systemMetrics.memory} className="h-2 bg-[#202225]" indicatorColor="bg-[#FF73FA]" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <HardDrive className="h-4 w-4 text-[#FFA629] mr-2" />
                        <span className="text-[#DCDDDE]">Disk Usage</span>
                      </div>
                      <span className="text-white font-medium">{systemMetrics.disk}%</span>
                    </div>
                    <Progress value={systemMetrics.disk} className="h-2 bg-[#202225]" indicatorColor="bg-[#FFA629]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-[#2B2D31] border-[#1E1F22]">
                <CardHeader>
                  <CardTitle className="text-white">Recent Servers</CardTitle>
                  <CardDescription className="text-[#B9BBBE]">Latest servers your bot joined</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {guilds.slice(0, 5).map((guild) => (
                      <div key={guild.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold">
                            {guild.icon ? (
                              <img
                                src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                alt={guild.name}
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              guild.name.charAt(0)
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium">{guild.name}</p>
                            <p className="text-[#B9BBBE] text-xs">ID: {guild.id}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#B9BBBE] hover:text-white hover:bg-[#3F4147]"
                          onClick={() => router.push(`/admin/new-dashboard/servers`)}
                        >
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-[#3F4147] pt-4">
                  <Button
                    variant="outline"
                    className="w-full border-[#3F4147] text-[#B9BBBE] hover:bg-[#3F4147] hover:text-white"
                    onClick={() => router.push(`/admin/new-dashboard/servers`)}
                  >
                    View All Servers
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-[#2B2D31] border-[#1E1F22] lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-[#B9BBBE]">Latest events from your bot</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pb-4 border-b border-[#3F4147] last:border-0 last:pb-0"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index % 3 === 0
                              ? "bg-green-500/20 text-green-500"
                              : index % 3 === 1
                                ? "bg-blue-500/20 text-blue-500"
                                : "bg-yellow-500/20 text-yellow-500"
                          }`}
                        >
                          {index % 3 === 0 ? (
                            <Server className="h-4 w-4" />
                          ) : index % 3 === 1 ? (
                            <MessageSquare className="h-4 w-4" />
                          ) : (
                            <Users className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-white">
                            {index % 3 === 0
                              ? "Bot joined a new server"
                              : index % 3 === 1
                                ? "Command executed"
                                : "New user interaction"}
                          </p>
                          <p className="text-[#B9BBBE] text-sm">
                            {index % 3 === 0
                              ? "Gaming Community"
                              : index % 3 === 1
                                ? "/help command used"
                                : "User welcomed"}
                          </p>
                          <p className="text-[#72767D] text-xs mt-1">
                            {new Date(Date.now() - index * 3600000).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-[#3F4147] pt-4">
                  <Button
                    variant="outline"
                    className="w-full border-[#3F4147] text-[#B9BBBE] hover:bg-[#3F4147] hover:text-white"
                  >
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
