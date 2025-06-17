"use client"

import type React from "react"
import { Suspense } from "react"
import { useState, useEffect } from "react"
import { EnhancedDocsSidebar } from "@/components/enhanced-docs-sidebar"
import { MobileDocsNav } from "@/components/mobile-docs-nav"
import { CommandSearch } from "@/components/command-search"
import { Menu, X, ChevronUp, ExternalLink, Search, Moon, Sun, Copy, Check } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname } from "next/navigation"
import { CommandPlayground } from "@/components/command-playground"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showPlayground, setShowPlayground] = useState(false)
  const [copied, setCopied] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev)
  }

  const copyCurrentUrl = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Get the current section from the pathname
  const getCurrentSection = () => {
    const path = pathname.split("/")
    if (path.length > 2) {
      return path[2]
    }
    return "introduction"
  }

  const hasExamples = true // Replace with actual logic to check for examples content
  const hasReference = true // Replace with actual logic to check for reference content
  const hasFaq = true // Replace with actual logic to check for FAQ content

  return (
    <div className="min-h-screen bg-[#36393f] dark:bg-[#2b2d31]">
      {/* Discord-style top bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#2b2d31] dark:bg-[#1e1f22] border-b border-[#1e1f22] dark:border-[#111214] z-50 flex items-center px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-bold text-xl text-white hidden md:inline">Sterix</span>
            </Link>
            <div className="h-6 w-px bg-[#4f545c] mx-2 hidden md:block"></div>
            <Link href="/docs" className="text-white font-medium hidden md:block">
              Documentation
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-md text-gray-200 hover:bg-[#4f545c] transition-colors"
              aria-label="Search documentation"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={() => setShowPlayground(!showPlayground)}
              className={cn(
                "hidden md:flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                showPlayground
                  ? "bg-[#5865f2] text-white hover:bg-[#4752c4]"
                  : "bg-[#4f545c]/30 text-gray-200 hover:bg-[#4f545c]",
              )}
            >
              Command Playground
            </button>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-gray-200 hover:bg-[#4f545c] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Link
              href="https://discord.gg/sterix"
              target="_blank"
              className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors hidden sm:flex items-center gap-1"
            >
              Join Discord <ExternalLink className="h-3.5 w-3.5 ml-1" />
            </Link>

            <button
              onClick={toggleMobileSidebar}
              className="p-2 rounded-md text-gray-200 hover:bg-[#4f545c] md:hidden"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileDocsNav isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

      {/* Command Search Modal */}
      {showSearch && <CommandSearch onClose={() => setShowSearch(false)} />}

      <div className="pt-16 flex">
        {/* Enhanced Desktop Sidebar */}
        <EnhancedDocsSidebar />

        <div className="flex flex-col flex-1">
          {/* Command Playground (when active) */}
          {showPlayground && (
            <div className="bg-[#2b2d31] dark:bg-[#1e1f22] border-b border-[#1e1f22] dark:border-[#111214] p-4">
              <CommandPlayground />
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 px-4 py-8 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Page Header with Tabs */}
              <div className="mb-8 pb-4 border-b border-[#4f545c]/30">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {getCurrentSection().charAt(0).toUpperCase() + getCurrentSection().slice(1).replace(/-/g, " ")}
                  </h1>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyCurrentUrl}
                      className="p-2 rounded-md text-gray-300 hover:bg-[#4f545c]/30 transition-colors"
                      aria-label="Copy link"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {(hasExamples || hasReference || hasFaq) && (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Tabs defaultValue="guide" className="w-full">
                      <TabsList className="bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214]">
                        <TabsTrigger value="guide">Guide</TabsTrigger>
                        {hasExamples && <TabsTrigger value="examples">Examples</TabsTrigger>}
                        {hasReference && <TabsTrigger value="reference">Reference</TabsTrigger>}
                        {hasFaq && <TabsTrigger value="faq">FAQ</TabsTrigger>}
                      </TabsList>
                      <TabsContent value="guide" className="pt-4">
                        {children}
                      </TabsContent>
                      {hasExamples && (
                        <TabsContent value="examples" className="pt-4">
                          <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white">Usage Examples</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Example cards would go here */}
                              <div className="bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] rounded-md p-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Basic Usage</h3>
                                <div className="font-mono bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md text-white mb-3">
                                  /command argument: value
                                </div>
                                <p className="text-gray-300 text-sm">Description of how this command works.</p>
                              </div>
                              <div className="bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] rounded-md p-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Advanced Usage</h3>
                                <div className="font-mono bg-[#1e1f22] dark:bg-[#111214] p-3 rounded-md text-white mb-3">
                                  /command argument: value --flag
                                </div>
                                <p className="text-gray-300 text-sm">Description of advanced usage with flags.</p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      )}
                      {hasReference && (
                        <TabsContent value="reference" className="pt-4">
                          <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white">Command Reference</h2>
                            <div className="bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] rounded-md p-4">
                              <table className="w-full text-left">
                                <thead>
                                  <tr className="border-b border-[#4f545c]/30">
                                    <th className="pb-2 text-gray-300 font-medium">Parameter</th>
                                    <th className="pb-2 text-gray-300 font-medium">Type</th>
                                    <th className="pb-2 text-gray-300 font-medium">Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b border-[#4f545c]/10">
                                    <td className="py-2 text-white">argument</td>
                                    <td className="py-2 text-[#5865f2]">string</td>
                                    <td className="py-2 text-gray-300">Description of this parameter</td>
                                  </tr>
                                  <tr>
                                    <td className="py-2 text-white">flag</td>
                                    <td className="py-2 text-[#5865f2]">boolean</td>
                                    <td className="py-2 text-gray-300">Description of this flag</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </TabsContent>
                      )}
                      {hasFaq && (
                        <TabsContent value="faq" className="pt-4">
                          <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                              <div className="bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] rounded-md p-4">
                                <h3 className="text-lg font-semibold text-white mb-2">
                                  Why isn't the command working?
                                </h3>
                                <p className="text-gray-300">
                                  Make sure the bot has the necessary permissions and that you're using the correct
                                  syntax.
                                </p>
                              </div>
                              <div className="bg-[#2b2d31] dark:bg-[#1e1f22] border border-[#1e1f22] dark:border-[#111214] rounded-md p-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Can I customize this feature?</h3>
                                <p className="text-gray-300">
                                  Yes, you can customize this feature using the settings command or through the
                                  dashboard.
                                </p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      )}
                    </Tabs>
                  </Suspense>
                )}
              </div>

              {/* Main Content */}
            </div>
          </main>
        </div>

        {/* Right Sidebar - Table of Contents */}
        <aside className="hidden xl:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-[#2b2d31] dark:bg-[#1e1f22] border-l border-[#1e1f22] dark:border-[#111214]">
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-4 text-gray-200">On This Page</h3>
            <nav className="toc">
              <ul className="space-y-2">
                <li>
                  <a
                    href="#overview"
                    className="text-sm text-gray-400 hover:text-white block py-1 border-l-2 border-transparent hover:border-[#5865f2] pl-3 transition-colors"
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#usage"
                    className="text-sm text-gray-400 hover:text-white block py-1 border-l-2 border-transparent hover:border-[#5865f2] pl-3 transition-colors"
                  >
                    Usage
                  </a>
                </li>
                <li>
                  <a
                    href="#examples"
                    className="text-sm text-gray-400 hover:text-white block py-1 border-l-2 border-transparent hover:border-[#5865f2] pl-3 transition-colors"
                  >
                    Examples
                  </a>
                </li>
                <li>
                  <a
                    href="#permissions"
                    className="text-sm text-gray-400 hover:text-white block py-1 border-l-2 border-transparent hover:border-[#5865f2] pl-3 transition-colors"
                  >
                    Permissions
                  </a>
                </li>
                <li>
                  <a
                    href="#troubleshooting"
                    className="text-sm text-gray-400 hover:text-white block py-1 border-l-2 border-transparent hover:border-[#5865f2] pl-3 transition-colors"
                  >
                    Troubleshooting
                  </a>
                </li>
              </ul>
            </nav>
            <div className="mt-8 space-y-3">
              <Link href="/support" className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
                <span>Have questions?</span>
                <span className="text-[#5865f2]">Get support →</span>
              </Link>
              <button
                onClick={scrollToTop}
                className="text-sm flex items-center text-gray-400 hover:text-white"
                type="button"
              >
                Scroll to top <ChevronUp className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Scroll to Top Button - Mobile */}
      {showScrollTop && (
        <div className="fixed bottom-20 right-4 z-[90] lg:hidden">
          <button
            onClick={scrollToTop}
            className="h-10 w-10 rounded-full bg-[#4f545c] hover:bg-[#5865f2] shadow-lg flex items-center justify-center text-white transition-colors"
            aria-label="Scroll to top"
            type="button"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Mobile Menu Button */}
      <div className="fixed bottom-4 right-4 z-[100] lg:hidden">
        <button
          onClick={toggleMobileSidebar}
          className="h-12 w-12 rounded-full bg-[#5865f2] hover:bg-[#4752c4] shadow-lg flex items-center justify-center text-white transition-colors"
          aria-label="Toggle mobile menu"
          type="button"
        >
          {isMobileSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </div>
  )
}
