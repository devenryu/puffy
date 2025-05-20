"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Instagram, CakeSlice, Heart, Star, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import Sprinkles from "@/components/sprinkles"
import { useMobile } from "@/hooks/use-mobile"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })
  const isMobile = useMobile()

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  // Typing animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const title = "Welcome to Puffistery"

  return (
    <motion.section
      id="home"
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      style={{ opacity, scale, y }}
    >
      {/* Background animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-caramel/30 to-cream"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 20,
            ease: "linear",
          }}
        />

        {/* Steam/swirl effect - reduced for mobile */}
        <div className="absolute inset-0">
          {[...Array(isMobile ? 3 : 5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-full opacity-10"
              style={{
                backgroundImage: "url('/steam.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                top: `${i * 20}%`,
                left: `${i * 5}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0.1, 0],
                scale: [1, 1.5],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 10 + i * 2,
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Reduced sprinkles for mobile */}
      <Sprinkles reducedForMobile={true} />

      {/* Floating icons - reduced for mobile */}
      {!isMobile && <FloatingIcons />}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          className="mb-6 md:mb-8 relative w-full max-w-xs md:max-w-md aspect-square rounded-full overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Image src="/logopuff.jpg" alt="Featured dessert" fill className="object-cover" priority />

          {/* Pulsing highlight effect */}
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-full"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.h1
          className="font-cursive text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-brown mb-4 md:mb-6 px-2"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {title.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="font-sans text-base sm:text-lg md:text-xl text-brown/80 max-w-2xl mb-6 md:mb-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          A cozy corner of the internet where dessert dreams come to life
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            asChild
            className="bg-pink hover:bg-pink/90 text-white rounded-full px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg"
          >
            <Link href="https://www.instagram.com/puffistery/" target="_blank" className="flex items-center gap-2">
              <Instagram className="h-5 w-5" />
              Follow on Instagram 🍰
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="text-brown/60"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

function FloatingIcons() {
  const icons = [
    { Icon: CakeSlice, color: "text-pink", size: 24 },
    { Icon: Heart, color: "text-pink/70", size: 20 },
    { Icon: Star, color: "text-caramel", size: 16 },
    { Icon: Coffee, color: "text-brown/60", size: 22 },
    { Icon: CakeSlice, color: "text-pink/80", size: 18 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map((item, i) => {
        const { Icon, color, size } = item
        const posX = 20 + i * 15
        const delay = i * 0.7

        return (
          <motion.div
            key={i}
            className={`absolute ${color}`}
            style={{ left: `${posX}%`, top: "30%" }}
            animate={{
              y: [0, -100, -50, -150, -100, -200],
              x: [0, 50, -30, 20, -50, 30],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0, 1, 0.8, 0.6, 0.4, 0],
            }}
            transition={{
              duration: 15,
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              repeat: Number.POSITIVE_INFINITY,
              delay: delay,
              ease: "easeInOut",
            }}
          >
            <Icon size={size} />
          </motion.div>
        )
      })}

      {icons.map((item, i) => {
        const { Icon, color, size } = item
        const posX = 50 + i * 10
        const delay = i * 0.5 + 2

        return (
          <motion.div
            key={`right-${i}`}
            className={`absolute ${color}`}
            style={{ left: `${posX}%`, top: "40%" }}
            animate={{
              y: [0, -80, -40, -120, -60, -180],
              x: [0, -30, 20, -40, 30, -20],
              rotate: [0, -90, -180, -270, -360],
              opacity: [0, 1, 0.8, 0.6, 0.4, 0],
            }}
            transition={{
              duration: 12,
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              repeat: Number.POSITIVE_INFINITY,
              delay: delay,
              ease: "easeInOut",
            }}
          >
            <Icon size={size} />
          </motion.div>
        )
      })}
    </div>
  )
}
