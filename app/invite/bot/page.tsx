"use client"

import { useEffect } from "react"

export default function BotInvitePage() {
  const botInviteUrl =
    "https://discord.com/oauth2/authorize?client_id=1286376669770420304&scope=bot&permissions=545426763518"

  // Auto-redirect after 1 second
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = botInviteUrl
    }, 1000)

    return () => clearTimeout(redirectTimer)
  }, [])

  // Simple loading text in case the redirect takes longer
  return (
    <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center">
      <p className="text-white text-opacity-50">Redirecting to Discord...</p>
    </div>
  )
}
