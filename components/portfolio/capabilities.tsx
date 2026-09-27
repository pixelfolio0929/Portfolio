"use client"

import { Section } from "./section"
import { motion } from "framer-motion"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import { Code2, Layout, Component, Palette, Sparkles, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"
import { useLanguage } from "./language-context"

export function Capabilities() {
  const { t, isRTL } = useLanguage()

  const capabilities = [
    {
      id: "ui-eng",
      titleEn: "UI Engineering",
      titleAr: "هندسة واجهات المستخدم",
      descEn: "Turning designs and interface systems into responsive, reusable frontend interfaces with high visual fidelity and robust state handling.",
      descAr: "تحويل التصاميم وأنظمة الواجهات إلى واجهات أمامية متجاوبة وقابلة لإعادة الاستخدام بدقة بصرية متناهية وبدون أخطاء تخطيط.",
      icon: Code2,
      tags: ["Design-to-Code", "Responsive UI", "Component Logic", "RTL Mirroring"],
      color: "from-emerald-500/15 to-teal-500/5",
      border: "hover:border-emerald-500/40",
      accent: "text-emerald-600 dark:text-emerald-400"
    },
    {
      id: "frontend-dev",
      titleEn: "Frontend Development",
      titleAr: "تطوير الواجهات الأمامية",
      descEn: "Building modern web interfaces with HTML, CSS, JavaScript and component frameworks like React and Vue with focus on performance.",
      descAr: "بناء واجهات ويب حديثة باستخدام HTML و CSS و JavaScript وأطر عمل مثل React و Vue مع التركيز على الأداء وسلاسة التصفح.",
      icon: Layout,
      tags: ["React.js", "Vue.js", "Tailwind CSS", "REST APIs"],
      color: "from-cyan-500/15 to-blue-500/5",
      border: "hover:border-cyan-500/40",
      accent: "text-cyan-600 dark:text-cyan-400"
    },
    {
      id: "design-systems",
      titleEn: "Design Systems",
      titleAr: "أنظمة التصميم",
      descEn: "Working with reusable components, visual consistency, spacing, typography and responsive patterns aligned with unified design tokens.",
      descAr: "التعامل مع المكونات القابلة لإعادة الاستخدام، والاتساق البصري، وقواعد التباعد، والخطوط، والأنماط المتوافقة مع متغيرات التصميم.",
      icon: Component,
      tags: ["Token Hierarchy", "DGA Standards", "Reusable Units", "WCAG 2.1 AA"],
      color: "from-amber-500/15 to-orange-500/5",
      border: "hover:border-amber-500/40",
      accent: "text-amber-600 dark:text-amber-400"
    },
    {
      id: "ui-ux",
      titleEn: "UI/UX Design",
      titleAr: "تصميم واجهات وتجربة المستخدم",
      descEn: "Designing clear interfaces and translating user requirements into usable, intuitive, and accessible digital experiences in Figma.",
      descAr: "تصميم واجهات واضحة وترجمة متطلبات المستخدمين إلى تجارب رقمية عملية وسهلة الاستخدام عبر Figma.",
      icon: Palette,
      tags: ["Figma Wireframes", "User Flows", "Interactive Prototypes", "Visual Hierarchy"],
      color: "from-purple-500/15 to-pink-500/5",
      border: "hover:border-purple-500/40",
      accent: "text-purple-600 dark:text-purple-400"
    },
  ]

  return (
    <Section id="capabilities" className="relative overflow-hidden bg-background py-20 sm:py-28 border-t border-border/60">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_25%,rgba(27,131,84,0.05),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-3.5 py-1.5 text-xs font-mono font-medium text-muted-foreground shadow-xs mb-4"
          >
            <Sparkles size={13} className="text-primary" />
            <span>{t("cap.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
          >
            {t("cap.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
          >
            {t("cap.desc")}
          </motion.p>
        </div>

        {/* 4 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon
            const title = isRTL ? cap.titleAr : cap.titleEn
            const desc = isRTL ? cap.descAr : cap.descEn

            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="h-full"
              >
                <Hover3DCard
                  depth={18}
                  maxRotate={4}
                  className="h-full group"
                  contentClassName={`h-full rounded-3xl border border-border bg-card/80 dark:bg-card/40 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 ${cap.border}`}
                >
                  <div>
                    {/* Card Header: Icon + Cap Number */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cap.color} border border-border flex items-center justify-center ${cap.accent} transition-transform duration-300 group-hover:scale-105`}>
                        <Icon size={22} />
                      </div>
                      <span className="font-mono text-xs font-bold text-muted-foreground/60 tracking-widest uppercase">
                        {`0${idx + 1} // CAPABILITY`}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-mono text-foreground mb-2.5 group-hover:text-primary transition-colors">
                      {title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-6">
                      {desc}
                    </p>
                  </div>

                  {/* Tags Pill Row */}
                  <div className="pt-4 border-t border-border/50 flex flex-wrap gap-1.5">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-background/70 border border-border/80 text-[10px] font-mono text-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
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
