"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import { Button } from "@/components/ui/button"
import { 
  Compass, 
  Palette, 
  Component, 
  Code2, 
  Sparkles, 
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from "lucide-react"
import { useLanguage } from "./language-context"

export function FinalStatement() {
  const { t, isRTL } = useLanguage()

  const workSteps = [
    {
      number: "01",
      titleEn: "Understand",
      titleAr: "الفهم والتحليل",
      descEn: "Requirements, users, content hierarchy, accessibility needs, and technical constraints.",
      descAr: "متطلبات المشروع، وتجربة المستخدمين، وهيكل المحتوى، ومعايير سهولة الوصول، والقيود التقنية.",
      icon: Compass,
    },
    {
      number: "02",
      titleEn: "Design",
      titleAr: "التصميم البصري",
      descEn: "Create structured layouts, clear visual hierarchy, and interface concepts in Figma.",
      descAr: "إنشاء تخطيطات منظمة، وتسلسل هرمي بصري واضح، ومفاهيم واجهات عصرية في Figma.",
      icon: Palette,
    },
    {
      number: "03",
      titleEn: "Systemize",
      titleAr: "بناء النظام والرموز",
      descEn: "Create reusable components, spacing scales, typography tokens, and responsive patterns.",
      descAr: "إنشاء مكونات قابلة لإعادة الاستخدام، وقواعد التباعد، ورموز الخطوط، والأنماط المتجاوبة.",
      icon: Component,
    },
    {
      number: "04",
      titleEn: "Develop",
      titleAr: "التطوير البرمجي",
      descEn: "Translate designs into clean, semantic, and performant frontend code using modern tooling.",
      descAr: "ترجمة التصاميم إلى كود واجهات أمامية نظيف ودلالي وعالي الأداء باستخدام أحدث الأدوات.",
      icon: Code2,
    },
    {
      number: "05",
      titleEn: "Refine",
      titleAr: "التحسين والاختبار",
      descEn: "Check responsiveness across viewports, authentic RTL behavior, accessibility, and performance.",
      descAr: "فحص التجاوب عبر الشاشات المختلفة، وسلوك RTL الدقيق، وسهولة الوصول، والأداء النهائي.",
      icon: Sparkles,
    },
  ]

  const focusKeywords = isRTL ? [
    "هندسة واجهات المستخدم",
    "تطوير الواجهات الأمامية",
    "أنظمة التصميم",
    "دعم اللغة العربية RTL",
    "تجارب رقمية حكومية",
    "تصميم متجاوب",
  ] : [
    "UI ENGINEERING",
    "FRONTEND DEVELOPMENT",
    "DESIGN SYSTEMS",
    "ARABIC RTL",
    "GOVERNMENT DIGITAL EXPERIENCES",
    "RESPONSIVE UI",
  ]

  return (
    <div className="relative overflow-hidden bg-background">
      
      {/* 1. "HOW I WORK" Section */}
      <Section id="how-i-work" className="py-20 sm:py-28 border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-mono font-medium text-primary mb-3"
            >
              <Compass size={14} />
              <span>{t("work.badge")}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground"
            >
              {t("work.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 text-sm sm:text-base text-muted-foreground font-light leading-relaxed text-balance"
            >
              {t("work.desc")}
            </motion.p>
          </div>

          {/* 5-Step Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {workSteps.map((step, idx) => {
              const Icon = step.icon
              const title = isRTL ? step.titleAr : step.titleEn
              const desc = isRTL ? step.descAr : step.descEn

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  className={idx === 4 ? "md:col-span-2 lg:col-span-1" : ""}
                >
                  <Hover3DCard depth={15} maxRotate={4} className="h-full p-6 sm:p-7 rounded-3xl glass-panel border border-border/80 flex flex-col justify-between shadow-xs hover:border-primary/40 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xl font-bold text-foreground/25">
                          {step.number}
                        </span>
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                          <Icon size={18} />
                        </div>
                      </div>

                      <h3 className="text-lg font-bold font-mono tracking-tight text-foreground mb-2">
                        {title}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/50 mt-5 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                      <span>{isRTL ? `المرحلة ${step.number}` : `Step ${step.number}`}</span>
                      <CheckCircle2 size={13} className="text-primary" />
                    </div>
                  </Hover3DCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* 2. Seamless Marquee Strip */}
      <div className="py-8 border-y border-border/80 bg-muted/20 overflow-hidden relative">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          {[...focusKeywords, ...focusKeywords].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <span className="text-sm sm:text-lg font-bold font-mono tracking-wider text-foreground/80">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Editorial Statement & Final CTA */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(27,131,84,0.06),transparent_70%)] pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center relative z-10">
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest uppercase text-primary font-bold mb-5"
          >
            {t("work.philosophy")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2 sm:space-y-3"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
              {t("work.statement1")}
            </h2>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent leading-[1.1]">
              {t("work.statement2")}
            </h2>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
              {t("work.statement3")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 max-w-lg mx-auto p-6 sm:p-8 rounded-3xl glass-panel border border-border shadow-xl"
          >
            <h3 className="text-lg sm:text-xl font-bold font-mono text-foreground mb-1.5">
              {t("work.ctaTitle")}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-5 font-light">
              {t("work.ctaDesc")}
            </p>
            <a href="#contact">
              <Button className="w-full sm:w-auto h-11 px-7 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer flex items-center justify-center gap-2 mx-auto">
                <span>{t("work.startConv")}</span>
                {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
              </Button>
            </a>
          </motion.div>

        </div>
      </section>

    </div>
  )
}
