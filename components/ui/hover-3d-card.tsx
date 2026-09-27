"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface Hover3DCardProps {
  children: React.ReactNode
  className?: string
  contentClassName?: string
  glare?: boolean
  maxRotate?: number
  depth?: number
}

export function Hover3DCard({
  children,
  className = "",
  contentClassName = "",
  glare = true,
  maxRotate = 5,
  depth = 25,
}: Hover3DCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 24, mass: 0.8 })
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 24, mass: 0.8 })

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    isReducedMotion ? ["0deg", "0deg"] : [`${maxRotate}deg`, `-${maxRotate}deg`]
  )
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    isReducedMotion ? ["0deg", "0deg"] : [`-${maxRotate}deg`, `${maxRotate}deg`]
  )
  const glareLeft = useTransform(mouseXSpring, [-0.5, 0.5], ["10%", "90%"])
  const glareTop = useTransform(mouseYSpring, [-0.5, 0.5], ["10%", "90%"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <div
      className={`perspective-1200 ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full h-full transition-all duration-300 ${contentClassName}`}
      >
        <div
          style={{
            transform: isReducedMotion ? "none" : `translateZ(${depth}px)`,
            transformStyle: "preserve-3d",
          }}
          className="w-full h-full relative z-10"
        >
          {children}
        </div>

        {/* Dynamic Studio Glare Reflection */}
        {glare && isHovered && !isReducedMotion && (
          <div className="absolute inset-0 z-20 pointer-events-none rounded-[inherit] overflow-hidden">
            <motion.div
              className="absolute opacity-15 dark:opacity-25 mix-blend-overlay pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, rgba(27,131,84,0.15) 30%, transparent 65%)",
                left: glareLeft,
                top: glareTop,
                transform: "translate(-50%, -50%)",
                width: "160%",
                height: "160%",
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}

