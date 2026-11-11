"use client"

import { useRef, useState } from "react"
import { Section } from "./section"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  Wrench,
  FileCode,
  FileCode2,
  Braces,
  Atom,
  Boxes,
  Wind,
  LayoutGrid,
  PenTool,
  Palette,
  Component,
  Smartphone,
  Languages,
  Image as ImageIcon,
  Server,
  Terminal,
  Database,
  HardDrive,
  Network,
  GitBranch,
  Code2,
  BookOpen,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Zap
} from "lucide-react"
import { useLanguage } from "./language-context"

interface SkillItem {
  name: string
  icon: any
  tag?: string
}

interface SkillCategory {
  id: string
  number: string
  titleEn: string
  titleAr: string
  descEn: string
  descAr: string
  badgeEn: string
  badgeAr: string
  glowColor: string
  borderColor: string
  accentColor: string
  isLearning?: boolean
  learningNoteEn?: string
  learningNoteAr?: string
  skills: SkillItem[]
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    number: "01",
    titleEn: "Frontend Development",
    titleAr: "تطوير الواجهات الأمامية",
    descEn: "Building responsive, component-driven user interfaces with modern web standards, semantic HTML, and high-performance state handling.",
    descAr: "بناء واجهات مستخدم متجاوبة تعتمد على معمارية المكونات الحديثة، والترميز الدلالي النظيف، وإدارة الحالة عالية الأداء.",
    badgeEn: "Core Production Stack",
    badgeAr: "الحزمة الأساسية للإنتاج",
    glowColor: "rgba(16, 185, 129, 0.15)",
    borderColor: "hover:border-emerald-500/50",
    accentColor: "text-emerald-500",
    skills: [
      { name: "HTML5", icon: FileCode, tag: "Semantic" },
      { name: "CSS3 / Modern CSS", icon: FileCode2, tag: "Flex & Grid" },
      { name: "JavaScript (ES6+)", icon: Braces, tag: "Modern JS" },
      { name: "React.js", icon: Atom, tag: "Components" },
      { name: "Vue.js", icon: Boxes, tag: "Reactive" },
      { name: "Tailwind CSS", icon: Wind, tag: "Utility First" },
      { name: "Bootstrap", icon: LayoutGrid, tag: "Grid System" },
    ],
  },
  {
    id: "ui-design",
    number: "02",
    titleEn: "UI/UX & Design Systems",
    titleAr: "تصميم الواجهات وأنظمة التصميم",
    descEn: "Structuring unified design tokens, atomic component libraries, fluid typography scales, and authentic bidirectional Arabic (RTL) layouts.",
    descAr: "هندسة متغيرات التصميم الموحدة، ومكتبات المكونات الذرية، وسلالم الخطوط المتكيفة، وتخطيطات اللغة العربية ثنائية الاتجاه (RTL).",
    badgeEn: "Design & Design Tokens",
    badgeAr: "التصميم والنظم",
    glowColor: "rgba(59, 130, 246, 0.15)",
    borderColor: "hover:border-blue-500/50",
    accentColor: "text-blue-500",
    skills: [
      { name: "Figma", icon: PenTool, tag: "Design Systems" },
      { name: "UI/UX Design", icon: Palette, tag: "User Flows" },
      { name: "Design Tokens", icon: Component, tag: "Atomic Units" },
      { name: "Responsive UI", icon: Smartphone, tag: "Multi-Screen" },
      { name: "Arabic RTL Layouts", icon: Languages, tag: "Native 100%" },
      { name: "Adobe Photoshop", icon: ImageIcon, tag: "Visuals" },
    ],
  },
  {
    id: "backend-tools",
    number: "03",
    titleEn: "Backend & Enterprise Tools",
    titleAr: "الخلفية البرمجية والأدوات المؤسسية",
    descEn: "Enterprise backend connectivity, data modeling, RESTful API consumption, and collaborative version control workflows.",
    descAr: "ربط واجهات الأنظمة المؤسسية، ونماذج البيانات، واستهلاك واجهات البرمجة REST APIs، وإدارة النسخ البرمجية الاحترافية.",
    badgeEn: "Enterprise & Tooling",
    badgeAr: "أدوات وأنظمة مؤسسية",
    glowColor: "rgba(168, 85, 247, 0.15)",
    borderColor: "hover:border-purple-500/50",
    accentColor: "text-purple-500",
    skills: [
      { name: "ASP.NET (Basic / UI)", icon: Server, tag: "Enterprise UI" },
      { name: "Python", icon: Terminal, tag: "Scripting" },
      { name: "SQL & Relational DBs", icon: Database, tag: "Queries" },
      { name: "MySQL", icon: HardDrive, tag: "Storage" },
      { name: "REST APIs", icon: Network, tag: "Integration" },
      { name: "Git & GitHub", icon: GitBranch, tag: "Version Control" },
    ],
  },
  {
    id: "currently-learning",
    number: "04",
    titleEn: "Currently Learning — Angular",
    titleAr: "قيد التعلم — مسار Angular",
    descEn: "Technologies in the active learning and development stage tailored for Saudi government enterprise platform requirements.",
    descAr: "تقنيات في مرحلة التعلم النشط والتطوير المستمر تلبيةً لمتطلبات وتوسعات المنصات الحكومية السعودية.",
    badgeEn: "Learning Track → Main Stack",
    badgeAr: "مرحلة التعلم ← الحزمة الأساسية",
    glowColor: "rgba(245, 158, 11, 0.18)",
    borderColor: "border-amber-500/40 hover:border-amber-500/60",
    accentColor: "text-amber-500",
    isLearning: true,
    learningNoteEn: "Actively learning Angular for SBA UI engineering & development work. Will graduate to the primary frontend stack once deployed in production.",
    learningNoteAr: "أتعلم Angular بنشاط لمتطلبات هندسة وتطوير واجهات المستخدم في هيئة الإذاعة والتلفزيون (SBA)، وستتم إضافتها إلى الحزمة الأمامية الأساسية فور اعتمادها في الإنتاج.",
    skills: [
      { name: "Angular", icon: Code2, tag: "Active Focus" },
      { name: "TypeScript Core", icon: Braces, tag: "Strict Types" },
      { name: "RxJS Observables", icon: Zap, tag: "Reactive Streams" },
      { name: "Component Lifecycle", icon: Boxes, tag: "Architecture" },
    ],
  },
]

// 3D Interactive Floating Card with Cursor Follow & Depth Parallax
function SkillCard3D({ category, index }: { category: SkillCategory; index: number }) {
  const { isRTL } = useLanguage()
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 240, damping: 24, mass: 0.7 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"])
  const floatZ = useTransform(mouseXSpring, [-0.5, 0.5], [10, 25])

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

  const title = isRTL ? category.titleAr : category.titleEn
  const desc = isRTL ? category.descAr : category.descEn
  const badge = isRTL ? category.badgeAr : category.badgeEn
  const note = isRTL ? category.learningNoteAr : category.learningNoteEn

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1200 h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`group relative flex flex-col justify-between h-full rounded-3xl border border-border/80 bg-card/85 dark:bg-card/45 backdrop-blur-xl p-6 sm:p-8 shadow-xl transition-all duration-300 overflow-hidden ${category.borderColor} ${
          category.isLearning ? "bg-amber-500/[0.02] border-amber-500/30" : ""
        }`}
      >
        {/* Ambient Top Glow reacting to 3D perspective */}
        <div
          className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ backgroundColor: category.glowColor }}
        />

        {/* Top Header Row */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono tracking-widest uppercase text-muted-foreground">
              {`${category.number} // ${category.id.toUpperCase()}`}
            </span>
            <span
              className={`text-[10px] sm:text-[11px] font-mono px-3 py-1 rounded-full font-bold flex items-center gap-1.5 ${
                category.isLearning
                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                  : "bg-primary/10 text-primary border border-primary/20"
              }`}
            >
              {category.isLearning ? <BookOpen size={12} /> : <Sparkles size={12} />}
              <span>{badge}</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold font-mono text-foreground tracking-tight group-hover:text-primary transition-colors mb-2.5">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-6">
            {desc}
          </p>

          {/* Special Learning Track Callout if Angular */}
          {category.isLearning && note && (
            <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs font-mono text-amber-600 dark:text-amber-400 leading-relaxed flex items-start gap-2.5">
              <ShieldCheck size={16} className="shrink-0 mt-0.5 text-amber-500" />
              <span>{note}</span>
            </div>
          )}
        </div>

        {/* 3D Floating Skill Chips */}
        <div
          style={{ transform: "translateZ(25px)" }}
          className="relative z-10 pt-4 border-t border-border/50"
        >
          <div className="text-[11px] font-mono text-muted-foreground mb-3 uppercase tracking-wider">
            {isRTL ? "المهارات والأدوات الأساسية:" : "Active Technologies & Capabilities:"}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {category.skills.map((skill) => {
              const IconComp = skill.icon
              return (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.03, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-background/80 hover:bg-background border border-border/70 hover:border-primary/40 text-foreground transition-all duration-200 shadow-2xs group/chip cursor-default"
                >
                  <div className={`p-1.5 rounded-xl bg-muted/60 border border-border/50 ${category.accentColor} group-hover/chip:scale-110 transition-transform`}>
                    <IconComp size={15} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono font-semibold text-foreground truncate">
                      {skill.name}
                    </div>
                    {skill.tag && (
                      <div className="text-[10px] font-mono text-muted-foreground truncate">
                        {skill.tag}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </motion.div>
    </motion.div>
  )
}

export function Skills() {
  const { t, isRTL } = useLanguage()

  return (
    <Section id="skills" className="relative overflow-hidden bg-background py-20 sm:py-28 border-t border-border/60">
      {/* Subtle Studio Architectural Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(27,131,84,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-15 pointer-events-none" />
      
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-4 py-1.5 text-xs font-mono font-medium text-muted-foreground shadow-xs mb-3.5"
          >
            <Wrench size={13} className="text-primary" />
            <span>{t("skills.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
          >
            {t("skills.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
          >
            {t("skills.desc")}
          </motion.p>
        </div>

        {/* 3D Floating Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {skillCategories.map((category, index) => (
            <SkillCard3D
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>

      </div>
    </Section>
  )
}
