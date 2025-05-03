"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  quote: string
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=200&width=200",
      quote:
        "Working with DV Studio transformed our brand messaging. Their video production expertise helped us connect with our audience in ways we never thought possible.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CEO",
      company: "Innovate Inc.",
      avatar: "/placeholder.svg?height=200&width=200",
      quote:
        "The podcast series DV Studio produced for us has become our most valuable marketing asset. Their attention to detail and creative approach exceeded our expectations.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Event Manager",
      company: "Global Events",
      avatar: "/placeholder.svg?height=200&width=200",
      quote:
        "DV Studio's event coverage was exceptional. They captured the essence of our conference perfectly, providing us with content we've used across all our channels.",
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoplay) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length)
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Hear what our clients have to say about their experience working with us.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-2xl p-8 md:p-12 text-center"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-rose-600 rounded-full p-3">
                  <Quote className="h-6 w-6 text-white" />
                </div>
              </div>

              <p className="text-lg md:text-xl text-gray-200 mb-8 italic">"{testimonials[current].quote}"</p>

              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
                  <Image
                    src={testimonials[current].avatar || "/placeholder.svg"}
                    alt={testimonials[current].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold">{testimonials[current].name}</h4>
                <p className="text-gray-400">
                  {testimonials[current].role}, {testimonials[current].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === current ? "bg-rose-600" : "bg-gray-600 hover:bg-gray-500"
                }`}
                onClick={() => {
                  setAutoplay(false)
                  setCurrent(index)
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 md:translate-x-12">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
