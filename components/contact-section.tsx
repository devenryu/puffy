"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Send, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useMobile } from "@/hooks/use-mobile"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(formRef, { once: false, margin: "-100px" })
  const isMobile = useMobile()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="contact" className="py-16 md:py-32 bg-caramel/10 relative overflow-hidden">
      {/* Animated background elements - reduced for mobile */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 w-64 h-64 rounded-full bg-pink/5"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-caramel/5"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-2"
          >
            <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-pink mx-auto" />
          </motion.div>
          <h2 className="font-cursive text-3xl md:text-5xl text-brown mb-3 md:mb-4">
            Let's Bake Something Sweet Together 🍰
          </h2>
          <p className="font-sans text-base md:text-lg text-brown/80 max-w-2xl mx-auto px-2">
            Have a question, want to place an order, or interested in a collaboration? Drop us a message!
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.form
            ref={formRef}
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-xl p-5 md:p-8 relative"
          >
            {/* Decorative elements - reduced for mobile */}
            {!isMobile && (
              <>
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 bg-pink/20 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-8 h-8 bg-caramel/30 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                />
              </>
            )}

            <motion.div variants={itemVariants} className="mb-4 md:mb-6">
              <Label htmlFor="name" className="font-sans text-brown mb-1 md:mb-2 block text-sm md:text-base">
                Your Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full border-caramel/30 focus:border-pink focus:ring-pink transition-all duration-300 rounded-lg text-sm md:text-base h-10 md:h-12"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4 md:mb-6">
              <Label htmlFor="email" className="font-sans text-brown mb-1 md:mb-2 block text-sm md:text-base">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full border-caramel/30 focus:border-pink focus:ring-pink transition-all duration-300 rounded-lg text-sm md:text-base h-10 md:h-12"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4 md:mb-6">
              <Label htmlFor="message" className="font-sans text-brown mb-1 md:mb-2 block text-sm md:text-base">
                Your Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Tell us what you're looking for..."
                required
                className="w-full min-h-[120px] md:min-h-[150px] border-caramel/30 focus:border-pink focus:ring-pink transition-all duration-300 rounded-lg text-sm md:text-base"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`bg-pink hover:bg-pink/90 text-white rounded-full px-6 py-2 md:px-8 md:py-6 text-base md:text-lg w-full transition-all duration-300 ${
                  isSubmitting ? "opacity-70" : ""
                } ${isSubmitted ? "bg-green-500 hover:bg-green-500" : ""}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 md:h-5 md:w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : isSubmitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <Heart className="h-4 w-4 md:h-5 md:w-5" />
                    Message Sent! ✨
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="h-4 w-4 md:h-5 md:w-5" />
                    Send Message
                  </span>
                )}
              </Button>
            </motion.div>

            {/* Success confetti animation */}
            <AnimatePresence>{isSubmitted && <SuccessConfetti />}</AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function SuccessConfetti() {
  const isMobile = useMobile()
  const particleCount = isMobile ? 15 : 30

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {[...Array(particleCount)].map((_, i) => {
        const size = Math.random() * 8 + 4
        const colors = ["#F8BBD0", "#FFCDD2", "#F0F4C3", "#B2EBF2", "#D1C4E9"]
        const color = colors[Math.floor(Math.random() * colors.length)]

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              top: "50%",
              left: "50%",
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
            }}
            animate={{
              x: (Math.random() - 0.5) * (isMobile ? 150 : 200),
              y: (Math.random() - 0.5) * (isMobile ? 150 : 200),
              scale: 1,
              opacity: [1, 0],
            }}
            transition={{
              duration: 1 + Math.random() * 1.5,
              ease: "easeOut",
            }}
          />
        )
      })}
    </motion.div>
  )
}
