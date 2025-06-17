import Link from "next/link"
import { ArrowRight, Shield, Zap, MessageSquare, BarChart3, Check, Bot, Star, Sparkles } from "lucide-react"

function HeroStats() {
  return (
    <div className="text-center mb-8">
      <p className="text-lg md:text-xl text-white/90 mb-2">
        Serving <span className="font-bold text-white">500K+</span> members
      </p>
      <p className="text-lg md:text-xl text-white/90">
        in <span className="font-bold text-white">1K+</span> servers
      </p>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7c3aed] via-[#a855f7] to-[#c084fc] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-white/10 rounded-full blur-lg"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-32 left-1/4 w-16 h-16 border-2 border-white/20 rotate-45"></div>
        <div className="absolute bottom-32 right-1/4 w-12 h-12 border-2 border-white/20 rotate-12"></div>
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-white/20 rounded-full"></div>
        <div className="absolute top-1/3 right-16 w-6 h-6 bg-white/20 rounded-full"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
          {/* Left Side - Bot Character */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-[#5865f2] to-[#7c3aed] rounded-full flex items-center justify-center shadow-2xl">
                <Bot className="w-32 h-32 text-white" />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Star className="w-6 h-6 text-yellow-800" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-5 h-5 text-pink-800" />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Sterix
              <br />
              <span className="text-4xl md:text-5xl font-normal">Dashboard</span>
            </h1>

            <HeroStats />

            <Link
              href="https://discord.com/oauth2/authorize?client_id=1286376669770420304&permissions=2113268958&scope=bot%20applications.commands"
              className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 border border-white/30 hover:border-white/50"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
              Add to Discord
            </Link>
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-auto"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="#1f2937"
          />
        </svg>
      </div>

      {/* Features Section */}
      <section className="bg-[#1f2937] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Why Sterix?</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Advanced Moderation */}
              <div className="bg-[#374151] rounded-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#5865f2] rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Advanced Moderation</h3>
                  <span className="bg-[#5865f2] text-white px-2 py-1 rounded text-sm font-medium">[docs]</span>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Comprehensive ban, kick, mute, and warning systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Temporary punishments with automatic expiration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Detailed moderation logs and audit trails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Mass moderation tools for handling raids</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Custom punishment reasons and duration presets</span>
                  </li>
                </ul>
              </div>

              {/* Auto-Moderation */}
              <div className="bg-[#374151] rounded-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#7c3aed] rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Auto-Moderation</h3>
                  <span className="bg-[#7c3aed] text-white px-2 py-1 rounded text-sm font-medium">[docs]</span>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Smart spam detection and prevention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Customizable word filters and blacklists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Anti-raid protection with join rate limiting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Discord invite link detection and removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Automatic escalation based on violation history</span>
                  </li>
                </ul>
              </div>

              {/* Ticket System */}
              <div className="bg-[#374151] rounded-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#f59e0b] rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Support Tickets</h3>
                  <span className="bg-[#f59e0b] text-white px-2 py-1 rounded text-sm font-medium">[docs]</span>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Easy ticket creation with reaction buttons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Multiple ticket categories and departments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Automatic ticket transcripts and archiving</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Staff assignment and notification system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Customizable ticket panels and messages</span>
                  </li>
                </ul>
              </div>

              {/* Comprehensive Logging */}
              <div className="bg-[#374151] rounded-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#10b981] rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Log Everything</h3>
                  <span className="bg-[#10b981] text-white px-2 py-1 rounded text-sm font-medium">[docs]</span>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Message events: Deleted, edited, and purged messages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Member events: Joins, leaves, role changes, and updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Server events: Channel changes, role modifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Voice activity tracking and monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Customizable log channels and filtering</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16">
              <h3 className="text-3xl font-bold text-white mb-6">Ready to get started?</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="https://discord.com/oauth2/authorize?client_id=1286376669770420304&permissions=2113268958&scope=bot%20applications.commands"
                  className="bg-[#5865f2] hover:bg-[#5865f2]/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  Add to Discord <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/docs"
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
