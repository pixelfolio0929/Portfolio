"use client"

import type React from "react"

import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const projectVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function Section({
  id,
  className,
  children,
  delay = 0,
  variant = "default",
  fullscreen = false,
}: {
  id?: string
  className?: string
  children: React.ReactNode
  delay?: number
  variant?: "default" | "project"
  fullscreen?: boolean
}) {
  const selectedVariants = variant === "project" ? projectVariants : variants
  
  return (
    <section id={id} className={cn(fullscreen ? "w-full min-h-screen flex items-center justify-center px-4 py-16 md:py-24" : "mx-auto max-w-6xl px-4 py-16 md:py-24", className)}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={selectedVariants}
        transition={{ delay }}
        className={fullscreen ? "w-full max-w-6xl" : ""}
      >
        {children}
      </motion.div>
    </section>
  )
}