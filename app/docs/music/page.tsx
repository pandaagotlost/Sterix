import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MusicDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Music System</h1>
        <p className="text-lg text-gray-300">
          Sterix includes a high-quality music system with support for various sources and advanced controls.
        </p>
      </div>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Basic Music Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.play [song name or URL]</h3>
            <p className="text-gray-300">Plays a song from YouTube, Spotify, or SoundCloud.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.play despacito</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.stop</h3>
            <p className="text-gray-300">Stops the current playback and clears the queue.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.stop</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.skip</h3>
            <p className="text-gray-300">Skips the current song and plays the next one in the queue.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.skip</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Queue Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.queue</h3>
            <p className="text-gray-300">Shows the current music queue.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.queue</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.remove [position]</h3>
            <p className="text-gray-300">Removes a song from the queue at the specified position.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.remove 3</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.clear</h3>
            <p className="text-gray-300">Clears the entire music queue.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.clear</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#252632]/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Playback Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white">.pause</h3>
            <p className="text-gray-300">Pauses the current playback.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.pause</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.resume</h3>
            <p className="text-gray-300">Resumes the paused playback.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.resume</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white">.volume [1-100]</h3>
            <p className="text-gray-300">Adjusts the volume of the music playback.</p>
            <div className="bg-[#1a1b26] p-3 rounded-md">
              <code className="text-[#9d7cff]">.volume 75</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
