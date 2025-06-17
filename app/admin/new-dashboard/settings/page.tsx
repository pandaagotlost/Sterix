"use client"

import { useState, useEffect } from "react"
import { Save, X, AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function BotSettings() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [botToken, setBotToken] = useState("")
  const [botStatus, setBotStatus] = useState("online")
  const [botActivity, setBotActivity] = useState("playing")
  const [botActivityText, setBotActivityText] = useState("with Discord")
  const [botPrefix, setBotPrefix] = useState("!")
  const [debugMode, setDebugMode] = useState(false)
  const [autoModEnabled, setAutoModEnabled] = useState(true)
  const [loggingEnabled, setLoggingEnabled] = useState(true)
  const [welcomeEnabled, setWelcomeEnabled] = useState(true)
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to the server, {user}!")
  const [leaveMessage, setLeaveMessage] = useState("{user} has left the server.")
  const [maxWarnings, setMaxWarnings] = useState(3)

  useEffect(() => {
    // Simulate loading bot settings
    const timer = setTimeout(() => {
      // This would normally be a fetch request to get the bot settings
      setBotToken(localStorage.getItem("discord_bot_token") || "")
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSaveSettings = async () => {
    setIsSaving(true)

    try {
      // Simulate API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Save token to localStorage (in a real app, this would be saved securely on the server)
      if (botToken) {
        localStorage.setItem("discord_bot_token", botToken)
      }

      toast({
        title: "Settings saved",
        description: "Your bot settings have been updated successfully.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleRestart = async () => {
    toast({
      title: "Bot restarting",
      description: "Your bot is now restarting. This may take a few moments.",
    })

    // Simulate restart
    await new Promise((resolve) => setTimeout(resolve, 3000))

    toast({
      title: "Bot restarted",
      description: "Your bot has been restarted successfully.",
    })
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Bot Settings</h1>
        <p className="text-muted-foreground">Configure your Discord bot's behavior and appearance.</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="welcome">Welcome Messages</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure the basic settings for your bot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="botToken" className="text-sm font-medium">
                  Bot Token
                </label>
                <div className="flex gap-2">
                  <Input
                    id="botToken"
                    type="password"
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                    placeholder="Enter your bot token"
                    className="font-mono"
                  />
                  <Button variant="outline" size="icon" onClick={() => setBotToken("")}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your bot token is stored securely and used to authenticate with Discord.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="botPrefix" className="text-sm font-medium">
                  Command Prefix
                </label>
                <Input
                  id="botPrefix"
                  value={botPrefix}
                  onChange={(e) => setBotPrefix(e.target.value)}
                  placeholder="!"
                  maxLength={5}
                  className="w-20"
                />
                <p className="text-xs text-muted-foreground">The character(s) that users type before commands.</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="debugMode" className="text-sm font-medium">
                    Debug Mode
                  </label>
                  <p className="text-xs text-muted-foreground">Enable detailed logging for troubleshooting.</p>
                </div>
                <Switch id="debugMode" checked={debugMode} onCheckedChange={setDebugMode} />
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Never share your bot token with anyone. It provides full access to your bot.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bot Appearance</CardTitle>
              <CardDescription>Configure how your bot appears in Discord.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="botStatus" className="text-sm font-medium">
                  Status
                </label>
                <Select value={botStatus} onValueChange={setBotStatus}>
                  <SelectTrigger id="botStatus" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Online</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="idle">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <span>Idle</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dnd">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span>Do Not Disturb</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="invisible">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                        <span>Invisible</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="botActivity" className="text-sm font-medium">
                  Activity Type
                </label>
                <Select value={botActivity} onValueChange={setBotActivity}>
                  <SelectTrigger id="botActivity" className="w-full">
                    <SelectValue placeholder="Select activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="playing">Playing</SelectItem>
                    <SelectItem value="streaming">Streaming</SelectItem>
                    <SelectItem value="listening">Listening to</SelectItem>
                    <SelectItem value="watching">Watching</SelectItem>
                    <SelectItem value="competing">Competing in</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="botActivityText" className="text-sm font-medium">
                  Activity Text
                </label>
                <Input
                  id="botActivityText"
                  value={botActivityText}
                  onChange={(e) => setBotActivityText(e.target.value)}
                  placeholder="with Discord"
                  maxLength={128}
                />
                <p className="text-xs text-muted-foreground">
                  Will display as: {botActivity.charAt(0).toUpperCase() + botActivity.slice(1)} {botActivityText}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Moderation Settings</CardTitle>
              <CardDescription>Configure how your bot moderates servers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="autoModEnabled" className="text-sm font-medium">
                    Auto Moderation
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Automatically moderate messages for inappropriate content.
                  </p>
                </div>
                <Switch id="autoModEnabled" checked={autoModEnabled} onCheckedChange={setAutoModEnabled} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="loggingEnabled" className="text-sm font-medium">
                    Moderation Logging
                  </label>
                  <p className="text-xs text-muted-foreground">Log all moderation actions to a channel.</p>
                </div>
                <Switch id="loggingEnabled" checked={loggingEnabled} onCheckedChange={setLoggingEnabled} />
              </div>

              <Separator />

              <div className="space-y-2">
                <label htmlFor="maxWarnings" className="text-sm font-medium">
                  Max Warnings Before Action
                </label>
                <Input
                  id="maxWarnings"
                  type="number"
                  value={maxWarnings}
                  onChange={(e) => setMaxWarnings(Number.parseInt(e.target.value) || 0)}
                  min={1}
                  max={10}
                  className="w-20"
                />
                <p className="text-xs text-muted-foreground">Number of warnings before automatic action is taken.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="welcome" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Messages</CardTitle>
              <CardDescription>Configure welcome and leave messages for your servers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="welcomeEnabled" className="text-sm font-medium">
                    Welcome Messages
                  </label>
                  <p className="text-xs text-muted-foreground">Send a message when a new user joins.</p>
                </div>
                <Switch id="welcomeEnabled" checked={welcomeEnabled} onCheckedChange={setWelcomeEnabled} />
              </div>

              <div className="space-y-2">
                <label htmlFor="welcomeMessage" className="text-sm font-medium">
                  Welcome Message
                </label>
                <Textarea
                  id="welcomeMessage"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  placeholder="Welcome to the server, {user}!"
                  rows={3}
                />
                <div className="flex flex-wrap gap-1">
                  <Badge
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setWelcomeMessage(welcomeMessage + "{user}")}
                  >
                    {"{user}"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setWelcomeMessage(welcomeMessage + "{server}")}
                  >
                    {"{server}"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setWelcomeMessage(welcomeMessage + "{memberCount}")}
                  >
                    {"{memberCount}"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="leaveMessage" className="text-sm font-medium">
                  Leave Message
                </label>
                <Textarea
                  id="leaveMessage"
                  value={leaveMessage}
                  onChange={(e) => setLeaveMessage(e.target.value)}
                  placeholder="{user} has left the server."
                  rows={3}
                />
                <div className="flex flex-wrap gap-1">
                  <Badge
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setLeaveMessage(leaveMessage + "{user}")}
                  >
                    {"{user}"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setLeaveMessage(leaveMessage + "{server}")}
                  >
                    {"{server}"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setLeaveMessage(leaveMessage + "{memberCount}")}
                  >
                    {"{memberCount}"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced settings for your bot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  These settings are for advanced users. Incorrect configuration may cause your bot to malfunction.
                </AlertDescription>
              </Alert>

              <div className="space-y-4 pt-2">
                <Button variant="destructive" onClick={handleRestart}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Restart Bot
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          {isSaving ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
