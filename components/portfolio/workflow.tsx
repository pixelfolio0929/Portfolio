"use client"

import { useRef } from "react"
import { Section } from "./section"
import { motion, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion"
import {
  Calendar,
  Briefcase,
  MapPin,
  Building2,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Code2
} from "lucide-react"
import { useLanguage } from "./language-context"

interface ExperienceItem {
  id: string
  companyEn: string
  companyAr: string
  roleEn: string
  roleAr: string
  periodEn: string
  periodAr: string
  locationEn: string
  locationAr: string
  badgeEn: string
  badgeAr: string
  descriptionEn: string
  descriptionAr: string
  accomplishmentsEn: string[]
  accomplishmentsAr: string[]
  tools: string[]
  isCurrent?: boolean
}

const experiencesData: ExperienceItem[] = [
  {
    id: "sba",
    companyEn: "Saudi Broadcasting Authority (SBA)",
    companyAr: "هيئة الإذاعة والتلفزيون (SBA)",
    roleEn: "UI Engineer / UI Developer",
    roleAr: "مهندس ومطور واجهات مستخدم (UI Engineer / UI Developer)",
    periodEn: "2026 — PRESENT",
    periodAr: "2026 — حتى الآن",
    locationEn: "Riyadh, Saudi Arabia",
    locationAr: "الرياض، المملكة العربية السعودية",
    badgeEn: "Government Enterprise",
    badgeAr: "منظومة حكومية رسمية",
    isCurrent: true,
    descriptionEn: "Contributing to UI engineering, UI development, and digital experiences for Saudi government platforms, with a focus on responsive interfaces, Arabic-first UX, RTL layouts, reusable UI components and Saudi digital design standards.",
    descriptionAr: "المساهمة في هندسة وتطوير واجهات المستخدم والتجارب الرقمية للمنصات الحكومية السعودية، مع التركيز على الواجهات المتجاوبة، وتجربة المستخدم الموجهة للعربية، وتخطيطات RTL، والمكونات القابلة لإعادة الاستخدام، ومعايير التصميم الرقمي السعودية.",
    accomplishmentsEn: [
      "Engineered Saudi Digital Government Authority (DGA) aligned design tokens and components.",
      "Architected 100% bidirectional Arabic (RTL) optical balance and typography scaling.",
      "Integrated modular UI components with enterprise ASP.NET backend workflows.",
      "Built resilient, fluid layouts across 4K displays, tablets, and mobile devices."
    ],
    accomplishmentsAr: [
      "هندسة وتطبيق محددات ومكونات التصميم المتوافقة مع معايير هيئة الحكومة الرقمية (DGA).",
      "معمارية ثنائية الاتجاه مع ضبط متقدم للتوازن البصري والطباعة العربية (RTL).",
      "دمج مكونات الواجهات المعيارية مع بيئة العمل والأنظمة المؤسسية ASP.NET.",
      "بناء تخطيطات فائقة المرونة تتكيف بامتياز عبر مختلف مقاسات الشاشات والأجهزة."
    ],
    tools: ["DGA Standards", "HTML5", "CSS3", "JavaScript", "ASP.NET (UI)", "Figma", "Arabic RTL", "Responsive UI", "Git"]
  },
  {
    id: "almasons",
    companyEn: "Almasons",
    companyAr: "ألمسونز (Almasons)",
    roleEn: "Frontend Developer",
    roleAr: "مطور واجهات أمامية (Frontend Developer)",
    periodEn: "FEB 2025 — DEC 2025",
    periodAr: "فبراير 2025 — ديسمبر 2025",
    locationEn: "Mangalore",
    locationAr: "مانجلور",
    badgeEn: "Frontend Systems",
    badgeAr: "تطوير الأنظمة الأمامية",
    descriptionEn: "Architected modern frontend systems using Vue.js and React.js. Engineered responsive, high-performance dashboards, integrated complex REST APIs, and built scalable component libraries.",
    descriptionAr: "تطوير واجهات أمامية حديثة باستخدام Vue.js و React.js. بناء لوحات تحكم تفاعلية عالية الأداء، وربط واجهات برمجة التطبيقات REST APIs، وبناء مكتبات المكونات القابلة لإعادة الاستخدام.",
    accomplishmentsEn: [
      "Developed reactive, high-performance dashboards with Vue.js and React.js.",
      "Integrated authenticated REST APIs and optimized frontend state management.",
      "Created reusable UI patterns and cross-functional design-to-code workflows.",
      "Streamlined code reviews and version control via GitLab and GitHub."
    ],
    accomplishmentsAr: [
      "تطوير لوحات تحكم تفاعلية عالية السرعة باستخدام Vue.js و React.js.",
      "ربط واجهات برمجة التطبيقات REST APIs وإدارة الحالة البرمجية بكفاءة.",
      "إنشاء أنماط واجهات قابلة لإعادة الاستخدام لتسريع وتيرة التطوير.",
      "إدارة مراجعات الكود البرمجي والتحكم بالإصدارات عبر GitLab و GitHub."
    ],
    tools: ["Vue.js", "React.js", "GitLab", "REST APIs", "SQL", "Figma", "GitHub", "Responsive Design"]
  },
  {
    id: "whitebook",
    companyEn: "Whitebook World",
    companyAr: "وايت بوك وورلد (Whitebook World)",
    roleEn: "UI + Graphic Designer",
    roleAr: "مصمم واجهات المستخدم (UI + Graphic Designer)",
    periodEn: "SEP 2024 — FEB 2025",
    periodAr: "سبتمبر 2024 — فبراير 2025",
    locationEn: "Bangalore",
    locationAr: "بنغالور",
    badgeEn: "Design & Prototyping",
    badgeAr: "التصميم والنماذج الأولية",
    descriptionEn: "Designed high-fidelity user interface concepts, interactive prototypes, and layout systems using Figma. Established coherent styling standards and assets for streamlined developer handover.",
    descriptionAr: "تصميم واجهات مستخدم عالية الدقة، ونماذج تفاعلية أولية، وهياكل تصميم باستخدام Figma و Photoshop. وضع معايير تصميم موحدة لتسهيل التسليم لفريق التطوير البرمجي.",
    accomplishmentsEn: [
      "Produced pixel-perfect Figma component systems with auto-layout and responsive constraints.",
      "Built interactive prototypes validating complex user flows prior to engineering.",
      "Authored clear design tokens and developer specification documentation."
    ],
    accomplishmentsAr: [
      "تصميم مكتبات مكونات دقيقة في Figma بالاعتماد على Auto-layout والقيود التفاعلية.",
      "بناء نماذج أولية تفاعلية لاختبار وتحسين تدفقات تجربة المستخدم قبل البرمجة.",
      "توثيق محددات التصميم (Tokens) ومواصفات التسليم المباشر للمطورين."
    ],
    tools: ["Figma", "Adobe Photoshop", "Prototyping", "Design Systems", "User Flows", "Design Tokens"]
  },
  {
    id: "freelance",
    companyEn: "Freelance",
    companyAr: "عمل حر / مستقل (Freelance)",
    roleEn: "UI Designer & Developer",
    roleAr: "مصمم ومطور واجهات (UI Designer & Developer)",
    periodEn: "2022 — 2025",
    periodAr: "2022 — 2025",
    locationEn: "Remote",
    locationAr: "عن بُعد",
    badgeEn: "Independent Delivery",
    badgeAr: "تسليم مستقل وشامل",
    descriptionEn: "Delivered digital interfaces, visual branding, and interactive UI mockups aligned with conversion, responsive performance, and usability best practices.",
    descriptionAr: "تقديم تصاميم رقمية وهويات بصرية للعملاء مع تصميم وتطوير واجهات استخدام متجاوبة وموجهة لتعزيز تجربة المستخدم ومعدلات التحويل.",
    accomplishmentsEn: [
      "Delivered end-to-end responsive web applications from concept to deployment.",
      "Crafted conversion-optimized landing pages with clean HTML5/CSS3 and modern JavaScript.",
      "Maintained 100% on-time client project completion and ongoing client satisfaction."
    ],
    accomplishmentsAr: [
      "تسليم مشاريع رقمية متكاملة للعملاء من مرحلة الفكرة وحتى الإطلاق الحي.",
      "بناء صفحات هبوط ذات معدلات تحويل عالية بكود HTML5/CSS3 و JavaScript نظيف.",
      "الالتزام الكامل بالجداول الزمنية وتقديم تجارب مستخدم عالية الرضا."
    ],
    tools: ["Figma", "Adobe Photoshop", "HTML/CSS", "JavaScript", "Responsive UI", "Web Performance"]
  }
]

// 3D Tilt Experience Card
function ExperienceCard3D({ exp, index }: { exp: ExperienceItem; index: number }) {
  const { isRTL } = useLanguage()
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 240, damping: 25, mass: 0.7 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(xPct)
    mouseY.set(yPct)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const company = isRTL ? exp.companyAr : exp.companyEn
  const role = isRTL ? exp.roleAr : exp.roleEn
  const period = isRTL ? exp.periodAr : exp.periodEn
  const location = isRTL ? exp.locationAr : exp.locationEn
  const badge = isRTL ? exp.badgeAr : exp.badgeEn
  const desc = isRTL ? exp.descriptionAr : exp.descriptionEn
  const accomplishments = isRTL ? exp.accomplishmentsAr : exp.accomplishmentsEn

  return (
    <div className="perspective-1200 w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className={`group relative rounded-3xl border ${
          exp.isCurrent
            ? "border-primary/50 bg-primary/[0.04] dark:bg-primary/[0.03] shadow-lg shadow-primary/5"
            : "border-border/80 bg-card/90 dark:bg-card/45"
        } backdrop-blur-xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-300 overflow-hidden`}
      >
        {/* Glow ambient highlight */}
        <div
          className={`absolute -top-24 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
            exp.isCurrent ? "bg-primary/20 opacity-60" : "bg-primary/10 opacity-20 group-hover:opacity-40"
          }`}
        />

        {/* Card Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 mb-4 pb-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                exp.isCurrent
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-primary/10 text-primary border border-primary/20"
              }`}
            >
              <Calendar size={12} />
              <span>{period}</span>
            </span>
            {exp.isCurrent && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            )}
          </div>

          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-muted text-muted-foreground uppercase tracking-wider">
            {badge}
          </span>
        </div>

        {/* Company & Role */}
        <div className="relative z-10 mb-4">
          <h3 className="text-xl sm:text-2xl font-extrabold font-mono text-foreground tracking-tight group-hover:text-primary transition-colors">
            {role}
          </h3>

          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs sm:text-sm font-mono text-muted-foreground">
            <span className="text-primary font-bold">{company}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1 font-light">
              <MapPin size={12} className="text-primary" />
              <span>{location}</span>
            </span>
          </div>
        </div>

        {/* Overview Description */}
        <p className="relative z-10 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-5">
          {desc}
        </p>

        {/* Accomplishments Bullet Points */}
        <div
          style={{ transform: "translateZ(15px)" }}
          className="relative z-10 mb-6 space-y-2"
        >
          <div className="text-[11px] font-mono text-foreground/90 uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
            <Sparkles size={12} className="text-primary" />
            <span>{isRTL ? "أبرز الإنجازات والمسؤوليات:" : "Key Deliverables & Responsibilities:"}</span>
          </div>
          {accomplishments.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground font-light leading-relaxed">
              <CheckCircle2 size={13} className="text-primary shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Tools and Technologies Chips */}
        <div
          style={{ transform: "translateZ(20px)" }}
          className="relative z-10 pt-4 border-t border-border/60 flex flex-wrap gap-1.5"
        >
          {exp.tools.map((tool, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-xl bg-background/80 border border-border/80 text-[10px] font-mono text-foreground/80 hover:border-primary/40 transition-colors"
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function Workflow() {
  const { t, isRTL } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 80%"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001
  })

  return (
    <Section
      id="experience"
      className="relative overflow-hidden bg-background py-20 sm:py-28 border-t border-border/60"
    >
      {/* Background Studio Grids and Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(27,131,84,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-15 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-14 sm:mb-20 relative z-10 px-4">
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

      {/* Timeline Container */}
      <div ref={containerRef} className="max-w-4xl mx-auto relative px-4 sm:px-6">
        
        {/* Base Timeline Rail */}
        <div
          className={`absolute top-0 bottom-0 ${
            isRTL ? "right-4 sm:right-6 md:right-1/2 md:translate-x-1/2" : "left-4 sm:left-6 md:left-1/2 md:-translate-x-1/2"
          } w-0.5 bg-border/80 z-0`}
        />
        
        {/* Animated Neon Glowing Progress Beam */}
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className={`absolute top-0 bottom-0 ${
            isRTL ? "right-4 sm:right-6 md:right-1/2 md:translate-x-1/2" : "left-4 sm:left-6 md:left-1/2 md:-translate-x-1/2"
          } w-0.5 bg-gradient-to-b from-primary via-emerald-400 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.5)] z-0`}
        />

        {/* Milestone Cards Tree */}
        <div className="space-y-12 sm:space-y-16 relative z-10">
          {experiencesData.map((exp, index) => {
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col md:flex-row items-stretch ${
                  isEven ? "md:flex-row-reverse" : ""
                } gap-6 sm:gap-10 relative`}
              >
                {/* Timeline Pulsing Node */}
                <div
                  className={`absolute top-8 ${
                    isRTL
                      ? "right-4 sm:right-6 md:right-1/2 md:translate-x-1/2"
                      : "left-4 sm:left-6 md:left-1/2 md:-translate-x-1/2"
                  } w-6 h-6 -ml-3 -mr-3 rounded-full bg-background border-2 ${
                    exp.isCurrent ? "border-primary shadow-[0_0_12px_rgba(16,185,129,0.6)]" : "border-border"
                  } flex items-center justify-center z-20`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      exp.isCurrent ? "bg-primary animate-ping" : "bg-muted-foreground/60"
                    }`}
                  />
                  <div
                    className={`w-2 h-2 rounded-full absolute ${
                      exp.isCurrent ? "bg-primary" : "bg-muted-foreground"
                    }`}
                  />
                </div>

                {/* 3D Content Card (Half Width on md+) */}
                <div
                  className={`w-full md:w-[calc(50%-2rem)] ${
                    isRTL ? "pr-8 sm:pr-12 md:pr-0" : "pl-8 sm:pl-12 md:pl-0"
                  }`}
                >
                  <ExperienceCard3D exp={exp} index={index} />
                </div>

                {/* Alternating Spacer Column */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            )
          })}
        </div>

      </div>
    </Section>
  )
}
