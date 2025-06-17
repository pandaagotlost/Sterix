"use client"

import { useState, useEffect } from "react"
import { CheckCircle } from "lucide-react"

interface AdminUpdateIndicatorProps {
  message: string
}

export function AdminUpdateIndicator({ message }: AdminUpdateIndicatorProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Show the indicator for 3 seconds
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [message])

  if (!visible || !message) return null

  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white p-3 rounded-lg shadow-lg z-50 max-w-sm animate-slide-up flex items-center gap-2">
      <CheckCircle size={18} />
      <p>{message}</p>
    </div>
  )
}
