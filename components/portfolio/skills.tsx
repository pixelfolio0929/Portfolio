"use client"

import { Section } from "./section"
import { motion } from "framer-motion"
import { Wrench } from "lucide-react"
import { SkillsMobile } from "./skills-mobile"
import { SkillCarousel } from "./skill-carousel"
import { useLanguage } from "./language-context"

export function Skills() {
  const { t } = useLanguage()

  return (
    <Section id="skills" className="relative overflow-hidden bg-background py-20 sm:py-28">
      {/* Subtle Studio Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(27,131,84,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-4 py-1.5 text-xs font-mono font-medium text-muted-foreground shadow-sm mb-4"
          >
            <Wrench size={13} className="text-primary" />
            <span>{t("skills.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
          >
            {t("skills.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
          >
            {t("skills.desc")}
          </motion.p>
        </div>

        <div className="block md:hidden">
          <SkillsMobile />
        </div>
        <div className="hidden md:block">
          <SkillCarousel />
        </div>
      </div>
    </Section>
  )
}