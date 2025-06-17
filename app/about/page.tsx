import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NavBar } from "@/components/nav-bar"
import { Shield, Bot, Zap, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#1a1b26] pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">About Sterix</h1>
              <p className="text-lg text-gray-300">
                Your Ultimate Discord Bot Solution for Server Management and Security
              </p>
            </div>

            <div className="grid gap-8">
              <Card className="bg-[#252632]/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    At Sterix, we're dedicated to providing Discord server owners and administrators with powerful,
                    reliable tools to manage and protect their communities. Our bot combines advanced security features
                    with intuitive management tools, making server administration effortless and effective.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#252632]/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Why Choose Sterix?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-[#9d7cff] mt-1" />
                      <div>
                        <h3 className="font-semibold text-white mb-2">Advanced Security</h3>
                        <p className="text-gray-300">
                          Protect your server with anti-raid, anti-nuke, and advanced moderation tools.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Bot className="h-6 w-6 text-[#9d7cff] mt-1" />
                      <div>
                        <h3 className="font-semibold text-white mb-2">Premium Features Free</h3>
                        <p className="text-gray-300">
                          Access features that other bots charge for, completely free of charge.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="h-6 w-6 text-[#9d7cff] mt-1" />
                      <div>
                        <h3 className="font-semibold text-white mb-2">Regular Updates</h3>
                        <p className="text-gray-300">
                          Benefit from continuous improvements and new features through regular updates.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-6 w-6 text-[#9d7cff] mt-1" />
                      <div>
                        <h3 className="font-semibold text-white mb-2">Dedicated Support</h3>
                        <p className="text-gray-300">Get help when you need it from our responsive support team.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#252632]/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Development Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Sterix is developed and maintained by PukarAdhikari, ensuring high-quality features and regular updates
                    to meet your server's needs.
                  </p>
                  <p className="text-gray-300">
                    Our team is passionate about creating tools that help Discord communities thrive, with a focus on
                    security, usability, and innovation.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#252632]/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Legal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    When using Sterix, please be aware of our policies that govern the use of our services:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button asChild className="bg-[#252632] hover:bg-[#2a2b36] border border-gray-700">
                      <Link href="/terms">Terms of Service</Link>
                    </Button>
                    <Button asChild className="bg-[#252632] hover:bg-[#2a2b36] border border-gray-700">
                      <Link href="/privacy">Privacy Policy</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff]"
              >
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
