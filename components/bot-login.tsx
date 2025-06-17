"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import {
  Loader2,
  LogIn,
  Server,
  LogOut,
  Shield,
  Users,
  Settings,
  Clock,
  AlertTriangle,
  List,
  Activity,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { useAuth } from "@/lib/auth"

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

interface AuditLogEntry {
  id: string
  actionType: number
  userId: string
  userName: string
  targetId?: string
  targetName?: string
  changes: any[]
  options: any
  reason: string | null
  createdAt: string
}

interface BotEvent {
  id: string
  actionType: number
  userId: string
  userName: string
  changes: any[]
  options: any
  reason: string | null
  createdAt: string
}

interface ActionRequest {
  id: string
  type: "leave_server"
  guildId: string
  guildName: string
  requestedBy: string
  requestedAt: string
  status: "pending" | "approved" | "rejected"
}

// Map of audit log action types to human-readable descriptions
const actionTypeMap: Record<number, string> = {
  1: "Server Update",
  10: "Channel Create",
  11: "Channel Update",
  12: "Channel Delete",
  13: "Channel Overwrite Create",
  14: "Channel Overwrite Update",
  15: "Channel Overwrite Delete",
  20: "Member Kick",
  21: "Member Prune",
  22: "Member Ban Add",
  23: "Member Ban Remove",
  24: "Member Update",
  25: "Member Role Update",
  26: "Member Move",
  27: "Member Disconnect",
  28: "Bot Add",
  30: "Role Create",
  31: "Role Update",
  32: "Role Delete",
  40: "Invite Create",
  41: "Invite Update",
  42: "Invite Delete",
  50: "Webhook Create",
  51: "Webhook Update",
  52: "Webhook Delete",
  60: "Emoji Create",
  61: "Emoji Update",
  62: "Emoji Delete",
  72: "Message Delete",
  73: "Message Bulk Delete",
  74: "Message Pin",
  75: "Message Unpin",
  80: "Integration Create",
  81: "Integration Update",
  82: "Integration Delete",
  83: "Stage Instance Create",
  84: "Stage Instance Update",
  85: "Stage Instance Delete",
  90: "Sticker Create",
  91: "Sticker Update",
  92: "Sticker Delete",
  100: "Guild Scheduled Event Create",
  101: "Guild Scheduled Event Update",
  102: "Guild Scheduled Event Delete",
  110: "Thread Create",
  111: "Thread Update",
  112: "Thread Delete",
  121: "Application Command Permission Update",
  140: "Auto Moderation Rule Create",
  141: "Auto Moderation Rule Update",
  142: "Auto Moderation Rule Delete",
  143: "Auto Moderation Block Message",
  144: "Auto Moderation Flag To Channel",
  145: "Auto Moderation User Communication Disabled",
  150: "Creator Monetization Request Created",
  151: "Creator Monetization Terms Accepted",
}

export function BotLogin() {
  const { toast } = useToast()
  const { currentUser, isOwner } = useAuth()
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [botInfo, setBotInfo] = useState<BotInfo | null>(null)
  const [guilds, setGuilds] = useState<Guild[]>([])
  const [filteredGuilds, setFilteredGuilds] = useState<Guild[]>([])
  const [selectedGuild, setSelectedGuild] = useState<Guild | null>(null)
  const [guildDetails, setGuildDetails] = useState<any | null>(null)
  const [isLoadingGuild, setIsLoadingGuild] = useState(false)
  const [isLeavingGuild, setIsLeavingGuild] = useState(false)
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([])
  const [botEvents, setBotEvents] = useState<BotEvent[]>([])
  const [isLoadingAuditLogs, setIsLoadingAuditLogs] = useState(false)
  const [isLoadingBotEvents, setIsLoadingBotEvents] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const guildsPerPage = 20
  const [actionRequests, setActionRequests] = useState<ActionRequest[]>([])

  // Load action requests from localStorage
  useEffect(() => {
    const storedRequests = localStorage.getItem("sterix_action_requests")
    if (storedRequests) {
      try {
        setActionRequests(JSON.parse(storedRequests))
      } catch (error) {
        console.error("Error parsing action requests:", error)
      }
    }
  }, [])

  // Save action requests to localStorage when they change
  useEffect(() => {
    localStorage.setItem("sterix_action_requests", JSON.stringify(actionRequests))
  }, [actionRequests])

  // Filter and paginate guilds
  useEffect(() => {
    if (!guilds.length) return

    let filtered = guilds

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = guilds.filter((guild) => guild.name.toLowerCase().includes(query) || guild.id.includes(query))
    }

    // Calculate total pages
    const pages = Math.ceil(filtered.length / guildsPerPage)
    setTotalPages(pages || 1)

    // Adjust current page if needed
    if (currentPage > pages) {
      setCurrentPage(1)
    }

    // Paginate
    const startIndex = (currentPage - 1) * guildsPerPage
    const paginatedGuilds = filtered.slice(startIndex, startIndex + guildsPerPage)

    setFilteredGuilds(paginatedGuilds)
  }, [guilds, searchQuery, currentPage, guildsPerPage])

  const handleLogin = async () => {
    if (!token) {
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
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to authenticate")
      }

      const data = await response.json()

      setBotInfo(data.bot)
      setGuilds(data.guilds)
      setIsLoggedIn(true)

      // Store server count for dashboard
      localStorage.setItem("sterix_server_count", data.guilds.length.toString())

      toast({
        title: "Success",
        description: "Successfully logged in to bot",
      })
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to login. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setBotInfo(null)
    setGuilds([])
    setFilteredGuilds([])
    setSelectedGuild(null)
    setGuildDetails(null)
    setAuditLogs([])
    setBotEvents([])
    setToken("")
    setActiveTab("overview")
    setSearchQuery("")
    setCurrentPage(1)

    toast({
      title: "Logged out",
      description: "Successfully logged out from bot",
    })
  }

  const handleGuildSelect = async (guild: Guild) => {
    setSelectedGuild(guild)
    setGuildDetails(null)
    setAuditLogs([])
    setBotEvents([])
    setIsLoadingGuild(true)
    setActiveTab("overview")

    try {
      const response = await fetch(`/api/discord/guild/${guild.id}?token=${encodeURIComponent(token)}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch guild details")
      }

      const data = await response.json()
      setGuildDetails(data)
    } catch (error) {
      console.error("Guild fetch error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch guild details",
        variant: "destructive",
      })
    } finally {
      setIsLoadingGuild(false)
    }
  }

  const fetchAuditLogs = async () => {
    if (!selectedGuild || !token) return

    setIsLoadingAuditLogs(true)

    try {
      const response = await fetch(
        `/api/discord/guild/${selectedGuild.id}/audit-logs?token=${encodeURIComponent(token)}&limit=25`,
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch audit logs")
      }

      const data = await response.json()
      setAuditLogs(data.auditLogs)
    } catch (error) {
      console.error("Audit logs fetch error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch audit logs",
        variant: "destructive",
      })
    } finally {
      setIsLoadingAuditLogs(false)
    }
  }

  const fetchBotEvents = async () => {
    if (!selectedGuild || !token) return

    setIsLoadingBotEvents(true)

    try {
      const response = await fetch(
        `/api/discord/guild/${selectedGuild.id}/bot-events?token=${encodeURIComponent(token)}`,
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch bot events")
      }

      const data = await response.json()
      setBotEvents(data.botEvents)
    } catch (error) {
      console.error("Bot events fetch error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch bot events",
        variant: "destructive",
      })
    } finally {
      setIsLoadingBotEvents(false)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    if (value === "audit-logs" && auditLogs.length === 0) {
      fetchAuditLogs()
    } else if (value === "bot-events" && botEvents.length === 0) {
      fetchBotEvents()
    }
  }

  const handleLeaveGuild = async (guildId: string) => {
    if (!isLoggedIn || !token || !selectedGuild) return

    // If not owner, create a request instead of immediately leaving
    if (!isOwner) {
      const newRequest: ActionRequest = {
        id: Date.now().toString(),
        type: "leave_server",
        guildId,
        guildName: selectedGuild.name,
        requestedBy: currentUser?.name || "Unknown",
        requestedAt: new Date().toISOString(),
        status: "pending",
      }

      setActionRequests((prev) => [...prev, newRequest])

      toast({
        title: "Request Submitted",
        description: "Your request to leave this server has been submitted for owner approval.",
      })
      return
    }

    setIsLeavingGuild(true)

    try {
      const response = await fetch("/api/discord/guild/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, guildId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to leave guild")
      }

      // Remove the guild from the list
      setGuilds(guilds.filter((guild) => guild.id !== guildId))

      if (selectedGuild?.id === guildId) {
        setSelectedGuild(null)
        setGuildDetails(null)
        setAuditLogs([])
        setBotEvents([])
      }

      toast({
        title: "Success",
        description: "Bot has left the server",
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
    }
  }

  const getAvatarUrl = (user: BotInfo) => {
    if (!user.avatar) return null
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
  }

  const getGuildIconUrl = (guild: Guild) => {
    if (!guild.icon) return null
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
  }

  const getActionTypeLabel = (actionType: number) => {
    return actionTypeMap[actionType] || `Unknown Action (${actionType})`
  }

  return (
    <div className="space-y-6">
      {!isLoggedIn ? (
        <Card className="bg-[#252632]/80 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Bot Login</CardTitle>
            <CardDescription className="text-gray-300">Enter your bot token to manage your Discord bot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token" className="text-gray-300">
                Bot Token
              </Label>
              <Input
                id="token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="bg-[#1a1b26] border-gray-700 text-white"
                placeholder="Enter your Discord bot token"
              />
              <p className="text-xs text-gray-400">
                Your token is never stored on our servers and is only used to authenticate with Discord.
              </p>
            </div>
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff]"
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
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="bg-[#252632]/80 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Bot Information</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
              <CardDescription className="text-gray-300">Connected to Discord bot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {botInfo?.avatar ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={getAvatarUrl(botInfo) || "/placeholder.svg?height=64&width=64"}
                        alt={botInfo.username}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#9d7cff] flex items-center justify-center text-white text-2xl font-bold">
                      {botInfo?.username.charAt(0) || "B"}
                    </div>
                  )}
                  <div>
                    <h3 className="text-white text-xl font-medium">{botInfo?.username}</h3>
                    <p className="text-gray-400">ID: {botInfo?.id}</p>
                    <p className="text-gray-400">Servers: {guilds.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-white">Servers List</CardTitle>
                <CardDescription className="text-gray-300">Select a server to manage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search servers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-[#1a1b26] border-gray-700 text-white"
                    />
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    Showing {filteredGuilds.length} of {guilds.length} servers
                  </p>
                </div>

                <div className="h-[400px] overflow-y-auto pr-2">
                  {filteredGuilds.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400">
                        {guilds.length === 0 ? "Your bot is not in any servers yet." : "No servers match your search."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredGuilds.map((guild) => (
                        <div
                          key={guild.id}
                          className={`p-4 rounded-lg cursor-pointer transition-colors ${
                            selectedGuild?.id === guild.id
                              ? "bg-[#9d7cff]/20 border border-[#9d7cff]/50"
                              : "bg-[#1a1b26] border border-gray-700 hover:border-gray-600"
                          }`}
                          onClick={() => handleGuildSelect(guild)}
                        >
                          <div className="flex items-center gap-3">
                            {guild.icon ? (
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <Image
                                  src={getGuildIconUrl(guild) || "/placeholder.svg?height=40&width=40"}
                                  alt={guild.name}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-[#7c4dff]/30 flex items-center justify-center text-white flex-shrink-0">
                                <Server className="h-5 w-5" />
                              </div>
                            )}
                            <div className="overflow-hidden">
                              <h3 className="text-white font-medium truncate">{guild.name}</h3>
                              <p className="text-gray-400 text-sm truncate">ID: {guild.id}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-gray-300 text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedGuild ? (
              <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {selectedGuild.icon ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={getGuildIconUrl(selectedGuild) || "/placeholder.svg?height=32&width=32"}
                            alt={selectedGuild.name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#7c4dff]/30 flex items-center justify-center text-white">
                          <Server className="h-4 w-4" />
                        </div>
                      )}
                      <CardTitle className="text-white">{selectedGuild.name}</CardTitle>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleLeaveGuild(selectedGuild.id)}
                      disabled={isLeavingGuild}
                    >
                      {isLeavingGuild ? <Loader2 className="h-4 w-4 animate-spin" /> : "Leave Server"}
                    </Button>
                  </div>
                  <CardDescription className="text-gray-300">
                    Manage settings and view logs for this server
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={handleTabChange}>
                    <TabsList className="bg-[#1a1b26] border-gray-700 mb-4">
                      <TabsTrigger
                        value="overview"
                        className="data-[state=active]:bg-[#9d7cff] data-[state=active]:text-white"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Overview
                      </TabsTrigger>
                      <TabsTrigger
                        value="audit-logs"
                        className="data-[state=active]:bg-[#9d7cff] data-[state=active]:text-white"
                      >
                        <List className="h-4 w-4 mr-2" />
                        Audit Logs
                      </TabsTrigger>
                      <TabsTrigger
                        value="bot-events"
                        className="data-[state=active]:bg-[#9d7cff] data-[state=active]:text-white"
                      >
                        <Activity className="h-4 w-4 mr-2" />
                        Bot Events
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-0">
                      {isLoadingGuild ? (
                        <div className="flex justify-center items-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin text-[#9d7cff]" />
                        </div>
                      ) : guildDetails ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center p-4 bg-[#1a1b26] rounded-lg">
                              <Users className="h-5 w-5 text-[#9d7cff] mr-3" />
                              <div>
                                <h3 className="text-white font-medium">Member Count</h3>
                                <p className="text-gray-400">{guildDetails.approximate_member_count || "Unknown"}</p>
                              </div>
                            </div>

                            <div className="flex items-center p-4 bg-[#1a1b26] rounded-lg">
                              <Shield className="h-5 w-5 text-[#9d7cff] mr-3" />
                              <div>
                                <h3 className="text-white font-medium">Owner ID</h3>
                                <p className="text-gray-400">{guildDetails.owner_id || "Unknown"}</p>
                              </div>
                            </div>
                          </div>

                          {guildDetails.features && guildDetails.features.length > 0 && (
                            <div className="p-4 bg-[#1a1b26] rounded-lg">
                              <h3 className="text-white font-medium mb-2">Features</h3>
                              <div className="flex flex-wrap gap-2">
                                {guildDetails.features.map((feature: string) => (
                                  <span
                                    key={feature}
                                    className="px-2 py-1 bg-[#9d7cff]/20 text-[#9d7cff] text-xs rounded"
                                  >
                                    {feature.replace(/_/g, " ").toLowerCase()}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="p-4 bg-[#1a1b26] rounded-lg">
                            <h3 className="text-white font-medium mb-2">Server Information</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Server ID:</span>
                                <span className="text-white">{selectedGuild.id}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Created At:</span>
                                <span className="text-white">
                                  {new Date(
                                    Number.parseInt(selectedGuild.id) / 4194304 + 1420070400000,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              {guildDetails.description && (
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Description:</span>
                                  <span className="text-white">{guildDetails.description}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-400">Failed to load server details. Please try again.</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="audit-logs" className="mt-0">
                      {isLoadingAuditLogs ? (
                        <div className="flex justify-center items-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin text-[#9d7cff]" />
                        </div>
                      ) : auditLogs.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-white font-medium">Recent Audit Logs</h3>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={fetchAuditLogs}
                              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              Refresh
                            </Button>
                          </div>

                          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                            {auditLogs.map((log) => (
                              <div key={log.id} className="p-3 bg-[#1a1b26] rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center">
                                    <Badge className="bg-[#9d7cff]/20 text-[#9d7cff] border-[#9d7cff]/50 mr-2">
                                      {getActionTypeLabel(log.actionType)}
                                    </Badge>
                                    <span className="text-white text-sm">{log.userName}</span>
                                  </div>
                                  <span className="text-gray-400 text-xs">
                                    {format(new Date(log.createdAt), "MMM d, yyyy 'at' h:mm a")}
                                  </span>
                                </div>

                                {log.targetName && (
                                  <p className="text-gray-300 text-sm">
                                    Target: <span className="text-white">{log.targetName}</span>
                                  </p>
                                )}

                                {log.reason && (
                                  <p className="text-gray-300 text-sm">
                                    Reason: <span className="text-white">{log.reason}</span>
                                  </p>
                                )}

                                {log.changes && log.changes.length > 0 && (
                                  <div className="mt-2 text-xs">
                                    <p className="text-gray-400">Changes:</p>
                                    <div className="space-y-1 mt-1">
                                      {log.changes.map((change: any, index: number) => (
                                        <div key={index} className="text-gray-300">
                                          {change.key}: {change.old_value ? `"${change.old_value}" → ` : ""}
                                          {change.new_value ? `"${change.new_value}"` : "removed"}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                          <p className="text-gray-300">No audit logs available or insufficient permissions.</p>
                          <p className="text-gray-400 text-sm mt-2">
                            The bot may need the "View Audit Log" permission to access this information.
                          </p>
                          <Button
                            variant="outline"
                            onClick={fetchAuditLogs}
                            className="mt-4 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                          >
                            Try Again
                          </Button>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="bot-events" className="mt-0">
                      {isLoadingBotEvents ? (
                        <div className="flex justify-center items-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin text-[#9d7cff]" />
                        </div>
                      ) : botEvents.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-white font-medium">Bot-Related Events</h3>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={fetchBotEvents}
                              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              Refresh
                            </Button>
                          </div>

                          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                            {botEvents.map((event) => (
                              <div key={event.id} className="p-3 bg-[#1a1b26] rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center">
                                    <Badge className="bg-[#9d7cff]/20 text-[#9d7cff] border-[#9d7cff]/50 mr-2">
                                      {getActionTypeLabel(event.actionType)}
                                    </Badge>
                                    <span className="text-white text-sm">{event.userName}</span>
                                  </div>
                                  <span className="text-gray-400 text-xs">
                                    {format(new Date(event.createdAt), "MMM d, yyyy 'at' h:mm a")}
                                  </span>
                                </div>

                                {event.reason && (
                                  <p className="text-gray-300 text-sm">
                                    Reason: <span className="text-white">{event.reason}</span>
                                  </p>
                                )}

                                {event.changes && event.changes.length > 0 && (
                                  <div className="mt-2 text-xs">
                                    <p className="text-gray-400">Changes:</p>
                                    <div className="space-y-1 mt-1">
                                      {event.changes.map((change: any, index: number) => (
                                        <div key={index} className="text-gray-300">
                                          {change.key}: {change.old_value ? `"${change.old_value}" → ` : ""}
                                          {change.new_value ? `"${change.new_value}"` : "removed"}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                          <p className="text-gray-300">No bot-related events found.</p>
                          <p className="text-gray-400 text-sm mt-2">
                            This could be because the bot was recently added or there have been no recent actions
                            involving the bot.
                          </p>
                          <Button
                            variant="outline"
                            onClick={fetchBotEvents}
                            className="mt-4 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                          >
                            Try Again
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="border-t border-gray-800 pt-4">
                  <p className="text-gray-400 text-xs">
                    {!isOwner
                      ? "Some actions require owner approval. Requests will be submitted for review."
                      : "Some actions may require additional permissions. Make sure your bot has the necessary permissions in this server."}
                  </p>
                </CardFooter>
              </Card>
            ) : (
              <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-2">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Server className="h-16 w-16 text-gray-600 mb-4" />
                  <h3 className="text-white text-xl font-medium mb-2">Select a Server</h3>
                  <p className="text-gray-400 text-center max-w-md">
                    Choose a server from the list to view details, audit logs, and manage bot settings.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  )
}
