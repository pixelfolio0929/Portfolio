"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Section } from "./section"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import { 
  Figma, 
  Layers, 
  Component, 
  Code2, 
  Languages, 
  CheckCircle2, 
  Rocket, 
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Cpu
} from "lucide-react"
import { useLanguage } from "./language-context"

interface PipelineStep {
  number: string
  title: string
  category: string
  icon: any
  description: string
  highlights: string[]
  metrics: string
}

export function DesignToProduction() {
  const { t, isRTL } = useLanguage()
  const [selectedStep, setSelectedStep] = useState<number>(0)

  const pipelineSteps: PipelineStep[] = isRTL ? [
    {
      number: "01",
      title: "FIGMA",
      category: "معمارية الواجهات",
      icon: Figma,
      description: "تصميم إطارات Auto-Layout معيارية ونماذج تفاعلية قابلة للتحويل المباشر إلى كود برمجي.",
      highlights: ["متغيرات التصميم", "تخطيط Auto-Layout", "جاهزية الكود"],
      metrics: "دقة 100%",
    },
    {
      number: "02",
      title: "نظام التصميم",
      category: "المعايير والمتغيرات",
      icon: Layers,
      description: "بناء هيكل متغيرات التصميم (الألوان، الخطوط، التباعد) وفق معايير DGA و WCAG الحكومية.",
      highlights: ["رموز التصميم JSON", "توافق DGA", "معايير WCAG 2.1 AA"],
      metrics: "+40 رمز أساسي",
    },
    {
      number: "03",
      title: "المكونات",
      category: "مكتبة واجهات قابلة للاستخدام",
      icon: Component,
      description: "هندسة مكونات برمجية ذرية في React و Vue مع واجهات TypeScript صارمة.",
      highlights: ["أنماط TypeScript صارمة", "معمارية ذرية", "صفر أخطاء تخطيط"],
      metrics: "+60 وحدة برمجية",
    },
    {
      number: "04",
      title: "الواجهات الأمامية",
      category: "الهندسة والمنطق",
      icon: Code2,
      description: "تطوير واجهات عالية الأداء تعتمد على الحالة باستخدام React.js و Next.js و Vue.",
      highlights: ["React / Vue / Next.js", "Tailwind CSS الحديث", "تحميل فائق السرعة"],
      metrics: "60 إطار بالثانية",
    },
    {
      number: "05",
      title: "RTL والتجاوب",
      category: "ثنائي الاتجاه والمرونة",
      icon: Languages,
      description: "هندسة المحاذاة العربية المعكوسة بدقة وتناسب أحجام الخطوط والتكيف عبر جميع الشاشات.",
      highlights: ["خصائص CSS المنطقية", "ضبط الخطوط العربية", "تجاوب حتى شاشات 4K"],
      metrics: "100% عربي أصيل",
    },
    {
      number: "06",
      title: "الاختبار",
      category: "الجودة وإمكانية الوصول",
      icon: CheckCircle2,
      description: "فحص شامل عبر المتصفحات، واختبار قارئات الشاشة والتنقل عبر لوحة المفاتيح.",
      highlights: ["فحص قارئات الشاشة", "التنقل بلوحة المفاتيح", "توافق المتصفحات"],
      metrics: "صفر مخالفات",
    },
    {
      number: "07",
      title: "الإنتاج",
      category: "النشر والبيئة الحية",
      icon: Rocket,
      description: "حزم برمجية محسنة ومستقرة للبيئات والمنصات الحكومية الكبرى.",
      highlights: ["حزم برمجية فائقة الخفة", "استقرار المنصات الحكومية", "أتمتة CI/CD"],
      metrics: "مستوى مؤسسي",
    },
  ] : [
    {
      number: "01",
      title: "FIGMA",
      category: "Interface Architecture",
      icon: Figma,
      description: "Designing structured auto-layout frames, component variants, and interactive prototypes ready for clean engineering translation.",
      highlights: ["Tokenized variables", "Auto-layout matrices", "Design-to-code readiness"],
      metrics: "100% Fidelity Spec",
    },
    {
      number: "02",
      title: "DESIGN SYSTEM",
      category: "Tokens & Standards",
      icon: Layers,
      description: "Building a coherent token hierarchy (color, typography, elevation, spacing) compliant with Saudi Government DGA and WCAG standards.",
      highlights: ["Design tokens (JSON)", "DGA Platform Alignment", "WCAG 2.1 AA Standards"],
      metrics: "40+ Core Tokens",
    },
    {
      number: "03",
      title: "COMPONENTS",
      category: "Modular UI Library",
      icon: Component,
      description: "Architecting atomic, decoupled UI components in React and Vue with strict prop interfaces, compound patterns, and slot compositions.",
      highlights: ["Strict TypeScript interfaces", "Atomic component architecture", "Zero layout shift"],
      metrics: "60+ Reusable Units",
    },
    {
      number: "04",
      title: "FRONTEND",
      category: "Engineering & Logic",
      icon: Code2,
      description: "Implementing state-driven, high-performance UI layers using React.js, Next.js, and Vue with clean separation of presentation and logic.",
      highlights: ["React / Vue / Next.js", "Tailwind CSS v4 & Vanilla CSS", "Sub-second hydration"],
      metrics: "60 FPS Render",
    },
    {
      number: "05",
      title: "RTL / RESPONSIVE",
      category: "Bi-directional & Fluid",
      icon: Languages,
      description: "Engineering seamless Arabic RTL layout mirroring, optical alignment, bi-directional typography, and fluid multi-screen breakpoints.",
      highlights: ["Logical CSS properties (start/end)", "Arabic typography tuning", "Mobile to 4K scaling"],
      metrics: "100% RTL Native",
    },
    {
      number: "06",
      title: "TESTING",
      category: "QA & Accessibility",
      icon: CheckCircle2,
      description: "Rigorous cross-browser testing, accessibility screen reader validation, keyboard navigation compliance, and responsive sanity checks.",
      highlights: ["Screen reader audit", "Keyboard navigation check", "Cross-browser validation"],
      metrics: "Zero A11y Violations",
    },
    {
      number: "07",
      title: "PRODUCTION",
      category: "Deployment & Scale",
      icon: Rocket,
      description: "Packaging optimized, robust code bundles for production environments across government and enterprise digital ecosystems.",
      highlights: ["Optimized production bundles", "Government portal stability", "CI/CD integration"],
      metrics: "Enterprise Grade",
    },
  ]

  return (
    <Section id="design-to-production" className="relative overflow-hidden py-20 sm:py-28 bg-background">
      {/* Background Architectural Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(27,131,84,0.08),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-mono font-medium text-primary mb-4"
          >
            <Cpu size={14} />
            <span>{t("pipeline.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground uppercase"
          >
            {t("pipeline.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed text-balance"
          >
            {t("pipeline.desc")}
          </motion.p>
        </div>

        {/* 3D Interactive Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pipelineSteps.map((step, index) => {
            const Icon = step.icon
            const isSelected = selectedStep === index

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 35, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedStep(index)}
                className="cursor-pointer"
              >
                <Hover3DCard
                  depth={22}
                  maxRotate={4}
                  className={`h-full rounded-3xl p-6 border transition-all duration-300 relative flex flex-col justify-between ${
                    isSelected
                      ? "border-primary/60 bg-primary/[0.04] shadow-xl shadow-primary/5 dark:shadow-[0_0_30px_rgba(27,131,84,0.15)] ring-1 ring-primary/40"
                      : "border-border/80 bg-card/60 hover:border-border hover:bg-card/90"
                  }`}
                >
                  <div>
                    {/* Step Number & Category Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-black text-foreground/30 dark:text-foreground/20">
                        {step.number}
                      </span>
                      <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground border border-border/50">
                        {step.category}
                      </span>
                    </div>

                    {/* Step Title & Icon */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                        isSelected ? "bg-primary text-primary-foreground shadow-md" : "bg-primary/10 text-primary"
                      }`}>
                        <Icon size={20} />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-foreground">
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                      {step.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-5">
                      {step.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs font-mono text-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Metric Badge */}
                  <div className="pt-4 border-t border-border/60 flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">{isRTL ? "المعيار" : "Metric"}</span>
                    <span className="text-xs font-mono font-bold text-primary">{step.metrics}</span>
                  </div>
                </Hover3DCard>
              </motion.div>
            )
          })}
        </div>

        {/* Pipeline Summary Narrative Strip */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-12 p-6 sm:p-8 rounded-3xl glass-panel border border-border/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-foreground">
                {isRTL ? "جودة برمجية معتمدة للإنتاج" : "Production Quality Guaranteed"}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {isRTL ? "كل عنصر برمجى مصمم للاستقرار، وسهولة الوصول، ودقة التصميم." : "Every component is engineered for reliability, accessibility compliance, and pixel accuracy."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a href="#government-ui">
              <button className="h-11 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer">
                <span>{isRTL ? "استعراض الواجهات الحكومية" : "View Government UI"}</span>
                {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
