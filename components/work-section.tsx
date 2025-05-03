"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Project {
  id: number
  title: string
  category: string
  thumbnail: string
  videoUrl?: string
  description: string
}

export default function WorkSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState("all")
  const videoRef = useRef<HTMLVideoElement>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "Modern Resturants",
      category: "resturants",
      thumbnail: "/placeholder.svg?height=600&width=800",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description: "A captivating brand campaign that showcases the company's values and mission.",
    },
    {
      id: 2,
      title: "Luxury Hotel",
      category: "hotel",
      thumbnail: "/placeholder.svg?height=600&width=800",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "An engaging interview series featuring industry leaders and innovators.",
    },
    {
      id: 3,
      title: "Cuisine Launch",
      category: "resturants",
      thumbnail: "/placeholder.svg?height=600&width=800",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      description: "A dynamic product launch video that highlights key features and benefits.",
    },
    {
      id: 4,
      title: "Stores",
      category: "retail",
      thumbnail: "/placeholder.svg?height=600&width=800",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      description: "A compelling documentary that tells a powerful story of transformation.",
    },
    {
      id: 5,
      title: "Luxury Look",
      category: "luxury-suites",
      thumbnail: "/placeholder.svg?height=600&width=800",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      description: "Comprehensive event coverage that captures the essence and highlights.",
    },
    {
      id: 6,
      title: "Dream Destination",
      category: "hotel",
      thumbnail: "/placeholder.svg?height=600&width=800",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      description: "A thought-provoking podcast series exploring contemporary issues.",
    },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  const openProject = (project: Project) => {
    setSelectedProject(project)
    // Reset video time if it was previously played
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  const closeProject = () => {
    setSelectedProject(null)
    // Pause video when modal is closed
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  const categories = [
    { id: "all", label: "All Work" },
    { id: "resturants", label: "resturants" },
    { id: "hotel", label: "hotel" },
    { id: "luxury-suites", label: "luxury suites" },
    { id: "retail", label: "retail" },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Explore our portfolio of creative projects across various industries and formats.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                className={cn("rounded-full", filter === category.id ? "bg-rose-600 hover:bg-rose-700" : "")}
                onClick={() => setFilter(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-xl overflow-hidden cursor-pointer aspect-video"
                onClick={() => openProject(project)}
              >
                <Image
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <div className="bg-rose-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Play className="h-8 w-8 fill-white text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-200 capitalize">{project.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={closeProject}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  src={selectedProject.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                  poster={selectedProject.thumbnail}
                />
                <button
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  onClick={closeProject}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                <div className="flex items-center">
                  <span className="text-xs font-medium uppercase tracking-wider bg-gray-100 rounded-full px-3 py-1">
                    {selectedProject.category}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
