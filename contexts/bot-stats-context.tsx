"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

type BotStats = {
  servers: string
  users: string
  commands: string
  uptime: string
  supportServer: string
  lastUpdated: string
}

type BotStatsContextType = {
  stats: BotStats
  updateStats: (newStats: Partial<BotStats>) => void
  isLoading: boolean
}

// Default values as requested
const initialStats: BotStats = {
  servers: "1k+",
  users: "500K+",
  commands: "450+",
  uptime: "99.97%",
  supportServer: "https://discord.gg/E5j3WvtdxS",
  lastUpdated: new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
}

const BotStatsContext = createContext<BotStatsContextType | undefined>(undefined)

export function BotStatsProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<BotStats>(initialStats)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load stats from localStorage on initial render
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem("sterix_bot_stats")
      if (savedStats) {
        const parsedStats: BotStats = JSON.parse(savedStats)
        setStats(parsedStats)
      }
      setIsInitialized(true)
    } catch (error) {
      console.error("Error loading bot stats from localStorage:", error)
      setIsInitialized(true)
    }
  }, [])

  // Save to localStorage when stats change
  useEffect(() => {
    if (!isInitialized) return

    try {
      localStorage.setItem("sterix_bot_stats", JSON.stringify(stats))
    } catch (error) {
      console.error("Error saving bot stats to localStorage:", error)
    }
  }, [stats, isInitialized])

  // Use useCallback to memoize the handler function
  const handleStorageChange = useCallback((event: StorageEvent) => {
    if (event.key === "sterix_bot_stats" && event.newValue) {
      try {
        const parsedStats: BotStats = JSON.parse(event.newValue)
        setStats(parsedStats)
      } catch (error) {
        console.error("Error parsing bot stats from storage event:", error)
      }
    }
  }, [])

  // Listen for storage events from other tabs
  useEffect(() => {
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [handleStorageChange])

  const updateStats = (newStats: Partial<BotStats>) => {
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const updatedStats = {
        ...stats,
        ...newStats,
        lastUpdated: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      }

      setStats(updatedStats)
      setIsLoading(false)

      // Broadcast the update to other tabs/windows
      try {
        localStorage.setItem("sterix_bot_stats", JSON.stringify(updatedStats))

        // Use a different key for the event to avoid potential loops
        localStorage.setItem("sterix_stats_updated", Date.now().toString())
      } catch (error) {
        console.error("Error broadcasting stats update:", error)
      }
    }, 500)
  }

  return <BotStatsContext.Provider value={{ stats, updateStats, isLoading }}>{children}</BotStatsContext.Provider>
}

export function useBotStats() {
  const context = useContext(BotStatsContext)
  if (context === undefined) {
    throw new Error("useBotStats must be used within a BotStatsProvider")
  }
  return context
}
