"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

// Mock FAQ entries
const initialFaqs = [
  {
    id: 1,
    question: "How do I add Sterix to my server?",
    answer:
      'You can add Sterix to your server by clicking the "Add to Discord" button on our homepage and following the authorization process.',
  },
  {
    id: 2,
    question: "What are the premium features?",
    answer: "Premium features include Custom Role Commands, Ticket System, Nightmare Moderation, and Priority Support.",
  },
  {
    id: 3,
    question: "How do I set up auto-moderation?",
    answer:
      "You can set up auto-moderation by using the .automod command. Check our documentation for detailed instructions.",
  },
]

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState(initialFaqs)
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleFaqSelect = (id: number) => {
    const faq = faqs.find((f) => f.id === id)
    if (faq) {
      setSelectedFaq(id)
      setQuestion(faq.question)
      setAnswer(faq.answer)
    }
  }

  const handleSave = () => {
    if (selectedFaq) {
      // Update existing FAQ
      setFaqs(faqs.map((faq) => (faq.id === selectedFaq ? { ...faq, question, answer } : faq)))
    } else {
      // Add new FAQ
      const newId = Math.max(0, ...faqs.map((f) => f.id)) + 1
      setFaqs([...faqs, { id: newId, question, answer }])
    }

    setSuccessMessage("FAQ saved successfully! Changes will be reflected in /docs/faq")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleNewFaq = () => {
    setSelectedFaq(null)
    setQuestion("")
    setAnswer("")
  }

  const handleDelete = () => {
    if (selectedFaq) {
      setFaqs(faqs.filter((faq) => faq.id !== selectedFaq))
      setSelectedFaq(null)
      setQuestion("")
      setAnswer("")
      setSuccessMessage("FAQ deleted successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1b26]">
      <AdminSidebar />
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">FAQ Editor</h1>
          <Button
            onClick={handleNewFaq}
            className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff] flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New FAQ
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white">FAQ Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    onClick={() => handleFaqSelect(faq.id)}
                    className={`p-2 rounded-md cursor-pointer ${
                      selectedFaq === faq.id ? "bg-[#9d7cff] text-white" : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {faq.question.length > 30 ? faq.question.substring(0, 30) + "..." : faq.question}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-white">{selectedFaq ? "Edit FAQ" : "New FAQ"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {successMessage && (
                <div className="bg-green-500/20 border border-green-500 text-green-200 p-3 rounded-md text-sm">
                  {successMessage}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="question" className="text-gray-300">
                  Question
                </Label>
                <Input
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="bg-[#1a1b26] border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer" className="text-gray-300">
                  Answer
                </Label>
                <Textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
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

                {selectedFaq && (
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
