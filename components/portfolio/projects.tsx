"use client"

import { Section } from "./section"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Sparkles, LayoutDashboard, ArrowUpRight, ArrowRight, ArrowLeft } from "lucide-react"
import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useLanguage } from "./language-context"

type Project = {
  id: string
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  roleEn: string
  roleAr: string
  technologies: string[]
  image: string
  tags: string[]
  live?: string
  github?: string
}

const projects: Project[] = [
  {
    id: "pixelresume",
    titleEn: "PixelResume — Bilingual Resume Builder",
    titleAr: "بكسل ريزيومي — منشئ سيرة ذاتية ثنائي اللغة",
    descriptionEn: "A modern resume builder with live editing, dual Arabic (RTL) and English support, and ATS-friendly PDF export.",
    descriptionAr: "منشئ سيرة ذاتية تفاعلي مع تحرير مباشر، ودعم كامل للغتين العربية والإنجليزية (RTL)، وتصدير PDF متوافق مع أنظمة ATS.",
    roleEn: "Frontend architecture, RTL implementation, responsive UI components, and PDF generator.",
    roleAr: "معمارية الواجهة الأمامية، وتطبيق دعم RTL، وتصميم مكونات الواجهة، وتكامل توليد ملفات PDF.",
    technologies: ["React.js", "Tailwind CSS", "i18n", "RTL Layouts", "PDF Export"],
    image: "/pixelresume-preview.jpg",
    tags: ["React.js", "Tailwind CSS", "RTL"],
    live: "https://pixelresume.netlify.app/",
  },
  {
    id: "aipixelhub",
    titleEn: "AI Pixel Hub — Intelligence Dashboard",
    titleAr: "بكسل هب — لوحة تحليلات الذكاء الاصطناعي",
    descriptionEn: "An analytical platform aggregating AI tools data, metrics, and insights with interactive visual charts.",
    descriptionAr: "منصة تحليلية تفاعلية تجمع بيانات أدوات الذكاء الاصطناعي وتوفر رسوم بيانية ومؤشرات أداء متقدمة.",
    roleEn: "Frontend implementation, dashboard UI components, data visualization, and API integration.",
    roleAr: "تنفيذ الواجهة الأمامية، ومكونات لوحة التحكم، وتصورات البيانات، وربط واجهات البرمجة APIs.",
    technologies: ["React.js", "Firebase", "Analytics APIs", "Tailwind CSS"],
    image: "/ai-dashboard-preview.jpg",
    tags: ["React.js", "Analytics", "Firebase"],
    live: "https://aipixelhubb.netlify.app/",
  },
  {
    id: "portfolio-framer",
    titleEn: "Portfolio UI/UX & Interaction System",
    titleAr: "نظام تصميم الواجهات التفاعلية (Framer)",
    descriptionEn: "An interactive portfolio interface showcasing fluid micro-interactions, responsive grids, and design tokens.",
    descriptionAr: "واجهة تفاعلية حديثة تستعرض الحركات الدقيقة، والشبكات المتجاوبة، وتطبيق أنظمة التصميم العصرية.",
    roleEn: "UI/UX design, interactive prototyping, layout system architecture, and motion curves.",
    roleAr: "تصميم واجهات وتجربة المستخدم، والنماذج التفاعلية الأولية، وهندسة أنظمة التخطيط الحركي.",
    technologies: ["Framer", "UI/UX Design", "Prototyping", "Design Systems"],
    image: "/ai-portfolio-generator-preview.jpg",
    tags: ["Framer", "UI/UX", "Interactive"],
    live: "https://mohammadsinan.framer.website/",
  },
  {
    id: "travel-hub",
    titleEn: "Travel & Destination Explorer",
    titleAr: "منصة استكشاف الوجهات السياحية (Vue.js)",
    descriptionEn: "A travel discovery application built with Vue.js featuring interactive maps, destination filtering, and rich cards.",
    descriptionAr: "تطبيق استكشاف سياحي مبني بـ Vue.js يتميز بخرائط تفاعلية، وتصفية الوجهات، ومكونات عرض متجاوبة.",
    roleEn: "Vue.js component architecture, state management, UI styling, and destination API integration.",
    roleAr: "معمارية مكونات Vue.js، وإدارة الحالة، وتنسيق الواجهات، وربط واجهات البيانات السياحية.",
    technologies: ["Vue.js", "Vuex", "Interactive Maps", "Responsive UI"],
    image: "/wms-app-preview.jpg",
    tags: ["Vue.js", "Frontend"],
    live: "https://travelfolio.netlify.app/",
  },
  {
    id: "saas-landing",
    titleEn: "AI-Powered SaaS Product Interface",
    titleAr: "واجهة منتج SaaS مدعوم بالذكاء الاصطناعي",
    descriptionEn: "A high-conversion landing page with smooth motion, responsive layouts, and modern typography.",
    descriptionAr: "صفحة هبوط تفاعلية لمنتج رقمي بحركات سلسة وتخطيط متجاوب وطباعة عصرية تعزز التفاعل.",
    roleEn: "Frontend engineering, responsive auto-layout, micro-animations, and performance tuning.",
    roleAr: "هندسة الواجهة الأمامية، والتخطيط المتجاوب، والتفاعلات الدقيقة، وتحسين سرعة التحميل.",
    technologies: ["React.js", "Tailwind CSS", "GSAP Motion", "Responsive Design"],
    image: "/saas-builder-preview.jpg",
    tags: ["React.js", "Tailwind CSS", "UI/UX"],
    live: "https://aipoweredbuilder.netlify.app/",
  },
  {
    id: "foodies-heaven",
    titleEn: "Interactive E-Commerce Store",
    titleAr: "تطبيق متجر تجارة إلكترونية تفاعلي",
    descriptionEn: "A responsive e-commerce web application with cart state management, checkout flows, and product catalog.",
    descriptionAr: "تطبيق ويب متجاوب للتجارة الإلكترونية مع إدارة حالة سلة التسوق، ومسارات الدفع، وعرض المنتجات.",
    roleEn: "Frontend UI development, shopping cart state logic, and mobile-first responsive layout.",
    roleAr: "تطوير واجهة المستخدم، وبرمجة منطق سلة التسوق، وبناء التخطيط المتجاوب المخصص للهاتف.",
    technologies: ["React.js", "State Management", "Tailwind CSS", "JavaScript"],
    image: "/foodies heaven.jpg",
    tags: ["React.js", "Frontend"],
    live: "https://foodieshub12.netlify.app/",
  },
]

// 3D Tilt Project Card Component
function ProjectCard3D({ project, index }: { project: Project; index: number }) {
  const { isRTL, t } = useLanguage()
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 220, damping: 24, mass: 0.8 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3.5deg", "-3.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3.5deg", "3.5deg"])
  const imageTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-6px", "6px"])
  const imageTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-6px", "6px"])

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

  const title = isRTL ? project.titleAr : project.titleEn
  const description = isRTL ? project.descriptionAr : project.descriptionEn
  const role = isRTL ? project.roleAr : project.roleEn

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-1000 h-full"
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
        className="group relative flex flex-col justify-between h-full rounded-3xl border border-border bg-card/85 dark:bg-card/45 backdrop-blur-xl p-5 sm:p-7 shadow-xs hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        <div>
          {/* Project Preview Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/80 bg-muted/40 mb-5 group-hover:border-primary/30 transition-colors">
            <motion.div
              style={{
                x: imageTranslateX,
                y: imageTranslateY,
                scale: 1.04,
              }}
              className="w-full h-full relative"
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-300" />
          </div>

          {/* Project Title */}
          <h3 className="text-lg sm:text-xl font-bold font-mono text-foreground tracking-tight group-hover:text-primary transition-colors mb-2">
            {title}
          </h3>

          {/* Concise Description */}
          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-4">
            {description}
          </p>

          {/* Role Snippet */}
          <div className="mb-4 p-2.5 rounded-xl bg-muted/30 border border-border/50 text-[11px] font-mono text-foreground/90">
            <span className="text-primary font-bold">{t("projects.roleLabel")}: </span>
            <span className="text-muted-foreground font-light">{role}</span>
          </div>
        </div>

        <div>
          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-border/50">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-lg bg-background/70 border border-border/70 text-[10px] font-mono text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Live & Code Links */}
          <div className="flex items-center justify-between pt-1">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-bold hover:bg-primary/90 transition-all shadow-xs"
              >
                <span>{t("projects.openLive")}</span>
                <ArrowUpRight size={13} />
              </a>
            ) : (
              <span />
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="View Source Code"
              >
                <Github size={15} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const { t, isRTL } = useLanguage()
  const [filter, setFilter] = useState<string>("All")

  const categories = isRTL
    ? ["الكل", "React.js", "Vue.js", "Framer", "RTL"]
    : ["All", "React.js", "Vue.js", "Framer", "RTL"]

  const filteredProjects = projects.filter((p) => {
    if (filter === "All" || filter === "الكل") return true
    if (filter === "RTL") return p.tags.includes("RTL")
    return p.tags.includes(filter) || p.technologies.includes(filter)
  })

  return (
    <Section id="projects" className="relative overflow-hidden bg-background py-20 sm:py-28 border-t border-border/60" variant="project">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(27,131,84,0.06),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-3.5 py-1.5 text-xs font-mono font-medium text-muted-foreground shadow-xs mb-3"
            >
              <LayoutDashboard size={13} className="text-primary" />
              <span>{t("projects.badge")}</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              {t("projects.title")}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground font-light max-w-2xl leading-relaxed">
              {t("projects.desc")}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl glass-pill border border-border self-start md:self-auto">
            {categories.map((cat, idx) => {
              const active = filter === cat || (idx === 0 && (filter === "All" || filter === "الكل"))
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* 3D Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {filteredProjects.map((project, index) => (
            <ProjectCard3D
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}