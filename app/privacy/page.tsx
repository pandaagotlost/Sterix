import { NavBar } from "@/components/nav-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#1a1b26] pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-[#252632]/80 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-3xl text-center">Sterix™ Bot Privacy Policy</CardTitle>
                <p className="text-gray-400 text-center mt-2">Effective Date: October 1, 2024</p>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <p className="text-gray-300">
                  At Sterix™ Bot, we are committed to protecting your privacy. This Privacy Policy explains how we
                  collect, use, store, and safeguard your information when you use our bot. By using Sterix™ Bot, you
                  agree to the terms outlined in this policy.
                </p>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">1. Information We Collect</h2>
                <p className="text-gray-300">
                  When you interact with Sterix™ Bot, we may collect the following types of information:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>
                    <strong className="text-white">User Information:</strong> This includes your Discord username, user
                    ID, and relevant details required for bot functionality.
                  </li>
                  <li>
                    <strong className="text-white">Server Information:</strong> Server IDs, channel IDs, and role
                    configurations that help in customizing bot features.
                  </li>
                  <li>
                    <strong className="text-white">Message Logs (Limited):</strong> Certain bot commands, such as
                    moderation logs and custom command execution, may require temporary storage of messages to enhance
                    server management features.
                  </li>
                  <li>
                    <strong className="text-white">Usage Data:</strong> Information related to how you use the bot,
                    including command execution history and feature preferences, to improve the user experience.
                  </li>
                </ul>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">2. How We Use Your Information</h2>
                <p className="text-gray-300">
                  The information collected is used solely for the purpose of providing and improving bot
                  functionalities, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Enabling moderation tools such as message logging, automated actions, and user restrictions.</li>
                  <li>Managing custom commands, ticketing systems, and advanced logging.</li>
                  <li>Ensuring the bot functions properly within your server.</li>
                  <li>Enhancing security measures and preventing unauthorized access.</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  We <strong className="text-white">do not</strong> share, sell, or distribute any collected data to
                  third parties. Your data is strictly used within the bot's functionality and remains confidential.
                </p>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">3. Data Storage and Security</h2>
                <p className="text-gray-300">
                  We take appropriate measures to store and protect your data securely. Our security practices include:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>
                    <strong className="text-white">Encryption:</strong> Sensitive information is encrypted to prevent
                    unauthorized access.
                  </li>
                  <li>
                    <strong className="text-white">Secure Servers:</strong> We store data on protected servers with
                    restricted access.
                  </li>
                  <li>
                    <strong className="text-white">Regular Audits:</strong> Periodic security checks and updates are
                    performed to ensure compliance with data protection standards.
                  </li>
                </ul>
                <p className="text-gray-300 mt-4">
                  Stored data is retained only as long as necessary to fulfill its intended purpose. Unused or outdated
                  data may be automatically deleted to ensure privacy.
                </p>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">4. User Control and Data Removal</h2>
                <p className="text-gray-300">
                  You have the right to manage the data associated with your use of Sterix™ Bot. Server administrators
                  can:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Request data removal via Sterix's support team.</li>
                  <li>Clear stored logs using designated bot commands.</li>
                  <li>Configure privacy settings to limit data collection within their servers.</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  If you wish to remove specific data, please contact our support team for assistance.
                </p>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">5. Third-Party Services</h2>
                <p className="text-gray-300">
                  Sterix™ Bot may integrate with third-party APIs (such as Discord's API) to deliver its
                  functionalities. These services operate under their respective privacy policies, and we encourage
                  users to review them.
                </p>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">6. Updates to This Policy</h2>
                <p className="text-gray-300">
                  We reserve the right to update this Privacy Policy to reflect changes in our practices or legal
                  requirements. Any updates will be communicated through official channels, and continued use of the bot
                  constitutes acceptance of the revised policy.
                </p>

                <h2 className="text-xl font-bold text-white mt-6 mb-3">7. Contact Us</h2>
                <p className="text-gray-300">
                  If you have any questions or concerns regarding this Privacy Policy, please reach out to our support
                  team through our official channels.
                </p>

                <p className="text-gray-300 mt-6">
                  Thank you for using Sterix™ Bot. Your privacy and security remain our top priority.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
