"use client"

import { useState } from "react"
import { Copy, Check, Play, RefreshCw, Save, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface CommandExample {
  id: string
  name: string
  command: string
  description: string
  result: string
}

export function CommandPlayground() {
  const [command, setCommand] = useState("/help")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [savedCommands, setSavedCommands] = useState<CommandExample[]>([
    {
      id: "1",
      name: "Basic Help",
      command: "/help",
      description: "Shows the help menu",
      result:
        "**Sterix Help Menu**\nHere are the available command categories:\n- Moderation\n- Utility\n- Fun\n- Settings\n\nUse `/help [category]` for more information.",
    },
    {
      id: "2",
      name: "Ban Command",
      command: "/ban @user spamming",
      description: "Bans a user for spamming",
      result: "✅ Successfully banned @user for reason: spamming",
    },
    {
      id: "3",
      name: "Create Ticket",
      command: "/ticket create title: Need help with setup",
      description: "Creates a support ticket",
      result: "🎫 Ticket created! Channel: #ticket-1234",
    },
  ])

  const executeCommand = () => {
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Simple command parser
      if (command.startsWith("/help")) {
        setResult(
          "**Sterix Help Menu**\nHere are the available command categories:\n- Moderation\n- Utility\n- Fun\n- Settings\n\nUse `/help [category]` for more information.",
        )
      } else if (command.startsWith("/ban")) {
        const parts = command.split(" ")
        const user = parts[1] || "@user"
        const reason = parts.slice(2).join(" ") || "No reason provided"
        setResult(`✅ Successfully banned ${user} for reason: ${reason}`)
      } else if (command.startsWith("/ticket create")) {
        const titleMatch = command.match(/title:\s*(.+)/)
        const title = titleMatch ? titleMatch[1] : "Support Request"
        setResult(`🎫 Ticket created! Channel: #ticket-${Math.floor(1000 + Math.random() * 9000)}`)
      } else if (command.startsWith("/role")) {
        const parts = command.split(" ")
        if (parts.length >= 4) {
          setResult(`✅ Role ${parts[1]} ${parts[3]} for ${parts[2]}`)
        } else {
          setResult("❌ Invalid syntax. Use `/role add/remove @user @role`")
        }
      } else {
        setResult("❌ Unknown command. Type `/help` for a list of commands.")
      }

      setIsLoading(false)
    }, 500)
  }

  const copyCommand = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const saveCommand = () => {
    if (command.trim() === "") return

    const newCommand: CommandExample = {
      id: Date.now().toString(),
      name: `Custom Command ${savedCommands.length + 1}`,
      command: command,
      description: "Custom saved command",
      result: result || "No result yet",
    }

    setSavedCommands([...savedCommands, newCommand])
  }

  const loadCommand = (example: CommandExample) => {
    setCommand(example.command)
    setResult(example.result)
  }

  const deleteCommand = (id: string) => {
    setSavedCommands(savedCommands.filter((cmd) => cmd.id !== id))
  }

  return (
    <div className="bg-[#2b2d31] dark:bg-[#1e1f22] rounded-lg border border-[#1e1f22] dark:border-[#111214] overflow-hidden">
      <div className="p-4 border-b border-[#1e1f22] dark:border-[#111214]">
        <h2 className="text-lg font-bold text-white mb-1">Command Playground</h2>
        <p className="text-sm text-gray-400">Test Sterix commands and see how they work</p>
      </div>

      <Tabs defaultValue="playground" className="w-full">
        <TabsList className="w-full justify-start px-4 pt-2 bg-transparent border-b border-[#1e1f22] dark:border-[#111214]">
          <TabsTrigger value="playground">Playground</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="saved">Saved ({savedCommands.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="playground" className="p-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-2">
                <label htmlFor="command" className="text-sm font-medium text-gray-300">
                  Command
                </label>
                <Badge className="ml-2 bg-[#5865f2]/20 text-[#5865f2] border-[#5865f2]/30">Slash Command</Badge>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    id="command"
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="Type a command (e.g. /help)"
                    className="w-full bg-[#1e1f22] dark:bg-[#111214] text-white placeholder-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865f2] font-mono"
                  />
                </div>
                <Button
                  onClick={executeCommand}
                  disabled={isLoading}
                  className="bg-[#5865f2] hover:bg-[#4752c4] text-white"
                >
                  {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                  <span className="ml-2">Run</span>
                </Button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Result</label>
                <div className="flex gap-2">
                  <Button
                    onClick={copyCommand}
                    size="sm"
                    variant="outline"
                    className="h-8 px-2 text-xs bg-transparent border-[#4f545c]/30 text-gray-400 hover:text-white hover:bg-[#393c43] dark:hover:bg-[#2f3136]"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span className="ml-1">Copy</span>
                  </Button>
                  <Button
                    onClick={saveCommand}
                    size="sm"
                    variant="outline"
                    className="h-8 px-2 text-xs bg-transparent border-[#4f545c]/30 text-gray-400 hover:text-white hover:bg-[#393c43] dark:hover:bg-[#2f3136]"
                    disabled={!command}
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span className="ml-1">Save</span>
                  </Button>
                </div>
              </div>
              <div className="bg-[#1e1f22] dark:bg-[#111214] rounded-md p-3 min-h-[100px] text-white font-mono text-sm whitespace-pre-wrap">
                {result || "Command result will appear here..."}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="examples" className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedCommands.slice(0, 3).map((example) => (
              <div
                key={example.id}
                className="bg-[#1e1f22] dark:bg-[#111214] rounded-md p-3 border border-[#4f545c]/20"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">{example.name}</h3>
                  <Button
                    onClick={() => loadCommand(example)}
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-xs bg-transparent border-[#4f545c]/30 text-gray-400 hover:text-white hover:bg-[#393c43] dark:hover:bg-[#2f3136]"
                  >
                    Load
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mb-2">{example.description}</p>
                <div className="font-mono text-xs bg-[#111214] dark:bg-black/20 p-2 rounded text-[#5865f2] mb-2">
                  {example.command}
                </div>
                <div className="text-xs text-gray-300 italic">
                  Result: {example.result.substring(0, 50)}
                  {example.result.length > 50 ? "..." : ""}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="p-4">
          {savedCommands.length > 0 ? (
            <div className="space-y-3">
              {savedCommands.map((cmd) => (
                <div
                  key={cmd.id}
                  className="flex items-start gap-3 bg-[#1e1f22] dark:bg-[#111214] rounded-md p-3 border border-[#4f545c]/20"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-white">{cmd.name}</h3>
                      <div className="flex gap-1">
                        <Button
                          onClick={() => loadCommand(cmd)}
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs bg-transparent border-[#4f545c]/30 text-gray-400 hover:text-white hover:bg-[#393c43] dark:hover:bg-[#2f3136]"
                        >
                          Load
                        </Button>
                        <Button
                          onClick={() => deleteCommand(cmd.id)}
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 bg-transparent border-[#4f545c]/30 text-gray-400 hover:text-white hover:bg-[#393c43] dark:hover:bg-[#2f3136]"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-[#111214] dark:bg-black/20 p-1.5 rounded text-[#5865f2] mb-1">
                      {cmd.command}
                    </div>
                    <div className="text-xs text-gray-400">{cmd.description}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No saved commands yet.</p>
              <p className="text-sm text-gray-500 mt-1">
                Run commands in the playground and save them to see them here.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
