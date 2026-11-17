"use client"

import { useState, useRef } from "react"
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
  ShieldCheck,
  Smartphone,
  FolderGit2,
  Clock,
  Compass,
  Radio,
  FileText,
  SlidersHorizontal,
  ChevronDown,
  Monitor
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export type ProjectFilterCategory = "all" | "sba" | "frontend" | "ui-ux" | "upcoming"

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
  categoryTags: ("sba" | "frontend" | "ui-ux" | "upcoming" | "live")[]
  badgeEn: string
  badgeAr: string
  technologies: string[]
  image: string
  previewType: "desktop" | "dashboard" | "mobile" | "intranet"
  isSBA?: boolean
  isUpcoming?: boolean
  isDesignOnly?: boolean
  serviceCategories?: { en: string; ar: string }[]
  plannedAreasEn?: string[]
  plannedAreasAr?: string[]
  organizationEn?: string
  organizationAr?: string
  officeLocationEn?: string
  officeLocationAr?: string
  workModeNoteEn?: string
  workModeNoteAr?: string
  live?: string
  browserUrl?: string
  highlightsEn: string[]
  highlightsAr: string[]
}

const detailedProjects: ProjectDetail[] = [
  // PROJECT 01 — SBA Main Website
  {
    id: "sba-main",
    titleEn: "Saudi Broadcasting Authority — Main Website",
    titleAr: "هيئة الإذاعة والتلفزيون — المنصة الرسمية الرئيسية",
    taglineEn: "National Broadcasting Digital Presence · UI Engineering & RTL (Riyadh HQ)",
    taglineAr: "المنصة الرقمية الوطنية لهيئة الإذاعة والتلفزيون • هندسة الواجهات وتطوير RTL (مقر الرياض)",
    descEn: "Contributing to the frontend development and UI improvements of the Saudi Broadcasting Authority's main digital presence, focusing on responsive interfaces, Arabic-first user experiences, RTL layouts, reusable styling patterns, and alignment with Saudi digital government design practices.",
    descAr: "المساهمة في تطوير الواجهات الأمامية وتحسينات تجربة المستخدم للمنصة الرقمية الرئيسية لهيئة الإذاعة والتلفزيون، مع التركيز على الواجهات المتجاوبة، والتجارب العربية أولاً، وتخطيط RTL، وأنماط التصميم القابلة لإعادة الاستخدام وفق ممارسات الحكومة الرقمية السعودية.",
    roleEn: "Frontend Development & UI Engineering: Contributing to responsive interfaces, Arabic RTL layouts, reusable styling patterns, and alignment with Saudi digital government design practices.",
    roleAr: "تطوير الواجهات وهندسة المستخدم: المساهمة في بناء الواجهات المتجاوبة، وتخطيط RTL المتقدم، والأنماط المعيارية المتوافقة مع معايير الحكومة الرقمية السعودية.",
    categoryTags: ["sba", "frontend"],
    badgeEn: "SBA · UI Engineering",
    badgeAr: "مشروع رسمي بالهيئة · هندسة واجهات",
    isSBA: true,
    organizationEn: "Saudi Broadcasting Authority (SBA)",
    organizationAr: "هيئة الإذاعة والتلفزيون",
    officeLocationEn: "Riyadh, Saudi Arabia",
    officeLocationAr: "الرياض، المملكة العربية السعودية",
    workModeNoteEn: "In-office frontend development and UI engineering contribution at SBA Headquarters in Riyadh.",
    workModeNoteAr: "مساهمة رسمية في تطوير وهندسة الواجهات الأمامية بمقر هيئة الإذاعة والتلفزيون بالرياض.",
    browserUrl: "sba.gov.sa",
    previewType: "desktop",
    technologies: [
      "HTML5",
      "CSS3 / SCSS",
      "JavaScript",
      "ASP.NET WebForms",
      "Responsive Design",
      "RTL Implementation",
      "DGA-aligned UI"
    ],
    image: "/Coding Workspace.png",
    highlightsEn: [
      "Responsive interfaces engineered for diverse viewport sizes across mobile, tablet, and desktop.",
      "Arabic-first layout architecture with meticulous optical balance and typography scaling.",
      "Modular SCSS styling patterns ensuring consistency across broadcasting portals.",
      "UI implementation guided by Saudi digital government design practices."
    ],
    highlightsAr: [
      "واجهات متجاوبة مصممة لمختلف أحجام الشاشات من الهواتف إلى الشاشات العريضة.",
      "معمارية تخطيط عربية أولاً مع توازن بصري دقيق وتدرج طباعي متناسق.",
      "أنماط تنسيق SCSS معيارية وقابلة لإعادة الاستخدام في مختلف المنصات التابعة.",
      "تنفيذ واجهات متوافق مع ممارسات وتوجهات الحكومة الرقمية بالمملكة."
    ]
  },

  // PROJECT 02 — B2B.SBA.sa Business Services Platform
  {
    id: "b2b-sba",
    titleEn: "SBA B2B — Business Services Platform",
    titleAr: "منصة الأعمال والخدمات الرقمية — B2B.SBA.sa",
    taglineEn: "Enterprise Business Services Portal · Structured Workflows & Bilingual UI",
    taglineAr: "بوابة خدمات الأعمال والشركاء • واجهات منظمة وتجربة ثنائية اللغة",
    descEn: "Contributing to the design and frontend development of SBA's B2B digital services platform, creating structured business service interfaces and bilingual user experiences for commercial and production partners.",
    descAr: "المساهمة في تصميم وتطوير الواجهات الأمامية لمنصة الخدمات الرقمية لقطاع الأعمال بالهيئة (B2B.sba.sa)، وبناء واجهات خدمات مهيكلة وتجارب مستخدم ثنائية اللغة لشركاء الإنتاج والإعلام.",
    roleEn: "UI Design & Frontend Development: Crafting structured service interfaces, dropdown interactions, LTR/RTL bilingual flows, and responsive UI components.",
    roleAr: "تصميم وتطوير الواجهات الأمامية: هيكلة واجهات الخدمات، وتفاعلات القوائم المنسدلة، والتحويل السلس بين LTR/RTL، والمكونات المتجاوبة.",
    categoryTags: ["sba", "frontend", "ui-ux"],
    badgeEn: "SBA · UI Design & Frontend",
    badgeAr: "مشروع رسمي بالهيئة · تصميم وبرمجة واجهات",
    isSBA: true,
    organizationEn: "Saudi Broadcasting Authority (SBA)",
    organizationAr: "هيئة الإذاعة والتلفزيون",
    officeLocationEn: "Riyadh, Saudi Arabia",
    officeLocationAr: "الرياض، المملكة العربية السعودية",
    workModeNoteEn: "Active contribution to SBA's B2B enterprise service platform at Riyadh Headquarters.",
    workModeNoteAr: "مساهمة نشطة في بوابة خدمات الأعمال لقطاع الإنتاج والإعلام بمقر الهيئة بالرياض.",
    browserUrl: "b2b.sba.sa",
    previewType: "dashboard",
    serviceCategories: [
      { en: "SBA SET", ar: "خدمات التصوير والإنتاج (SBA SET)" },
      { en: "SBA AD", ar: "خدمات الإعلانات والرعايات (SBA AD)" },
      { en: "SBA Digital Media", ar: "خدمات الإعلام الرقمي (SBA Digital)" },
      { en: "SBA Specialized Content", ar: "المحتوى المتخصص (SBA Content)" },
      { en: "SBA Media Center Management", ar: "إدارة المراكز الإعلامية" }
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "ASP.NET WebForms",
      "Figma",
      "Bilingual LTR / RTL",
      "Responsive UI"
    ],
    image: "/wms-app-preview.jpg",
    highlightsEn: [
      "Structured business services interface showcasing key SBA commercial offerings.",
      "Service category navigation covering SBA SET, SBA AD, Digital Media, Specialized Content, and Media Center.",
      "Intuitive service dropdown interactions for seamless multi-tier option discovery.",
      "Full bilingual support with mirror-accurate LTR and RTL interface layouts."
    ],
    highlightsAr: [
      "واجهات خدمات أعمال منظمة تستعرض مسارات الخدمات التجارية لهيئة الإذاعة والتلفزيون.",
      "هيكلة متقدمة لفئات الخدمات تشمل: SBA SET، وSBA AD، والإعلام الرقمي، والمحتوى المتخصص، والمراكز الإعلامية.",
      "تفاعلات قوائم منسدلة ذكية تضمن سهولة الوصول للخدمات الفرعية.",
      "دعم ثنائي اللغة متكامل مع تحويل فوري ودقيق بين تخطيطي LTR و RTL."
    ]
  },

  // PROJECT 03 — Al Akhbariya Mobile Application
  {
    id: "al-akhbariya-mobile",
    titleEn: "Al Akhbariya — Mobile Application",
    titleAr: "تطبيق الإخبارية — واجهات وتجربة المستخدم للهاتف",
    taglineEn: "Mobile App UI/UX Design in Figma · Visual Hierarchy & Navigation",
    taglineAr: "تصميم واجهات وتجربة المستخدم للهواتف عبر Figma • تسلسل بصري وتصفح سلس",
    descEn: "Designed mobile application interfaces for Al Akhbariya using Figma, focusing on visual consistency, intuitive navigation, content presentation, and user experience.",
    descAr: "تصميم واجهات وتجربة المستخدم لتطبيق قناة الإخبارية على الهاتف الذكي باستخدام Figma، مع التركيز على الاتساق البصري، وسهولة التصفح، وعرض المحتوى الإخباري بتسلسل بصري جذاب.",
    roleEn: "Mobile App UI/UX Design Contribution (Figma): Interface prototyping, layout consistency, typography scale, breaking news presentation, and intuitive mobile navigation.",
    roleAr: "مساهمة في تصميم واجهة وتجربة المستخدم عبر Figma: بناء النماذج التفاعلية، والاتساق البصري، وعرض الأخبار العاجلة، وأنماط التصفح السلس.",
    categoryTags: ["sba", "ui-ux"],
    badgeEn: "SBA · Mobile UI/UX Design",
    badgeAr: "مشروع رسمي بالهيئة · تصميم واجهات الهاتف",
    isSBA: true,
    isDesignOnly: true,
    organizationEn: "Saudi Broadcasting Authority (SBA) / Al Akhbariya",
    organizationAr: "هيئة الإذاعة والتلفزيون / قناة الإخبارية",
    officeLocationEn: "Riyadh, Saudi Arabia",
    officeLocationAr: "الرياض، المملكة العربية السعودية",
    workModeNoteEn: "UI/UX design contribution created in Figma. (Focus: mobile interface design, visual hierarchy, and prototyping).",
    workModeNoteAr: "مساهمة تصميمية لواجهات وتجربة المستخدم عبر أداة Figma (التركيز: التسلسل البصري والتجربة التفاعلية).",
    browserUrl: "figma.com/@sinan/alakhbariya-app",
    previewType: "mobile",
    technologies: [
      "Figma",
      "UI/UX Design",
      "Mobile Interface Design",
      "User Experience",
      "Visual Hierarchy",
      "Interface Prototyping"
    ],
    image: "/foodies heaven.jpg",
    highlightsEn: [
      "Engineered mobile UI wireframes and high-fidelity interface screens in Figma.",
      "Clear visual hierarchy optimizing readability of breaking news feeds and media broadcasts.",
      "Ergonomic bottom navigation designed for single-hand mobile interactions.",
      "Strict brand consistency aligned with Al Akhbariya's national broadcasting identity."
    ],
    highlightsAr: [
      "تصميم شاشات عالية الدقة ونماذج أولية تفاعلية لتطبيق الهاتف عبر Figma.",
      "تسلسل بصري مريح يعزز سهولة قراءة الأخبار العاجلة والتغطيات المرئية الحية.",
      "شريط تنقل سفلي مدروس يراعي سهولة التصفح بيد واحدة على مختلف الهواتف.",
      "الحفاظ على الهوية البصرية الرسمية لقناة الإخبارية ورصانتها الإعلامية."
    ]
  },

  // PROJECT 04 — SBA Intranet Internal System
  {
    id: "sba-intranet",
    titleEn: "SBA Intranet — Internal Communication System",
    titleAr: "بوابة الإنترانت الداخلي — هيئة الإذاعة والتلفزيون",
    taglineEn: "Upcoming Project Phase · Internal Digital Platform Architecture",
    taglineAr: "مرحلة قادمة قيد التجهيز • معمارية المنظومة الرقمية للتواصل المؤسسي الداخلي",
    descEn: "Preparing for the frontend implementation of the SBA Intranet portal, planned to be developed using ASP.NET WebForms, HTML, CSS/SCSS, and JavaScript with bilingual (Arabic and English) support.",
    descAr: "التحضير للبدء في تطوير الواجهات الأمامية لبوابة الإنترانت الداخلية لهيئة الإذاعة والتلفزيون، والمخطط تنفيذها باستخدام ASP.NET WebForms و HTML و CSS/SCSS و JavaScript بدعم ثنائي اللغة (العربية والإنجليزية).",
    roleEn: "Upcoming Project Phase: Planning frontend architecture, departmental layouts, bilingual templates, employee portal mockups, and administrative UI concepts.",
    roleAr: "مرحلة قادمة قيد التجهيز: التخطيط لمعمارية الواجهات، وقوالب الأقسام والهيكل التنظيمي، وبوابة الموظف، ومفاهيم إدارة المحتوى الإداري.",
    categoryTags: ["sba", "upcoming", "frontend"],
    badgeEn: "SBA · Upcoming Phase",
    badgeAr: "مشروع بالهيئة · مرحلة قادمة",
    isSBA: true,
    isUpcoming: true,
    organizationEn: "Saudi Broadcasting Authority (SBA)",
    organizationAr: "هيئة الإذاعة والتلفزيون",
    officeLocationEn: "Riyadh, Saudi Arabia",
    officeLocationAr: "الرياض، المملكة العربية السعودية",
    workModeNoteEn: "Upcoming project phase under active frontend architecture planning and design staging at SBA Headquarters.",
    workModeNoteAr: "مشروع لمرحلة قادمة قيد التخطيط والتجهيز لمعمارية الواجهات بمقر هيئة الإذاعة والتلفزيون بالرياض.",
    browserUrl: "intranet.sba.internal (Staging)",
    previewType: "intranet",
    plannedAreasEn: [
      "Departmental & Organizational Structure",
      "Employee & Personal Information",
      "Internal Communication & Announcements",
      "User Guide & Internal Policies",
      "Content Management & Administrative Concepts"
    ],
    plannedAreasAr: [
      "الهيكل التنظيمي والأقسام الداخلية",
      "بيانات الموظف والمعلومات الشخصية",
      "التواصل الداخلي والتعاميم الرسمية",
      "دليل المستخدم واللوائح والسياسات الداخلية",
      "إدارة المحتوى والمفاهيم الإدارية"
    ],
    technologies: [
      "ASP.NET WebForms",
      "HTML5",
      "CSS3 / SCSS",
      "JavaScript",
      "Bilingual UI (AR / EN)",
      "Architecture Planning"
    ],
    image: "/realtime-chat-preview.jpg",
    highlightsEn: [
      "Planned enterprise intranet platform unifying digital services for SBA staff.",
      "Structured departmental directories and hierarchical organization tree views.",
      "Bilingual layout blueprint tailored for internal organizational workflows.",
      "Modular frontend styling architecture prepared for ASP.NET WebForms integration."
    ],
    highlightsAr: [
      "بوابة موحدة للخدمات الرقمية لمنسوبي وموظفي هيئة الإذاعة والتلفزيون.",
      "هيكلة متقدمة للأقسام والتعاميم واللوائح الداخلية مع أدلة الاستخدام.",
      "معمارية ثنائية اللغة متوازنة تسهل سير العمل المؤسسي الداخلي.",
      "قوالب معيارية مجهزة للتكامل المستقبلي مع ASP.NET WebForms."
    ]
  },

  // PROJECT 05 — PixelResume (Personal / Live)
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
    categoryTags: ["frontend", "live"],
    badgeEn: "React.js • Live App",
    badgeAr: "تطبيق حي مباشر",
    technologies: ["React.js", "Tailwind CSS", "i18n Engine", "PDF Export", "Framer Motion"],
    image: "/pixelresume-preview.jpg",
    previewType: "desktop",
    browserUrl: "pixelresume.netlify.app",
    live: "https://pixelresume.netlify.app/",
    highlightsEn: [
      "Zero-latency synchronized live preview.",
      "Dynamic typography balancing Arabic and Latin scripts.",
      "Precise ATS-friendly multi-page pagination algorithm."
    ],
    highlightsAr: [
      "معاينة فورية متزامنة بدون أي تأخير عند إدخال البيانات.",
      "محرك طباعة نصوص يوازن بدقة بين الخطوط العربية والإنجليزية.",
      "خوارزمية تقسيم صفحات دقيقة تمنع انقطاع الفقرات عند تصدير PDF."
    ]
  },

  // PROJECT 06 — AI Pixel Hub (Personal / Live)
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
    categoryTags: ["frontend", "live"],
    badgeEn: "React.js • Live App",
    badgeAr: "تطبيق حي مباشر",
    technologies: ["React.js", "Firebase", "Recharts", "Tailwind CSS"],
    image: "/ai-dashboard-preview.jpg",
    previewType: "dashboard",
    browserUrl: "aipixelhubb.netlify.app",
    live: "https://aipixelhubb.netlify.app/",
    highlightsEn: [
      "Dynamic multi-model evaluation matrices.",
      "High-contrast dark mode data visualization.",
      "Responsive analytics grid adapting to all screen widths."
    ],
    highlightsAr: [
      "مصفوفات مقارنة تفاعلية لتقييم أداء وتكاليف نماذج الذكاء الاصطناعي.",
      "واجهة مستخدم داكنة أنيقة مع تباين لوني دقيق لقراءة الرسوم البيانية.",
      "شبكة تحليلات متجاوبة تتكيف بسلاسة مع الشاشات العريضة والهواتف."
    ]
  },

  // PROJECT 07 — NAC Manpower (Client / Live)
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
    categoryTags: ["frontend", "ui-ux", "live"],
    badgeEn: "Enterprise • Live Portal",
    badgeAr: "منظومة أعمال حية",
    technologies: ["React.js", "Tailwind CSS", "Design Tokens", "Responsive UI"],
    image: "/saas-builder-preview.jpg",
    previewType: "desktop",
    browserUrl: "nacmanpower.com",
    live: "https://nacmanpower.com/",
    highlightsEn: [
      "Candidate pipeline status tracking views.",
      "High-conversion registration and inquiry funnels.",
      "Multi-criteria talent search filters."
    ],
    highlightsAr: [
      "لوحات تتبع مسارات التوظيف وحالة المتقدمين بنظام مرن.",
      "مسارات تسجيل وتواصل سريعة تعزز معدل التحويل لشركاء الأعمال.",
      "تصفية متقدمة للكفاءات وفق التخصصات والخبرات ومتطلبات العمل."
    ]
  },

  // PROJECT 08 — Portfolio UI/UX System (Framer / Live)
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
    categoryTags: ["ui-ux", "live"],
    badgeEn: "Framer • Interactive",
    badgeAr: "تصميم تفاعلي",
    technologies: ["Framer", "UI/UX Design", "Prototyping", "Design Systems"],
    image: "/ai-portfolio-generator-preview.jpg",
    previewType: "desktop",
    browserUrl: "mohammadsinan.framer.website",
    live: "https://mohammadsinan.framer.website/",
    highlightsEn: [
      "Spring-physics gesture feedback and smooth scroll dynamics.",
      "Modular design token hierarchy across typography and spacing.",
      "Interactive 3D hover effects with progressive reveal triggers."
    ],
    highlightsAr: [
      "تفاعلات حركية طبيعية قائمة على فيزياء الزنبرك وانتقالات سلسة.",
      "سلسلة محددات تصميم معيارية مطبقة على جميع الخطوط والمساحات.",
      "تأثيرات ثلاثية الأبعاد تفاعلية تستجيب لحركة المؤشر بدقة."
    ]
  }
]

export function Projects() {
  const { t, isRTL } = useLanguage()
  const [filter, setFilter] = useState<ProjectFilterCategory>("all")
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectDetail | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const filteredProjects = detailedProjects.filter((p) => {
    if (filter === "all") return true
    if (filter === "sba") return p.isSBA === true
    if (filter === "frontend") return p.categoryTags.includes("frontend")
    if (filter === "ui-ux") return p.categoryTags.includes("ui-ux")
    if (filter === "upcoming") return p.isUpcoming === true
    return true
  })

  // GSAP ScrollTrigger Pinned Timeline: Smooth One-by-One Transitions
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const cards = cardRefs.current.filter(Boolean)
      const total = cards.length
      if (!total || !sectionRef.current) return

      // Initial state
      gsap.set(cards[0], { yPercent: 0, scale: 1, filter: "brightness(1)", zIndex: 1, autoAlpha: 1 })
      for (let i = 1; i < total; i++) {
        gsap.set(cards[i], { yPercent: 100, scale: 1, filter: "brightness(1)", zIndex: i + 1, autoAlpha: 1 })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${Math.max(1, total - 1) * 260}vh`,
          pin: true,
          scrub: 2.0,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
          onUpdate: (self) => {
            const idx = Math.min(
              total - 1,
              Math.round(self.progress * (total - 1))
            )
            setActiveIndex(idx)
          },
        },
      })

      // Initial hold
      tl.to({}, { duration: 1.2 })

      // Calm sequence
      for (let i = 0; i < total - 1; i++) {
        const currentCard = cards[i]
        const nextCard = cards[i + 1]

        tl.to(
          currentCard,
          {
            scale: 0.93,
            yPercent: -2.5,
            filter: "brightness(0.65)",
            duration: 2.8,
            ease: "sine.inOut",
          },
          `step_${i}`
        ).to(
          nextCard,
          {
            yPercent: 0,
            scale: 1,
            filter: "brightness(1)",
            duration: 2.8,
            ease: "sine.inOut",
          },
          `step_${i}`
        )
        .to({}, { duration: 1.5 })
      }

      const ro = new ResizeObserver(() => ScrollTrigger.refresh())
      if (sectionRef.current) ro.observe(sectionRef.current)

      return () => {
        ro.disconnect()
        tl.kill()
      }
    },
    { scope: sectionRef, dependencies: [filteredProjects.length, filter] }
  )

  const sbaCount = detailedProjects.filter(p => p.isSBA).length
  const frontendCount = detailedProjects.filter(p => p.categoryTags.includes("frontend")).length
  const uiuxCount = detailedProjects.filter(p => p.categoryTags.includes("ui-ux")).length
  const upcomingCount = detailedProjects.filter(p => p.isUpcoming).length

  return (
    <section id="projects" className="relative w-full bg-background border-t border-border/60 transition-colors">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_40%_at_50%_15%,rgba(27,131,84,0.09),transparent_70%)] pointer-events-none" />

      {/* GSAP Pinned Stage */}
      <div
        ref={sectionRef}
        className="relative w-full h-screen flex flex-col justify-between overflow-hidden py-3 sm:py-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Studio Header HUD */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 shrink-0 z-20 pt-1 pb-2 border-b border-border/40">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-mono text-primary font-bold shadow-xs">
              <Sparkles size={11} className="text-primary" />
              <span>{t("projects.badge")}</span>
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold font-mono text-foreground tracking-tight">
              {t("projects.title")}
            </h2>
          </div>

          {/* Segmented Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl bg-muted/60 dark:bg-white/5 border border-border/60 backdrop-blur-md">
            <button
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isRTL ? "الكل" : "All"} ({detailedProjects.length})
            </button>
            <button
              onClick={() => setFilter("sba")}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === "sba"
                  ? "bg-emerald-500 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{isRTL ? "مشاريع الهيئة (SBA)" : "Professional (SBA)"}</span>
              <span className="text-[10px] opacity-80">({sbaCount})</span>
            </button>
            <button
              onClick={() => setFilter("frontend")}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                filter === "frontend"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isRTL ? "تطوير الواجهات" : "Frontend"} ({frontendCount})
            </button>
            <button
              onClick={() => setFilter("ui-ux")}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                filter === "ui-ux"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isRTL ? "تصميم الواجهات" : "UI/UX Design"} ({uiuxCount})
            </button>
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                filter === "upcoming"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Clock size={11} />
              <span>{isRTL ? "مرحلة قادمة" : "Upcoming"}</span>
              <span className="text-[10px] opacity-80">({upcomingCount})</span>
            </button>
          </div>
        </div>

        {/* Center Cards Stage Frame */}
        <div
          ref={cardsContainerRef}
          className="relative w-full max-w-6xl h-[480px] sm:h-[500px] md:h-[520px] lg:h-[540px] mx-auto my-auto z-10 flex items-center justify-center"
        >
          {filteredProjects.map((project, idx) => {
            const isSBA = project.isSBA
            const projectNum = String(idx + 1).padStart(2, "0")

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[idx] = el
                }}
                className="absolute inset-0 w-full h-full rounded-3xl border border-white/10 dark:border-white/10 bg-[#0d0f17]/95 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden transition-colors hover:border-primary/40 group will-change-transform flex flex-col justify-between ring-1 ring-white/5"
              >
                {/* Top Accent Strip */}
                <div
                  className={`h-1 w-full shrink-0 ${
                    project.isUpcoming
                      ? "bg-gradient-to-r from-amber-500 via-emerald-400 to-primary"
                      : isSBA
                      ? "bg-gradient-to-r from-emerald-500 via-primary to-emerald-400"
                      : "bg-gradient-to-r from-primary via-emerald-400 to-primary"
                  }`}
                />

                {/* Card Content: 2-Column Balanced UI Grid */}
                <div className="p-4 sm:p-5 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center h-full">
                  
                  {/* Left Column: Narrative, Metadata & Actions (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-2 sm:space-y-2.5">
                    
                    {/* Header Row: Index & Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-muted-foreground/80 tracking-wider">
                          {`// ${projectNum} OF 0${filteredProjects.length}`}
                        </span>

                        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                        </div>
                      </div>

                      {/* Status Badges */}
                      {project.isUpcoming ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold shadow-xs">
                          <Clock size={12} className="text-amber-400" />
                          <span>{isRTL ? "مرحلة قادمة • قيد التجهيز" : "Upcoming Phase · In Progress"}</span>
                        </span>
                      ) : project.isDesignOnly ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold shadow-xs">
                          <Smartphone size={12} className="text-purple-400" />
                          <span>{isRTL ? "مساهمة تصميمية في Figma" : "Figma Mobile UI/UX Design"}</span>
                        </span>
                      ) : isSBA ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold shadow-xs">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                          <span>{isRTL ? "مشروع مهني بهيئة الإذاعة والتلفزيون" : "Official SBA Project (Riyadh)"}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-mono font-bold">
                          <span>{isRTL ? project.badgeAr : project.badgeEn}</span>
                        </span>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors leading-snug">
                        {isRTL ? project.titleAr : project.titleEn}
                      </h3>
                      <p className="mt-0.5 text-xs sm:text-sm font-mono text-primary font-medium truncate">
                        {isRTL ? project.taglineAr : project.taglineEn}
                      </p>
                    </div>

                    {/* SBA Context Callout */}
                    {isSBA && (
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-300 flex items-start gap-2.5">
                        <Building2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="font-bold block text-foreground">
                            {isRTL ? project.organizationAr : project.organizationEn} — {isRTL ? project.officeLocationAr : project.officeLocationEn}
                          </span>
                          <p className="text-[11px] font-light text-muted-foreground leading-tight line-clamp-1">
                            {isRTL ? project.workModeNoteAr : project.workModeNoteEn}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Brief Overview */}
                    <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed line-clamp-2">
                      {isRTL ? project.descAr : project.descEn}
                    </p>

                    {/* Services Chips for B2B */}
                    {project.serviceCategories && (
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-[10px] font-mono text-primary font-bold mr-1">
                          {isRTL ? "مسارات الخدمات:" : "Services:"}
                        </span>
                        {project.serviceCategories.slice(0, 4).map((svc, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300"
                          >
                            {isRTL ? svc.ar : svc.en}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Planned Modules for Intranet */}
                    {project.plannedAreasEn && (
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-[10px] font-mono text-amber-400 font-bold mr-1">
                          {isRTL ? "المحاور المخططة:" : "Planned Areas:"}
                        </span>
                        {(isRTL ? project.plannedAreasAr : project.plannedAreasEn)?.slice(0, 3).map((area, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-300"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Engineering / Contribution Role */}
                    <div className="px-3 py-1.5 rounded-xl bg-muted/40 border border-border/60 text-xs font-mono text-foreground/90">
                      <span className="text-primary font-bold mr-1.5 inline-block">
                        {isRTL ? "المساهمة والمسؤوليات:" : "Contribution & Role:"}
                      </span>
                      <span className="font-light truncate">{isRTL ? project.roleAr : project.roleEn}</span>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-mono text-foreground/80 hover:text-foreground transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      {project.isUpcoming ? (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 text-amber-400 text-xs font-mono font-bold border border-amber-500/30">
                          <Clock size={13} className="text-amber-400" />
                          <span>{isRTL ? "مرحلة قادمة قيد التجهيز" : "Upcoming Project Phase"}</span>
                        </span>
                      ) : project.isDesignOnly ? (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 text-xs font-mono font-bold border border-purple-500/30">
                          <Smartphone size={13} className="text-purple-400" />
                          <span>{isRTL ? "تصميم واجهات وتجربة مستخدم (Figma)" : "Figma UI/UX Contribution"}</span>
                        </span>
                      ) : isSBA ? (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          <span>{isRTL ? "مشروع مهني نشط بالهيئة" : "Active SBA Assignment"}</span>
                        </span>
                      ) : project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-bold hover:bg-primary/90 transition-all shadow-sm"
                        >
                          <span>{isRTL ? "زيارة الموقع الحي" : "Launch Live"}</span>
                          <ArrowUpRight size={13} />
                        </a>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => setSelectedModalProject(project)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-muted/80 hover:bg-muted text-foreground text-xs font-mono font-semibold transition-all border border-border cursor-pointer active:scale-98"
                      >
                        <Eye size={13} />
                        <span>{isRTL ? "تفاصيل المشروع" : "Project Details"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Visual Frame Showcase (5 cols) */}
                  <div
                    onClick={() => setSelectedModalProject(project)}
                    className="lg:col-span-5 relative group/img cursor-pointer h-full flex flex-col justify-center"
                  >
                    {/* Bespoke Mobile App Frame for Al Akhbariya */}
                    {project.previewType === "mobile" ? (
                      <div className="relative mx-auto w-full max-w-[270px] aspect-[9/16] max-h-[360px] rounded-[32px] border-4 border-white/20 bg-[#0e111a] shadow-2xl p-2.5 flex flex-col justify-between overflow-hidden ring-1 ring-white/10 group-hover/img:border-primary/50 transition-all">
                        {/* Dynamic Island / Notch */}
                        <div className="w-24 h-4 bg-black rounded-full mx-auto flex items-center justify-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-neutral-800" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                        </div>

                        {/* Mobile Header */}
                        <div className="px-2 py-1.5 flex items-center justify-between border-b border-white/10">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[11px] font-bold text-white font-mono">الإخبارية · LIVE</span>
                          </div>
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-red-500/20 text-red-400 font-mono font-bold">
                            عاجل
                          </span>
                        </div>

                        {/* Mobile Content Mockup */}
                        <div className="p-2 space-y-2 flex-1 flex flex-col justify-center">
                          <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-1">
                            <span className="text-[9px] font-mono text-emerald-400 font-bold block">
                              التغطية الإخبارية الوطنية
                            </span>
                            <div className="h-2 w-4/5 bg-white/30 rounded" />
                            <div className="h-1.5 w-3/5 bg-white/20 rounded" />
                          </div>

                          <div className="grid grid-cols-2 gap-1.5">
                            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-300 text-center">
                              البث المباشر
                            </div>
                            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-mono text-foreground/80 text-center">
                              تقارير الفيديو
                            </div>
                          </div>

                          <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-950/40 to-black/60 border border-emerald-500/20">
                            <span className="text-[9px] text-muted-foreground font-mono block">Figma UI Prototype</span>
                            <span className="text-[10px] text-white font-bold block">Al Akhbariya Mobile UI/UX</span>
                          </div>
                        </div>

                        {/* Bottom Navigation Mockup */}
                        <div className="px-3 py-2 bg-black/60 rounded-2xl border border-white/10 flex items-center justify-around text-[10px] text-muted-foreground">
                          <span className="text-emerald-400 font-bold">الرئيسية</span>
                          <span>الأخبار</span>
                          <span>البث</span>
                          <span>المزيد</span>
                        </div>
                      </div>
                    ) : (
                      /* Desktop / Dashboard Browser Chrome */
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#12141f] shadow-2xl transition-all duration-300 group-hover/img:scale-[1.01] group-hover/img:border-primary/40 ring-1 ring-white/5">
                        
                        {/* Address Bar */}
                        <div className="px-3 py-1.5 bg-[#161824] border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-muted-foreground select-none">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-500/80" />
                            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                          </div>
                          <span className="text-[10px] truncate max-w-[200px] opacity-75 font-mono">
                            {project.browserUrl || "sinan.portfolio"}
                          </span>
                          <ExternalLink size={11} className="opacity-50" />
                        </div>

                        {/* Image Preview with Lazy & Async Decoding */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/20">
                          <img
                            src={project.image}
                            alt={isRTL ? project.titleAr : project.titleEn}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                          />
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-3">
                            <span className="text-white text-[11px] font-mono font-medium flex items-center gap-1.5">
                              <Eye size={12} />
                              <span>{isRTL ? "انقر لعرض تفاصيل المشروع" : "Click for project overview"}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Progress Bar & Indicator */}
        <div className="w-full flex flex-col items-center justify-center gap-1.5 shrink-0 z-20 pb-1">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-card/80 dark:bg-black/40 border border-border/60 backdrop-blur-md">
            {filteredProjects.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wider">
            {isRTL
              ? `المشروع ${String(activeIndex + 1).padStart(2, "0")} من ${String(filteredProjects.length).padStart(2, "0")} • مرر بسلاسة للتنقل`
              : `PROJECT ${String(activeIndex + 1).padStart(2, "0")} OF ${String(filteredProjects.length).padStart(2, "0")} · SCROLL SLOWLY`}
          </span>
        </div>
      </div>

      {/* Professional In-Depth Details Modal */}
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
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-mono font-bold">
                    {isRTL ? selectedModalProject.badgeAr : selectedModalProject.badgeEn}
                  </span>
                  {selectedModalProject.isSBA && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 text-[11px] font-mono font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>{isRTL ? "مشروع مهني بالهيئة (الرياض)" : "Professional SBA Assignment"}</span>
                    </span>
                  )}
                  {selectedModalProject.isUpcoming && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 text-[11px] font-mono font-bold flex items-center gap-1">
                      <Clock size={11} />
                      <span>{isRTL ? "مرحلة قادمة" : "Upcoming Phase"}</span>
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

              {/* Organization & Location Callout */}
              {selectedModalProject.isSBA && (
                <div className="mb-5 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-start gap-2.5">
                  <Building2 size={18} className="shrink-0 mt-0.5 text-emerald-500" />
                  <div>
                    <span className="font-bold block text-foreground">
                      {isRTL ? selectedModalProject.organizationAr : selectedModalProject.organizationEn} — {isRTL ? selectedModalProject.officeLocationAr : selectedModalProject.officeLocationEn}
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

              {/* Description & Contribution */}
              <div className="space-y-3 mb-5 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                <div>
                  <h4 className="text-xs font-mono font-bold text-foreground mb-1">
                    {isRTL ? "نظرة عامة على المشروع:" : "Project Overview:"}
                  </h4>
                  <p>{isRTL ? selectedModalProject.descAr : selectedModalProject.descEn}</p>
                </div>

                <div className="p-3 rounded-2xl bg-muted/40 border border-border/50 font-mono text-xs">
                  <span className="text-primary font-bold block mb-1">
                    {isRTL ? "مساهمتي الهندسية والمسؤوليات:" : "My Contribution & Engineering Role:"}
                  </span>
                  <span>{isRTL ? selectedModalProject.roleAr : selectedModalProject.roleEn}</span>
                </div>
              </div>

              {/* Service Categories (if applicable, e.g. B2B) */}
              {selectedModalProject.serviceCategories && (
                <div className="mb-5 p-3.5 rounded-2xl bg-muted/30 border border-border/50">
                  <h4 className="text-xs font-mono font-bold text-foreground mb-2">
                    {isRTL ? "مسارات خدمات الأعمال الرئيسية (SBA B2B):" : "Core Business Service Categories:"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {selectedModalProject.serviceCategories.map((svc, i) => (
                      <div key={i} className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 size={12} className="shrink-0" />
                        <span className="text-foreground/90">{isRTL ? svc.ar : svc.en}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Planned Modules (if applicable, e.g. Intranet) */}
              {selectedModalProject.plannedAreasEn && (
                <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <h4 className="text-xs font-mono font-bold text-amber-400 mb-2">
                    {isRTL ? "المحاور والمكونات المخططة للمرحلة القادمة:" : "Planned Focus Areas for Upcoming Phase:"}
                  </h4>
                  <ul className="space-y-1.5 text-xs font-mono text-muted-foreground">
                    {(isRTL ? selectedModalProject.plannedAreasAr : selectedModalProject.plannedAreasEn)?.map((area, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Clock size={12} className="text-amber-400 shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Highlights */}
              <div className="mb-5 space-y-1.5">
                <h4 className="text-xs font-mono font-bold text-foreground mb-1">
                  {isRTL ? "أبرز مميزات العمل:" : "Key Highlights:"}
                </h4>
                <ul className="space-y-1 text-xs text-muted-foreground font-light">
                  {(isRTL ? selectedModalProject.highlightsAr : selectedModalProject.highlightsEn).map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
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
                {selectedModalProject.isUpcoming ? (
                  <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
                    <Clock size={14} className="text-amber-400" />
                    <span>{isRTL ? "مرحلة قادمة قيد التجهيز" : "Upcoming Project Phase"}</span>
                  </span>
                ) : selectedModalProject.isDesignOnly ? (
                  <span className="text-xs font-mono text-purple-400 font-bold flex items-center gap-1.5">
                    <Smartphone size={14} className="text-purple-400" />
                    <span>{isRTL ? "مساهمة تصميمية في Figma" : "Figma UI/UX Design Contribution"}</span>
                  </span>
                ) : selectedModalProject.isSBA ? (
                  <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span>{isRTL ? "مشروع رسمي نشط بمقر الهيئة" : "Active SBA Assignment"}</span>
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
