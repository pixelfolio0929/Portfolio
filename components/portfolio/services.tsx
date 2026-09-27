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
    glowColor: "group-hover:shadow-[0_0_25px_rgba(27,131,84,0.18)]",
  },
  {
    title: "UI/UX Design",
    description: "Structuring modern design architectures and state-of-the-art interactive mockups directly inside Figma and Framer.",
    icon: "Figma",
    borderColor: "group-hover:border-purple-500/50",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(168,85,247,0.18)]",
  },
  {
    title: "Enterprise Dashboards",
    description: "Building responsive metrics portals, analytical SaaS UI layouts, and customizable interactive data tables.",
    icon: "LayoutDashboard",
    borderColor: "group-hover:border-blue-500/50",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(59,130,246,0.18)]",
  },
  {
    title: "Responsive Web Apps",
    description: "Deploying fluid interfaces optimized perfectly for absolute compatibility on all screen formats and devices.",
    icon: "Smartphone",
    borderColor: "group-hover:border-pink-500/50",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(236,72,153,0.18)]",
  },
  {
    title: "Design Systems",
    description: "Developing DGA compliance standard token architectures and highly reusable custom utility libraries.",
    icon: "Layers",
    borderColor: "group-hover:border-amber-500/50",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(245,158,11,0.18)]",
  },
]

export function Services() {
  return (
    <Section id="services" className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Background visual detail */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,131,84,0.05),transparent_65%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-4 py-1.5 text-xs font-mono font-medium text-muted-foreground shadow-sm mb-4"
          >
            <Icons.Sparkles size={13} className="text-primary" />
            <span>Scope Of Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
          >
            Engineering Solutions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
          >
            Enterprise-grade frontend engineering, accessible component design, and scalable architectures.
          </motion.p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const IconComponent = (Icons[service.icon] || Icons.HelpCircle) as React.ComponentType<{ size?: number; className?: string }>
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full"
              >
                <Hover3DCard
                  maxRotate={6}
                  depth={20}
                  className="w-full h-full"
                  contentClassName={`group relative rounded-3xl border border-border glass-panel p-7 sm:p-8 h-full flex flex-col justify-between overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] ${service.borderColor} ${service.glowColor}`}
                >
                  <div>
                    {/* Icon Wrap */}
                    <div className="w-12 h-12 rounded-2xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300 mb-6 shrink-0 shadow-inner">
                      {IconComponent && <IconComponent size={22} />}
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Footer Accent */}
                  <div className="mt-8 pt-4 border-t border-border/80 flex items-center justify-between text-[10px] font-mono text-muted-foreground/60">
                    <span>SYSTEM // CAPABILITY</span>
                    <span>0{idx + 1}</span>
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

