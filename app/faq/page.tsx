import { NavBar } from "@/components/nav-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// FAQ data
const faqs = [
  {
    question: "How do I add Sterix to my server?",
    answer:
      "You can add Sterix to your server by clicking the 'Add to Discord' button on our homepage and following the authorization process. Make sure you have the 'Manage Server' permission in the Discord server where you want to add Sterix.",
  },
  {
    question: "What are the premium features?",
    answer:
      "Premium features include Custom Role Commands, Ticket System, Nightmare Moderation, and Priority Support. You can find more details about these features on our Premium page.",
  },
  {
    question: "How do I set up auto-moderation?",
    answer:
      "You can set up auto-moderation by using the .automod command. First, enable it with .automod enable, then configure the punishment with .automod punishment, and set up a logging channel with .automod logging #channel. Check our documentation for detailed instructions.",
  },
  {
    question: "Is Sterix free to use?",
    answer:
      "Yes, Sterix is free to use with a generous set of features. We also offer premium features for users who want additional functionality.",
  },
  {
    question: "How do I report a bug?",
    answer:
      "You can report bugs by joining our support server and opening a ticket in the #bug-report channel. Please provide as much detail as possible, including steps to reproduce the issue.",
  },
  {
    question: "Can I customize the bot's prefix?",
    answer:
      "Currently, Sterix uses a fixed prefix (.) for all commands. We may add custom prefix support in a future update.",
  },
  {
    question: "How do I set up welcome messages?",
    answer:
      "You can set up welcome messages using the .welcome setup command. This will guide you through the process of selecting a welcome channel and customizing your welcome message.",
  },
  {
    question: "Does Sterix support multiple languages?",
    answer:
      "Currently, Sterix only supports English. We're considering adding support for additional languages in future updates.",
  },
  {
    question: "How can I get help with using Sterix?",
    answer:
      "You can get help by checking our documentation, joining our support server, or using the .help command in your Discord server.",
  },
  {
    question: "What permissions does Sterix need?",
    answer:
      "Sterix requires various permissions depending on the features you want to use. For basic functionality, it needs permissions like 'Send Messages', 'Read Message History', and 'Embed Links'. For moderation features, it needs additional permissions like 'Kick Members', 'Ban Members', and 'Manage Messages'.",
  },
]

export default function FaqPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#1a1b26] pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-gray-300">Find answers to common questions about Sterix</p>
            </div>

            <Card className="bg-[#252632]/80 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl">General Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-gray-700">
                      <AccordionTrigger className="text-white hover:text-[#9d7cff] hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
