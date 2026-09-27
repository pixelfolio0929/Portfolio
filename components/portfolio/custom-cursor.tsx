"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useLanguage } from "./language-context"

export function CustomCursor() {
  const { isRTL } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "project" | "view">("default")
  const [label, setLabel] = useState("")

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Silky smooth trailing spring
  const springConfig = { stiffness: 350, damping: 28, mass: 0.6 }
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Disable on touch / mobile devices or reduced motion
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const mediaReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (isTouch || mediaReduced) return

    setMounted(true)

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", moveCursor, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Detect contextual target states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const projectCard = target.closest("[data-cursor='project']") || target.closest(".project-card-interactive")
      const liveBtn = target.closest("[data-cursor='view']")
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer")

      if (projectCard) {
        setCursorType("project")
        setLabel(isRTL ? "استعراض" : "VIEW")
      } else if (liveBtn) {
        setCursorType("view")
        setLabel(isRTL ? "فتح" : "OPEN")
      } else if (isClickable) {
        setCursorType("pointer")
        setLabel("")
      } else {
        setCursorType("default")
        setLabel("")
      }
    }

    window.addEventListener("mouseover", handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [cursorX, cursorY, isVisible, isRTL])

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] hidden lg:block overflow-hidden">
      {/* Outer Spring Glow Ring / Contextual Badge */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "project" ? 68 : cursorType === "pointer" ? 44 : 26,
          height: cursorType === "project" ? 68 : cursorType === "pointer" ? 44 : 26,
          borderColor:
            cursorType === "project"
              ? "rgba(27, 131, 84, 0.9)"
              : cursorType === "pointer"
              ? "rgba(27, 131, 84, 0.7)"
              : "rgba(100, 116, 139, 0.4)",
          backgroundColor:
            cursorType === "project"
              ? "rgba(27, 131, 84, 0.9)"
              : cursorType === "pointer"
              ? "rgba(27, 131, 84, 0.12)"
              : "rgba(255, 255, 255, 0)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="fixed rounded-full border border-solid pointer-events-none flex items-center justify-center backdrop-blur-[1px] shadow-sm"
      >
        {label && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase select-none">
            {label}
          </span>
        )}
      </motion.div>

      {/* Center Precision Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "project" ? 0 : cursorType === "pointer" ? 6 : 4,
          height: cursorType === "project" ? 0 : cursorType === "pointer" ? 6 : 4,
          backgroundColor: "hsl(var(--primary))",
          opacity: isVisible && cursorType !== "project" ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className="fixed rounded-full pointer-events-none"
      />
    </div>
  )
}
