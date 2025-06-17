"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Commands", href: "/commands" },
  { name: "Premium", href: "/premium" },
  {
    name: "Documentation",
    href: "/docs",
    children: [
      { name: "Getting Started", href: "/docs" },
      { name: "Commands", href: "/commands" },
      { name: "FAQ", href: "/docs/faq" },
    ],
  },
  { name: "Status", href: "/status" },
  { name: "Support", href: "/support" },
]

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  return (
    <header className="fixed top-0 w-full z-50 border-b border-discord-tertiary bg-discord-secondary">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-discord-blurple flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-bold text-xl text-discord-header">Sterix</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="px-3 py-2 text-sm font-medium text-discord-normal hover:text-discord-header transition-colors flex items-center gap-1"
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`}
                      />
                    </button>

                    {activeDropdown === item.name && (
                      <div className="absolute left-0 mt-1 w-48 bg-discord-secondary border border-discord-tertiary rounded-md shadow-lg overflow-hidden z-20">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-discord-normal hover:bg-discord-tertiary hover:text-discord-header transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-discord-normal hover:text-discord-header transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://discord.com/oauth2/authorize?client_id=1286376669770420304&permissions=2113268958&scope=bot%20applications.commands"
            className="hidden md:flex items-center gap-1 bg-discord-blurple hover:bg-discord-blurple/90 text-white font-medium px-4 py-2 rounded-md transition-colors"
          >
            Add to Discord <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-discord-normal hover:text-discord-header hover:bg-discord-tertiary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-discord-secondary border-t border-discord-tertiary max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center justify-between w-full px-4 py-2 text-discord-normal hover:text-discord-header hover:bg-discord-tertiary rounded-md transition-colors"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`}
                      />
                    </button>

                    {activeDropdown === item.name && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-discord-tertiary pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-discord-normal hover:bg-discord-tertiary hover:text-discord-header rounded-md transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-discord-normal hover:text-discord-header hover:bg-discord-tertiary rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-4 mt-4 border-t border-discord-tertiary">
              <Link
                href="https://discord.com/oauth2/authorize?client_id=1286376669770420304&permissions=2113268958&scope=bot%20applications.commands"
                className="block bg-discord-blurple hover:bg-discord-blurple/90 text-white font-medium px-4 py-2 rounded-md transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Add to Discord
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
