"use client"

import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { AlertCircle, CheckCircle, XCircle, Server, Clock } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

interface ActionRequest {
  id: string
  type: "leave_server"
  guildId: string
  guildName: string
  requestedBy: string
  requestedAt: string
  status: "pending" | "approved" | "rejected"
}

export default function AdminRequestsPage() {
  const { isOwner, currentUser } = useAuth()
  const { toast } = useToast()
  const [actionRequests, setActionRequests] = useState<ActionRequest[]>([])
  const [isProcessing, setIsProcessing] = useState<string | null>(null)
  const [token, setToken] = useState("")

  // Load action requests from localStorage
  useEffect(() => {
    const storedRequests = localStorage.getItem("sterix_action_requests")
    if (storedRequests) {
      try {
        setActionRequests(JSON.parse(storedRequests))
      } catch (error) {
        console.error("Error parsing action requests:", error)
      }
    }

    // Get token if available
    const storedToken = localStorage.getItem("sterix_bot_token")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  // Save action requests to localStorage when they change
  useEffect(() => {
    localStorage.setItem("sterix_action_requests", JSON.stringify(actionRequests))
  }, [actionRequests])

  const handleApproveRequest = async (request: ActionRequest) => {
    if (!isOwner) return

    setIsProcessing(request.id)

    try {
      if (request.type === "leave_server") {
        // If we have a token, actually execute the leave
        if (token) {
          const response = await fetch("/api/discord/guild/leave", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, guildId: request.guildId }),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Failed to leave guild")
          }
        }

        // Update the request status
        setActionRequests((prev) => prev.map((r) => (r.id === request.id ? { ...r, status: "approved" } : r)))

        toast({
          title: "Request Approved",
          description: `Bot has left the server: ${request.guildName}`,
        })
      }
    } catch (error) {
      console.error("Error processing request:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process request",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(null)
    }
  }

  const handleRejectRequest = (request: ActionRequest) => {
    if (!isOwner) return

    setIsProcessing(request.id)

    try {
      // Update the request status
      setActionRequests((prev) => prev.map((r) => (r.id === request.id ? { ...r, status: "rejected" } : r)))

      toast({
        title: "Request Rejected",
        description: `Request to leave server "${request.guildName}" has been rejected.`,
      })
    } catch (error) {
      console.error("Error rejecting request:", error)
    } finally {
      setIsProcessing(null)
    }
  }

  const handleClearCompleted = () => {
    setActionRequests((prev) => prev.filter((r) => r.status === "pending"))

    toast({
      title: "Cleared",
      description: "Completed requests have been cleared.",
    })
  }

  // If not owner, show access denied message
  if (!isOwner) {
    return (
      <div className="min-h-screen bg-[#1a1b26]">
        <AdminSidebar />
        <div className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Action Requests</h1>

          <Card className="bg-[#252632]/80 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Access Denied
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Only the owner can access the action requests page. You are currently logged in as {currentUser?.name} (
                {currentUser?.role}).
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Action Requests</h1>

          {actionRequests.some((r) => r.status !== "pending") && (
            <Button
              variant="outline"
              onClick={handleClearCompleted}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Clear Completed
            </Button>
          )}
        </div>

        {actionRequests.length === 0 ? (
          <Card className="bg-[#252632]/80 border-gray-700">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <CheckCircle className="h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-white text-xl font-medium mb-2">No Pending Requests</h3>
              <p className="text-gray-400 text-center max-w-md">
                There are no action requests waiting for your approval.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {actionRequests.map((request) => (
              <Card
                key={request.id}
                className={`bg-[#252632]/80 border-gray-700 ${
                  request.status === "approved"
                    ? "border-l-4 border-l-green-500"
                    : request.status === "rejected"
                      ? "border-l-4 border-l-red-500"
                      : ""
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-white">
                        {request.type === "leave_server" ? "Leave Server Request" : "Action Request"}
                      </CardTitle>
                      <Badge
                        className={
                          request.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/50"
                            : request.status === "approved"
                              ? "bg-green-500/20 text-green-300 border-green-500/50"
                              : "bg-red-500/20 text-red-300 border-red-500/50"
                        }
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Clock className="h-4 w-4" />
                      {format(new Date(request.requestedAt), "MMM d, yyyy 'at' h:mm a")}
                    </div>
                  </div>
                  <CardDescription className="text-gray-300">Requested by: {request.requestedBy}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-[#1a1b26] rounded-lg">
                      <Server className="h-5 w-5 text-[#9d7cff]" />
                      <div>
                        <h3 className="text-white font-medium">{request.guildName}</h3>
                        <p className="text-gray-400 text-sm">Server ID: {request.guildId}</p>
                      </div>
                    </div>

                    {request.status === "pending" ? (
                      <div className="flex justify-end gap-3">
                        <Button
                          variant="outline"
                          onClick={() => handleRejectRequest(request)}
                          disabled={isProcessing === request.id}
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          onClick={() => handleApproveRequest(request)}
                          disabled={isProcessing === request.id}
                          className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff]"
                        >
                          {isProcessing === request.id ? (
                            <span className="flex items-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="p-3 rounded-lg bg-[#1a1b26]">
                        <p className="text-gray-300">
                          This request was {request.status === "approved" ? "approved" : "rejected"} by the owner.
                        </p>
                      </div>
                    )}
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
