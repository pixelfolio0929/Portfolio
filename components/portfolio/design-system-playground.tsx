"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Section } from "./section"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import { 
  Palette, 
  Type, 
  MousePointerClick, 
  Square, 
  Layers, 
  Tag, 
  Sliders, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Globe,
  Loader2,
  Check,
  ArrowRight,
  ArrowLeft,
  Lock,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Code2,
  FileCode,
  Info
} from "lucide-react"
import { useLanguage } from "./language-context"

type Category = "buttons" | "cards" | "inputs" | "chips" | "tabs" | "alerts" | "colors" | "typography"
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive"
type ButtonState = "default" | "hover" | "focus" | "active" | "disabled" | "loading"
type ButtonSize = "sm" | "md" | "lg"
type InputState = "default" | "focus" | "error" | "disabled" | "success"
type CardVariant = "outline" | "elevated" | "filled" | "service"
type SubTab = "preview" | "code" | "api"

export function DesignSystemPlayground() {
  const { isRTL: globalIsRTL } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<Category>("buttons")
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("preview")
  
  // Local RTL/LTR preview override toggle
  const [previewDirection, setPreviewDirection] = useState<"auto" | "rtl" | "ltr">("auto")
  const isPreviewRTL = previewDirection === "auto" ? globalIsRTL : previewDirection === "rtl"

  // Interactive Button States
  const [btnVariant, setBtnVariant] = useState<ButtonVariant>("primary")
  const [btnState, setBtnState] = useState<ButtonState>("default")
  const [btnSize, setBtnSize] = useState<ButtonSize>("md")
  const [cooldown, setCooldown] = useState<boolean>(false)
  
  // Interactive Input States
  const [inputState, setInputState] = useState<InputState>("default")
  const [inputVal, setInputVal] = useState<string>("")
  
  // Interactive Card States
  const [cardVariant, setCardVariant] = useState<CardVariant>("service")
  
  // Tab State
  const [activeTab, setActiveTab] = useState<number>(0)

  const categories = [
    { id: "buttons", labelEn: "Buttons & States", labelAr: "الأزرار والحالات", icon: MousePointerClick, tag: "dga-button", comp: "DgaButton" },
    { id: "cards", labelEn: "Cards & Surfaces", labelAr: "البطاقات والأسطح", icon: Layers, tag: "dga-card", comp: "DgaCard" },
    { id: "inputs", labelEn: "Inputs & Forms", labelAr: "الحقول والنماذج", icon: Square, tag: "dga-input", comp: "DgaInput" },
    { id: "chips", labelEn: "Chips & Badges", labelAr: "الشارات والوسوم", icon: Tag, tag: "dga-badge", comp: "DgaBadge" },
    { id: "tabs", labelEn: "Tabs & Nav", labelAr: "التبويبات والتنقل", icon: Sliders, tag: "dga-tabs", comp: "DgaTabs" },
    { id: "alerts", labelEn: "Alerts & Feedback", labelAr: "التنبيهات والملاحظات", icon: AlertCircle, tag: "dga-alert", comp: "DgaAlert" },
    { id: "colors", labelEn: "Color Tokens", labelAr: "رموز الألوان", icon: Palette, tag: "tokens-color", comp: "DgaTokens" },
    { id: "typography", labelEn: "Typography Scale", labelAr: "سلم الخطوط والطباعة", icon: Type, tag: "tokens-type", comp: "DgaTypography" },
  ]

  const currentCategoryMeta = categories.find(c => c.id === activeCategory) || categories[0]

  const colorTokens = [
    { role: "Primary (DGA Green)", token: "--dga-color-primary", hex: "#074D31", rgb: "7, 77, 49", descEn: "Official government brand green", descAr: "اللون الأخضر الحكومي الرسمي" },
    { role: "Secondary (Gold/Amber)", token: "--dga-color-secondary", hex: "#C88A00", rgb: "200, 138, 0", descEn: "Accent gold & secondary actions", descAr: "اللون الذهبي الثانوي والإجراءات المساندة" },
    { role: "Background Canvas", token: "--dga-color-bg", hex: "#050816", rgb: "5, 8, 22", descEn: "Main interface dark backdrop", descAr: "خلفية الشاشة الأساسية" },
    { role: "Surface / Card", token: "--dga-color-surface", hex: "#0D1527", rgb: "13, 21, 39", descEn: "Elevated container surface", descAr: "أسطح البطاقات المرتفعة" },
    { role: "Text Foreground", token: "--dga-color-text", hex: "#F8FAFC", rgb: "248, 250, 252", descEn: "High-contrast primary typography", descAr: "لون النصوص الأساسي عالي التباين" },
    { role: "Border Subtle", token: "--dga-color-border", hex: "rgba(255,255,255,0.12)", rgb: "255, 255, 255 (12%)", descEn: "Subtle structural boundaries", descAr: "حدود العناصر الهيكلية" },
    { role: "Success", token: "--dga-color-success", hex: "#10B981", rgb: "16, 185, 129", descEn: "Affirmative state indicator", descAr: "مؤشر حالات النجاح" },
    { role: "Warning", token: "--dga-color-warning", hex: "#F59E0B", rgb: "245, 158, 11", descEn: "Cautionary notification", descAr: "تنبيهات الحذر والإشعار" },
    { role: "Error / Danger", token: "--dga-color-error", hex: "#DC2626", rgb: "220, 38, 38", descEn: "Destructive & validation error", descAr: "حالات الخطأ والعمليات الحرجة" },
  ]

  const typographyScales = [
    {
      level: "Display 2XL",
      specs: "3.5rem (56px) · 800 Bold · Line-height: 1.1",
      sampleEn: "Digital Government Authority",
      sampleAr: "هيئة الحكومة الرقمية",
    },
    {
      level: "Heading XL",
      specs: "2rem (32px) · 700 Bold · Line-height: 1.25",
      sampleEn: "Design Systems & Reusable Patterns",
      sampleAr: "أنظمة التصميم والأنماط القابلة لإعادة الاستخدام",
    },
    {
      level: "Body Regular",
      specs: "1rem (16px) · 400 Regular · Line-height: 1.7",
      sampleEn: "Unified user experience guidelines engineered for accessibility, consistency, and performance.",
      sampleAr: "إرشادات تجربة مستخدم موحدة مصممة لسهولة الوصول والاتساق والأداء العالي.",
    },
    {
      level: "Caption / Token",
      specs: "0.75rem (12px) · 500 Medium · Line-height: 1.4",
      sampleEn: "WCAG 2.1 AA Compliant · Logical Properties · Vazirmatn",
      sampleAr: "متوافق مع معايير WCAG 2.1 AA · خصائص CSS المنطقية · خط وزير متن (Vazirmatn)",
    },
  ]

  // Button Class Builder
  const getButtonClasses = (variant: ButtonVariant = btnVariant, state: ButtonState = btnState, size: ButtonSize = btnSize) => {
    let sizeClasses = "h-10 px-5 text-xs"
    if (size === "sm") sizeClasses = "h-8 px-3.5 text-[11px]"
    if (size === "lg") sizeClasses = "h-12 px-7 text-sm"

    let base = `${sizeClasses} rounded-xl font-medium tracking-wide transition-all duration-200 inline-flex items-center justify-center gap-2 select-none cursor-pointer outline-none `
    
    if (variant === "primary") {
      base += "bg-[#074D31] text-white shadow-sm hover:bg-[#095E3C] "
      if (state === "hover") base += "bg-[#095E3C] shadow-md scale-[1.02] "
      if (state === "focus") base += "ring-2 ring-[#074D31] ring-offset-2 ring-offset-[#050816] "
      if (state === "active") base += "bg-[#053723] scale-[0.98] "
    } else if (variant === "secondary") {
      base += "bg-[#C88A00] text-white shadow-sm hover:bg-[#DC9B00] "
      if (state === "hover") base += "bg-[#DC9B00] shadow-md scale-[1.02] "
      if (state === "focus") base += "ring-2 ring-[#C88A00] ring-offset-2 ring-offset-[#050816] "
      if (state === "active") base += "bg-[#AA7500] scale-[0.98] "
    } else if (variant === "outline") {
      base += "border-2 border-[#074D31] text-[#10B981] bg-transparent hover:bg-[#074D31]/15 "
      if (state === "hover") base += "bg-[#074D31]/20 border-[#10B981] scale-[1.02] "
      if (state === "focus") base += "ring-2 ring-[#074D31] ring-offset-2 ring-offset-[#050816] "
      if (state === "active") base += "bg-[#074D31]/30 scale-[0.98] "
    } else if (variant === "ghost") {
      base += "text-[#10B981] hover:bg-[#074D31]/15 bg-transparent "
      if (state === "hover") base += "bg-[#074D31]/20 scale-[1.02] "
      if (state === "focus") base += "ring-2 ring-[#074D31]/50 ring-offset-2 ring-offset-[#050816] "
      if (state === "active") base += "bg-[#074D31]/30 scale-[0.98] "
    } else if (variant === "destructive") {
      base += "bg-[#DC2626] text-white shadow-sm hover:bg-[#EF4444] "
      if (state === "hover") base += "bg-[#EF4444] shadow-md scale-[1.02] "
      if (state === "focus") base += "ring-2 ring-[#DC2626] ring-offset-2 ring-offset-[#050816] "
      if (state === "active") base += "bg-[#B91C1C] scale-[0.98] "
    }

    if (state === "disabled") {
      base += "opacity-40 pointer-events-none cursor-not-allowed filter grayscale-[30%] "
    }

    return base
  }

  // Input Class Builder
  const getInputClasses = () => {
    let base = "w-full h-11 rounded-xl bg-background border text-xs text-foreground transition-all duration-200 px-3.5 outline-none "
    
    if (inputState === "default") {
      base += "border-border hover:border-border/90 focus:border-[#074D31] focus:ring-1 focus:ring-[#074D31] "
    } else if (inputState === "focus") {
      base += "border-[#10B981] ring-2 ring-[#074D31]/60 "
    } else if (inputState === "error") {
      base += "border-red-500 ring-1 ring-red-500/50 bg-red-500/[0.03] "
    } else if (inputState === "success") {
      base += "border-emerald-500 ring-1 ring-emerald-500/50 bg-emerald-500/[0.03] "
    } else if (inputState === "disabled") {
      base += "border-border/60 opacity-40 bg-muted/30 pointer-events-none cursor-not-allowed "
    }

    return base
  }

  const handleCooldownClick = () => {
    if (cooldown) return
    setCooldown(true)
    setTimeout(() => setCooldown(false), 2000)
  }

  return (
    <Section id="design-systems" className="relative overflow-hidden py-20 sm:py-28 bg-background border-t border-border/60">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_30%,rgba(7,77,49,0.12),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#074D31]/40 bg-[#074D31]/15 px-3.5 py-1.5 text-xs font-mono font-medium text-[#10B981] mb-3"
          >
            <ShieldCheck size={14} />
            <span>{isPreviewRTL ? "أنماط واجهات متوافقة مع DGA" : "DGA-Aligned UI Patterns"}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground"
          >
            {isPreviewRTL ? "أنظمة التصميم والأنماط القابلة لإعادة الاستخدام" : "Design Systems & Reusable Patterns"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-muted-foreground font-light leading-relaxed text-balance"
          >
            {isPreviewRTL
              ? "استكشاف أنماط واجهات المستخدم القابلة لإعادة الاستخدام، ورموز التصميم، والواجهات المتجاوبة المستوحاة من ممارسات التصميم الرقمي الحكومي السعودي."
              : "Exploring reusable UI patterns, design tokens and responsive interfaces inspired by Saudi government digital design practices."}
          </motion.p>
        </div>

        {/* Playground Toolbar: Category Pills + RTL/LTR Direction Demonstrator */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 p-3 rounded-2xl glass-panel border border-border/80">
          
          {/* Category Navigation Pills */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 overflow-x-auto justify-center md:justify-start w-full md:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id as Category)
                    setActiveSubTab("preview")
                  }}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-medium transition-all flex items-center gap-1.5 border cursor-pointer ${
                    isActive
                      ? "bg-[#074D31] text-white border-[#074D31] shadow-xs font-bold"
                      : "bg-card/70 border-border/70 text-muted-foreground hover:text-foreground hover:bg-card"
                  }`}
                >
                  <Icon size={12} />
                  <span>{isPreviewRTL ? cat.labelAr : cat.labelEn}</span>
                </button>
              )
            })}
          </div>

          {/* Compact RTL / LTR Toggle */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <span className="text-[10px] font-mono text-muted-foreground uppercase flex items-center gap-1">
              <Globe size={11} className="text-[#10B981]" />
              <span>{isPreviewRTL ? "الاتجاه:" : "Direction:"}</span>
            </span>
            <div className="inline-flex p-0.5 rounded-lg bg-muted/60 border border-border">
              <button
                onClick={() => setPreviewDirection("ltr")}
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  !isPreviewRTL ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                LTR
              </button>
              <button
                onClick={() => setPreviewDirection("rtl")}
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  isPreviewRTL ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RTL (عربي)
              </button>
            </div>
          </div>

        </div>

        {/* Documentation / Component Header Card (Matches DGA Reference Image Style) */}
        <div className="rounded-t-3xl border border-b-0 border-border/90 bg-card/60 px-6 pt-5 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              {isPreviewRTL ? currentCategoryMeta.labelAr : currentCategoryMeta.labelEn.split(" ")[0]}
            </h3>
            <span className="px-2.5 py-0.5 rounded-md border border-blue-500/40 bg-blue-500/10 text-blue-400 text-xs font-mono font-medium">
              {currentCategoryMeta.tag}
            </span>
            <span className="px-2.5 py-0.5 rounded-md border border-border bg-muted/40 text-muted-foreground text-xs font-mono">
              {currentCategoryMeta.comp}
            </span>
          </div>

          {/* DGA Style Preview / Code / API Tabs */}
          <div className="inline-flex p-0.5 rounded-lg bg-muted/50 border border-border self-end sm:self-auto">
            {(["preview", "code", "api"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all cursor-pointer ${
                  activeSubTab === tab
                    ? "bg-[#074D31] text-white font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Showcase Box with Direction Support */}
        <div 
          dir={isPreviewRTL ? "rtl" : "ltr"}
          className={`rounded-b-3xl border border-border/90 glass-panel shadow-xl p-6 sm:p-8 min-h-[380px] flex items-center justify-center bg-card/30 backdrop-blur-xl ${
            isPreviewRTL ? "font-arabic" : "font-sans"
          }`}
        >
          {activeSubTab === "code" ? (
            <div className="w-full max-w-md text-center p-8 rounded-2xl bg-card/60 border border-border/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#074D31]/15 text-[#10B981] flex items-center justify-center mx-auto border border-[#074D31]/30">
                <Code2 size={24} />
              </div>
              <div>
                <h4 className="text-base font-bold text-foreground">
                  {isPreviewRTL ? "الكود البرمجي — قريباً" : "Code Snippets — Coming Soon"}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 font-light">
                  {isPreviewRTL 
                    ? "يجري حالياً توثيق نماذج React و TypeScript وأنماط الاستخدام لتوفيرها برمجياً." 
                    : "Reusable React & TypeScript component implementations and integration patterns are being documented."}
                </p>
              </div>
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-[#074D31]/20 text-[#10B981] border border-[#074D31]/40">
                {isPreviewRTL ? "قيد التجهيز" : "In Development"}
              </span>
            </div>
          ) : activeSubTab === "api" ? (
            <div className="w-full max-w-md text-center p-8 rounded-2xl bg-card/60 border border-border/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30">
                <FileCode size={24} />
              </div>
              <div>
                <h4 className="text-base font-bold text-foreground">
                  {isPreviewRTL ? "المواصفات والواجهات البرمجية — قريباً" : "API & Props Specs — Coming Soon"}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 font-light">
                  {isPreviewRTL 
                    ? "توثيق خصائص المكونات (Props) ومعايير إمكانية الوصول ARIA قيد الإعداد." 
                    : "Comprehensive props definitions, types, and ARIA accessibility specifications are being finalized."}
                </p>
              </div>
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-blue-500/20 text-blue-400 border border-blue-500/40">
                {isPreviewRTL ? "قيد التجهيز" : "In Development"}
              </span>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              
              {/* 1. BUTTONS & STATES SHOWCASE */}
              {activeCategory === "buttons" && (
                <motion.div
                  key="buttons"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full max-w-3xl space-y-6 text-center"
                >
                  {/* Top DGA Style Quick Button Bar (As shown in Reference Image 1) */}
                  <div className="p-4 rounded-2xl bg-card/60 border border-border/70 flex flex-wrap items-center justify-center gap-2.5 shadow-sm">
                    <button className={getButtonClasses("primary", "default", "md")}>Primary</button>
                    <button className={getButtonClasses("secondary", "default", "md")}>Secondary</button>
                    <button className={getButtonClasses("outline", "default", "md")}>Outline</button>
                    <button className={getButtonClasses("ghost", "default", "md")}>Ghost</button>
                    <button className={getButtonClasses("destructive", "default", "md")}>Danger</button>
                    <button className={getButtonClasses("primary", "default", "sm")}>Small</button>
                    <button className={getButtonClasses("primary", "default", "lg")}>Large</button>
                    <button className={getButtonClasses("primary", "disabled", "md")} disabled>Disabled</button>
                    <button 
                      onClick={handleCooldownClick}
                      className={getButtonClasses("primary", cooldown ? "loading" : "default", "md")}
                    >
                      {cooldown ? <Loader2 size={13} className="animate-spin" /> : null}
                      <span>{cooldown ? "Submitting..." : "Submit (2s cooldown)"}</span>
                    </button>
                  </div>

                  {/* Interactive State & Variant Controls */}
                  <div className="space-y-2.5 p-4 rounded-2xl bg-card/40 border border-border/60 text-xs text-start">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-muted-foreground uppercase">
                        {isPreviewRTL ? "الحالة (State):" : "Active State:"}
                      </span>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {(["default", "hover", "focus", "active", "loading", "disabled"] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => setBtnState(st)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono capitalize transition-all cursor-pointer ${
                              btnState === st ? "bg-[#074D31] text-white font-bold shadow-xs" : "bg-muted/60 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-border/50">
                      <span className="text-[11px] font-mono text-muted-foreground uppercase">
                        {isPreviewRTL ? "المتغير (Variant):" : "Button Variant:"}
                      </span>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {(["primary", "secondary", "outline", "ghost", "destructive"] as const).map((v) => (
                          <button
                            key={v}
                            onClick={() => setBtnVariant(v)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono capitalize transition-all cursor-pointer ${
                              btnVariant === v ? "bg-foreground text-background font-bold" : "bg-muted/60 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-border/50">
                      <span className="text-[11px] font-mono text-muted-foreground uppercase">
                        {isPreviewRTL ? "الحجم (Size):" : "Size Token:"}
                      </span>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {(["sm", "md", "lg"] as const).map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setBtnSize(sz)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase transition-all cursor-pointer ${
                              btnSize === sz ? "bg-[#074D31] text-white font-bold" : "bg-muted/60 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Live Playground Canvas */}
                  <div className="p-6 rounded-2xl bg-background/80 border border-border/70 flex flex-col items-center justify-center gap-3">
                    <button
                      className={getButtonClasses(btnVariant, btnState, btnSize)}
                      disabled={btnState === "disabled"}
                    >
                      {btnState === "loading" ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>{isPreviewRTL ? "جاري المعالجة..." : "Processing Request..."}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} />
                          <span>
                            {btnState === "disabled"
                              ? (isPreviewRTL ? "زر معطل" : "Disabled Button")
                              : (isPreviewRTL ? "زر الإجراء الحكومي" : "DGA Action Button")}
                          </span>
                          {isPreviewRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
                        </>
                      )}
                    </button>

                    {btnState === "focus" && (
                      <p className="text-[11px] font-mono text-[#10B981]">
                        {isPreviewRTL ? "• حلقة التركيز المرئية نشطة (2px Ring) للتوافق مع معايير الوصول (WCAG 2.1 AA)" : "• Visible 2px outline focus ring active for WCAG 2.1 AA accessibility"}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* 2. CARDS & SURFACES SHOWCASE (Matches DGA Reference Image 3) */}
              {activeCategory === "cards" && (
                <motion.div
                  key="cards"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full max-w-3xl space-y-6 text-start"
                >
                  <div>
                    <p className="text-xs text-muted-foreground mb-4">
                      {isPreviewRTL 
                        ? "المظاهر المدعومة: محدد (Outline)، مرتفع (Elevated)، وممتلئ (Filled). تدعم الأيقونات والشارات وأزرار الإجراءات." 
                        : "Appearances: outline, elevated, filled. Supports icon, badges, and action buttons."}
                    </p>

                    {/* 3 Core Surface Appearances Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                      {/* Outline Card */}
                      <div className="p-4 rounded-2xl bg-card/40 border-2 border-border/80 hover:border-[#074D31]/60 transition-all">
                        <h4 className="text-sm font-bold text-foreground mb-0.5">Outline</h4>
                        <p className="text-[11px] text-muted-foreground mb-2">Bordered appearance</p>
                        <p className="text-xs text-foreground/80">Card content with a clear structural border.</p>
                      </div>

                      {/* Elevated Card */}
                      <div className="p-4 rounded-2xl bg-card border border-border shadow-lg shadow-black/30 hover:-translate-y-0.5 transition-all">
                        <h4 className="text-sm font-bold text-foreground mb-0.5">Elevated</h4>
                        <p className="text-[11px] text-muted-foreground mb-2">Shadowed appearance</p>
                        <p className="text-xs text-foreground/80">Shadows separate the card from the background surface.</p>
                      </div>

                      {/* Filled Card */}
                      <div className="p-4 rounded-2xl bg-[#074D31]/10 border border-[#074D31]/20">
                        <h4 className="text-sm font-bold text-[#10B981] mb-0.5">Filled</h4>
                        <p className="text-[11px] text-muted-foreground mb-2">Sunken surface</p>
                        <p className="text-xs text-foreground/80">A subtle background tint for secondary grouping.</p>
                      </div>
                    </div>

                    {/* Unified Service Card (As shown in Reference Image 3) */}
                    <div className="p-5 rounded-2xl bg-card/80 border border-border/80 shadow-md space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-[#074D31]/15 border border-[#074D31]/30 flex items-center justify-center text-[#10B981]">
                        <ShieldCheck size={20} />
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-foreground">
                          {isPreviewRTL ? "بطاقة الخدمة الموحدة" : "Unified service card"}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {isPreviewRTL ? "شعار، عنوان، وصف، وسوم متعددة، وزري إجراء." : "Logo, title, description, multiple badges, and two buttons."}
                        </p>
                      </div>

                      {/* Badges in Card */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="px-2.5 py-0.5 rounded-md border border-blue-500/40 bg-blue-500/10 text-blue-400 text-[11px] font-medium">
                          {isPreviewRTL ? "الهوية والسجلات" : "Identity & records"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                          {isPreviewRTL ? "الأكثر استخداماً" : "Most used"}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-2">
                        <button className="h-9 px-4 rounded-xl border border-border text-foreground hover:bg-muted text-xs font-medium transition-all">
                          {isPreviewRTL ? "التفاصيل" : "Details"}
                        </button>
                        <button className="h-9 px-4 rounded-xl bg-[#074D31] hover:bg-[#095E3C] text-white text-xs font-medium transition-all">
                          {isPreviewRTL ? "ابدأ الخدمة" : "Start service"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 3. INPUTS & FORMS (Matches DGA Reference Matrix) */}
              {activeCategory === "inputs" && (
                <motion.div
                  key="inputs"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full max-w-3xl space-y-6 text-start"
                >
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                      {isPreviewRTL ? "مصفوفة حقول الإدخال والنماذج" : "Form Input Variants & State Matrix"}
                    </h3>
                    <p className="text-xs text-muted-foreground font-light">
                      {isPreviewRTL ? "المتغيرات المدعومة: محدد (Outline)، ممتلئ (Filled)، وخط سفلي (Underline) مع حالات الخطأ والتعطيل" : "Supported variants: Outline, Filled, and Underline styles across Default, Focus, Error, and Disabled states"}
                    </p>
                  </div>

                  {/* Matrix Overview Grid (From Reference Image) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-card/60 border border-border/70">
                    {/* Default Outline */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-muted-foreground">Label (Default)</label>
                      <input 
                        readOnly 
                        value={isPreviewRTL ? "نص الإدخال" : "Entered text"} 
                        className="w-full h-9 rounded-lg bg-background border border-border/80 px-3 text-xs text-foreground/80 outline-none" 
                      />
                    </div>

                    {/* Focus Active with Cursor */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-foreground">Label (Focus)</label>
                      <input 
                        readOnly 
                        value={isPreviewRTL ? "نص الإدخال|" : "Entered text|"} 
                        className="w-full h-9 rounded-lg bg-background border-2 border-[#074D31] ring-2 ring-[#074D31]/30 px-3 text-xs text-foreground font-medium outline-none" 
                      />
                    </div>

                    {/* Underline Indicator Variant */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-muted-foreground">Label (Underline)</label>
                      <div className="relative">
                        <input 
                          readOnly 
                          value={isPreviewRTL ? "نص الإدخال" : "Entered text"} 
                          className="w-full h-9 bg-muted/40 border-0 border-b-2 border-border/80 rounded-t-md px-3 text-xs text-foreground outline-none" 
                        />
                        <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-[#074D31]" />
                      </div>
                    </div>

                    {/* Error State */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-red-500">Label (Error)</label>
                      <input 
                        readOnly 
                        value={isPreviewRTL ? "بيانات غير صالحة" : "Invalid entry"} 
                        className="w-full h-9 rounded-lg bg-red-500/[0.04] border-2 border-red-500 ring-1 ring-red-500/40 px-3 text-xs text-red-400 outline-none" 
                      />
                    </div>

                    {/* Underline Error State */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-red-500">Label (Underline Error)</label>
                      <div className="relative">
                        <input 
                          readOnly 
                          value={isPreviewRTL ? "بيانات غير صالحة" : "Invalid entry"} 
                          className="w-full h-9 bg-red-500/[0.03] border-0 border-b-2 border-red-500/60 rounded-t-md px-3 text-xs text-red-400 outline-none" 
                        />
                        <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-red-500" />
                      </div>
                    </div>

                    {/* Disabled State */}
                    <div className="space-y-1 opacity-45">
                      <label className="text-[11px] font-medium text-muted-foreground">Label (Disabled)</label>
                      <input 
                        readOnly 
                        disabled
                        value={isPreviewRTL ? "حقل معطل" : "Disabled entry"} 
                        className="w-full h-9 rounded-lg bg-muted/30 border border-border/60 px-3 text-xs text-muted-foreground cursor-not-allowed outline-none" 
                      />
                    </div>
                  </div>

                  {/* Interactive RTL Form Field Container */}
                  <div className="p-5 rounded-2xl bg-card/80 border border-border/70 space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-border/50">
                      <span className="text-xs font-bold text-foreground">
                        {isPreviewRTL ? "اختبار النموذج التفاعلي (Live Sandbox)" : "Interactive Live Field Sandbox"}
                      </span>
                      {/* State Switcher */}
                      <div className="flex flex-wrap gap-1">
                        {(["default", "focus", "error", "success", "disabled"] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => setInputState(st)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-mono capitalize transition-all cursor-pointer ${
                              inputState === st ? "bg-[#074D31] text-white font-bold shadow-xs" : "bg-muted/60 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">
                        {isPreviewRTL ? "الاسم الكامل (وفق الهوية الوطنية)" : "Full Legal Name"}
                        <span className="text-red-500 ml-1 mr-1">*</span>
                      </label>

                      <div className="relative">
                        <input
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                          placeholder={isPreviewRTL ? "أدخل اسمك الكريم الثلاثي..." : "e.g. Mohammad Sinan"}
                          disabled={inputState === "disabled"}
                          className={getInputClasses()}
                        />
                        {inputState === "success" && (
                          <CheckCircle2 size={16} className={`absolute top-1/2 -translate-y-1/2 text-emerald-500 ${isPreviewRTL ? "left-3" : "right-3"}`} />
                        )}
                        {inputState === "error" && (
                          <AlertCircle size={16} className={`absolute top-1/2 -translate-y-1/2 text-red-500 ${isPreviewRTL ? "left-3" : "right-3"}`} />
                        )}
                        {inputState === "disabled" && (
                          <Lock size={14} className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${isPreviewRTL ? "left-3" : "right-3"}`} />
                        )}
                      </div>
                    </div>

                    {/* Helper & Error Messages */}
                    <div>
                      {inputState === "error" ? (
                        <p className="text-[11px] text-red-500 flex items-center gap-1">
                          <AlertCircle size={12} />
                          <span>{isPreviewRTL ? "يرجى إدخال اسم صحيح يحتوي على أحرف عربية فقط." : "Please enter a valid legal name."}</span>
                        </p>
                      ) : inputState === "success" ? (
                        <p className="text-[11px] text-emerald-500 flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          <span>{isPreviewRTL ? "تم التحقق من الحقل بنجاح وتطابقه مع السجلات." : "Field validated successfully."}</span>
                        </p>
                      ) : inputState === "disabled" ? (
                        <p className="text-[11px] text-muted-foreground">
                          {isPreviewRTL ? "الحقل معطل ومقروء فقط في هذه المرحلة." : "This field is locked and read-only."}
                        </p>
                      ) : (
                        <p className="text-[11px] text-muted-foreground">
                          {isPreviewRTL ? "يجب أن يتطابق الاسم تماماً مع وثائق الهوية الرسمية." : "Must match official identification records."}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 4. CHIPS & BADGES (Matches DGA Reference Image 2) */}
              {activeCategory === "chips" && (
                <motion.div
                  key="chips"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full max-w-2xl space-y-6 text-center"
                >
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                      {isPreviewRTL ? "شارات وحالات النظام الدلالية" : "Semantic System Badges"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {isPreviewRTL ? "شارات التنبيه والحالات المعيارية وفق ألوان DGA" : "Standardized semantic status badges with high contrast borders"}
                    </p>
                  </div>

                  {/* DGA Official Badges Lineup (From Reference Image 2) */}
                  <div className="flex flex-wrap items-center justify-center gap-3 p-6 rounded-2xl bg-card/70 border border-border/60">
                    {/* Neutral */}
                    <span className="px-3 py-1 rounded-md text-xs font-medium bg-muted/60 text-foreground border border-border">
                      {isPreviewRTL ? "محايد (Neutral)" : "Neutral"}
                    </span>

                    {/* Primary */}
                    <span className="px-3 py-1 rounded-md text-xs font-medium bg-[#074D31]/15 text-[#10B981] border border-[#074D31]/40">
                      {isPreviewRTL ? "أساسي (Primary)" : "Primary"}
                    </span>

                    {/* Success */}
                    <span className="px-3 py-1 rounded-md text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/40">
                      {isPreviewRTL ? "نجاح (Success)" : "Success"}
                    </span>

                    {/* Info */}
                    <span className="px-3 py-1 rounded-md text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/40">
                      {isPreviewRTL ? "معلومات (Info)" : "Info"}
                    </span>

                    {/* Warning */}
                    <span className="px-3 py-1 rounded-md text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/40">
                      {isPreviewRTL ? "تحذير (Warning)" : "Warning"}
                    </span>

                    {/* Error */}
                    <span className="px-3 py-1 rounded-md text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/40">
                      {isPreviewRTL ? "خطأ (Error)" : "Error"}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* 5. TABS & NAV (Matches DGA Reference Image 4) */}
              {activeCategory === "tabs" && (
                <motion.div
                  key="tabs"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full max-w-xl space-y-4 text-start"
                >
                  <h3 className="text-base sm:text-lg font-bold text-foreground text-center mb-1">
                    {isPreviewRTL ? "التبويبات ومسارات التنقل" : "Underline Navigation Tabs"}
                  </h3>

                  {/* DGA Style Underline Tab Navigation (From Reference Image 4) */}
                  <div className="rounded-2xl bg-card/70 border border-border/60 p-6 space-y-4">
                    <div className="flex border-b border-border">
                      {(isPreviewRTL 
                        ? ["نظرة عامة", "الاستخدام", "إمكانية الوصول"] 
                        : ["Overview", "Usage", "Accessibility"]).map((tabName, idx) => {
                        const isActive = activeTab === idx
                        return (
                          <button
                            key={tabName}
                            onClick={() => setActiveTab(idx)}
                            className={`relative pb-3 px-4 text-sm font-semibold transition-all cursor-pointer ${
                              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span>{tabName}</span>
                            {isActive && (
                              <motion.div
                                layoutId="dgaTabIndicator"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#074D31]"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              />
                            )}
                          </button>
                        )
                      })}
                    </div>

                    <div className="p-4 rounded-xl bg-background/70 border border-border/40 text-xs text-muted-foreground">
                      {activeTab === 0 && (isPreviewRTL ? "نظرة عامة على المكونات والأنماط المعيارية." : "Overview of the components and design tokens.")}
                      {activeTab === 1 && (isPreviewRTL ? "إرشادات الاستخدام وتطبيقات التفاعل." : "Usage guidelines, layout principles and responsive specs.")}
                      {activeTab === 2 && (isPreviewRTL ? "معايير إمكانية الوصول والتنقل عبر لوحة المفاتيح." : "WCAG 2.1 AA accessibility guidelines, ARIA attributes, and keyboard navigation.")}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 6. ALERTS & FEEDBACK */}
              {activeCategory === "alerts" && (
                <motion.div
                  key="alerts"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full max-w-lg space-y-3 text-start"
                >
                  <div className="text-center mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                      {isPreviewRTL ? "رسائل التنبيه والتغذية الراجعة" : "Feedback & Notification Banners"}
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-3">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                    <span>{isPreviewRTL ? "تم تحديث مكونات نظام التصميم وتوافقها التام مع معايير WCAG 2.1 AA." : "Design tokens synchronized with 100% WCAG AA compliance."}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs flex items-center gap-3">
                    <AlertCircle size={16} className="shrink-0 text-amber-500" />
                    <span>{isPreviewRTL ? "تنبيه: تحقق من خصائص التباعد المنطقية عند تفعيل الواجهة باللغة العربية." : "Notice: Verify logical padding and margin properties in RTL."}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs flex items-center gap-3">
                    <Info size={16} className="shrink-0 text-blue-400" />
                    <span>{isPreviewRTL ? "معلومة: يتم تحديث الرموز البرمجية تلقائياً من ملفات Figma." : "Info: Component tokens sync directly from Figma component libraries."}</span>
                  </div>
                </motion.div>
              )}

              {/* 7. COLOR TOKENS (Organized into Semantic Roles) */}
              {activeCategory === "colors" && (
                <motion.div
                  key="colors"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full max-w-2xl space-y-4"
                >
                  <div className="text-center mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                      {isPreviewRTL ? "رموز الألوان حسب الأدوار الدلالية" : "Semantic Color Role Tokens"}
                    </h3>
                    <p className="text-xs text-muted-foreground font-light">
                      {isPreviewRTL ? "توزيع ألوان نظام التصميم حسب الوظيفة والأولوية البصرية" : "Calibrated semantic color tokens for contrast and state consistency"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-start">
                    {colorTokens.map((token) => (
                      <div key={token.token} className="p-3 rounded-2xl bg-card/70 border border-border flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl border border-border shrink-0 shadow-2xs" style={{ background: token.hex }} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-foreground">{token.role}</span>
                            <span className="text-[10px] font-mono text-muted-foreground">({token.hex})</span>
                          </div>
                          <p className="text-[10px] font-mono text-[#10B981] mt-0.5">{token.token}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 8. TYPOGRAPHY SCALE (English & Arabic Side-by-Side) */}
              {activeCategory === "typography" && (
                <motion.div
                  key="typography"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full max-w-2xl space-y-4 text-start"
                >
                  <div className="text-center mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                      {isPreviewRTL ? "سلم الخطوط والطباعة ثنائي اللغة" : "Bilingual Typography Hierarchy"}
                    </h3>
                    <p className="text-xs text-muted-foreground font-light">
                      {isPreviewRTL ? "مقارنة دقة الخط العربي (Vazirmatn) والخط الإنجليزي" : "Displaying Geist Sans & Vazirmatn side-by-side with tokenized scales"}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {typographyScales.map((type) => (
                      <div key={type.level} className="p-3.5 rounded-2xl bg-card/70 border border-border space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="font-bold text-[#10B981]">{type.level}</span>
                          <span className="text-muted-foreground text-[10px]">{type.specs}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-border/40">
                          <p className="text-xs sm:text-sm text-foreground font-sans">
                            {type.sampleEn}
                          </p>
                          <p className="text-xs sm:text-sm text-foreground font-arabic text-end sm:text-start" dir="rtl">
                            {type.sampleAr}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Compact Design → Code Pipeline Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 p-4 rounded-2xl glass-panel border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start"
        >
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="px-2.5 py-1 rounded-lg bg-[#074D31]/20 text-[#10B981] border border-[#074D31]/40 font-mono text-xs font-bold">Figma</span>
            <span className="text-muted-foreground text-xs">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-muted/60 text-foreground font-mono text-xs">Components</span>
            <span className="text-muted-foreground text-xs">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-muted/60 text-foreground font-mono text-xs">Responsive UI</span>
            <span className="text-muted-foreground text-xs">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-muted/60 text-foreground font-mono text-xs">RTL</span>
            <span className="text-muted-foreground text-xs">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-xs font-bold">Frontend</span>
          </div>

          <p className="text-xs text-muted-foreground font-light shrink-0">
            {isPreviewRTL
              ? "ترجمة أنماط أنظمة التصميم إلى واجهات برمجية قابلة لإعادة الاستخدام."
              : "Translating design-system patterns into reusable frontend interfaces."}
          </p>
        </motion.div>

      </div>
    </Section>
  )
}
