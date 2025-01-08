import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">The Power of AI in Podcasting</h3>
              <p className="mb-4">
                PodcastAI harnesses cutting-edge artificial intelligence to revolutionize content creation. 
                Our technology transforms written text into engaging, natural-sounding podcasts, 
                opening up new possibilities for creators and businesses alike.
              </p>
              <Link href="/about" className="text-primary hover:underline">Learn more about our AI technology</Link>
            </div>
            <div className="flex justify-center">
              <Image 
                src='https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
                alt="AI Podcasting" 
                width={400} 
                height={300} 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PodcastAI</h3>
            <p className="text-sm mb-4">Transforming content into engaging podcasts with AI technology.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-primary"><Facebook size={20} /></a>
              <a href="#" className="text-foreground hover:text-primary"><Twitter size={20} /></a>
              <a href="#" className="text-foreground hover:text-primary"><Instagram size={20} /></a>
              <a href="#" className="text-foreground hover:text-primary"><Linkedin size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/features" className="hover:text-primary">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center"><Mail size={16} className="mr-2" /> info@podcastai.com</li>
              <li className="flex items-center"><Phone size={16} className="mr-2" /> +1 (555) 123-4567</li>
              <li className="flex items-center"><MapPin size={16} className="mr-2" /> 123 AI Street, New Mumbai City, Maharastra</li>
            </ul>
          </div>
        </div>
        <div className="py-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm">&copy; 2023 PodcastAI. All rights reserved. | Owner: Vivek Khedkar</p>
        </div>
      </div>
    </footer>
  )
}

