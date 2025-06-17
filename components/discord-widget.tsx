"use client"

import { useState, useEffect } from "react"

interface DiscordWidgetProps {
  serverId: string
  theme?: "dark" | "light"
  width?: string
  height?: string
  className?: string
}

export function DiscordWidget({
  serverId,
  theme = "dark",
  width = "100%",
  height = "500px",
  className = "",
}: DiscordWidgetProps) {
  const [mounted, setMounted] = useState(false)

  // Only render the iframe on the client to avoid SSR issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={`bg-[#36393f] rounded-md flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-white/70">Loading Discord widget...</div>
      </div>
    )
  }

  return (
    <div className={`rounded-md overflow-hidden ${className}`}>
      <iframe
        src={`https://discord.com/widget?id=${serverId}&theme=${theme}`}
        width={width}
        height={height}
        allowTransparency={true}
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        className="rounded-md"
      ></iframe>
    </div>
  )
}
