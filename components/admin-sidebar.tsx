"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Bot,
  Globe,
  TrendingUp,
  BookOpen,
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin/dashboard",
    },
    {
      title: "AdminBot",
      icon: <Bot className="h-5 w-5" />,
      href: "/admin/new-dashboard",
    },
    {
      title: "Website Management",
      icon: <Globe className="h-5 w-5" />,
      href: "/admin",
    },
    {
      title: "Bot Statistics",
      icon: <TrendingUp className="h-5 w-5" />,
      href: "/admin/bot-stats",
    },
    {
      title: "Documentation Editor",
      icon: <BookOpen className="h-5 w-5" />,
      href: "/admin/docs-editor",
    },
    {
      title: "User Management",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/users",
    },
    {
      title: "Status Management",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/admin/status",
    },
    {
      title: "Feedback",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/admin/feedback",
    },
    {
      title: "Support Chat",
      icon: <HelpCircle className="h-5 w-5" />,
      href: "/admin/chat",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
    },
  ]

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#252632]/80 border-r border-gray-700 hidden md:block z-40">
      <div className="py-6 px-3 h-full overflow-y-auto">
        <Link href="/admin" className="flex items-center gap-2 mb-8 px-4">
          <div className="w-8 h-8 rounded-full bg-[#9d7cff] flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="font-bold text-xl text-white">Admin Panel</span>
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive(item.href) ? "bg-[#9d7cff] text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 px-4">
          <div className="bg-[#1a1b26] p-4 rounded-md">
            <h4 className="text-white font-medium mb-2">Quick Actions</h4>
            <div className="space-y-2">
              <Link href="/docs" className="block text-sm text-gray-400 hover:text-white transition-colors">
                View Live Docs →
              </Link>
              <Link href="/" className="block text-sm text-gray-400 hover:text-white transition-colors">
                View Website →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
