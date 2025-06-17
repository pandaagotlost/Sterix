"use client"

import { useState, useEffect } from "react"
import { RefreshCw, Search, Filter, Download, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LogEntry {
  id: string
  timestamp: string
  level: "info" | "warning" | "error" | "debug"
  source: string
  message: string
  details?: string
  serverId?: string
  serverName?: string
}

export default function LogsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null)

  // Mock log data
  const mockLogs: LogEntry[] = [
    {
      id: "1",
      timestamp: "2023-06-15T14:32:45Z",
      level: "info",
      source: "system",
      message: "Bot started successfully",
      details: "Bot initialized with 3 shards. Connected to 120 servers.",
    },
    {
      id: "2",
      timestamp: "2023-06-15T14:35:12Z",
      level: "info",
      source: "command",
      message: "Command executed: !help",
      details:
        "User: JohnDoe#1234 (123456789012345678)\nServer: Cool Server (987654321098765432)\nChannel: general (876543210987654321)",
      serverId: "987654321098765432",
      serverName: "Cool Server",
    },
    {
      id: "3",
      timestamp: "2023-06-15T14:40:23Z",
      level: "warning",
      source: "moderation",
      message: "Message deleted by AutoMod",
      details:
        "User: ToxicUser#5678 (234567890123456789)\nServer: Gaming Community (876543210987654321)\nReason: Contained banned words",
      serverId: "876543210987654321",
      serverName: "Gaming Community",
    },
    {
      id: "4",
      timestamp: "2023-06-15T14:45:56Z",
      level: "error",
      source: "api",
      message: "Discord API error: 429 Too Many Requests",
      details: "Rate limit exceeded for endpoint: /channels/123456789012345678/messages\nRetry after: 5.2 seconds",
    },
    {
      id: "5",
      timestamp: "2023-06-15T14:50:34Z",
      level: "debug",
      source: "database",
      message: "Database query executed",
      details: "Query: SELECT * FROM users WHERE guild_id = $1\nParameters: 987654321098765432\nExecution time: 15ms",
    },
    {
      id: "6",
      timestamp: "2023-06-15T14:55:12Z",
      level: "info",
      source: "event",
      message: "New member joined",
      details: "User: NewUser#9012 (345678901234567890)\nServer: Awesome Community (765432109876543210)",
      serverId: "765432109876543210",
      serverName: "Awesome Community",
    },
    {
      id: "7",
      timestamp: "2023-06-15T15:00:45Z",
      level: "error",
      source: "command",
      message: "Command execution failed: !ban",
      details:
        "User: Admin#3456 (456789012345678901)\nServer: Moderation Server (654321098765432109)\nError: Missing permissions (BAN_MEMBERS)",
      serverId: "654321098765432109",
      serverName: "Moderation Server",
    },
    {
      id: "8",
      timestamp: "2023-06-15T15:05:23Z",
      level: "warning",
      source: "system",
      message: "High memory usage detected",
      details: "Memory usage: 85%\nRecommended action: Consider restarting the bot if this persists.",
    },
    {
      id: "9",
      timestamp: "2023-06-15T15:10:56Z",
      level: "info",
      source: "moderation",
      message: "User warned",
      details:
        "Moderator: Admin#3456 (456789012345678901)\nUser: Troublemaker#7890 (567890123456789012)\nServer: Rules & Guidelines (543210987654321098)\nReason: Spamming in #general",
      serverId: "543210987654321098",
      serverName: "Rules & Guidelines",
    },
    {
      id: "10",
      timestamp: "2023-06-15T15:15:34Z",
      level: "debug",
      source: "api",
      message: "API request completed",
      details: "Endpoint: /guilds/432109876543210987/members\nStatus: 200 OK\nResponse time: 120ms",
    },
  ]

  useEffect(() => {
    // Simulate loading logs from API
    const timer = setTimeout(() => {
      setLogs(mockLogs)
      setFilteredLogs(mockLogs)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Apply filters and search
    let filtered = logs

    // Apply level filter
    if (levelFilter !== "all") {
      filtered = filtered.filter((log) => log.level === levelFilter)
    }

    // Apply source filter
    if (sourceFilter !== "all") {
      filtered = filtered.filter((log) => log.source === sourceFilter)
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (log) =>
          log.message.toLowerCase().includes(query) ||
          (log.details && log.details.toLowerCase().includes(query)) ||
          (log.serverName && log.serverName.toLowerCase().includes(query)),
      )
    }

    setFilteredLogs(filtered)
  }, [logs, levelFilter, sourceFilter, searchQuery])

  const handleRefresh = () => {
    setIsLoading(true)

    // Simulate refreshing logs
    setTimeout(() => {
      // In a real app, this would fetch fresh logs from the API
      setIsLoading(false)
    }, 1000)
  }

  const handleDownload = () => {
    // Create a JSON blob of the logs
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    // Create a download link and trigger it
    const a = document.createElement("a")
    a.href = url
    a.download = `bot-logs-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "debug":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "info":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Info
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Warning
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Error
          </Badge>
        )
      case "debug":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Debug
          </Badge>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading logs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Bot Logs</h1>
        <p className="text-muted-foreground">View and analyze your bot's activity logs.</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-1 items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>

        <div className="flex gap-2">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Log Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="debug">Debug</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="command">Commands</SelectItem>
              <SelectItem value="moderation">Moderation</SelectItem>
              <SelectItem value="api">API</SelectItem>
              <SelectItem value="database">Database</SelectItem>
              <SelectItem value="event">Events</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Log Entries</CardTitle>
              <CardDescription>
                {filteredLogs.length} entries found
                {levelFilter !== "all" && ` • Filtered by: ${levelFilter}`}
                {sourceFilter !== "all" && ` • Source: ${sourceFilter}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-2">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <div
                        key={log.id}
                        className={`cursor-pointer rounded-md border p-3 transition-colors hover:bg-accent/50 ${selectedLog?.id === log.id ? "border-primary bg-accent/50" : ""}`}
                        onClick={() => setSelectedLog(log)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getLevelIcon(log.level)}
                            <span className="font-medium">{log.message}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {log.serverName && (
                              <Badge variant="outline" className="text-xs">
                                {log.serverName}
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {log.source}
                            </Badge>
                            {getLevelBadge(log.level)}
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">{formatTimestamp(log.timestamp)}</div>
                      </div>
                    ))
                  ) : (
                    <div className="flex h-40 items-center justify-center">
                      <p className="text-muted-foreground">No logs found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Log Details</CardTitle>
              <CardDescription>
                {selectedLog ? `${formatTimestamp(selectedLog.timestamp)}` : "Select a log to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedLog ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Message</h3>
                    <p>{selectedLog.message}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div>
                      <h3 className="text-sm font-semibold">Level</h3>
                      <div className="mt-1">{getLevelBadge(selectedLog.level)}</div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold">Source</h3>
                      <Badge variant="outline" className="mt-1">
                        {selectedLog.source}
                      </Badge>
                    </div>

                    {selectedLog.serverName && (
                      <div>
                        <h3 className="text-sm font-semibold">Server</h3>
                        <Badge variant="outline" className="mt-1">
                          {selectedLog.serverName}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {selectedLog.details && (
                    <div>
                      <h3 className="font-semibold">Details</h3>
                      <pre className="mt-1 whitespace-pre-wrap rounded-md bg-muted p-2 text-xs">
                        {selectedLog.details}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-[400px] items-center justify-center">
                  <p className="text-muted-foreground">Select a log entry to view its details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
