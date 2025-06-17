import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BotStatsProvider } from "@/contexts/bot-stats-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sterix - Discord Bot",
  description: "A powerful Discord bot for moderation, music, and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <BotStatsProvider>{children}</BotStatsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
