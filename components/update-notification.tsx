"use client"

import { useState, useEffect } from "react"
import { useStatus } from "@/contexts/status-context"
import { X, RefreshCw } from "lucide-react"

export function UpdateNotification() {
  const [visible, setVisible] = useState(false)
  const [lastChecked, setLastChecked] = useState(Date.now())
  const { lastModified, checkForUpdates } = useStatus()

  // Check for updates when component mounts and periodically
  useEffect(() => {
    // Initial check
    if (lastModified > lastChecked) {
      setVisible(true)
      setLastChecked(Date.now())
    }

    // Set up periodic checks
    const interval = setInterval(() => {
      const hasUpdates = checkForUpdates()
      if (hasUpdates) {
        setVisible(true)
        setLastChecked(Date.now())
      }
    }, 10000) // Check every 10 seconds

    // Listen for storage events (changes from other tabs)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "sterix_status_update") {
        const updateTime = Number.parseInt(event.newValue || "0")
        if (updateTime > lastChecked) {
          setVisible(true)
          setLastChecked(updateTime)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      clearInterval(interval)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [lastModified, lastChecked, checkForUpdates])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 bg-violet-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm animate-slide-up">
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="font-bold mb-1">Status Updated</h3>
          <p className="text-sm">The status information has been updated. Refresh to see the latest changes.</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="ml-2 text-white hover:text-gray-200"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>
      <button
        onClick={() => {
          window.location.reload()
        }}
        className="mt-2 bg-white text-violet-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 flex items-center gap-1"
      >
        <RefreshCw size={14} />
        Refresh Now
      </button>
    </div>
  )
}
