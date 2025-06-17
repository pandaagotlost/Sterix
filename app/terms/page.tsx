import { NavBar } from "@/components/nav-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function TermsPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#1a1b26] pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-[#252632]/80 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-3xl text-center">Sterix™ Bot Terms of Service</CardTitle>
                <p className="text-gray-400 text-center mt-2">Effective Date: October 1, 2024</p>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <p className="text-gray-300">
                  Welcome to Sterix™ Bot. By using our services, you agree to comply with and be bound by the following
                  Terms of Service. If you do not agree with these terms, you may not use the bot.
                </p>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">1. Acceptance of Terms</h2>
                <p className="text-gray-300">
                  By inviting and using Sterix™ Bot in your server, you acknowledge and accept these Terms of Service.
                  We reserve the right to update these terms at any time, and your continued use of the bot constitutes
                  acceptance of any modifications.
                </p>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">2. Use of the Bot</h2>
                <p className="text-gray-300">
                  You agree to use Sterix™ Bot in compliance with Discord's Terms of Service and Community Guidelines.
                  Prohibited actions include but are not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Using the bot for illegal or harmful activities.</li>
                  <li>Exploiting the bot's functionality for unintended purposes.</li>
                  <li>Attempting to disrupt or compromise the bot's operations.</li>
                  <li>Engaging in any form of harassment or abuse through the bot.</li>
                </ul>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">3. Server Administration Responsibilities</h2>
                <p className="text-gray-300">
                  Server owners and administrators who invite Sterix™ Bot are responsible for ensuring that the bot is
                  used appropriately within their servers. This includes:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Managing permissions granted to the bot.</li>
                  <li>Monitoring its use to prevent abuse.</li>
                  <li>Complying with applicable laws and regulations.</li>
                </ul>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">4. Data Collection and Privacy</h2>
                <p className="text-gray-300">
                  By using Sterix™ Bot, you acknowledge that certain data may be collected for functionality purposes.
                  Our{" "}
                  <Link href="/privacy" className="text-[#9d7cff] hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  details how we collect, use, and store data securely.
                </p>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">5. Service Availability</h2>
                <p className="text-gray-300">
                  We strive to maintain high availability for Sterix™ Bot; however, we do not guarantee uninterrupted or
                  error-free service. We reserve the right to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Modify or discontinue features at any time.</li>
                  <li>Temporarily suspend service for maintenance or updates.</li>
                  <li>Restrict access to certain features as needed.</li>
                </ul>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">6. Termination of Service</h2>
                <p className="text-gray-300">
                  We reserve the right to remove access to Sterix™ Bot from any user or server at our discretion,
                  particularly in cases of:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Violation of these Terms of Service.</li>
                  <li>Abuse, exploitation, or malicious use of the bot.</li>
                  <li>Any actions that may cause harm to our services or users.</li>
                </ul>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">7. Limitation of Liability</h2>
                <p className="text-gray-300">
                  Sterix™ Bot and its developers are not liable for any damages, losses, or issues arising from the use
                  of the bot. Users assume full responsibility for how the bot is used within their servers.
                </p>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">8. Changes to These Terms</h2>
                <p className="text-gray-300">
                  We may update these Terms of Service periodically. Users are encouraged to review them regularly.
                  Continued use of the bot after updates signifies acceptance of the revised terms.
                </p>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">9. Contact Us</h2>
                <p className="text-gray-300">
                  If you have any questions or concerns regarding these Terms of Service, please contact our support
                  team through official channels.
                </p>

                <p className="text-gray-300 mt-6">
                  Thank you for using Sterix™ Bot. We appreciate your support and cooperation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
