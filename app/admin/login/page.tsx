"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isAuthenticated, users } = useAuth()
  const router = useRouter()

  // If already authenticated, redirect to admin dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard")
    }
  }, [isAuthenticated, router])

  // Update the handleSubmit function to provide more specific error messages
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Check if email is empty
    if (!email.trim()) {
      setError("Email is required")
      return
    }

    // Check if password is empty
    if (!password.trim()) {
      setError("Password is required")
      return
    }

    const success = login(email, password)
    if (success) {
      router.push("/admin/dashboard")
    } else {
      // Check if user exists but password is wrong
      const userExists = users.some((u) => u.email === email)
      if (userExists) {
        setError("Invalid password. Please try again.")
      } else {
        setError("User not found. Please check your email or contact the owner.")
      }
    }
  }

  if (isAuthenticated) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Admin Login</CardTitle>
          <CardDescription className="text-gray-300">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-md text-sm">{error}</div>
            )}
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
                className="bg-[#1a1b26] border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#1a1b26] border-gray-700 text-white"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff]"
            >
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
