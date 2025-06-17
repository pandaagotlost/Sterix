import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function TicketsDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Ticket System</h1>
        <p className="text-lg text-gray-300">
          The ticket system allows server administrators to create and manage support tickets.
        </p>
        <Badge className="bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 border-violet-500/50">
          Premium Feature
        </Badge>
      </div>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Ticket Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ticket</h3>
            <p className="text-gray-300">Open a new support ticket.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ticket</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ticket close</h3>
            <p className="text-gray-300">Close an active ticket.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ticket close</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ticket adduser</h3>
            <p className="text-gray-300">Add a user to the ticket, granting them access.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ticket adduser @User</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ticket removeuser</h3>
            <p className="text-gray-300">Remove a user from the ticket, revoking their access.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ticket removeuser @User</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ticket transcript</h3>
            <p className="text-gray-300">Generate and save a transcript of the ticket conversation.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ticket transcript</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.ticket panelcreate</h3>
            <p className="text-gray-300">Create a ticket panel for users to open tickets easily.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.ticket panelcreate</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Premium Feature</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            The Ticket System is a premium feature of Sterix that allows server administrators to create and manage
            support tickets. This feature is available exclusively to premium users.
          </p>

          <div className="space-y-2 mt-4">
            <h3 className="font-semibold text-white">Premium Features Include:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
              <li>Customizable ticket categories</li>
              <li>Ticket transcripts and logging</li>
              <li>Staff role assignments</li>
              <li>Ticket claiming system</li>
              <li>Advanced ticket management</li>
            </ul>
          </div>

          <div className="bg-[#1a1b26] p-4 rounded-md mt-6">
            <p className="text-gray-300">
              To access this feature, please upgrade to Sterix Premium. Visit our{" "}
              <Link href="/premium" className="text-[#9d7cff] hover:underline">
                Premium page
              </Link>{" "}
              for more information.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
