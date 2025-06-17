"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Search, Plus, MessageSquare, Edit, Trash2, ChevronDown, ChevronUp, Loader2, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BotInfo {
  id: string
  username: string
  avatar: string | null
  discriminator: string
}

interface Command {
  id: string
  name: string
  description: string
  category: string
  usage: string
  examples: string[]
  enabled: boolean
  premium: boolean
  usageCount: number
  cooldown?: number
  permissions?: string[]
}

// Mock command data - in a real app, this would come from your API
const initialCommands: Command[] = [
  {
    id: "1",
    name: "play",
    description: "Play a song from YouTube, Spotify, or SoundCloud",
    category: "music",
    usage: "/play [song name or URL]",
    examples: ["/play Despacito", "/play https://www.youtube.com/watch?v=dQw4w9WgXcQ"],
    enabled: true,
    premium: false,
    usageCount: 45231,
    cooldown: 5,
    permissions: ["CONNECT", "SPEAK"],
  },
  {
    id: "2",
    name: "ban",
    description: "Ban a user from the server",
    category: "moderation",
    usage: "/ban [user] [reason]",
    examples: ["/ban @user Spamming", "/ban @user Breaking rules"],
    enabled: true,
    premium: false,
    usageCount: 12543,
    cooldown: 0,
    permissions: ["BAN_MEMBERS"],
  },
  {
    id: "3",
    name: "ticket",
    description: "Create a support ticket",
    category: "utility",
    usage: "/ticket [issue]",
    examples: ["/ticket Need help with bot setup", "/ticket Report a bug"],
    enabled: true,
    premium: true,
    usageCount: 8765,
    cooldown: 300,
    permissions: [],
  },
  {
    id: "4",
    name: "poll",
    description: "Create a poll for users to vote on",
    category: "utility",
    usage: "/poll [question] [options]",
    examples: ['/poll "What game should we play?" "Minecraft" "Fortnite" "Valorant"'],
    enabled: true,
    premium: false,
    usageCount: 23456,
    cooldown: 60,
    permissions: [],
  },
  {
    id: "5",
    name: "giveaway",
    description: "Start a giveaway in the server",
    category: "fun",
    usage: "/giveaway [prize] [duration] [winners]",
    examples: ["/giveaway Nitro 24h 1", "/giveaway Steam Key 48h 3"],
    enabled: true,
    premium: true,
    usageCount: 7654,
    cooldown: 3600,
    permissions: ["MANAGE_MESSAGES"],
  },
]

export default function CommandsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [botInfo, setBotInfo] = useState<BotInfo | null>(null)
  const [commands, setCommands] = useState<Command[]>([])
  const [filteredCommands, setFilteredCommands] = useState<Command[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [expandedCommand, setExpandedCommand] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCommand, setCurrentCommand] = useState<Command | null>(null)
  const [isNewCommand, setIsNewCommand] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Form state for editing/creating commands
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    category: "utility",
    usage: "",
    examples: "",
    enabled: true,
    premium: false,
    cooldown: "0",
    permissions: [] as string[],
  })

  // Load token and fetch data on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("discord_bot_token")
    if (storedToken) {
      // In a real app, you would fetch commands from your API
      // For now, we'll use the mock data
      setCommands(initialCommands)
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

  // Filter commands based on search and filters
  useEffect(() => {
    if (!commands.length) return

    let filtered = commands

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = commands.filter(
        (command) => command.name.toLowerCase().includes(query) || command.description.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((command) => command.category === filterCategory)
    }

    // Apply type filter
    if (filterType === "premium") {
      filtered = filtered.filter((command) => command.premium)
    } else if (filterType === "standard") {
      filtered = filtered.filter((command) => !command.premium)
    }

    setFilteredCommands(filtered)
  }, [commands, searchQuery, filterCategory, filterType])

  const toggleCommandExpansion = (id: string) => {
    setExpandedCommand(expandedCommand === id ? null : id)
  }

  const toggleCommandEnabled = (id: string) => {
    setCommands(commands.map((command) => (command.id === id ? { ...command, enabled: !command.enabled } : command)))

    toast({
      title: "Command Updated",
      description: `Command has been ${commands.find((c) => c.id === id)?.enabled ? "disabled" : "enabled"}.`,
    })
  }

  const openEditDialog = (command: Command) => {
    setCurrentCommand(command)
    setFormState({
      name: command.name,
      description: command.description,
      category: command.category,
      usage: command.usage,
      examples: command.examples.join("\n"),
      enabled: command.enabled,
      premium: command.premium,
      cooldown: command.cooldown?.toString() || "0",
      permissions: command.permissions || [],
    })
    setIsNewCommand(false)
    setIsEditDialogOpen(true)
  }

  const openNewCommandDialog = () => {
    setCurrentCommand(null)
    setFormState({
      name: "",
      description: "",
      category: "utility",
      usage: "/",
      examples: "",
      enabled: true,
      premium: false,
      cooldown: "0",
      permissions: [],
    })
    setIsNewCommand(true)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (command: Command) => {
    setCurrentCommand(command)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveCommand = () => {
    setIsSaving(true)

    // Validate form
    if (!formState.name || !formState.description || !formState.usage) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    setTimeout(() => {
      try {
        const examples = formState.examples.split("\n").filter((ex) => ex.trim() !== "")

        if (isNewCommand) {
          // Create new command
          const newCommand: Command = {
            id: Date.now().toString(),
            name: formState.name,
            description: formState.description,
            category: formState.category,
            usage: formState.usage,
            examples: examples,
            enabled: formState.enabled,
            premium: formState.premium,
            usageCount: 0,
            cooldown: Number.parseInt(formState.cooldown),
            permissions: formState.permissions,
          }

          setCommands([...commands, newCommand])

          toast({
            title: "Command Created",
            description: `Command "${formState.name}" has been created successfully.`,
          })
        } else {
          // Update existing command
          setCommands(
            commands.map((command) =>
              command.id === currentCommand?.id
                ? {
                    ...command,
                    name: formState.name,
                    description: formState.description,
                    category: formState.category,
                    usage: formState.usage,
                    examples: examples,
                    enabled: formState.enabled,
                    premium: formState.premium,
                    cooldown: Number.parseInt(formState.cooldown),
                    permissions: formState.permissions,
                  }
                : command,
            ),
          )

          toast({
            title: "Command Updated",
            description: `Command "${formState.name}" has been updated successfully.`,
          })
        }

        setIsEditDialogOpen(false)
      } catch (error) {
        console.error("Error saving command:", error)
        toast({
          title: "Error",
          description: "Failed to save command. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSaving(false)
      }
    }, 1000) // Simulate API delay
  }

  const handleDeleteCommand = () => {
    if (!currentCommand) return

    setIsDeleting(true)

    setTimeout(() => {
      try {
        setCommands(commands.filter((command) => command.id !== currentCommand.id))

        toast({
          title: "Command Deleted",
          description: `Command "${currentCommand.name}" has been deleted successfully.`,
        })

        setIsDeleteDialogOpen(false)
      } catch (error) {
        console.error("Error deleting command:", error)
        toast({
          title: "Error",
          description: "Failed to delete command. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsDeleting(false)
      }
    }, 1000) // Simulate API delay
  }

  const handlePermissionToggle = (permission: string) => {
    setFormState((prev) => {
      const permissions = [...prev.permissions]

      if (permissions.includes(permission)) {
        return { ...prev, permissions: permissions.filter((p) => p !== permission) }
      } else {
        return { ...prev, permissions: [...permissions, permission] }
      }
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1E1F22] text-[#DCDDDE] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#5865F2] mx-auto mb-4" />
          <p className="text-white text-lg">Loading commands...</p>
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
              Please log in to your bot to view and manage commands
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
            <h1 className="text-3xl font-bold text-white">Command Management</h1>
            <p className="text-[#B9BBBE] mt-1">Configure and manage bot commands</p>
          </div>
          <Button
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center gap-2"
            onClick={openNewCommandDialog}
          >
            <Plus className="h-4 w-4" />
            New Command
          </Button>
        </div>

        <Card className="bg-[#2B2D31] border-[#1E1F22]">
          <CardHeader>
            <CardTitle className="text-white">Commands</CardTitle>
            <CardDescription className="text-[#B9BBBE]">View, edit, and manage all bot commands</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#B9BBBE]" />
                <Input
                  placeholder="Search commands..."
                  className="pl-10 bg-[#202225] border-0 text-[#DCDDDE] placeholder:text-[#72767D] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="w-full md:w-48">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="bg-[#202225] border-0 text-[#DCDDDE] focus:ring-1 focus:ring-[#5865F2]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE]">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="moderation">Moderation</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="utility">Utility</SelectItem>
                    <SelectItem value="fun">Fun</SelectItem>
                    <SelectItem value="settings">Settings</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-48">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="bg-[#202225] border-0 text-[#DCDDDE] focus:ring-1 focus:ring-[#5865F2]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE]">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="premium">Premium Only</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredCommands.map((command) => (
                <Collapsible
                  key={command.id}
                  open={expandedCommand === command.id}
                  onOpenChange={() => toggleCommandExpansion(command.id)}
                  className="border border-[#3F4147] rounded-md overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4 bg-[#232428]">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-md ${
                          command.category === "moderation"
                            ? "bg-[#ED4245]/20 text-[#ED4245]"
                            : command.category === "music"
                              ? "bg-[#5865F2]/20 text-[#5865F2]"
                              : command.category === "utility"
                                ? "bg-[#2ECC71]/20 text-[#2ECC71]"
                                : command.category === "fun"
                                  ? "bg-[#9B59B6]/20 text-[#9B59B6]"
                                  : "bg-[#F1C40F]/20 text-[#F1C40F]"
                        }`}
                      >
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-white font-medium">/{command.name}</p>
                          {command.premium && (
                            <span className="px-2 py-0.5 bg-[#5865F2]/20 text-[#5865F2] rounded-full text-xs">
                              Premium
                            </span>
                          )}
                        </div>
                        <p className="text-[#B9BBBE] text-sm">{command.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={command.enabled}
                          onCheckedChange={() => toggleCommandEnabled(command.id)}
                          className="data-[state=checked]:bg-[#5865F2]"
                        />
                        <span className="text-[#B9BBBE] text-sm">{command.enabled ? "Enabled" : "Disabled"}</span>
                      </div>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          {expandedCommand === command.id ? (
                            <ChevronUp className="h-4 w-4 text-[#B9BBBE]" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-[#B9BBBE]" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                  <CollapsibleContent>
                    <div className="p-4 bg-[#2B2D31] border-t border-[#3F4147]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-[#B9BBBE] font-medium mb-2">Usage</h4>
                          <code className="block bg-[#202225] p-3 rounded-md text-[#DCDDDE] font-mono">
                            {command.usage}
                          </code>

                          <h4 className="text-[#B9BBBE] font-medium mt-4 mb-2">Examples</h4>
                          <div className="space-y-2">
                            {command.examples.map((example, index) => (
                              <code key={index} className="block bg-[#202225] p-3 rounded-md text-[#DCDDDE] font-mono">
                                {example}
                              </code>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[#B9BBBE] font-medium mb-2">Statistics</h4>
                          <div className="bg-[#202225] p-4 rounded-md">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[#B9BBBE]">Usage Count</span>
                              <span className="text-white font-medium">{command.usageCount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[#B9BBBE]">Category</span>
                              <span className="text-white font-medium capitalize">{command.category}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[#B9BBBE]">Type</span>
                              <span className="text-white font-medium">{command.premium ? "Premium" : "Standard"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[#B9BBBE]">Cooldown</span>
                              <span className="text-white font-medium">
                                {command.cooldown ? `${command.cooldown} seconds` : "None"}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button
                              className="flex-1 bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center justify-center gap-2"
                              onClick={() => openEditDialog(command)}
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              className="flex items-center justify-center gap-2"
                              onClick={() => openDeleteDialog(command)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}

              {filteredCommands.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-[#72767D] mx-auto mb-4" />
                  <h3 className="text-white text-lg font-medium">No commands found</h3>
                  <p className="text-[#B9BBBE] mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Edit/Create Command Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE] max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-white">{isNewCommand ? "Create Command" : "Edit Command"}</DialogTitle>
            <DialogDescription className="text-[#B9BBBE]">
              {isNewCommand ? "Create a new command for your bot" : `Edit the "${currentCommand?.name}" command`}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="general" className="mt-4">
            <TabsList className="bg-[#202225] border-[#3F4147]">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[#B9BBBE] text-sm">
                    Command Name <span className="text-[#ED4245]">*</span>
                  </label>
                  <Input
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="bg-[#202225] border-0 text-[#DCDDDE] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
                    placeholder="e.g. play"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="text-[#B9BBBE] text-sm">
                    Category <span className="text-[#ED4245]">*</span>
                  </label>
                  <Select
                    value={formState.category}
                    onValueChange={(value) => setFormState({ ...formState, category: value })}
                  >
                    <SelectTrigger className="bg-[#202225] border-0 text-[#DCDDDE] focus:ring-1 focus:ring-[#5865F2]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE]">
                      <SelectItem value="moderation">Moderation</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="utility">Utility</SelectItem>
                      <SelectItem value="fun">Fun</SelectItem>
                      <SelectItem value="settings">Settings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-[#B9BBBE] text-sm">
                  Description <span className="text-[#ED4245]">*</span>
                </label>
                <Textarea
                  id="description"
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="bg-[#202225] border-0 text-[#DCDDDE] focus-visible:ring-1 focus-visible:ring-[#5865F2] min-h-[80px]"
                  placeholder="Describe what this command does"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="cooldown" className="text-[#B9BBBE] text-sm">
                    Cooldown (seconds)
                  </label>
                  <Input
                    id="cooldown"
                    type="number"
                    min="0"
                    value={formState.cooldown}
                    onChange={(e) => setFormState({ ...formState, cooldown: e.target.value })}
                    className="bg-[#202225] border-0 text-[#DCDDDE] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="enabled" className="text-[#B9BBBE] text-sm">
                      Enabled
                    </label>
                    <Switch
                      id="enabled"
                      checked={formState.enabled}
                      onCheckedChange={(checked) => setFormState({ ...formState, enabled: checked })}
                      className="data-[state=checked]:bg-[#5865F2]"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="premium" className="text-[#B9BBBE] text-sm">
                      Premium Only
                    </label>
                    <Switch
                      id="premium"
                      checked={formState.premium}
                      onCheckedChange={(checked) => setFormState({ ...formState, premium: checked })}
                      className="data-[state=checked]:bg-[#5865F2]"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="usage" className="space-y-4 mt-4">
              <div className="space-y-2">
                <label htmlFor="usage" className="text-[#B9BBBE] text-sm">
                  Usage <span className="text-[#ED4245]">*</span>
                </label>
                <Input
                  id="usage"
                  value={formState.usage}
                  onChange={(e) => setFormState({ ...formState, usage: e.target.value })}
                  className="bg-[#202225] border-0 text-[#DCDDDE] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
                  placeholder="e.g. /command [argument]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="examples" className="text-[#B9BBBE] text-sm">
                  Examples (one per line)
                </label>
                <Textarea
                  id="examples"
                  value={formState.examples}
                  onChange={(e) => setFormState({ ...formState, examples: e.target.value })}
                  className="bg-[#202225] border-0 text-[#DCDDDE] focus-visible:ring-1 focus-visible:ring-[#5865F2] min-h-[120px]"
                  placeholder="/command example1&#10;/command example2"
                />
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-[#B9BBBE] text-sm">Required Permissions</label>
                <p className="text-[#B9BBBE] text-xs mb-4">Select the permissions required to use this command</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "ADMINISTRATOR",
                    "MANAGE_GUILD",
                    "MANAGE_ROLES",
                    "MANAGE_CHANNELS",
                    "MANAGE_MESSAGES",
                    "KICK_MEMBERS",
                    "BAN_MEMBERS",
                    "MODERATE_MEMBERS",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "MOVE_MEMBERS",
                  ].map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Switch
                        id={`permission-${permission}`}
                        checked={formState.permissions.includes(permission)}
                        onCheckedChange={() => handlePermissionToggle(permission)}
                        className="data-[state=checked]:bg-[#5865F2]"
                      />
                      <label htmlFor={`permission-${permission}`} className="text-[#DCDDDE] text-sm cursor-pointer">
                        {permission.replace(/_/g, " ")}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-[#3F4147] text-[#B9BBBE] hover:bg-[#3F4147] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveCommand}
              disabled={isSaving}
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Command
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Command Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE]">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Command</DialogTitle>
            <DialogDescription className="text-[#B9BBBE]">
              Are you sure you want to delete the command "/{currentCommand?.name}"?
            </DialogDescription>
          </DialogHeader>
          <p className="text-[#ED4245]">This action cannot be undone. The command will be permanently deleted.</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-[#3F4147] text-[#B9BBBE] hover:bg-[#3F4147] hover:text-white"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCommand} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Command"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
