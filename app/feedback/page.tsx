"use client"

import type React from "react"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"

export default function FeedbackPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [feedbackType, setFeedbackType] = useState("suggestion")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    const feedbackData = {
      name,
      email,
      type: feedbackType,
      message,
      date: new Date().toISOString(),
    }

    // Store in localStorage for demo purposes
    const existingFeedback = JSON.parse(localStorage.getItem("sterix_feedback") || "[]")
    localStorage.setItem("sterix_feedback", JSON.stringify([...existingFeedback, feedbackData]))

    // Show success message
    setSubmitted(true)

    // Reset form
    setName("")
    setEmail("")
    setFeedbackType("suggestion")
    setMessage("")

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#0d1117] pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Feedback</h1>

            <Card className="bg-[#161b22] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Share Your Thoughts</CardTitle>
                <CardDescription className="text-gray-300">
                  We value your feedback to improve Sterix. Let us know what you think!
                </CardDescription>
              </CardHeader>

              {submitted ? (
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                    <p className="text-gray-300">
                      Your feedback has been submitted successfully. We appreciate your input!
                    </p>
                    <Button onClick={() => setSubmitted(false)} className="mt-6 bg-violet-600 hover:bg-violet-700">
                      Submit Another Feedback
                    </Button>
                  </div>
                </CardContent>
              ) : (
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="bg-[#0d1117] border-gray-700 text-white"
                          placeholder="Your name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-[#0d1117] border-gray-700 text-white"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedbackType" className="text-gray-300">
                        Feedback Type
                      </Label>
                      <Select value={feedbackType} onValueChange={setFeedbackType}>
                        <SelectTrigger className="bg-[#0d1117] border-gray-700 text-white">
                          <SelectValue placeholder="Select feedback type" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#161b22] border-gray-700">
                          <SelectItem value="suggestion" className="text-white">
                            Suggestion
                          </SelectItem>
                          <SelectItem value="bug" className="text-white">
                            Bug Report
                          </SelectItem>
                          <SelectItem value="question" className="text-white">
                            Question
                          </SelectItem>
                          <SelectItem value="other" className="text-white">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-300">
                        Your Feedback
                      </Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="bg-[#0d1117] border-gray-700 text-white min-h-[150px]"
                        placeholder="Please share your thoughts, suggestions, or report issues..."
                      />
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
                      Submit Feedback
                    </Button>
                  </CardFooter>
                </form>
              )}
            </Card>

            <div className="mt-8 text-center text-gray-400 text-sm">
              <p>
                Your feedback helps us improve Sterix. For urgent issues, please join our{" "}
                <a href="https://discord.gg/sterix" className="text-violet-400 hover:underline">
                  Discord server
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
