"use client"

import { useState, useEffect } from "react"
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
  Zap,
  X,
  Search,
} from "lucide-react"

// Define the sidebar structure with nested items - same as in docs-sidebar.tsx
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
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
      { title: "Permissions", href: "/docs/permissions" },
    ],
  },
  {
    title: "Core Features",
    icon: Zap,
    children: [
      { title: "Command Overview", href: "/docs/general" },
      { title: "Slash Commands", href: "/docs/slash-commands" },
      { title: "Prefix Commands", href: "/docs/prefix-commands" },
    ],
  },
  {
    title: "Moderation",
    icon: Shield,
    children: [
      { title: "Basic Moderation", href: "/docs/moderation" },
      { title: "Auto Moderation", href: "/docs/auto-mod" },
      { title: "Anti-Raid", href: "/docs/anti-raid" },
      { title: "Logging", href: "/docs/logging" },
    ],
  },
  {
    title: "Server Management",
    icon: Hash,
    children: [
      { title: "Welcome System", href: "/docs/welcome" },
      { title: "Custom Roles", href: "/docs/custom-roles" },
      { title: "Reaction Roles", href: "/docs/reaction-roles" },
    ],
  },
  {
    title: "Utility",
    icon: MessageSquare,
    children: [
      { title: "Tickets", href: "/docs/tickets" },
      { title: "Giveaways", href: "/docs/giveaway" },
      { title: "Voice Features", href: "/docs/voice" },
      { title: "Ignore System", href: "/docs/ignore" },
    ],
  },
  {
    title: "Updates",
    href: "/docs/changelog",
    icon: Clock,
  },
  {
    title: "Support",
    href: "/docs/faq",
    icon: HelpCircle,
  },
]

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Core Features": true,
    Moderation: false,
    "Server Management": false,
    Utility: false,
    "Setup Guide": false,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredItems, setFilteredItems] = useState(sidebarItems)

  // Close sidebar when route changes
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  // Filter sidebar items based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredItems(sidebarItems)
      return
    }

    const query = searchQuery.toLowerCase()

    // Helper function to search through nested items
    const searchInItems = (items: typeof sidebarItems) => {
      return items.filter((item) => {
        // Check if the current item matches
        const titleMatch = item.title.toLowerCase().includes(query)

        // If it has children, check if any child matches
        if (item.children) {
          const matchingChildren = item.children.filter((child) => child.title.toLowerCase().includes(query))

          // If any children match, expand this section
          if (matchingChildren.length > 0) {
            setExpandedSections((prev) => ({
              ...prev,
              [item.title]: true,
            }))

            // Return the item with only matching children
            return {
              ...item,
              children: matchingChildren,
            }
          }
        }

        // Return the item if its title matches
        return titleMatch
      })
    }

    setFilteredItems(searchInItems(sidebarItems))
  }, [searchQuery])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#2b2d31] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-[#2f3136]">
          <Link href="/docs" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-bold text-xl text-white">Sterix Docs</span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#393c43]"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search input for mobile */}
        <div className="p-4 border-b border-[#2f3136]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1f22] text-white placeholder-gray-400 rounded-md px-3 py-2 pl-9 focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
            />
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <nav className="p-4">
          {filteredItems.map((item, index) => (
            <div key={index} className="mb-2">
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleSection(item.title)}
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                      expandedSections[item.title]
                        ? "bg-[#393c43] text-white"
                        : "text-gray-300 hover:text-white hover:bg-[#393c43]/50"
                    }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                    <span>{item.title}</span>
                    <span className="ml-auto">
                      {expandedSections[item.title] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  {expandedSections[item.title] && item.children && (
                    <div className="ml-6 mt-1 space-y-1 border-l border-[#4f545c] pl-2">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href}
                          className={cn(
                            "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                            pathname === child.href
                              ? "text-white bg-[#5865f2]"
                              : "text-gray-400 hover:text-gray-300 hover:bg-[#393c43]/50",
                          )}
                        >
                          {child.title}
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
                      : "text-gray-300 hover:text-white hover:bg-[#393c43]/50",
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
