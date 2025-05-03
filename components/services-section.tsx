"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Film, Mic, PenTool, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const services: Service[] = [
    {
      icon: <Film className="h-8 w-8" />,
      title: "CONCEPTS & DESIGN INNOVATION",
      description:
        "Unleash boundless creativity through our Conceptual Design service. We transform ideas into sleek visuals for new, existing, or revitalized spaces, seamlessly bringing your brand narrative to life.",
      color: "bg-rose-500",
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "HOSPITALITY INTERIORS",
      description:
        "As specialists solely dedicated to hospitality interiors, we take immense pride in our profound understanding of this niche.",
      color: "bg-purple-500",
    },
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "BRAND DEVELOPMENT & IDENTITY",
      description: "We excel in crafting captivating visual identities that extend beyond traditional boundaries.",
      color: "bg-blue-500",
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "PROCUREMENT",
      description:
        "Streamline your project journey with our efficient procurement services. Having in-house design means seamless coordination of purchasing, design approvals, and budgets",
      color: "bg-amber-500",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of creative media services to help you connect with your audience.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              className={cn(
                "bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300",
                activeIndex === index ? "ring-2 ring-offset-2" : "",
              )}
              style={{
                ringColor: activeIndex === index && service.color ? service.color.replace("bg-", "") : "",
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className={cn("w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4", service.color)}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 capitalize">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
