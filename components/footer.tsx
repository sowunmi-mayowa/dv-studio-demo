import Link from "next/link"
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-2">
                <svg viewBox="0 0 100 100" className="h-full w-full fill-current text-rose-600">
                  <path d="M20 20h60v60h-15v-45h-30v45h-15z" />
                  <path d="M50 50h15v15h-15z" />
                </svg>
              </div>
              <span className="text-xl font-bold">DV Studio</span>
            </div>
            <p className="text-gray-400 mb-4">
              Creating compelling visual stories that inspire and engage audiences across all platforms.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/what-we-do" className="text-gray-400 hover:text-white transition-colors">
                  What We Do
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="text-gray-400 hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/podcast" className="text-gray-400 hover:text-white transition-colors">
                  VPodcast
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/video-production" className="text-gray-400 hover:text-white transition-colors">
                  Concept and design innovation
                </Link>
              </li>
              <li>
                <Link href="/services/podcast-production" className="text-gray-400 hover:text-white transition-colors">
                  Hospitality Interior
                </Link>
              </li>
              <li>
                <Link href="/services/creative-direction" className="text-gray-400 hover:text-white transition-colors">
                 Brand develoopment and identity
                </Link>
              </li>
              <li>
                <Link href="/services/content-marketing" className="text-gray-400 hover:text-white transition-colors">
                  Procurement
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">123 Creative Avenue, Suite 101</p>
              <p className="mb-4">New York, NY 10001</p>
              <p className="mb-2">
                <span className="block">Phone: +1 (555) 123-4567</span>
              </p>
              <p className="mb-2">
                <span className="block">Email: info@dvstudio.com</span>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} DV Studio. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
