"use client"

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { 
  Sparkles, 
  ArrowUpRight, 
  Code2, 
  MapPin, 
  FileText, 
  Layers, 
  Component, 
  Cpu, 
  ArrowRight, 
  ArrowLeft,
  Layout, 
  CheckCircle2, 
  ShieldCheck,
  Send
} from "lucide-react"
import { useLanguage } from "./language-context"
import TechText from "@/components/ui/TechText"

const ROLES_EN = [
  "UI Engineering",
  "Frontend Development",
  "Design Systems",
  "Design-to-Code",
  "Arabic / RTL Experiences",
  "Saudi Government Digital Platforms"
]

const ROLES_AR = [
  "هندسة واجهات المستخدم",
  "تطوير الواجهات الأمامية",
  "أنظمة التصميم",
  "تحويل التصميم إلى كود",
  "تجارب اللغة العربية و RTL",
  "المنصات الرقمية الحكومية"
]

export function Hero() {
  const { t, isRTL, lang } = useLanguage()
  const [text, setText] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  const roles = lang === "ar" ? ROLES_AR : ROLES_EN

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)
  }, [])

  // Mouse tilt coordinates for 3D hero perspective
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 180, damping: 24, mass: 0.8 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const heroRotateX = useTransform(mouseYSpring, [-0.5, 0.5], isReducedMotion ? ["0deg", "0deg"] : ["2.5deg", "-2.5deg"])
  const heroRotateY = useTransform(mouseXSpring, [-0.5, 0.5], isReducedMotion ? ["0deg", "0deg"] : ["-2.5deg", "2.5deg"])

  // Spotlight position coordinates
  const spotX = useMotionValue(0)
  const spotY = useMotionValue(0)

  // Dynamic typewriter for focus area highlight
  useEffect(() => {
    const current = roles[roleIndex % roles.length]
    const speed = deleting ? 30 : 65
    const timeout = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setText(current.slice(0, charIndex + 1))
        setCharIndex((c) => c + 1)
      } else if (!deleting && charIndex === current.length) {
        setTimeout(() => setDeleting(true), 1600)
      } else if (deleting && charIndex > 0) {
        setText(current.slice(0, charIndex - 1))
        setCharIndex((c) => c - 1)
      } else {
        setDeleting(false)
        setRoleIndex((r) => (r + 1) % roles.length)
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, roleIndex, roles])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(xPct)
    mouseY.set(yPct)
    spotX.set(e.clientX - rect.left)
    spotY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden min-h-[92vh] flex items-center justify-center bg-background pt-28 sm:pt-32 pb-16 perspective-1200 group"
    >
      {/* Architectural Studio Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_65%,transparent_100%)] pointer-events-none opacity-25 dark:opacity-40" />

      {/* Dynamic Cursor Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              700px circle at ${spotX}px ${spotY}px,
              rgba(27, 131, 84, 0.12),
              transparent 75%
            )
          `,
        }}
      />

      {/* Ambient Lighting Accents (Multi-color in Light & Dark Mode) */}
      <div className="absolute top-1/6 left-1/6 w-[450px] h-[450px] bg-emerald-500/15 dark:bg-primary/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-1/6 w-[400px] h-[400px] bg-amber-500/10 dark:bg-amber-500/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/6 left-1/4 w-[380px] h-[380px] bg-sky-500/10 dark:bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* 3D Main Stage Container */}
      <motion.div
        style={{
          rotateX: heroRotateX,
          rotateY: heroRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative mx-auto max-w-4xl px-6 py-4 md:py-8 text-center z-10 flex flex-col items-center"
      >
        {/* Top Meta Badges Row: Availability + Location */}
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-2.5"
        >
          {/* Availability Status */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-3.5 py-1.5 text-xs font-mono font-medium text-muted-foreground shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>{t("hero.available")}</span>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-mono text-muted-foreground">
            <MapPin size={12} className="text-primary" />
            <span>{t("hero.location")}</span>
          </div>
        </motion.div>

        {/* Name Tag */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-2 text-sm sm:text-base font-mono font-bold tracking-widest text-primary uppercase"
        >
          {t("hero.greeting")}
        </motion.p>

        {/* Primary Role: UI Engineer · Frontend Developer */}
        <div className="w-full max-w-3xl mb-4 flex flex-col items-center">
          <h1 className="w-full relative">
            <span className="sr-only">
              {isRTL ? "مهندس واجهات مستخدم" : "UI Engineer"}
            </span>
            {isRTL ? (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground leading-[1.02] text-center"
              >
                مهندس واجهات مستخدم
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-full h-24 sm:h-32 md:h-40 lg:h-44 relative flex items-center justify-center"
              >
                <TechText
                  text="UI Engineer"
                  fontWeight={900}
                  fontSize={140}
                  letterSpacing={-0.04}
                  color="currentColor"
                  accentColor="#10b981"
                  reveal="letter"
                  dashLength={4}
                  dashGap={2}
                  specks={15}
                  intro="none"
                  introDuration={2}
                  clickKick
                  guides={false}
                />
              </motion.div>
            )}
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-muted-foreground mt-2 tracking-tight text-center"
          >
            {isRTL ? "مطور واجهات أمامية" : "Frontend Developer"}
          </motion.div>
        </div>

        {/* Supporting Narrative Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-2xl text-balance text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-8"
        >
          {t("hero.desc")}
        </motion.p>

        {/* Dynamic Focus Terminal Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex items-center gap-3 rounded-2xl border border-border/80 glass-panel px-4 sm:px-5 py-2 text-xs sm:text-sm font-mono shadow-xs mb-8"
        >
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>{isRTL ? "التركيز:" : "Focus:"}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-[170px] sm:min-w-[240px] text-left">
            <span className="font-semibold text-foreground tracking-wide">{text}</span>
            <span className="inline-block h-3.5 w-[2px] animate-pulse bg-primary" />
          </div>
        </motion.div>

        {/* 3 Strong Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          {/* 1. View Work */}
          <a href="#projects" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto h-12 px-7 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl shadow-md hover:shadow-lg dark:shadow-[0_0_20px_rgba(27,131,84,0.3)] transition-all font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer">
              <span>{t("hero.viewWork")}</span>
              {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
            </Button>
          </a>

          {/* 2. Download Resume */}
          <a 
            href="/Mohammad_Sinan_UI_Engineer_Resume.pdf" 
            download="Mohammad_Sinan_UI_Engineer_Resume.pdf" 
            target="_blank" 
            rel="noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              className="w-full sm:w-auto h-12 px-7 border-border bg-card/70 hover:bg-card text-foreground rounded-2xl font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 backdrop-blur-md shadow-xs cursor-pointer"
            >
              <FileText size={14} className="text-primary" />
              <span>{t("hero.downloadResume")}</span>
            </Button>
          </a>

          {/* 3. Contact Me */}
          <a href="#contact" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto h-12 px-7 border-border bg-card/70 hover:bg-card text-foreground rounded-2xl font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 backdrop-blur-md shadow-xs cursor-pointer"
            >
              <Send size={13} className="text-primary" />
              <span>{t("hero.contactMe")}</span>
            </Button>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, delay: 1 }}
          className="mt-14 flex flex-col items-center pointer-events-none"
        >
          <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-2">
            {t("hero.scrollExplore")}
          </span>
          <div className="w-4 h-7 rounded-full border border-muted-foreground/40 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="w-1 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}