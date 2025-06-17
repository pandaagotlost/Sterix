"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useChat } from "@/contexts/chat-context"
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@/lib/auth"

export default function AdminChatPage() {
  const { currentUser } = useAuth()
  const { messages, sendMessage } = useChat()
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [username, setUsername] = useState(currentUser?.name || "Admin")

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Add a useEffect to periodically check for new messages
  useEffect(() => {
    // Set up periodic checks for new messages
    const interval = setInterval(() => {
      try {
        const savedMessages = localStorage.getItem("sterix_chat_messages")
        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages)
          if (JSON.stringify(parsedMessages) !== JSON.stringify(messages)) {
            // Only update if there are actual changes
            // This prevents unnecessary re-renders
            if (parsedMessages.length !== messages.length) {
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          }
        }
      } catch (error) {
        console.error("Error checking for chat updates:", error)
      }
    }, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      sendMessage(newMessage, username, currentUser?.role === "admin")
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1b26]">
      <AdminSidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Admin Chat</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white">Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Avatar" />
                  <AvatarFallback className="bg-violet-700 text-white text-xl">
                    {username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 w-full">
                  <label className="text-sm text-gray-400">Display Name</label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-[#1a1b26] border-gray-700 text-white"
                    placeholder="Enter your display name"
                  />
                </div>
                <div className="bg-violet-500/20 text-violet-300 border border-violet-500/50 rounded-md px-3 py-2 text-sm w-full">
                  <p>Online - Admin</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-white">Team Chat</CardTitle>
              <CardDescription className="text-gray-300">Communicate with other admins and moderators</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col h-[600px]">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className={`${message.isAdmin ? "bg-violet-700" : "bg-blue-700"} text-white`}>
                          {message.sender.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{message.sender}</span>
                          <span className="text-xs text-gray-400">
                            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-gray-300 mt-1">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-gray-700 p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-[#1a1b26] border-gray-700 text-white"
                    />
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff]"
                    >
                      Send
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
