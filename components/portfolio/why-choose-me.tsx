"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import * as Icons from "lucide-react"

interface Feature {
  title: string
  description: string
  icon: keyof typeof Icons
}

const features: Feature[] = [
  {
    title: "Design-to-Code Bridge",
    description: "Expert in transforming UI/UX designs into pixel-perfect, production-ready, responsive interfaces.",
    icon: "LayoutDashboard"
  },
  {
    title: "Modern Frontend Stack",
    description: "Hands-on experience with React, Vue, and Tailwind CSS for scalable and maintainable UI architectures.",
    icon: "Code"
  },
  {
    title: "Collaborative Approach",
    description: "Strong communicator working closely with designers, product managers, and stakeholders.",
    icon: "Users"
  },
  {
    title: "User-Centered Focus",
    description: "Emphasis on usability, performance, and visual consistency.",
    icon: "UserCheck"
  },
  {
    title: "Business-Oriented Delivery",
    description: "Results-driven mindset delivering production-ready UI systems aligned with business goals.",
    icon: "TrendingUp"
  },
  {
    title: "Quality & Performance",
    description: "Clean, scalable code optimized for performance, accessibility, and cross-browser compatibility.",
    icon: "ShieldCheck"
  }
]

export function WhyChooseMe() {
  return (
    <Section id="why-choose-me" className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(27,131,84,0.04),transparent_65%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-4 py-1.5 text-xs font-mono font-medium text-muted-foreground shadow-sm mb-4"
          >
            <Icons.CheckCircle size={13} className="text-primary" />
            <span>Value Proposition</span>
          </motion.div>

          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Why Choose Me as a UI Developer
          </motion.h2>

          <motion.p 
            className="mt-4 text-sm sm:text-base text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Bridging UI/UX design and frontend development for exceptional digital experiences.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const IconComponent = Icons[feature.icon as keyof typeof Icons] as React.ComponentType<{ size?: number; className?: string }>
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full"
              >
                <Hover3DCard
                  maxRotate={6}
                  depth={20}
                  className="w-full h-full"
                  contentClassName="flex flex-col h-full p-7 sm:p-8 rounded-3xl border border-border glass-panel shadow-sm hover:shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-muted/50 border border-border/80 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors mb-6 shrink-0 shadow-inner">
                    {IconComponent && <IconComponent size={22} />}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </Hover3DCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}