"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Download, Calendar, ArrowUp, ArrowDown, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface BotInfo {
  id: string
  username: string
  avatar: string | null
  discriminator: string
}

// Generate mock data for charts
const generateMockData = () => {
  // Daily data for the last 30 days
  const dailyData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))

    return {
      date: date.toISOString().split("T")[0],
      commands: Math.floor(Math.random() * 1000) + 500,
      users: Math.floor(Math.random() * 200) + 100,
      servers: Math.floor(Math.random() * 10) + i / 3 + 50,
    }
  })

  // Command usage data
  const commandUsageData = [
    { name: "play", value: 12543 },
    { name: "help", value: 8765 },
    { name: "ban", value: 4321 },
    { name: "kick", value: 3456 },
    { name: "mute", value: 5678 },
    { name: "unmute", value: 2345 },
    { name: "clear", value: 6789 },
    { name: "ping", value: 7890 },
  ]

  // Server growth data
  const serverGrowthData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date()
    month.setMonth(month.getMonth() - (11 - i))

    return {
      month: month.toLocaleString("default", { month: "short" }),
      servers: Math.floor(Math.random() * 20) + 40 + i * 2,
    }
  })

  // User activity by hour
  const userActivityData = Array.from({ length: 24 }, (_, i) => {
    return {
      hour: i,
      users: Math.floor(Math.random() * 500) + (i >= 8 && i <= 22 ? 500 : 100),
    }
  })

  return {
    dailyData,
    commandUsageData,
    serverGrowthData,
    userActivityData,
  }
}

export default function AnalyticsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [botInfo, setBotInfo] = useState<BotInfo | null>(null)
  const [timeRange, setTimeRange] = useState("30d")
  const [chartData, setChartData] = useState<any>(null)

  // Load token and fetch data on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("discord_bot_token")
    if (storedToken) {
      // In a real app, you would fetch analytics from your API
      // For now, we'll generate mock data
      setChartData(generateMockData())
      setIsLoggedIn(true)

      // Simulate fetching bot info
      setBotInfo({
        id: "123456789012345678",
        username: "Sterix Bot",
        avatar: null,
        discriminator: "0000",
      })
    }
    setIsLoading(false)
  }, [])

  const handleDownloadData = () => {
    try {
      // Create a JSON string of the analytics data
      const analyticsJson = JSON.stringify(chartData, null, 2)

      // Create a blob and download link
      const blob = new Blob([analyticsJson], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `bot-analytics-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Analytics Downloaded",
        description: "Analytics data has been downloaded as JSON.",
      })
    } catch (error) {
      console.error("Error downloading analytics:", error)
      toast({
        title: "Error",
        description: "Failed to download analytics. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Calculate percentage change for stats
  const calculateChange = (data: any[], key: string) => {
    if (!data || data.length < 2) return { value: 0, increasing: true }

    const current = data[data.length - 1][key]
    const previous = data[data.length - 15][key]

    const change = ((current - previous) / previous) * 100
    return {
      value: Math.abs(change).toFixed(1),
      increasing: change >= 0,
    }
  }

  // Get the latest values
  const getLatestValue = (data: any[], key: string) => {
    if (!data || data.length === 0) return 0
    return data[data.length - 1][key]
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#2B2D31] p-3 border border-[#3F4147] rounded-md shadow-lg">
          <p className="text-[#DCDDDE] font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Colors for charts
  const COLORS = ["#5865F2", "#ED4245", "#FEE75C", "#57F287", "#EB459E", "#9B59B6", "#3498DB", "#F1C40F"]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1E1F22] text-[#DCDDDE] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#5865F2] mx-auto mb-4" />
          <p className="text-white text-lg">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#1E1F22] text-[#DCDDDE] flex items-center justify-center">
        <Card className="max-w-md w-full bg-[#2B2D31] border-[#1E1F22]">
          <CardHeader>
            <CardTitle className="text-white">Bot Login Required</CardTitle>
            <CardDescription className="text-[#B9BBBE]">Please log in to your bot to view analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
              onClick={() => (window.location.href = "/admin/new-dashboard")}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1E1F22] text-[#DCDDDE]">
      <AdminHeader isLoggedIn={isLoggedIn} botInfo={botInfo} />
      <AdminSidebar />

      <main className="ml-64 p-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-[#B9BBBE] mt-1">View detailed bot usage statistics</p>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#B9BBBE]" />
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="bg-[#202225] border-0 text-[#DCDDDE] focus:ring-1 focus:ring-[#5865F2] w-32">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent className="bg-[#2B2D31] border-[#1E1F22] text-[#DCDDDE]">
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center gap-2"
              onClick={handleDownloadData}
            >
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>

        {chartData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-[#2B2D31] border-[#1E1F22]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#B9BBBE] text-sm font-medium">Commands Used</p>
                      <h3 className="text-white text-2xl font-bold mt-1">
                        {getLatestValue(chartData.dailyData, "commands").toLocaleString()}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    {calculateChange(chartData.dailyData, "commands").increasing ? (
                      <div className="flex items-center text-green-400">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span className="text-sm">{calculateChange(chartData.dailyData, "commands").value}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-400">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        <span className="text-sm">{calculateChange(chartData.dailyData, "commands").value}%</span>
                      </div>
                    )}
                    <span className="text-[#B9BBBE] text-sm ml-2">from previous period</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2B2D31] border-[#1E1F22]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#B9BBBE] text-sm font-medium">Active Users</p>
                      <h3 className="text-white text-2xl font-bold mt-1">
                        {getLatestValue(chartData.dailyData, "users").toLocaleString()}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    {calculateChange(chartData.dailyData, "users").increasing ? (
                      <div className="flex items-center text-green-400">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span className="text-sm">{calculateChange(chartData.dailyData, "users").value}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-400">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        <span className="text-sm">{calculateChange(chartData.dailyData, "users").value}%</span>
                      </div>
                    )}
                    <span className="text-[#B9BBBE] text-sm ml-2">from previous period</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2B2D31] border-[#1E1F22]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#B9BBBE] text-sm font-medium">Total Servers</p>
                      <h3 className="text-white text-2xl font-bold mt-1">
                        {getLatestValue(chartData.dailyData, "servers").toLocaleString()}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    {calculateChange(chartData.dailyData, "servers").increasing ? (
                      <div className="flex items-center text-green-400">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span className="text-sm">{calculateChange(chartData.dailyData, "servers").value}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-400">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        <span className="text-sm">{calculateChange(chartData.dailyData, "servers").value}%</span>
                      </div>
                    )}
                    <span className="text-[#B9BBBE] text-sm ml-2">from previous period</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-[#2B2D31] border border-[#1E1F22]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="commands">Commands</TabsTrigger>
                <TabsTrigger value="servers">Servers</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="bg-[#2B2D31] border-[#1E1F22] mb-6">
                  <CardHeader>
                    <CardTitle className="text-white">Daily Activity</CardTitle>
                    <CardDescription className="text-[#B9BBBE]">Commands, users, and servers over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData.dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#3F4147" />
                          <XAxis
                            dataKey="date"
                            stroke="#B9BBBE"
                            tickFormatter={(value) => {
                              const date = new Date(value)
                              return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            }}
                          />
                          <YAxis stroke="#B9BBBE" />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Line type="monotone" dataKey="commands" stroke="#5865F2" name="Commands" />
                          <Line type="monotone" dataKey="users" stroke="#57F287" name="Users" />
                          <Line type="monotone" dataKey="servers" stroke="#FEE75C" name="Servers" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-[#2B2D31] border-[#1E1F22]">
                    <CardHeader>
                      <CardTitle className="text-white">Top Commands</CardTitle>
                      <CardDescription className="text-[#B9BBBE]">Most frequently used commands</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={chartData.commandUsageData.slice(0, 5)}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#3F4147" />
                            <XAxis type="number" stroke="#B9BBBE" />
                            <YAxis
                              dataKey="name"
                              type="category"
                              stroke="#B9BBBE"
                              tickFormatter={(value) => `/${value}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" name="Usage Count">
                              {chartData.commandUsageData.slice(0, 5).map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#2B2D31] border-[#1E1F22]">
                    <CardHeader>
                      <CardTitle className="text-white">User Activity by Hour</CardTitle>
                      <CardDescription className="text-[#B9BBBE]">When users are most active</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={chartData.userActivityData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#3F4147" />
                            <XAxis dataKey="hour" stroke="#B9BBBE" tickFormatter={(value) => `${value}:00`} />
                            <YAxis stroke="#B9BBBE" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="users" name="Active Users" fill="#5865F2" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="commands">
                <Card className="bg-[#2B2D31] border-[#1E1F22]">
                  <CardHeader>
                    <CardTitle className="text-white">Command Usage</CardTitle>
                    <CardDescription className="text-[#B9BBBE]">Detailed breakdown of command usage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={chartData.commandUsageData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `/${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {chartData.commandUsageData.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <div>
                        <h3 className="text-white font-medium mb-4">Command Usage Ranking</h3>
                        <div className="space-y-3">
                          {chartData.commandUsageData.map((command: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></div>
                                <span className="text-[#DCDDDE] font-mono">/{command.name}</span>
                              </div>
                              <span className="text-white font-medium">{command.value.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="servers">
                <Card className="bg-[#2B2D31] border-[#1E1F22]">
                  <CardHeader>
                    <CardTitle className="text-white">Server Growth</CardTitle>
                    <CardDescription className="text-[#B9BBBE]">Server count over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={chartData.serverGrowthData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#3F4147" />
                          <XAxis dataKey="month" stroke="#B9BBBE" />
                          <YAxis stroke="#B9BBBE" />
                          <Tooltip content={<CustomTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="servers"
                            stroke="#5865F2"
                            name="Servers"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users">
                <Card className="bg-[#2B2D31] border-[#1E1F22]">
                  <CardHeader>
                    <CardTitle className="text-white">User Activity</CardTitle>
                    <CardDescription className="text-[#B9BBBE]">User engagement metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData.dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#3F4147" />
                          <XAxis
                            dataKey="date"
                            stroke="#B9BBBE"
                            tickFormatter={(value) => {
                              const date = new Date(value)
                              return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            }}
                          />
                          <YAxis stroke="#B9BBBE" />
                          <Tooltip content={<CustomTooltip />} />
                          <Line type="monotone" dataKey="users" stroke="#57F287" name="Active Users" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  )
}
