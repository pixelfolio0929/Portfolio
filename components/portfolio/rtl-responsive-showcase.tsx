"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Section } from "./section"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Languages, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Search,
  Bell,
  Menu,
  CheckCircle2,
  ChevronRight,
  ChevronLeft
} from "lucide-react"

type LangMode = "en" | "ar"
type DeviceMode = "desktop" | "tablet" | "mobile"

export function RTLResponsiveShowcase() {
  const [lang, setLang] = useState<LangMode>("en")
  const [device, setDevice] = useState<DeviceMode>("desktop")

  const isRTL = lang === "ar"

  // Bilingual content items
  const content = {
    en: {
      badge: "LIVE INTERACTION",
      title: "Arabic RTL & Responsive Matrix",
      sub: "Switch direction and device viewports to experience authentic bi-directional UI architecture.",
      portalTitle: "Digital Media Platform",
      portalSubtitle: "National Broadcast & Content Distribution",
      searchPlaceholder: "Search programs, archives, live feeds...",
      navItems: ["Live Channels", "Radio", "News Hub", "Archive", "Media Kit"],
      stat1Label: "Active Feeds",
      stat1Value: "12 Channels",
      stat2Label: "Daily Viewers",
      stat2Value: "4.8 Million",
      featuredTitle: "Prime Broadcast Stream",
      featuredDesc: "High-definition streaming of cultural coverage and national media programs.",
      ctaButton: "Watch Live",
      switchPrompt: "Direction:",
    },
    ar: {
      badge: "عرض تفاعلي مباشر",
      title: "نظام واجهات المستخدم باللغة العربية والاستجابة",
      sub: "قم بتبديل اتجاه اللغة وحجم الشاشة لتجربة بنية واجهات ثنائية الاتجاه مصممة باحترافية.",
      portalTitle: "المنصة الرقمية للإعلام",
      portalSubtitle: "بوابة البث والتوزيع الرقمي الوطني",
      searchPlaceholder: "ابحث في البرامج، الأرشيف، والبث المباشر...",
      navItems: ["القنوات المباشرة", "الإذاعة", "مركز الأخبار", "الأرشيف", "الملف الإعلامي"],
      stat1Label: "القنوات النشطة",
      stat1Value: "١٢ قناة",
      stat2Label: "المشاهدات اليومية",
      stat2Value: "٤.٨ مليون",
      featuredTitle: "بث مباشر عالي الدقة",
      featuredDesc: "بث فائق الجودة لتغطية الفعاليات الثقافية والبرامج الإخبارية اليومية.",
      ctaButton: "شاهد الآن",
      switchPrompt: "الاتجاه:",
    },
  }

  const current = content[lang]

  return (
    <Section id="rtl-responsive" className="relative overflow-hidden py-20 sm:py-28 bg-background border-t border-border/60">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(27,131,84,0.06),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-mono font-medium text-primary mb-4"
          >
            <Languages size={14} />
            <span>Bi-directional &amp; Multi-Screen</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-foreground uppercase"
          >
            ARABIC RTL &amp; RESPONSIVE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-muted-foreground font-light leading-relaxed text-balance"
          >
            ONE EXPERIENCE. EVERY SCREEN. Engineering flawless Arabic RTL layout mirroring, optical typography balance, and fluid multi-device adaptability.
          </motion.p>
        </div>

        {/* Control Toolbar: Language Switcher & Device Frame Selectors */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-3 sm:p-4 rounded-2xl glass-panel border border-border">
          
          {/* Language Switcher: EN | AR */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground uppercase">{current.switchPrompt}</span>
            <div className="inline-flex p-1 rounded-xl bg-muted/60 border border-border">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  lang === "en" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                English (LTR)
              </button>
              <button
                onClick={() => setLang("ar")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  lang === "ar" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                العربية (RTL)
              </button>
            </div>
          </div>

          {/* Device Frame Viewport Selectors */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground uppercase hidden md:inline">Viewport:</span>
            <div className="inline-flex p-1 rounded-xl bg-muted/60 border border-border">
              <button
                onClick={() => setDevice("desktop")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  device === "desktop" ? "bg-background text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Monitor size={14} />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setDevice("tablet")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  device === "tablet" ? "bg-background text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Tablet size={14} />
                <span className="hidden sm:inline">Tablet</span>
              </button>
              <button
                onClick={() => setDevice("mobile")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  device === "mobile" ? "bg-background text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Smartphone size={14} />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Device Simulator Canvas */}
        <div className="flex justify-center items-center py-4 overflow-hidden">
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            style={{
              width: device === "desktop" ? "100%" : device === "tablet" ? "768px" : "390px",
              maxWidth: "100%",
            }}
            className="rounded-3xl border-2 border-border/90 bg-card shadow-2xl overflow-hidden transition-all duration-500"
          >
            {/* Device Browser Header Bar */}
            <div className="px-4 py-2.5 bg-muted/50 border-b border-border/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-3 py-0.5 rounded-xl bg-background/80 border border-border/60 text-[10px] font-mono text-muted-foreground truncate max-w-[200px]">
                media.gov.sa/live?lang={lang}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-[9px] uppercase">
                  {isRTL ? "RTL Active" : "LTR Active"}
                </Badge>
              </div>
            </div>

            {/* Embedded Live Interactive Portal Preview */}
            <div
              dir={isRTL ? "rtl" : "ltr"}
              className={`p-5 sm:p-7 bg-background transition-all duration-300 ${
                isRTL ? "font-sans text-right" : "text-left"
              }`}
            >
              {/* Portal Top Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-border/70 mb-5 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold font-mono text-xs shadow-md">
                    GOV
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-foreground">{current.portalTitle}</h4>
                    <p className="text-[11px] text-muted-foreground hidden sm:block">{current.portalSubtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground">
                    <Bell size={15} />
                  </button>
                  <button className="p-2 rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground sm:hidden">
                    <Menu size={15} />
                  </button>
                </div>
              </div>

              {/* Navigation Items (Desktop & Tablet) */}
              <div className="hidden sm:flex items-center gap-2 mb-5 overflow-x-auto pb-1">
                {current.navItems.map((item, idx) => (
                  <span
                    key={item}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-medium transition-colors ${
                      idx === 0 ? "bg-primary/10 text-primary font-bold border border-primary/20" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Live Search Bar */}
              <div className="relative mb-6">
                <Search size={15} className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${isRTL ? "right-3.5" : "left-3.5"}`} />
                <input
                  type="text"
                  readOnly
                  value={current.searchPlaceholder}
                  className={`w-full h-10 rounded-xl bg-card border border-border/80 text-xs text-muted-foreground cursor-pointer ${
                    isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
                  }`}
                />
              </div>

              {/* Featured Media Showcase Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-primary/20 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold mb-2 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">{current.featuredTitle}</h3>
                  <p className="text-xs text-muted-foreground max-w-lg">{current.featuredDesc}</p>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs font-bold rounded-xl px-5 h-10 shrink-0 flex items-center gap-1.5 shadow-md">
                  <span>{current.ctaButton}</span>
                  {isRTL ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
                </Button>
              </div>

              {/* Responsive Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-card/60 border border-border/60">
                  <span className="text-[10px] font-mono text-muted-foreground block mb-0.5">{current.stat1Label}</span>
                  <span className="text-base font-mono font-bold text-foreground">{current.stat1Value}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-card/60 border border-border/60">
                  <span className="text-[10px] font-mono text-muted-foreground block mb-0.5">{current.stat2Label}</span>
                  <span className="text-base font-mono font-bold text-foreground">{current.stat2Value}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </Section>
  )
}
