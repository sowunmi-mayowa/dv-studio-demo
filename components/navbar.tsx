"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Instagram, Facebook, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "What We Do", href: "/what-we-do" },
    { name: "Our Story", href: "/our-story" },
    { name: "VPodcast", href: "/podcast" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="relative z-10">
          <div className="flex items-center">
            <div className="relative h-12 mr-2">
              {/* <svg viewBox="0 0 100 100" className="h-full w-full fill-current text-rose-700">
                <path d="M20 20h60v60h-15v-45h-30v45h-15z" />
                <path d="M50 50h15v15h-15z" />
              </svg> */}
              <Image src="/logo.png" alt="Logo" width={500} height={500} className="h-full w-full" />
            </div>
            
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-rose-600",
                pathname === link.href ? "text-rose-600" : scrolled ? "text-gray-800" : "text-white",
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <Link href="https://instagram.com" aria-label="Instagram">
            <Instagram className={cn("h-5 w-5 transition-colors", scrolled ? "text-gray-800" : "text-white")} />
          </Link>
          <Link href="https://facebook.com" aria-label="Facebook">
            <Facebook className={cn("h-5 w-5 transition-colors", scrolled ? "text-gray-800" : "text-white")} />
          </Link>
          <Link href="https://linkedin.com" aria-label="LinkedIn">
            <Linkedin className={cn("h-5 w-5 transition-colors", scrolled ? "text-gray-800" : "text-white")} />
          </Link>
          <Button variant="default" className="bg-rose-600 hover:bg-rose-700 text-white">
            Get in Touch
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden z-20" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className={cn("h-6 w-6 transition-colors", scrolled ? "text-gray-800" : "text-white")} />
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-rose-700 flex flex-col justify-center items-center z-10 lg:hidden"
            >
              <nav className="flex flex-col items-center space-y-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-xl font-medium text-white hover:text-rose-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center space-x-6 mt-12">
                <Link href="https://instagram.com" aria-label="Instagram">
                  <Instagram className="h-6 w-6 text-white" />
                </Link>
                <Link href="https://facebook.com" aria-label="Facebook">
                  <Facebook className="h-6 w-6 text-white" />
                </Link>
                <Link href="https://linkedin.com" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6 text-white" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
