"use client"

import { useStatus } from "@/contexts/status-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useCallback, useState } from "react"
import { Users, Server, Command, Clock } from "lucide-react"

export function AdminStatistics() {
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

    // Set up interval for periodic checks (more frequent for admins)
    const intervalId = setInterval(() => {
      checkForUpdates()
    }, 5000) // Check every 5 seconds for admins

    // Set up a listener for storage events
    window.addEventListener("storage", handleStorageChange)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [handleStorageChange]) // Only re-run if handleStorageChange changes

  // Update local state when statistics change
  useEffect(() => {
    setLocalStats(statistics)
  }, [statistics])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{localStats.users}</div>
          <p className="text-xs text-muted-foreground">Active Discord users</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Servers</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{localStats.servers}</div>
          <p className="text-xs text-muted-foreground">Discord servers using Sterix</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Shards</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 16h6v6h-6z" />
            <path d="M2 16h6v6H2z" />
            <path d="M9 2h6v6H9z" />
            <path d="M3 10h18" />
            <path d="M10 3v18" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{localStats.shards}</div>
          <p className="text-xs text-muted-foreground">Active bot shards</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Commands</CardTitle>
          <Command className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{localStats.commands}</div>
          <p className="text-xs text-muted-foreground">Available bot commands</p>
        </CardContent>
      </Card>
      <Card className="col-span-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">System Status</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium">Uptime</p>
              <p className="text-xs text-muted-foreground">{localStats.uptime}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Last Updated</p>
              <p className="text-xs text-muted-foreground">{localStats.lastUpdated}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
