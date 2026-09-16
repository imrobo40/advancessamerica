"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/apply-now", label: "Apply Now" },
    { href: "/about", label: "About" },
    // { href: "/bank-verification", label: "Bank Authentication" },
    { href: "/faq", label: "FAQ" },
    { href: "#", label: "More" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-lg backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium text-white hover:text-blue-300 transition-colors duration-200 text-sm tracking-wide relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-blue-300" />
            ) : (
              <Menu className="w-6 h-6 text-blue-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-gray-700 bg-gray-800 bg-opacity-95 shadow-xl backdrop-blur-sm"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-6 py-3 text-gray-200 hover:text-white hover:bg-gray-700 transition-colors duration-200 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-6 pt-2 pb-4">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full py-6 text-sm"
                  >
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
