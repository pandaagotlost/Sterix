import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VoiceDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Voice Commands</h1>
        <p className="text-lg text-gray-300">
          Sterix provides powerful voice channel management commands to help you control and manage voice channels in
          your server.
        </p>
      </div>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Voice Management Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.voice</h3>
            <p className="text-gray-300">Shows all voice-related commands.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.voice</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.voice kick</h3>
            <p className="text-gray-300">Kick a user from the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.voice kick @User</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.voice kickall</h3>
            <p className="text-gray-300">Kick all users from the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.voice kickall</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.voice mute</h3>
            <p className="text-gray-300">Mute a user in the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.voice mute @User</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.voice muteall</h3>
            <p className="text-gray-300">Mute all users in the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.voice muteall</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.voice unmute</h3>
            <p className="text-gray-300">Unmute a user in the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.voice unmute @User</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.voice unmuteall</h3>
            <p className="text-gray-300">Unmute all users in the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.voice unmuteall</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Advanced Voice Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.voice deafen</h3>
            <p className="text-gray-300">Deafen a user in the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.voice deafen @User</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.voice deafenall</h3>
            <p className="text-gray-300">Deafen all users in the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.voice deafenall</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.voice undeafen</h3>
            <p className="text-gray-300">Undeafen a user in the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.voice undeafen @User</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.voice undeafenall</h3>
            <p className="text-gray-300">Undeafen all users in the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.voice undeafenall</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.voice moveall</h3>
            <p className="text-gray-300">Move all users to another voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.voice moveall #voice-channel</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Voice Channel Roles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.vcrole bots add</h3>
            <p className="text-gray-300">Add a role for bots in the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.vcrole bots add @BotRole</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.vcrole bots remove</h3>
            <p className="text-gray-300">Remove a role for bots in the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.vcrole bots remove @BotRole</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.vcrole bots</h3>
            <p className="text-gray-300">View bot roles in the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.vcrole bots</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.vcrole config</h3>
            <p className="text-gray-300">Configure voice channel roles.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.vcrole config</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.vcrole humans add</h3>
            <p className="text-gray-300">Add a role for humans in the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.vcrole humans add @MemberRole</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.vcrole humans remove</h3>
            <p className="text-gray-300">Remove a role for humans in the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.vcrole humans remove @MemberRole</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.vcrole humans</h3>
            <p className="text-gray-300">View human roles in the voice channel.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.vcrole humans</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.vcrole reset</h3>
            <p className="text-gray-300">Reset all voice channel roles.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.vcrole reset</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.vcrole</h3>
            <p className="text-gray-300">Manage voice channel roles.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.vcrole</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
