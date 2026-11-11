"use client"

import { useState } from "react"
import { useLanguage } from "./language-context"
import {
  LayoutDashboard,
  Building2,
  MapPin,
  ArrowUpRight,
  Eye,
  CheckCircle2,
  Sparkles,
  Layers,
  Code2,
  X,
  ExternalLink,
  ShieldCheck
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
    titleAr: "منصة الأعمال الرسمية B2B.SBA.sa — هيئة الإذاعة والتلفزيون",
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

export function Projects() {
  const { t, isRTL } = useLanguage()
  const [filter, setFilter] = useState<"all" | "gov" | "live">("all")
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectDetail | null>(null)

  const filteredProjects = detailedProjects.filter((p) => {
    if (filter === "all") return true
    return p.category === filter
  })

  return (
    <section
      id="projects"
      className="relative w-full bg-background pt-20 sm:pt-28 pb-20 border-t border-border/60 transition-colors"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_40%_at_50%_15%,rgba(27,131,84,0.09),transparent_70%)] pointer-events-none" />

      {/* Header Container */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-3.5 py-1.5 text-xs font-mono font-medium text-muted-foreground shadow-xs mb-3">
          <LayoutDashboard size={13} className="text-primary" />
          <span>{t("projects.badge")}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
          {t("projects.title")}
        </h2>
        <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
          {isRTL
            ? "مشاريع رقمية واقعية وهندسة واجهات معتمدة — تصفح المنظومات الحكومية والتطبيقات الحية."
            : "Real-world engineering platforms and interactive products — explore government portals and live apps."}
        </p>

        {/* Snappy Filter Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl glass-pill border border-border mt-7 max-w-fit mx-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {isRTL ? "جميع المشاريع" : "All Projects"} ({detailedProjects.length})
          </button>
          <button
            onClick={() => setFilter("gov")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              filter === "gov"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{isRTL ? "مشاريع رسمية (مقر العمل)" : "Govt (In-Office)"}</span>
          </button>
          <button
            onClick={() => setFilter("live")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              filter === "live"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {isRTL ? "تطبيقات حية" : "Live Applications"}
          </button>
        </div>
      </div>

      {/* Ultra Smooth Stacking Project Cards Showcase */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-8 sm:space-y-12">
        {filteredProjects.map((project, idx) => {
          const isSBA = project.isOfficialWork
          const isWork = project.isWorkMode
          const projectNum = String(idx + 1).padStart(2, "0")

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                top: `calc(5.5rem + ${idx * 0.75}rem)`,
              }}
              className="sticky rounded-3xl border border-border/80 dark:border-white/10 bg-card/95 dark:bg-[#0c0d14]/95 backdrop-blur-xl shadow-2xl overflow-hidden transition-all hover:border-primary/40 group"
            >
              {/* Top Accent Strip */}
              <div
                className={`h-1 w-full ${
                  isSBA
                    ? "bg-gradient-to-r from-emerald-500 via-primary to-emerald-400"
                    : isWork
                    ? "bg-gradient-to-r from-amber-500 via-amber-400 to-primary"
                    : "bg-gradient-to-r from-primary via-emerald-400 to-primary"
                }`}
              />

              {/* Card Body — 2-Column Split Layout */}
              <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column: Metadata & Narrative (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                  
                  {/* Header Row: Index & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-muted-foreground/80 tracking-wider">
                        {`// ${projectNum}`}
                      </span>

                      {/* macOS subtle dots */}
                      <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/60 dark:bg-white/5 border border-border/50">
                        <span className="w-2 h-2 rounded-full bg-red-500/70" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                      </div>
                    </div>

                    {/* Status Beacon Badge */}
                    {isSBA ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span>{isRTL ? "مشروع حكومي رسمي بمقر الهيئة" : "Official In-Office Project"}</span>
                      </span>
                    ) : isWork ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                        <span>{isRTL ? "قيد العمل والتطوير الداخلي" : "Work Mode (In-Office)"}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-mono font-bold">
                        <span>{isRTL ? project.badgeAr : project.badgeEn}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {isRTL ? project.titleAr : project.titleEn}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm font-mono text-primary font-medium">
                      {isRTL ? project.taglineAr : project.taglineEn}
                    </p>
                  </div>

                  {/* Official Government Callout (if SBA) */}
                  {isSBA && (
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/25 text-xs font-mono text-emerald-700 dark:text-emerald-300 flex items-start gap-3">
                      <Building2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-bold block">
                          {isRTL
                            ? "مقر العمل: هيئة الإذاعة والتلفزيون — الرياض، المملكة العربية السعودية"
                            : "Workplace: Saudi Broadcasting Authority (SBA) — Riyadh HQ"}
                        </span>
                        <p className="text-[11px] font-light text-muted-foreground leading-relaxed">
                          {isRTL ? project.workModeNoteAr : project.workModeNoteEn}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Brief Overview */}
                  <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed line-clamp-3">
                    {isRTL ? project.descAr : project.descEn}
                  </p>

                  {/* Role Callout */}
                  <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-xs font-mono text-foreground/90">
                    <span className="text-primary font-bold mr-1.5 inline-block">
                      {isRTL ? "الدور والمسؤوليات:" : "Engineering Role:"}
                    </span>
                    <span className="font-light">{isRTL ? project.roleAr : project.roleEn}</span>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-muted/60 dark:bg-white/5 border border-border/80 text-[11px] font-mono text-foreground/80 hover:text-foreground transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {isSBA ? (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
                        <CheckCircle2 size={14} className="text-emerald-400" />
                        <span>{isRTL ? "نظام حكومي نشط بالهيئة" : "Active In-Office System"}</span>
                      </span>
                    ) : project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-bold hover:bg-primary/90 transition-all shadow-sm"
                      >
                        <span>{isRTL ? "زيارة الموقع الحي" : "Launch Live"}</span>
                        <ArrowUpRight size={14} />
                      </a>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => setSelectedModalProject(project)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-mono font-semibold transition-all border border-border cursor-pointer active:scale-98"
                    >
                      <Eye size={14} />
                      <span>{isRTL ? "تفاصيل المعمارية" : "Inspect Architecture"}</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Visual Frame Showcase (5 cols) */}
                <div
                  onClick={() => setSelectedModalProject(project)}
                  className="lg:col-span-5 relative group/img cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-border/80 dark:border-white/10 bg-muted/20 shadow-xl transition-all duration-300 group-hover/img:scale-[1.01] group-hover/img:shadow-2xl">
                    
                    {/* Browser Address Bar Chrome */}
                    <div className="px-3.5 py-2.5 bg-muted/80 dark:bg-[#14161f] border-b border-border/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                      </div>
                      <span className="text-[10px] truncate max-w-[160px] opacity-75">
                        {project.live ? new URL(project.live).hostname : isSBA ? "sba.gov.sa (internal)" : "pixel.internal"}
                      </span>
                      <ExternalLink size={12} className="opacity-50" />
                    </div>

                    {/* Image with Lazy & Async Decoding */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10">
                      <img
                        src={project.image}
                        alt={isRTL ? project.titleAr : project.titleEn}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                      />
                      
                      {/* Gentle Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-white text-xs font-mono font-medium flex items-center gap-1.5">
                          <Eye size={13} />
                          <span>{isRTL ? "انقر للمعاينة الموسعة" : "Click to view full preview"}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Lightweight & Accessible In-Depth Details Modal */}
      <AnimatePresence>
        {selectedModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModalProject(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="mb-5 pr-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-mono font-bold">
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
                  loading="lazy"
                  decoding="async"
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
    </section>
  )
}
