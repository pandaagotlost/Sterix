"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock documentation sections
const docSections = [
  { value: "getting-started", label: "Getting Started" },
  { value: "commands", label: "Commands" },
  { value: "premium-features", label: "Premium Features" },
]

// Mock documentation pages
const docPages = [
  { id: 1, title: "Introduction", section: "getting-started", path: "/docs" },
  { id: 2, title: "Installation", section: "getting-started", path: "/docs/installation" },
  { id: 3, title: "Quick Start", section: "getting-started", path: "/docs/quick-start" },
  { id: 4, title: "Moderation", section: "commands", path: "/docs/moderation" },
  { id: 5, title: "Music System", section: "commands", path: "/docs/music" },
  { id: 6, title: "Auto Moderation", section: "commands", path: "/docs/auto-mod" },
]

// Mock page content for demonstration
const pageContents = {
  1: `<div class="space-y-4">
      <h1 class="text-4xl font-bold text-white">Documentation</h1>
      <p class="text-lg text-gray-300">
        Welcome to the Sterix documentation. Learn how to integrate and use all features of our Discord bot.
      </p>
    </div>

    <div class="space-y-4">
      <h2 class="text-2xl font-bold text-white mt-6">Getting Started</h2>
      <p class="text-gray-300">
        Learn the basics of Sterix and how to add it to your server.
      </p>
      <h3 class="font-semibold text-white">Quick Setup</h3>
      <ol class="list-decimal list-inside space-y-2 text-gray-300">
        <li>Click the "Add to Discord" button on our homepage</li>
        <li>Select your server and authorize the bot</li>
        <li>Use <code>.help</code> to see all available commands</li>
      </ol>
    </div>`,
  2: `<div class="space-y-4">
      <h1 class="text-4xl font-bold text-white">Installation</h1>
      <p class="text-lg text-gray-300">Learn how to add Sterix to your Discord server.</p>
    </div>

    <div class="space-y-4">
      <h2 class="text-2xl font-bold text-white mt-6">Adding Sterix to Your Server</h2>
      <p class="text-gray-300">Adding Sterix to your Discord server is quick and easy:</p>
      <h3 class="font-semibold text-white">Step 1: Use the Invite Link</h3>
      <p class="text-gray-300">Click the "Add to Discord" button on our website</p>
      <h3 class="font-semibold text-white">Step 2: Select Your Server</h3>
      <p class="text-gray-300">Choose the server where you want to add Sterix from the dropdown menu.</p>
    </div>`,
  3: `<div class="space-y-4">
      <h1 class="text-4xl font-bold text-white">Quick Start</h1>
      <p class="text-lg text-gray-300">
        Get started with Sterix quickly with these essential commands and features.
      </p>
    </div>

    <div class="space-y-4">
      <h2 class="text-2xl font-bold text-white mt-6">Essential Commands</h2>
      <p class="text-gray-300">Here are some essential commands to get you started with Sterix:</p>
      <h3 class="font-semibold text-white">Help Command</h3>
      <p class="text-gray-300">Get a list of all available commands:</p>
      <pre><code>.help</code></pre>
    </div>`,
}

export default function AdminDocumentationPage() {
  const [selectedPage, setSelectedPage] = useState<number | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [section, setSection] = useState("")
  const [path, setPath] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [previewMode, setPreviewMode] = useState(false)

  const handlePageSelect = (id: number) => {
    const page = docPages.find((p) => p.id === id)
    if (page) {
      setSelectedPage(id)
      setTitle(page.title)
      setSection(page.section)
      setPath(page.path)
      // In a real app, we would fetch the content from an API
      setContent(pageContents[id as keyof typeof pageContents] || "")
    }
  }

  const handleSave = () => {
    // In a real app, we would save to an API
    setSuccessMessage("Page updated successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleNewPage = () => {
    setSelectedPage(null)
    setTitle("")
    setContent("")
    setSection("")
    setPath("")
  }

  const togglePreview = () => {
    setPreviewMode(!previewMode)
  }

  return (
    <div className="min-h-screen bg-[#1a1b26]">
      <AdminSidebar />
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Documentation Editor</h1>
          <Button
            onClick={handleNewPage}
            className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff]"
          >
            New Page
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white">Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {docPages.map((page) => (
                  <div
                    key={page.id}
                    onClick={() => handlePageSelect(page.id)}
                    className={`p-2 rounded-md cursor-pointer ${
                      selectedPage === page.id ? "bg-[#9d7cff] text-white" : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {page.title}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-3">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">{selectedPage ? "Edit Page" : "New Page"}</CardTitle>
                {selectedPage && (
                  <Button
                    onClick={togglePreview}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    {previewMode ? "Edit" : "Preview"}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {successMessage && (
                <div className="bg-green-500/20 border border-green-500 text-green-200 p-3 rounded-md text-sm">
                  {successMessage}
                </div>
              )}

              {previewMode && selectedPage ? (
                <div className="p-6 bg-[#1a1b26] rounded-lg border border-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              ) : (
                <div>
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-300">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-[#1a1b26] border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="section" className="text-gray-300">
                      Section
                    </Label>
                    <Select value={section} onValueChange={setSection}>
                      <SelectTrigger className="bg-[#1a1b26] border-gray-700 text-white">
                        <SelectValue placeholder="Select a section" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#252632] border-gray-700">
                        {docSections.map((section) => (
                          <SelectItem key={section.value} value={section.value} className="text-white">
                            {section.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="path" className="text-gray-300">
                      Path
                    </Label>
                    <Input
                      id="path"
                      value={path}
                      onChange={(e) => setPath(e.target.value)}
                      className="bg-[#1a1b26] border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="content" className="text-gray-300">
                      Content (HTML)
                    </Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="bg-[#1a1b26] border-gray-700 text-white min-h-[300px] font-mono"
                    />
                  </div>

                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff] mt-4"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
