"use client";

import type React from "react"
import Image from "next/image";
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubscribed(true)
        setEmail("")
      } else {
        setError(result.error || "Failed to subscribe")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Logo + Contact Info */}
          <div>
            <div className="mb-6">
              <Link href="/" className="flex items-center hover:opacity-90 transition">
                <div className="relative w-36 h-9">
                  <Image
                    src="/img/logo.png"
                    alt="Advance America Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Contact Info Group - Phone, Email, Address in same row style */}
            <div className="mb-6 space-y-2">
              <div>
                <Link
                  href="tel:+19092848722"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  (513)-879-0070
                </Link>
              </div>
              <div>
                <Link
                  href="mailto:support@advanceamericaneft.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  support@advanceamericaneft.com
                </Link>
              </div>
              <div>
                <p className="text-gray-300">275 Battery Street. Suite 2300. San Francisco CA, 94104</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/accessibility-statement" className="text-gray-300 hover:text-white transition-colors">
                Accessibility Statement
              </Link>
            </div>
          </div>

          {/* Right Column: Newsletter Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Subscribe to Our Newsletter</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h4 className="text-xl font-medium mb-4">Join our mailing list</h4>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email*
                </label>
                <div className="flex gap-3">
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    disabled={isLoading}
                    className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 px-6">
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="subscribe-check" className="rounded border-gray-700 bg-gray-800" required />
                <label htmlFor="subscribe-check" className="text-sm text-gray-300">
                  I want to subscribe to your mailing list
                </label>
              </div>
            </form>

            {error && <p className="text-red-400 mt-4">{error}</p>}
            {isSubscribed && <p className="text-green-400 mt-4">Thank you for subscribing!</p>}

            <div className="mt-8 text-sm text-gray-400">
              &copy; 2025 by Advance America. Powered and secured by{" "}
              <Link href="#" className="text-white hover:text-blue-400">
                FTC
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}