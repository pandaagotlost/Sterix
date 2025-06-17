"use client"

import { useEffect } from "react"
import { DiscordWidget } from "@/components/discord-widget"

export default function SupportPage() {
  const serverInviteUrl = "https://discord.gg/E5j3WvtdxS"
  const serverId = "1348317122484244610"

  // Auto-redirect after 3 seconds if user doesn't interact
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = serverInviteUrl
    }, 3000)

    return () => clearTimeout(redirectTimer)
  }, [])

  return (
    <div className="min-h-screen bg-[#1a1b26] flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Sterix HeadQuarter</h1>
      <p className="text-white text-opacity-80 mb-8 text-center max-w-md">
        Join our official Discord server for support, updates, and to connect with the community. You'll be redirected
        automatically in a few seconds.
      </p>

      <div className="w-full max-w-md mb-8">
        <DiscordWidget serverId={serverId} theme="dark" height="500px" className="shadow-lg border border-[#202225]" />
      </div>

      <a
        href={serverInviteUrl}
        className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium px-6 py-3 rounded-md transition-colors"
      >
        Join Now
      </a>
    </div>
  )
}
