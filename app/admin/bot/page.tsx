"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { BotLogin } from "@/components/bot-login"
import { useAuth } from "@/lib/auth"
import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminBotPage() {
  const { isAdmin, isOwner, currentUser } = useAuth()

  // If not admin or owner, show access denied message
  if (!isAdmin && !isOwner) {
    return (
      <div className="min-h-screen bg-[#1a1b26]">
        <AdminSidebar />
        <div className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Bot Management</h1>

          <Card className="bg-[#252632]/80 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Access Denied
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Only administrators and owners can access the bot management page. You are currently logged in as{" "}
                {currentUser?.name} ({currentUser?.role}).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1b26]">
      <AdminSidebar />
      <div className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Bot Management</h1>
        <BotLogin />
      </div>
    </div>
  )
}
