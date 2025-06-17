"use client" // Add this at the very top

import { useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Changelog data
const changelogs = [
  {
    version: "1.2.0",
    date: "March 15, 2024",
    title: "Major Feature Update",
    changes: [
      "Added ticket system for premium users",
      "Improved auto-moderation with new filters",
      "Fixed bugs in the music system",
      "Added new welcome message templates",
    ],
  },
  {
    version: "1.1.0",
    date: "February 1, 2024",
    title: "Performance Improvements",
    changes: [
      "Optimized bot response time",
      "Added custom role commands",
      "Fixed issues with the logging system",
      "Updated documentation",
    ],
  },
  {
    version: "1.0.0",
    date: "January 1, 2024",
    title: "Initial Release",
    changes: ["Launched Sterix bot", "Basic moderation features", "Music system", "Welcome messages"],
  },
]

export default function ChangelogPage() {
  useEffect(() => {
    // Google Analytics tracking
    const script = document.createElement("script")
    script.async = true
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-J856B2ES8B"
    document.body.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag("js", new Date())
    gtag("config", "G-J856B2ES8B")
  }, [])

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#1a1b26] pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Changelog</h1>
              <p className="text-lg text-gray-300">Track the evolution of Sterix with our version history</p>
            </div>

            <div className="space-y-8">
              {changelogs.map((changelog, index) => (
                <Card key={index} className="bg-[#252632]/80 border-gray-700">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <CardTitle className="text-white text-2xl">
                        {changelog.version} - {changelog.title}
                      </CardTitle>
                      <div className="text-gray-400 text-sm">{changelog.date}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {changelog.changes.map((change, changeIndex) => (
                        <li key={changeIndex} className="flex items-start gap-2 text-gray-300">
                          <div className="h-2 w-2 rounded-full bg-[#9d7cff] mt-2"></div>
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
