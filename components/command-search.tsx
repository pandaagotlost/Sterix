"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X, FileText, Command, Shield, MessageSquare, Bell, Settings, Star } from "lucide-react"
import Link from "next/link"

// Define the structure for search results
interface SearchResult {
  title: string
  path: string
  excerpt: string
  category: string
  icon: React.ElementType
}

// Enhanced documentation data structure with icons
const documentationData: SearchResult[] = [
  {
    title: "Getting Started",
    path: "/docs",
    excerpt: "Everything you need to know about setting up and using Sterix.",
    category: "Introduction",
    icon: Command,
  },
  {
    title: "Installation",
    path: "/docs/installation",
    excerpt: "Learn how to add Sterix to your Discord server.",
    category: "Setup",
    icon: Settings,
  },
  {
    title: "Quick Start",
    path: "/docs/quick-start",
    excerpt: "Get up and running with Sterix in minutes.",
    category: "Setup",
    icon: Settings,
  },
  {
    title: "Permissions",
    path: "/docs/permissions",
    excerpt: "Learn about the permissions Sterix needs to function properly.",
    category: "Setup",
    icon: Settings,
  },
  {
    title: "Command Overview",
    path: "/docs/general",
    excerpt: "Overview of all general commands available in Sterix.",
    category: "Commands",
    icon: Command,
  },
  {
    title: "Slash Commands",
    path: "/docs/slash-commands",
    excerpt: "Learn how to use Sterix's slash commands.",
    category: "Commands",
    icon: Command,
  },
  {
    title: "Prefix Commands",
    path: "/docs/prefix-commands",
    excerpt: "Learn how to use Sterix's prefix commands.",
    category: "Commands",
    icon: Command,
  },
  {
    title: "Moderation",
    path: "/docs/moderation",
    excerpt: "Learn about Sterix's moderation features.",
    category: "Features",
    icon: Shield,
  },
  {
    title: "Auto Moderation",
    path: "/docs/auto-mod",
    excerpt: "Set up automatic moderation for your server.",
    category: "Features",
    icon: Shield,
  },
  {
    title: "Anti-Raid",
    path: "/docs/anti-raid",
    excerpt: "Protect your server from raids with Sterix.",
    category: "Security",
    icon: Shield,
  },
  {
    title: "Logging",
    path: "/docs/logging",
    excerpt: "Set up comprehensive logging for your server.",
    category: "Features",
    icon: FileText,
  },
  {
    title: "Welcome System",
    path: "/docs/welcome",
    excerpt: "Create custom welcome messages for new members.",
    category: "Features",
    icon: Bell,
  },
  {
    title: "Custom Roles",
    path: "/docs/custom-roles",
    excerpt: "Create and manage custom roles with Sterix.",
    category: "Features",
    icon: Settings,
  },
  {
    title: "Reaction Roles",
    path: "/docs/reaction-roles",
    excerpt: "Set up reaction roles for your server.",
    category: "Features",
    icon: Settings,
  },
  {
    title: "Tickets",
    path: "/docs/tickets",
    excerpt: "Create and manage support tickets with Sterix.",
    category: "Utility",
    icon: MessageSquare,
  },
  {
    title: "Giveaways",
    path: "/docs/giveaway",
    excerpt: "Run giveaways in your server with Sterix.",
    category: "Utility",
    icon: Star,
  },
  {
    title: "Voice Features",
    path: "/docs/voice",
    excerpt: "Learn about Sterix's voice channel features.",
    category: "Utility",
    icon: MessageSquare,
  },
  {
    title: "Ignore System",
    path: "/docs/ignore",
    excerpt: "Configure which channels and users Sterix should ignore.",
    category: "Utility",
    icon: Settings,
  },
  {
    title: "Changelog",
    path: "/docs/changelog",
    excerpt: "See what's new in the latest version of Sterix.",
    category: "Updates",
    icon: FileText,
  },
  {
    title: "FAQ",
    path: "/docs/faq",
    excerpt: "Frequently asked questions about Sterix.",
    category: "Support",
    icon: MessageSquare,
  },
]

interface CommandSearchProps {
  onClose: () => void
}

export function CommandSearch({ onClose }: CommandSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(documentationData.map((item) => item.category)))
    setCategories(uniqueCategories)
  }, [])

  // Handle search query changes
  useEffect(() => {
    if (query.length > 1) {
      let filtered = documentationData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )

      // Apply category filter if selected
      if (selectedCategory) {
        filtered = filtered.filter((item) => item.category === selectedCategory)
      }

      setResults(filtered)
      setSelectedIndex(0)
    } else if (selectedCategory) {
      // Show all items from selected category when no query
      const filtered = documentationData.filter((item) => item.category === selectedCategory)
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query, selectedCategory])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Navigate results with arrow keys
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
      }

      if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
      }

      // Navigate to selected result with Enter
      if (e.key === "Enter" && results.length > 0) {
        e.preventDefault()
        router.push(results[selectedIndex].path)
        onClose()
      }

      // Close with Escape
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [results, selectedIndex, router, onClose])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-start justify-center pt-20">
      <div
        className="bg-[#2b2d31] dark:bg-[#1e1f22] w-full max-w-2xl rounded-lg shadow-lg border border-[#1e1f22] dark:border-[#111214] overflow-hidden"
        ref={searchRef}
      >
        <div className="flex items-center p-4 border-b border-[#1e1f22] dark:border-[#111214]">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-[#393c43] dark:hover:bg-[#2f3136]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 p-2 overflow-x-auto border-b border-[#1e1f22] dark:border-[#111214] bg-[#2b2d31]/50 dark:bg-[#1e1f22]/50">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-2 py-1 text-xs rounded-md whitespace-nowrap ${
              selectedCategory === null
                ? "bg-[#5865f2] text-white"
                : "bg-[#393c43]/50 dark:bg-[#2f3136]/50 text-gray-300 hover:bg-[#393c43] dark:hover:bg-[#2f3136]"
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 py-1 text-xs rounded-md whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-[#5865f2] text-white"
                  : "bg-[#393c43]/50 dark:bg-[#2f3136]/50 text-gray-300 hover:bg-[#393c43] dark:hover:bg-[#2f3136]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <Link
                  key={result.path}
                  href={result.path}
                  onClick={onClose}
                  className={`flex items-start px-4 py-3 hover:bg-[#393c43] dark:hover:bg-[#2f3136] ${
                    index === selectedIndex ? "bg-[#393c43] dark:bg-[#2f3136]" : ""
                  }`}
                >
                  <div className="p-2 rounded-md bg-[#5865f2]/10 text-[#5865f2] mr-3 flex-shrink-0">
                    <result.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{result.title}</div>
                    <div className="text-sm text-gray-400 mt-1">{result.excerpt}</div>
                    <div className="text-xs text-[#5865f2] mt-1">{result.category}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.length > 1 ? (
            <div className="py-12 text-center">
              <div className="text-gray-400">No results found for "{query}"</div>
              <div className="text-sm text-gray-500 mt-2">Try searching with different keywords</div>
            </div>
          ) : (
            <div className="py-4 px-4">
              <div className="text-sm text-gray-400 mb-2">POPULAR SEARCHES</div>
              <div className="grid grid-cols-2 gap-2">
                {["Moderation", "Tickets", "Giveaways", "Reaction Roles", "Auto Moderation", "Logging"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-left px-3 py-2 rounded-md text-white hover:bg-[#393c43] dark:hover:bg-[#2f3136] text-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-[#1e1f22] dark:border-[#111214] px-4 py-3 text-xs text-gray-400 flex justify-between">
          <div className="flex items-center gap-4">
            <span>
              Press <kbd className="px-1.5 py-0.5 bg-[#1e1f22] dark:bg-[#111214] rounded text-gray-300">↑</kbd>{" "}
              <kbd className="px-1.5 py-0.5 bg-[#1e1f22] dark:bg-[#111214] rounded text-gray-300">↓</kbd> to navigate
            </span>
            <span>
              Press <kbd className="px-1.5 py-0.5 bg-[#1e1f22] dark:bg-[#111214] rounded text-gray-300">Enter</kbd> to
              select
            </span>
          </div>
          <span>
            Press <kbd className="px-1.5 py-0.5 bg-[#1e1f22] dark:bg-[#111214] rounded text-gray-300">Esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  )
}
