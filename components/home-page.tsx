"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#1a1b26] pt-16">
      <main className="container mx-auto px-4 py-16">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            It&apos;s time to use Sterix in your server.
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Sterix is a multi-purpose bot ready to skill up and boost up your Discord server. Also features
            auto-moderation, administration, music and much more!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs"
              className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff] text-white text-lg px-8 py-2 rounded-md cursor-pointer transition-all"
            >
              Get Started
            </Link>
            <Link
              href="https://discord.com/oauth2/authorize?client_id=1286376669770420304&permissions=2113268958&scope=bot%20applications.commands"
              className="bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white text-lg px-8 py-2 rounded-md cursor-pointer transition-all"
            >
              Add to Server
            </Link>
          </div>
        </motion.div>
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
            className="fill-[#9d7cff]/30"
          />
          <path
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="fill-[#9d7cff]/20 translate-y-6"
          />
          <path
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="fill-[#9d7cff]/10 translate-y-12"
          />
        </svg>
      </div>
    </div>
  )
}
