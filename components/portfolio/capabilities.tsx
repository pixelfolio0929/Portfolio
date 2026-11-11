"use client"

import { useState } from "react"
import { Section } from "./section"
import { motion } from "framer-motion"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import FolderFloat from "@/components/ui/FolderFloat"
import { Code2, Layout, Component, Palette, Sparkles } from "lucide-react"
import { useLanguage } from "./language-context"

interface CapabilityItem {
  id: string
  titleEn: string
  titleAr: string
  descEn: string
  descAr: string
  icon: any
  color: string
  border: string
  accent: string
  folderLabelEn: string
  folderLabelAr: string
  headlineEn: string
  headlineAr: string
  chipsEn: string[]
  chipsAr: string[]
  folderTheme: {
    folderColor: string
    frontColor: string
    paperColor: string
    itemColor: string
    itemTextColor: string
    labelColor: string
  }
}

function CapabilityCard({ cap, idx, isRTL }: { cap: CapabilityItem; idx: number; isRTL: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = cap.icon
  const title = isRTL ? cap.titleAr : cap.titleEn
  const desc = isRTL ? cap.descAr : cap.descEn
  const folderLabel = isRTL ? cap.folderLabelAr : cap.folderLabelEn
  const headline = isRTL ? cap.headlineAr : cap.headlineEn
  const chips = isRTL ? cap.chipsAr : cap.chipsEn

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Hover3DCard
        depth={16}
        maxRotate={3}
        className="h-full group"
        contentClassName={`h-full min-h-[330px] rounded-3xl border border-border bg-card/85 dark:bg-card/45 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-visible ${cap.border}`}
      >
        <div>
          {/* Card Header: Icon + Cap Number */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${cap.color} border border-border flex items-center justify-center ${cap.accent} transition-transform duration-300 group-hover:scale-105 shadow-xs`}
            >
              <Icon size={20} />
            </div>
            <span className="font-mono text-[11px] font-bold text-muted-foreground/60 tracking-widest uppercase">
              {`0${idx + 1} // CAPABILITY`}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold font-mono text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-5">
            {desc}
          </p>
        </div>

        {/* Bottom Bar: Small Folder in One Line with the Same Chips */}
        <div className="pt-4 border-t border-border/50 flex flex-row items-center justify-between gap-3">
          {/* Small Interactive Folder in One Line */}
          <div className="relative shrink-0">
            <FolderFloat
              items={chips}
              label={folderLabel}
              sublabel={`${chips.length} ${isRTL ? "مهارات" : "chips"}`}
              trigger="hover"
              open={isHovered}
              physics={true}
              drift={0.5}
              width={160}
              height={50}
              radius={10}
              spread={125}
              lift={16}
              tilt={6}
              flapAngle={28}
              restAngle={10}
              openDuration={440}
              bounce={0.25}
              folderColor={cap.folderTheme.folderColor}
              frontColor={cap.folderTheme.frontColor}
              paperColor={cap.folderTheme.paperColor}
              itemColor={cap.folderTheme.itemColor}
              itemTextColor={cap.folderTheme.itemTextColor}
              labelColor={cap.folderTheme.labelColor}
            />
          </div>

          {/* In-line Meta Tag */}
          <div className="flex flex-col items-end text-right min-w-0">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-foreground/80 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="truncate">{headline}</span>
            </span>
            <span className="text-[10px] font-mono text-muted-foreground/50 tracking-tight hidden sm:inline">
              {isRTL ? "فيزياء تفاعلية" : "Hover for Zero-G chips"}
            </span>
          </div>
        </div>
      </Hover3DCard>
    </motion.div>
  )
}

export function Capabilities() {
  const { t, isRTL } = useLanguage()

  const capabilities: CapabilityItem[] = [
    {
      id: "ui-eng",
      titleEn: "UI Engineering",
      titleAr: "هندسة واجهات المستخدم",
      descEn: "Turning designs and interface systems into responsive, reusable frontend interfaces with high visual fidelity and robust state handling.",
      descAr: "تحويل التصاميم وأنظمة الواجهات إلى واجهات أمامية متجاوبة وقابلة لإعادة الاستخدام بدقة بصرية متناهية وبدون أخطاء تخطيط.",
      icon: Code2,
      color: "from-emerald-500/15 to-teal-500/5",
      border: "hover:border-emerald-500/40",
      accent: "text-emerald-500 dark:text-emerald-400",
      folderLabelEn: "UI Engineering",
      folderLabelAr: "هندسة الواجهات",
      headlineEn: "Design-to-Code",
      headlineAr: "تحويل التصميم إلى كود",
      chipsEn: [
        "Design-to-Code",
        "Responsive UI",
        "Component Logic",
        "RTL Mirroring"
      ],
      chipsAr: [
        "Design-to-Code",
        "واجهات متجاوبة",
        "منطق المكونات",
        "دعم الاتجاه RTL"
      ],
      folderTheme: {
        folderColor: "#05131b",
        frontColor: "#0b1926",
        paperColor: "#064e3b",
        itemColor: "#047857",
        itemTextColor: "#ffffff",
        labelColor: "#ffffff"
      }
    },
    {
      id: "frontend-dev",
      titleEn: "Frontend Development",
      titleAr: "تطوير الواجهات الأمامية",
      descEn: "Building modern web interfaces with HTML, CSS, JavaScript and component frameworks like React and Vue with focus on performance.",
      descAr: "بناء واجهات ويب حديثة باستخدام HTML و CSS و JavaScript وأطر عمل مثل React و Vue مع التركيز على الأداء وسلاسة التصفح.",
      icon: Layout,
      color: "from-cyan-500/15 to-blue-500/5",
      border: "hover:border-cyan-500/40",
      accent: "text-cyan-500 dark:text-cyan-400",
      folderLabelEn: "Frontend Dev",
      folderLabelAr: "تطوير الواجهات",
      headlineEn: "Modern Frameworks",
      headlineAr: "أطر عمل حديثة",
      chipsEn: [
        "React.js",
        "Vue.js",
        "Tailwind CSS",
        "REST APIs"
      ],
      chipsAr: [
        "React.js",
        "Vue.js",
        "Tailwind CSS",
        "REST APIs"
      ],
      folderTheme: {
        folderColor: "#071728",
        frontColor: "#0c1f36",
        paperColor: "#0e7490",
        itemColor: "#0284c7",
        itemTextColor: "#ffffff",
        labelColor: "#ffffff"
      }
    },
    {
      id: "design-systems",
      titleEn: "Design Systems",
      titleAr: "أنظمة التصميم",
      descEn: "Working with reusable components, visual consistency, spacing, typography and responsive patterns aligned with unified design tokens.",
      descAr: "التعامل مع المكونات القابلة لإعادة الاستخدام، والاتساق البصري، وقواعد التباعد، والخطوط، والأنماط المتوافقة مع متغيرات التصميم.",
      icon: Component,
      color: "from-amber-500/15 to-orange-500/5",
      border: "hover:border-amber-500/40",
      accent: "text-amber-500 dark:text-amber-400",
      folderLabelEn: "Design Systems",
      folderLabelAr: "أنظمة التصميم",
      headlineEn: "Unified Tokens",
      headlineAr: "معايير موحدة",
      chipsEn: [
        "Token Hierarchy",
        "DGA Standards",
        "Reusable Units",
        "WCAG 2.1 AA"
      ],
      chipsAr: [
        "Token Hierarchy",
        "معايير DGA",
        "وحدات يعاد استخدامها",
        "WCAG 2.1 AA"
      ],
      folderTheme: {
        folderColor: "#1a1205",
        frontColor: "#261a08",
        paperColor: "#78350f",
        itemColor: "#d97706",
        itemTextColor: "#ffffff",
        labelColor: "#ffffff"
      }
    },
    {
      id: "ui-ux",
      titleEn: "UI/UX Design",
      titleAr: "تصميم واجهات وتجربة المستخدم",
      descEn: "Designing clear interfaces and translating user requirements into usable, intuitive, and accessible digital experiences in Figma.",
      descAr: "تصميم واجهات واضحة وترجمة متطلبات المستخدمين إلى تجارب رقمية عملية وسهلة الاستخدام عبر Figma.",
      icon: Palette,
      color: "from-purple-500/15 to-pink-500/5",
      border: "hover:border-purple-500/40",
      accent: "text-purple-500 dark:text-purple-400",
      folderLabelEn: "UI/UX Design",
      folderLabelAr: "تصميم UI/UX",
      headlineEn: "Figma Architecture",
      headlineAr: "نماذج فيجما",
      chipsEn: [
        "Figma Wireframes",
        "User Flows",
        "Interactive Prototypes",
        "Visual Hierarchy"
      ],
      chipsAr: [
        "Figma Wireframes",
        "User Flows",
        "Interactive Prototypes",
        "Visual Hierarchy"
      ],
      folderTheme: {
        folderColor: "#170a26",
        frontColor: "#220f38",
        paperColor: "#581c87",
        itemColor: "#7c3aed",
        itemTextColor: "#ffffff",
        labelColor: "#ffffff"
      }
    },
  ]

  return (
    <Section id="capabilities" className="relative overflow-visible bg-background py-20 sm:py-28 border-t border-border/60">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch pt-4">
          {capabilities.map((cap, idx) => (
            <CapabilityCard key={cap.id} cap={cap} idx={idx} isRTL={isRTL} />
          ))}
        </div>

      </div>
    </Section>
  )
}
