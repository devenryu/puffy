"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { CakeSlice } from "lucide-react"

export default function LoadingAnimation() {
  const animationContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only import and run lottie on the client side
    const loadLottie = async () => {
      if (typeof window !== "undefined" && animationContainer.current) {
        const lottie = (await import("lottie-web")).default
        const cupcakeAnimation = (await import("@/animations/cupcake-animation")).default

        const anim = lottie.loadAnimation({
          container: animationContainer.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: cupcakeAnimation,
        })

        return () => anim.destroy()
      }
    }

    loadLottie()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Floating cupcakes around the main animation */}
      <div className="relative">
        {/* Left cupcake */}
        <motion.div
          className="absolute -left-16 top-1/2 -translate-y-1/2 text-pink"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <CakeSlice size={32} />
        </motion.div>

        {/* Right cupcake */}
        <motion.div
          className="absolute -right-16 top-1/2 -translate-y-1/2 text-pink"
          animate={{
            y: [10, -10, 10],
            rotate: [0, -10, 0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <CakeSlice size={32} />
        </motion.div>

        {/* Top cupcake */}
        <motion.div
          className="absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 text-pink/80"
          animate={{
            y: [-5, 5, -5],
            x: [5, -5, 5],
            rotate: [5, -5, 5],
            scale: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <CakeSlice size={28} />
        </motion.div>

        {/* Bottom cupcake */}
        <motion.div
          className="absolute bottom-0 translate-y-full left-1/2 -translate-x-1/2 text-pink/80"
          animate={{
            y: [5, -5, 5],
            x: [-5, 5, -5],
            rotate: [-5, 5, -5],
            scale: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <CakeSlice size={28} />
        </motion.div>

        {/* Main animation container - keeping this exactly the same */}
        <motion.div
          ref={animationContainer}
          className="w-64 h-64"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Text - keeping this exactly the same */}
      <motion.p
        className="font-cursive text-2xl text-brown mt-4"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        Baking something sweet...
      </motion.p>
    </div>
  )
}
