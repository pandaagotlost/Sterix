"use client"

import { useState, useEffect } from "react"
import { setCookie, deleteCookie } from "@/lib/cookies"

// User roles
export type UserRole = "owner" | "admin" | "moderator" | "user"

// User type
export type User = {
  email: string
  name: string
  role: UserRole
  password: string // Store hashed password in a real app
}

// Hardcoded owner credentials (in a real app, these would be stored securely)
const OWNER_EMAIL = "panda@gmail.com"
const OWNER_PASSWORD = "pandaking"

// Initial users
const initialUsers: User[] = [
  { email: OWNER_EMAIL, name: "Panda", role: "owner", password: OWNER_PASSWORD },
  { email: "mod@example.com", name: "Moderator", role: "moderator", password: "password123" },
  { email: "poster@gmail.com", name: "MrPoster", role: "admin", password: "poster" },
]

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>(initialUsers)

  // Load users from localStorage on initial load
  useEffect(() => {
    // Check if user is authenticated on client side
    const authStatus = localStorage.getItem("sterix_admin_auth")
    const userEmail = localStorage.getItem("sterix_admin_email")

    // Load users from localStorage if available
    const savedUsers = localStorage.getItem("sterix_users")
    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers)
        setUsers(parsedUsers)

        // If authenticated, find the current user from the loaded users
        if (authStatus === "true" && userEmail) {
          const user = parsedUsers.find((u: User) => u.email === userEmail) || null
          setCurrentUser(user)
          setIsAuthenticated(!!user) // Only set as authenticated if user was found
        }
      } catch (error) {
        console.error("Error parsing users:", error)
        // If there's an error parsing, fall back to initial users
        if (authStatus === "true" && userEmail) {
          const user = initialUsers.find((u) => u.email === userEmail) || null
          setCurrentUser(user)
          setIsAuthenticated(!!user)
        }
      }
    } else {
      // If no saved users, use initial users
      if (authStatus === "true" && userEmail) {
        const user = initialUsers.find((u) => u.email === userEmail) || null
        setCurrentUser(user)
        setIsAuthenticated(!!user)
      }

      // Initialize localStorage with initial users
      localStorage.setItem("sterix_users", JSON.stringify(initialUsers))
    }

    setIsLoading(false)
  }, [])

  // Save users to localStorage when they change
  useEffect(() => {
    if (!isLoading) {
      // Only save after initial load to prevent overwriting
      localStorage.setItem("sterix_users", JSON.stringify(users))
    }
  }, [users, isLoading])

  const login = (email: string, password: string) => {
    // Check if user exists in the current users array
    const user = users.find((u) => u.email === email)

    if (user && user.password === password) {
      localStorage.setItem("sterix_admin_auth", "true")
      localStorage.setItem("sterix_admin_email", email)

      setCurrentUser(user)
      setIsAuthenticated(true)

      // Set auth cookie
      setCookie("sterix_auth", "true", 7)

      return true
    }

    return false
  }

  const logout = () => {
    localStorage.removeItem("sterix_admin_auth")
    localStorage.removeItem("sterix_admin_email")
    setCurrentUser(null)
    setIsAuthenticated(false)

    // Remove auth cookie
    deleteCookie("sterix_auth")
  }

  const addUser = (email: string, name: string, role: UserRole, password: string) => {
    // Only owner can add users
    if (currentUser?.role !== "owner") return false

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      return false
    }

    // Add new user
    const newUser = { email, name, role, password }
    const newUsers = [...users, newUser]
    setUsers(newUsers)

    // Save to localStorage immediately
    localStorage.setItem("sterix_users", JSON.stringify(newUsers))

    return true
  }

  const removeUser = (email: string) => {
    // Only owner can remove users
    if (currentUser?.role !== "owner") return false

    // Don't allow removing the owner
    if (email === OWNER_EMAIL) return false

    const newUsers = users.filter((u) => u.email !== email)
    setUsers(newUsers)

    // Save to localStorage immediately
    localStorage.setItem("sterix_users", JSON.stringify(newUsers))

    return true
  }

  const updateUserRole = (email: string, role: UserRole) => {
    // Only owner can change roles
    if (currentUser?.role !== "owner") return false

    // Don't allow changing the owner's role
    if (email === OWNER_EMAIL) return false

    const newUsers = users.map((u) => (u.email === email ? { ...u, role } : u))
    setUsers(newUsers)

    // Save to localStorage immediately
    localStorage.setItem("sterix_users", JSON.stringify(newUsers))

    return true
  }

  return {
    isAuthenticated,
    isLoading,
    currentUser,
    users,
    login,
    logout,
    addUser,
    removeUser,
    updateUserRole,
    isOwner: currentUser?.role === "owner",
    isAdmin: currentUser?.role === "admin" || currentUser?.role === "owner",
    isModerator: currentUser?.role === "moderator" || currentUser?.role === "admin" || currentUser?.role === "owner",
  }
}
