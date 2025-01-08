import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, FileText, Headphones, Clock, Palette, Download } from 'lucide-react'

export default function Features() {
  const features = [
    { title: "AI Voice Generation", description: "Choose from a variety of lifelike AI voices for your podcast.", icon: Mic },
    { title: "Text-to-Speech Conversion", description: "Convert your written content into natural-sounding speech.", icon: FileText },
    { title: "Multi-Voice Conversations", description: "Create engaging dialogues with multiple AI voices.", icon: Headphones },
    { title: "Time-Saving", description: "Generate podcasts in minutes, not hours.", icon: Clock },
    { title: "Customization Options", description: "Adjust tone, pace, and emphasis for perfect delivery.", icon: Palette },
    { title: "Multiple Export Formats", description: "Download your podcast in various audio and video formats.", icon: Download },
  ]

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <feature.icon className="mr-2 h-6 w-6" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

