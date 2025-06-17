"use client"

import type React from "react"
import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStatus } from "@/contexts/status-context"
import { ShardDetailPanel } from "@/components/shard-detail-panel"
// Import the new component at the top
import { AdminUpdateIndicator } from "@/components/admin-update-indicator"

export default function AdminStatusPage() {
  // Update the destructuring to include our new functions
  const {
    services,
    setServices,
    statistics,
    setStatistics,
    incidents,
    setIncidents,
    updateStatistics,
    updateServices,
    updateIncidents,
  } = useStatus()
  const [successMessage, setSuccessMessage] = useState("")
  const [selectedService, setSelectedService] = useState<number | null>(null)
  // Add state for update indicator message
  const [updateIndicatorMessage, setUpdateIndicatorMessage] = useState("")

  // For editing a service
  const [serviceName, setServiceName] = useState("")
  const [serviceStatus, setServiceStatus] = useState<"operational" | "degraded" | "outage">("operational")
  const [serviceColor, setServiceColor] = useState("")
  const [serviceDescription, setServiceDescription] = useState("")
  const [serviceUptime, setServiceUptime] = useState("")

  // For incident management
  const [incidentTitle, setIncidentTitle] = useState("")
  const [incidentDescription, setIncidentDescription] = useState("")
  const [incidentStatus, setIncidentStatus] = useState("investigating")

  const handleSelectService = (id: number) => {
    const service = services.find((s) => s.id === id)
    if (service) {
      setSelectedService(id)
      setServiceName(service.name)
      setServiceStatus(service.status)
      setServiceColor(service.color)
      setServiceDescription(service.description)
      setServiceUptime(service.uptime)
    }
  }

  // Update the handleSaveService function to use our new updateServices function
  const handleSaveService = () => {
    if (selectedService) {
      const updatedServices = services.map((service) =>
        service.id === selectedService
          ? {
              ...service,
              name: serviceName,
              status: serviceStatus,
              color: serviceColor,
              description: serviceDescription,
              uptime: serviceUptime,
            }
          : service,
      )

      // Use the new updateServices function
      updateServices(updatedServices)

      setSuccessMessage("Service updated successfully!")
      setUpdateIndicatorMessage("Service status updated for all users")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  // Update the handleUpdateStatistics function to use our updateStatistics function
  const handleUpdateStatistics = (e: React.FormEvent) => {
    e.preventDefault()

    // Use the updateStatistics function to update the statistics
    updateStatistics({
      users: statistics.users,
      servers: statistics.servers,
      shards: statistics.shards,
      commands: statistics.commands,
      uptime: statistics.uptime,
    })

    setSuccessMessage("Statistics updated successfully!")
    setUpdateIndicatorMessage("Bot statistics updated for all users")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  // Update the handleCreateIncident function to use our new updateIncidents function
  const handleCreateIncident = () => {
    if (incidentTitle && incidentDescription) {
      const today = new Date()
      const formattedDate = `${today.toLocaleString("default", { month: "long" })} ${today.getDate()}, ${today.getFullYear()}`

      const newIncident = {
        id: Date.now(),
        date: formattedDate,
        title: incidentTitle,
        description: incidentDescription,
        resolved: incidentStatus === "resolved",
      }

      const updatedIncidents = [newIncident, ...incidents]

      // Use the new updateIncidents function
      updateIncidents(updatedIncidents)

      setIncidentTitle("")
      setIncidentDescription("")
      setIncidentStatus("investigating")
      setSuccessMessage("Incident created successfully!")
      setUpdateIndicatorMessage("New incident published for all users")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  // Add the component at the end of the return statement, just before the closing div
  return (
    <div className="min-h-screen bg-[#1a1b26]">
      <AdminSidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Status Management</h1>

        {successMessage && (
          <div className="bg-green-500/20 border border-green-500 text-green-200 p-3 rounded-md text-sm mb-6">
            {successMessage}
          </div>
        )}

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="bg-[#252632] border-gray-700">
            <TabsTrigger value="services">Service Status</TabsTrigger>
            <TabsTrigger value="statistics">Bot Statistics</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-white">Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handleSelectService(service.id)}
                        className={`p-2 rounded-md cursor-pointer ${
                          selectedService === service.id ? "bg-[#9d7cff] text-white" : "text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full bg-${service.color}-500 mr-2`} />
                          <span>{service.name}</span>
                        </div>
                        <div className="text-xs mt-1 opacity-70">Status: {service.status}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-3">
                <CardHeader>
                  <CardTitle className="text-white">Edit Service</CardTitle>
                  <CardDescription className="text-gray-300">
                    Update the status and details of the selected service
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedService ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">
                          Service Name
                        </Label>
                        <Input
                          id="name"
                          value={serviceName}
                          onChange={(e) => setServiceName(e.target.value)}
                          className="bg-[#1a1b26] border-gray-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status" className="text-gray-300">
                          Status
                        </Label>
                        <Select
                          value={serviceStatus}
                          onValueChange={(value: "operational" | "degraded" | "outage") => setServiceStatus(value)}
                        >
                          <SelectTrigger className="bg-[#1a1b26] border-gray-700 text-white">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#252632] border-gray-700">
                            <SelectItem value="operational" className="text-white">
                              Operational
                            </SelectItem>
                            <SelectItem value="degraded" className="text-white">
                              Degraded Performance
                            </SelectItem>
                            <SelectItem value="outage" className="text-white">
                              Major Outage
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-gray-300">
                          Description
                        </Label>
                        <Input
                          id="description"
                          value={serviceDescription}
                          onChange={(e) => setServiceDescription(e.target.value)}
                          className="bg-[#1a1b26] border-gray-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="uptime" className="text-gray-300">
                          Uptime Percentage
                        </Label>
                        <Input
                          id="uptime"
                          value={serviceUptime}
                          onChange={(e) => setServiceUptime(e.target.value)}
                          className="bg-[#1a1b26] border-gray-700 text-white"
                        />
                      </div>

                      <Button
                        onClick={handleSaveService}
                        className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff]"
                      >
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <p className="text-gray-300">Select a service to edit</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="statistics">
            <Card className="bg-[#252632]/80 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Bot Statistics</CardTitle>
                <CardDescription className="text-gray-300">Update the key metrics for your bot</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateStatistics} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="users" className="text-gray-300">
                        Total Users
                      </Label>
                      <Input
                        id="users"
                        value={statistics.users}
                        onChange={(e) => setStatistics({ ...statistics, users: e.target.value })}
                        className="bg-[#1a1b26] border-gray-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="servers" className="text-gray-300">
                        Total Servers
                      </Label>
                      <Input
                        id="servers"
                        value={statistics.servers}
                        onChange={(e) => setStatistics({ ...statistics, servers: e.target.value })}
                        className="bg-[#1a1b26] border-gray-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shards" className="text-gray-300">
                        Total Shards
                      </Label>
                      <Input
                        id="shards"
                        type="number"
                        value={statistics.shards}
                        onChange={(e) => setStatistics({ ...statistics, shards: Number.parseInt(e.target.value) || 0 })}
                        className="bg-[#1a1b26] border-gray-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="commands" className="text-gray-300">
                        Total Commands
                      </Label>
                      <Input
                        id="commands"
                        value={statistics.commands}
                        onChange={(e) => setStatistics({ ...statistics, commands: e.target.value })}
                        className="bg-[#1a1b26] border-gray-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="uptime" className="text-gray-300">
                        Current Uptime
                      </Label>
                      <Input
                        id="uptime"
                        value={statistics.uptime}
                        onChange={(e) => setStatistics({ ...statistics, uptime: e.target.value })}
                        className="bg-[#1a1b26] border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff]"
                  >
                    Update Statistics
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-6">
              <ShardDetailPanel />
            </div>
          </TabsContent>

          <TabsContent value="incidents">
            <Card className="bg-[#252632]/80 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Incident Management</CardTitle>
                <CardDescription className="text-gray-300">Create and manage incident reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-300">
                      Incident Title
                    </Label>
                    <Input
                      id="title"
                      value={incidentTitle}
                      onChange={(e) => setIncidentTitle(e.target.value)}
                      placeholder="e.g., Brief Service Disruption"
                      className="bg-[#1a1b26] border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">
                      Description
                    </Label>
                    <Input
                      id="description"
                      value={incidentDescription}
                      onChange={(e) => setIncidentDescription(e.target.value)}
                      placeholder="Describe what happened and which services were affected"
                      className="bg-[#1a1b26] border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-gray-300">
                      Status
                    </Label>
                    <Select value={incidentStatus} onValueChange={setIncidentStatus}>
                      <SelectTrigger className="bg-[#1a1b26] border-gray-700 text-white">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#252632] border-gray-700">
                        <SelectItem value="investigating" className="text-white">
                          Investigating
                        </SelectItem>
                        <SelectItem value="identified" className="text-white">
                          Identified
                        </SelectItem>
                        <SelectItem value="monitoring" className="text-white">
                          Monitoring
                        </SelectItem>
                        <SelectItem value="resolved" className="text-white">
                          Resolved
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleCreateIncident}
                    className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff]"
                  >
                    Create Incident
                  </Button>

                  {incidents.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-white font-medium mb-4">Recent Incidents</h3>
                      <div className="space-y-4">
                        {incidents.map((incident) => (
                          <div key={incident.id} className="border-l-4 border-gray-700 pl-4 py-2">
                            <div className="flex justify-between">
                              <h4 className="text-white">{incident.title}</h4>
                              <span className="text-gray-400 text-sm">{incident.date}</span>
                            </div>
                            <p className="text-gray-300 text-sm mt-1">{incident.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {/* Add this at the end */}
        <AdminUpdateIndicator message={updateIndicatorMessage} />
      </div>
    </div>
  )
}
