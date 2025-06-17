import { NavBar } from "@/components/nav-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Ticket, Shield, Bot, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const premiumFeatures = [
  {
    title: "Advanced Moderation",
    description: "Enhanced moderation tools to keep your server safe and secure with advanced features.",
    icon: Shield,
    details: [
      "Advanced auto-moderation filters",
      "Custom punishment escalation",
      "Temporary and permanent bans with appeal system",
      "Detailed moderation logs and history",
    ],
  },
  {
    title: "Priority Support",
    description: "Get priority support and assistance from our team for any issues or questions.",
    icon: Bot,
    details: [
      "24/7 priority support",
      "Dedicated support channel",
      "Feature request priority",
      "Early access to new features",
    ],
  },
  {
    title: "Advanced Ticket System",
    description: "Advanced ticket system for support, applications, and user requests with full customization.",
    icon: Ticket,
    details: [
      "Customizable ticket categories",
      "Ticket transcripts and logging",
      "Staff role assignments",
      "Ticket claiming system",
    ],
  },
  {
    title: "Custom Branding",
    description: "Customize the bot's responses and embeds with your server's branding.",
    icon: Crown,
    details: ["Custom embed colors", "Custom bot responses", "Custom welcome images", "Branded ticket panels"],
  },
]

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    description: "Essential features for small to medium servers",
    features: [
      "Basic moderation commands",
      "Simple auto-moderation",
      "Standard logging",
      "Basic ticket system",
      "Up to 5 reaction roles",
      "Community support",
    ],
    cta: "Get Started",
    ctaLink: "/docs",
    popular: false,
  },
  {
    name: "Premium",
    price: "$4.99",
    period: "per month",
    description: "Advanced features for growing communities",
    features: [
      "All Basic features",
      "Advanced moderation tools",
      "Enhanced auto-moderation",
      "Comprehensive logging",
      "Advanced ticket system",
      "Unlimited reaction roles",
      "Custom role management",
      "Priority support",
    ],
    cta: "Upgrade Now",
    ctaLink:
      "https://discord.com/oauth2/authorize?client_id=1286376669770420304&permissions=2113268958&scope=bot%20applications.commands",
    popular: true,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "per month",
    description: "Premium features for large communities",
    features: [
      "All Premium features",
      "Custom branding",
      "White-labeled bot responses",
      "Advanced analytics",
      "API access",
      "Dedicated support agent",
      "Custom command creation",
      "Multiple server support",
    ],
    cta: "Go Pro",
    ctaLink:
      "https://discord.com/oauth2/authorize?client_id=1286376669770420304&permissions=2113268958&scope=bot%20applications.commands&premium=pro",
    popular: false,
  },
]

export default function PremiumPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-discord-primary pt-16">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-discord-blurple/20 text-discord-blurple border-discord-blurple/30 mb-4">Premium</Badge>
            <h1 className="text-4xl font-bold text-discord-header mb-4">Upgrade Your Discord Experience</h1>
            <p className="text-lg text-discord-normal mb-8">
              Unlock the full potential of Sterix with premium features designed to enhance your Discord server
              experience.
            </p>
          </div>

          {/* Features Section */}
          <div className="grid gap-8 mb-16">
            {premiumFeatures.map((feature, index) => (
              <Card key={index} className="bg-discord-secondary border-discord-tertiary overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-discord-blurple/5 rounded-bl-full"></div>
                <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                  <div className="p-2 rounded-lg bg-discord-blurple/10 text-discord-blurple">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-discord-header text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-discord-normal mt-1">{feature.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-discord-green flex-shrink-0" />
                        <p className="text-discord-normal">{detail}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Section */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-discord-header text-center mb-12">Choose Your Plan</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-discord-secondary border ${plan.popular ? "border-discord-blurple" : "border-discord-tertiary"} rounded-lg overflow-hidden`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 left-0 bg-discord-blurple text-white text-xs font-medium py-1 text-center">
                      MOST POPULAR
                    </div>
                  )}

                  <div className={`p-6 ${plan.popular ? "pt-8" : ""}`}>
                    <h3 className="text-xl font-bold text-discord-header mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-discord-header">{plan.price}</span>
                      {plan.period && <span className="text-discord-muted ml-1">{plan.period}</span>}
                    </div>
                    <p className="text-discord-normal mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-discord-green mt-0.5 flex-shrink-0" />
                          <span className="text-discord-normal">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={plan.ctaLink}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
                        plan.popular
                          ? "bg-discord-blurple hover:bg-discord-blurple/90 text-white"
                          : "bg-discord-tertiary hover:bg-discord-tertiary/90 text-discord-normal"
                      }`}
                    >
                      {plan.cta} {plan.popular && <ArrowRight className="h-4 w-4" />}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-24">
            <h2 className="text-3xl font-bold text-discord-header text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="discord-card p-6">
                <h3 className="text-xl font-semibold text-discord-header mb-2">How do I upgrade to Premium?</h3>
                <p className="text-discord-normal">
                  You can upgrade to Premium by clicking the "Upgrade Now" button above or by using the{" "}
                  <code className="bg-discord-tertiary px-2 py-0.5 rounded">/premium</code> command in your server.
                </p>
              </div>

              <div className="discord-card p-6">
                <h3 className="text-xl font-semibold text-discord-header mb-2">
                  Can I transfer Premium between servers?
                </h3>
                <p className="text-discord-normal">
                  Yes, you can transfer your Premium subscription to another server at any time using the{" "}
                  <code className="bg-discord-tertiary px-2 py-0.5 rounded">/premium transfer</code> command.
                </p>
              </div>

              <div className="discord-card p-6">
                <h3 className="text-xl font-semibold text-discord-header mb-2">Do you offer refunds?</h3>
                <p className="text-discord-normal">
                  We offer a 7-day money-back guarantee if you're not satisfied with your Premium subscription. Contact
                  our support team for assistance.
                </p>
              </div>

              <div className="discord-card p-6">
                <h3 className="text-xl font-semibold text-discord-header mb-2">What payment methods do you accept?</h3>
                <p className="text-discord-normal">
                  We accept credit/debit cards, PayPal, and various cryptocurrency options for payment.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto mt-24 text-center">
            <div className="discord-card p-8 bg-gradient-to-br from-discord-blurple/20 to-discord-tertiary border-discord-blurple/30">
              <h2 className="text-2xl font-bold text-discord-header mb-4">Ready to Upgrade Your Server?</h2>
              <p className="text-discord-normal mb-6">
                Join thousands of server owners who have enhanced their Discord experience with Sterix Premium.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="https://discord.com/oauth2/authorize?client_id=1286376669770420304&permissions=2113268958&scope=bot%20applications.commands"
                  className="bg-discord-blurple hover:bg-discord-blurple/90 text-white px-8 py-3 rounded-md font-medium transition-colors flex items-center gap-2"
                >
                  Upgrade Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/docs/premium"
                  className="bg-discord-tertiary hover:bg-discord-tertiary/90 text-discord-normal px-8 py-3 rounded-md font-medium transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
