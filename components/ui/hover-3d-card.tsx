"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface Hover3DCardProps {
  children: React.ReactNode
  className?: string
  contentClassName?: string
  glare?: boolean
}

export function Hover3DCard({ children, className = "", contentClassName = "", glare = true }: Hover3DCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  // ⚠️ ALL hooks must be called unconditionally at the top level
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])
  const glareLeft = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"])
  const glareTop = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"])

  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
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
    <div className={className} style={{ perspective: 1200 }}>
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
        className={`relative w-full h-full transition-shadow duration-300 ${contentClassName}`}
      >
        <div
          style={{
            transform: "translateZ(30px)",
            transformStyle: "preserve-3d",
          }}
          className="w-full h-full relative z-10"
        >
          {children}
        </div>

        {/* Glare effect — only rendered when hovered, but hooks are always called above */}
        {glare && isHovered && (
          <div className="absolute inset-0 z-20 pointer-events-none rounded-[inherit] overflow-hidden">
            <motion.div
              className="absolute opacity-20 mix-blend-overlay"
              style={{
                background: "radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, transparent 60%)",
                left: glareLeft,
                top: glareTop,
                transform: "translate(-50%, -50%)",
                width: "200%",
                height: "200%",
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}
