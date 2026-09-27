"use client"

import { useLanguage } from "./language-context"
import { Globe } from "lucide-react"
import { motion } from "framer-motion"

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage()

  return (
    <button
      onClick={toggleLang}
      title={lang === "en" ? "تبديل إلى العربية (RTL)" : "Switch to English (LTR)"}
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-border/80 glass-pill hover:border-primary/50 hover:bg-primary/5 transition-all text-xs font-mono font-bold text-foreground shadow-xs cursor-pointer group"
    >
      <Globe size={14} className="text-primary group-hover:rotate-12 transition-transform duration-300" />
      <span className="uppercase tracking-wider">
        {lang === "en" ? "العربية" : "EN"}
      </span>
      <span className="text-[10px] text-muted-foreground font-normal">
        {lang === "en" ? "RTL" : "LTR"}
      </span>
    </button>
  )
}
