"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Search, Server, Users, MoreVertical, ExternalLink, Settings, LogOut, Filter, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Guild {
  id: string
  name: string
  icon: string | null
  owner: boolean
  permissions: string
  memberCount?: number
  features?: string[]
}

interface BotInfo {
  id: string
  username: string
  avatar: string | null
  discriminator: string
}

export default function ServersPage() {
  const { toast } = useToast()
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [botInfo, setBotInfo] = useState<BotInfo | null>(null)
  const [guilds, setGuilds] = useState<Guild[]>([])
  const [filteredGuilds, setFilteredGuilds] = useState<Guild[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isLeavingGuild, setIsLeavingGuild] = useState(false)
  const [guildToLeave, setGuildToLeave] = useState<Guild | null>(null)
  const [confirmLeaveOpen, setConfirmLeaveOpen] = useState(false)

  // Load token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("discord_bot_token")
    if (storedToken) {
      setToken(storedToken)
      fetchBotData(storedToken)
    } else {
      setIsLoading(false)
    }
  }, [])

  // Filter guilds based on search and filter type
  useEffect(() => {
    if (!guilds.length) return

    let filtered = guilds

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = guilds.filter((guild) => guild.name.toLowerCase().includes(query) || guild.id.includes(query))
    }

    // Apply type filter
    if (filterType === "premium") {
      filtered = filtered.filter((guild) => guild.features?.includes("PREMIUM_TIER_3"))
    } else if (filterType === "non-premium") {
      filtered = filtered.filter((guild) => !guild.features?.includes("PREMIUM_TIER_3"))
    }

    setFilteredGuilds(filtered)
  }, [guilds, searchQuery, filterType])

  const fetchBotData = async (tokenToUse: string) => {
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

      // Fetch additional details for each guild
      await Promise.all(
        data.guilds.map(async (guild: Guild) => {
          try {
            const guildResponse = await fetch(`/api/discord/guild/${guild.id}?token=${encodeURIComponent(tokenToUse)}`)

            if (guildResponse.ok) {
              const guildData = await guildResponse.json()

              // Update the guild with additional data
              setGuilds((prevGuilds) =>
                prevGuilds.map((g) =>
                  g.id === guild.id
                    ? {
                        ...g,
                        memberCount: guildData.approximate_member_count,
                        features: guildData.features,
                      }
                    : g,
                ),
              )
            }
          } catch (error) {
            console.error(`Error fetching details for guild ${guild.id}:`, error)
          }
        }),
      )
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to login. Please try again.",
        variant: "destructive",
      })
      // Clear invalid token
      localStorage.removeItem("discord_bot_token")
      setIsLoggedIn(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setBotInfo(null)
    setGuilds([])
    setFilteredGuilds([])
    setToken("")
    localStorage.removeItem("discord_bot_token")

    toast({
      title: "Logged out",
      description: "Successfully logged out from bot",
    })
  }

  const confirmLeaveGuild = (guild: Guild) => {
    setGuildToLeave(guild)
    setConfirmLeaveOpen(true)
  }

  const handleLeaveGuild = async () => {
    if (!isLoggedIn || !token || !guildToLeave) return

    setIsLeavingGuild(true)

    try {
      const response = await fetch("/api/discord/guild/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, guildId: guildToLeave.id }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to leave guild")
      }

      // Remove the guild from the list
      setGuilds(guilds.filter((guild) => guild.id !== guildToLeave.id))

      toast({
        title: "Success",
        description: `Bot has left the server: ${guildToLeave.name}`,
      })
    } catch (error) {
      console.error("Leave guild error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to leave server. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLeavingGuild(false)
      setConfirmLeaveOpen(false)
      setGuildToLeave(null)
    }
  }

  const getGuildIconUrl = (guild: Guild) => {
    if (!guild.icon) return null
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1E1F22] text-[#DCDDDE] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#5865F2] mx-auto mb-4" />
          <p className="text-white text-lg">Loading servers...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#1E1F22] text-[#DCDDDE] flex items-center justify-center">
        <Card className="max-w-md w-full bg-[#2B2D31] border-[#1E1F22]">
          <CardHeader>
            <CardTitle className="text-white">Bot Login Required</CardTitle>
            <CardDescription className="text-[#B9BBBE]">
              Please log in to your bot to view and manage servers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
              onClick={() => (window.location.href = "/admin/new-dashboard")}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1E1F22] text-[#DCDDDE]">
      <AdminHeader isLoggedIn={isLoggedIn} botInfo={botInfo} onLogout={handleLogout} />
      <AdminSidebar />

      <main className="ml-64 p-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Server Management</h1>
            <p className="text-[#B9BBBE] mt-1">Manage servers where your bot is installed</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#B9BBBE]">Total: {guilds.length} servers</span>
            <Button
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
              onClick={() =>
                window.open(
                  "https://discord.com/api/oauth2/authorize?client_id=" +
                    botInfo?.id +
                    "&permissions=8&scope=bot%20applications.commands",
                  "_blank",
                )
              }
            >
              Add to Server
            </Button>
          </div>
        </div>

        <Card className="bg-[#2B2D31] border-[#1E1F22]">
          <CardHeader>
            <CardTitle className="text-white">Servers</CardTitle>
            <CardDescription className="text-[#B9BBBE]">
              View and manage all servers where your bot is installed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#B9BBBE]" />
                <Input
                  placeholder="Search servers..."
                  className="pl-10 bg-[#202225] border-0 text-[#DCDDDE] placeholder:text-[#72767D] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="w-full md:w-64 flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#B9BBBE]" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="bg-[#202225] border-0 text-[#DCDDDE] focus:ring-1 focus:ring-[#5865F2]">
                    <SelectValue placeholder="Filter servers" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE]">
                    <SelectItem value="all">All Servers</SelectItem>
                    <SelectItem value="premium">Premium Servers</SelectItem>
                    <SelectItem value="non-premium">Non-Premium Servers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#3F4147]">
                    <th className="text-left py-3 px-4 text-[#B9BBBE] font-medium">Server</th>
                    <th className="text-left py-3 px-4 text-[#B9BBBE] font-medium">Members</th>
                    <th className="text-left py-3 px-4 text-[#B9BBBE] font-medium">ID</th>
                    <th className="text-left py-3 px-4 text-[#B9BBBE] font-medium">Status</th>
                    <th className="text-right py-3 px-4 text-[#B9BBBE] font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuilds.map((guild) => (
                    <tr key={guild.id} className="border-b border-[#3F4147] last:border-0">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold overflow-hidden">
                            {guild.icon ? (
                              <img
                                src={getGuildIconUrl(guild) || "/placeholder.svg?height=40&width=40"}
                                alt={guild.name}
                                className="w-10 h-10 object-cover"
                              />
                            ) : (
                              guild.name.charAt(0)
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium">{guild.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#B9BBBE]" />
                          <span className="text-white">{guild.memberCount?.toLocaleString() || "Unknown"}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#B9BBBE]">{guild.id}</td>
                      <td className="py-4 px-4">
                        {guild.features?.includes("PREMIUM_TIER_3") ? (
                          <span className="px-2 py-1 bg-[#5865F2]/20 text-[#5865F2] rounded-full text-xs">Premium</span>
                        ) : (
                          <span className="px-2 py-1 bg-[#3F4147]/30 text-[#B9BBBE] rounded-full text-xs">
                            Standard
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4 text-[#B9BBBE]" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE]">
                            <DropdownMenuItem
                              className="flex items-center gap-2 cursor-pointer hover:bg-[#232428] hover:text-white"
                              onClick={() => window.open(`https://discord.com/channels/${guild.id}`, "_blank")}
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>View in Discord</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-[#232428] hover:text-white">
                              <Settings className="h-4 w-4" />
                              <span>Server Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-[#3F4147]" />
                            <DropdownMenuItem
                              className="flex items-center gap-2 cursor-pointer text-[#ED4245] hover:bg-[#ED4245]/10 hover:text-[#ED4245]"
                              onClick={() => confirmLeaveGuild(guild)}
                            >
                              <LogOut className="h-4 w-4" />
                              <span>Leave Server</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredGuilds.length === 0 && (
              <div className="text-center py-8">
                <Server className="h-12 w-12 text-[#72767D] mx-auto mb-4" />
                <h3 className="text-white text-lg font-medium">No servers found</h3>
                <p className="text-[#B9BBBE] mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Dialog open={confirmLeaveOpen} onOpenChange={setConfirmLeaveOpen}>
        <DialogContent className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE]">
          <DialogHeader>
            <DialogTitle className="text-white">Leave Server</DialogTitle>
            <DialogDescription className="text-[#B9BBBE]">
              Are you sure you want to remove your bot from {guildToLeave?.name}?
            </DialogDescription>
          </DialogHeader>
          <p className="text-[#ED4245]">
            This action cannot be undone. The bot will be removed from the server and will need to be invited again to
            rejoin.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmLeaveOpen(false)}
              className="border-[#3F4147] text-[#B9BBBE] hover:bg-[#3F4147] hover:text-white"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLeaveGuild} disabled={isLeavingGuild}>
              {isLeavingGuild ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Leaving...
                </>
              ) : (
                "Leave Server"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
