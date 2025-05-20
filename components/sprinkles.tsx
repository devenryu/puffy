"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

type Sprinkle = {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  color: string
  delay: number
  duration: number
  shape: "circle" | "square" | "triangle" | "star"
}

export default function Sprinkles({ reducedForMobile = false }: { reducedForMobile?: boolean }) {
  const [sprinkles, setSprinkles] = useState<Sprinkle[]>([])
  const isMobile = useMobile()

  useEffect(() => {
    const colors = ["#F8BBD0", "#FFCDD2", "#F0F4C3", "#B2EBF2", "#D1C4E9"]
    const shapes = ["circle", "square", "triangle", "star"]
    const newSprinkles: Sprinkle[] = []

    // Reduce number of sprinkles on mobile if requested
    const sprinkleCount = isMobile && reducedForMobile ? 20 : 40

    for (let i = 0; i < sprinkleCount; i++) {
      newSprinkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (isMobile ? 8 : 10) + (isMobile ? 3 : 5),
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
        shape: shapes[Math.floor(Math.random() * shapes.length)] as Sprinkle["shape"],
      })
    }

    setSprinkles(newSprinkles)
  }, [isMobile, reducedForMobile])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sprinkles.map((sprinkle) => (
        <motion.div
          key={sprinkle.id}
          className="absolute"
          style={{
            left: `${sprinkle.x}%`,
            top: `${sprinkle.y}%`,
            width: `${sprinkle.size}px`,
            height: `${sprinkle.size}px`,
            backgroundColor: sprinkle.color,
            borderRadius: sprinkle.shape === "circle" ? "50%" : sprinkle.shape === "square" ? "2px" : "0",
            clipPath:
              sprinkle.shape === "triangle"
                ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                : sprinkle.shape === "star"
                  ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                  : "none",
            originX: "50%",
            originY: "50%",
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.sin(sprinkle.id) * 50],
            opacity: [0, 1, 0],
            rotate: [0, sprinkle.rotation],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: isMobile ? sprinkle.duration * 0.7 : sprinkle.duration, // Slightly faster on mobile
            delay: sprinkle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
