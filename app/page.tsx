import ImageSlider from '@/components/ImageSlider'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { FadeInWhenVisible } from '@/components/MagicUI'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ImageSlider />
      
      <div className="container mx-auto px-4 py-16">
        <FadeInWhenVisible>
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose PodcastAI?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Easy to Use",
                  description: "Create professional podcasts in minutes with our intuitive interface.",
                  image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                },
                {
                  title: "High-Quality Audio",
                  description: "Our AI technology ensures crystal-clear audio for your listeners.",
                  image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                },
                {
                  title: "Customizable Voices",
                  description: "Choose from a variety of AI voices to match your podcast's style.",
                  image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden">
                  <Image src={feature.image} alt={feature.title} width={500} height={300} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <section className="mb-20">
            <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Podcast Journey?</h2>
              <p className="mb-6">Join thousands of content creators who are already using PodcastAI to bring their ideas to life.</p>
              <Button asChild size="lg" className="animate-button bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                <Link href="/generator">Create Your Podcast Now</Link>
              </Button>
            </div>
          </section>
        </FadeInWhenVisible>
      </div>
    </div>
  )
}

