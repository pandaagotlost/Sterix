"use client"

import { useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStatus } from "@/contexts/status-context"
import { UpdateNotification } from "@/components/update-notification"

export default function StatusPage() {
  const { services, statistics, incidents, checkForUpdates } = useStatus()

  // Update the useEffect for checking updates to be more frequent
  useEffect(() => {
    const interval = setInterval(() => {
      checkForUpdates()
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [checkForUpdates])

  // Also check for updates when the page is focused
  useEffect(() => {
    const handleFocus = () => {
      checkForUpdates()
    }

    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [checkForUpdates])

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#1a1b26] pt-16">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-white mb-4">Sterix Status</h1>
              <p className="text-lg text-gray-300">Current operational status of all Sterix services</p>
            </div>

            <div className="mb-12">
              <Card className="bg-[#252632]/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-[#1a1b26] rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full bg-${service.color}-500 mr-3`} />
                          <div>
                            <h3 className="text-white font-medium">{service.name}</h3>
                            <p className="text-gray-400 text-sm">{service.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-gray-300 text-sm">Uptime: {service.uptime}</p>
                          <Badge
                            className={
                              service.status === "operational"
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/50"
                                : service.status === "degraded"
                                  ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/50"
                                  : "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/50"
                            }
                          >
                            {service.status === "operational"
                              ? "Operational"
                              : service.status === "degraded"
                                ? "Degraded"
                                : "Outage"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
              <Card className="bg-[#252632]/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-xl md:text-2xl">Bot Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <dt className="text-gray-400">Total Users</dt>
                      <dd className="text-white font-medium">{statistics.users}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <dt className="text-gray-400">Servers</dt>
                      <dd className="text-white font-medium">{statistics.servers}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <dt className="text-gray-400">Shards</dt>
                      <dd className="text-white font-medium">{statistics.shards}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <dt className="text-gray-400">Commands</dt>
                      <dd className="text-white font-medium">{statistics.commands}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <dt className="text-gray-400">Uptime</dt>
                      <dd className="text-white font-medium">{statistics.uptime}</dd>
                    </div>
                    <div className="flex justify-between py-2">
                      <dt className="text-gray-400">Last Updated</dt>
                      <dd className="text-white font-medium">{statistics.lastUpdated}</dd>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#252632]/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-xl md:text-2xl">Shards Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: Math.min(statistics.shards, 32) }, (_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center bg-green-500 text-white font-medium rounded-md p-2 text-xs md:text-sm"
                      >
                        {i}
                      </div>
                    ))}
                    {statistics.shards > 32 && (
                      <div className="flex items-center justify-center bg-gray-700 text-white font-medium rounded-md p-2 text-xs md:text-sm">
                        +{statistics.shards - 32}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mt-4">All shards are currently online and operational.</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-[#252632]/80 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Recent Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                {incidents.length > 0 ? (
                  <div className="space-y-6">
                    {incidents.map((incident, index) => (
                      <div key={index} className="border-l-4 border-gray-700 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-white font-medium">{incident.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">{incident.date}</span>
                            {incident.resolved && (
                              <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/50">
                                Resolved
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-300">{incident.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-300">No incidents reported in the last 90 days.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <UpdateNotification />
    </>
  )
}
