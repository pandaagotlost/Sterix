"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type ChatMessage = {
  id: string
  sender: string
  content: string
  timestamp: string
  isAdmin: boolean
}

type ChatContextType = {
  messages: ChatMessage[]
  sendMessage: (content: string, sender: string, isAdmin: boolean) => void
  clearMessages: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

// Initial messages for demonstration
const initialMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "System",
    content: "Welcome to the admin chat. This is where admins and moderators can communicate.",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    isAdmin: true,
  },
  {
    id: "2",
    sender: "Panda",
    content: "Hello team! Let's use this chat to coordinate our moderation efforts.",
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    isAdmin: true,
  },
  {
    id: "3",
    sender: "Moderator",
    content:
      "I've noticed an increase in spam messages in the #general channel. Should we implement stricter auto-mod settings?",
    timestamp: new Date(Date.now() - 2700000).toISOString(), // 45 minutes ago
    isAdmin: false,
  },
  {
    id: "4",
    sender: "Panda",
    content:
      "Good observation. Let's update the auto-mod to filter out those spam patterns. I'll make the changes in the admin panel.",
    timestamp: new Date(Date.now() - 2400000).toISOString(), // 40 minutes ago
    isAdmin: true,
  },
  {
    id: "5",
    sender: "Moderator",
    content:
      "Thanks! Also, we've received several feature requests for custom role colors. Should we add this to our roadmap?",
    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    isAdmin: false,
  },
  {
    id: "6",
    sender: "Panda",
    content:
      "That's a good idea. I'll add it to our development roadmap for the next update. Keep the suggestions coming!",
    timestamp: new Date(Date.now() - 1500000).toISOString(), // 25 minutes ago
    isAdmin: true,
  },
]

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

  // Load messages from localStorage on initial render (client-side only)
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem("sterix_chat_messages")
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages))
      }
    } catch (error) {
      console.error("Error loading chat messages from localStorage:", error)
    }
  }, [])

  // Save messages to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("sterix_chat_messages", JSON.stringify(messages))

      // Also save to sessionStorage as a broadcast mechanism
      sessionStorage.setItem("sterix_chat_update", Date.now().toString())
    } catch (error) {
      console.error("Error saving chat messages to localStorage:", error)
    }
  }, [messages])

  // Add a new useEffect to listen for storage events
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "sterix_chat_messages" && event.newValue) {
        try {
          const updatedMessages = JSON.parse(event.newValue)
          setMessages(updatedMessages)
        } catch (error) {
          console.error("Error parsing chat messages from storage event:", error)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const sendMessage = (content: string, sender: string, isAdmin: boolean) => {
    if (!content.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender,
      content,
      timestamp: new Date().toISOString(),
      isAdmin,
    }

    setMessages((prev) => [...prev, newMessage])
  }

  const clearMessages = () => {
    setMessages([])
  }

  return <ChatContext.Provider value={{ messages, sendMessage, clearMessages }}>{children}</ChatContext.Provider>
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
