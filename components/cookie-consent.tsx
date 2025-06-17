"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptAll = () => {
    document.cookie = "cookie-consent-all=true; max-age=31536000; path=/"
    localStorage.setItem("cookie-consent", "all")
    setShowConsent(false)
  }

  const acceptEssential = () => {
    document.cookie = "cookie-consent-essential=true; max-age=31536000; path=/"
    localStorage.setItem("cookie-consent", "essential")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#252632] border-t border-gray-700 p-4 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-white font-medium mb-1">Cookie Consent</h3>
          <p className="text-gray-300 text-sm">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our
            traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={acceptEssential}
          >
            Essential Only
          </Button>
          <Button
            className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff]"
            onClick={acceptAll}
          >
            Accept All
          </Button>
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white p-2 h-auto"
            onClick={acceptEssential}
            aria-label="Close"
          >
            <X size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}
