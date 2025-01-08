import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About PodcastAI</h1>
        <div className="mb-8">
          <Image 
            src="https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Podcast studio" 
            width={1470} 
            height={980} 
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>At PodcastAI, we&apos;re revolutionizing the way content creators produce podcasts. Our mission is to make high-quality podcast creation accessible to everyone, regardless of their technical skills or budget.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <p>PodcastAI uses cutting-edge artificial intelligence to convert your written content into natural sounding speech. Simply input your script, choose your preferred AI voices, and let our technology do the rest. The result is a professional-quality podcast ready for distribution.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p>We&apos;re a group of passionate technologists, audio engineers, and content creators who believe in the power of podcasting. Our diverse team brings together expertise from various fields to create a truly innovative product.</p>
          </section>
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <Button
              asChild
              className="px-6 py-3 text-lg rounded-md animate-button bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <Link href="/generator">Create Your Podcast Now</Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
