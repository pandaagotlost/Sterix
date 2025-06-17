"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

// Mock changelog entries
const initialChangelogs = [
  {
    id: 1,
    version: "1.2.0",
    date: "2024-03-15",
    title: "Major Feature Update",
    changes: [
      "Added ticket system for premium users",
      "Improved auto-moderation with new filters",
      "Fixed bugs in the music system",
      "Added new welcome message templates",
    ],
  },
  {
    id: 2,
    version: "1.1.0",
    date: "2024-02-01",
    title: "Performance Improvements",
    changes: [
      "Optimized bot response time",
      "Added custom role commands",
      "Fixed issues with the logging system",
      "Updated documentation",
    ],
  },
  {
    id: 3,
    version: "1.0.0",
    date: "2024-01-01",
    title: "Initial Release",
    changes: ["Launched Sterix bot", "Basic moderation features", "Music system", "Welcome messages"],
  },
]

export default function AdminChangelogPage() {
  const [changelogs, setChangelogs] = useState(initialChangelogs)
  const [selectedChangelog, setSelectedChangelog] = useState<number | null>(null)
  const [version, setVersion] = useState("")
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [changesText, setChangesText] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleChangelogSelect = (id: number) => {
    const changelog = changelogs.find((c) => c.id === id)
    if (changelog) {
      setSelectedChangelog(id)
      setVersion(changelog.version)
      setDate(changelog.date)
      setTitle(changelog.title)
      setChangesText(changelog.changes.join("\n"))
    }
  }

  const handleSave = () => {
    const changes = changesText.split("\n").filter((line) => line.trim() !== "")

    if (selectedChangelog) {
      // Update existing changelog
      setChangelogs(
        changelogs.map((changelog) =>
          changelog.id === selectedChangelog ? { ...changelog, version, date, title, changes } : changelog,
        ),
      )
    } else {
      // Add new changelog
      const newId = Math.max(0, ...changelogs.map((c) => c.id)) + 1
      setChangelogs([...changelogs, { id: newId, version, date, title, changes }])
    }

    setSuccessMessage("Changelog saved successfully! Changes will be reflected in /docs/changelog")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleNewChangelog = () => {
    setSelectedChangelog(null)
    setVersion("")
    setDate("")
    setTitle("")
    setChangesText("")
  }

  const handleDelete = () => {
    if (selectedChangelog) {
      setChangelogs(changelogs.filter((changelog) => changelog.id !== selectedChangelog))
      setSelectedChangelog(null)
      setVersion("")
      setDate("")
      setTitle("")
      setChangesText("")
      setSuccessMessage("Changelog deleted successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1b26]">
      <AdminSidebar />
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Changelog Editor</h1>
          <Button
            onClick={handleNewChangelog}
            className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff] flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Version
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white">Versions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {changelogs.map((changelog) => (
                  <div
                    key={changelog.id}
                    onClick={() => handleChangelogSelect(changelog.id)}
                    className={`p-2 rounded-md cursor-pointer ${
                      selectedChangelog === changelog.id ? "bg-[#9d7cff] text-white" : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <div className="font-medium">{changelog.version}</div>
                    <div className="text-xs opacity-70">{changelog.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-white">{selectedChangelog ? "Edit Version" : "New Version"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {successMessage && (
                <div className="bg-green-500/20 border border-green-500 text-green-200 p-3 rounded-md text-sm">
                  {successMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="version" className="text-gray-300">
                    Version
                  </Label>
                  <Input
                    id="version"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="e.g. 1.2.0"
                    className="bg-[#1a1b26] border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-gray-300">
                    Release Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-[#1a1b26] border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Major Feature Update"
                  className="bg-[#1a1b26] border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="changes" className="text-gray-300">
                  Changes (one per line)
                </Label>
                <Textarea
                  id="changes"
                  value={changesText}
                  onChange={(e) => setChangesText(e.target.value)}
                  placeholder="Added new feature&#10;Fixed bug&#10;Improved performance"
                  className="bg-[#1a1b26] border-gray-700 text-white min-h-[200px]"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff]"
                >
                  Save Changes
                </Button>

                {selectedChangelog && (
                  <Button onClick={handleDelete} variant="destructive" className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
