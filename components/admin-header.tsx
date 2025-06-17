"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Bell, Settings, LogOut, Menu, X, ChevronDown, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface BotInfo {
  id: string
  username: string
  avatar: string | null
  discriminator: string
}

interface AdminHeaderProps {
  isLoggedIn?: boolean
  botInfo?: BotInfo | null
  onLogout?: () => void
}

export function AdminHeader({ isLoggedIn = false, botInfo = null, onLogout }: AdminHeaderProps) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getAvatarUrl = (user: BotInfo) => {
    if (!user.avatar) return null
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1E1F22] border-b border-[#3F4147] h-16">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2 text-[#B9BBBE] hover:text-white hover:bg-[#3F4147]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Link href="/admin/new-dashboard" className="flex items-center gap-2">
            <div className="bg-[#5865F2] w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-white font-bold hidden md:block">Sterix Admin</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#B9BBBE]" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-[#202225] border-0 text-[#DCDDDE] placeholder:text-[#72767D] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="text-[#B9BBBE] hover:text-white hover:bg-[#3F4147]">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-[#B9BBBE] hover:text-white hover:bg-[#3F4147]"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#5865F2] flex items-center justify-center">
                      {botInfo?.avatar ? (
                        <Image
                          src={getAvatarUrl(botInfo) || "/placeholder.svg?height=32&width=32"}
                          alt={botInfo.username}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold">{botInfo?.username?.charAt(0) || "B"}</span>
                      )}
                    </div>
                    <span className="hidden md:block max-w-[100px] truncate">{botInfo?.username || "Bot"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE]">
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer hover:bg-[#232428] hover:text-white"
                    onClick={() => router.push("/admin/new-dashboard/settings")}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#3F4147]" />
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer text-[#ED4245] hover:bg-[#ED4245]/10 hover:text-[#ED4245]"
                    onClick={onLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
              onClick={() => router.push("/admin/new-dashboard")}
            >
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#2B2D31] border-b border-[#3F4147] p-4">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#B9BBBE]" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-[#202225] border-0 text-[#DCDDDE] placeholder:text-[#72767D] focus-visible:ring-1 focus-visible:ring-[#5865F2]"
              />
            </div>
          </div>
          <nav className="space-y-2">
            <Link
              href="/admin/new-dashboard"
              className="block px-3 py-2 rounded-md text-[#DCDDDE] hover:bg-[#3F4147] hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/new-dashboard/servers"
              className="block px-3 py-2 rounded-md text-[#DCDDDE] hover:bg-[#3F4147] hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Servers
            </Link>
            <Link
              href="/admin/new-dashboard/commands"
              className="block px-3 py-2 rounded-md text-[#DCDDDE] hover:bg-[#3F4147] hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Commands
            </Link>
            <Link
              href="/admin/new-dashboard/settings"
              className="block px-3 py-2 rounded-md text-[#DCDDDE] hover:bg-[#3F4147] hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Settings
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
