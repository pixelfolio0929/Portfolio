"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type Language = "en" | "ar"

interface LanguageContextType {
  lang: Language
  dir: "ltr" | "rtl"
  isRTL: boolean
  setLang: (lang: Language) => void
  toggleLang: () => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.about": "Profile",
    "nav.capabilities": "Capabilities",
    "nav.projects": "Work",
    "nav.gov": "Gov UI",
    "nav.designSystems": "Design Systems",
    "nav.howIWork": "Process",
    "nav.experience": "Experience",
    "nav.skills": "Stack",
    "nav.contact": "Contact",
    "nav.hire": "Hire Me",

    // Hero
    "hero.available": "Open for UI Engineer, UI Developer & Frontend Roles in Riyadh",
    "hero.greeting": "Mohammad Sinan",
    "hero.name": "UI Engineer",
    "hero.title": "UI Engineer · Frontend Developer",
    "hero.subtitle": "UI Developer · Design Systems · Design-to-Code · Arabic/RTL · Government Platforms",
    "hero.desc": "Designing and building modern digital experiences across UI engineering, frontend development, design systems and Arabic-first interfaces.",
    "hero.location": "Riyadh, Saudi Arabia",
    "hero.pipelineHeader": "CORE FOCUS",
    "hero.activeWorkflow": "ACTIVE IN RIYADH",
    "hero.viewWork": "View Work",
    "hero.downloadResume": "Download Resume",
    "hero.contactMe": "Contact Me",
    "hero.scrollExplore": "Scroll To Explore",

    // Profile / About
    "about.badge": "Profile / Introduction",
    "about.title": "Bridging Visual Design & Frontend Engineering",
    "about.bio": "I bridge the gap between visual design and frontend engineering, turning design concepts and reusable systems into responsive, production-ready interfaces. With active experience as a UI Engineer and UI Developer across frontend development, UI/UX, design systems, design-to-code translation, Arabic RTL layouts, and Saudi digital government experiences, I focus on building interfaces that are visually refined, structurally robust, and accessible to everyone.",
    "about.stat1Value": "SBA · Gov Platforms",
    "about.stat1Label": "Current Role",
    "about.stat1Desc": "UI Engineer / UI Developer at SBA",
    "about.stat2Value": "Pixel-Precision",
    "about.stat2Label": "Design-to-Code",
    "about.stat2Desc": "Figma tokens to production-ready React & Vue",
    "about.stat3Value": "DGA Aligned",
    "about.stat3Label": "Standards",
    "about.stat3Desc": "Saudi Government digital design principles & RTL",
    "about.seeWork": "Explore Work",
    "about.getInTouch": "Get In Touch",

    // Focus / Capabilities
    "cap.badge": "Focus & Capabilities",
    "cap.title": "Core Capabilities",
    "cap.desc": "Specialized expertise across interface engineering, modern frontend development, design systems, and user experience.",
    "cap.c1Title": "UI Engineering / UI Development",
    "cap.c1Desc": "Turning designs and interface systems into responsive, reusable frontend interfaces with high fidelity and zero layout regressions.",
    "cap.c2Title": "Frontend Development",
    "cap.c2Desc": "Building modern web interfaces with HTML, CSS, JavaScript, and modern component frameworks like React and Vue.",
    "cap.c3Title": "Design Systems",
    "cap.c3Desc": "Working with reusable components, visual consistency, spacing, typography, and responsive patterns aligned with modern design tokens.",
    "cap.c4Title": "UI/UX Design",
    "cap.c4Desc": "Designing clear interfaces and translating user requirements into usable, accessible, and engaging digital experiences.",

    // Selected Work
    "projects.badge": "Selected Work",
    "projects.title": "Featured Projects",
    "projects.desc": "Selected independent projects and client work demonstrating UI engineering, RTL implementation, and frontend development.",
    "projects.filterAll": "All",
    "projects.openLive": "Live Demo",
    "projects.viewCode": "Source Code",
    "projects.roleLabel": "Role",
    "projects.techLabel": "Stack",

    // SBA / Government Experience
    "gov.badge": "Government Digital Experience",
    "gov.title": "Saudi Government Platforms & DGA Standards",
    "gov.desc": "Contributing to UI engineering and digital experiences for Saudi government platforms, with a focus on responsive interfaces, Arabic-first UX, RTL layouts, reusable UI components, and Saudi digital design standards.",
    "gov.roleCompany": "Saudi Broadcasting Authority (SBA)",
    "gov.roleTitle": "UI Developer",
    "gov.rolePeriod": "Riyadh, Saudi Arabia · 2026 — Present",
    "gov.cap1Title": "DGA-aligned Design Systems",
    "gov.cap1Desc": "Working with Saudi digital design standards, typography rules, spacing hierarchies, and reusable interface patterns.",
    "gov.cap2Title": "Arabic & RTL Experiences",
    "gov.cap2Desc": "Designing and implementing authentic Arabic-first interfaces, bidirectional layouts, and optical typography balance.",
    "gov.cap3Title": "Responsive Multi-Screen UI",
    "gov.cap3Desc": "Creating interfaces that adapt seamlessly across desktop, tablet, and mobile viewports.",
    "gov.cap4Title": "Design → Code Implementation",
    "gov.cap4Desc": "Translating Figma designs and UI concepts into clean, maintainable, and production-ready frontend code.",
    "gov.cap5Title": "Accessibility & Usability",
    "gov.cap5Desc": "Considering readable typography, interaction states, semantic HTML structure, and accessible user flows.",

    // Design Systems
    "ds.badge": "Design Systems",
    "ds.title": "Design → System → Components → Code",
    "ds.desc": "Understanding reusable UI systems from foundational tokens to production components, ensuring consistency across complex interfaces.",

    // How I Work
    "work.badge": "Approach & Process",
    "work.title": "How I Work",
    "work.desc": "A structured 5-step workflow bridging discovery, interface design, systematic component architecture, and production delivery.",
    "work.step1Num": "01",
    "work.step1Title": "Understand",
    "work.step1Desc": "Requirements, users, content, accessibility requirements, and technical constraints.",
    "work.step2Num": "02",
    "work.step2Title": "Design",
    "work.step2Desc": "Create layouts, visual hierarchies, and clear interface concepts in Figma.",
    "work.step3Num": "03",
    "work.step3Title": "Systemize",
    "work.step3Desc": "Create reusable components, spacing scales, typography rules, and responsive patterns.",
    "work.step4Num": "04",
    "work.step4Title": "Develop",
    "work.step4Desc": "Translate designs into clean, semantic, and performant frontend code.",
    "work.step5Num": "05",
    "work.step5Title": "Refine",
    "work.step5Desc": "Check responsiveness, RTL behavior, accessibility, consistency, and performance.",
    "work.philosophy": "Professional Philosophy",
    "work.statement1": "I DESIGN WITH SYSTEMS.",
    "work.statement2": "I ENGINEER RESPONSIVE EXPERIENCES.",
    "work.statement3": "I BUILD FOR PRODUCTION.",
    "work.ctaTitle": "Open for UI Engineer & Frontend roles",
    "work.ctaDesc": "Available for UI Engineer, UI Developer, Frontend Developer & Design Systems opportunities in Riyadh and hybrid/remote setups.",
    "work.startConv": "Get In Touch",

    // Experience
    "exp.badge": "Work Experience",
    "exp.title": "Professional Experience",
    "exp.desc": "My career progression across UI engineering, UI development, frontend development, and visual interface design.",

    // Skills
    "skills.badge": "Skills & Technologies",
    "skills.title": "Technical Stack",
    "skills.desc": "Categorized tools, frameworks, and design capabilities I utilize across production projects.",
    "skills.catFrontend": "Frontend Development",
    "skills.catDesign": "UI & Design",
    "skills.catBackend": "Backend & Supporting",
    "skills.catLearning": "Currently Learning",
    "skills.learningNote": "Actively learning Angular for SBA UI engineering work. Will be added to the core production stack upon deployment.",

    // AI Workflow
    "ai.badge": "AI-Assisted Workflow",
    "ai.title": "AI-Assisted Development",
    "ai.desc": "I use modern AI tools to accelerate exploration, prototyping, debugging and development while maintaining control over architecture, UI quality and final implementation.",

    // Contact
    "contact.badge": "Contact & Connect",
    "contact.title": "Let's Connect",
    "contact.desc": "Open for UI Engineer, UI Developer, Frontend Developer, and Design System opportunities in Riyadh. Let's talk.",
    "contact.nameLabel": "Your Name",
    "contact.namePlaceholder": "Enter your name",
    "contact.emailLabel": "Email Address",
    "contact.emailPlaceholder": "name@example.com",
    "contact.subjectLabel": "Subject",
    "contact.subjectPlaceholder": "UI Engineer / UI Developer Opportunity",
    "contact.messageLabel": "Message",
    "contact.messagePlaceholder": "Tell me about your project, team, or role requirements...",
    "contact.sendBtn": "Send Message",
    "contact.transmitting": "Sending...",
    "contact.success": "Thank you! Your message has been sent successfully.",

    // 404 Not Found Page
    "notFound.badge": "HTTP 404 • ROUTE NOT FOUND",
    "notFound.title": "Lost in the Interface Tree?",
    "notFound.desc": "The route you attempted to visit does not exist or has been refactored. Let's guide you back to the portfolio.",
    "notFound.attemptedPath": "Attempted URL Path:",
    "notFound.status": "STATUS: 404_PAGE_NOT_FOUND",
    "notFound.suggestion": "The requested interface component could not be resolved in the application router.",
    "notFound.backHome": "Back to Home",
    "notFound.goBack": "Go Back",
    "notFound.contact": "Contact Sinan",
    "notFound.quickNavTitle": "Quick Navigation",
    "notFound.quickNavDesc": "Jump directly to key sections of the portfolio",
    "notFound.filterPlaceholder": "Quick jump (e.g. projects, gov, design system, contact)...",
    "notFound.allSections": "All Sections",
    "notFound.copyUrl": "Copy Path",
    "notFound.copied": "Copied!",
  },
  ar: {
    // Navigation
    "nav.about": "الملف",
    "nav.capabilities": "القدرات",
    "nav.projects": "الأعمال",
    "nav.gov": "الواجهات الحكومية",
    "nav.designSystems": "أنظمة التصميم",
    "nav.howIWork": "المنهجية",
    "nav.experience": "الخبرات",
    "nav.skills": "الحزمة",
    "nav.contact": "تواصل",
    "nav.hire": "تواصل معي",

    // Hero
    "hero.available": "متاح لوظائف مهندس واجهات، مطور واجهات مستخدم، وتطوير الواجهات في الرياض",
    "hero.greeting": "محمد سنان",
    "hero.name": "مهندس واجهات مستخدم",
    "hero.title": "مهندس واجهات مستخدم · مطور واجهات أمامية",
    "hero.subtitle": "مطور واجهات UI · أنظمة التصميم · من التصميم إلى الكود · دعم العربية RTL · منصات حكومية",
    "hero.desc": "تصميم وبناء تجارب رقمية حديثة عبر هندسة واجهات المستخدم، وتطوير الواجهات الأمامية، وأنظمة التصميم، والواجهات الداعمة للغة العربية.",
    "hero.location": "الرياض، المملكة العربية السعودية",
    "hero.pipelineHeader": "مجال التركيز الأساسي",
    "hero.activeWorkflow": "نشط في الرياض",
    "hero.viewWork": "استعراض الأعمال",
    "hero.downloadResume": "تحميل السيرة الذاتية",
    "hero.contactMe": "تواصل معي",
    "hero.scrollExplore": "مرر للاستكشاف",

    // Profile / About
    "about.badge": "الملف التعريفي والنبذة",
    "about.title": "سد الفجوة بين التصميم البصري وهندسة الواجهات",
    "about.bio": "أعمل على سد الفجوة بين التصميم البصري وهندسة الواجهات الأمامية، وتحويل مفاهيم التصميم والأنظمة القابلة لإعادة الاستخدام إلى واجهات متجاوبة جاهزة للإنتاج. بخبرة عملية كمهندس ومطور واجهات مستخدم (UI Engineer / UI Developer) في تطوير الواجهات الأمامية، وتصميم UI/UX، وأنظمة التصميم، والترجمة المباشرة من التصميم إلى الكود، ودعم الاتجاه العربي RTL، والتجارب الرقمية الحكومية في المملكة العربية السعودية.",
    "about.stat1Value": "هيئة الإذاعة والتلفزيون",
    "about.stat1Label": "الدور الحالي",
    "about.stat1Desc": "مهندس ومطور واجهات مستخدم في SBA",
    "about.stat2Value": "دقة البكسل",
    "about.stat2Label": "من التصميم للكود",
    "about.stat2Desc": "تحويل متغيرات Figma إلى واجهات React و Vue جاهزة للإنتاج",
    "about.stat3Value": "معايير DGA",
    "about.stat3Label": "المعايير المعتمدة",
    "about.stat3Desc": "الالتزام بمبادئ التصميم الرقمي الحكومي واللغة العربية",
    "about.seeWork": "استعراض الأعمال",
    "about.getInTouch": "تواصل معي",

    // Focus / Capabilities
    "cap.badge": "التركيز والقدرات",
    "cap.title": "القدرات الأساسية",
    "cap.desc": "خبرات متخصصة في هندسة الواجهات، وتطوير الواجهات الأمامية الحديثة، وأنظمة التصميم، وتجربة المستخدم.",
    "cap.c1Title": "هندسة وتطوير واجهات المستخدم (UI Engineer / Developer)",
    "cap.c1Desc": "تحويل التصاميم وأنظمة الواجهات إلى واجهات أمامية متجاوبة وقابلة لإعادة الاستخدام بدقة متناهية وبدون أخطاء تخطيط.",
    "cap.c2Title": "تطوير الواجهات الأمامية (Frontend Development)",
    "cap.c2Desc": "بناء واجهات ويب عصرية باستخدام HTML و CSS و JavaScript وأطر عمل حديثة مثل React و Vue.",
    "cap.c3Title": "أنظمة التصميم (Design Systems)",
    "cap.c3Desc": "التعامل مع المكونات القابلة لإعادة الاستخدام، والاتساق البصري، والتباعد، والخطوط، والأنماط المتجاوبة مع متغيرات التصميم.",
    "cap.c4Title": "تصميم واجهات وتجربة المستخدم (UI/UX Design)",
    "cap.c4Desc": "تصميم واجهات واضحة وترجمة متطلبات المستخدمين إلى تجارب رقمية عملية وسهلة الاستخدام.",

    // Selected Work
    "projects.badge": "الأعمال المختارة",
    "projects.title": "المشاريع المميزة",
    "projects.desc": "مجموعة مختارة من المشاريع المستقلة وأعمال العملاء التي توضح هندسة الواجهات، ودعم RTL، وتطوير الواجهات الأمامية.",
    "projects.filterAll": "الكل",
    "projects.openLive": "معاينة حية",
    "projects.viewCode": "الكود البرمجي",
    "projects.roleLabel": "الدور",
    "projects.techLabel": "التقنيات",

    // SBA / Government Experience
    "gov.badge": "التجارب الرقمية الحكومية",
    "gov.title": "المنصات الحكومية السعودية ومعايير DGA",
    "gov.desc": "المساهمة في هندسة واجهات المستخدم والتجارب الرقمية للمنصات الحكومية السعودية، مع التركيز على الواجهات المتجاوبة، وتجربة المستخدم الموجهة للعربية، وتخطيطات RTL، والمكونات القابلة لإعادة الاستخدام، ومعايير التصميم الرقمي السعودية.",
    "gov.roleCompany": "هيئة الإذاعة والتلفزيون (SBA)",
    "gov.roleTitle": "مطوّر واجهات مستخدم (UI Developer)",
    "gov.rolePeriod": "الرياض، المملكة العربية السعودية · 2026 — حتى الآن",
    "gov.cap1Title": "أنظمة تصميم متوافقة مع معايير DGA",
    "gov.cap1Desc": "العمل وفق معايير التصميم الرقمي الحكومي السعودي، وقواعد الخطوط، والتباعد، والأنماط القابلة لإعادة الاستخدام.",
    "gov.cap2Title": "تجارب اللغة العربية و RTL",
    "gov.cap2Desc": "تصميم وتنفيذ واجهات عربية أصيلة، وتخطيطات ثنائية الاتجاه، وضبط التوازن البصري للخطوط.",
    "gov.cap3Title": "واجهات متجاوبة لجميع الشاشات",
    "gov.cap3Desc": "إنشاء واجهات تتكيف بسلاسة تامة عبر شاشات الحواسيب المكتبية والأجهزة اللوحية والهواتف الذكية.",
    "gov.cap4Title": "من التصميم إلى الكود (Design → Code)",
    "gov.cap4Desc": "ترجمة تصاميم Figma ومفاهيم الواجهات إلى كود برمجي نظيف وقابل للصيانة وجاهز للإنتاج.",
    "gov.cap5Title": "سهولة الوصول وقابلية الاستخدام",
    "gov.cap5Desc": "مراعاة الخطوط المقروءة، وحالات التفاعل المختلفة، والهيكل الدلالي HTML، وتدفقات الاستخدام السلسة.",

    // Design Systems
    "ds.badge": "أنظمة التصميم",
    "ds.title": "التصميم ← النظام ← المكونات ← الكود",
    "ds.desc": "فهم أنظمة واجهات المستخدم القابلة لإعادة الاستخدام من المتغيرات الأساسية إلى مكونات الإنتاج لضمان الاتساق عبر المنصات المعقدة.",

    // How I Work
    "work.badge": "المنهجية ومسار العمل",
    "work.title": "كيف أعمل",
    "work.desc": "مسار عمل منظم من 5 خطوات يربط بين الفهم، والتصميم، وهيكلة المكونات، والتطوير، والتحسين النهائي.",
    "work.step1Num": "01",
    "work.step1Title": "الفهم (Understand)",
    "work.step1Desc": "المتطلبات، المستخدمون، المحتوى، معايير سهولة الوصول، والقيود التقنية.",
    "work.step2Num": "02",
    "work.step2Title": "التصميم (Design)",
    "work.step2Desc": "إنشاء التخطيطات، والتسلسل الهرمي البصري، ومفاهيم الواجهات في Figma.",
    "work.step3Num": "03",
    "work.step3Title": "النظام (Systemize)",
    "work.step3Desc": "إنشاء المكونات القابلة لإعادة الاستخدام، وقواعد التباعد، والخطوط، والأنماط المتجاوبة.",
    "work.step4Num": "04",
    "work.step4Title": "التطوير (Develop)",
    "work.step4Desc": "ترجمة التصاميم إلى كود واجهات أمامية نظيف وفعال ودلالي.",
    "work.step5Num": "05",
    "work.step5Title": "التحسين (Refine)",
    "work.step5Desc": "فحص التجاوب عبر الشاشات، وسلوك RTL، وسهولة الوصول، والاتساق، والأداء.",
    "work.philosophy": "الفلسفة المهنية",
    "work.statement1": "أصمم وفق أنظمة متكاملة.",
    "work.statement2": "أهندس تجارب متجاوبة وسلسة.",
    "work.statement3": "أبني لبيئات الإنتاج الحقيقية.",
    "work.ctaTitle": "متاح للفرص والأدوار المهنية ذات الصلة",
    "work.ctaDesc": "متاح لفرص مهندس واجهات مستخدم (UI Engineer)، ومطور واجهات (UI Developer)، وتطوير الواجهات الأمامية، وأنظمة التصميم في الرياض.",
    "work.startConv": "تواصل معي",

    // Experience
    "exp.badge": "الخبرات العملية",
    "exp.title": "المسار المهني",
    "exp.desc": "تسلسل خبراتي المهنية في هندسة واجهات المستخدم، وتطوير واجهات UI، وتطوير الواجهات الأمامية وتصميم الواجهات.",

    // Skills
    "skills.badge": "المهارات والتقنيات",
    "skills.title": "الحزمة البرمجية والتقنية",
    "skills.desc": "الأدوات وأطر العمل وقدرات التصميم المصنفة بدقة والتي أعتمد عليها في المشاريع الحقيقية.",
    "skills.catFrontend": "تطوير الواجهات الأمامية",
    "skills.catDesign": "تصميم الواجهات والنظم",
    "skills.catBackend": "الخلفية البرمجية والأدوات المساندة",
    "skills.catLearning": "قيد التعلم حالياً",
    "skills.learningNote": "أتعلم Angular بنشاط لمتطلبات عملي في هندسة واجهات المستخدم في SBA، وستتم إضافتها إلى الحزمة الأساسية للإنتاج فور تدشينها.",

    // AI Workflow
    "ai.badge": "مسار العمل المدعوم بالذكاء الاصطناعي",
    "ai.title": "سير العمل بمساعدة الذكاء الاصطناعي",
    "ai.desc": "أستخدم أدوات الذكاء الاصطناعي الحديثة لتسريع الاستكشاف والنماذج الأولية والتنقيح والتطوير، مع الحفاظ على التحكم الكامل بالمعمارية وجودة الواجهات والتنفيذ النهائي.",

    // Contact
    "contact.badge": "التواصل والربط المهني",
    "contact.title": "تواصل معي",
    "contact.desc": "متاح لفرص هندسة واجهات المستخدم، وتطوير واجهات UI، وتطوير الواجهات الأمامية في الرياض. يسعدني تواصلك المباشر.",
    "contact.nameLabel": "الاسم الكريم",
    "contact.namePlaceholder": "أدخل اسمك الكريم",
    "contact.emailLabel": "البريد الإلكتروني",
    "contact.emailPlaceholder": "name@example.com",
    "contact.subjectLabel": "الموضوع",
    "contact.subjectPlaceholder": "فرصة UI Engineer / UI Developer",
    "contact.messageLabel": "الرسالة",
    "contact.messagePlaceholder": "أخبرني عن تفاصيل المشروع أو متطلبات الدور الوظيفي...",
    "contact.sendBtn": "إرسال الرسالة",
    "contact.transmitting": "جاري الإرسال...",
    "contact.success": "شكراً لك! تم استلام رسالتك بنجاح وسأتواصل معك قريباً.",

    // 404 Not Found Page
    "notFound.badge": "خطأ 404 • المسار غير موجود",
    "notFound.title": "يبدو أنك وصلت إلى مسار غير متوفر",
    "notFound.desc": "الصفحة أو الرابط الذي تبحث عنه غير موجود أو تم نقله. يمكنك العودة بسهولة لاستكشاف أعمالي والملف المهني.",
    "notFound.attemptedPath": "المسار المطلوب:",
    "notFound.status": "الحالة: 404_PAGE_NOT_FOUND",
    "notFound.suggestion": "تعذر العثور على المكون البرمجي للمسار المطلوب في شجرة التوجيه.",
    "notFound.backHome": "العودة للرئيسية",
    "notFound.goBack": "الصفحة السابقة",
    "notFound.contact": "تواصل مع سنان",
    "notFound.quickNavTitle": "وجهات وأقسام مقترحة",
    "notFound.quickNavDesc": "انتقل مباشرة إلى الأقسام الرئيسية في ملف الأعمال",
    "notFound.filterPlaceholder": "انتقال سريع (مثل: الأعمال، الأنظمة الحكومية، نظام التصميم)...",
    "notFound.allSections": "جميع الأقسام",
    "notFound.copyUrl": "نسخ المسار",
    "notFound.copied": "تم النسخ!",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_lang") as Language
    if (saved === "en" || saved === "ar") {
      setLangState(saved)
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = saved
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem("portfolio_lang", newLang)
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = newLang
  }

  const toggleLang = () => {
    setLang(lang === "en" ? "ar" : "en")
  }

  const t = (key: string): string => {
    return translations[lang][key] || translations.en[key] || key
  }

  const dir = lang === "ar" ? "rtl" : "ltr"
  const isRTL = lang === "ar"

  return (
    <LanguageContext.Provider value={{ lang, dir, isRTL, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
