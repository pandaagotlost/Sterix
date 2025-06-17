"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams?.get("error")

  return (
    <Card className="w-full max-w-[400px] bg-[#252632]/80 border-gray-700">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-white">Authentication Error</CardTitle>
        <CardDescription className="text-center text-gray-300">
          {error === "AccessDenied"
            ? "You need to grant all required permissions to continue."
            : "An error occurred during authentication."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-300 text-center">
          Please make sure you grant access to your email and profile information when logging in.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild className="bg-[#9d7cff] hover:bg-[#8a63ff] cursor-pointer">
          <Link href="/">Back to Home</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function ErrorPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center p-4 pt-16">
        <Suspense fallback={<div className="text-white animate-pulse">Loading...</div>}>
          <ErrorContent />
        </Suspense>
      </div>
    </>
  )
}
