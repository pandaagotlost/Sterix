"use client"

import { useStatus } from "@/contexts/status-context"
import { useEffect, useCallback, useState } from "react"

export function DynamicStatistics() {
  const { statistics, checkForUpdates } = useStatus()
  const [localStats, setLocalStats] = useState(statistics)

  // Use useCallback to memoize the handler function
  const handleStorageChange = useCallback(
    (event: StorageEvent) => {
      if (event.key === "sterix_status_update") {
        const wasUpdated = checkForUpdates()
        if (wasUpdated) {
          setLocalStats(statistics)
        }
      }
    },
    [checkForUpdates, statistics],
  )

  // Check for updates periodically and when component mounts
  useEffect(() => {
    // Initial check
    checkForUpdates()

    // Set up interval for periodic checks
    const intervalId = setInterval(() => {
      checkForUpdates()
    }, 5000) // Check more frequently (every 5 seconds)

    // Set up a listener for storage events
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === "sterix_status_update") {
        checkForUpdates()
      }
    }

    window.addEventListener("storage", handleStorageEvent)

    // Also check when the window regains focus
    const handleFocus = () => {
      checkForUpdates()
    }

    window.addEventListener("focus", handleFocus)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener("storage", handleStorageEvent)
      window.removeEventListener("focus", handleFocus)
    }
  }, [checkForUpdates]) // Only re-run if checkForUpdates changes

  // Update local state when statistics change
  useEffect(() => {
    setLocalStats(statistics)
  }, [statistics])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-8">
      <div className="bg-card rounded-lg p-4 text-center shadow-sm">
        <div className="text-3xl font-bold">{localStats.servers}</div>
        <div className="text-muted-foreground text-sm">Servers</div>
      </div>
      <div className="bg-card rounded-lg p-4 text-center shadow-sm">
        <div className="text-3xl font-bold">{localStats.shards}</div>
        <div className="text-muted-foreground text-sm">Shards</div>
      </div>
      <div className="bg-card rounded-lg p-4 text-center shadow-sm">
        <div className="text-3xl font-bold">{localStats.users}</div>
        <div className="text-muted-foreground text-sm">Users</div>
      </div>
      <div className="bg-card rounded-lg p-4 text-center shadow-sm">
        <div className="text-3xl font-bold">{localStats.commands}</div>
        <div className="text-muted-foreground text-sm">Commands</div>
      </div>
      <div className="col-span-2 md:col-span-4 bg-card rounded-lg p-4 text-center shadow-sm">
        <div className="text-sm text-muted-foreground">Last Updated: {localStats.lastUpdated}</div>
        <div className="text-sm text-muted-foreground">Uptime: {localStats.uptime}</div>
      </div>
    </div>
  )
}
