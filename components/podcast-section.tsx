"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface Episode {
  id: number
  title: string
  description: string
  duration: string
  date: string
  image: string
  audioUrl: string
}

export default function PodcastSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const episodes: Episode[] = [
    {
      id: 1,
      title: "The Future of Digital Media",
      description:
        "Exploring emerging trends and technologies shaping the future of digital media and content creation.",
      duration: "32:45",
      date: "May 15, 2023",
      image: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/podcast1.mp3",
    },
    {
      id: 2,
      title: "Storytelling in the Digital Age",
      description: "How storytelling techniques have evolved in the era of social media and short-form content.",
      duration: "28:12",
      date: "April 22, 2023",
      image: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/podcast2.mp3",
    },
    {
      id: 3,
      title: "Building a Personal Brand",
      description:
        "Strategies for creators to build and maintain an authentic personal brand in a crowded digital landscape.",
      duration: "35:18",
      date: "March 10, 2023",
      image: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/podcast3.mp3",
    },
  ]

  const playEpisode = (episode: Episode) => {
    if (currentEpisode?.id === episode.id) {
      togglePlayPause()
    } else {
      setCurrentEpisode(episode)
      setIsPlaying(true)
      // In a real implementation, you would set the audio source here
      // and play the audio
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">VPodcast</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Listen to our podcast series featuring conversations with industry experts and thought leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {episodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow",
                currentEpisode?.id === episode.id ? "ring-2 ring-rose-500 ring-offset-2" : "",
              )}
            >
              <div className="relative aspect-square">
                <Image src={episode.image || "/placeholder.svg"} alt={episode.title} fill className="object-cover" />
                <button
                  className={cn(
                    "absolute inset-0 flex items-center justify-center bg-black/30 transition-colors",
                    currentEpisode?.id === episode.id && isPlaying ? "bg-black/50" : "hover:bg-black/50",
                  )}
                  onClick={() => playEpisode(episode)}
                >
                  <div className="bg-white rounded-full p-4">
                    {currentEpisode?.id === episode.id && isPlaying ? (
                      <Pause className="h-8 w-8 text-rose-600 fill-rose-600" />
                    ) : (
                      <Play className="h-8 w-8 text-rose-600 fill-rose-600" />
                    )}
                  </div>
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">{episode.date}</span>
                  <span className="text-sm text-gray-500">{episode.duration}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{episode.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{episode.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Audio Player */}
        {currentEpisode && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-40"
          >
            <audio
              ref={audioRef}
              src={currentEpisode.audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={currentEpisode.image || "/placeholder.svg"}
                    alt={currentEpisode.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="max-w-xs">
                  <h4 className="font-medium text-sm line-clamp-1">{currentEpisode.title}</h4>
                  <p className="text-xs text-gray-500">VPodcast</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col md:flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-gray-700 hover:text-rose-600"
                    onClick={() => {
                      /* Previous episode logic */
                    }}
                  >
                    <SkipBack className="h-5 w-5" />
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    className={cn(
                      "rounded-full h-10 w-10",
                      isPlaying ? "bg-rose-600 text-white hover:bg-rose-700" : "hover:text-rose-600",
                    )}
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-gray-700 hover:text-rose-600"
                    onClick={() => {
                      /* Next episode logic */
                    }}
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex-1 flex items-center gap-2 w-full md:w-auto">
                  <span className="text-xs text-gray-500 w-10 text-right">{formatTime(currentTime)}</span>
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={1}
                    className="w-full md:w-80"
                    onValueChange={handleSliderChange}
                  />
                  <span className="text-xs text-gray-500 w-10">{formatTime(duration)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-gray-500" />
                  <Slider defaultValue={[70]} max={100} step={1} className="w-24" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
