"use client"

import { useEffect } from "react"

export default function ServerInvitePage() {
  const serverInviteUrl = "https://discord.gg/Ra6r3XPrh9"

  // Auto-redirect after 1 second
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = serverInviteUrl
    }, 1000)

    return () => clearTimeout(redirectTimer)
  }, [])

  // Simple loading text in case the redirect takes longer
  return (
    <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center">
      <p className="text-white text-opacity-50">Redirecting to Discord server...</p>
    </div>
  )
}
