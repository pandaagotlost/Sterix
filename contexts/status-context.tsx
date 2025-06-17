"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define types for our status data
type Service = {
  id: number
  name: string
  status: "operational" | "degraded" | "outage"
  color: string
  description: string
  uptime: string
}

type Statistics = {
  users: string
  servers: string
  shards: number
  commands: string
  uptime: string
  lastUpdated: string
}

type Incident = {
  id: number
  date: string
  title: string
  description: string
  resolved: boolean
}

type StatusData = {
  services: Service[]
  statistics: Statistics
  incidents: Incident[]
  lastModified: number // Timestamp of last modification
}

type StatusContextType = {
  services: Service[]
  setServices: React.Dispatch<React.SetStateAction<Service[]>>
  statistics: Statistics
  setStatistics: React.Dispatch<React.SetStateAction<Statistics>>
  incidents: Incident[]
  setIncidents: React.Dispatch<React.SetStateAction<Incident[]>>
  lastModified: number
  checkForUpdates: () => boolean
  updateStatistics: (newStatistics: Partial<Statistics>) => void
  updateServices: (updatedServices: Service[]) => void
  updateIncidents: (updatedIncidents: Incident[]) => void
}

// Initial data
const initialServices: Service[] = [
  {
    id: 1,
    name: "Premium",
    status: "operational",
    color: "orange",
    description: "Premium bot features and services",
    uptime: "99.97%",
  },
  {
    id: 2,
    name: "Standard",
    status: "operational",
    color: "blue",
    description: "Standard bot commands and functionality",
    uptime: "99.99%",
  },
  {
    id: 3,
    name: "Website",
    status: "operational",
    color: "cyan",
    description: "Documentation and web services",
    uptime: "100%",
  },
]

const initialStatistics: Statistics = {
  users: "500,000+",
  servers: "1.1k+",
  shards: 100,
  commands: "450+",
  uptime: "99.97%",
  lastUpdated: "June 13, 2025",
}

const initialIncidents: Incident[] = [
  {
    id: 1,
    date: "March 12, 2025",
    title: "Brief Premium Service Disruption",
    description: "Premium services experienced a 5-minute outage due to server maintenance.",
    resolved: true,
  },
  {
    id: 2,
    date: "February 28, 2025",
    title: "Discord API Rate Limiting",
    description: "Standard services experienced slowdowns due to Discord API rate limiting.",
    resolved: true,
  },
  {
    id: 3,
    date: "June 12, 2025",
    title: "Hosting Issue",
    description: "Standard services was down due to Hosting Issues.",
    resolved: true,
  },
]

// Create context
const StatusContext = createContext<StatusContextType | undefined>(undefined)

export function StatusProvider({ children }: { children: React.ReactNode }) {
  // Load data from localStorage on initial render (client-side only)
  const [services, setServices] = useState<Service[]>(initialServices)
  const [statistics, setStatistics] = useState<Statistics>(initialStatistics)
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents)
  const [lastModified, setLastModified] = useState<number>(Date.now())
  const [isInitialized, setIsInitialized] = useState(false)

  // On initial load, try to get data from localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("sterix_status_data")
      if (savedData) {
        const parsedData: StatusData = JSON.parse(savedData)
        setServices(parsedData.services)
        setStatistics(parsedData.statistics)
        setIncidents(parsedData.incidents)
        setLastModified(parsedData.lastModified)
      }
      setIsInitialized(true)
    } catch (error) {
      console.error("Error loading status data from localStorage:", error)
      setIsInitialized(true)
    }
  }, [])

  // Save to localStorage when data changes
  useEffect(() => {
    if (!isInitialized) return

    try {
      const currentTime = Date.now()
      setLastModified(currentTime)

      const statusData: StatusData = {
        services,
        statistics,
        incidents,
        lastModified: currentTime,
      }

      // Save to localStorage with a timestamp
      localStorage.setItem("sterix_status_data", JSON.stringify(statusData))

      // Also save to sessionStorage as a broadcast mechanism
      // This helps simulate a "server update" that other tabs/users would see
      sessionStorage.setItem("sterix_status_update", currentTime.toString())
    } catch (error) {
      console.error("Error saving status data to localStorage:", error)
    }
  }, [services, statistics, incidents, isInitialized])

  // Add a new useEffect to listen for storage events
  // This simulates real-time updates across tabs/users
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "sterix_status_data" && event.newValue) {
        try {
          const parsedData: StatusData = JSON.parse(event.newValue)
          if (parsedData.lastModified > lastModified) {
            setServices(parsedData.services)
            setStatistics(parsedData.statistics)
            setIncidents(parsedData.incidents)
            setLastModified(parsedData.lastModified)
          }
        } catch (error) {
          console.error("Error parsing status data from storage event:", error)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [lastModified])

  // Replace the checkForUpdates function with this improved version
  // that only updates state when necessary

  // Function to check for updates (in a real app, this would poll a server)
  const checkForUpdates = () => {
    try {
      const savedData = localStorage.getItem("sterix_status_data")
      if (savedData) {
        const parsedData: StatusData = JSON.parse(savedData)
        if (parsedData.lastModified > lastModified) {
          setServices(parsedData.services)
          setStatistics(parsedData.statistics)
          setIncidents(parsedData.incidents)
          setLastModified(parsedData.lastModified)
          return true // Return true if there was an update
        }
      }
      return false // Return false if there was no update
    } catch (error) {
      console.error("Error checking for updates:", error)
      return false
    }
  }

  // Function to update statistics and broadcast changes to all users
  const updateStatistics = (newStatistics: Partial<Statistics>) => {
    // Create a new statistics object with the updated values
    const updatedStats = {
      ...statistics,
      ...newStatistics,
      // Always update the lastUpdated field with current date
      lastUpdated: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    }

    // Update the state
    setStatistics(updatedStats)

    // Save to localStorage immediately to ensure consistency
    try {
      const statusData: StatusData = {
        services,
        statistics: updatedStats,
        incidents,
        lastModified: Date.now(),
      }

      // Save to localStorage with a timestamp
      localStorage.setItem("sterix_status_data", JSON.stringify(statusData))

      // Also save to sessionStorage as a broadcast mechanism
      const updateTime = Date.now()
      sessionStorage.setItem("sterix_status_update", updateTime.toString())

      // Force a broadcast event to other tabs/windows
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "sterix_status_update",
          newValue: updateTime.toString(),
        }),
      )
    } catch (error) {
      console.error("Error saving status data:", error)
    }
  }

  // Add a similar function for updating services
  const updateServices = (updatedServices: Service[]) => {
    // Update the state
    setServices(updatedServices)

    // Save to localStorage immediately to ensure consistency
    try {
      const statusData: StatusData = {
        services: updatedServices,
        statistics,
        incidents,
        lastModified: Date.now(),
      }

      // Save to localStorage with a timestamp
      localStorage.setItem("sterix_status_data", JSON.stringify(statusData))

      // Also save to sessionStorage as a broadcast mechanism
      const updateTime = Date.now()
      sessionStorage.setItem("sterix_status_update", updateTime.toString())

      // Force a broadcast event to other tabs/windows
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "sterix_status_update",
          newValue: updateTime.toString(),
        }),
      )
    } catch (error) {
      console.error("Error saving status data:", error)
    }
  }

  // Add a similar function for updating incidents
  const updateIncidents = (updatedIncidents: Incident[]) => {
    // Update the state
    setIncidents(updatedIncidents)

    // Save to localStorage immediately to ensure consistency
    try {
      const statusData: StatusData = {
        services,
        statistics,
        incidents: updatedIncidents,
        lastModified: Date.now(),
      }

      // Save to localStorage with a timestamp
      localStorage.setItem("sterix_status_data", JSON.stringify(statusData))

      // Also save to sessionStorage as a broadcast mechanism
      const updateTime = Date.now()
      sessionStorage.setItem("sterix_status_update", updateTime.toString())

      // Force a broadcast event to other tabs/windows
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "sterix_status_update",
          newValue: updateTime.toString(),
        }),
      )
    } catch (error) {
      console.error("Error saving status data:", error)
    }
  }

  // Update the return value to include the new functions
  return (
    <StatusContext.Provider
      value={{
        services,
        setServices,
        statistics,
        setStatistics,
        incidents,
        setIncidents,
        lastModified,
        checkForUpdates,
        updateStatistics,
        updateServices,
        updateIncidents,
      }}
    >
      {children}
    </StatusContext.Provider>
  )
}

// Custom hook to use the status context
export function useStatus() {
  const context = useContext(StatusContext)
  if (context === undefined) {
    throw new Error("useStatus must be used within a StatusProvider")
  }
  return context
}
