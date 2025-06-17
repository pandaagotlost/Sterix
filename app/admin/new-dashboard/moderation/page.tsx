"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Search, Filter, Shield, Ban, UserX, Clock, MessageSquare, Loader2, Save, Plus, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface BotInfo {
  id: string
  username: string
  avatar: string | null
  discriminator: string
}

interface ModerationAction {
  id: string
  type: "ban" | "kick" | "mute" | "warn" | "unmute"
  user: {
    id: string
    username: string
    avatar?: string
  }
  moderator: {
    id: string
    username: string
    avatar?: string
  }
  reason: string
  server: {
    id: string
    name: string
  }
  timestamp: string
  duration?: number // in seconds, for mutes
}

interface FilterWord {
  id: string
  word: string
  action: "delete" | "warn" | "mute" | "kick" | "ban"
  replacement?: string
}

// Generate mock moderation actions
const generateMockActions = (): ModerationAction[] => {
  const actions: ModerationAction[] = []
  const now = new Date()

  const actionTypes: ("ban" | "kick" | "mute" | "warn" | "unmute")[] = ["ban", "kick", "mute", "warn", "unmute"]
  const usernames = ["GamerX", "CoolUser123", "DiscordFan", "ServerMod", "TroubleUser", "SpamBot", "NewMember"]
  const moderators = ["AdminBot", "ServerOwner", "ModeratorA", "ModeratorB"]
  const servers = [
    { id: "1", name: "Gaming Community" },
    { id: "2", name: "Anime Club" },
    { id: "3", name: "Study Group" },
  ]
  const reasons = [
    "Spamming in chat",
    "Inappropriate language",
    "Harassment of other users",
    "Advertising other servers",
    "Sharing NSFW content",
    "Evading moderation",
    "Raid participation",
  ]

  // Generate 20 random moderation actions
  for (let i = 0; i < 20; i++) {
    const timestamp = new Date(now.getTime() - i * 1000 * 60 * Math.random() * 120)
    const type = actionTypes[Math.floor(Math.random() * actionTypes.length)]

    actions.push({
      id: Math.random().toString(36).substring(2),
      type,
      user: {
        id: Math.random().toString(36).substring(2),
        username: usernames[Math.floor(Math.random() * usernames.length)],
      },
      moderator: {
        id: Math.random().toString(36).substring(2),
        username: moderators[Math.floor(Math.random() * moderators.length)],
      },
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      server: servers[Math.floor(Math.random() * servers.length)],
      timestamp: timestamp.toISOString(),
      duration: type === "mute" ? Math.floor(Math.random() * 3600 * 24) : undefined,
    })
  }

  // Sort by timestamp (newest first)
  return actions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

// Mock filter words
const mockFilterWords: FilterWord[] = [
  { id: "1", word: "badword1", action: "delete" },
  { id: "2", word: "badword2", action: "warn" },
  { id: "3", word: "badword3", action: "mute", replacement: "****" },
  { id: "4", word: "badword4", action: "kick" },
  { id: "5", word: "badword5", action: "ban" },
]

export default function ModerationPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [botInfo, setBotInfo] = useState<BotInfo | null>(null)
  const [actions, setActions] = useState<ModerationAction[]>([])
  const [filteredActions, setFilteredActions] = useState<ModerationAction[]>([])
  const [filterWords, setFilterWords] = useState<FilterWord[]>(mockFilterWords)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterServer, setFilterServer] = useState("all")
  const [isAddWordDialogOpen, setIsAddWordDialogOpen] = useState(false)
  const [isDeleteWordDialogOpen, setIsDeleteWordDialogOpen] = useState(false)
  const [selectedWord, setSelectedWord] = useState<FilterWord | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Form state for adding/editing filter words
  const [wordForm, setWordForm] = useState({
    word: "",
    action: "delete" as "delete" | "warn" | "mute" | "kick" | "ban",
    replacement: "",
  })

  // Moderation settings
  const [moderationSettings, setModerationSettings] = useState({
    enableAutoMod: true,
    deleteInvites: true,
    deleteLinks: false,
    antiSpam: true,
    antiMention: true,
    maxMentions: 5,
    maxMessages: 5,
    maxMessagesInterval: 5, // seconds
    muteOnSpam: true,
    muteDuration: 300, // seconds
    logActions: true,
  })

  // Load token and fetch data on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("discord_bot_token")
    if (storedToken) {
      // In a real app, you would fetch moderation data from your API
      // For now, we'll generate mock data
      const mockActions = generateMockActions()
      setActions(mockActions)
      setFilteredActions(mockActions)
      setIsLoggedIn(true)

      // Simulate fetching bot info
      setBotInfo({
        id: "123456789012345678",
        username: "Sterix Bot",
        avatar: null,
        discriminator: "0000",
      })
    }
    setIsLoading(false)
  }, [])

  // Filter actions based on search and filters
  useEffect(() => {
    if (!actions.length) return

    let filtered = actions

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = actions.filter(
        (action) =>
          action.user.username.toLowerCase().includes(query) ||
          action.reason.toLowerCase().includes(query) ||
          action.server.name.toLowerCase().includes(query),
      )
    }

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter((action) => action.type === filterType)
    }

    // Apply server filter
    if (filterServer !== "all") {
      filtered = filtered.filter((action) => action.server.id === filterServer)
    }

    setFilteredActions(filtered)
  }, [actions, searchQuery, filterType, filterServer])

  const handleSaveSettings = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      try {
        // In a real app, you would send the settings to your API
        console.log("Saving moderation settings:", moderationSettings)

        toast({
          title: "Settings Saved",
          description: "Moderation settings have been updated successfully.",
        })
      } catch (error) {
        console.error("Error saving settings:", error)
        toast({
          title: "Error",
          description: "Failed to save settings. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSaving(false)
      }
    }, 1000)
  }

  const handleAddWord = () => {
    if (!wordForm.word.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a word to filter.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      try {
        const newWord: FilterWord = {
          id: Math.random().toString(36).substring(2),
          word: wordForm.word.trim(),
          action: wordForm.action,
          replacement: wordForm.replacement.trim() || undefined,
        }

        setFilterWords([...filterWords, newWord])

        toast({
          title: "Word Added",
          description: `"${newWord.word}" has been added to the filter list.`,
        })

        // Reset form
        setWordForm({
          word: "",
          action: "delete",
          replacement: "",
        })

        setIsAddWordDialogOpen(false)
      } catch (error) {
        console.error("Error adding word:", error)
        toast({
          title: "Error",
          description: "Failed to add word. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSaving(false)
      }
    }, 1000)
  }

  const handleDeleteWord = () => {
    if (!selectedWord) return

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      try {
        setFilterWords(filterWords.filter((word) => word.id !== selectedWord.id))

        toast({
          title: "Word Removed",
          description: `"${selectedWord.word}" has been removed from the filter list.`,
        })

        setIsDeleteWordDialogOpen(false)
        setSelectedWord(null)
      } catch (error) {
        console.error("Error deleting word:", error)
        toast({
          title: "Error",
          description: "Failed to remove word. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSaving(false)
      }
    }, 1000)
  }

  const getActionIcon = (type: string) => {
    switch (type) {
      case "ban":
        return <Ban className="h-4 w-4 text-red-400" />
      case "kick":
        return <UserX className="h-4 w-4 text-yellow-400" />
      case "mute":
        return <MessageSquare className="h-4 w-4 text-blue-400" />
      case "warn":
        return <Shield className="h-4 w-4 text-orange-400" />
      case "unmute":
        return <MessageSquare className="h-4 w-4 text-green-400" />
      default:
        return <Shield className="h-4 w-4 text-gray-400" />
    }
  }

  const getActionClass = (type: string) => {
    switch (type) {
      case "ban":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "kick":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "mute":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "warn":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50"
      case "unmute":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds} seconds`
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`
    return `${Math.floor(seconds / 86400)} days`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1E1F22] text-[#DCDDDE] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#5865F2] mx-auto mb-4" />
          <p className="text-white text-lg">Loading moderation data...</p>
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
              Please log in to your bot to access moderation features
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
      <AdminHeader isLoggedIn={isLoggedIn} botInfo={botInfo} />
      <AdminSidebar />

      <main className="ml-64 p-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Moderation</h1>
            <p className="text-[#B9BBBE] mt-1">Manage moderation settings and view actions</p>
          </div>
          <Button
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center gap-2"
            onClick={handleSaveSettings}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="actions" className="space-y-6">
          <TabsList className="bg-[#2B2D31] border border-[#1E1F22]">
            <TabsTrigger value="actions">Recent Actions</TabsTrigger>
            <TabsTrigger value="settings">Auto Moderation</TabsTrigger>
            <TabsTrigger value="filters">Word Filters</TabsTrigger>
          </TabsList>

          <TabsContent value="actions">
            <Card className="bg-[#2B2D31] border-[#1E1F22]">
              <CardHeader>
                <CardTitle className="text-white">Moderation Actions</CardTitle>
                <CardDescription className="text-[#B9BBBE]">
                  Recent moderation actions taken by your bot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#B9BBBE]" />
                    <Input
                      placeholder="Search actions..."
                      className="pl-10 bg-[#202225] border-0 text-[#DCDDDE] placeholder:text-[#72767D] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="w-full md:w-48">
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="bg-[#202225] border-0 text-[#DCDDDE] focus:ring-1 focus:ring-[#5865F2]">
                        <SelectValue placeholder="Action Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE]">
                        <SelectItem value="all">All Actions</SelectItem>
                        <SelectItem value="ban">Bans</SelectItem>
                        <SelectItem value="kick">Kicks</SelectItem>
                        <SelectItem value="mute">Mutes</SelectItem>
                        <SelectItem value="warn">Warnings</SelectItem>
                        <SelectItem value="unmute">Unmutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full md:w-48 flex items-center gap-2">
                    <Filter className="h-4 w-4 text-[#B9BBBE]" />
                    <Select value={filterServer} onValueChange={setFilterServer}>
                      <SelectTrigger className="bg-[#202225] border-0 text-[#DCDDDE] focus:ring-1 focus:ring-[#5865F2]">
                        <SelectValue placeholder="Server" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE]">
                        <SelectItem value="all">All Servers</SelectItem>
                        <SelectItem value="1">Gaming Community</SelectItem>
                        <SelectItem value="2">Anime Club</SelectItem>
                        <SelectItem value="3">Study Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {filteredActions.length === 0 ? (
                  <div className="text-center py-12">
                    <Shield className="h-12 w-12 text-[#72767D] mx-auto mb-4" />
                    <h3 className="text-white text-lg font-medium">No actions found</h3>
                    <p className="text-[#B9BBBE] mt-1">
                      {actions.length === 0
                        ? "No moderation actions have been taken yet"
                        : "Try adjusting your search or filters"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredActions.map((action) => (
                      <div key={action.id} className="p-3 bg-[#232428] rounded-md">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`p-1.5 rounded-full ${getActionClass(action.type)}`}>
                              {getActionIcon(action.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-white font-medium capitalize">{action.type}</p>
                                <span className="text-[#B9BBBE] text-sm">{action.user.username}</span>
                              </div>
                              <p className="text-[#B9BBBE] text-sm mt-1">{action.reason}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-[#B9BBBE]">
                                  {new Date(action.timestamp).toLocaleString()}
                                </span>
                                <span className="text-xs px-1.5 py-0.5 bg-[#3F4147] rounded text-[#B9BBBE]">
                                  {action.server.name}
                                </span>
                                {action.duration && (
                                  <span className="text-xs flex items-center gap-1 text-[#B9BBBE]">
                                    <Clock className="h-3 w-3" />
                                    {formatDuration(action.duration)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <span className="text-[#B9BBBE] text-xs">By: {action.moderator.username}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-[#2B2D31] border-[#1E1F22]">
              <CardHeader>
                <CardTitle className="text-white">Auto Moderation Settings</CardTitle>
                <CardDescription className="text-[#B9BBBE]">
                  Configure automatic moderation for your servers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="enableAutoMod" className="text-white text-base font-medium">
                      Enable Auto Moderation
                    </label>
                    <p className="text-sm text-[#B9BBBE]">Automatically moderate messages in your servers</p>
                  </div>
                  <Switch
                    id="enableAutoMod"
                    checked={moderationSettings.enableAutoMod}
                    onCheckedChange={(checked) =>
                      setModerationSettings({
                        ...moderationSettings,
                        enableAutoMod: checked,
                      })
                    }
                    className="data-[state=checked]:bg-[#5865F2]"
                  />
                </div>

                {moderationSettings.enableAutoMod && (
                  <>
                    <div className="space-y-4 border-t border-[#3F4147] pt-4">
                      <h3 className="text-white font-medium">Content Filters</h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <label htmlFor="deleteInvites" className="text-[#DCDDDE] text-sm">
                              Delete Discord Invites
                            </label>
                            <p className="text-xs text-[#B9BBBE]">
                              Automatically delete messages containing Discord invite links
                            </p>
                          </div>
                          <Switch
                            id="deleteInvites"
                            checked={moderationSettings.deleteInvites}
                            onCheckedChange={(checked) =>
                              setModerationSettings({
                                ...moderationSettings,
                                deleteInvites: checked,
                              })
                            }
                            className="data-[state=checked]:bg-[#5865F2]"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label htmlFor="deleteLinks" className="text-[#DCDDDE] text-sm">
                              Delete All Links
                            </label>
                            <p className="text-xs text-[#B9BBBE]">Automatically delete messages containing any links</p>
                          </div>
                          <Switch
                            id="deleteLinks"
                            checked={moderationSettings.deleteLinks}
                            onCheckedChange={(checked) =>
                              setModerationSettings({
                                ...moderationSettings,
                                deleteLinks: checked,
                              })
                            }
                            className="data-[state=checked]:bg-[#5865F2]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 border-t border-[#3F4147] pt-4">
                      <h3 className="text-white font-medium">Anti-Spam Settings</h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <label htmlFor="antiSpam" className="text-[#DCDDDE] text-sm">
                              Enable Anti-Spam
                            </label>
                            <p className="text-xs text-[#B9BBBE]">Detect and prevent message spam</p>
                          </div>
                          <Switch
                            id="antiSpam"
                            checked={moderationSettings.antiSpam}
                            onCheckedChange={(checked) =>
                              setModerationSettings({
                                ...moderationSettings,
                                antiSpam: checked,
                              })
                            }
                            className="data-[state=checked]:bg-[#5865F2]"
                          />
                        </div>

                        {moderationSettings.antiSpam && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label htmlFor="maxMessages" className="text-[#DCDDDE] text-sm">
                                  Max Messages
                                </label>
                                <Input
                                  id="maxMessages"
                                  type="number"
                                  min="1"
                                  value={moderationSettings.maxMessages}
                                  onChange={(e) =>
                                    setModerationSettings({
                                      ...moderationSettings,
                                      maxMessages: Number.parseInt(e.target.value) || 5,
                                    })
                                  }
                                  className="bg-[#202225] border-0 text-[#DCDDDE] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
                                />
                                <p className="text-xs text-[#B9BBBE]">
                                  Maximum number of messages in the time interval
                                </p>
                              </div>

                              <div className="space-y-2">
                                <label htmlFor="maxMessagesInterval" className="text-[#DCDDDE] text-sm">
                                  Time Interval (seconds)
                                </label>
                                <Input
                                  id="maxMessagesInterval"
                                  type="number"
                                  min="1"
                                  value={moderationSettings.maxMessagesInterval}
                                  onChange={(e) =>
                                    setModerationSettings({
                                      ...moderationSettings,
                                      maxMessagesInterval: Number.parseInt(e.target.value) || 5,
                                    })
                                  }
                                  className="bg-[#202225] border-0 text-[#DCDDDE] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
                                />
                                <p className="text-xs text-[#B9BBBE]">Time window to check for spam</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <label htmlFor="muteOnSpam" className="text-[#DCDDDE] text-sm">
                                  Mute on Spam Detection
                                </label>
                                <p className="text-xs text-[#B9BBBE]">
                                  Automatically mute users who are detected spamming
                                </p>
                              </div>
                              <Switch
                                id="muteOnSpam"
                                checked={moderationSettings.muteOnSpam}
                                onCheckedChange={(checked) =>
                                  setModerationSettings({
                                    ...moderationSettings,
                                    muteOnSpam: checked,
                                  })
                                }
                                className="data-[state=checked]:bg-[#5865F2]"
                              />
                            </div>

                            {moderationSettings.muteOnSpam && (
                              <div className="space-y-2">
                                <label htmlFor="muteDuration" className="text-[#DCDDDE] text-sm">
                                  Mute Duration (seconds)
                                </label>
                                <Input
                                  id="muteDuration"
                                  type="number"
                                  min="1"
                                  value={moderationSettings.muteDuration}
                                  onChange={(e) =>
                                    setModerationSettings({
                                      ...moderationSettings,
                                      muteDuration: Number.parseInt(e.target.value) || 300,
                                    })
                                  }
                                  className="bg-[#202225] border-0 text-[#DCDDDE] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
                                />
                                <p className="text-xs text-[#B9BBBE]">How long to mute users for spam violations</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 border-t border-[#3F4147] pt-4">
                      <h3 className="text-white font-medium">Mention Protection</h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <label htmlFor="antiMention" className="text-[#DCDDDE] text-sm">
                              Enable Anti-Mention Spam
                            </label>
                            <p className="text-xs text-[#B9BBBE]">Prevent users from mass-mentioning others</p>
                          </div>
                          <Switch
                            id="antiMention"
                            checked={moderationSettings.antiMention}
                            onCheckedChange={(checked) =>
                              setModerationSettings({
                                ...moderationSettings,
                                antiMention: checked,
                              })
                            }
                            className="data-[state=checked]:bg-[#5865F2]"
                          />
                        </div>

                        {moderationSettings.antiMention && (
                          <div className="space-y-2">
                            <label htmlFor="maxMentions" className="text-[#DCDDDE] text-sm">
                              Max Mentions Per Message
                            </label>
                            <Input
                              id="maxMentions"
                              type="number"
                              min="1"
                              value={moderationSettings.maxMentions}
                              onChange={(e) =>
                                setModerationSettings({
                                  ...moderationSettings,
                                  maxMentions: Number.parseInt(e.target.value) || 5,
                                })
                              }
                              className="bg-[#202225] border-0 text-[#DCDDDE] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
                            />
                            <p className="text-xs text-[#B9BBBE]">
                              Maximum number of user mentions allowed in a single message
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 border-t border-[#3F4147] pt-4">
                      <h3 className="text-white font-medium">Logging</h3>

                      <div className="flex items-center justify-between">
                        <div>
                          <label htmlFor="logActions" className="text-[#DCDDDE] text-sm">
                            Log Moderation Actions
                          </label>
                          <p className="text-xs text-[#B9BBBE]">Log all moderation actions to a channel</p>
                        </div>
                        <Switch
                          id="logActions"
                          checked={moderationSettings.logActions}
                          onCheckedChange={(checked) =>
                            setModerationSettings({
                              ...moderationSettings,
                              logActions: checked,
                            })
                          }
                          className="data-[state=checked]:bg-[#5865F2]"
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="filters">
            <Card className="bg-[#2B2D31] border-[#1E1F22]">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">Word Filters</CardTitle>
                    <CardDescription className="text-[#B9BBBE]">
                      Configure words and phrases to filter in chat
                    </CardDescription>
                  </div>
                  <Button
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center gap-2"
                    onClick={() => setIsAddWordDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Add Word
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {filterWords.length === 0 ? (
                  <div className="text-center py-12">
                    <Shield className="h-12 w-12 text-[#72767D] mx-auto mb-4" />
                    <h3 className="text-white text-lg font-medium">No filtered words</h3>
                    <p className="text-[#B9BBBE] mt-1">Add words to filter from chat messages</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#3F4147]">
                          <th className="text-left py-3 px-4 text-[#B9BBBE] font-medium">Word</th>
                          <th className="text-left py-3 px-4 text-[#B9BBBE] font-medium">Action</th>
                          <th className="text-left py-3 px-4 text-[#B9BBBE] font-medium">Replacement</th>
                          <th className="text-right py-3 px-4 text-[#B9BBBE] font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterWords.map((word) => (
                          <tr key={word.id} className="border-b border-[#3F4147] last:border-0">
                            <td className="py-4 px-4 text-white font-mono">{word.word}</td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  word.action === "delete"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : word.action === "warn"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : word.action === "mute"
                                        ? "bg-purple-500/20 text-purple-400"
                                        : word.action === "kick"
                                          ? "bg-orange-500/20 text-orange-400"
                                          : "bg-red-500/20 text-red-400"
                                }`}
                              >
                                {word.action.charAt(0).toUpperCase() + word.action.slice(1)}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-[#DCDDDE] font-mono">{word.replacement || "-"}</td>
                            <td className="py-4 px-4 text-right">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  setSelectedWord(word)
                                  setIsDeleteWordDialogOpen(true)
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Word Dialog */}
      <Dialog open={isAddWordDialogOpen} onOpenChange={setIsAddWordDialogOpen}>
        <DialogContent className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE]">
          <DialogHeader>
            <DialogTitle className="text-white">Add Filtered Word</DialogTitle>
            <DialogDescription className="text-[#B9BBBE]">
              Add a new word or phrase to filter in chat messages
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="word" className="text-[#B9BBBE] text-sm">
                Word or Phrase <span className="text-[#ED4245]">*</span>
              </label>
              <Input
                id="word"
                value={wordForm.word}
                onChange={(e) => setWordForm({ ...wordForm, word: e.target.value })}
                className="bg-[#202225] border-0 text-[#DCDDDE] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
                placeholder="Enter word to filter"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="action" className="text-[#B9BBBE] text-sm">
                Action <span className="text-[#ED4245]">*</span>
              </label>
              <Select
                value={wordForm.action}
                onValueChange={(value: any) => setWordForm({ ...wordForm, action: value })}
              >
                <SelectTrigger className="bg-[#202225] border-0 text-[#DCDDDE] focus:ring-1 focus:ring-[#5865F2]">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE]">
                  <SelectItem value="delete">Delete Message</SelectItem>
                  <SelectItem value="warn">Warn User</SelectItem>
                  <SelectItem value="mute">Mute User</SelectItem>
                  <SelectItem value="kick">Kick User</SelectItem>
                  <SelectItem value="ban">Ban User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="replacement" className="text-[#B9BBBE] text-sm">
                Replacement (Optional)
              </label>
              <Input
                id="replacement"
                value={wordForm.replacement}
                onChange={(e) => setWordForm({ ...wordForm, replacement: e.target.value })}
                className="bg-[#202225] border-0 text-[#DCDDDE] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
                placeholder="e.g. ****"
              />
              <p className="text-xs text-[#B9BBBE]">
                If provided, the word will be replaced with this text instead of deleting the message
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddWordDialogOpen(false)}
              className="border-[#3F4147] text-[#B9BBBE] hover:bg-[#3F4147] hover:text-white"
            >
              Cancel
            </Button>
            <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white" onClick={handleAddWord} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Word"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Word Dialog */}
      <Dialog open={isDeleteWordDialogOpen} onOpenChange={setIsDeleteWordDialogOpen}>
        <DialogContent className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE]">
          <DialogHeader>
            <DialogTitle className="text-white">Remove Filtered Word</DialogTitle>
            <DialogDescription className="text-[#B9BBBE]">
              Are you sure you want to remove "{selectedWord?.word}" from the filter list?
            </DialogDescription>
          </DialogHeader>
          <p className="text-[#ED4245]">This word will no longer be filtered in chat messages.</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteWordDialogOpen(false)}
              className="border-[#3F4147] text-[#B9BBBE] hover:bg-[#3F4147] hover:text-white"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteWord} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove Word"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
