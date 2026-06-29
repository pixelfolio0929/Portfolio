"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Section } from "./section"
import { Award, Code2, Users2, Sparkles, TrendingUp } from "lucide-react"

interface StatItem {
  target: number
  suffix: string
  label: string
  desc: string
  icon: any
}

const stats: StatItem[] = [
  {
    target: 12,
    suffix: "+",
    label: "Projects Completed",
    desc: "Production-ready Web Applications",
    icon: Code2,
  },
  {
    target: 20,
    suffix: "+",
    label: "Technologies Mastered",
    desc: "React, Vue, Figma, & APIs",
    icon: Award,
  },
  {
    target: 99,
    suffix: "%",
    label: "Client Optimization",
    desc: "Performance & Responsive layouts",
    icon: TrendingUp,
  },
  {
    target: 4,
    suffix: "+",
    label: "Years Designing",
    desc: "Figma, Adobe & Web Prototypes",
    icon: Sparkles,
  },
]

export function Achievements() {
  return (
    <Section id="achievements" className="relative overflow-hidden bg-background py-20">
      {/* Background glow visual */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,131,84,0.04),transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} idx={idx} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function StatCard({ stat, idx }: { stat: StatItem; idx: number }) {
  const [count, setCount] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const end = stat.target
    const duration = 2000
    const stepTime = Math.abs(Math.floor(duration / end))
    
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) {
        clearInterval(timer)
        setCount(end)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isInView, stat.target])

  const IconComponent = stat.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className="relative rounded-2xl border border-border bg-card/40 p-6 shadow-2xl backdrop-blur-md flex flex-col justify-between overflow-hidden group"
    >
      {/* Visual Accent glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent pointer-events-none rounded-2xl group-hover:from-primary/5 transition-colors duration-500" />

      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-primary shrink-0">
          <IconComponent size={18} />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/60">MILESTONE 0{idx + 1}</span>
      </div>

      <div>
        <h3 className="text-3xl sm:text-4xl font-mono font-bold text-foreground tracking-tight flex items-baseline">
          <span>{count}</span>
          <span className="text-primary">{stat.suffix}</span>
        </h3>
        
        <p className="text-sm font-bold text-foreground mt-2">
          {stat.label}
        </p>
        
        <p className="text-xs text-muted-foreground font-light mt-1">
          {stat.desc}
        </p>
      </div>

      {/* Cyberpunk corner indicator */}
      <div className="absolute right-3 bottom-3 w-1.5 h-1.5 rounded-full bg-primary/40" />
    </motion.div>
  )
}
