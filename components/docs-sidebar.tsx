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
  Zap,
} from "lucide-react"
import { useState } from "react"

// Define the sidebar structure with nested items
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

export function DocsSidebar() {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Core Features": true,
    Moderation: false,
    "Server Management": false,
    Utility: false,
    "Setup Guide": false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="hidden lg:block w-64 shrink-0 border-r border-[#2f3136] h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto bg-[#2b2d31]">
      <div className="py-6 px-4">
        <Link href="/docs" className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="font-bold text-xl text-white">Sterix Docs</span>
        </Link>

        <nav className="space-y-1">
          {sidebarItems.map((item, index) => (
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
                  {expandedSections[item.title] && (
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
