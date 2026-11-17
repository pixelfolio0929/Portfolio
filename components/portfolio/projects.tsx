"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "./language-context"
import {
  Sparkles,
  ArrowUpRight,
  Eye,
  CheckCircle2,
  X,
  ExternalLink,
  Building2,
  Clock,
  Smartphone,
  Layers,
  ChevronDown,
  Monitor,
  Boxes,
  ShieldCheck
} from "lucide-react"
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion"

// --- TYPES ---
export interface ProjectData {
  id: string
  number: string
  chapter: "sba" | "independent"
  titleEn: string
  titleAr: string
  taglineEn: string
  taglineAr: string
  categoryEn: string
  categoryAr: string
  badgeEn: string
  badgeAr: string
  descEn: string
  descAr: string
  contributionEn: string
  contributionAr: string
  technologies: string[]
  image: string
  live?: string
  browserUrl?: string
  isUpcoming?: boolean
  isDesignOnly?: boolean
  isSBA?: boolean
  serviceCategories?: { en: string; ar: string; descEn: string; descAr: string }[]
  plannedAreasEn?: string[]
  plannedAreasAr?: string[]
  organizationEn?: string
  organizationAr?: string
  locationEn?: string
  locationAr?: string
  noteEn?: string
  noteAr?: string
  highlightsEn: string[]
  highlightsAr: string[]
}

// --- PROJECT CATALOG (CONCISE & EASY TO UNDERSTAND) ---
const SBA_PROJECTS: ProjectData[] = [
  // 01 — SBA Main Website
  {
    id: "sba-main",
    number: "01",
    chapter: "sba",
    titleEn: "Saudi Broadcasting Authority — Main Website",
    titleAr: "هيئة الإذاعة والتلفزيون — المنصة الرسمية",
    taglineEn: "National Broadcasting Digital Presence · UI Engineering & RTL (Riyadh HQ)",
    taglineAr: "المنصة الرقمية الوطنية لهيئة الإذاعة والتلفزيون • هندسة الواجهات وتطوير RTL (مقر الرياض)",
    categoryEn: "UI Engineering / Frontend",
    categoryAr: "هندسة واجهات / تطوير الواجهات",
    badgeEn: "SBA · UI Engineering",
    badgeAr: "مشروع رسمي بالهيئة · هندسة واجهات",
    descEn: "Contributing to the frontend development of SBA's main national digital presence: responsive interfaces, Arabic-first RTL design, and Saudi digital government UI practices.",
    descAr: "المساهمة في تطوير الواجهات الأمامية للمنصة الرئيسية لهيئة الإذاعة والتلفزيون: واجهات متجاوبة، وتصميم عربي أصيل (RTL)، ومحاذاة معايير الحكومة الرقمية.",
    contributionEn: "Frontend architecture, bidirectional RTL layouts in SCSS, responsive media grids, and DGA design alignment.",
    contributionAr: "معمارية الواجهات، وتخطيط RTL بـ SCSS، وشبكات البث المتجاوبة، ومحاذاة معايير الحكومة الرقمية.",
    technologies: ["HTML5", "CSS3 / SCSS", "JavaScript", "ASP.NET WebForms", "RTL Arabic", "DGA UI Patterns"],
    image: "/SBA.png",
    browserUrl: "sba.gov.sa",
    isSBA: true,
    organizationEn: "Saudi Broadcasting Authority (SBA)",
    organizationAr: "هيئة الإذاعة والتلفزيون",
    locationEn: "Riyadh Headquarters, Saudi Arabia",
    locationAr: "المقر الرئيسي بالرياض، المملكة العربية السعودية",
    noteEn: "Official in-office engineering contribution at SBA Headquarters in Riyadh.",
    noteAr: "مساهمة رسمية مباشرة بمقر هيئة الإذاعة والتلفزيون بالرياض.",
    highlightsEn: [
      "Responsive layout for mobile, tablet, and desktop viewports.",
      "Meticulous Arabic (RTL) optical balance and typography scaling.",
      "Modular SCSS styling for unified broadcasting portals.",
      "Aligned with Saudi digital government design practices."
    ],
    highlightsAr: [
      "واجهات متجاوبة تتكيف بدقة مع الهواتف والحواسب.",
      "توازن بصري للطباعة العربية (RTL) مع ضبط القياسات بدقة.",
      "أنماط تنسيق SCSS قابلة لإعادة الاستخدام في المنصات التابعة.",
      "توافق مع ممارسات وتوجهات الحكومة الرقمية السعودية."
    ]
  },

  // 02 — B2B.SBA.sa
  {
    id: "b2b-sba",
    number: "02",
    chapter: "sba",
    titleEn: "B2B.SBA.sa — Business Services Platform",
    titleAr: "منصة الأعمال والخدمات — B2B.SBA.sa",
    taglineEn: "Enterprise Business Services Portal · Structured Workflows & Bilingual UI",
    taglineAr: "بوابة خدمات الأعمال والشركاء • واجهات منظمة وتجربة ثنائية اللغة",
    categoryEn: "UI Design / Frontend",
    categoryAr: "تصميم واجهات / تطوير الواجهات",
    badgeEn: "SBA · UI Design & Frontend",
    badgeAr: "مشروع رسمي بالهيئة · تصميم وتطوير",
    descEn: "Contributing to the design and frontend of SBA's B2B digital services platform: structured business services, dropdown workflows, and bilingual (Arabic/English) user experiences.",
    descAr: "المساهمة في تصميم وتطوير واجهات منصة خدمات قطاع الأعمال بالهيئة (B2B): واجهات خدمات منظمة، وقوائم تفاعلية، وتجربة ثنائية اللغة (عربي/إنجليزي).",
    contributionEn: "UI design & frontend development: 5 core business tracks, service dropdowns, bilingual LTR/RTL switching, and responsive ASP.NET WebForms components.",
    contributionAr: "تصميم وبرمجة الواجهات: 5 مسارات لخدمات الأعمال، وقوائم منسدلة، وتحويل سلس بين LTR/RTL، ومكونات ASP.NET متجاوبة.",
    technologies: ["HTML5", "CSS3", "JavaScript", "ASP.NET WebForms", "Figma", "Bilingual LTR / RTL"],
    image: "/b2b.png",
    browserUrl: "b2b.sba.sa",
    isSBA: true,
    organizationEn: "Saudi Broadcasting Authority (SBA)",
    organizationAr: "هيئة الإذاعة والتلفزيون",
    locationEn: "Riyadh Headquarters, Saudi Arabia",
    locationAr: "المقر الرئيسي بالرياض، المملكة العربية السعودية",
    noteEn: "Active contribution to SBA's B2B enterprise service platform at Riyadh Headquarters.",
    noteAr: "مساهمة نشطة في بوابة خدمات الأعمال لقطاع الإنتاج والإعلام بمقر الهيئة بالرياض.",
    serviceCategories: [
      { en: "SBA SET", ar: "خدمات التصوير والإنتاج (SBA SET)", descEn: "Filming permits & studio bookings", descAr: "تصاريح التصوير وحجز استوديوهات الإنتاج" },
      { en: "SBA AD", ar: "الإعلانات والرعايات (SBA AD)", descEn: "TV commercial airtime & brand sponsorships", descAr: "الإعلانات التلفزيونية والرعايات التجارية" },
      { en: "SBA Digital Media", ar: "الإعلام الرقمي (SBA Digital)", descEn: "Digital distribution & video operations", descAr: "التوزيع الرقمي وحلول الإعلام الحديث" },
      { en: "SBA Specialized Content", ar: "المحتوى المتخصص (SBA Content)", descEn: "Footage licensing & national broadcast archive", descAr: "ترخيص المواد والأرشيف التلفزيوني الوطني" },
      { en: "SBA Media Center", ar: "إدارة المراكز الإعلامية", descEn: "Press centers & major conference media hubs", descAr: "تجهيز المراكز الإعلامية للمؤتمرات والفعاليات" }
    ],
    highlightsEn: [
      "Structured business services covering 5 core commercial tracks.",
      "Service category navigation with intuitive dropdown selection.",
      "Full bilingual support with instant LTR and RTL switching.",
      "Consistent, accessible enterprise components."
    ],
    highlightsAr: [
      "واجهات خدمات أعمال منظمة تغطي 5 مسارات تجارية رئيسية.",
      "تصفح سلس لفئات الخدمات مع قوائم منسدلة سهلة الوصول.",
      "دعم ثنائي اللغة متكامل مع تحويل فوري ودقيق بين LTR و RTL.",
      "مكونات مؤسسية متسقة وسهلة الاستخدام."
    ]
  },

  // 03 — Al Akhbariya Mobile Application
  {
    id: "al-akhbariya-mobile",
    number: "03",
    chapter: "sba",
    titleEn: "Al Akhbariya — Mobile Application",
    titleAr: "تطبيق الإخبارية — واجهات وتجربة الهاتف",
    taglineEn: "Mobile App UI/UX Design in Figma · Visual Hierarchy & Navigation",
    taglineAr: "تصميم واجهات وتجربة المستخدم للهواتف عبر Figma • تسلسل بصري وتصفح سلس",
    categoryEn: "Mobile App UI/UX Design",
    categoryAr: "تصميم واجهات وتجربة مستخدم للهاتف",
    badgeEn: "SBA · Mobile UI/UX Design",
    badgeAr: "مشروع رسمي بالهيئة · تصميم واجهات الهاتف",
    descEn: "Designed mobile application interfaces for Al Akhbariya using Figma, focusing on visual consistency, ergonomic navigation, breaking news feeds, and live streaming.",
    descAr: "تصميم واجهات وتجربة المستخدم لتطبيق قناة الإخبارية على الهاتف الذكي باستخدام Figma، مع التركيز على الاتساق البصري، وسهولة التصفح، وعرض الأخبار العاجلة والبث الحي.",
    contributionEn: "Mobile UI/UX design in Figma: Prototyping, visual hierarchy, breaking news cards, and bottom navigation. (Design contribution only).",
    contributionAr: "تصميم واجهة وتجربة المستخدم عبر Figma: بناء النماذج التفاعلية، والتسلسل البصري، وعرض الأخبار العاجلة، وشريط التنقل السفلي (مساهمة تصميمية).",
    technologies: ["Figma", "UI/UX Design", "Mobile Interface Design", "Prototyping", "Visual Hierarchy"],
    image: "/foodies heaven.jpg",
    browserUrl: "figma.com/@sinan/alakhbariya-app",
    isSBA: true,
    isDesignOnly: true,
    organizationEn: "Saudi Broadcasting Authority (SBA) / Al Akhbariya",
    organizationAr: "هيئة الإذاعة والتلفزيون / قناة الإخبارية",
    locationEn: "Riyadh Headquarters, Saudi Arabia",
    locationAr: "المقر الرئيسي بالرياض، المملكة العربية السعودية",
    noteEn: "UI/UX design contribution created in Figma (interface patterns, visual hierarchy, and prototyping).",
    noteAr: "مساهمة تصميمية لواجهات وتجربة المستخدم عبر أداة Figma.",
    highlightsEn: [
      "High-fidelity mobile screens and interactive prototypes in Figma.",
      "Clean visual hierarchy for instant breaking news readability.",
      "Thumb-friendly bottom navigation bar for single-hand mobile use.",
      "Consistent branding with Al Akhbariya's official broadcast identity."
    ],
    highlightsAr: [
      "تصميم شاشات عالية الدقة ونماذج تفاعلية لتطبيق الهاتف عبر Figma.",
      "تسلسل بصري مريح يبرز الأخبار العاجلة والتغطيات المرئية.",
      "شريط تنقل سفلي مدروس يراعي راحة اليد عند التصفح.",
      "التزام كامل بالهوية البصرية الرسمية لقناة الإخبارية."
    ]
  },

  // 04 — SBA Intranet
  {
    id: "sba-intranet",
    number: "04",
    chapter: "sba",
    titleEn: "SBA Intranet — Internal Communication System",
    titleAr: "بوابة الإنترانت الداخلي — هيئة الإذاعة والتلفزيون",
    taglineEn: "Upcoming Project Phase · Internal Digital Platform Architecture",
    taglineAr: "مرحلة قادمة قيد التجهيز • معمارية المنظومة الرقمية للتواصل المؤسسي الداخلي",
    categoryEn: "Internal Digital Platform",
    categoryAr: "منصة رقمية مؤسسية داخلية",
    badgeEn: "SBA · Upcoming Phase",
    badgeAr: "مشروع بالهيئة · مرحلة قادمة",
    descEn: "Preparing for the frontend implementation of the SBA Intranet portal, planned to be developed using ASP.NET WebForms, HTML, CSS/SCSS, and JavaScript with bilingual support.",
    descAr: "التحضير للبدء في تطوير الواجهات الأمامية لبوابة الإنترانت الداخلية لهيئة الإذاعة والتلفزيون باستخدام ASP.NET WebForms و HTML و CSS/SCSS و JavaScript بدعم ثنائي اللغة.",
    contributionEn: "Upcoming Project Phase: Planning frontend architecture, departmental layouts, bilingual templates, and employee portal mockups.",
    contributionAr: "مرحلة قادمة قيد التجهيز: التخطيط لمعمارية الواجهات، وقوالب الأقسام والهيكل التنظيمي، وبوابة الموظف، ومفاهيم إدارة المحتوى الإداري.",
    technologies: ["ASP.NET WebForms", "HTML5", "CSS3 / SCSS", "JavaScript", "Bilingual UI (AR / EN)"],
    image: "/realtime-chat-preview.jpg",
    browserUrl: "intranet.sba.internal (Staging)",
    isSBA: true,
    isUpcoming: true,
    organizationEn: "Saudi Broadcasting Authority (SBA)",
    organizationAr: "هيئة الإذاعة والتلفزيون",
    locationEn: "Riyadh Headquarters, Saudi Arabia",
    locationAr: "المقر الرئيسي بالرياض، المملكة العربية السعودية",
    noteEn: "Upcoming project phase under active frontend architecture planning at SBA Headquarters.",
    noteAr: "مشروع لمرحلة قادمة قيد التخطيط والتجهيز لمعمارية الواجهات بمقر الهيئة بالرياض.",
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
    highlightsEn: [
      "Unified internal digital portal for SBA employees across departments.",
      "Departmental hierarchy and internal policy document directory planning.",
      "Bilingual layout blueprint tailored for internal organizational workflows.",
      "Modular frontend styling architecture prepared for ASP.NET WebForms."
    ],
    highlightsAr: [
      "بوابة موحدة للخدمات الرقمية لمنسوبي وموظفي هيئة الإذاعة والتلفزيون.",
      "هيكلة متقدمة للأقسام والتعاميم واللوائح الداخلية مع أدلة الاستخدام.",
      "معمارية ثنائية اللغة متوازنة تسهل سير العمل المؤسسي الداخلي.",
      "قوالب معيارية مجهزة للتكامل المستقبلي مع ASP.NET WebForms."
    ]
  }
]

const INDEPENDENT_PROJECTS: ProjectData[] = [
  // 05 — PixelResume
  {
    id: "pixelresume",
    number: "05",
    chapter: "independent",
    titleEn: "PixelResume — Bilingual ATS Resume Builder",
    titleAr: "بكسل ريزيومي — منشئ السيرة الذاتية الذكي",
    taglineEn: "Bilingual ATS-friendly resume builder with live editing",
    taglineAr: "منشئ سيرة ذاتية ذكي ثنائي اللغة متوافق مع ATS",
    categoryEn: "SaaS Product / React.js",
    categoryAr: "منتج برمجي / React.js",
    badgeEn: "React.js • Live App",
    badgeAr: "تطبيق حي مباشر",
    descEn: "Modern browser resume builder engineered with React.js, featuring real-time preview, instant Arabic/English layout switching, and ATS-friendly PDF export.",
    descAr: "منصة ويب متطورة مبنية بـ React.js تتيح إنشاء وتخصيص السير الذاتية مع معاينة حية فورية وتصدير PDF متوافق مع ATS.",
    contributionEn: "Frontend architecture, RTL layout engine, and client-side PDF export compiler.",
    contributionAr: "معمارية الواجهة الأمامية، ومحرك تخطيط RTL التفاعلي، ومحول ملفات PDF.",
    technologies: ["React.js", "Tailwind CSS", "i18n Engine", "PDF Export"],
    image: "/pixelresume-preview.jpg",
    browserUrl: "pixelresume.netlify.app",
    live: "https://pixelresume.netlify.app/",
    highlightsEn: ["Synchronized live preview", "Dynamic Arabic/Latin typography", "Precise ATS pagination algorithm"],
    highlightsAr: ["معاينة فورية متزامنة", "توازن طباعي عربي وإنجليزي", "خوارزمية تقسيم صفحات متوافقة مع ATS"]
  },

  // 06 — AI Pixel Hub
  {
    id: "aipixelhub",
    number: "06",
    chapter: "independent",
    titleEn: "AI Pixel Hub — Intelligence Dashboard",
    titleAr: "بكسل هب — لوحة تحليلات الذكاء الاصطناعي",
    taglineEn: "AI foundation model intelligence & telemetry dashboard",
    taglineAr: "لوحة تحليلات ونماذج الذكاء الاصطناعي",
    categoryEn: "AI Analytics / Web App",
    categoryAr: "تحليلات الذكاء الاصطناعي",
    badgeEn: "React.js • Live App",
    badgeAr: "تطبيق حي مباشر",
    descEn: "Analytical dashboard aggregating benchmarks, pricing metrics, latency data, and capabilities across top foundation AI models.",
    descAr: "لوحة تحكم تفاعلية تجمع بيانات مقارنة نماذج الذكاء الاصطناعي العالمية وأسعار الاستخدام وسرعة الاستجابة.",
    contributionEn: "Frontend implementation, analytics charting, and multi-parameter faceted filtering.",
    contributionAr: "تطوير الواجهة الأمامية، وتصميم تجربة لوحة التحكم، ومكونات الرسوم البيانية.",
    technologies: ["React.js", "Firebase", "Recharts", "Tailwind CSS"],
    image: "/ai-dashboard-preview.jpg",
    browserUrl: "aipixelhubb.netlify.app",
    live: "https://aipixelhubb.netlify.app/",
    highlightsEn: ["Dynamic model evaluation matrices", "Dark mode data visualization", "Responsive analytics grid"],
    highlightsAr: ["مصفوفات مقارنة تفاعلية للنماذج", "رسوم بيانية داكنة عالية التباين", "شبكة تحليلات متجاوبة"]
  },

  // 07 — PixelFolio
  {
    id: "pixelfolio",
    number: "07",
    chapter: "independent",
    titleEn: "PixelFolio — Interaction & Motion System",
    titleAr: "نظام التصميم والتفاعل الرقمي (Framer)",
    taglineEn: "Interactive micro-interactions & motion design tokens",
    taglineAr: "نظام حركي متكامل وتفاعلات دقيقة وشبكات تخطيطية عصرية",
    categoryEn: "Design Engineering / Motion",
    categoryAr: "هندسة التصميم / تفاعل حركي",
    badgeEn: "Framer • Live System",
    badgeAr: "تصميم تفاعلي",
    descEn: "Interactive design portfolio interface showcasing fluid micro-interactions, spring physics, and modular component hierarchy.",
    descAr: "واجهة تفاعلية حديثة تستعرض الحركات الدقيقة، والتفاعل القائم على فيزياء الزنبرك، وهندسة المكونات المعيارية.",
    contributionEn: "UI/UX design, interactive prototyping, layout architecture, and motion curves.",
    contributionAr: "تصميم واجهات وتجربة المستخدم، والنماذج التفاعلية الأولية، وهندسة أنظمة التخطيط الحركي.",
    technologies: ["Framer", "UI/UX Design", "Prototyping", "Design Tokens"],
    image: "/ai-portfolio-generator-preview.jpg",
    browserUrl: "mohammadsinan.framer.website",
    live: "https://mohammadsinan.framer.website/",
    highlightsEn: ["Spring-physics gestures", "Modular design tokens", "Interactive 3D hover effects"],
    highlightsAr: ["تفاعلات فيزياء الزنبرك الطبيعية", "محددات تصميم معيارية", "تأثيرات ثلاثية الأبعاد تفاعلية"]
  },

  // 08 — GiNi WMS
  {
    id: "gini-wms",
    number: "08",
    chapter: "independent",
    titleEn: "GiNi WMS — Warehouse Management System",
    titleAr: "جيني WMS — نظام إدارة المستودعات",
    taglineEn: "Enterprise supply-chain & inventory telemetry platform",
    taglineAr: "نظام إدارة سلاسل الإمداد ومستودعات التخزين الذكية",
    categoryEn: "Enterprise Logistics / UI",
    categoryAr: "إدارة لوجستية مؤسسية",
    badgeEn: "Enterprise Web App",
    badgeAr: "منظومة لوجستية",
    descEn: "Enterprise warehouse management interface engineered for rapid barcode scanning, stock allocation, and real-time pallet tracking.",
    descAr: "واجهة متقدمة لإدارة مستودعات سلاسل الإمداد تدعم التتبع اللحظي للشحنات والمسح الضوئي الذكي وجرد المخزون.",
    contributionEn: "Frontend UI engineering, data density optimization, barcode scanner integration, and responsive operations dashboard.",
    contributionAr: "تطوير الواجهة الأمامية، وتحسين كثافة البيانات، وتكامل ماسح الباركود، ولوحات المتابعة المتجاوبة.",
    technologies: ["React.js", "SCSS", "REST APIs", "Data Grids"],
    image: "/wms-app-preview.jpg",
    browserUrl: "gini-wms.internal",
    highlightsEn: ["High-density responsive data grid", "Barcode scanner integration", "Interactive pallet telemetry"],
    highlightsAr: ["شبكة بيانات غنية متجاوبة", "تكامل فوري مع أجهزة المسح الضوئي", "تمثيل بصري تفاعلي للمخزون"]
  },

  // 09 — Weather Forecast
  {
    id: "weather-telemetry",
    number: "09",
    chapter: "independent",
    titleEn: "Atmospheric Telemetry & Weather Forecast",
    titleAr: "منصة بيانات الطقس والتحليلات الجوية",
    taglineEn: "Real-time meteorological telemetry & atmospheric tracking",
    taglineAr: "تحليلات الأرصاد الجوية الحية والتنبؤات الدقيقة بالطقس",
    categoryEn: "Web App / API Integration",
    categoryAr: "تطبيق ويب / تكامل API",
    badgeEn: "React.js • Live Telemetry",
    badgeAr: "بيانات حية",
    descEn: "Interactive weather dashboard fetching real-time atmospheric data, UV indices, multi-day radar projections, and condition metrics.",
    descAr: "لوحة تفاعلية لبيانات الطقس الحية تدعم التتبع الجغرافي المباشر، ومؤشرات الأشعة، والتوقعات التفصيلية للأيام القادمة.",
    contributionEn: "OpenWeather API integration, dynamic SVG weather state animations, and dark-mode data widgets.",
    contributionAr: "تكامل بيانات الأرصاد عبر API، وتصميم رموز SVG الحركية لحالة الطقس، والبطاقات التفاعلية.",
    technologies: ["React.js", "OpenWeather API", "Tailwind CSS"],
    image: "/ai-dashboard-preview.jpg",
    browserUrl: "weather-telemetry.app",
    highlightsEn: ["Dynamic weather condition visualization", "Hourly & 7-day projections", "Sub-second client search"],
    highlightsAr: ["تمثيل بصري تفاعلي لحالات الطقس", "منحنيات بيانية لـ 7 أيام", "بحث فوري عن المدن العالمية"]
  },

  // 10 — E-commerce / Shoe Cart
  {
    id: "shoe-cart",
    number: "10",
    chapter: "independent",
    titleEn: "Apex Kicks — E-Commerce Experience",
    titleAr: "أبيكس كيكس — تجربة تسوق تفاعلية",
    taglineEn: "High-conversion product configurator & cart interactions",
    taglineAr: "محدد منتجات تفاعلي وتجربة سلة تسوق سلسة وحركية",
    categoryEn: "E-Commerce / Interactions",
    categoryAr: "تجارة إلكترونية / تفاعلات",
    badgeEn: "E-Commerce UI",
    badgeAr: "واجهة متجر",
    descEn: "Modern sportswear commerce UI exploring 3D product view simulation, size selection micro-animations, and fluid slide-over cart drawers.",
    descAr: "واجهة متجر إلكتروني عصرية للمنتجات الرياضية تستعرض محاكاة تفاعلية للمنتج، وتحديد المقاسات بالحركة السلسة وسلة جانبية مرنة.",
    contributionEn: "Component state management, cart transition animations, fluid checkout drawer, and responsive mobile storefront.",
    contributionAr: "إدارة حالة السلة البرمجية، وتصميم الحركات الانتقالية، وبناء واجهة المتجر المتجاوبة.",
    technologies: ["React.js", "Tailwind CSS", "Framer Motion"],
    image: "/saas-builder-preview.jpg",
    browserUrl: "apex-kicks.store",
    highlightsEn: ["Smooth cart slide-over", "Interactive size/color picker", "Mobile-first checkout flow"],
    highlightsAr: ["سلة تسوق جانبية منبثقة بسلاسة", "محدد ألوان ومقاسات تفاعلي", "مسار دفع سهل ومبسط للهواتف"]
  },

  // 11 — Food Ordering Website
  {
    id: "foodies-heaven",
    number: "11",
    chapter: "independent",
    titleEn: "Foodies Heaven — Culinary Ordering Platform",
    titleAr: "فوديز هيفن — منصة استكشاف وطلب المأكولات",
    taglineEn: "Interactive digital dining & artisanal culinary menu ordering",
    taglineAr: "قائمة طعام رقمية تفاعلية ونظام طلب مأكولات سريع ومتجاوب",
    categoryEn: "Frontend UI / Hospitality",
    categoryAr: "واجهات الويب / مطاعم وضيافة",
    badgeEn: "Culinary Web UI",
    badgeAr: "منصة مأكولات",
    descEn: "Boutique culinary menu experience featuring categorized dish filtering, dietary badge tags, interactive add-to-tray feedback, and localized receipts.",
    descAr: "واجهة رقمية للمطاعم وقوائم الطعام تدعم تصفية الأصناف بحسب التصنيف والأنظمة الغذائية مع تفاعلات حركية عند الإضافة للسلة.",
    contributionEn: "Frontend development, category filtering logic, dish customizer modal, and mobile-friendly culinary navigation.",
    contributionAr: "تطوير الواجهة الأمامية، ومنطق تصفية القوائم، ونافذة تخصيص الوجبات، وتجربة التصفح المخصصة للهواتف.",
    technologies: ["HTML5", "CSS3 / SCSS", "JavaScript"],
    image: "/foodies heaven.jpg",
    browserUrl: "foodies-heaven.app",
    highlightsEn: ["Categorized cuisine filtering", "Visual photography-first cards", "Responsive mobile tray"],
    highlightsAr: ["تصفية سريعة للأصناف والوجبات", "بطاقات طعام بصرية جذابة", "سلة طلب متجاوبة ومريحة"]
  }
]

// --- 3D INTERACTIVE TILT HOOK ---
function useInteractive3DTilt(intensity = 10) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave }
}

export function Projects() {
  const { isRTL } = useLanguage()
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectData | null>(null)
  const [activeChapter, setActiveChapter] = useState<"all" | "sba" | "independent">("all")
  const [activeProjectId, setActiveProjectId] = useState<string>("sba-main")

  const sectionRef = useRef<HTMLDivElement>(null)

  // Scroll spy to update active project in the HUD
  useEffect(() => {
    const handleScroll = () => {
      const allProjects = [...SBA_PROJECTS, ...INDEPENDENT_PROJECTS]
      const scrollY = window.scrollY + window.innerHeight * 0.4

      for (let i = allProjects.length - 1; i >= 0; i--) {
        const el = document.getElementById(`project-${allProjects[i].id}`)
        if (el) {
          const top = el.offsetTop
          if (scrollY >= top) {
            setActiveProjectId(allProjects[i].id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToProject = (id: string) => {
    const el = document.getElementById(`project-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
      setActiveProjectId(id)
    }
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-foreground transition-colors duration-300 overflow-hidden border-t border-border/80 dark:border-white/10"
    >
      {/* Ambient Space Lighting for both Light and Dark themes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(7,77,49,0.06),transparent)] dark:bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(27,131,84,0.18),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_90%_50%,rgba(16,185,129,0.03),transparent)] dark:bg-[radial-gradient(circle_600px_at_90%_50%,rgba(16,185,129,0.06),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_10%_80%,rgba(7,77,49,0.04),transparent)] dark:bg-[radial-gradient(circle_600px_at_10%_80%,rgba(7,77,49,0.15),transparent)] pointer-events-none" />
      
      {/* Perspective Geometric Grid Floor for both Light and Dark themes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating Interactive 3D Quick Navigation HUD (Desktop Floating Dock) */}
      <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2 p-2 rounded-2xl bg-white/85 dark:bg-black/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl dark:shadow-2xl">
        <span className="text-[9px] font-mono font-bold text-slate-500 dark:text-neutral-400 tracking-widest uppercase py-1">
          {isRTL ? "فهرس" : "NAV"}
        </span>
        {[...SBA_PROJECTS, ...INDEPENDENT_PROJECTS].map((proj) => {
          const isActive = activeProjectId === proj.id
          return (
            <button
              key={proj.id}
              onClick={() => scrollToProject(proj.id)}
              className="group relative flex items-center justify-center p-1 rounded-xl transition-all cursor-pointer"
              aria-label={`Jump to ${proj.titleEn}`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-600 dark:bg-emerald-400 scale-125 shadow-[0_0_12px_rgba(5,150,105,0.9)] dark:shadow-[0_0_12px_rgba(52,211,153,0.9)]"
                    : "bg-slate-300 dark:bg-white/20 group-hover:bg-slate-500 dark:group-hover:bg-white/60"
                }`}
              />
              <span className="absolute right-6 px-2.5 py-1 rounded-md bg-slate-900 dark:bg-black/95 border border-slate-700 dark:border-white/15 text-[10px] font-mono font-bold text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
                {proj.number} · {isRTL ? proj.titleAr : proj.titleEn}
              </span>
            </button>
          )
        })}
      </div>

      {/* =========================================================================
          HERO INTRODUCTION: SELECTED WORK / 2024 — 2026
          ========================================================================= */}
      <div className="relative max-w-5xl mx-auto px-6 pt-20 sm:pt-24 pb-12 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-600/30 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 text-[11px] font-mono font-bold tracking-wider uppercase mb-4 shadow-sm dark:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
          <Sparkles size={11} className="text-emerald-600 dark:text-emerald-400 animate-pulse" />
          <span>{isRTL ? "الأعمال المختارة / 2024 — 2026" : "SELECTED WORK / 2024 — 2026"}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono max-w-3xl mx-auto leading-tight"
        >
          {isRTL ? (
            <>
              بناء تجارب رقمية <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-500">تصنع الفارق</span>.
            </>
          ) : (
            <>
              Building Digital Experiences <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-500">That Matter</span>.
            </>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3.5 text-xs sm:text-sm md:text-base text-slate-600 dark:text-neutral-400 max-w-xl mx-auto font-light leading-relaxed"
        >
          {isRTL
            ? "استكشاف نقطة التقاء تصميم الواجهات، وهندسة النظم البرمجية، والتكنولوجيا التفاعلية عبر منصات حكومية ومشاريع مستقلة."
            : "Exploring the intersection of interface design, frontend engineering, and interactive technology across government platforms and independent products."}
        </motion.p>

        {/* Chapter Switcher Tabs */}
        <div className="mt-8 inline-flex items-center gap-1.5 p-1 rounded-xl bg-white/90 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-xl">
          <button
            onClick={() => setActiveChapter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeChapter === "all"
                ? "bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm dark:shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {isRTL ? "الكل (11)" : "All (11)"}
          </button>
          <button
            onClick={() => {
              setActiveChapter("sba")
              scrollToProject("sba-main")
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeChapter === "sba"
                ? "bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm dark:shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{isRTL ? "مشاريع الهيئة (SBA)" : "SBA Projects (04)"}</span>
          </button>
          <button
            onClick={() => {
              setActiveChapter("independent")
              scrollToProject("pixelresume")
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeChapter === "independent"
                ? "bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm dark:shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Boxes size={12} />
            <span>{isRTL ? "مشاريع مستقلة" : "Independent (07)"}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          CHAPTER I: FEATURED SBA PROFESSIONAL PROJECTS (01 — 04)
          Clear, Easy-To-Understand 3D Scenes
          ========================================================================= */}
      {(activeChapter === "all" || activeChapter === "sba") && (
        <div className="relative max-w-6xl mx-auto px-6 space-y-20 sm:space-y-24 pb-20">
          
          {/* Chapter I Title Tag */}
          <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase block">
                {isRTL ? "// الفصل الأول • مشاريع العمل الرسمية" : "// CHAPTER I · GOVERNMENT DIGITAL PLATFORMS"}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                {isRTL ? "مشاريع هيئة الإذاعة والتلفزيون (SBA)" : "Saudi Broadcasting Authority (SBA) Work"}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-neutral-400">
              <Building2 size={13} className="text-emerald-600 dark:text-emerald-400" />
              <span>{isRTL ? "المقر الرئيسي بالرياض — السعودية" : "Riyadh HQ, Saudi Arabia"}</span>
            </div>
          </div>

          {/* PROJECT 01 — SBA Main Website */}
          <SbaMainWebsiteScene project={SBA_PROJECTS[0]} isRTL={isRTL} onInspect={() => setSelectedModalProject(SBA_PROJECTS[0])} />

          {/* PROJECT 02 — B2B.SBA.sa Business Services Platform */}
          <B2bSbaServicesScene project={SBA_PROJECTS[1]} isRTL={isRTL} onInspect={() => setSelectedModalProject(SBA_PROJECTS[1])} />

          {/* PROJECT 03 — Al Akhbariya Mobile Application */}
          <AlAkhbariyaMobileScene project={SBA_PROJECTS[2]} isRTL={isRTL} onInspect={() => setSelectedModalProject(SBA_PROJECTS[2])} />

          {/* PROJECT 04 — SBA Intranet Internal System */}
          <SbaIntranetScene project={SBA_PROJECTS[3]} isRTL={isRTL} onInspect={() => setSelectedModalProject(SBA_PROJECTS[3])} />
        </div>
      )}

      {/* =========================================================================
          CHAPTER II: BEYOND PROFESSIONAL WORK (05 — 11)
          ========================================================================= */}
      {(activeChapter === "all" || activeChapter === "independent") && (
        <div className="relative max-w-6xl mx-auto px-6 pt-12 pb-28">
          
          {/* Chapter II Divider & Heading */}
          <div className="pt-10 border-t border-slate-200 dark:border-white/10 mb-10 text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase block mb-1">
              {isRTL ? "// الفصل الثاني • ما وراء العمل المؤسسي" : "// CHAPTER II · EXPLORATORY CREATIVE WORK"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {isRTL ? "ما وراء العمل الرسمي" : "Beyond Professional Work."}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-neutral-400 font-light leading-relaxed">
              {isRTL
                ? "منتجات SaaS مستقلة، ومنصات ذكاء اصطناعي، ونظم تفاعل حركي من الفكرة إلى الكود."
                : "Independent SaaS products, AI telemetry dashboards, and interactive engineering experiments."}
            </p>
          </div>

          {/* 3D Perspective Grid of Independent Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDEPENDENT_PROJECTS.map((project) => (
              <IndependentProject3DCard
                key={project.id}
                project={project}
                isRTL={isRTL}
                onInspect={() => setSelectedModalProject(project)}
              />
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          PROJECT DETAILS MODAL OVERLAY (LIGHT & DARK THEME COMPATIBLE)
          ========================================================================= */}
      <AnimatePresence>
        {selectedModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModalProject(null)}
              className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0e111a] p-5 sm:p-7 shadow-2xl dark:shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10 text-slate-900 dark:text-white"
            >
              <button
                onClick={() => setSelectedModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 dark:bg-white/5 dark:hover:bg-white/10 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-2 pr-6">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-[11px] font-mono font-bold">
                  {selectedModalProject.number} · {isRTL ? selectedModalProject.badgeAr : selectedModalProject.badgeEn}
                </span>
                {selectedModalProject.isUpcoming && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-400 text-[11px] font-mono font-bold flex items-center gap-1">
                    <Clock size={11} />
                    <span>{isRTL ? "مرحلة قادمة" : "Upcoming Phase"}</span>
                  </span>
                )}
                {selectedModalProject.isDesignOnly && (
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/15 border border-purple-200 dark:border-purple-500/30 text-purple-800 dark:text-purple-300 text-[11px] font-mono font-bold flex items-center gap-1">
                    <Smartphone size={11} />
                    <span>{isRTL ? "تصميم Figma" : "Figma Design"}</span>
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">
                {isRTL ? selectedModalProject.titleAr : selectedModalProject.titleEn}
              </h3>
              <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                {isRTL ? selectedModalProject.taglineAr : selectedModalProject.taglineEn}
              </p>

              {/* SBA Organization Callout */}
              {selectedModalProject.isSBA && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-xs font-mono text-emerald-900 dark:text-emerald-300 flex items-start gap-2">
                  <Building2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {isRTL ? selectedModalProject.organizationAr : selectedModalProject.organizationEn} — {isRTL ? selectedModalProject.locationAr : selectedModalProject.locationEn}
                    </span>
                    <p className="text-[11px] font-light text-slate-600 dark:text-neutral-300 mt-0.5">
                      {isRTL ? selectedModalProject.noteAr : selectedModalProject.noteEn}
                    </p>
                  </div>
                </div>
              )}

              {/* Actual Image in Modal */}
              <div className="relative aspect-[16/9] w-full rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden my-4 bg-slate-100 dark:bg-black/60 shadow-md">
                <img
                  src={selectedModalProject.image}
                  alt={selectedModalProject.titleEn}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Overview & Contribution (Small Details) */}
              <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-neutral-300 font-light leading-relaxed">
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white mb-0.5">
                    {isRTL ? "نظرة سريعة:" : "Overview:"}
                  </h4>
                  <p>{isRTL ? selectedModalProject.descAr : selectedModalProject.descEn}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono text-xs">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold block mb-0.5">
                    {isRTL ? "مساهمتي والمسؤوليات:" : "My Contribution:"}
                  </span>
                  <span className="text-slate-700 dark:text-neutral-200">{isRTL ? selectedModalProject.contributionAr : selectedModalProject.contributionEn}</span>
                </div>
              </div>

              {/* Service Categories (for B2B) */}
              {selectedModalProject.serviceCategories && (
                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white mb-2">
                    {isRTL ? "مسارات الخدمات الرئيسية:" : "Business Service Tracks:"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {selectedModalProject.serviceCategories.map((svc, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-700 dark:text-neutral-300">
                        <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-900 dark:text-white font-bold block">{isRTL ? svc.ar : svc.en}</span>
                          <span className="text-[10px] text-slate-500 dark:text-neutral-400">{isRTL ? svc.descAr : svc.descEn}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Planned Areas (for Intranet) */}
              {selectedModalProject.plannedAreasEn && (
                <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                  <h4 className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400 mb-1.5">
                    {isRTL ? "المحاور المخططة للمرحلة القادمة:" : "Planned Areas for Upcoming Phase:"}
                  </h4>
                  <ul className="space-y-1 text-xs font-mono text-slate-700 dark:text-neutral-300">
                    {(isRTL ? selectedModalProject.plannedAreasAr : selectedModalProject.plannedAreasEn)?.map((area, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Clock size={11} className="text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Highlights */}
              <div className="mt-4 space-y-1">
                <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white mb-0.5">
                  {isRTL ? "أبرز النقاط:" : "Key Highlights:"}
                </h4>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-neutral-300 font-light">
                  {(isRTL ? selectedModalProject.highlightsAr : selectedModalProject.highlightsEn).map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1 pt-3.5 border-t border-slate-200 dark:border-white/10 my-4">
                {selectedModalProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-700 dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-1">
                {selectedModalProject.live ? (
                  <a
                    href={selectedModalProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-black font-mono font-bold text-xs transition-all shadow-sm dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  >
                    <span>{isRTL ? "زيارة الموقع الحي" : "Launch Live App"}</span>
                    <ArrowUpRight size={13} />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400" />
                    <span>{isRTL ? "مشروع مهني رسمي بالهيئة" : "Official SBA Project"}</span>
                  </span>
                )}

                <button
                  onClick={() => setSelectedModalProject(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white font-mono text-xs transition-colors cursor-pointer"
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

// =============================================================================
// 3D SCENE 01 — SBA Main Website (Featuring User's SBA.png in 3D Browser Mockup)
// =============================================================================
function SbaMainWebsiteScene({
  project,
  isRTL,
  onInspect
}: {
  project: ProjectData
  isRTL: boolean
  onInspect: () => void
}) {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useInteractive3DTilt(8)

  return (
    <div id={`project-${project.id}`} className="relative scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* Narrative Side (5 cols) - Concise & Compact */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
              01 / 04 · {project.categoryEn}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight leading-snug">
            {isRTL ? project.titleAr : project.titleEn}
          </h3>

          <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
            {isRTL ? project.taglineAr : project.taglineEn}
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 font-light leading-relaxed">
            {isRTL ? project.descAr : project.descEn}
          </p>

          {/* Small compact contribution box */}
          <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono shadow-xs">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold block mb-0.5">
              {isRTL ? "المسؤوليات الهندسية:" : "Engineering Role:"}
            </span>
            <span className="text-slate-700 dark:text-neutral-300 text-[11px] leading-relaxed">
              {isRTL ? project.contributionAr : project.contributionEn}
            </span>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {project.technologies.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-700 dark:text-neutral-300">
                {t}
              </span>
            ))}
          </div>

          {/* Action */}
          <div className="pt-1 flex items-center gap-3">
            <button
              onClick={onInspect}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-black font-mono font-bold text-xs transition-all shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer active:scale-98"
            >
              <Eye size={13} />
              <span>{isRTL ? "استكشاف تفاصيل المشروع" : "Explore Project"}</span>
            </button>
            <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isRTL ? "الرياض • رسمي" : "Riyadh In-Office"}</span>
            </span>
          </div>
        </div>

        {/* 3D Floating Browser Mockup featuring user's authentic SBA.png (7 cols) */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-7 perspective-[1000px] cursor-pointer"
          onClick={onInspect}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative rounded-2xl border border-slate-200/90 dark:border-white/15 bg-white dark:bg-[#0b0e17] shadow-xl dark:shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 hover:border-emerald-500/50 group"
          >
            {/* Top Browser Bar */}
            <div className="px-3 py-2 bg-slate-100 dark:bg-[#121624] border-b border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-3 py-0.5 rounded-full bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-700 dark:text-neutral-300 flex items-center gap-1.5 shadow-xs">
                <Building2 size={11} className="text-emerald-600 dark:text-emerald-400" />
                <span>sba.gov.sa · Saudi Broadcasting Authority</span>
              </div>
              <ExternalLink size={11} className="opacity-50" />
            </div>

            {/* Authentic SBA Image with 3D Depth Overlays */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-black/60">
              <img
                src="/SBA.png"
                alt="Saudi Broadcasting Authority Main Website"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating 3D Badge 1 */}
              <div className="absolute top-3 left-3 p-2 rounded-xl bg-white/90 dark:bg-black/75 border border-slate-200 dark:border-white/15 backdrop-blur-md shadow-md flex items-center gap-2 text-[10px] font-mono text-slate-800 dark:text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>RTL First · DGA Design Alignment</span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                <span className="text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                  <Eye size={12} />
                  <span>{isRTL ? "انقر للمعاينة والتفاصيل" : "Click to inspect details"}</span>
                </span>
                <span className="text-[10px] font-mono text-white bg-black/70 px-2 py-0.5 rounded border border-white/15">
                  ASP.NET WebForms
                </span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

// =============================================================================
// 3D SCENE 02 — B2B.SBA.sa Business Services Platform (Featuring User's b2b.png)
// =============================================================================
function B2bSbaServicesScene({
  project,
  isRTL,
  onInspect
}: {
  project: ProjectData
  isRTL: boolean
  onInspect: () => void
}) {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useInteractive3DTilt(8)

  return (
    <div id={`project-${project.id}`} className="relative scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* Visual Business Platform Mockup featuring user's authentic b2b.png (7 cols) */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-7 perspective-[1000px] cursor-pointer order-2 lg:order-1"
          onClick={onInspect}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative rounded-2xl border border-slate-200/90 dark:border-white/15 bg-white dark:bg-[#0b0e17] shadow-xl dark:shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 hover:border-emerald-500/50 group"
          >
            {/* Top Browser Bar */}
            <div className="px-3 py-2 bg-slate-100 dark:bg-[#121624] border-b border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-3 py-0.5 rounded-full bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-700 dark:text-neutral-300 flex items-center gap-1.5 shadow-xs">
                <Building2 size={11} className="text-emerald-600 dark:text-emerald-400" />
                <span>b2b.sba.sa · Business Services Platform</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono font-bold border border-emerald-200 dark:border-transparent">
                B2B Services
              </span>
            </div>

            {/* Authentic B2B Image with 3D Depth Overlays */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-black/60">
              <img
                src="/b2b.png"
                alt="SBA B2B Business Services Platform"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Service Badge */}
              <div className="absolute top-3 left-3 p-2 rounded-xl bg-white/90 dark:bg-black/80 border border-slate-200 dark:border-white/15 backdrop-blur-md shadow-md flex items-center gap-1.5 text-[10px] font-mono text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
                <span>5 Service Categories · Bilingual UI</span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                <span className="text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                  <Eye size={12} />
                  <span>{isRTL ? "انقر للمعاينة والتفاصيل" : "Click to inspect details"}</span>
                </span>
                <span className="text-[10px] font-mono text-white bg-black/70 px-2 py-0.5 rounded border border-white/15">
                  b2b.sba.sa
                </span>
              </div>
            </div>

            {/* 5 Service Categories Quick Pills Row Under Image */}
            <div className="px-3 py-2 bg-slate-50 dark:bg-[#101422] border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">Services:</span>
              {["SBA SET", "SBA AD", "Digital Media", "Specialized Content", "Media Center"].map((s, i) => (
                <span key={i} className="px-1.5 py-0.5 rounded bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Narrative Side (5 cols) - Concise & Compact */}
        <div className="lg:col-span-5 space-y-3 order-1 lg:order-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
              02 / 04 · {project.categoryEn}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight leading-snug">
            {isRTL ? project.titleAr : project.titleEn}
          </h3>

          <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
            {isRTL ? project.taglineAr : project.taglineEn}
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 font-light leading-relaxed">
            {isRTL ? project.descAr : project.descEn}
          </p>

          {/* Small compact contribution box */}
          <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono shadow-xs">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold block mb-0.5">
              {isRTL ? "مساهمة الواجهات والتصميم:" : "Frontend & UI Design:"}
            </span>
            <span className="text-slate-700 dark:text-neutral-300 text-[11px] leading-relaxed">
              {isRTL ? project.contributionAr : project.contributionEn}
            </span>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {project.technologies.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-700 dark:text-neutral-300">
                {t}
              </span>
            ))}
          </div>

          {/* Action */}
          <div className="pt-1 flex items-center gap-3">
            <button
              onClick={onInspect}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-black font-mono font-bold text-xs transition-all shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer active:scale-98"
            >
              <Eye size={13} />
              <span>{isRTL ? "استكشاف تفاصيل المشروع" : "Explore Project"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

// =============================================================================
// 3D SCENE 03 — Al Akhbariya Mobile App (Compact 3D Smartphone)
// =============================================================================
function AlAkhbariyaMobileScene({
  project,
  isRTL,
  onInspect
}: {
  project: ProjectData
  isRTL: boolean
  onInspect: () => void
}) {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useInteractive3DTilt(10)

  return (
    <div id={`project-${project.id}`} className="relative scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* Narrative Side (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-purple-600 dark:text-purple-400 tracking-wider">
              03 / 04 · {project.categoryEn}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight leading-snug">
            {isRTL ? project.titleAr : project.titleEn}
          </h3>

          <p className="text-xs font-mono text-purple-600 dark:text-purple-400">
            {isRTL ? project.taglineAr : project.taglineEn}
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 font-light leading-relaxed">
            {isRTL ? project.descAr : project.descEn}
          </p>

          {/* Figma Design Disclaimer Box */}
          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/25 text-xs font-mono text-purple-900 dark:text-purple-300 shadow-xs">
            <span className="font-bold block text-purple-950 dark:text-white mb-0.5">
              {isRTL ? "مساهمة تصميمية في Figma:" : "Figma UI/UX Design Contribution:"}
            </span>
            <span className="text-[11px] leading-relaxed">
              {isRTL ? project.contributionAr : project.contributionEn}
            </span>
          </div>

          {/* Tools */}
          <div className="flex flex-wrap gap-1 pt-1">
            {project.technologies.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-700 dark:text-neutral-300">
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-1 flex items-center gap-3">
            <button
              onClick={onInspect}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 text-white font-mono font-bold text-xs transition-all shadow-md dark:shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer active:scale-98"
            >
              <Eye size={13} />
              <span>{isRTL ? "استكشاف تفاصيل التصميم" : "Explore Project"}</span>
            </button>
          </div>
        </div>

        {/* 3D Smartphone Chassis Mockup (7 cols) */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-7 perspective-[1000px] flex items-center justify-center cursor-pointer py-2"
          onClick={onInspect}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-[270px] aspect-[9/18] rounded-[36px] border-4 border-slate-300 dark:border-white/20 bg-slate-950 dark:bg-[#0c0f17] shadow-xl dark:shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-2.5 flex flex-col justify-between overflow-hidden ring-1 ring-slate-200 dark:ring-white/10 group hover:border-purple-500/50 transition-colors"
          >
            {/* Dynamic Island Notch */}
            <div className="w-24 h-4 bg-black rounded-full mx-auto flex items-center justify-center gap-1.5 mb-1.5 z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            </div>

            {/* Mobile Top Bar */}
            <div className="px-2 py-1 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[11px] font-bold text-white font-mono">الإخبارية · LIVE</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-red-500/20 text-red-400 font-mono font-bold">
                عاجل
              </span>
            </div>

            {/* Mobile App Screen Content */}
            <div className="p-2 space-y-2 flex-1 flex flex-col justify-center">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="text-[9px] font-mono text-purple-400 font-bold block uppercase">
                  Figma Mobile Wireframe
                </span>
                <div className="h-2.5 w-5/6 bg-white/40 rounded-md" />
                <div className="h-1.5 w-3/5 bg-white/20 rounded-md" />
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-center font-mono text-[9px] text-purple-300">
                  البث المباشر
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center font-mono text-[9px] text-neutral-300">
                  تقارير خاصة
                </div>
              </div>

              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-950/40 to-black/60 border border-purple-500/20">
                <span className="text-[9px] font-mono text-neutral-400 block">Al Akhbariya UI/UX</span>
                <span className="text-[11px] font-bold text-white block">Visual Hierarchy & Prototyping</span>
              </div>
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <div className="px-3 py-2 bg-black/80 rounded-xl border border-white/10 flex items-center justify-around text-[9px] text-neutral-400">
              <span className="text-purple-400 font-bold">الرئيسية</span>
              <span>الأخبار</span>
              <span>البث</span>
              <span>المزيد</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

// =============================================================================
// 3D SCENE 04 — SBA Intranet Internal System (Compact Layered Portal)
// =============================================================================
function SbaIntranetScene({
  project,
  isRTL,
  onInspect
}: {
  project: ProjectData
  isRTL: boolean
  onInspect: () => void
}) {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useInteractive3DTilt(8)

  return (
    <div id={`project-${project.id}`} className="relative scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* Layered Intranet Dashboard Preview (7 cols) */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-7 perspective-[1000px] cursor-pointer order-2 lg:order-1"
          onClick={onInspect}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative rounded-2xl border border-slate-200/90 dark:border-white/15 bg-white dark:bg-[#0b0e17] shadow-xl dark:shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 hover:border-amber-500/50 group p-4 space-y-3"
          >
            {/* Top Intranet Staging Banner */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                <Clock size={12} className="text-amber-600 dark:text-amber-400" />
                <span className="font-bold text-[11px]">intranet.sba.internal (Staging Architecture)</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[9px] font-mono font-bold border border-amber-200 dark:border-transparent">
                Upcoming Phase
              </span>
            </div>

            {/* 5 Planned Modules Display */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 block">
                {isRTL ? "المحاور المؤسسية المخططة للمرحلة القادمة:" : "Planned Focus Areas for Upcoming Phase:"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-mono">
                {(isRTL ? project.plannedAreasAr : project.plannedAreasEn)?.map((area, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-200 flex items-center gap-1.5 text-[11px]"
                  >
                    <Clock size={11} className="text-amber-600 dark:text-amber-400 shrink-0" />
                    <span className="truncate">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Intranet Quick Status Callout */}
            <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-gradient-to-r dark:from-amber-950/30 dark:to-black/50 border border-amber-200 dark:border-amber-500/20 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-700 dark:text-neutral-300">معمارية ثنائية اللغة لموظفي الهيئة (AR/EN)</span>
              <span className="text-amber-700 dark:text-amber-400 font-bold">ASP.NET WebForms</span>
            </div>
          </motion.div>
        </div>

        {/* Narrative Side (5 cols) */}
        <div className="lg:col-span-5 space-y-3 order-1 lg:order-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 tracking-wider">
              04 / 04 · {project.categoryEn}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight leading-snug">
            {isRTL ? project.titleAr : project.titleEn}
          </h3>

          <p className="text-xs font-mono text-amber-700 dark:text-amber-400">
            {isRTL ? project.taglineAr : project.taglineEn}
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 font-light leading-relaxed">
            {isRTL ? project.descAr : project.descEn}
          </p>

          {/* Upcoming Status Alert */}
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/25 text-xs font-mono text-amber-900 dark:text-amber-300 shadow-xs">
            <span className="font-bold block text-amber-950 dark:text-white mb-0.5">
              {isRTL ? "مرحلة قادمة قيد التجهيز:" : "Upcoming Phase · In Progress:"}
            </span>
            <span className="text-[11px] leading-relaxed">
              {isRTL ? project.contributionAr : project.contributionEn}
            </span>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {project.technologies.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-700 dark:text-neutral-300">
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-1 flex items-center gap-3">
            <button
              onClick={onInspect}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-400 text-black font-mono font-bold text-xs transition-all shadow-md dark:shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer active:scale-98"
            >
              <Eye size={13} />
              <span>{isRTL ? "استكشاف تفاصيل المشروع" : "Explore Project"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

// =============================================================================
// CHAPTER II — INDEPENDENT 3D CARD COMPONENT (COMPACT & CLEAN FOR BOTH THEMES)
// =============================================================================
function IndependentProject3DCard({
  project,
  isRTL,
  onInspect
}: {
  project: ProjectData
  isRTL: boolean
  onInspect: () => void
}) {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useInteractive3DTilt(8)

  return (
    <div
      id={`project-${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-[1000px] cursor-pointer scroll-mt-24"
      onClick={onInspect}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0e111a] hover:border-emerald-500/50 transition-all duration-300 p-4 flex flex-col justify-between shadow-md dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)] group"
      >
        <div className="space-y-2">
          {/* Top row: Number & Badge */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wider">// {project.number}</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300 text-[10px]">
              {isRTL ? project.badgeAr : project.badgeEn}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-base font-bold font-mono text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
            {isRTL ? project.titleAr : project.titleEn}
          </h4>

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-neutral-400 font-light line-clamp-2 leading-relaxed">
            {isRTL ? project.descAr : project.descEn}
          </p>
        </div>

        {/* Tech Stack & Action */}
        <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-2.5 mt-3">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((t) => (
              <span key={t} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[9px] font-mono text-slate-700 dark:text-neutral-300">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>{isRTL ? "استعراض المشروع" : "Explore Project"}</span>
              <ArrowUpRight size={12} />
            </span>
            {project.live && (
              <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">
                {new URL(project.live).hostname}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
