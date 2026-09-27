"use client"

import { Section } from "./section"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import { Sparkles, Layers, ShieldCheck, ArrowRight, ArrowLeft, Code2, Globe } from "lucide-react"
import { useLanguage } from "./language-context"

export function About() {
  const { t, isRTL } = useLanguage()

  const coreThemes = [
    "UI Engineering",
    "Frontend Development",
    "UI/UX Design",
    "Design Systems",
    "Design-to-Code",
    "Arabic / RTL",
    "Saudi Government Digital Platforms"
  ]

  const stats = [
    { label: t("about.stat1Label"), value: t("about.stat1Value"), desc: t("about.stat1Desc") },
    { label: t("about.stat2Label"), value: t("about.stat2Value"), desc: t("about.stat2Desc") },
    { label: t("about.stat3Label"), value: t("about.stat3Value"), desc: t("about.stat3Desc") },
  ]

  return (
    <Section id="about" fullscreen className="relative overflow-hidden bg-background py-20 sm:py-28 border-t border-border/60">
      {/* Background Studio Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_40%,rgba(27,131,84,0.06),transparent_70%)] pointer-events-none" />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center max-w-6xl mx-auto w-full relative z-10 px-4 sm:px-6">

        {/* Left Column (5 cols) - Portrait & Floating Indicators */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">

          {/* 3D Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-64 sm:w-72 h-84 sm:h-92 group z-10"
          >
            <Hover3DCard
              maxRotate={5}
              depth={25}
              className="w-full h-full"
              contentClassName="relative overflow-hidden rounded-3xl border border-border glass-panel p-2.5 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="rounded-2xl bg-muted/40 dark:bg-card/80 backdrop-blur-lg h-full w-full overflow-hidden relative">
                <Image
                  alt="Mohammad Sinan - UI Engineer"
                  src="/placeholder-user.jpg"
                  width={288}
                  height={384}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[25%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />
              </div>
            </Hover3DCard>
          </motion.div>

          {/* Floating SBA / Gov Badge */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`absolute ${isRTL ? "-right-3 sm:-right-6" : "-left-3 sm:-left-6"} bottom-6 hidden sm:flex z-20 max-w-xs`}
          >
            <div className="flex items-center gap-3 rounded-2xl border border-border glass-panel p-3 shadow-lg backdrop-blur-xl">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-foreground">SBA UI Engineer</p>
                <p className="text-[10px] text-muted-foreground font-mono">Saudi Broadcasting Authority</p>
              </div>
            </div>
          </motion.div>

          {/* Floating RTL Arabic Badge */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`absolute ${isRTL ? "-left-3 sm:-left-6" : "-right-3 sm:-right-6"} top-6 hidden sm:flex z-20 max-w-xs`}
          >
            <div className="flex items-center gap-3 rounded-2xl border border-border glass-panel p-3 shadow-lg backdrop-blur-xl">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                <Globe size={16} />
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-foreground">Arabic &amp; RTL UI</p>
                <p className="text-[10px] text-muted-foreground font-mono">DGA Design Aligned</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column (7 cols) - Narrative & Pillars */}
        <div className="lg:col-span-7 space-y-6">

          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-3.5 py-1.5 text-xs font-mono font-medium text-muted-foreground shadow-xs"
            >
              <Sparkles size={13} className="text-primary" />
              <span>{t("about.badge")}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight"
            >
              {t("about.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed pt-1"
            >
              {t("about.bio")}
            </motion.p>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid gap-3 sm:grid-cols-3 pt-2">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + idx * 0.08 }}
                className="w-full"
              >
                <div className="rounded-2xl border border-border glass-panel p-4 shadow-xs flex flex-col justify-between h-full">
                  <div>
                    <p className="text-base sm:text-lg font-mono font-bold text-foreground tracking-tight">{stat.value}</p>
                    <p className="text-[11px] font-mono font-bold text-primary mt-0.5">{stat.label}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-light mt-2 leading-snug">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Core Themes Tags */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-1.5 pt-1"
          >
            {coreThemes.map((b) => (
              <span
                key={b}
                className="bg-card/70 border border-border/80 text-foreground/80 px-3 py-1 rounded-xl font-mono text-[11px] font-medium"
              >
                {b}
              </span>
            ))}
          </motion.div>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <a href="#projects">
              <Button className="h-10 px-5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-xs transition-all font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer">
                <span>{t("about.seeWork")}</span>
                {isRTL ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
              </Button>
            </a>
            <a href="#contact">
              <Button
                variant="outline"
                className="h-10 px-5 border-border bg-card/60 hover:bg-card text-foreground rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer"
              >
                {t("about.getInTouch")}
              </Button>
            </a>
          </motion.div>
        </div>

      </div>
    </Section>
  )
}