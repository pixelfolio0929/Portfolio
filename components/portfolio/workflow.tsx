"use client"

import { Section } from "./section"
import { motion, useScroll, useSpring } from "framer-motion"
import { Calendar, Briefcase, MapPin, Building2 } from "lucide-react"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import { useRef } from "react"
import { useLanguage } from "./language-context"

export function Workflow() {
  const { t, isRTL } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const experiences = isRTL ? [
    {
      company: "هيئة الإذاعة والتلفزيون (SBA)",
      role: "مهندس ومطور واجهات مستخدم (UI Engineer / UI Developer)",
      period: "2026 — حتى الآن",
      location: "الرياض، المملكة العربية السعودية",
      description: "المساهمة في هندسة وتطوير واجهات المستخدم والتجارب الرقمية للمنصات الحكومية السعودية، مع التركيز على الواجهات المتجاوبة، وتجربة المستخدم الموجهة للعربية، وتخطيطات RTL، والمكونات القابلة لإعادة الاستخدام، ومعايير التصميم الرقمي السعودية.",
      tools: ["معايير DGA", "HTML5", "CSS3", "JavaScript", "ASP.NET (UI)", "Figma", "دعم RTL", "تصميم متجاوب", "Git"]
    },
    {
      company: "Almasons",
      role: "مطور واجهات أمامية (Frontend Developer)",
      period: "فبراير 2025 — ديسمبر 2025",
      location: "مانجلور",
      description: "تطوير واجهات أمامية حديثة باستخدام Vue.js و React.js. بناء لوحات تحكم تفاعلية عالية الأداء، وربط واجهات برمجة التطبيقات REST APIs، وبناء مكتبات المكونات القابلة لإعادة الاستخدام.",
      tools: ["Vue.js", "React.js", "GitLab", "REST APIs", "SQL", "Figma", "GitHub"]
    },
    {
      company: "Whitebook World",
      role: "مصمم واجهات المستخدم (UI Designer)",
      period: "سبتمبر 2024 — فبراير 2025",
      location: "بنغالور",
      description: "تصميم واجهات مستخدم عالية الدقة، ونماذج تفاعلية أولية، وهياكل تصميم باستخدام Figma و Photoshop. وضع معايير تصميم موحدة لتسهيل التسليم لفريق التطوير البرمجي.",
      tools: ["Figma", "Adobe Photoshop", "Prototyping", "Design Systems"]
    },
    {
      company: "عمل حر / مستقل (Freelance)",
      role: "مصمم ومطور واجهات (UI Designer & Developer)",
      period: "2022 — 2025",
      location: "عن بُعد",
      description: "تقديم تصاميم رقمية وهويات بصرية للعملاء مع تصميم وتطوير واجهات استخدام متجاوبة وموجهة لتعزيز تجربة المستخدم ومعدلات التحويل.",
      tools: ["Figma", "Adobe Photoshop", "HTML/CSS", "JavaScript", "Responsive UI"]
    },
  ] : [
    {
      company: "Saudi Broadcasting Authority (SBA)",
      role: "UI Engineer / UI Developer",
      period: "2026 — PRESENT",
      location: "Riyadh, Saudi Arabia",
      description: "Contributing to UI engineering, UI development, and digital experiences for Saudi government platforms, with a focus on responsive interfaces, Arabic-first UX, RTL layouts, reusable UI components and Saudi digital design standards.",
      tools: ["DGA Standards", "HTML5", "CSS3", "JavaScript", "ASP.NET (UI)", "Figma", "Arabic RTL", "Responsive UI", "Git"]
    },
    {
      company: "Almasons",
      role: "Frontend Developer",
      period: "FEB 2025 — DEC 2025",
      location: "Mangalore",
      description: "Architected modern frontend systems using Vue.js and React.js. Engineered responsive, high-performance dashboards, integrated complex REST APIs, and built scalable component libraries.",
      tools: ["Vue.js", "React.js", "GitLab", "REST APIs", "SQL", "Figma", "GitHub"]
    },
    {
      company: "Whitebook World",
      role: "UI + Graphic Designer",
      period: "SEP 2024 — FEB 2025",
      location: "Bangalore",
      description: "Designed high-fidelity user interface concepts, interactive prototypes, and layout systems using Figma. Established coherent styling standards and assets for streamlined developer handover.",
      tools: ["Figma", "Adobe Photoshop", "Prototyping", "Design Systems"]
    },
    {
      company: "Freelance",
      role: "UI Designer & Developer",
      period: "2022 — 2025",
      location: "Remote",
      description: "Delivered digital interfaces, visual branding, and interactive UI mockups aligned with conversion and usability best practices.",
      tools: ["Figma", "Adobe Photoshop", "HTML/CSS", "JavaScript", "Responsive UI"]
    },
  ]

  return (
    <Section id="experience" className="relative overflow-hidden bg-background py-20 sm:py-28 border-t border-border/60">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(27,131,84,0.05),transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-14 sm:mb-16 relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-3.5 py-1.5 text-xs font-mono font-medium text-muted-foreground shadow-xs mb-3"
        >
          <Briefcase size={13} className="text-primary" />
          <span>{t("exp.badge")}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground"
        >
          {t("exp.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-sm sm:text-base text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
        >
          {t("exp.desc")}
        </motion.p>
      </div>

      <div ref={containerRef} className="max-w-4xl mx-auto relative px-4 sm:px-6">
        {/* Central Timeline Progress Track */}
        <div className={`absolute top-0 bottom-0 ${isRTL ? "right-6 md:right-1/2 md:translate-x-1/2" : "left-6 md:left-1/2 md:-translate-x-1/2"} w-0.5 bg-border z-0`} />
        
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className={`absolute top-0 bottom-0 ${isRTL ? "right-6 md:right-1/2 md:translate-x-1/2" : "left-6 md:left-1/2 md:-translate-x-1/2"} w-0.5 bg-gradient-to-b from-primary via-emerald-400 to-teal-400 z-0`}
        />

        <div className="space-y-10 sm:space-y-12 relative z-10">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col md:flex-row items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                } gap-6 sm:gap-8 relative`}
              >
                {/* Timeline Center Node */}
                <div className={`absolute top-6 ${isRTL ? "right-6 md:right-1/2 md:translate-x-1/2" : "left-6 md:left-1/2 md:-translate-x-1/2"} w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-xs z-20`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </div>

                {/* Content Card (Half Width) */}
                <div className={`w-full md:w-[calc(50%-1.75rem)] ${isRTL ? "pr-10 md:pr-0" : "pl-10 md:pl-0"}`}>
                  <Hover3DCard
                    depth={15}
                    maxRotate={3}
                    className="h-full group"
                    contentClassName={`rounded-3xl border ${index === 0 ? "border-primary/40 bg-primary/[0.03]" : "border-border bg-card/85 dark:bg-card/45"} backdrop-blur-xl p-5 sm:p-7 shadow-xs group-hover:border-primary/40 transition-all duration-300`}
                  >
                    {/* Period & Role Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                        <Calendar size={11} />
                        <span>{exp.period}</span>
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                          <MapPin size={11} />
                          <span>{exp.location}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-mono text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    
                    <p className="text-xs font-mono font-semibold text-primary/90 mb-3">
                      {exp.company}
                    </p>

                    <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Tools Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                      {exp.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-background/60 border border-border/80 text-[10px] font-mono text-foreground/80"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </Hover3DCard>
                </div>

                {/* Empty Half Width Spacer for alternating tree */}
                <div className="hidden md:block md:w-[calc(50%-1.75rem)]" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}