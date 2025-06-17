"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Trash2, Search, Mail } from "lucide-react"
import { format } from "date-fns"

type FeedbackItem = {
  name: string
  email: string
  type: string
  message: string
  date: string
}

export default function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([])
  const [filteredFeedback, setFilteredFeedback] = useState<FeedbackItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [successMessage, setSuccessMessage] = useState("")

  // Load feedback from localStorage
  useEffect(() => {
    const storedFeedback = JSON.parse(localStorage.getItem("sterix_feedback") || "[]")
    setFeedback(storedFeedback)
    setFilteredFeedback(storedFeedback)
  }, [])

  // Filter feedback based on search query and type
  useEffect(() => {
    let result = feedback

    // Filter by type
    if (filterType !== "all") {
      result = result.filter((item) => item.type === filterType)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          item.message.toLowerCase().includes(query),
      )
    }

    setFilteredFeedback(result)
  }, [feedback, searchQuery, filterType])

  const handleDelete = (index: number) => {
    const updatedFeedback = [...feedback]
    updatedFeedback.splice(index, 1)
    setFeedback(updatedFeedback)
    localStorage.setItem("sterix_feedback", JSON.stringify(updatedFeedback))

    setSuccessMessage("Feedback deleted successfully")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "suggestion":
        return "bg-blue-500/20 text-blue-300 border-blue-500/50"
      case "bug":
        return "bg-red-500/20 text-red-300 border-red-500/50"
      case "question":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/50"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/50"
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1b26]">
      <AdminSidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-white mb-6">User Feedback</h1>

        {successMessage && (
          <div className="bg-green-500/20 border border-green-500 text-green-200 p-3 rounded-md text-sm mb-6">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search feedback..."
              className="pl-10 bg-[#252632] border-gray-700 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="w-full md:w-64">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="bg-[#252632] border-gray-700 text-white">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-[#252632] border-gray-700">
                <SelectItem value="all" className="text-white">
                  All Types
                </SelectItem>
                <SelectItem value="suggestion" className="text-white">
                  Suggestions
                </SelectItem>
                <SelectItem value="bug" className="text-white">
                  Bug Reports
                </SelectItem>
                <SelectItem value="question" className="text-white">
                  Questions
                </SelectItem>
                <SelectItem value="other" className="text-white">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredFeedback.length === 0 ? (
          <Card className="bg-[#252632]/80 border-gray-700">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-gray-400 text-center">
                <p className="text-lg mb-2">No feedback found</p>
                <p className="text-sm">There are no feedback submissions matching your filters.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredFeedback.map((item, index) => (
              <Card key={index} className="bg-[#252632]/80 border-gray-700">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      {item.name}
                      <Badge className={getBadgeColor(item.type)}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${item.email}`} className="hover:text-white">
                        {item.email}
                      </a>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">{format(new Date(item.date), "MMM d, yyyy 'at' h:mm a")}</div>
                </CardHeader>
                <CardContent>
                  <div className="bg-[#1a1b26] p-4 rounded-md text-gray-300 mb-4">{item.message}</div>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      onClick={() => window.open(`mailto:${item.email}?subject=Re: Your Sterix Feedback`, "_blank")}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Reply via Email
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(index)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
