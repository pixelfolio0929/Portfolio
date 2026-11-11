"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { ExternalLink, ArrowRight, ArrowLeft, Eye, ShieldCheck, Clock, Sparkles } from "lucide-react"

export interface ProjectCardItem {
  id: string | number
  title: string
  tagline?: string
  description: string
  image: string
  badge?: string
  category?: string
  technologies?: string[]
  isWorkMode?: boolean
  workModeNote?: string
  live?: string
  onAction?: () => void
}

export default function AnimatedCardStack({
  items,
  isRTL = false,
  onSelectProject,
}: {
  items: ProjectCardItem[]
  isRTL?: boolean
  onSelectProject?: (item: ProjectCardItem) => void
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [dragDirection, setDragDirection] = useState<"next" | "prev" | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const total = items.length

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total)
    setDragDirection("next")
  }, [total])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
    setDragDirection("prev")
  }, [total])

  // Wheel interaction: scroll down advances, scroll up reverses (throttled)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let lastWheelTime = 0
    const onWheel = (e: WheelEvent) => {
      // Only capture when mouse is over the cards and delta is significant
      if (Math.abs(e.deltaY) > 40) {
        const now = Date.now()
        if (now - lastWheelTime > 650) {
          lastWheelTime = now
          if (e.deltaY > 0) {
            handleNext()
          } else {
            handlePrev()
          }
        }
      }
    }

    el.addEventListener("wheel", onWheel, { passive: true })
    return () => el.removeEventListener("wheel", onWheel)
  }, [handleNext, handlePrev])

  // Keyboard arrow keys
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (isRTL) handlePrev()
        else handleNext()
      } else if (e.key === "ArrowLeft") {
        if (isRTL) handleNext()
        else handlePrev()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [handleNext, handlePrev, isRTL])

  // Visible stack: active, +1, +2
  const visibleIndices = [
    activeIndex,
    (activeIndex + 1) % total,
    (activeIndex + 2) % total,
  ]

  const activeItem = items[activeIndex]

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto flex flex-col items-center select-none"
    >
      {/* Top Controls & Counter Bar */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-6 px-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-primary font-bold tracking-wider">
            {String(activeIndex + 1).padStart(2, "0")}
            <span className="text-muted-foreground/40 mx-1">/</span>
            {String(total).padStart(2, "0")}
          </span>
          <span className="h-3 w-px bg-border" />
          <span className="text-muted-foreground uppercase tracking-widest text-[11px] truncate max-w-[200px]">
            {activeItem.category || (isRTL ? "معرض المشاريع" : "Selected Work")}
          </span>
        </div>

        {/* Navigation Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl bg-card border border-border/80 hover:bg-muted hover:border-primary/40 text-foreground transition-all cursor-pointer active:scale-95 shadow-2xs"
            aria-label="Previous project"
          >
            {isRTL ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-card border border-border/80 hover:bg-muted hover:border-primary/40 text-foreground transition-all cursor-pointer active:scale-95 shadow-2xs"
            aria-label="Next project"
          >
            {isRTL ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
          </button>
        </div>
      </div>

      {/* 3D Stack Stage */}
      <div className="relative w-full h-[460px] sm:h-[500px] md:h-[540px] flex items-center justify-center perspective-1200 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleIndices.map((itemIdx, slotIndex) => {
            const item = items[itemIdx]
            const isFront = slotIndex === 0

            // Dynamic depth styling for 3 visible cards
            const yOffset = slotIndex === 0 ? 0 : slotIndex === 1 ? -28 : -56
            const scale = slotIndex === 0 ? 1 : slotIndex === 1 ? 0.94 : 0.88
            const opacity = slotIndex === 0 ? 1 : slotIndex === 1 ? 0.75 : 0.5
            const zIndex = 30 - slotIndex * 10

            return (
              <motion.div
                key={`${item.id}-${itemIdx}`}
                layout
                initial={{
                  scale: 0.85,
                  y: -60,
                  opacity: 0,
                }}
                animate={{
                  y: yOffset,
                  scale,
                  opacity,
                  zIndex,
                }}
                exit={{
                  y: 380,
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 26,
                  mass: 0.8,
                }}
                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 80) {
                    if (info.offset.x < 0) {
                      if (isRTL) handlePrev()
                      else handleNext()
                    } else {
                      if (isRTL) handleNext()
                      else handlePrev()
                    }
                  }
                }}
                onClick={() => {
                  if (!isFront) {
                    setActiveIndex(itemIdx)
                  }
                }}
                style={{
                  position: "absolute",
                  transformStyle: "preserve-3d",
                }}
                className={`w-[94%] sm:w-[85%] md:w-[780px] lg:w-[840px] h-[400px] sm:h-[440px] md:h-[470px] rounded-3xl border ${
                  item.isWorkMode
                    ? "border-amber-500/40 hover:border-amber-500/60"
                    : "border-border/80 hover:border-primary/40"
                } bg-[#18181b]/95 dark:bg-[#0c0d12]/95 backdrop-blur-2xl p-4 sm:p-6 shadow-2xl transition-colors duration-300 flex flex-col justify-between overflow-hidden ${
                  !isFront ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"
                }`}
              >
                {/* Top Browser / HUD Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    </div>
                    <span className="hidden sm:inline-block text-white/40 text-[10px] pl-2 font-mono">
                      {item.isWorkMode ? "govt-enterprise // internal-staging" : item.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.isWorkMode ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                        <span>{isRTL ? "قيد العمل والتطوير (غير منشور)" : "Govt Work Mode (Not Published)"}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{item.badge || (isRTL ? "منشور ومباشر" : "Production Live")}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Central Visual Screen Showcase */}
                <div className="relative flex-1 my-3 rounded-2xl overflow-hidden bg-black/40 border border-white/10 group">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                  {/* Floating Tagline Over Image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold font-mono text-white tracking-tight drop-shadow-md">
                      {item.title}
                    </h4>
                    {item.tagline && (
                      <p className="text-xs sm:text-sm text-primary-foreground/90 font-mono mt-0.5 drop-shadow-sm truncate">
                        {item.tagline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Footer & Action Bar */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <p className="text-xs sm:text-sm text-white/70 font-light truncate max-w-md">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.isWorkMode ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (item.onAction) item.onAction()
                          else if (onSelectProject) onSelectProject(item)
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold transition-all cursor-pointer shadow-xs"
                      >
                        <Clock size={13} className="animate-pulse" />
                        <span>{isRTL ? "تفاصيل المعمارية" : "Architecture Specs"}</span>
                      </button>
                    ) : item.live ? (
                      <a
                        href={item.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-bold hover:bg-primary/90 transition-all shadow-xs"
                      >
                        <span>{isRTL ? "زيارة الموقع" : "Launch Live"}</span>
                        <ExternalLink size={13} />
                      </a>
                    ) : null}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (item.onAction) item.onAction()
                        else if (onSelectProject) onSelectProject(item)
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs font-mono font-semibold transition-all cursor-pointer shadow-2xs"
                    >
                      <Eye size={13} />
                      <span>{isRTL ? "المزيد" : "Inspect"}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Progress Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {items.map((_, idx) => {
          const isActive = idx === activeIndex
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                isActive
                  ? "w-8 bg-primary shadow-xs"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to project ${idx + 1}`}
            />
          )
        })}
      </div>

      <div className="mt-3 text-[11px] font-mono text-muted-foreground/60 text-center">
        {isRTL
          ? "استخدم عجلة الفأرة، أو السحب بالأصبع، أو الأسهم للتنقل السلس بين المشاريع"
          : "Scroll wheel, swipe horizontally, or use arrow keys to navigate projects"}
      </div>
    </div>
  )
}
