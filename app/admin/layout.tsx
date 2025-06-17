"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading, currentUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated and not already on login page
    if (!isLoading && !isAuthenticated && !window.location.pathname.includes("/admin/login")) {
      router.push("/admin/login")
    }

    // Check role-based permissions for specific pages
    if (!isLoading && isAuthenticated && currentUser) {
      const path = window.location.pathname

      // Pages that require admin or owner role
      const adminOnlyPages = ["/admin/documentation", "/admin/changelog"]
      if (
        adminOnlyPages.some((page) => path.startsWith(page)) &&
        currentUser.role !== "admin" &&
        currentUser.role !== "owner"
      ) {
        router.push("/admin/dashboard")
      }

      // Pages that require owner role
      const ownerOnlyPages = ["/admin/users"]
      if (ownerOnlyPages.some((page) => path.startsWith(page)) && currentUser.role !== "owner") {
        router.push("/admin/dashboard")
      }
    }
  }, [isAuthenticated, isLoading, router, currentUser])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // If not authenticated and not on login page, don't render children
  if (!isAuthenticated && !window.location.pathname.includes("/admin/login")) {
    return null
  }

  return <>{children}</>
}
