"use client"

import { useState, useRef, useEffect, useId } from "react"
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
  ChevronRight,
  Radio,
  SlidersHorizontal,
  Compass,
  Monitor,
  FolderGit2,
  FileText,
  Boxes,
  CloudSun,
  ShoppingCart,
  UtensilsCrossed,
  LayoutGrid
} from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"

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
  serviceCategories?: { en: string; ar: string }[]
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

// --- PROJECT CATALOG ---
const SBA_PROJECTS: ProjectData[] = [
  // 01 — SBA Main Website
  {
    id: "sba-main",
    number: "01",
    chapter: "sba",
    titleEn: "Saudi Broadcasting Authority — Main Website",
    titleAr: "هيئة الإذاعة والتلفزيون — المنصة الرسمية الرئيسية",
    taglineEn: "National Broadcasting Digital Presence · UI Engineering & RTL (Riyadh HQ)",
    taglineAr: "المنصة الرقمية الوطنية لهيئة الإذاعة والتلفزيون • هندسة الواجهات وتطوير RTL (مقر الرياض)",
    categoryEn: "UI Engineering / Frontend Development",
    categoryAr: "هندسة واجهات المستخدم / تطوير الواجهات الأمامية",
    badgeEn: "SBA · UI Engineering",
    badgeAr: "مشروع رسمي بالهيئة · هندسة واجهات",
    descEn: "Contributing to the frontend development and UI improvements of the Saudi Broadcasting Authority's main digital presence, focusing on responsive interfaces, Arabic-first user experiences, RTL layouts, reusable styling patterns, and alignment with Saudi digital government design practices.",
    descAr: "المساهمة في تطوير الواجهات الأمامية وتحسينات تجربة المستخدم للمنصة الرقمية الرئيسية لهيئة الإذاعة والتلفزيون، مع التركيز على الواجهات المتجاوبة، والتجارب العربية أولاً، وتخطيط RTL، وأنماط التصميم القابلة لإعادة الاستخدام وفق ممارسات الحكومة الرقمية السعودية.",
    contributionEn: "Frontend architecture, responsive UI components, bidirectional RTL layout styling in SCSS, and alignment with Saudi digital government design practices.",
    contributionAr: "معمارية الواجهات، والمكونات المتجاوبة، وتنسيق أنماط RTL ثنائية الاتجاه بـ SCSS، والالتزام بممارسات الحكومة الرقمية السعودية.",
    technologies: ["HTML5", "CSS3 / SCSS", "JavaScript", "ASP.NET WebForms", "Responsive Design", "RTL Implementation", "DGA-aligned UI"],
    image: "/Coding Workspace.png",
    browserUrl: "sba.gov.sa",
    isSBA: true,
    organizationEn: "Saudi Broadcasting Authority (SBA)",
    organizationAr: "هيئة الإذاعة والتلفزيون",
    locationEn: "Riyadh Headquarters, Saudi Arabia",
    locationAr: "المقر الرئيسي بالرياض، المملكة العربية السعودية",
    noteEn: "Official in-office engineering contribution at SBA Headquarters in Riyadh.",
    noteAr: "مساهمة رسمية مباشرة بمقر هيئة الإذاعة والتلفزيون بالرياض.",
    highlightsEn: [
      "Responsive interfaces engineered for national audience reach across all viewports.",
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

  // 02 — B2B.SBA.sa
  {
    id: "b2b-sba",
    number: "02",
    chapter: "sba",
    titleEn: "B2B.SBA.sa — Business Services Platform",
    titleAr: "منصة الأعمال والخدمات الرقمية — B2B.SBA.sa",
    taglineEn: "Enterprise Business Services Portal · Structured Workflows & Bilingual UI",
    taglineAr: "بوابة خدمات الأعمال والشركاء • واجهات منظمة وتجربة ثنائية اللغة",
    categoryEn: "UI Design / Frontend Development",
    categoryAr: "تصميم واجهات المستخدم / تطوير الواجهات الأمامية",
    badgeEn: "SBA · UI Design & Frontend",
    badgeAr: "مشروع رسمي بالهيئة · تصميم وبرمجة واجهات",
    descEn: "Contributing to the design and frontend development of SBA's B2B digital services platform, creating structured business service interfaces and bilingual user experiences for commercial and production partners.",
    descAr: "المساهمة في تصميم وتطوير الواجهات الأمامية لمنصة الخدمات الرقمية لقطاع الأعمال بالهيئة (B2B.sba.sa)، وبناء واجهات خدمات مهيكلة وتجارب مستخدم ثنائية اللغة لشركاء الإنتاج والإعلام.",
    contributionEn: "UI design and frontend development: Service category hierarchy, dropdown interactions, LTR/RTL bilingual switching, and responsive ASP.NET WebForms styling.",
    contributionAr: "تصميم وتطوير واجهات المستخدم: هيكلة فئات الخدمات، وتفاعلات القوائم المنسدلة، والتحويل السلس بين LTR و RTL، وتصميم المكونات المتجاوبة.",
    technologies: ["HTML5", "CSS3", "JavaScript", "ASP.NET WebForms", "Figma", "Bilingual LTR / RTL", "Responsive UI"],
    image: "/wms-app-preview.jpg",
    browserUrl: "b2b.sba.sa",
    isSBA: true,
    organizationEn: "Saudi Broadcasting Authority (SBA)",
    organizationAr: "هيئة الإذاعة والتلفزيون",
    locationEn: "Riyadh Headquarters, Saudi Arabia",
    locationAr: "المقر الرئيسي بالرياض، المملكة العربية السعودية",
    noteEn: "Active contribution to SBA's B2B enterprise service platform at Riyadh Headquarters.",
    noteAr: "مساهمة نشطة في بوابة خدمات الأعمال لقطاع الإنتاج والإعلام بمقر الهيئة بالرياض.",
    serviceCategories: [
      { en: "SBA SET", ar: "خدمات التصوير والإنتاج (SBA SET)" },
      { en: "SBA AD", ar: "خدمات الإعلانات والرعايات (SBA AD)" },
      { en: "SBA Digital Media", ar: "خدمات الإعلام الرقمي (SBA Digital)" },
      { en: "SBA Specialized Content", ar: "المحتوى المتخصص (SBA Content)" },
      { en: "SBA Media Center Management", ar: "إدارة المراكز الإعلامية" }
    ],
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

  // 03 — Al Akhbariya Mobile Application
  {
    id: "al-akhbariya-mobile",
    number: "03",
    chapter: "sba",
    titleEn: "Al Akhbariya — Mobile Application",
    titleAr: "تطبيق الإخبارية — واجهات وتجربة المستخدم للهاتف",
    taglineEn: "Mobile App UI/UX Design in Figma · Visual Hierarchy & Navigation",
    taglineAr: "تصميم واجهات وتجربة المستخدم للهواتف عبر Figma • تسلسل بصري وتصفح سلس",
    categoryEn: "Mobile App UI/UX Design",
    categoryAr: "تصميم واجهات وتجربة المستخدم لتطبيقات الهاتف",
    badgeEn: "SBA · Mobile UI/UX Design",
    badgeAr: "مشروع رسمي بالهيئة · تصميم واجهات الهاتف",
    descEn: "Designed mobile application interfaces for Al Akhbariya using Figma, focusing on visual consistency, intuitive navigation, content presentation, and user experience.",
    descAr: "تصميم واجهات وتجربة المستخدم لتطبيق قناة الإخبارية على الهاتف الذكي باستخدام Figma، مع التركيز على الاتساق البصري، وسهولة التصفح، وعرض المحتوى الإخباري بتسلسل بصري جذاب.",
    contributionEn: "Mobile UI/UX Design Contribution (Figma): Visual hierarchy, wireframing, high-fidelity screen design, breaking news components, and interactive prototypes. (Design contribution only).",
    contributionAr: "مساهمة في تصميم واجهة وتجربة المستخدم عبر Figma: بناء النماذج التفاعلية، والاتساق البصري، وعرض الأخبار العاجلة، وأنماط التصفح السلس (مساهمة تصميمية).",
    technologies: ["Figma", "UI/UX Design", "Mobile Interface Design", "User Experience", "Visual Hierarchy", "Prototyping"],
    image: "/foodies heaven.jpg",
    browserUrl: "figma.com/@sinan/alakhbariya-app",
    isSBA: true,
    isDesignOnly: true,
    organizationEn: "Saudi Broadcasting Authority (SBA) / Al Akhbariya",
    organizationAr: "هيئة الإذاعة والتلفزيون / قناة الإخبارية",
    locationEn: "Riyadh Headquarters, Saudi Arabia",
    locationAr: "المقر الرئيسي بالرياض، المملكة العربية السعودية",
    noteEn: "UI/UX design contribution in Figma (focusing on mobile UI patterns, visual hierarchy, and prototyping).",
    noteAr: "مساهمة تصميمية لواجهات وتجربة المستخدم عبر أداة Figma.",
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
    descEn: "Preparing for the frontend implementation of the SBA Intranet portal, planned to be developed using ASP.NET WebForms, HTML, CSS/SCSS, and JavaScript with bilingual (Arabic and English) support.",
    descAr: "التحضير للبدء في تطوير الواجهات الأمامية لبوابة الإنترانت الداخلية لهيئة الإذاعة والتلفزيون، والمخطط تنفيذها باستخدام ASP.NET WebForms و HTML و CSS/SCSS و JavaScript بدعم ثنائي اللغة (العربية والإنجليزية).",
    contributionEn: "Upcoming Project Phase: Planning frontend architecture, departmental layouts, bilingual templates, employee portal mockups, and administrative UI concepts.",
    contributionAr: "مرحلة قادمة قيد التجهيز: التخطيط لمعمارية الواجهات، وقوالب الأقسام والهيكل التنظيمي، وبوابة الموظف، ومفاهيم إدارة المحتوى الإداري.",
    technologies: ["ASP.NET WebForms", "HTML5", "CSS3 / SCSS", "JavaScript", "Bilingual UI (AR / EN)", "Architecture Planning"],
    image: "/realtime-chat-preview.jpg",
    browserUrl: "intranet.sba.internal (Staging)",
    isSBA: true,
    isUpcoming: true,
    organizationEn: "Saudi Broadcasting Authority (SBA)",
    organizationAr: "هيئة الإذاعة والتلفزيون",
    locationEn: "Riyadh Headquarters, Saudi Arabia",
    locationAr: "المقر الرئيسي بالرياض، المملكة العربية السعودية",
    noteEn: "Upcoming project phase under active frontend architecture planning and design staging at SBA Headquarters.",
    noteAr: "مشروع لمرحلة قادمة قيد التخطيط والتجهيز لمعمارية الواجهات بمقر هيئة الإذاعة والتلفزيون بالرياض.",
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
    categoryEn: "SaaS Product / Frontend Architecture",
    categoryAr: "منتج برمجي / معمارية الواجهات",
    badgeEn: "React.js • Live App",
    badgeAr: "تطبيق حي مباشر",
    descEn: "Modern browser resume builder engineered with React.js, featuring real-time preview, instant Arabic/English layout switching, and ATS-friendly PDF export.",
    descAr: "منصة ويب متطورة مبنية بـ React.js تتيح إنشاء وتخصيص السير الذاتية مع معاينة حية فورية وتصدير PDF متوافق مع ATS.",
    contributionEn: "Frontend architecture, RTL layout engine, client-side PDF export compiler, and responsive template customization.",
    contributionAr: "معمارية الواجهة الأمامية، ومحرك تخطيط RTL التفاعلي، ومحول ملفات PDF، وتخصيص القوالب المتجاوبة.",
    technologies: ["React.js", "Tailwind CSS", "i18n Engine", "PDF Export", "Framer Motion"],
    image: "/pixelresume-preview.jpg",
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

  // 06 — AI Pixel Hub
  {
    id: "aipixelhub",
    number: "06",
    chapter: "independent",
    titleEn: "AI Pixel Hub — Intelligence Dashboard",
    titleAr: "بكسل هب — لوحة تحليلات الذكاء الاصطناعي",
    taglineEn: "AI foundation model intelligence & telemetry dashboard",
    taglineAr: "لوحة تحليلات ونماذج الذكاء الاصطناعي",
    categoryEn: "AI Analytics / Web Application",
    categoryAr: "تحليلات الذكاء الاصطناعي / تطبيق ويب",
    badgeEn: "React.js • Live App",
    badgeAr: "تطبيق حي مباشر",
    descEn: "Analytical dashboard aggregating benchmarks, pricing metrics, latency data, and capabilities across top foundation AI models.",
    descAr: "لوحة تحكم تفاعلية تجمع بيانات مقارنة نماذج الذكاء الاصطناعي العالمية وأسعار الاستخدام وسرعة الاستجابة.",
    contributionEn: "Frontend implementation, analytics charting, and multi-parameter faceted filtering.",
    contributionAr: "تطوير الواجهة الأمامية، وتصميم تجربة لوحة التحكم، ومكونات الرسوم البيانية التفاعلية.",
    technologies: ["React.js", "Firebase", "Recharts", "Tailwind CSS"],
    image: "/ai-dashboard-preview.jpg",
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

  // 07 — PixelFolio
  {
    id: "pixelfolio",
    number: "07",
    chapter: "independent",
    titleEn: "PixelFolio — Interaction & Motion System",
    titleAr: "نظام التصميم والتفاعل الرقمي (Framer)",
    taglineEn: "Interactive micro-interactions & motion design tokens",
    taglineAr: "نظام حركي متكامل وتفاعلات دقيقة وشبكات تخطيطية عصرية",
    categoryEn: "Design Engineering / Motion System",
    categoryAr: "هندسة التصميم / نظم الحركة التفاعلية",
    badgeEn: "Framer • Live System",
    badgeAr: "تصميم تفاعلي",
    descEn: "Interactive design portfolio interface showcasing fluid micro-interactions, spring physics, and modular component hierarchy.",
    descAr: "واجهة تفاعلية حديثة تستعرض الحركات الدقيقة، والتفاعل القائم على فيزياء الزنبرك، وهندسة المكونات المعيارية.",
    contributionEn: "UI/UX design, interactive prototyping, layout architecture, and motion curves.",
    contributionAr: "تصميم واجهات وتجربة المستخدم، والنماذج التفاعلية الأولية، وهندسة أنظمة التخطيط الحركي.",
    technologies: ["Framer", "UI/UX Design", "Prototyping", "Design Systems"],
    image: "/ai-portfolio-generator-preview.jpg",
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
  },

  // 08 — GiNi WMS
  {
    id: "gini-wms",
    number: "08",
    chapter: "independent",
    titleEn: "GiNi WMS — Warehouse Management System",
    titleAr: "جيني WMS — نظام إدارة المستودعات واللوجستيات",
    taglineEn: "Enterprise supply-chain & inventory telemetry platform",
    taglineAr: "نظام إدارة سلاسل الإمداد ومستودعات التخزين الذكية",
    categoryEn: "Enterprise Logistics / UI Engineering",
    categoryAr: "إدارة لوجستية مؤسسية / هندسة واجهات",
    badgeEn: "Enterprise Web App",
    badgeAr: "منظومة لوجستية",
    descEn: "Enterprise warehouse management interface engineered for rapid barcode scanning, stock allocation, real-time pallet tracking, and inventory auditing.",
    descAr: "واجهة متقدمة لإدارة مستودعات سلاسل الإمداد تدعم التتبع اللحظي للشحنات والمسح الضوئي الذكي وجرد المخزون.",
    contributionEn: "Frontend UI engineering, data density optimization, barcode scanner integration, and responsive operations dashboard.",
    contributionAr: "تطوير الواجهة الأمامية، وتحسين كثافة البيانات، وتكامل ماسح الباركود، ولوحات المتابعة المتجاوبة.",
    technologies: ["React.js", "SCSS", "REST APIs", "Data Grids", "Responsive UI"],
    image: "/wms-app-preview.jpg",
    browserUrl: "gini-wms.internal",
    highlightsEn: [
      "High-density responsive data grid with lightning-fast column search.",
      "Barcode scanning integration designed for industrial mobile handhelds.",
      "Interactive rack and pallet telemetry visualization."
    ],
    highlightsAr: [
      "شبكة بيانات غنية متجاوبة مع بحث فوري فائق السرعة بين الأعمدة.",
      "تكامل فوري مع أجهزة المسح الضوئي الميدانية المحمولة.",
      "تمثيل بصري تفاعلي لتوزيع الأرفف والمخزون الداخلي."
    ]
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
    categoryEn: "Web Application / API Integration",
    categoryAr: "تطبيق ويب / تكامل واجهات API",
    badgeEn: "React.js • Live Telemetry",
    badgeAr: "بيانات حية",
    descEn: "Interactive weather dashboard fetching real-time atmospheric data, UV indices, multi-day radar projections, and geo-located condition metrics.",
    descAr: "لوحة تفاعلية لبيانات الطقس الحية تدعم التتبع الجغرافي المباشر، ومؤشرات الأشعة، والتوقعات التفصيلية للأيام القادمة.",
    contributionEn: "OpenWeather API integration, dynamic SVG weather state animations, and dark-mode data widgets.",
    contributionAr: "تكامل بيانات الأرصاد عبر API، وتصميم رموز SVG الحركية لحالة الطقس، والبطاقات التفاعلية.",
    technologies: ["React.js", "OpenWeather API", "Tailwind CSS", "SVG Micro-motion"],
    image: "/ai-dashboard-preview.jpg",
    browserUrl: "weather-telemetry.app",
    highlightsEn: [
      "Dynamic weather condition visualization with reactive particle states.",
      "Hourly and 7-day atmospheric projections with temperature curves.",
      "Sub-second client-side city search and local timezone normalization."
    ],
    highlightsAr: [
      "تمثيل بصري تفاعلي لحالات الطقس يتغير بتغير الأجواء المحيطة.",
      "منحنيات بيانية لدرجات الحرارة على مدار الساعة ولسبعة أيام مقبلة.",
      "بحث فوري عن المدن العالمية مع معالجة دقيقة للمناطق الزمنية."
    ]
  },

  // 10 — E-commerce / Shoe Cart
  {
    id: "shoe-cart",
    number: "10",
    chapter: "independent",
    titleEn: "Apex Kicks — Interactive E-Commerce Experience",
    titleAr: "أبيكس كيكس — تجربة تسوق تفاعلية عصرية",
    taglineEn: "High-conversion product configurator & cart interactions",
    taglineAr: "محدد منتجات تفاعلي وتجربة سلة تسوق سلسة وحركية",
    categoryEn: "E-Commerce / Micro-Interactions",
    categoryAr: "تجارة إلكترونية / تفاعلات دقيقة",
    badgeEn: "E-Commerce UI",
    badgeAr: "واجهة متجر",
    descEn: "Modern sportswear commerce UI exploring 3D product view simulation, size selection micro-animations, and fluid slide-over cart drawers.",
    descAr: "واجهة متجر إلكتروني عصرية للمنتجات الرياضية تستعرض محاكاة تفاعلية للمنتج، وتحديد المقاسات بالحركة السلسة وسلة جانبية مرنة.",
    contributionEn: "Component state management, cart transition animations, fluid checkout drawer, and responsive mobile storefront.",
    contributionAr: "إدارة حالة السلة البرمجية، وتصميم الحركات الانتقالية، وبناء واجهة المتجر المتجاوبة مع الهواتف.",
    technologies: ["React.js", "Tailwind CSS", "Framer Motion", "State Management"],
    image: "/saas-builder-preview.jpg",
    browserUrl: "apex-kicks.store",
    highlightsEn: [
      "Smooth cart slide-over with synchronized line-item state recalculations.",
      "Interactive colorway and size picker with spring-physics feedback.",
      "Mobile-first checkout flow with friction-free payment UI states."
    ],
    highlightsAr: [
      "سلة تسوق جانبية منبثقة بسلاسة مع تحديث فوري للمجاميع والكميات.",
      "محدد ألوان ومقاسات تفاعلي يعطي استجابة حركية فورية للنقر.",
      "مسار دفع سهل ومبسط مصمم خصيصاً لتجربة مستخدمي الهواتف."
    ]
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
    categoryEn: "Frontend UI / Hospitality Web",
    categoryAr: "واجهات الويب / قطاع الضيافة والمطاعم",
    badgeEn: "Culinary Web UI",
    badgeAr: "منصة مأكولات",
    descEn: "Boutique culinary menu experience featuring categorized dish filtering, dietary badge tags, interactive add-to-tray feedback, and localized order receipts.",
    descAr: "واجهة رقمية للمطاعم وقوائم الطعام تدعم تصفية الأصناف بحسب التصنيف والأنظمة الغذائية مع تفاعلات حركية عند الإضافة للسلة.",
    contributionEn: "Frontend development, category filtering logic, dish customizer modal, and mobile-friendly culinary navigation.",
    contributionAr: "تطوير الواجهة الأمامية، ومنطق تصفية القوائم، ونافذة تخصيص الوجبات، وتجربة التصفح المخصصة للهواتف.",
    technologies: ["HTML5", "CSS3 / SCSS", "JavaScript", "Responsive Design"],
    image: "/foodies heaven.jpg",
    browserUrl: "foodies-heaven.app",
    highlightsEn: [
      "Categorized cuisine filtering with instant instant search and allergen tags.",
      "Visual menu cards with photography-first layout and price calculations.",
      "Responsive checkout tray designed for seamless table-side ordering."
    ],
    highlightsAr: [
      "تصفية سريعة للأصناف والوجبات مع وسوم واضحة للمكونات والخيارات الغذائية.",
      "بطاقات طعام بصرية تبرز جمالية التصوير وجودة تقديم الوجبات.",
      "سلة طلب متجاوبة ومريحة تتيح إتمام الطلبات بيسر على مختلف الأجهزة."
    ]
  }
]

// --- 3D INTERACTIVE TILT HOOK ---
function useInteractive3DTilt(intensity = 15) {
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
  const { t, isRTL } = useLanguage()
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
      className="relative w-full bg-[#07090e] text-foreground transition-colors overflow-hidden border-t border-white/10"
    >
      {/* Deep 3D Ambient Space Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(27,131,84,0.18),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_90%_50%,rgba(16,185,129,0.06),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_10%_80%,rgba(7,77,49,0.15),transparent)] pointer-events-none" />
      
      {/* Perspective Geometric Grid Floor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating Interactive 3D Quick Navigation HUD (Desktop Floating Dock) */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2.5 p-2 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl">
        <span className="text-[9px] font-mono font-bold text-muted-foreground/60 tracking-widest uppercase py-1">
          {isRTL ? "فهرس" : "NAV"}
        </span>
        {[...SBA_PROJECTS, ...INDEPENDENT_PROJECTS].map((proj) => {
          const isActive = activeProjectId === proj.id
          return (
            <button
              key={proj.id}
              onClick={() => scrollToProject(proj.id)}
              className="group relative flex items-center justify-center p-1.5 rounded-xl transition-all cursor-pointer"
              aria-label={`Jump to ${proj.titleEn}`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-400 scale-125 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                    : "bg-white/20 group-hover:bg-white/60"
                }`}
              />
              {/* Tooltip on hover */}
              <span className="absolute right-7 px-2.5 py-1 rounded-lg bg-black/90 border border-white/15 text-[10px] font-mono font-bold text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
                {proj.number} · {isRTL ? proj.titleAr : proj.titleEn}
              </span>
            </button>
          )
        })}
      </div>

      {/* =========================================================================
          HERO INTRODUCTION: SELECTED WORK / 2024 — 2026
          ========================================================================= */}
      <div className="relative max-w-6xl mx-auto px-6 pt-24 sm:pt-32 pb-16 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase mb-6 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
        >
          <Sparkles size={12} className="text-emerald-400 animate-pulse" />
          <span>{isRTL ? "الأعمال المختارة / 2024 — 2026" : "SELECTED WORK / 2024 — 2026"}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-mono max-w-4xl mx-auto leading-tight"
        >
          {isRTL ? (
            <>
              بناء تجارب رقمية <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">تصنع الفارق</span>.
            </>
          ) : (
            <>
              Building Digital Experiences <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">That Matter</span>.
            </>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed"
        >
          {isRTL
            ? "من المنصات الرقمية الحكومية إلى المنتجات المستقلة، أستكشف نقطة التقاء تصميم الواجهات، وهندسة النظم البرمجية، والتكنولوجيا التفاعلية."
            : "From government digital platforms to independent products, exploring the intersection of interface design, frontend engineering, and creative technology."}
        </motion.p>

        {/* Animated 3D Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col items-center justify-center gap-2 text-neutral-500 font-mono text-[11px] tracking-widest uppercase"
        >
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
            />
          </div>
          <span>{isRTL ? "مرر للاستكشاف" : "SCROLL TO EXPLORE"}</span>
        </motion.div>

        {/* Chapter Switcher Tabs */}
        <div className="mt-12 inline-flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <button
            onClick={() => {
              setActiveChapter("all")
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeChapter === "all"
                ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {isRTL ? "جميع المشاريع (11)" : "All Projects (11)"}
          </button>
          <button
            onClick={() => {
              setActiveChapter("sba")
              scrollToProject("sba-main")
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeChapter === "sba"
                ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{isRTL ? "مشاريع الهيئة (SBA)" : "Chapter I: SBA Work (04)"}</span>
          </button>
          <button
            onClick={() => {
              setActiveChapter("independent")
              scrollToProject("pixelresume")
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeChapter === "independent"
                ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Boxes size={13} />
            <span>{isRTL ? "المشاريع المستقلة" : "Chapter II: Independent (07)"}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          CHAPTER I: FEATURED SBA PROFESSIONAL PROJECTS (01 — 04)
          Large, Immersive 3D Showcase Scenes
          ========================================================================= */}
      {(activeChapter === "all" || activeChapter === "sba") && (
        <div className="relative max-w-7xl mx-auto px-6 space-y-32 sm:space-y-40 pb-28">
          
          {/* Chapter I Title Tag */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase block mb-1">
                {isRTL ? "// الفصل الأول • مشاريع العمل الرسمية" : "// CHAPTER I · GOVERNMENT DIGITAL PLATFORMS"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {isRTL ? "مشاريع هيئة الإذاعة والتلفزيون (SBA)" : "Saudi Broadcasting Authority (SBA) Work"}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <Building2 size={14} className="text-emerald-400" />
              <span>{isRTL ? "المقر الرئيسي بالرياض — المملكة العربية السعودية" : "Riyadh Headquarters, Saudi Arabia"}</span>
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
          Independent Projects Matrix in 3D Perspective
          ========================================================================= */}
      {(activeChapter === "all" || activeChapter === "independent") && (
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-36">
          
          {/* Chapter II Divider & Heading */}
          <div className="pt-16 border-t border-white/10 mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase block mb-2">
              {isRTL ? "// الفصل الثاني • ما وراء العمل المؤسسي" : "// CHAPTER II · EXPLORATORY CREATIVE WORK"}
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-mono">
              {isRTL ? "ما وراء العمل الرسمي" : "Beyond Professional Work."}
            </h3>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              {isRTL
                ? "منتجات SaaS مستقلة، ومنصات ذكاء اصطناعي، ونظم تفاعل حركي تستعرض مهارات بناء الواجهات من الفكرة إلى الكود."
                : "Independent SaaS products, AI telemetry platforms, and interactive engineering experiments exploring creative web possibilities."}
            </p>
          </div>

          {/* 3D Perspective Grid of Independent Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          PROJECT DETAILS MODAL OVERLAY
          ========================================================================= */}
      <AnimatePresence>
        {selectedModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModalProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#0e111a] p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] z-10 text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  {selectedModalProject.number} · {isRTL ? selectedModalProject.badgeAr : selectedModalProject.badgeEn}
                </span>
                {selectedModalProject.isUpcoming && (
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold flex items-center gap-1.5">
                    <Clock size={12} />
                    <span>{isRTL ? "مرحلة قادمة • قيد التجهيز" : "Upcoming Project Phase"}</span>
                  </span>
                )}
                {selectedModalProject.isDesignOnly && (
                  <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold flex items-center gap-1.5">
                    <Smartphone size={12} />
                    <span>{isRTL ? "تصميم واجهات وتجربة مستخدم (Figma)" : "Figma Mobile UI/UX Design"}</span>
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                {isRTL ? selectedModalProject.titleAr : selectedModalProject.titleEn}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-emerald-400 mt-1">
                {isRTL ? selectedModalProject.taglineAr : selectedModalProject.taglineEn}
              </p>

              {/* SBA Organization Callout */}
              {selectedModalProject.isSBA && (
                <div className="mt-4 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-300 flex items-start gap-2.5">
                  <Building2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">
                      {isRTL ? selectedModalProject.organizationAr : selectedModalProject.organizationEn} — {isRTL ? selectedModalProject.locationAr : selectedModalProject.locationEn}
                    </span>
                    <p className="text-[11px] font-light text-neutral-300 mt-0.5">
                      {isRTL ? selectedModalProject.noteAr : selectedModalProject.noteEn}
                    </p>
                  </div>
                </div>
              )}

              {/* Preview Image */}
              <div className="relative aspect-[16/9] w-full rounded-2xl border border-white/10 overflow-hidden my-6 bg-black/40">
                <img
                  src={selectedModalProject.image}
                  alt={isRTL ? selectedModalProject.titleAr : selectedModalProject.titleEn}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Overview & Contribution */}
              <div className="space-y-4 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                <div>
                  <h4 className="text-xs font-mono font-bold text-white mb-1">
                    {isRTL ? "نظرة عامة على المشروع:" : "Project Overview:"}
                  </h4>
                  <p>{isRTL ? selectedModalProject.descAr : selectedModalProject.descEn}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
                  <span className="text-emerald-400 font-bold block mb-1">
                    {isRTL ? "مساهمتي الهندسية والمسؤوليات:" : "My Contribution & Engineering Role:"}
                  </span>
                  <span>{isRTL ? selectedModalProject.contributionAr : selectedModalProject.contributionEn}</span>
                </div>
              </div>

              {/* Service Categories (for B2B) */}
              {selectedModalProject.serviceCategories && (
                <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-xs font-mono font-bold text-white mb-2">
                    {isRTL ? "مسارات الخدمات الرئيسية (SBA B2B):" : "Core Business Service Categories:"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {selectedModalProject.serviceCategories.map((svc, i) => (
                      <div key={i} className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 size={12} className="shrink-0" />
                        <span className="text-neutral-200">{isRTL ? svc.ar : svc.en}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Planned Areas (for Intranet) */}
              {selectedModalProject.plannedAreasEn && (
                <div className="mt-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <h4 className="text-xs font-mono font-bold text-amber-400 mb-2">
                    {isRTL ? "المحاور المخططة للمرحلة القادمة:" : "Planned Focus Areas for Upcoming Phase:"}
                  </h4>
                  <ul className="space-y-1.5 text-xs font-mono text-neutral-300">
                    {(isRTL ? selectedModalProject.plannedAreasAr : selectedModalProject.plannedAreasEn)?.map((area, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Clock size={12} className="text-amber-400 shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Highlights */}
              <div className="mt-5 space-y-1.5">
                <h4 className="text-xs font-mono font-bold text-white mb-1">
                  {isRTL ? "أبرز مميزات العمل:" : "Key Highlights:"}
                </h4>
                <ul className="space-y-1 text-xs text-neutral-300 font-light">
                  {(isRTL ? selectedModalProject.highlightsAr : selectedModalProject.highlightsEn).map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-5 border-t border-white/10 my-6">
                {selectedModalProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-2">
                {selectedModalProject.live ? (
                  <a
                    href={selectedModalProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    <span>{isRTL ? "زيارة الموقع الحي" : "Launch Live App"}</span>
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>{isRTL ? "مشروع مهني رسمي بالهيئة" : "Official SBA Professional Project"}</span>
                  </span>
                )}

                <button
                  onClick={() => setSelectedModalProject(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs transition-colors cursor-pointer"
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
// 3D SCENE 01 — SBA Main Website (Desktop Floating 3D Browser Mockup)
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
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useInteractive3DTilt(10)

  return (
    <div id={`project-${project.id}`} className="relative scroll-mt-28">
      {/* Background Watermark Number */}
      <span className="absolute -top-12 sm:-top-20 left-0 text-7xl sm:text-9xl font-extrabold font-mono text-white/[0.03] select-none pointer-events-none">
        01 // SBA
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Narrative Side (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
              01 / 04 · {project.categoryEn}
            </span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tight leading-snug">
            {isRTL ? project.titleAr : project.titleEn}
          </h3>

          <p className="text-xs sm:text-sm font-mono text-emerald-400">
            {isRTL ? project.taglineAr : project.taglineEn}
          </p>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            {isRTL ? project.descAr : project.descEn}
          </p>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono">
            <span className="text-emerald-400 font-bold block mb-1">
              {isRTL ? "المسؤوليات الهندسية:" : "Engineering Focus:"}
            </span>
            <span className="text-neutral-300">{isRTL ? project.contributionAr : project.contributionEn}</span>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onInspect}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] cursor-pointer active:scale-98"
            >
              <Eye size={14} />
              <span>{isRTL ? "استكشاف تفاصيل المشروع" : "Explore Project"}</span>
            </button>
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isRTL ? "مشروع مهني بالرياض" : "Riyadh In-Office"}</span>
            </span>
          </div>
        </div>

        {/* 3D Floating Browser Mockup (7 cols) */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-7 perspective-[1200px] cursor-pointer"
          onClick={onInspect}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative rounded-3xl border border-white/15 bg-[#10131f] shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-emerald-500/40 group"
          >
            {/* Top Browser Bar Chrome */}
            <div className="px-4 py-2.5 bg-[#161a29] border-b border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] font-mono text-neutral-300 flex items-center gap-2">
                <Building2 size={12} className="text-emerald-400" />
                <span>sba.gov.sa · Saudi Broadcasting Authority</span>
              </div>
              <ExternalLink size={12} className="opacity-50" />
            </div>

            {/* Visual Canvas with Layered Floating Pills */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
              <img
                src={project.image}
                alt={project.titleEn}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating 3D Depth Card Overlay 1 */}
              <div className="absolute top-4 left-4 p-3 rounded-2xl bg-black/70 border border-white/15 backdrop-blur-md shadow-2xl flex items-center gap-2.5 text-xs font-mono text-white transform translate-z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>DGA Design Alignment · RTL Arabic</span>
              </div>

              {/* Floating 3D Depth Card Overlay 2 */}
              <div className="absolute bottom-4 right-4 p-3 rounded-2xl bg-black/80 border border-emerald-500/30 backdrop-blur-md shadow-2xl text-xs font-mono text-emerald-300 flex items-center gap-2">
                <Eye size={13} className="text-emerald-400" />
                <span>{isRTL ? "انقر للمعاينة ثلاثية الأبعاد" : "Click to inspect 3D scene"}</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

// =============================================================================
// 3D SCENE 02 — B2B.SBA.sa Business Services Platform (Layered Dashboard)
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
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useInteractive3DTilt(10)

  return (
    <div id={`project-${project.id}`} className="relative scroll-mt-28">
      {/* Background Watermark Number */}
      <span className="absolute -top-12 sm:-top-20 right-0 text-7xl sm:text-9xl font-extrabold font-mono text-white/[0.03] select-none pointer-events-none">
        02 // B2B
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Visual Layered Dashboard Mockup (7 cols) */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-7 perspective-[1200px] cursor-pointer order-2 lg:order-1"
          onClick={onInspect}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative rounded-3xl border border-white/15 bg-[#10131f] shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-emerald-500/40 group p-5 space-y-4"
          >
            {/* Dashboard Mini Topbar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-bold">b2b.sba.sa</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono">
                Bilingual LTR / RTL
              </span>
            </div>

            {/* 5 Layered Floating Service Category Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                {isRTL ? "فئات الخدمات المؤسسية:" : "Business Service Tracks:"}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {project.serviceCategories?.map((svc, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-colors text-xs font-mono text-neutral-200 flex items-center gap-2"
                  >
                    <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                    <span className="truncate">{isRTL ? svc.ar : svc.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Image Canvas */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40">
              <img
                src={project.image}
                alt={project.titleEn}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-mono text-white flex items-center gap-2">
                  <Eye size={13} className="text-emerald-400" />
                  <span>{isRTL ? "انقر للمعاينة والتفاصيل" : "Click to view full service architecture"}</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Narrative Side (5 cols) */}
        <div className="lg:col-span-5 space-y-4 order-1 lg:order-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
              02 / 04 · {project.categoryEn}
            </span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tight leading-snug">
            {isRTL ? project.titleAr : project.titleEn}
          </h3>

          <p className="text-xs sm:text-sm font-mono text-emerald-400">
            {isRTL ? project.taglineAr : project.taglineEn}
          </p>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            {isRTL ? project.descAr : project.descEn}
          </p>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono">
            <span className="text-emerald-400 font-bold block mb-1">
              {isRTL ? "مساهمة الواجهات والتصميم:" : "Frontend & UI Design:"}
            </span>
            <span className="text-neutral-300">{isRTL ? project.contributionAr : project.contributionEn}</span>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onInspect}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] cursor-pointer active:scale-98"
            >
              <Eye size={14} />
              <span>{isRTL ? "استكشاف تفاصيل المشروع" : "Explore Project"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

// =============================================================================
// 3D SCENE 03 — Al Akhbariya Mobile App (3D Smartphone Mockup)
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
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useInteractive3DTilt(14)

  return (
    <div id={`project-${project.id}`} className="relative scroll-mt-28">
      {/* Background Watermark Number */}
      <span className="absolute -top-12 sm:-top-20 left-0 text-7xl sm:text-9xl font-extrabold font-mono text-white/[0.03] select-none pointer-events-none">
        03 // MOBILE
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Narrative Side (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-purple-400 tracking-wider">
              03 / 04 · {project.categoryEn}
            </span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tight leading-snug">
            {isRTL ? project.titleAr : project.titleEn}
          </h3>

          <p className="text-xs sm:text-sm font-mono text-purple-400">
            {isRTL ? project.taglineAr : project.taglineEn}
          </p>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            {isRTL ? project.descAr : project.descEn}
          </p>

          {/* Explicit Figma UI/UX Disclaimer Box */}
          <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/25 text-xs font-mono text-purple-300">
            <span className="font-bold block text-white mb-1">
              {isRTL ? "مساهمة تصميمية في Figma:" : "Figma UI/UX Design Contribution:"}
            </span>
            <span>{isRTL ? project.contributionAr : project.contributionEn}</span>
          </div>

          {/* Tools */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onInspect}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-mono font-bold text-xs transition-all shadow-[0_0_25px_rgba(168,85,247,0.35)] cursor-pointer active:scale-98"
            >
              <Eye size={14} />
              <span>{isRTL ? "استكشاف تفاصيل التصميم" : "Explore Project"}</span>
            </button>
          </div>
        </div>

        {/* 3D Smartphone Chassis Mockup (7 cols) */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-7 perspective-[1200px] flex items-center justify-center cursor-pointer py-4"
          onClick={onInspect}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-[320px] aspect-[9/18] rounded-[48px] border-4 border-white/20 bg-[#0c0f17] shadow-[0_35px_100px_rgba(0,0,0,0.9)] p-3 flex flex-col justify-between overflow-hidden ring-1 ring-white/10 group hover:border-purple-500/50 transition-colors"
          >
            {/* Dynamic Island Notch */}
            <div className="w-28 h-5 bg-black rounded-full mx-auto flex items-center justify-center gap-2 mb-2 z-10">
              <span className="w-2 h-2 rounded-full bg-neutral-800" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            </div>

            {/* Mobile Top Bar */}
            <div className="px-3 py-1 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-white font-mono">الإخبارية · LIVE</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400 font-mono font-bold">
                عاجل
              </span>
            </div>

            {/* Mobile App Screen Content */}
            <div className="p-3 space-y-3 flex-1 flex flex-col justify-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-purple-400 font-bold block uppercase">
                  Figma Mobile Wireframe
                </span>
                <div className="h-3 w-5/6 bg-white/40 rounded-md" />
                <div className="h-2 w-3/5 bg-white/20 rounded-md" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center font-mono text-[10px] text-purple-300">
                  البث المباشر
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center font-mono text-[10px] text-neutral-300">
                  تقارير خاصة
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-950/40 to-black/60 border border-purple-500/20">
                <span className="text-[10px] font-mono text-neutral-400 block">Al Akhbariya UI/UX</span>
                <span className="text-xs font-bold text-white block">Visual Hierarchy & Prototyping</span>
              </div>
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <div className="px-4 py-2.5 bg-black/80 rounded-2xl border border-white/10 flex items-center justify-around text-[10px] text-neutral-400">
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
// 3D SCENE 04 — SBA Intranet Internal System (Layered Enterprise Portal)
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
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useInteractive3DTilt(10)

  return (
    <div id={`project-${project.id}`} className="relative scroll-mt-28">
      {/* Background Watermark Number */}
      <span className="absolute -top-12 sm:-top-20 right-0 text-7xl sm:text-9xl font-extrabold font-mono text-white/[0.03] select-none pointer-events-none">
        04 // INTRANET
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Layered Intranet Dashboard Preview (7 cols) */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-7 perspective-[1200px] cursor-pointer order-2 lg:order-1"
          onClick={onInspect}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative rounded-3xl border border-white/15 bg-[#10131f] shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-amber-500/40 group p-5 space-y-4"
          >
            {/* Top Intranet Staging Banner */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2 text-amber-400">
                <Clock size={13} className="text-amber-400" />
                <span className="font-bold">intranet.sba.internal (Staging Architecture)</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                Upcoming Phase
              </span>
            </div>

            {/* 5 Planned Modules Display */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                {isRTL ? "المحاور المؤسسية المخططة للمرحلة القادمة:" : "Planned Focus Areas for Upcoming Phase:"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {(isRTL ? project.plannedAreasAr : project.plannedAreasEn)?.map((area, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-neutral-200 flex items-center gap-2"
                  >
                    <Clock size={12} className="text-amber-400 shrink-0" />
                    <span className="truncate">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Intranet Canvas Preview */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40">
              <img
                src={project.image}
                alt={project.titleEn}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-mono text-amber-300 flex items-center gap-2">
                  <Eye size={13} />
                  <span>{isRTL ? "انقر لاستعراض معمارية الإنترانت المخططة" : "Click to view planned intranet blueprint"}</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Narrative Side (5 cols) */}
        <div className="lg:col-span-5 space-y-4 order-1 lg:order-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
              04 / 04 · {project.categoryEn}
            </span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tight leading-snug">
            {isRTL ? project.titleAr : project.titleEn}
          </h3>

          <p className="text-xs sm:text-sm font-mono text-amber-400">
            {isRTL ? project.taglineAr : project.taglineEn}
          </p>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            {isRTL ? project.descAr : project.descEn}
          </p>

          {/* Upcoming Status Alert */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs font-mono text-amber-300">
            <span className="font-bold block text-white mb-1">
              {isRTL ? "مشروع لمرحلة قادمة قيد التجهيز:" : "Upcoming Phase · In Progress:"}
            </span>
            <span>{isRTL ? project.contributionAr : project.contributionEn}</span>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onInspect}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] cursor-pointer active:scale-98"
            >
              <Eye size={14} />
              <span>{isRTL ? "استكشاف تفاصيل المشروع" : "Explore Project"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

// =============================================================================
// CHAPTER II — INDEPENDENT 3D CARD COMPONENT
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
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useInteractive3DTilt(10)

  return (
    <div
      id={`project-${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-[1000px] cursor-pointer scroll-mt-28"
      onClick={onInspect}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-3xl border border-white/10 bg-[#0e111a] hover:border-emerald-500/40 transition-all duration-300 p-5 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] group"
      >
        <div className="space-y-3">
          {/* Top row: Number & Badge */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold tracking-wider">// {project.number}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-[10px]">
              {isRTL ? project.badgeAr : project.badgeEn}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-lg font-bold font-mono text-white group-hover:text-emerald-400 transition-colors leading-snug">
            {isRTL ? project.titleAr : project.titleEn}
          </h4>

          {/* Description */}
          <p className="text-xs text-neutral-400 font-light line-clamp-2 leading-relaxed">
            {isRTL ? project.descAr : project.descEn}
          </p>

          {/* Preview Image */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 my-2">
            <img
              src={project.image}
              alt={project.titleEn}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Tech Stack & Action */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((t) => (
              <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-300">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>{isRTL ? "استعراض المشروع" : "Explore Project"}</span>
              <ArrowUpRight size={13} />
            </span>
            {project.live && (
              <span className="text-[10px] font-mono text-neutral-400">
                {new URL(project.live).hostname}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
