"use client"

import { Section } from "./section"
import { motion } from "framer-motion"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import { Bot, Cpu, Sparkles, Terminal, Wand2, Zap } from "lucide-react"
import { useLanguage } from "./language-context"

const tools = [
  { name: "Cursor", descEn: "AI codebase exploration & refactoring", descAr: "استكشاف الكود البرمجي وإعادة الهيكلة" },
  { name: "GitHub Copilot", descEn: "Contextual code completions", descAr: "إكمال الكود البرمجي التفاعلي" },
  { name: "Gemini", descEn: "Multimodal technical analysis", descAr: "تحليل وتوليد الحلول التقنية المتعددة" },
  { name: "Lovable", descEn: "Rapid visual UI prototyping", descAr: "بناء النماذج الأولية السريعة للواجهات" },
  { name: "Bolt", descEn: "Full-stack interface scaffolding", descAr: "الهيكلة البرمجية السريعة للواجهات" },
]

export function AITools() {
  const { t, isRTL } = useLanguage()

  return (
    <Section id="ai-workflow" className="relative overflow-hidden bg-background py-16 sm:py-20 border-t border-border/60">
      {/* Background Subtle Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,131,84,0.03),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-3 py-1 text-xs font-mono font-medium text-muted-foreground shadow-xs mb-3"
          >
            <Bot size={13} className="text-primary" />
            <span>{t("ai.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground"
          >
            {t("ai.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed text-balance"
          >
            {t("ai.desc")}
          </motion.p>
        </div>

        {/* 5 AI Tools Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="w-full h-full"
            >
              <Hover3DCard
                maxRotate={6}
                depth={12}
                className="w-full h-full"
                contentClassName="rounded-2xl border border-border glass-panel p-4 h-full flex flex-col items-center justify-between text-center group shadow-2xs hover:border-primary/40 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-muted/60 border border-border/80 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-2.5 shrink-0">
                  <Cpu size={16} />
                </div>
                
                <h3 className="text-xs sm:text-sm font-bold font-mono text-foreground group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                
                <p className="text-[10px] text-muted-foreground font-light leading-snug mt-1.5">
                  {isRTL ? tool.descAr : tool.descEn}
                </p>
              </Hover3DCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}