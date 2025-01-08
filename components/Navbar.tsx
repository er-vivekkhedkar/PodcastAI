'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Mic, Home, Info, Settings, FileAudio, Menu, X, Mail } from 'lucide-react'
import { Button } from './ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Mic className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">PodcastAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-1 text-muted-foreground hover:text-primary">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/pricing" className="flex items-center space-x-1 text-muted-foreground hover:text-primary">
              <Settings className="h-4 w-4" />
              <span>Pricing</span>
            </Link>
            <Link href="/about" className="flex items-center space-x-1 text-muted-foreground hover:text-primary">
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link href="/contact" className="flex items-center space-x-1 text-muted-foreground hover:text-primary">
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            <Link href="/generator" className="flex items-center space-x-1 text-muted-foreground hover:text-primary">
              <FileAudio className="h-4 w-4" />
              <span>Generate Podcast</span>
            </Link>
            <ThemeToggle />
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/pricing"
              className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4" />
              <span>Pricing</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            <Link
              href="/generator"
              className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <FileAudio className="h-4 w-4" />
              <span>Generate Podcast</span>
            </Link>
            <div className="px-3 py-2">
              <ThemeToggle />
            </div>
            <div className="px-3 py-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

