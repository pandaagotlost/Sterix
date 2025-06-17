"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X, FileText, Command } from "lucide-react"
import Link from "next/link"

// Define the structure for search results
interface SearchResult {
  title: string
  path: string
  excerpt: string
  category: string
}

// Mock documentation data structure - in a real app, this would be fetched from an API or generated at build time
const documentationData: SearchResult[] = [
  {
    title: "Getting Started",
    path: "/docs",
    excerpt: "Everything you need to know about setting up and using Sterix.",
    category: "Introduction",
  },
  {
    title: "Installation",
    path: "/docs/installation",
    excerpt: "Learn how to add Sterix to your Discord server.",
    category: "Setup",
  },
  {
    title: "Quick Start",
    path: "/docs/quick-start",
    excerpt: "Get up and running with Sterix in minutes.",
    category: "Setup",
  },
  {
    title: "Permissions",
    path: "/docs/permissions",
    excerpt: "Learn about the permissions Sterix needs to function properly.",
    category: "Setup",
  },
  {
    title: "Command Overview",
    path: "/docs/general",
    excerpt: "Overview of all general commands available in Sterix.",
    category: "Commands",
  },
  {
    title: "Slash Commands",
    path: "/docs/slash-commands",
    excerpt: "Learn how to use Sterix's slash commands.",
    category: "Commands",
  },
  {
    title: "Prefix Commands",
    path: "/docs/prefix-commands",
    excerpt: "Learn how to use Sterix's prefix commands.",
    category: "Commands",
  },
  {
    title: "Moderation",
    path: "/docs/moderation",
    excerpt: "Learn about Sterix's moderation features.",
    category: "Features",
  },
  {
    title: "Auto Moderation",
    path: "/docs/auto-mod",
    excerpt: "Set up automatic moderation for your server.",
    category: "Features",
  },
  {
    title: "Anti-Raid",
    path: "/docs/anti-raid",
    excerpt: "Protect your server from raids with Sterix.",
    category: "Security",
  },
  {
    title: "Logging",
    path: "/docs/logging",
    excerpt: "Set up comprehensive logging for your server.",
    category: "Features",
  },
  {
    title: "Welcome System",
    path: "/docs/welcome",
    excerpt: "Create custom welcome messages for new members.",
    category: "Features",
  },
  {
    title: "Custom Roles",
    path: "/docs/custom-roles",
    excerpt: "Create and manage custom roles with Sterix.",
    category: "Features",
  },
  {
    title: "Reaction Roles",
    path: "/docs/reaction-roles",
    excerpt: "Set up reaction roles for your server.",
    category: "Features",
  },
  {
    title: "Tickets",
    path: "/docs/tickets",
    excerpt: "Create and manage support tickets with Sterix.",
    category: "Utility",
  },
  {
    title: "Giveaways",
    path: "/docs/giveaway",
    excerpt: "Run giveaways in your server with Sterix.",
    category: "Utility",
  },
  {
    title: "Voice Features",
    path: "/docs/voice",
    excerpt: "Learn about Sterix's voice channel features.",
    category: "Utility",
  },
  {
    title: "Ignore System",
    path: "/docs/ignore",
    excerpt: "Configure which channels and users Sterix should ignore.",
    category: "Utility",
  },
  {
    title: "Changelog",
    path: "/docs/changelog",
    excerpt: "See what's new in the latest version of Sterix.",
    category: "Updates",
  },
  {
    title: "FAQ",
    path: "/docs/faq",
    excerpt: "Frequently asked questions about Sterix.",
    category: "Support",
  },
]

export function DocsSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Handle search query changes
  useEffect(() => {
    if (query.length > 1) {
      const filtered = documentationData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
      setSelectedIndex(0)
    } else {
      setResults([])
    }
  }, [query])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
      }

      if (!isOpen) return

      // Close with Escape
      if (e.key === "Escape") {
        setIsOpen(false)
        setQuery("")
      }

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
        setIsOpen(false)
        setQuery("")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, results, selectedIndex, router])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={searchRef}>
      {/* Search trigger button */}
      <button
        onClick={() => {
          setIsOpen(true)
          setTimeout(() => inputRef.current?.focus(), 100)
        }}
        className="bg-[#1e1f22] text-white placeholder-gray-400 rounded-md px-3 py-1.5 pl-9 w-64 focus:outline-none focus:ring-2 focus:ring-[#5865f2] flex items-center justify-between"
      >
        <div className="flex items-center">
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-400">Search docs...</span>
        </div>
        <div className="flex items-center text-xs text-gray-500 bg-[#2b2d31] px-1.5 py-0.5 rounded">
          <Command className="h-3 w-3 mr-1" />
          <span>K</span>
        </div>
      </button>

      {/* Search modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-start justify-center pt-20">
          <div className="bg-[#2b2d31] w-full max-w-2xl rounded-lg shadow-lg border border-[#1e1f22] overflow-hidden">
            <div className="flex items-center p-4 border-b border-[#1e1f22]">
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
                onClick={() => {
                  setIsOpen(false)
                  setQuery("")
                }}
                className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-[#393c43]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {results.length > 0 ? (
                <div className="py-2">
                  {results.map((result, index) => (
                    <Link
                      key={result.path}
                      href={result.path}
                      onClick={() => {
                        setIsOpen(false)
                        setQuery("")
                      }}
                      className={`flex items-start px-4 py-3 hover:bg-[#393c43] ${
                        index === selectedIndex ? "bg-[#393c43]" : ""
                      }`}
                    >
                      <FileText className="h-5 w-5 text-[#5865f2] mt-0.5 mr-3 flex-shrink-0" />
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
                    {["Moderation", "Tickets", "Giveaways", "Reaction Roles", "Auto Moderation", "Logging"].map(
                      (term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="text-left px-3 py-2 rounded-md text-white hover:bg-[#393c43] text-sm"
                        >
                          {term}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[#1e1f22] px-4 py-3 text-xs text-gray-400 flex justify-between">
              <div className="flex items-center gap-4">
                <span>
                  Press <kbd className="px-1.5 py-0.5 bg-[#1e1f22] rounded text-gray-300">↑</kbd>{" "}
                  <kbd className="px-1.5 py-0.5 bg-[#1e1f22] rounded text-gray-300">↓</kbd> to navigate
                </span>
                <span>
                  Press <kbd className="px-1.5 py-0.5 bg-[#1e1f22] rounded text-gray-300">Enter</kbd> to select
                </span>
              </div>
              <span>
                Press <kbd className="px-1.5 py-0.5 bg-[#1e1f22] rounded text-gray-300">Esc</kbd> to close
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
