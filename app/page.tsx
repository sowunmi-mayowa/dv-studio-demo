import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import WorkSection from "@/components/work-section"
import TestimonialsSection from "@/components/testimonials-section"
import PodcastSection from "@/components/podcast-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <TestimonialsSection />
      <PodcastSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
