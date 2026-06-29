"use client"

import { Section } from "./section"
import { motion } from "framer-motion"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import * as Icons from "lucide-react"

interface Service {
  title: string
  description: string
  icon: keyof typeof Icons
  borderColor: string
  glowColor: string
}

const services: Service[] = [
  {
    title: "Frontend Development",
    description: "Crafting extremely performant, high-fidelity applications with robust structures using React, Next.js, and Vue.",
    icon: "Code2",
    borderColor: "group-hover:border-primary/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(27,131,84,0.15)]",
  },
  {
    title: "UI/UX Design",
    description: "Structuring modern design architectures and state-of-the-art interactive mockups directly inside Figma and Framer.",
    icon: "Figma",
    borderColor: "group-hover:border-purple-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
  },
  {
    title: "Enterprise Dashboards",
    description: "Building responsive metrics portals, analytical SaaS UI layouts, and customizable interactive data tables.",
    icon: "LayoutDashboard",
    borderColor: "group-hover:border-blue-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
  },
  {
    title: "Responsive Web Apps",
    description: "Deploying fluid interfaces optimized perfectly for absolute compatibility on all screen formats and devices.",
    icon: "Smartphone",
    borderColor: "group-hover:border-pink-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]",
  },
  {
    title: "Design Systems",
    description: "Developing DGA & SBA compliance standard token architectures and highly reusable custom utility libraries.",
    icon: "Layers",
    borderColor: "group-hover:border-amber-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
  },
]

export function Services() {
  return (
    <Section id="services" className="relative overflow-hidden bg-background py-24">
      {/* Background visual detail */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,131,84,0.04),transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white dark:bg-card/80 px-4 py-1.5 text-xs font-mono font-medium text-muted-foreground backdrop-blur-md shadow-sm dark:shadow-2xl mb-4"
          >
            <Icons.Sparkles size={12} className="text-primary" />
            <span>Scope Of Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
          >
            Premium Solutions
          </motion.h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4"></div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
          >
            Enterprise-grade frontend engineering and visual experiences designed for 2026.
          </motion.p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const IconComponent = (Icons[service.icon] || Icons.HelpCircle) as React.ComponentType<{ size?: number; className?: string }>
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="w-full h-full"
              >
                <Hover3DCard className="w-full h-full" contentClassName={`group relative rounded-2xl border border-border bg-white dark:bg-gradient-to-b dark:from-card/80 dark:to-background/90 p-[1px] overflow-hidden shadow-sm hover:shadow-md dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] backdrop-blur-md transition-all duration-300 ${service.borderColor} ${service.glowColor}`}>
                  {/* Cybernetic Accent lines */}
                <div className="absolute top-0 left-0 w-8 h-[1px] bg-primary/40 hidden dark:block" />
                <div className="absolute top-0 left-0 w-[1px] h-8 bg-primary/40 hidden dark:block" />

                {/* Inner Body */}
                <div className="relative rounded-2xl bg-white dark:bg-card/95 p-6 h-full flex flex-col justify-between overflow-hidden">
                  <div>
                    {/* Icon Wrap */}
                    <div className="w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-all duration-300 mb-6 shrink-0 shadow-inner">
                      {IconComponent && <IconComponent size={22} />}
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Small sci-fi footer accent */}
                  <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-[9px] font-mono text-muted-foreground/60">
                    <span>SYSTEM // SECURE</span>
                    <span>0{idx + 1}</span>
                  </div>
                </div>
                </Hover3DCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
