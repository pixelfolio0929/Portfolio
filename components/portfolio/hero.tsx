"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { Sparkles, ArrowUpRight, Code, Figma, Terminal } from "lucide-react"

const ROLES = ["React", "Vue", "UI/UX Design", "Figma"]

export function Hero() {
  const [text, setText] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Interactive mouse follow glow coordinates
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const current = ROLES[roleIndex]
    const speed = deleting ? 40 : 80
    const timeout = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setText(current.slice(0, charIndex + 1))
        setCharIndex((c) => c + 1)
      } else if (!deleting && charIndex === current.length) {
        setDeleting(true)
        setTimeout(() => {}, 1000)
      } else if (deleting && charIndex > 0) {
        setText(current.slice(0, charIndex - 1))
        setCharIndex((c) => c - 1)
      } else {
        setDeleting(false)
        setRoleIndex((r) => (r + 1) % ROLES.length)
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, roleIndex])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const { left, top } = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden min-h-screen flex items-center justify-center bg-background pt-16 group"
    >
      {/* 3D Cyberpunk Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-20 dark:opacity-50" />

      {/* Dynamic Lighting Mouse Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(27, 131, 84, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Static Glow Lights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-primary/5 dark:from-primary/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-l from-slate-200/50 dark:from-purple-500/10 to-transparent blur-[100px] rounded-full pointer-events-none" />

      {/* Futuristic Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/5 w-2 h-2 rounded-full bg-primary/40 blur-[1px]"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, -15, 0],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
          className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-purple-500/30 blur-[2px]"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-cyan-500/40 blur-[1px]"
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24 text-center z-10 flex flex-col items-center">
        {/* Animated Pill Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white dark:bg-card/60 px-4 py-1.5 text-xs font-mono font-medium text-muted-foreground backdrop-blur-md shadow-sm dark:shadow-2xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span>Available for UI Engineering in 2026</span>
        </motion.div>

        {/* Hello & Name Reveal */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 text-lg font-mono font-medium text-muted-foreground tracking-wide"
        >
          {"Hello, I'm"}{" "}
          <span className="font-bold text-foreground relative">
            Mohammad Sinan
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent" />
          </span>
        </motion.p>

        {/* Main Heading Text Reveal */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground mb-2 leading-none"
          >
            UI ENGINEER
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-foreground via-muted-foreground to-foreground/50 bg-clip-text text-transparent"
          >
            Developer & Designer
          </motion.h2>
        </div>

        {/* Subtitle */}
        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-balance text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-8"
        >
          Specializing in React, Vue, HTML, CSS, JavaScript, Figma, Framer & Adobe Tools. Crafting robust, high-performance UI architectures.
        </motion.h4>

        {/* Interactive Dynamic Tech Stack Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="inline-flex items-center gap-3 rounded-xl border border-border bg-white dark:bg-card/80 px-5 py-3 text-sm font-mono backdrop-blur-md shadow-md dark:shadow-2xl"
        >
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Terminal size={14} className="text-primary" />
            <span>Stack Highlight:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground tracking-wide">{text}</span>
            <span className="inline-block h-4 w-[2px] animate-pulse bg-primary" />
          </div>
        </motion.div>

        {/* Cinematic Magnetic CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Button className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md hover:shadow-lg dark:shadow-[0_0_20px_rgba(27,131,84,0.3)] transition-all font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2">
              Hire Me Now
              <Sparkles size={16} />
            </Button>
          </motion.a>

          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Button variant="outline" className="w-full sm:w-auto h-12 px-8 border-border bg-white dark:bg-muted/50 hover:bg-slate-50 dark:hover:bg-muted text-foreground rounded-xl font-mono text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm dark:shadow-none">
              View Projects
              <Code size={16} />
            </Button>
          </motion.a>

          <motion.a
            href="/Mohammad_Sinan_UI_Engineer_Resume.pdf"
            target="_blank"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Button variant="outline" className="w-full sm:w-auto h-12 px-8 border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary rounded-xl font-mono text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm dark:shadow-none">
              Resume
              <ArrowUpRight size={16} />
            </Button>
          </motion.a>
        </motion.div>

        {/* Scroll down indicator with parallax fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer pointer-events-none"
        >
          <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-2">Scroll To Explore</span>
          <div className="w-[18px] h-[30px] rounded-full border border-muted-foreground flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}