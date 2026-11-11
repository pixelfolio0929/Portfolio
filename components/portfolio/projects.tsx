"use client"

import { useState } from "react"
import { Section } from "./section"
import { useLanguage } from "./language-context"
import { ScrollCards, CardData } from "@/components/lightswind/scroll-cards"
import {
  LayoutDashboard,
  ShieldAlert,
  Clock,
  Layers,
  CheckCircle2,
  Code2,
  X,
  ArrowUpRight
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectDetail {
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
  workModeNoteEn?: string
  workModeNoteAr?: string
  live?: string
  highlightsEn: string[]
  highlightsAr: string[]
}

const detailedProjects: ProjectDetail[] = [
  {
    id: "sba-portal",
    titleEn: "Saudi Broadcasting Authority (SBA) — Main Platform",
    titleAr: "هيئة الإذاعة والتلفزيون — المنصة الرقمية الرسمية",
    taglineEn: "National broadcast media portal engineered for Saudi DGA digital standards",
    taglineAr: "البوابة الرقمية الرسمية للإعلام المرئي والمسموع وفق معايير DGA",
    descEn: "Official government media portal delivering national live feeds, program libraries, and public media services across Saudi Arabia.",
    descAr: "المنصة الرقمية الوطنية لهيئة الإذاعة والتلفزيون، تقدم البث المباشر للقنوات والمكتبة الرقمية والخدمات الإعلامية في المملكة.",
    roleEn: "UI engineering, Arabic-first RTL architecture, DGA design tokens, and ASP.NET UI integration.",
    roleAr: "هندسة واجهات المستخدم، وتطبيق معايير DGA، ودعم العربية RTL وتكامل ASP.NET.",
    category: "gov",
    badgeEn: "Govt Work Mode",
    badgeAr: "مشروع حكومي (قيد العمل)",
    technologies: ["DGA Standards", "Arabic RTL", "ASP.NET UI", "JavaScript", "Responsive UI"],
    image: "/Coding Workspace.png",
    isWorkMode: true,
    workModeNoteEn: "Currently in active development and internal staging for Saudi Broadcasting Authority (SBA). In private work mode, not yet publicly published.",
    workModeNoteAr: "مشروع منصة حكومية قيد العمل والتطوير النشط حالياً لهيئة الإذاعة والتلفزيون (SBA). في بيئة التطوير والتشغيل الداخلي — غير منشور رسمياً بعد.",
    highlightsEn: [
      "Saudi Digital Government Authority (DGA) design standards compliance.",
      "100% bidirectional Arabic (RTL) optical balance.",
      "Reusable UI components built for enterprise scale.",
    ],
    highlightsAr: [
      "توافق كامل مع معايير هيئة الحكومة الرقمية السعودية (DGA).",
      "تصميم ثنائي اللغة مع ضبط متقدم للتوازن البصري والطباعة العربية (RTL).",
      "بناء مكتبة مكونات واجهات قابلة لإعادة الاستخدام للمنظومات المؤسسية.",
    ],
  },
  {
    id: "b2b-sba",
    titleEn: "B2B.SBA.sa — Government Business Portal",
    titleAr: "منصة الأعمال الرقمية B2B.SBA.sa — هيئة الإذاعة والتلفزيون",
    taglineEn: "Government business & media clearance portal",
    taglineAr: "بوابة الأعمال والشراكات الرقمية للتراخيص الإعلامية",
    descEn: "Enterprise B2B digital portal enabling automated media permits, production clearances, and airtime reservations.",
    descAr: "بوابة رقمية مخصصة لشركات الإنتاج وشركاء الأعمال لتسهيل تصاريح التصوير وحجوزات البث التلفزيوني.",
    roleEn: "Frontend UI engineering, data tables, multi-step workflow logic, and accessible forms.",
    roleAr: "تطوير الواجهة الأمامية، وجداول البيانات، وتدفقات النماذج المعقدة، والأنماط المتجاوبة.",
    category: "gov",
    badgeEn: "Govt Work Mode",
    badgeAr: "مشروع حكومي (قيد العمل)",
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

  // Convert to clean items for the GSAP ScrollCards component
  const scrollCardsData: CardData[] = filteredProjects.map((proj) => ({
    id: proj.id,
    image: proj.image,
    alt: isRTL ? proj.titleAr : proj.titleEn,
    title: isRTL ? proj.titleAr : proj.titleEn,
    tagline: isRTL ? proj.taglineAr : proj.taglineEn,
    description: isRTL ? proj.descAr : proj.descEn,
    badge: isRTL ? proj.badgeAr : proj.badgeEn,
    isWorkMode: proj.isWorkMode,
    live: proj.live,
  }))

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
        
        {/* Simple & Clean Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-3.5 py-1.5 text-xs font-mono font-medium text-muted-foreground shadow-xs mb-3">
            <LayoutDashboard size={13} className="text-primary" />
            <span>{t("projects.badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            {t("projects.title")}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
            {isRTL
              ? "مرر بالصفحة للأسفل لمشاهدة بطاقات المشاريع تنزلق وتتداخل تباعاً واحداً تلو الآخر."
              : "Scroll down to experience the stacked projects sliding and rotating in one by one."}
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
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>{isRTL ? "حكومية (قيد العمل)" : "Govt (Work Mode)"}</span>
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

        {/* Lightswind UI GSAP ScrollCards Component (One by One Scroll Stacking) */}
        <ScrollCards
          key={filter}
          cards={scrollCardsData}
          direction="bottom"
          cardScale={0.7}
          cardRotation={5}
          isRTL={isRTL}
          onCardClick={(card) => {
            const found = detailedProjects.find((p) => p.id === card.id)
            if (found) setSelectedModalProject(found)
          }}
        />

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
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-mono font-bold">
                    {isRTL ? selectedModalProject.badgeAr : selectedModalProject.badgeEn}
                  </span>
                  {selectedModalProject.isWorkMode && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 text-[11px] font-mono font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                      <span>{isRTL ? "قيد العمل والتطوير (غير منشور)" : "In Work Mode (Not Published)"}</span>
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

              {/* Work Mode Notice for Government Platforms */}
              {selectedModalProject.isWorkMode && (
                <div className="mb-5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs font-mono text-amber-600 dark:text-amber-400 flex items-start gap-2.5">
                  <Clock size={16} className="shrink-0 mt-0.5 text-amber-500 animate-pulse" />
                  <div>
                    <span className="font-bold block text-foreground">
                      {isRTL ? "مشروع حكومي — قيد العمل والتشغيل الداخلي (غير منشور):" : "Govt Enterprise Project — In Work Mode (Not Published):"}
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
                    {isRTL ? "الدور والمسؤوليات:" : "Engineering Role:"}
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
                {selectedModalProject.isWorkMode ? (
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>{isRTL ? "مشروع حكومي قيد العمل" : "Active Govt Work Mode"}</span>
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
