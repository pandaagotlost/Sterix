import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const features = [
  { name: "General", icon: "🌟" },
  { name: "Moderation", icon: "🛡️" },
  { name: "Automod", icon: "🤖" },
  { name: "Security", icon: "🔒" },
  { name: "Welcomer", icon: "👋" },
  { name: "Voice", icon: "🎙️" },
  { name: "Giveaway", icon: "🎉" },
  { name: "Utility", icon: "🛠️" },
  { name: "Management", icon: "📊" },
]

export function FeaturesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-cyan-300 hover:text-cyan-100">
          Features
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-cyan-900 text-cyan-100">
        <DialogHeader>
          <DialogTitle>Sterix Features</DialogTitle>
          <DialogDescription className="text-cyan-300">Explore the powerful features of Sterix</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {features.map((feature) => (
            <div key={feature.name} className="flex items-center gap-2">
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-lg">{feature.name}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
