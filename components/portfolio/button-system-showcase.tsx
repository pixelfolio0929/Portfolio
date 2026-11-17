"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sparkles, 
  Check, 
  Loader2, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Download, 
  Settings, 
  Share2, 
  Bookmark, 
  ExternalLink,
  ShieldCheck,
  Keyboard,
  Eye,
  Sliders,
  CheckCircle2,
  Copy
} from "lucide-react"

export type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "outline" 
  | "ghost" 
  | "destructive" 
  | "link" 
  | "icon" 
  | "loading"

export type ButtonState = 
  | "default" 
  | "hover" 
  | "focus" 
  | "active" 
  | "disabled" 
  | "loading" 
  | "success"

export type ButtonSize = "sm" | "md" | "lg"

interface ButtonSystemShowcaseProps {
  isRTL: boolean
  activeSubTab?: "preview" | "code" | "api"
}

export function ButtonSystemShowcase({ isRTL, activeSubTab = "preview" }: ButtonSystemShowcaseProps) {
  // Forced State Inspector Control
  const [inspectorState, setInspectorState] = useState<"interactive" | ButtonState>("interactive")
  
  // Interactive Sandbox State
  const [sandboxVariant, setSandboxVariant] = useState<ButtonVariant>("primary")
  const [sandboxSize, setSandboxSize] = useState<ButtonSize>("md")
  const [sandboxStatus, setSandboxStatus] = useState<"idle" | "loading" | "success">("idle")
  
  // Code Copy State
  const [copiedCode, setCopiedCode] = useState(false)

  // Trigger simulated 1.5s action in the interactive sandbox
  const handleSandboxClick = () => {
    if (sandboxStatus !== "idle") return
    setSandboxStatus("loading")
    setTimeout(() => {
      setSandboxStatus("success")
      setTimeout(() => {
        setSandboxStatus("idle")
      }, 1600)
    }, 1200)
  }

  // Helper to generate Tailwind classes for each variant and state
  const getButtonStyles = (
    variant: ButtonVariant, 
    forcedState: ButtonState = "default", 
    size: ButtonSize = "md"
  ) => {
    // 1. Size Metrics
    let sizeClasses = "h-10 px-4 text-xs gap-2 rounded-xl"
    if (size === "sm") sizeClasses = "h-8 px-3 text-[11px] gap-1.5 rounded-lg"
    if (size === "lg") sizeClasses = "h-12 px-6 text-sm gap-2.5 rounded-xl font-semibold"
    if (variant === "icon") {
      if (size === "sm") sizeClasses = "size-8 p-0 rounded-lg"
      else if (size === "lg") sizeClasses = "size-12 p-0 rounded-xl"
      else sizeClasses = "size-10 p-0 rounded-xl"
    } else if (variant === "link") {
      sizeClasses = "p-0 h-auto font-medium text-xs sm:text-sm gap-1.5"
    }

    // 2. Base Structural & Accessible Foundation
    let base = `${sizeClasses} inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 select-none cursor-pointer outline-none `
    
    // WCAG 2.1 AA Keyboard Focus Ring
    const focusVisibleRing = "focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-offset-[#050816] "
    base += focusVisibleRing

    // 3. Variant Specific Color and Surface Tokens
    switch (variant) {
      case "primary":
        base += "bg-[#074D31] dark:bg-[#1B8354] text-white shadow-xs hover:bg-[#095E3C] dark:hover:bg-[#156e45] active:scale-[0.98] "
        if (forcedState === "hover") base += "bg-[#095E3C] dark:bg-[#156e45] shadow-md scale-[1.02] "
        if (forcedState === "focus") base += "ring-2 ring-[#10B981] ring-offset-2 ring-offset-background "
        if (forcedState === "active") base += "bg-[#053723] dark:bg-[#115536] scale-[0.97] "
        break

      case "secondary":
        base += "bg-muted/80 dark:bg-white/10 text-foreground border border-border/80 hover:bg-muted dark:hover:bg-white/15 active:scale-[0.98] "
        if (forcedState === "hover") base += "bg-muted dark:bg-white/15 scale-[1.02] "
        if (forcedState === "focus") base += "ring-2 ring-[#10B981] ring-offset-2 ring-offset-background "
        if (forcedState === "active") base += "bg-muted/90 dark:bg-white/20 scale-[0.97] "
        break

      case "outline":
        base += "border-2 border-[#074D31] dark:border-[#10B981]/60 text-[#074D31] dark:text-[#10B981] bg-transparent hover:bg-[#074D31]/10 dark:hover:bg-[#10B981]/15 active:scale-[0.98] "
        if (forcedState === "hover") base += "bg-[#074D31]/15 dark:bg-[#10B981]/20 scale-[1.02] border-[#10B981] "
        if (forcedState === "focus") base += "ring-2 ring-[#10B981] ring-offset-2 ring-offset-background "
        if (forcedState === "active") base += "bg-[#074D31]/25 dark:bg-[#10B981]/30 scale-[0.97] "
        break

      case "ghost":
        base += "text-foreground/90 hover:text-foreground hover:bg-accent/60 dark:hover:bg-white/10 bg-transparent active:scale-[0.98] "
        if (forcedState === "hover") base += "bg-accent/60 dark:bg-white/10 scale-[1.02] text-foreground "
        if (forcedState === "focus") base += "ring-2 ring-primary/40 ring-offset-2 ring-offset-background "
        if (forcedState === "active") base += "bg-accent/80 dark:bg-white/15 scale-[0.97] "
        break

      case "destructive":
        base += "bg-red-600 text-white shadow-xs hover:bg-red-700 active:scale-[0.98] focus-visible:ring-red-500 "
        if (forcedState === "hover") base += "bg-red-700 shadow-md scale-[1.02] "
        if (forcedState === "focus") base += "ring-2 ring-red-500 ring-offset-2 ring-offset-background "
        if (forcedState === "active") base += "bg-red-800 scale-[0.97] "
        break

      case "link":
        base += "text-[#074D31] dark:text-[#10B981] underline-offset-4 hover:underline bg-transparent "
        if (forcedState === "hover") base += "underline text-[#095E3C] dark:text-[#34d399] "
        if (forcedState === "focus") base += "ring-2 ring-[#10B981] rounded-sm "
        if (forcedState === "active") base += "opacity-80 "
        break

      case "icon":
        base += "bg-muted/80 dark:bg-white/10 text-foreground border border-border/80 hover:bg-muted dark:hover:bg-white/15 active:scale-[0.96] "
        if (forcedState === "hover") base += "bg-muted dark:bg-white/15 scale-[1.04] text-primary "
        if (forcedState === "focus") base += "ring-2 ring-[#10B981] ring-offset-2 ring-offset-background "
        if (forcedState === "active") base += "bg-muted/90 dark:bg-white/20 scale-[0.94] "
        break

      case "loading":
        base += "bg-[#074D31] dark:bg-[#1B8354] text-white opacity-85 cursor-wait "
        break
    }

    // 4. Overriding States
    if (forcedState === "disabled") {
      base += "opacity-40 pointer-events-none cursor-not-allowed filter grayscale-[30%] shadow-none scale-100 "
    }

    if (forcedState === "loading") {
      base += "cursor-wait pointer-events-none opacity-85 "
    }

    if (forcedState === "success") {
      base += "!bg-emerald-600 !text-white !border-emerald-600 shadow-sm "
    }

    return base
  }

  // Copy code helper
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // -------------------------------------------------------------
  // SUB-TAB: CODE SNIPPETS
  // -------------------------------------------------------------
  if (activeSubTab === "code") {
    const codeSnippet = `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-[#074D31] dark:bg-[#1B8354] text-white hover:bg-[#095E3C] shadow-xs",
        secondary: "bg-muted/80 dark:bg-white/10 text-foreground border border-border/80 hover:bg-muted",
        outline: "border-2 border-[#074D31] dark:border-[#10B981]/60 text-[#074D31] dark:text-[#10B981] bg-transparent hover:bg-primary/10",
        ghost: "text-foreground hover:bg-accent/60 bg-transparent",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-xs focus-visible:ring-red-500",
        link: "text-[#074D31] dark:text-[#10B981] underline-offset-4 hover:underline p-0 h-auto",
        icon: "bg-muted/80 dark:bg-white/10 text-foreground border border-border/80 hover:bg-muted",
      },
      size: {
        sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
        md: "h-10 px-4 text-sm gap-2 rounded-xl",
        lg: "h-12 px-6 text-base gap-2.5 rounded-xl font-semibold",
        icon: "size-10 p-0 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  isSuccess?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, isSuccess, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading ? "true" : undefined}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading && <Loader2 className="animate-spin size-4" />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)
Button.displayName = "Button"`

    return (
      <div className="w-full max-w-3xl space-y-4 text-start font-mono text-xs">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/60 border border-border">
          <span className="text-muted-foreground font-semibold">
            {isRTL ? "مكون الزر القابل لإعادة الاستخدام (TypeScript / CVA)" : "Reusable Button Component (TypeScript / CVA)"}
          </span>
          <button
            onClick={() => handleCopyCode(codeSnippet)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors cursor-pointer"
          >
            {copiedCode ? <Check size={12} /> : <Copy size={12} />}
            <span>{copiedCode ? (isRTL ? "تم النسخ" : "Copied!") : (isRTL ? "نسخ الكود" : "Copy Code")}</span>
          </button>
        </div>
        <pre className="p-5 rounded-2xl bg-[#090d16] border border-white/10 text-emerald-400 overflow-x-auto text-[11px] leading-relaxed">
          <code>{codeSnippet}</code>
        </pre>
      </div>
    )
  }

  // -------------------------------------------------------------
  // SUB-TAB: API & PROPS SPECIFICATION
  // -------------------------------------------------------------
  if (activeSubTab === "api") {
    const propsList = [
      { name: "variant", type: '"primary" | "secondary" | "outline" | "ghost" | "destructive" | "link" | "icon"', default: '"primary"', desc: isRTL ? "النمط البصري الأساسي للزر" : "Visual hierarchy and style variant" },
      { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', desc: isRTL ? "حجم الزر والمساحات الداخلية" : "Component dimensions and padding scale" },
      { name: "isLoading", type: "boolean", default: "false", desc: isRTL ? "تفعيل حالة التحميل وتعطيل التفاعل مع إضافة مؤشر الدوران" : "Displays spinner, sets aria-busy, prevents clicks" },
      { name: "isSuccess", type: "boolean", default: "false", desc: isRTL ? "تأكيد إتمام الإجراء بنجاح باللون الأخضر" : "Affirmative success feedback state" },
      { name: "leftIcon", type: "ReactNode", default: "undefined", desc: isRTL ? "أيقونة بادئة قبل النص (تنعكس تلقائياً في RTL)" : "Leading icon slot with optical spacing" },
      { name: "rightIcon", type: "ReactNode", default: "undefined", desc: isRTL ? "أيقونة لاحقة بعد النص (تنعكس تلقائياً في RTL)" : "Trailing icon slot with optical spacing" },
      { name: "disabled", type: "boolean", default: "false", desc: isRTL ? "تعطيل الزر تماماً عبر السمة الأصلية HTML" : "Native HTML disabled state, prevents keyboard & mouse events" },
      { name: "aria-label", type: "string", default: "undefined", desc: isRTL ? "وصف مخصص لقارئات الشاشة في الأزرار ذات الأيقونة فقط" : "Required accessible name for icon-only buttons" },
    ]

    return (
      <div className="w-full max-w-3xl space-y-4 text-start font-mono text-xs">
        <div className="p-3 rounded-2xl bg-muted/60 border border-border flex items-center justify-between">
          <span className="font-bold text-foreground">
            {isRTL ? "مواصفات الواجهة البرمجية (Props & API Specifications)" : "Props & Component API Specifications"}
          </span>
          <span className="text-[10px] text-muted-foreground">WCAG 2.1 AA Compliant</span>
        </div>
        <div className="rounded-2xl border border-border/80 overflow-hidden bg-card/60">
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-start border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border text-muted-foreground">
                  <th className="p-3 text-start font-bold">Prop</th>
                  <th className="p-3 text-start font-bold">Type</th>
                  <th className="p-3 text-start font-bold">Default</th>
                  <th className="p-3 text-start font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {propsList.map((p) => (
                  <tr key={p.name} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-bold text-primary">{p.name}</td>
                    <td className="p-3 text-muted-foreground">{p.type}</td>
                    <td className="p-3 text-foreground/80">{p.default}</td>
                    <td className="p-3 text-muted-foreground">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // SUB-TAB: PREVIEW (COMPLETE 7-SECTION SHOWCASE)
  // -------------------------------------------------------------
  const variants: { id: ButtonVariant; labelEn: string; labelAr: string; descEn: string; descAr: string }[] = [
    { id: "primary", labelEn: "Primary", labelAr: "أساسي", descEn: "High-emphasis brand green action", descAr: "الإجراء الحكومي الأساسي عالي التباين" },
    { id: "secondary", labelEn: "Secondary", labelAr: "ثانوي", descEn: "Mid-emphasis supporting action", descAr: "الإجراء المساند المعتدل" },
    { id: "outline", labelEn: "Outline", labelAr: "محدد (Outline)", descEn: "Clear bordered action", descAr: "زر بإطار محدد وخلفية شفافة" },
    { id: "ghost", labelEn: "Ghost", labelAr: "خفي (Ghost)", descEn: "Low-emphasis surface action", descAr: "زر هادئ للتنقل الخفيف بدون إطار" },
    { id: "destructive", labelEn: "Destructive", labelAr: "تحذيري / حذف", descEn: "Critical or irreversible action", descAr: "للإجراءات الحرجة والحذف الإلزامي" },
    { id: "link", labelEn: "Link Button", labelAr: "زر الرابط", descEn: "Inline text link with underline", descAr: "زر نصي بنمط الروابط التشعبية" },
    { id: "icon", labelEn: "Icon Button", labelAr: "زر أيقونة", descEn: "Symmetrical icon container", descAr: "حاوية أيقونة متناظرة الأبعاد" },
    { id: "loading", labelEn: "Loading", labelAr: "تحميل", descEn: "Asynchronous waiting state", descAr: "حالة معالجة الطلب في الخلفية" },
  ]

  const statesList: ButtonState[] = ["default", "hover", "focus", "active", "disabled", "loading", "success"]

  return (
    <div className="w-full max-w-4xl space-y-10 text-start">
      
      {/* 1. Introduction Header Banner */}
      <div className="p-5 rounded-2xl bg-card/60 dark:bg-[#0c1222]/80 border border-border/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <h4 className="text-sm sm:text-base font-bold text-foreground">
              {isRTL ? "نظام الأزرار المعياري والحالات التفاعلية" : "Design System Buttons & Interactive States"}
            </h4>
          </div>
          <p className="text-xs text-muted-foreground font-light leading-relaxed max-w-2xl">
            {isRTL
              ? "مصفوفة متكاملة تضم 8 متغيرات للأزرار مدعومة بـ 7 حالات تفاعلية، مع توافق كامل لسهولة الوصول (WCAG 2.1 AA)، وحلقات التركيز للوحة المفاتيح، والاتجاه ثنائي اللغة."
              : "Complete 8-variant button architecture engineered with 7 verified states, WCAG 2.1 AA focus-visible rings, keyboard Tab navigation, and native bidirectional RTL support."}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] font-mono font-bold">
            8 Variants · 7 States
          </span>
        </div>
      </div>

      {/* 2. Button Variants Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div className="flex items-center gap-2">
            <Sliders size={14} className="text-primary" />
            <h5 className="text-xs sm:text-sm font-bold font-mono text-foreground uppercase tracking-wide">
              {isRTL ? "1. جميع متغيرات الأزرار (8 Variants)" : "1. Button Variants Showcase"}
            </h5>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            {isRTL ? "انقر لتجربة التفاعل المباشر" : "Interactive Clickable Buttons"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {variants.map((v) => {
            const isForced = inspectorState !== "interactive"
            const effectiveState = isForced ? inspectorState : (v.id === "loading" ? "loading" : "default")

            return (
              <div
                key={v.id}
                className="p-4 rounded-2xl bg-card/40 dark:bg-white/[0.03] border border-border/70 flex flex-col justify-between gap-3 hover:border-primary/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="font-bold text-foreground">{isRTL ? v.labelAr : v.labelEn}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">{v.id}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-light leading-tight">
                    {isRTL ? v.descAr : v.descEn}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-center min-h-[48px]">
                  {v.id === "icon" ? (
                    <button
                      type="button"
                      aria-label="Settings Icon Button"
                      className={getButtonStyles("icon", effectiveState, "md")}
                    >
                      <Settings size={16} />
                    </button>
                  ) : v.id === "loading" ? (
                    <button
                      type="button"
                      className={getButtonStyles("loading", effectiveState, "md")}
                    >
                      <Loader2 size={14} className="animate-spin" />
                      <span>{isRTL ? "جاري المعالجة..." : "Loading..."}</span>
                    </button>
                  ) : v.id === "destructive" ? (
                    <button
                      type="button"
                      className={getButtonStyles("destructive", effectiveState, "md")}
                    >
                      <Trash2 size={13} />
                      <span>{isRTL ? "حذف السجل" : "Delete Record"}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={getButtonStyles(v.id, effectiveState, "md")}
                    >
                      <span>{isRTL ? v.labelAr : v.labelEn}</span>
                      {v.id === "link" ? (
                        <ExternalLink size={12} />
                      ) : isRTL ? (
                        <ArrowLeft size={13} />
                      ) : (
                        <ArrowRight size={13} />
                      )}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 3. Interactive State Inspector & Simulator */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-2">
          <div className="flex items-center gap-2">
            <Eye size={14} className="text-primary" />
            <h5 className="text-xs sm:text-sm font-bold font-mono text-foreground uppercase tracking-wide">
              {isRTL ? "2. محاكي الحالات التفاعلية (State Inspector)" : "2. Interactive State Inspector"}
            </h5>
          </div>

          {/* State Switcher Pills */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setInspectorState("interactive")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                inspectorState === "interactive"
                  ? "bg-[#074D31] text-white font-bold shadow-xs"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {isRTL ? "التفاعل الطبيعي" : "Native Interaction"}
            </button>
            {statesList.map((st) => (
              <button
                key={st}
                onClick={() => setInspectorState(st)}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono capitalize transition-all cursor-pointer ${
                  inspectorState === st
                    ? "bg-[#074D31] text-white font-bold shadow-xs"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Live Interactive Sandbox Card */}
        <div className="p-6 rounded-2xl bg-card/60 dark:bg-[#0c1222] border border-border/80 flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <span className="text-muted-foreground">{isRTL ? "المتغير:" : "Variant:"}</span>
            {(["primary", "secondary", "outline", "destructive"] as const).map((vr) => (
              <button
                key={vr}
                onClick={() => setSandboxVariant(vr)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono capitalize cursor-pointer transition-colors ${
                  sandboxVariant === vr ? "bg-primary text-primary-foreground font-bold" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {vr}
              </button>
            ))}
          </div>

          {/* Actual Clickable Sandbox Button with Async Feedback */}
          <div className="py-2 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleSandboxClick}
              disabled={inspectorState === "disabled" || sandboxStatus === "loading"}
              aria-busy={sandboxStatus === "loading" ? "true" : undefined}
              className={getButtonStyles(
                sandboxVariant,
                inspectorState !== "interactive" ? inspectorState : (sandboxStatus === "loading" ? "loading" : sandboxStatus === "success" ? "success" : "default"),
                sandboxSize
              )}
            >
              {sandboxStatus === "loading" ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>{isRTL ? "جاري الحفظ والتسجيل..." : "Saving Request..."}</span>
                </>
              ) : sandboxStatus === "success" ? (
                <>
                  <Check size={15} className="text-white" />
                  <span>{isRTL ? "تم الحفظ بنجاح!" : "Saved Successfully!"}</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>
                    {inspectorState === "disabled"
                      ? (isRTL ? "زر معطل (Disabled)" : "Disabled Button")
                      : (isRTL ? "انقر لاختبار التفاعل الحي" : "Click to Test Live Flow")}
                  </span>
                  {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
                </>
              )}
            </button>
            <span className="text-[10px] font-mono text-muted-foreground">
              {isRTL ? "يحاكي الإجراء: النقر → تحميل (1.2ث) → نجاح (1.6ث) → إعادة التعيين" : "Simulates: Click → Async Loading (1.2s) → Success (1.6s) → Reset"}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Button Sizes Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div className="flex items-center gap-2">
            <Sliders size={14} className="text-primary" />
            <h5 className="text-xs sm:text-sm font-bold font-mono text-foreground uppercase tracking-wide">
              {isRTL ? "3. مقاييس الأحجام (Button Sizes)" : "3. Button Sizes Scale"}
            </h5>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">Small · Medium · Large</span>
        </div>

        <div className="p-6 rounded-2xl bg-card/40 dark:bg-white/[0.03] border border-border/70 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="flex flex-col items-center gap-1.5">
            <button type="button" className={getButtonStyles("primary", "default", "sm")}>
              <span>{isRTL ? "حجم صغير (sm)" : "Small (sm)"}</span>
              {isRTL ? <ArrowLeft size={11} /> : <ArrowRight size={11} />}
            </button>
            <span className="text-[10px] font-mono text-muted-foreground">h-8 · px-3 · 12px font</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <button type="button" className={getButtonStyles("primary", "default", "md")}>
              <span>{isRTL ? "حجم متوسط (md) — افتراضي" : "Medium (md) — Default"}</span>
              {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
            </button>
            <span className="text-[10px] font-mono text-muted-foreground">h-10 · px-4 · 14px font</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <button type="button" className={getButtonStyles("primary", "default", "lg")}>
              <span>{isRTL ? "حجم كبير (lg)" : "Large (lg)"}</span>
              {isRTL ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
            </button>
            <span className="text-[10px] font-mono text-muted-foreground">h-12 · px-6 · 16px font</span>
          </div>
        </div>
      </div>

      {/* 5. Icon Buttons & Composite Patterns */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-primary" />
            <h5 className="text-xs sm:text-sm font-bold font-mono text-foreground uppercase tracking-wide">
              {isRTL ? "4. أنماط الأيقونات والأزرار الدائرية" : "4. Icon Buttons & Composites"}
            </h5>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">5 Patterns</span>
        </div>

        <div className="p-6 rounded-2xl bg-card/40 dark:bg-white/[0.03] border border-border/70 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {/* Pattern 1: Icon Only */}
          <div className="flex flex-col items-center gap-1.5">
            <button
              type="button"
              aria-label="Download Document"
              className={getButtonStyles("icon", "default", "md")}
            >
              <Download size={16} />
            </button>
            <span className="text-[10px] font-mono text-muted-foreground">Icon Only</span>
          </div>

          {/* Pattern 2: Icon + Text (Leading) */}
          <div className="flex flex-col items-center gap-1.5">
            <button type="button" className={getButtonStyles("secondary", "default", "md")}>
              <Plus size={14} />
              <span>{isRTL ? "إضافة عنصر" : "Add Record"}</span>
            </button>
            <span className="text-[10px] font-mono text-muted-foreground">Icon + Text</span>
          </div>

          {/* Pattern 3: Text + Icon (Trailing) */}
          <div className="flex flex-col items-center gap-1.5">
            <button type="button" className={getButtonStyles("outline", "default", "md")}>
              <span>{isRTL ? "مشاركة الرابط" : "Share Link"}</span>
              <Share2 size={13} />
            </button>
            <span className="text-[10px] font-mono text-muted-foreground">Text + Icon</span>
          </div>

          {/* Pattern 4: Circular Icon Button */}
          <div className="flex flex-col items-center gap-1.5">
            <button
              type="button"
              aria-label="Bookmark Project"
              className="size-10 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-xs"
            >
              <Bookmark size={16} />
            </button>
            <span className="text-[10px] font-mono text-muted-foreground">Circular</span>
          </div>

          {/* Pattern 5: Disabled Icon Button */}
          <div className="flex flex-col items-center gap-1.5">
            <button
              type="button"
              disabled
              aria-label="Disabled Action"
              className="size-10 rounded-xl bg-muted/60 border border-border/60 text-muted-foreground opacity-40 cursor-not-allowed flex items-center justify-center"
            >
              <Settings size={16} />
            </button>
            <span className="text-[10px] font-mono text-muted-foreground">Disabled Icon</span>
          </div>
        </div>
      </div>

      {/* 6. Accessibility & Keyboard Navigation (WCAG 2.1 AA) */}
      <div className="p-5 rounded-2xl bg-card/60 dark:bg-[#0c1222] border border-border/80 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-foreground">
          <Keyboard size={15} className="text-[#10B981]" />
          <span>{isRTL ? "5. معايير إمكانية الوصول والتنقل بلوحة المفاتيح (WCAG 2.1 AA)" : "5. Accessibility & Keyboard Navigation (WCAG 2.1 AA)"}</span>
        </div>
        <p className="text-xs text-muted-foreground font-light leading-relaxed">
          {isRTL
            ? "اضغط مفتاح Tab للتنقل بين الأزرار واختبار حلقة التركيز المرئية (:focus-visible ring) عالية التباين، والمصممة لتلبية معايير النفاذ الرقمي دون تشويه النقر بالفأرة."
            : "Press the Tab key on your keyboard to navigate between buttons and observe the high-contrast 2px focus ring (:focus-visible), engineered for assistive compliance without intrusive mouse outlines."}
        </p>
        
        {/* Live Tab-Testing Field */}
        <div className="p-3.5 rounded-xl bg-background/80 border border-border/70 flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-mono text-muted-foreground uppercase">{isRTL ? "جرّب Tab هنا:" : "Tab Test Area:"}</span>
          <button type="button" className={getButtonStyles("primary", "default", "sm")}>
            Focusable 1
          </button>
          <button type="button" className={getButtonStyles("secondary", "default", "sm")}>
            Focusable 2
          </button>
          <button type="button" className={getButtonStyles("outline", "default", "sm")}>
            Focusable 3
          </button>
        </div>
      </div>

    </div>
  )
}
