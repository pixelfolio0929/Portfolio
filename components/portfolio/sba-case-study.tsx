"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import { 
  ShieldCheck, 
  Layers, 
  Code2, 
  Languages, 
  Smartphone, 
  CheckCircle2,
  Building2,
  Calendar,
  MapPin,
  Eye,
  Sparkles
} from "lucide-react"
import { useLanguage } from "./language-context"

export function SBACaseStudy() {
  const { t, isRTL } = useLanguage()

  const govCapabilities = [
    {
      number: "01",
      titleEn: "DGA-aligned Design Systems",
      titleAr: "أنظمة تصميم متوافقة مع معايير DGA",
      descEn: "Working with Saudi digital design standards, unified typography scales, spacing tokens, and reusable interface patterns.",
      descAr: "العمل وفق معايير التصميم الرقمي الحكومي السعودي، وتوحيد سلالم الخطوط، ومحددات التباعد، والأنماط القابلة لإعادة الاستخدام.",
      icon: Layers,
      badgeEn: "Saudi Standards",
      badgeAr: "معايير سعودية",
    },
    {
      number: "02",
      titleEn: "Arabic & RTL Experiences",
      titleAr: "تجارب اللغة العربية و RTL",
      descEn: "Designing and implementing authentic Arabic-first interfaces, bidirectional layout mirroring, and optical typography balance.",
      descAr: "تصميم وتنفيذ واجهات عربية أصيلة، وهندسة المحاذاة ثنائية الاتجاه، وضبط التوازن البصري لحروف الخطوط العربية.",
      icon: Languages,
      badgeEn: "100% RTL Native",
      badgeAr: "عربي أصيل RTL",
    },
    {
      number: "03",
      titleEn: "Responsive Multi-Screen UI",
      titleAr: "واجهات متجاوبة لجميع الشاشات",
      descEn: "Creating interfaces that adapt fluidly across mobile viewports, tablet layouts, and high-resolution desktop displays.",
      descAr: "إنشاء واجهات مرنة تتكيف بسلاسة تامة عبر الهواتف الذكية والأجهزة اللوحية وشاشات العرض المكتبية فائقة الدقة.",
      icon: Smartphone,
      badgeEn: "Fluid Scaling",
      badgeAr: "تكيف كامل",
    },
    {
      number: "04",
      titleEn: "Design → Code Implementation",
      titleAr: "من التصميم إلى الكود",
      descEn: "Translating Figma designs and UI component systems into clean, maintainable, and production-ready frontend code.",
      descAr: "ترجمة تصاميم Figma ومكونات الواجهات إلى كود برمجي نظيف وقابل للصيانة ومتوافق تماماً مع بيئة الإنتاج.",
      icon: Code2,
      badgeEn: "Pixel Accurate",
      badgeAr: "دقة متناهية",
    },
    {
      number: "05",
      titleEn: "Accessibility & Usability",
      titleAr: "سهولة الوصول وقابلية الاستخدام",
      descEn: "Considering readable typography, clear interaction states, semantic HTML structure, and intuitive user flows.",
      descAr: "مراعاة الخطوط الواضحة المقروءة، وحالات التفاعل النشطة، والهيكلية الدلالية النظيفة، وتدفقات الاستخدام السلسة.",
      icon: Eye,
      badgeEn: "WCAG Aligned",
      badgeAr: "معايير سهولة الوصول",
    },
  ]

  return (
    <Section id="government-ui" className="relative overflow-hidden py-20 sm:py-28 bg-background border-t border-border/60">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(27,131,84,0.06),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-mono font-medium text-primary mb-3"
          >
            <ShieldCheck size={14} />
            <span>{t("gov.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground"
          >
            {t("gov.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-muted-foreground font-light leading-relaxed text-balance"
          >
            {t("gov.desc")}
          </motion.p>
        </div>

        {/* Highlighted SBA Current Role Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-6 sm:p-8 rounded-3xl glass-panel border border-primary/30 bg-primary/[0.03] shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-border/60">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <Building2 size={22} />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider">
                  {isRTL ? "الخبرة المهنية الحالية" : "Current Role & Organization"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-mono text-foreground mt-0.5">
                  {t("gov.roleTitle")}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">
                  {t("gov.roleCompany")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                <Calendar size={12} />
                <span>{t("gov.rolePeriod")}</span>
              </span>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-xs sm:text-sm text-foreground/90 font-light leading-relaxed max-w-4xl">
              {isRTL
                ? "المساهمة في هندسة واجهات المستخدم والتجارب الرقمية للمنصات الحكومية التابعة لهيئة الإذاعة والتلفزيون بالرياض، مع الالتزام بالمعايير الرقمية السعودية، وتصميم مكونات واجهات تفاعلية قابلة لإعادة الاستخدام، ودعم الواجهات العربية RTL، وضمان استقرار التخطيط وتوافقه التام عبر الشاشات المختلفة."
                : "Contributing to UI engineering and digital experiences for Saudi government platforms, with a focus on responsive interfaces, Arabic-first UX, RTL layouts, reusable UI components and Saudi digital design standards."}
            </p>
          </div>
        </motion.div>

        {/* 5 Government UI Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {govCapabilities.map((cap, idx) => {
            const Icon = cap.icon
            const title = isRTL ? cap.titleAr : cap.titleEn
            const desc = isRTL ? cap.descAr : cap.descEn
            const badge = isRTL ? cap.badgeAr : cap.badgeEn

            return (
              <motion.div
                key={cap.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className={idx === 4 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <Hover3DCard depth={15} maxRotate={4} className="h-full p-6 rounded-3xl glass-panel border border-border/80 flex flex-col justify-between shadow-xs hover:border-primary/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-lg font-bold text-foreground/30">
                        {cap.number}
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {badge}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3.5">
                      <Icon size={18} />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-mono text-foreground mb-2">
                      {title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed font-light">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/50 mt-5 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span>{isRTL ? "معتمد للمنصات الحكومية" : "Gov Standard Aligned"}</span>
                    <CheckCircle2 size={13} className="text-primary" />
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
