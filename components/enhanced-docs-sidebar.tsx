"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  ChevronRight,
  Rocket,
  Settings,
  Shield,
  HelpCircle,
  Clock,
  MessageSquare,
  Hash,
  Bell,
  Star,
  Search,
  Lock,
  AlertTriangle,
  Terminal,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

// Define the sidebar structure with nested items and badges
const sidebarItems = [
  {
    title: "Getting Started",
    href: "/docs",
    icon: Rocket,
  },
  {
    title: "Setup Guide",
    icon: Settings,
    children: [
      { title: "Installation", href: "/docs/installation", badge: "Essential" },
      { title: "Quick Start", href: "/docs/quick-start" },
      { title: "Permissions", href: "/docs/permissions", badge: "Important" },
      { title: "Configuration", href: "/docs/configuration" },
    ],
  },
  {
    title: "Commands",
    icon: Terminal,
    children: [
      { title: "Command Overview", href: "/docs/general" },
      { title: "Slash Commands", href: "/docs/slash-commands", badge: "Recommended" },
      { title: "Prefix Commands", href: "/docs/prefix-commands" },
      { title: "Command Arguments", href: "/docs/command-arguments" },
      { title: "Command Cooldowns", href: "/docs/command-cooldowns" },
    ],
  },
  {
    title: "Moderation",
    icon: Shield,
    children: [
      { title: "Basic Moderation", href: "/docs/moderation" },
      { title: "Auto Moderation", href: "/docs/auto-mod", badge: "Popular" },
      { title: "Anti-Raid", href: "/docs/anti-raid", badge: "Security" },
      { title: "Logging", href: "/docs/logging" },
      { title: "Warnings", href: "/docs/warnings" },
      { title: "Mutes & Timeouts", href: "/docs/timeouts" },
      { title: "Ban Appeals", href: "/docs/ban-appeals" },
    ],
  },
  {
    title: "Server Management",
    icon: Hash,
    children: [
      { title: "Welcome System", href: "/docs/welcome" },
      { title: "Custom Roles", href: "/docs/custom-roles" },
      { title: "Reaction Roles", href: "/docs/reaction-roles", badge: "Popular" },
      { title: "Level System", href: "/docs/levels" },
      { title: "Server Stats", href: "/docs/server-stats" },
      { title: "Auto Roles", href: "/docs/auto-roles" },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    children: [
      { title: "Join/Leave Messages", href: "/docs/join-leave" },
      { title: "Boost Messages", href: "/docs/boost-message" },
      { title: "Twitch Alerts", href: "/docs/twitch-alerts" },
      { title: "YouTube Alerts", href: "/docs/youtube-alerts" },
      { title: "Custom Alerts", href: "/docs/custom-alerts" },
    ],
  },
  {
    title: "Utility",
    icon: MessageSquare,
    children: [
      { title: "Tickets", href: "/docs/tickets", badge: "Popular" },
      { title: "Giveaways", href: "/docs/giveaway" },
      { title: "Voice Features", href: "/docs/voice" },
      { title: "Ignore System", href: "/docs/ignore" },
      { title: "Tags & Custom Commands", href: "/docs/tags" },
      { title: "Polls & Voting", href: "/docs/polls" },
      { title: "Reminders", href: "/docs/reminders" },
    ],
  },
  {
    title: "Fun Features",
    icon: Star,
    children: [
      { title: "Music Commands", href: "/docs/music" },
      { title: "Games", href: "/docs/games" },
      { title: "Memes & Images", href: "/docs/memes" },
      { title: "Economy System", href: "/docs/economy" },
    ],
  },
  {
    title: "Advanced",
    icon: Lock,
    children: [
      { title: "Custom Embeds", href: "/docs/embeds" },
      { title: "Autoresponders", href: "/docs/autoresponders" },
      { title: "Scheduled Messages", href: "/docs/scheduled-messages" },
      { title: "API Integration", href: "/docs/api-integration" },
      { title: "Webhooks", href: "/docs/webhooks" },
    ],
  },
  {
    title: "Troubleshooting",
    icon: AlertTriangle,
    children: [
      { title: "Common Issues", href: "/docs/common-issues" },
      { title: "Permissions Issues", href: "/docs/permission-issues" },
      { title: "Command Errors", href: "/docs/command-errors" },
      { title: "Bot Not Responding", href: "/docs/bot-not-responding" },
    ],
  },
  {
    title: "Updates",
    href: "/docs/changelog",
    icon: Clock,
    badge: "New",
  },
  {
    title: "Support",
    href: "/docs/faq",
    icon: HelpCircle,
  },
]

// Remove duplicate entries from sidebarItems and its children
const uniqueSidebarItems = sidebarItems.reduce((acc, item) => {
  const existingItem = acc.find((i) => i.title === item.title)

  if (!existingItem) {
    if (item.children) {
      const uniqueChildren = item.children.reduce((childAcc, child) => {
        const existingChild = childAcc.find((c) => c.title === child.title)
        if (!existingChild) {
          childAcc.push(child)
        }
        return childAcc
      }, [])
      item = { ...item, children: uniqueChildren }
    }
    acc.push(item)
  }
  return acc
}, [])

export function EnhancedDocsSidebar() {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredItems, setFilteredItems] = useState(uniqueSidebarItems)

  // Initialize expanded sections based on current path
  useEffect(() => {
    const newExpandedSections: Record<string, boolean> = {}

    uniqueSidebarItems.forEach((item) => {
      if (item.children) {
        const isActive = item.children.some((child) => child.href === pathname)
        newExpandedSections[item.title] = isActive
      }
    })

    setExpandedSections(newExpandedSections)
  }, [pathname])

  // Filter sidebar items based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredItems(uniqueSidebarItems)
      return
    }

    const filtered = uniqueSidebarItems
      .map((item) => {
        if (!item.children) {
          return item.title.toLowerCase().includes(searchTerm.toLowerCase()) ? item : null
        }

        const filteredChildren = item.children.filter((child) =>
          child.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )

        if (filteredChildren.length > 0) {
          return { ...item, children: filteredChildren }
        }

        return item.title.toLowerCase().includes(searchTerm.toLowerCase()) ? item : null
      })
      .filter(Boolean) as typeof sidebarItems

    setFilteredItems(filtered)

    // Expand all sections that have matching children
    const newExpandedSections = { ...expandedSections }
    filtered.forEach((item) => {
      if (item.children) {
        newExpandedSections[item.title] = true
      }
    })
    setExpandedSections(newExpandedSections)
  }, [searchTerm])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="hidden lg:block w-72 shrink-0 border-r border-[#2f3136] dark:border-[#1e1f22] h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto bg-[#2b2d31] dark:bg-[#1e1f22]">
      <div className="py-6 px-4">
        <Link href="/docs" className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="font-bold text-xl text-white">Sterix Docs</span>
        </Link>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full bg-[#1e1f22] dark:bg-[#111214] text-white placeholder-gray-400 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <nav className="space-y-1">
          {filteredItems.map((item, index) => (
            <div key={index} className="mb-2">
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleSection(item.title)}
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                      expandedSections[item.title]
                        ? "bg-[#393c43] dark:bg-[#2f3136] text-white"
                        : "text-gray-300 hover:text-white hover:bg-[#393c43]/50 dark:hover:bg-[#2f3136]/50"
                    }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge className="ml-2 bg-[#5865f2]/20 text-[#5865f2] border-[#5865f2]/30 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <span className="ml-auto">
                      {expandedSections[item.title] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  {expandedSections[item.title] && (
                    <div className="ml-6 mt-1 space-y-1 border-l border-[#4f545c] dark:border-[#2f3136] pl-2">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href}
                          className={cn(
                            "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                            pathname === child.href
                              ? "text-white bg-[#5865f2]"
                              : "text-gray-400 hover:text-gray-300 hover:bg-[#393c43]/50 dark:hover:bg-[#2f3136]/50",
                          )}
                        >
                          <span>{child.title}</span>
                          {child.badge && (
                            <Badge className="ml-2 bg-[#5865f2]/20 text-[#5865f2] border-[#5865f2]/30 text-xs">
                              {child.badge}
                            </Badge>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-[#5865f2] text-white"
                      : "text-gray-300 hover:text-white hover:bg-[#393c43]/50 dark:hover:bg-[#2f3136]/50",
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                  {item.title}
                  {item.badge && (
                    <Badge className="ml-2 bg-[#5865f2]/20 text-[#5865f2] border-[#5865f2]/30 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-8 pt-4 border-t border-[#4f545c]/30">
          <div className="bg-[#393c43]/30 dark:bg-[#2f3136]/30 rounded-md p-3">
            <h4 className="text-sm font-medium text-white mb-2">Need Help?</h4>
            <p className="text-xs text-gray-400 mb-3">
              Join our Discord server for direct support from our team and community.
            </p>
            <Link href="https://discord.gg/sterix" className="text-xs text-[#5865f2] hover:underline">
              Join Support Server →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
