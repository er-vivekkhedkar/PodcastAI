import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Check, X } from 'lucide-react'

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        { name: "1 hour of AI-generated audio per month", included: true },
        { name: "1 AI voice", included: true },
        { name: "MP3 export", included: true },
        { name: "Email support", included: false },
        { name: "Access to premium voices", included: false },
        { name: "Background music", included: false },
      ]
    },
    {
      name: "Basic",
      price: "$9.99",
      features: [
        { name: "5 hours of AI-generated audio per month", included: true },
        { name: "2 AI voices", included: true },
        { name: "MP3 export", included: true },
        { name: "Email support", included: true },
        { name: "Access to premium voices", included: false },
        { name: "Background music", included: true },
      ]
    },
    {
      name: "Pro",
      price: "$24.99",
      features: [
        { name: "20 hours of AI-generated audio per month", included: true },
        { name: "5 AI voices", included: true },
        { name: "MP3 and WAV export", included: true },
        { name: "Priority email support", included: true },
        { name: "Access to premium voices", included: true },
        { name: "Background music", included: true },
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        { name: "Unlimited AI-generated audio", included: true },
        { name: "All available AI voices", included: true },
        { name: "All export formats", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "API access", included: true },
        { name: "Custom voice training", included: true },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Pricing Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <Check className="text-green-500 mr-2" size={16} />
                      ) : (
                        <X className="text-red-500 mr-2" size={16} />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full mt-auto bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                  <Link href="/generator">Choose {plan.name}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

