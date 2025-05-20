"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import Image from "next/image"
import { timelineItems } from "@/data/timeline-content"
import { Cake, Instagram } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const isMobile = useMobile()
  
  return (
    <section id="about" ref={containerRef} className="relative py-16 md:py-32 bg-cream overflow-hidden">
      {/* Animated background elements - reduced for mobile */}
      {!isMobile && <AnimatedBackgroundElements />}

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-cursive text-3xl md:text-5xl text-brown mb-3 md:mb-4">Our Sweet Story</h2>
          <p className="font-sans text-base md:text-lg text-brown/80 max-w-2xl mx-auto px-2">
            Welcome to Puffistery, a cozy corner of the internet where dessert dreams come to life.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className={`absolute ${
              isMobile ? "left-4 top-0 bottom-0 w-1" : "left-1/2 top-0 bottom-0 w-1 -translate-x-1/2"
            } bg-caramel/30`}
            style={{
              scaleY: scrollYProgress,
              transformOrigin: "top",
            }}
          />

          {/* Timeline items */}
          <div className="relative z-10">
            {timelineItems.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-12 md:mt-16 max-w-3xl mx-auto px-4"
        >
          <p className="font-sans text-base md:text-lg text-brown/80 italic">
            "So whether you're here to watch satisfying dessert reels or just enjoy the fluff, we're happy you stopped
            by. 💕🍰"
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function AnimatedBackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating cupcakes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`cupcake-${i}`}
          className="absolute opacity-10"
          initial={{
            x: Math.random() * 100 - 50 + "%",
            y: Math.random() * 100 + "%",
            scale: 0.5 + Math.random() * 0.5,
          }}
          animate={{
            y: [null, "-100%"],
            rotate: [0, Math.random() > 0.5 ? 360 : -360],
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 3,
          }}
        >
          <Cake size={40} className="text-pink" />
        </motion.div>
      ))}

      {/* Swirling patterns */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`swirl-${i}`}
          className="absolute w-64 h-64 rounded-full border-4 border-dashed border-caramel/10"
          style={{
            top: `${20 + i * 30}%`,
            left: `${10 + i * 30}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 20 + i * 5,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            },
            scale: {
              duration: 8 + i * 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            },
          }}
        />
      ))}
    </div>
  )
}

function TimelineItem({ item, index }: { item: (typeof timelineItems)[0]; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const isEven = index % 2 === 0

  // Mobile timeline item
  if (isMobile) {
    return (
      <motion.div
        ref={itemRef}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-50px" }}
        className="ml-12 mb-16 relative"
      >
        {/* Timeline dot */}
        <motion.div
          className="absolute left-[-24px] top-0 w-5 h-5 bg-pink rounded-full border-4 border-cream z-20"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        />

        {/* Content container */}
        <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
          {/* Year badge */}
          <div className="bg-caramel/20 px-3 py-1 inline-block rounded-br-lg">
            <span className="text-sm font-medium text-brown">{item.year}</span>
          </div>

          {/* Instagram image with link */}
          <div className="p-3">
            <div className="relative rounded-lg overflow-hidden shadow-sm mb-4" style={{ aspectRatio: "1/1" }}>
              <a href={item.instagramLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <Image
                  src={item.fallbackImage}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center shadow-md">
                    <Instagram className="h-4 w-4 text-pink mr-2" />
                    <span className="text-sm font-medium text-brown">View on Instagram</span>
                  </div>
                </div>
              </a>
              
              {/* Instagram branding */}
              <div className="absolute top-2 left-2 flex items-center bg-white/80 backdrop-blur-sm rounded-full px-2 py-0.5 shadow-md">
                <Instagram className="h-3 w-3 text-pink mr-1" />
                <span className="text-xs font-medium text-brown">Instagram</span>
              </div>
            </div>

            {/* Content */}
            <h3 className="font-cursive text-2xl text-brown mb-2">{item.title}</h3>
            <p className="font-sans text-sm text-brown/80">{item.description}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  // Desktop timeline item
  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-row items-center mb-16 ${isEven ? "flex-row" : "flex-row-reverse"}`}
    >
      <div className="w-1/2 p-4">
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-xl overflow-hidden shadow-xl"
          style={{ aspectRatio: "1/1" }} // Square aspect ratio
        >
          <a href={item.instagramLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <Image
              src={item.fallbackImage}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center shadow-md">
                <Instagram className="h-4 w-4 text-pink mr-2" />
                <span className="text-sm font-medium text-brown">View on Instagram</span>
              </div>
            </div>
          </a>
            
          {/* Instagram branding */}
          <div className="absolute top-3 left-3 flex items-center bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
            <Instagram className="h-4 w-4 text-pink mr-1" />
            <span className="text-xs font-medium text-brown">Instagram</span>
          </div>
        </motion.div>
      </div>

      <div className="w-1/2 p-4">
        <motion.div
          className={`text-${isEven ? "left" : "right"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="inline-block bg-caramel/20 text-brown px-3 py-1 rounded-full text-sm font-sans mb-2"
            whileHover={{ scale: 1.05 }}
          >
            {item.year}
          </motion.div>
          <motion.h3
            className="font-cursive text-3xl text-brown mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {item.title}
          </motion.h3>
          <motion.p
            className="font-sans text-brown/80"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {item.description}
          </motion.p>
        </motion.div>
      </div>

      {/* Timeline dot with animation */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink rounded-full border-4 border-cream z-20"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2,
        }}
        whileHover={{ scale: 1.2 }}
      />
    </motion.div>
  )
}
