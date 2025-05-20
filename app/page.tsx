"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoadingAnimation from "@/components/loading-animation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Navbar from "@/components/navbar"

export default function Home() {
  const [loading, setLoading] = useState(true)

  console.log("Rendering page on", typeof window === "undefined" ? "server" : "client")

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-cream overflow-hidden">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.5,
              filter: "blur(10px)",
              transition: { duration: 1, ease: "easeInOut" },
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-cream"
          >
            <LoadingAnimation />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <Navbar />
            <HeroSection />
            <AboutSection />
            <ContactSection />

            <footer className="bg-brown text-cream py-8 px-4 text-center">
              <div className="max-w-5xl mx-auto">
                <p className="font-sans text-sm">© {new Date().getFullYear()} Puffistery. All rights sweet. 🧁</p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
