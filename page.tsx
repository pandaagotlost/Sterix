import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Page() {
  return (
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1619627173300506"
     crossorigin="anonymous"></script>
    <div className="min-h-screen bg-zinc-900">
      <header className="border-b border-zinc-800">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-white font-bold text-xl">Sterix</div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              Features
            </Button>
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              About
            </Button>
            <Button className="bg-violet-600 hover:bg-violet-700">Login</Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            It&apos;s time to use Sterix in your server.
          </h1>
          <p className="text-lg text-zinc-400 mb-8">
            Sterix is a powerful Discord bot built to level up your server experience. With premium features available
            for free, advanced moderation, and seamless integration, your server will never be the same.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-violet-600 hover:bg-violet-700 text-lg px-8" asChild>
              <Link href="https://discord.com/oauth2/authorize?client_id=1286376669770420304&permissions=2113268958&scope=bot%20applications.commands">
                Add to Discord
              </Link>
            </Button>
            <Button variant="outline" className="text-lg px-8 border-zinc-700 text-zinc-300 hover:bg-zinc-800" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Wave Pattern */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="fill-violet-600/30"
          />
          <path
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="fill-violet-600/20 translate-y-6"
          />
          <path
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="fill-violet-600/10 translate-y-12"
          />
        </svg>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-zinc-800/50 border-zinc-700 p-6">
            <h3 className="text-xl font-bold text-white mb-2">Anti-Nuke & Raid Protection</h3>
            <p className="text-zinc-400">Keep your server safe with advanced protection against raids and nukes.</p>
          </Card>
          <Card className="bg-zinc-800/50 border-zinc-700 p-6">
            <h3 className="text-xl font-bold text-white mb-2">Advanced Moderation</h3>
            <p className="text-zinc-400">Powerful moderation tools with auto-mod and detailed logging.</p>
          </Card>
          <Card className="bg-zinc-800/50 border-zinc-700 p-6">
            <h3 className="text-xl font-bold text-white mb-2">Music System</h3>
            <p className="text-zinc-400">High-quality music playback with playlist support and controls.</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
