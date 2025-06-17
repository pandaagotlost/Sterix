"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Shield, MessageSquare, Users, Settings, Bell, Search, Filter, ChevronDown, Copy, Check } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Command categories with their icons
const categories = [
  { id: "moderation", name: "Moderation", icon: Shield },
  { id: "utility", name: "Utility", icon: MessageSquare },
  { id: "roles", name: "Roles", icon: Users },
  { id: "config", name: "Configuration", icon: Settings },
  { id: "welcome", name: "Welcome", icon: Bell },
]

// Command types
const commandTypes = [
  { id: "slash", name: "Slash Commands", prefix: "/" },
  { id: "prefix", name: "Prefix Commands", prefix: "." },
]

// Sample commands data
const commands = [
  // Moderation commands
  {
    name: "ban",
    description: "Ban a user from the server",
    usage: "/ban @user [reason]",
    example: "/ban @user Spamming in channels",
    category: "moderation",
    type: "slash",
    permissions: ["BAN_MEMBERS"],
    premium: false,
  },
  {
    name: "kick",
    description: "Kick a user from the server",
    usage: "/kick @user [reason]",
    example: "/kick @user Violating server rules",
    category: "moderation",
    type: "slash",
    permissions: ["KICK_MEMBERS"],
    premium: false,
  },
  {
    name: "mute",
    description: "Timeout a user for a specified duration",
    usage: "/mute @user [duration] [reason]",
    example: "/mute @user 1h Excessive caps",
    category: "moderation",
    type: "slash",
    permissions: ["MODERATE_MEMBERS"],
    premium: false,
  },
  {
    name: "unmute",
    description: "Remove timeout from a user",
    usage: "/unmute @user",
    example: "/unmute @user",
    category: "moderation",
    type: "slash",
    permissions: ["MODERATE_MEMBERS"],
    premium: false,
  },
  {
    name: "warn",
    description: "Warn a user",
    usage: "/warn @user [reason]",
    example: "/warn @user Inappropriate behavior",
    category: "moderation",
    type: "slash",
    permissions: ["MODERATE_MEMBERS"],
    premium: false,
  },
  {
    name: "clear",
    description: "Delete a specified number of messages",
    usage: "/clear [amount] [user]",
    example: "/clear 50 @user",
    category: "moderation",
    type: "slash",
    permissions: ["MANAGE_MESSAGES"],
    premium: false,
  },

  // Utility commands
  {
    name: "ticket",
    description: "Create a support ticket",
    usage: "/ticket create [title]",
    example: "/ticket create Help with setup",
    category: "utility",
    type: "slash",
    permissions: [],
    premium: false,
  },
  {
    name: "poll",
    description: "Create a poll for users to vote on",
    usage: "/poll [question] [options]",
    example: '/poll "What game should we play?" "Minecraft" "Fortnite" "Valorant"',
    category: "utility",
    type: "slash",
    permissions: [],
    premium: false,
  },
  {
    name: "embed",
    description: "Create a custom embed message",
    usage: "/embed [title] [description] [color]",
    example: '/embed "Server Rules" "Please follow these rules" #5865F2',
    category: "utility",
    type: "slash",
    permissions: ["MANAGE_MESSAGES"],
    premium: false,
  },
  {
    name: "giveaway",
    description: "Start a giveaway",
    usage: "/giveaway [prize] [winners] [duration]",
    example: '/giveaway "Discord Nitro" 1 24h',
    category: "utility",
    type: "slash",
    permissions: ["MANAGE_GUILD"],
    premium: true,
  },

  // Role commands
  {
    name: "role",
    description: "Manage roles for users",
    usage: "/role add @user @role",
    example: "/role add @user @Member",
    category: "roles",
    type: "slash",
    permissions: ["MANAGE_ROLES"],
    premium: false,
  },
  {
    name: "reaction-role",
    description: "Create a reaction role message",
    usage: "/reaction-role [channel] [message] [emoji] [@role]",
    example: '/reaction-role #roles "Choose your roles" 🎮 @Gamer',
    category: "roles",
    type: "slash",
    permissions: ["MANAGE_ROLES"],
    premium: false,
  },
  {
    name: "autorole",
    description: "Configure automatic roles for new members",
    usage: "/autorole add @role",
    example: "/autorole add @Member",
    category: "roles",
    type: "slash",
    permissions: ["MANAGE_ROLES"],
    premium: false,
  },

  // Configuration commands
  {
    name: "prefix",
    description: "Change the bot's command prefix",
    usage: ".prefix [new_prefix]",
    example: ".prefix !",
    category: "config",
    type: "prefix",
    permissions: ["MANAGE_GUILD"],
    premium: false,
  },
  {
    name: "setup",
    description: "Set up various bot features",
    usage: "/setup [feature]",
    example: "/setup logging",
    category: "config",
    type: "slash",
    permissions: ["MANAGE_GUILD"],
    premium: false,
  },
  {
    name: "logging",
    description: "Configure server logging",
    usage: "/logging [channel] [events]",
    example: "/logging #logs moderation,members",
    category: "config",
    type: "slash",
    permissions: ["MANAGE_GUILD"],
    premium: false,
  },

  // Welcome commands
  {
    name: "welcome",
    description: "Configure welcome messages",
    usage: "/welcome [channel] [message]",
    example: '/welcome #welcome "Welcome {user} to {server}!"',
    category: "welcome",
    type: "slash",
    permissions: ["MANAGE_GUILD"],
    premium: false,
  },
  {
    name: "goodbye",
    description: "Configure goodbye messages",
    usage: "/goodbye [channel] [message]",
    example: '/goodbye #goodbye "{user} has left the server."',
    category: "welcome",
    type: "slash",
    permissions: ["MANAGE_GUILD"],
    premium: false,
  },
]

export default function CommandsPage() {
  const [activeCategory, setActiveCategory] = useState("moderation")
  const [activeType, setActiveType] = useState("slash")
  const [searchQuery, setSearchQuery] = useState("")
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  // Filter commands based on active filters
  const filteredCommands = commands.filter((command) => {
    // Filter by category
    if (activeCategory !== "all" && command.category !== activeCategory) return false

    // Filter by command type
    if (activeType !== "all" && command.type !== activeType) return false

    // Filter by premium status
    if (showPremiumOnly && !command.premium) return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        command.name.toLowerCase().includes(query) ||
        command.description.toLowerCase().includes(query) ||
        command.usage.toLowerCase().includes(query)
      )
    }

    return true
  })

  // Copy command to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(text)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-discord-primary pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-discord-header mb-4">Commands</h1>
              <p className="text-lg text-discord-normal">Explore all the commands available with Sterix Bot.</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-discord-muted" />
                  <input
                    type="text"
                    placeholder="Search commands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="discord-input w-full pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="relative">
                    <button className="discord-button-secondary flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Filters</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>

                  <label className="flex items-center gap-2 text-discord-normal">
                    <input
                      type="checkbox"
                      checked={showPremiumOnly}
                      onChange={() => setShowPremiumOnly(!showPremiumOnly)}
                      className="rounded bg-discord-tertiary border-discord-secondary text-discord-blurple focus:ring-discord-blurple"
                    />
                    Premium Only
                  </label>
                </div>
              </div>
            </div>

            {/* Command Type Tabs */}
            <Tabs defaultValue="slash" value={activeType} onValueChange={setActiveType} className="mb-8">
              <TabsList className="bg-discord-secondary border border-discord-tertiary p-1 rounded-md">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-discord-blurple data-[state=active]:text-white"
                >
                  All Commands
                </TabsTrigger>
                {commandTypes.map((type) => (
                  <TabsTrigger
                    key={type.id}
                    value={type.id}
                    className="data-[state=active]:bg-discord-blurple data-[state=active]:text-white"
                  >
                    {type.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Category Tabs */}
            <Tabs defaultValue="moderation" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
              <TabsList className="bg-discord-secondary border border-discord-tertiary p-1 rounded-md">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-discord-blurple data-[state=active]:text-white"
                >
                  All Categories
                </TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-discord-blurple data-[state=active]:text-white flex items-center gap-1"
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="hidden md:inline">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Commands List */}
            <div className="space-y-4">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command) => (
                  <div key={`${command.type}-${command.name}`} className="discord-card">
                    <div className="p-4 border-b border-discord-tertiary flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-discord-header">{command.name}</h3>
                        {command.premium && (
                          <Badge className="bg-discord-yellow/20 text-discord-yellow border-discord-yellow/30">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {command.permissions.length > 0 && (
                          <Badge className="bg-discord-red/20 text-discord-red border-discord-red/30">
                            Requires Permissions
                          </Badge>
                        )}
                        <Badge className="bg-discord-secondary text-discord-normal border-discord-tertiary">
                          {command.type === "slash" ? "Slash Command" : "Prefix Command"}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-discord-normal mb-4">{command.description}</p>

                      <div className="space-y-2">
                        <div>
                          <div className="text-sm text-discord-muted mb-1">Usage:</div>
                          <div className="flex items-center gap-2">
                            <div className="command-block flex-1">{command.usage}</div>
                            <button
                              onClick={() => copyToClipboard(command.usage)}
                              className="p-2 rounded-md hover:bg-discord-secondary text-discord-muted hover:text-discord-normal transition-colors"
                              aria-label="Copy command"
                            >
                              {copiedCommand === command.usage ? (
                                <Check className="h-4 w-4 text-discord-green" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-discord-muted mb-1">Example:</div>
                          <div className="flex items-center gap-2">
                            <div className="command-block flex-1">{command.example}</div>
                            <button
                              onClick={() => copyToClipboard(command.example)}
                              className="p-2 rounded-md hover:bg-discord-secondary text-discord-muted hover:text-discord-normal transition-colors"
                              aria-label="Copy example"
                            >
                              {copiedCommand === command.example ? (
                                <Check className="h-4 w-4 text-discord-green" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {command.permissions.length > 0 && (
                          <div>
                            <div className="text-sm text-discord-muted mb-1">Required Permissions:</div>
                            <div className="flex flex-wrap gap-2">
                              {command.permissions.map((permission) => (
                                <Badge
                                  key={permission}
                                  className="bg-discord-tertiary text-discord-normal border-discord-secondary"
                                >
                                  {permission
                                    .split("_")
                                    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
                                    .join(" ")}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="discord-card p-8 text-center">
                  <p className="text-discord-muted mb-2">No commands found matching your filters.</p>
                  <button
                    onClick={() => {
                      setActiveCategory("all")
                      setActiveType("all")
                      setSearchQuery("")
                      setShowPremiumOnly(false)
                    }}
                    className="text-discord-blurple hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
