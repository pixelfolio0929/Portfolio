"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Section } from "./section"
import { useLanguage } from "./language-context"
import {
  LayoutDashboard,
  ShieldAlert,
  Clock,
  Layers,
  CheckCircle2,
  Code2,
  X,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Building2,
  MapPin,
  ExternalLink,
  Eye,
  Sparkles
} from "lucide-react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"

export interface ProjectDetail {
  id: string
  titleEn: string
  titleAr: string
  taglineEn: string
  taglineAr: string
  descEn: string
  descAr: string
  roleEn: string
  roleAr: string
  category: "all" | "gov" | "live"
  badgeEn: string
  badgeAr: string
  technologies: string[]
  image: string
  isWorkMode?: boolean
  isOfficialWork?: boolean
  organizationEn?: string
  organizationAr?: string
  officeLocationEn?: string
  officeLocationAr?: string
  workModeNoteEn?: string
  workModeNoteAr?: string
  live?: string
  highlightsEn: string[]
  highlightsAr: string[]
}

const detailedProjects: ProjectDetail[] = [
  {
    id: "sba-portal",
    titleEn: "Saudi Broadcasting Authority (SBA) — Official Platform",
    titleAr: "هيئة الإذاعة والتلفزيون — مشروع المنصة الرسمية",
    taglineEn: "Official In-Office Government Workplace Project · UI Engineering (Riyadh HQ)",
    taglineAr: "مشروع حكومي رسمي مباشر • هندسة وتطوير واجهات المستخدم بمقر الهيئة بالرياض",
    descEn: "Actively working on-site as UI Engineer at Saudi Broadcasting Authority (SBA) in Riyadh. Engineering national broadcast interfaces, Saudi DGA design tokens, bidirectional Arabic RTL layout, and responsive enterprise architectures.",
    descAr: "العمل الفعلي بمقر هيئة الإذاعة والتلفزيون بالرياض كمهندس ومطور واجهات مستخدم. أساهم في بناء الواجهات الرقمية الرسمية وفق معايير DGA وهندسة أنظمة RTL المتجاوبة وتكامل قوالب ASP.NET.",
    roleEn: "Official In-Office UI Engineer / UI Developer (2026 — Present): Frontend architecture, Saudi DGA design tokens, bidirectional RTL layouts, and ASP.NET UI integration.",
    roleAr: "المهندس الرسمي لواجهات المستخدم بمقر الهيئة (2026 — حتى الآن): معمارية الواجهات، وتطبيق معايير DGA، والطباعة العربية RTL، وتكامل واجهات ASP.NET.",
    category: "gov",
    badgeEn: "Official In-Office Project",
    badgeAr: "مشروع رسمي مباشر بالهيئة",
    isOfficialWork: true,
    organizationEn: "Saudi Broadcasting Authority (SBA)",
    organizationAr: "هيئة الإذاعة والتلفزيون",
    officeLocationEn: "Riyadh Headquarters, Saudi Arabia",
    officeLocationAr: "المقر الرئيسي بالرياض، المملكة العربية السعودية",
    technologies: ["DGA Standards", "Arabic RTL", "ASP.NET UI", "JavaScript", "Responsive UI", "Figma"],
    image: "/Coding Workspace.png",
    isWorkMode: true,
    workModeNoteEn: "Official ongoing workplace assignment at Saudi Broadcasting Authority (SBA) Headquarters in Riyadh. Currently under active in-office development and staging (not yet publicly published).",
    workModeNoteAr: "مشروع عمل رسمي مباشر بمقر هيئة الإذاعة والتلفزيون بالرياض. قيد التطوير البرمجي والتشغيل الداخلي في بيئة العمل الرسمية — غير منشور للعامة بعد.",
    highlightsEn: [
      "Official workplace assignment at SBA Headquarters in Riyadh.",
      "Strict compliance with Saudi Digital Government Authority (DGA) design standards.",
      "100% bidirectional Arabic (RTL) optical balance and typography scaling.",
      "Reusable UI component system built for national enterprise scale.",
    ],
    highlightsAr: [
      "مشروع عمل رسمي بمقر الهيئة الرئيسي في العاصمة الرياض.",
      "توافق كامل مع معايير ومحددات هيئة الحكومة الرقمية السعودية (DGA).",
      "تصميم ثنائي اللغة مع ضبط متقدم للتوازن البصري والطباعة العربية (RTL).",
      "بناء مكتبة مكونات واجهات قابلة لإعادة الاستخدام للمنظومات المؤسسية.",
    ],
  },
  {
    id: "b2b-sba",
    titleEn: "B2B.SBA.sa — Official Government Partner Portal",
    titleAr: "منصة الأعمال الرقمية الرسمية B2B.SBA.sa — هيئة الإذاعة والتلفزيون",
    taglineEn: "Official Enterprise B2B Media & Clearance Portal · Active SBA Project",
    taglineAr: "بوابة الأعمال والشراكات الرقمية الرسمية • مشروع رسمي بالهيئة",
    descEn: "Official enterprise B2B portal serving production houses, media agencies, and business partners with SBA, enabling automated permits, clearances, and airtime reservations.",
    descAr: "بوابة رقمية مخصصة لشركات الإنتاج وشركاء الأعمال لتسهيل تصاريح التصوير وحجوزات البث التلفزيوني والخدمات التجارية المؤتمتة.",
    roleEn: "Frontend UI engineering, data tables, multi-step workflow logic, and accessible forms.",
    roleAr: "تطوير الواجهة الأمامية، وجداول البيانات، وتدفقات النماذج المعقدة، والأنماط المتجاوبة.",
    category: "gov",
    badgeEn: "Official Govt B2B",
    badgeAr: "مشروع رسمي B2B",
    isOfficialWork: true,
    organizationEn: "Saudi Broadcasting Authority (SBA)",
    organizationAr: "هيئة الإذاعة والتلفزيون",
    officeLocationEn: "Riyadh HQ",
    officeLocationAr: "الرياض",
    technologies: ["JavaScript", "ASP.NET UI", "Tailwind CSS", "REST APIs", "Design Systems"],
    image: "/wms-app-preview.jpg",
    isWorkMode: true,
    workModeNoteEn: "Enterprise B2B portal in active development under SBA. Manages automated partner workflows — currently in work mode, not yet published.",
    workModeNoteAr: "منصة B2B مؤسسية قيد التطوير البرمجي والتشغيل الداخلي النشط تحت إشراف SBA. تدير طلبات الأعمال والشراكات — غير منشورة للعامة حالياً.",
    highlightsEn: [
      "Streamlined multi-step commercial verification pipelines.",
      "High-density responsive data tables with column filtering.",
      "Role-based enterprise permissions and native Arabic interaction patterns.",
    ],
    highlightsAr: [
      "تبسيط مسارات التحقق وتقديم الطلبات التجارية متعددة المراحل.",
      "جداول بيانات غنية تدعم التصفية المتقدمة والتكيف مع الشاشات.",
      "أنماط تفاعل عربية أصلية مخصصة لقطاع الأعمال والشركاء التجاريين.",
    ],
  },
  {
    id: "pixelresume",
    titleEn: "PixelResume — Bilingual ATS Resume Builder",
    titleAr: "بكسل ريزيومي — منشئ السيرة الذاتية الذكي",
    taglineEn: "Bilingual ATS-friendly resume builder with live editing",
    taglineAr: "منشئ سيرة ذاتية ذكي ثنائي اللغة متوافق مع ATS",
    descEn: "Modern browser resume builder engineered with React.js, featuring real-time preview, instant Arabic/English layout switching, and ATS-friendly PDF export.",
    descAr: "منصة ويب متطورة مبنية بـ React.js تتيح إنشاء وتخصيص السير الذاتية مع معاينة حية فورية وتصدير PDF متوافق مع ATS.",
    roleEn: "Frontend architecture, RTL layout engine, and client-side PDF export compiler.",
    roleAr: "معمارية الواجهة الأمامية، ومحرك تخطيط RTL التفاعلي، ومحول ملفات PDF.",
    category: "live",
    badgeEn: "React.js • Live",
    badgeAr: "تطبيق حي مباشر",
    technologies: ["React.js", "Tailwind CSS", "i18n Engine", "PDF Export", "Framer Motion"],
    image: "/pixelresume-preview.jpg",
    live: "https://pixelresume.netlify.app/",
    highlightsEn: [
      "Zero-latency synchronized live preview.",
      "Dynamic typography balancing Arabic and Latin scripts.",
      "Precise ATS-friendly multi-page pagination algorithm.",
    ],
    highlightsAr: [
      "معاينة فورية متزامنة بدون أي تأخير عند إدخال البيانات.",
      "محرك طباعة نصوص يوازن بدقة بين الخطوط العربية والإنجليزية.",
      "خوارزمية تقسيم صفحات دقيقة تمنع انقطاع الفقرات عند تصدير PDF.",
    ],
  },
  {
    id: "aipixelhub",
    titleEn: "AI Pixel Hub — Intelligence Dashboard",
    titleAr: "بكسل هب — لوحة تحليلات الذكاء الاصطناعي",
    taglineEn: "AI foundation model intelligence & telemetry dashboard",
    taglineAr: "لوحة تحليلات ونماذج الذكاء الاصطناعي",
    descEn: "Analytical dashboard aggregating benchmarks, pricing metrics, latency data, and capabilities across top foundation AI models.",
    descAr: "لوحة تحكم تفاعلية تجمع بيانات مقارنة نماذج الذكاء الاصطناعي العالمية وأسعار الاستخدام وسرعة الاستجابة.",
    roleEn: "Frontend implementation, analytics charting, and multi-parameter faceted filtering.",
    roleAr: "تطوير الواجهة الأمامية، وتصميم تجربة لوحة التحكم، ومكونات الرسوم البيانية التفاعلية.",
    category: "live",
    badgeEn: "React.js • Live",
    badgeAr: "تطبيق حي مباشر",
    technologies: ["React.js", "Firebase", "Recharts", "Tailwind CSS"],
    image: "/ai-dashboard-preview.jpg",
    live: "https://aipixelhubb.netlify.app/",
    highlightsEn: [
      "Dynamic multi-model evaluation matrices.",
      "High-contrast dark mode data visualization.",
      "Responsive analytics grid adapting to all screen widths.",
    ],
    highlightsAr: [
      "مصفوفات مقارنة تفاعلية لتقييم أداء وتكاليف نماذج الذكاء الاصطناعي.",
      "واجهة مستخدم داكنة أنيقة مع تباين لوني دقيق لقراءة الرسوم البيانية.",
      "شبكة تحليلات متجاوبة تتكيف بسلاسة مع الشاشات العريضة والهواتف.",
    ],
  },
  {
    id: "nac-manpower",
    titleEn: "NAC Manpower — Workforce Portal",
    titleAr: "إن إيه سي مانباور — بوابة إدارة القوى العاملة",
    taglineEn: "Enterprise human capital & recruitment platform",
    taglineAr: "منصة لإدارة وتوظيف الكفاءات والكوادر البشرية",
    descEn: "Enterprise recruitment and staffing portal for global workforce operations, candidate talent pools, and vetting pipelines.",
    descAr: "بوابة توظيف وإمداد كوادر بشرية متكاملة للعمليات المؤسسية، تتضمن مستودع الكفاءات والتحقق من المؤهلات.",
    roleEn: "UI/UX design, design system tokens, responsive web layout, and talent search interface.",
    roleAr: "تصميم واجهة وتجربة المستخدم، وهندسة أنظمة التصميم، وتطوير الواجهات المتجاوبة.",
    category: "live",
    badgeEn: "Enterprise • Live",
    badgeAr: "منظومة أعمال حية",
    technologies: ["React.js", "Tailwind CSS", "Design Tokens", "Responsive UI"],
    image: "/saas-builder-preview.jpg",
    live: "https://nacmanpower.com/",
    highlightsEn: [
      "Candidate pipeline status tracking views.",
      "High-conversion registration and inquiry funnels.",
      "Multi-criteria talent search filters.",
    ],
    highlightsAr: [
      "لوحات تتبع مسارات التوظيف وحالة المتقدمين بنظام مرن.",
      "مسارات تسجيل وتواصل سريعة تعزز معدل التحويل لشركاء الأعمال.",
      "تصفية متقدمة للكفاءات وفق التخصصات والخبرات ومتطلبات العمل.",
    ],
  },
  {
    id: "portfolio-framer",
    titleEn: "Portfolio UI/UX Interaction System",
    titleAr: "نظام التصميم والتفاعل الرقمي (Framer)",
    taglineEn: "Interactive micro-interactions & motion design tokens",
    taglineAr: "نظام حركي متكامل وتفاعلات دقيقة وشبكات تخطيطية عصرية",
    descEn: "Interactive design portfolio interface showcasing fluid micro-interactions, spring physics, and modular component hierarchy.",
    descAr: "واجهة تفاعلية حديثة تستعرض الحركات الدقيقة، والتفاعل القائم على فيزياء الزنبرك، وهندسة المكونات المعيارية.",
    roleEn: "UI/UX design, interactive prototyping, layout architecture, and motion curves.",
    roleAr: "تصميم واجهات وتجربة المستخدم، والنماذج التفاعلية الأولية، وهندسة أنظمة التخطيط الحركي.",
    category: "live",
    badgeEn: "Framer • Live",
    badgeAr: "تصميم تفاعلي",
    technologies: ["Framer", "UI/UX Design", "Prototyping", "Design Systems"],
    image: "/ai-portfolio-generator-preview.jpg",
    live: "https://mohammadsinan.framer.website/",
    highlightsEn: [
      "Spring-physics gesture feedback and smooth scroll dynamics.",
      "Modular design token hierarchy across typography and spacing.",
      "Interactive 3D hover effects with progressive reveal triggers.",
    ],
    highlightsAr: [
      "تفاعلات حركية طبيعية قائمة على فيزياء الزنبرك وانتقالات سلسة.",
      "سلسلة محددات تصميم معيارية مطبقة على جميع الخطوط والمساحات.",
      "تأثيرات ثلاثية الأبعاد تفاعلية تستجيب لحركة المؤشر بدقة.",
    ],
  },
]

// 3D Spatial Interactive Card
function ProjectCard3DSpatial({
  project,
  positionOffset,
  isCenter,
  isRTL,
  onCardClick,
  onInspect,
}: {
  project: ProjectDetail
  positionOffset: number
  isCenter: boolean
  isRTL: boolean
  onCardClick: () => void
  onInspect: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 260, damping: 24, mass: 0.7 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isCenter || !cardRef.current) return
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

  // 3D Spatial Transform calculations
  const xTranslate = isCenter ? 0 : positionOffset * (isRTL ? -380 : 380)
  const zTranslate = isCenter ? 0 : -220
  const yRotation = isCenter ? 0 : positionOffset * (isRTL ? 28 : -28)
  const scale = isCenter ? 1 : 0.84
  const opacity = isCenter ? 1 : 0.4
  const zIndex = isCenter ? 30 : 10

  const title = isRTL ? project.titleAr : project.titleEn
  const tagline = isRTL ? project.taglineAr : project.taglineEn
  const description = isRTL ? project.descAr : project.descEn
  const organization = isRTL ? project.organizationAr : project.organizationEn
  const officeLocation = isRTL ? project.officeLocationAr : project.officeLocationEn

  return (
    <motion.div
      animate={{
        x: xTranslate,
        z: zTranslate,
        rotateY: yRotation,
        scale,
        opacity,
        zIndex,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 26,
        mass: 0.8,
      }}
      onClick={onCardClick}
      style={{
        position: "absolute",
        transformStyle: "preserve-3d",
      }}
      className={`w-[92%] sm:w-[82%] md:w-[740px] lg:w-[820px] h-[400px] sm:h-[450px] md:h-[480px] rounded-3xl will-change-transform select-none ${
        isCenter ? "cursor-default" : "cursor-pointer hover:opacity-75 transition-opacity"
      }`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isCenter ? rotateX : 0,
          rotateY: isCenter ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-[#0e0f14] shadow-2xl transition-all duration-300 ${
          project.isOfficialWork
            ? "hover:border-emerald-500/50"
            : project.isWorkMode
            ? "hover:border-amber-500/50"
            : "hover:border-primary/50"
        }`}
      >
        {/* Full-Bleed Screenshot Image (Zero Extra Dividing Borders) */}
        <img
          src={project.image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/35 pointer-events-none" />

        {/* Ambient Halo Behind */}
        <div
          className={`absolute -top-24 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-25 ${
            project.isOfficialWork ? "bg-emerald-500" : "bg-primary"
          }`}
        />

        {/* Top Floating HUD Bar (3D Layered) */}
        <div
          style={{ transform: "translateZ(35px)" }}
          className="relative z-10 p-4 sm:p-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>

            {project.isOfficialWork && (
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-emerald-400">
                <Building2 size={13} className="text-emerald-400 shrink-0" />
                <span className="font-bold">{organization || "SBA"}</span>
                <span className="text-white/30">•</span>
                <span className="text-white/70">{officeLocation || "Riyadh HQ"}</span>
              </div>
            )}
          </div>

          <div>
            {project.isOfficialWork ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-bold shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{isRTL ? "مشروع رسمي مباشر بالهيئة" : "Official In-Office Project"}</span>
              </span>
            ) : project.isWorkMode ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>{isRTL ? "قيد العمل والتطوير" : "Work Mode"}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-bold">
                <span>{isRTL ? project.badgeAr : project.badgeEn}</span>
              </span>
            )}
          </div>
        </div>

        {/* Bottom Content & Controls (3D Layered translateZ 45px) */}
        <div
          style={{ transform: "translateZ(45px)" }}
          className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 flex flex-col justify-end"
        >
          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-mono text-white tracking-tight drop-shadow-md">
            {title}
          </h3>

          {/* Tagline */}
          {tagline && (
            <p className="text-xs sm:text-sm text-primary font-mono font-medium mt-1 drop-shadow-sm truncate">
              {tagline}
            </p>
          )}

          {/* Description & Action Bar */}
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <p className="text-xs sm:text-sm text-white/75 font-light line-clamp-2 max-w-xl">
              {description}
            </p>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              {project.isOfficialWork ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>{isRTL ? "مقر الهيئة بالرياض" : "SBA Riyadh HQ"}</span>
                </span>
              ) : project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-bold hover:bg-primary/90 transition-colors shadow-xs"
                >
                  <span>{isRTL ? "زيارة الموقع" : "Launch Live"}</span>
                  <ArrowUpRight size={13} />
                </a>
              ) : null}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onInspect()
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-medium backdrop-blur-md transition-colors cursor-pointer"
              >
                <Eye size={13} />
                <span>{isRTL ? "التفاصيل" : "Inspect"}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const { t, isRTL } = useLanguage()
  const [filter, setFilter] = useState<"all" | "gov" | "live">("all")
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectDetail | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredProjects = detailedProjects.filter((p) => {
    if (filter === "all") return true
    return p.category === filter
  })

  // Ensure active index is within bounds on filter change
  useEffect(() => {
    setActiveIndex(0)
  }, [filter])

  const total = filteredProjects.length

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total)
  }, [total])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  // Mouse wheel scroll to cycle 3D cards
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let lastWheelTime = 0
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 35) {
        const now = Date.now()
        if (now - lastWheelTime > 600) {
          lastWheelTime = now
          if (e.deltaY > 0) handleNext()
          else handlePrev()
        }
      }
    }

    el.addEventListener("wheel", onWheel, { passive: true })
    return () => el.removeEventListener("wheel", onWheel)
  }, [handleNext, handlePrev])

  return (
    <Section
      id="projects"
      className="relative overflow-hidden bg-background py-16 sm:py-24 border-t border-border/60"
      variant="project"
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_30%,rgba(27,131,84,0.08),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-3.5 py-1.5 text-xs font-mono font-medium text-muted-foreground shadow-xs mb-3">
            <LayoutDashboard size={13} className="text-primary" />
            <span>{t("projects.badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            {t("projects.title")}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
            {isRTL
              ? "استعرض المشاريع عبر منظور 3D تفاعلي — مرر بعجلة الفأرة أو انقر على البطاقات الجانبية للتنقل."
              : "Explore projects in true 3D spatial perspective — scroll or click side cards to navigate."}
          </p>

          {/* Clean Filter Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl glass-pill border border-border mt-6 max-w-fit mx-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {isRTL ? "جميع المشاريع" : "All Projects"}
            </button>
            <button
              onClick={() => setFilter("gov")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === "gov"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{isRTL ? "مشاريع رسمية (مقر العمل)" : "Official Govt Projects"}</span>
            </button>
            <button
              onClick={() => setFilter("live")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                filter === "live"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {isRTL ? "منشورة ومباشرة" : "Live Applications"}
            </button>
          </div>
        </div>

        {/* 3D Spatial Stage Showcase */}
        <div
          ref={containerRef}
          className="relative w-full h-[460px] sm:h-[500px] md:h-[530px] flex items-center justify-center perspective-1200 overflow-hidden my-4"
        >
          {filteredProjects.map((proj, idx) => {
            // Compute relative offset from active project
            let offset = idx - activeIndex
            // Normalize for wrap-around
            if (offset > total / 2) offset -= total
            if (offset < -total / 2) offset += total

            // Only render visible cards (-1, 0, 1) for performance
            if (Math.abs(offset) > 1) return null

            const isCenter = offset === 0

            return (
              <ProjectCard3DSpatial
                key={proj.id}
                project={proj}
                positionOffset={offset}
                isCenter={isCenter}
                isRTL={isRTL}
                onCardClick={() => {
                  if (!isCenter) setActiveIndex(idx)
                }}
                onInspect={() => setSelectedModalProject(proj)}
              />
            )
          })}
        </div>

        {/* 3D Controls Bar */}
        <div className="flex items-center justify-between max-w-2xl mx-auto px-4 mt-6 text-xs font-mono">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-primary font-bold">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span>/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {filteredProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === activeIndex
                    ? "w-7 bg-primary shadow-xs"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-card border border-border/80 hover:bg-muted hover:border-primary/40 text-foreground transition-all cursor-pointer active:scale-95 shadow-2xs"
              aria-label="Previous project"
            >
              {isRTL ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-card border border-border/80 hover:bg-muted hover:border-primary/40 text-foreground transition-all cursor-pointer active:scale-95 shadow-2xs"
              aria-label="Next project"
            >
              {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </button>
          </div>
        </div>

      </div>

      {/* Simplified In-Depth Details Modal */}
      <AnimatePresence>
        {selectedModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModalProject(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-xl"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Title & Badge */}
              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                    selectedModalProject.isOfficialWork
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-primary/10 text-primary border border-primary/20"
                  }`}>
                    {isRTL ? selectedModalProject.badgeAr : selectedModalProject.badgeEn}
                  </span>
                  {selectedModalProject.isWorkMode && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 text-[11px] font-mono font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                      <span>{isRTL ? "قيد العمل والتطوير الداخلي" : "Active In-Office Staging"}</span>
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-mono text-foreground">
                  {isRTL ? selectedModalProject.titleAr : selectedModalProject.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-primary font-mono mt-1">
                  {isRTL ? selectedModalProject.taglineAr : selectedModalProject.taglineEn}
                </p>
              </div>

              {/* Official Project & Organization Callout */}
              {selectedModalProject.isOfficialWork && (
                <div className="mb-5 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-start gap-2.5">
                  <Building2 size={18} className="shrink-0 mt-0.5 text-emerald-500" />
                  <div>
                    <span className="font-bold block text-foreground">
                      {isRTL ? "مشروع حكومي رسمي بمقر العمل بالرياض:" : "Official Government Workplace Assignment (Riyadh):"}
                    </span>
                    <span className="text-[11px] font-light leading-relaxed block mt-0.5">
                      {isRTL ? selectedModalProject.workModeNoteAr : selectedModalProject.workModeNoteEn}
                    </span>
                  </div>
                </div>
              )}

              {/* Image Preview */}
              <div className="relative aspect-[16/9] w-full rounded-2xl border border-border overflow-hidden mb-5 bg-muted/40 shadow-sm">
                <img
                  src={selectedModalProject.image || "/placeholder.svg"}
                  alt={selectedModalProject.titleEn}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* Brief Description */}
              <div className="space-y-3 mb-5 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                <p>{isRTL ? selectedModalProject.descAr : selectedModalProject.descEn}</p>
                <div className="p-3 rounded-2xl bg-muted/40 border border-border/50 font-mono text-xs">
                  <span className="text-primary font-bold block mb-1">
                    {isRTL ? "الدور والمسؤوليات الرسمية:" : "Official Engineering Role:"}
                  </span>
                  <span>{isRTL ? selectedModalProject.roleAr : selectedModalProject.roleEn}</span>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50 mb-6">
                {selectedModalProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-xl bg-background border border-border text-[11px] font-mono text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                {selectedModalProject.isOfficialWork ? (
                  <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span>{isRTL ? "مشروع رسمي نشط بمقر الهيئة" : "Active In-Office Project at SBA"}</span>
                  </span>
                ) : selectedModalProject.live ? (
                  <a
                    href={selectedModalProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-bold hover:bg-primary/90 transition-all shadow-xs"
                  >
                    <span>{isRTL ? "زيارة الموقع الحي" : "Launch Live"}</span>
                    <ArrowUpRight size={13} />
                  </a>
                ) : <span />}

                <button
                  onClick={() => setSelectedModalProject(null)}
                  className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  {isRTL ? "إغلاق" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  )
}
