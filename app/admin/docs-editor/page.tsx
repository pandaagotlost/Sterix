"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Save, Plus, Trash2, Edit, FileText, Search, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DocPage {
  id: string
  title: string
  slug: string
  category: string
  content: string
  status: "published" | "draft"
  lastModified: string
  author: string
}

const categories = [
  "Getting Started",
  "Commands",
  "Moderation",
  "Server Management",
  "Notifications",
  "Utility",
  "Fun Features",
  "Advanced",
  "Troubleshooting",
]

const mockDocPages: DocPage[] = [
  {
    id: "1",
    title: "Getting Started",
    slug: "getting-started",
    category: "Getting Started",
    content: `# Getting Started with Sterix

Welcome to Sterix! This guide will help you get started with our Discord bot.

## Quick Setup

1. Invite Sterix to your server
2. Set up basic permissions
3. Configure your first commands

## Basic Commands

- \`/help\` - Show all available commands
- \`/setup\` - Run the setup wizard
- \`/config\` - Configure bot settings`,
    status: "published",
    lastModified: "2024-01-15",
    author: "Admin",
  },
  {
    id: "2",
    title: "Moderation Commands",
    slug: "moderation",
    category: "Moderation",
    content: `# Moderation Commands

Learn how to use Sterix's powerful moderation features.

## Basic Moderation

- \`/ban\` - Ban a user
- \`/kick\` - Kick a user  
- \`/mute\` - Mute a user
- \`/warn\` - Warn a user

## Auto Moderation

Configure automatic moderation rules to keep your server clean.`,
    status: "published",
    lastModified: "2024-01-14",
    author: "Admin",
  },
]

export default function AdminDocsEditorPage() {
  const { toast } = useToast()
  const [docPages, setDocPages] = useState<DocPage[]>(mockDocPages)
  const [selectedPage, setSelectedPage] = useState<DocPage | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [pageToDelete, setPageToDelete] = useState<DocPage | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    content: "",
    status: "draft" as "published" | "draft",
  })

  // Load docs from localStorage
  useEffect(() => {
    const savedDocs = localStorage.getItem("sterix_docs_pages")
    if (savedDocs) {
      try {
        setDocPages(JSON.parse(savedDocs))
      } catch (error) {
        console.error("Error loading docs:", error)
      }
    }
  }, [])

  // Save docs to localStorage
  useEffect(() => {
    localStorage.setItem("sterix_docs_pages", JSON.stringify(docPages))
  }, [docPages])

  const filteredPages = docPages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || page.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleSelectPage = (page: DocPage) => {
    setSelectedPage(page)
    setFormData({
      title: page.title,
      slug: page.slug,
      category: page.category,
      content: page.content,
      status: page.status,
    })
    setIsEditing(false)
  }

  const handleNewPage = () => {
    setSelectedPage(null)
    setFormData({
      title: "",
      slug: "",
      category: categories[0],
      content: "",
      status: "draft",
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const slug =
      formData.slug ||
      formData.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")

    if (selectedPage) {
      // Update existing page
      setDocPages((pages) =>
        pages.map((page) =>
          page.id === selectedPage.id
            ? {
                ...page,
                ...formData,
                slug,
                lastModified: new Date().toISOString().split("T")[0],
                author: "Admin",
              }
            : page,
        ),
      )
    } else {
      // Create new page
      const newPage: DocPage = {
        id: Date.now().toString(),
        ...formData,
        slug,
        lastModified: new Date().toISOString().split("T")[0],
        author: "Admin",
      }
      setDocPages((pages) => [...pages, newPage])
      setSelectedPage(newPage)
    }

    setIsEditing(false)
    toast({
      title: "Success",
      description: "Documentation page saved successfully!",
    })
  }

  const handleDelete = () => {
    if (pageToDelete) {
      setDocPages((pages) => pages.filter((page) => page.id !== pageToDelete.id))
      if (selectedPage?.id === pageToDelete.id) {
        setSelectedPage(null)
      }
      setShowDeleteDialog(false)
      setPageToDelete(null)
      toast({
        title: "Success",
        description: "Documentation page deleted successfully!",
      })
    }
  }

  const confirmDelete = (page: DocPage) => {
    setPageToDelete(page)
    setShowDeleteDialog(true)
  }

  return (
    <div className="min-h-screen bg-[#1a1b26]">
      <AdminSidebar />
      <div className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Documentation Editor</h1>
            <p className="text-gray-300 mt-1">Create and manage documentation pages</p>
          </div>
          <Button
            onClick={handleNewPage}
            className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff] flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Page
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Pages List */}
          <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white">Documentation Pages</CardTitle>
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search pages..."
                    className="pl-10 bg-[#1a1b26] border-gray-700 text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="bg-[#1a1b26] border-gray-700 text-white">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#252632] border-gray-700">
                    <SelectItem value="all" className="text-white">
                      All Categories
                    </SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-white">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredPages.map((page) => (
                  <div
                    key={page.id}
                    onClick={() => handleSelectPage(page)}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedPage?.id === page.id
                        ? "bg-[#9d7cff] text-white"
                        : "bg-[#1a1b26] text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-sm">{page.title}</h4>
                      <Badge
                        className={`text-xs ${
                          page.status === "published"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {page.status}
                      </Badge>
                    </div>
                    <p className="text-xs opacity-75">{page.category}</p>
                    <p className="text-xs opacity-60 mt-1">Modified: {page.lastModified}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Editor */}
          <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-3">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">
                  {selectedPage ? (isEditing ? "Edit Page" : "View Page") : "New Page"}
                </CardTitle>
                <div className="flex gap-2">
                  {selectedPage && !isEditing && (
                    <>
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => window.open(`/docs/${selectedPage.slug}`, "_blank")}
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Live
                      </Button>
                      <Button onClick={() => confirmDelete(selectedPage)} variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing || !selectedPage ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-gray-300">
                        Title *
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        className="bg-[#1a1b26] border-gray-700 text-white"
                        placeholder="Page title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug" className="text-gray-300">
                        Slug
                      </Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                        className="bg-[#1a1b26] border-gray-700 text-white"
                        placeholder="page-url-slug (auto-generated if empty)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-gray-300">
                        Category
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger className="bg-[#1a1b26] border-gray-700 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#252632] border-gray-700">
                          {categories.map((category) => (
                            <SelectItem key={category} value={category} className="text-white">
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-gray-300">
                        Status
                      </Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: "published" | "draft") =>
                          setFormData((prev) => ({ ...prev, status: value }))
                        }
                      >
                        <SelectTrigger className="bg-[#1a1b26] border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#252632] border-gray-700">
                          <SelectItem value="draft" className="text-white">
                            Draft
                          </SelectItem>
                          <SelectItem value="published" className="text-white">
                            Published
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-gray-300">
                      Content (Markdown) *
                    </Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                      className="bg-[#1a1b26] border-gray-700 text-white min-h-[400px] font-mono"
                      placeholder="Write your documentation content in Markdown..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff] flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save Page
                    </Button>
                    {selectedPage && (
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              ) : selectedPage ? (
                <div className="prose prose-invert max-w-none">
                  <div className="bg-[#1a1b26] p-6 rounded-md">
                    <div className="whitespace-pre-wrap text-gray-300">{selectedPage.content}</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-white text-lg font-medium mb-2">No page selected</h3>
                  <p className="text-gray-400">Select a page from the list or create a new one</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-[#252632] border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Delete Documentation Page</DialogTitle>
            <DialogDescription className="text-gray-300">
              Are you sure you want to delete "{pageToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
