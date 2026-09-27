"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageSquare, X, Sparkles, HelpCircle } from "lucide-react"
import { useLanguage } from "./language-context"

export function ChatBubble() {
  const [open, setOpen] = useState(false)
  const { isRTL } = useLanguage()

  const faqs = isRTL ? [
    {
      q: "ما هي منصة PixelResume وكيف تم بناؤها؟",
      a: "منصة بناء سير ذاتية حديثة ومتجاوبة تدعم اللغتين العربية والإنجليزية مع توافق كامل لاتجاه RTL، وتحرير فوري، وتصدير PDF متوافق مع أنظمة التوظيف ATS باستخدام React و Tailwind CSS."
    },
    {
      q: "ما هي خبرتك في أنظمة التصميم الحكومية ومعايير DGA؟",
      a: "أقوم بهندسة مكونات واجهات مستخدم معيارية للأنظمة الحكومية الكبرى تتوافق مع نظام التصميم الموحد للحكومة الرقمية (DGA)، والواجهات العربية RTL، وبناء أنظمة frontend تفاعلية في React و Vue."
    },
    {
      q: "كيف تضمن جودة وأداء الواجهات في بيئة الإنتاج؟",
      a: "من خلال معمارية برمجية ذرية، وتطبيق خصائص CSS المنطقية، واختبارات التوافق مع معايير إمكانية الوصول WCAG 2.1 AA، وضمان استجابة 60 إطاراً في الثانية."
    }
  ] : [
    {
      q: "What is PixelResume and how does it work?",
      a: "PixelResume is a modern, responsive resume builder supporting Arabic & English with full RTL/LTR compatibility, live editing, and ATS-friendly PDF exports using React & Tailwind CSS."
    },
    {
      q: "What is your experience with Government Design Systems & DGA?",
      a: "I engineer enterprise-level UI components conforming to the Saudi Government Design System (DGA), native Arabic RTL layouts, and accessible frontend systems in React and Vue."
    },
    {
      q: "How do you ensure production quality & 60 FPS performance?",
      a: "Through atomic component composition, logical CSS properties, WCAG 2.1 AA accessibility auditing, and sub-second hydration across viewports."
    }
  ]

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
        className={`fixed bottom-6 ${isRTL ? "left-6" : "right-6"} z-50`}
      >
        <Button
          onClick={() => setOpen((o) => !o)}
          className="h-12 px-5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-2xl dark:shadow-[0_0_25px_rgba(27,131,84,0.4)] flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
        >
          {open ? (
            <>
              <X size={15} />
              <span>{isRTL ? "إغلاق" : "Close"}</span>
            </>
          ) : (
            <>
              <MessageSquare size={15} />
              <span>{isRTL ? "الأسئلة الشائعة" : "Project Q&A"}</span>
            </>
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed bottom-22 ${isRTL ? "left-6" : "right-6"} z-50 w-84 sm:w-96 overflow-hidden rounded-3xl border border-border glass-panel shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl`}
            role="dialog"
            aria-label="UI Engineer project explainer"
          >
            <div className="border-b border-border p-4 flex items-center justify-between bg-card/80">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-primary" />
                <span className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                  {isRTL ? "دليل المشاريع والأسئلة" : "Project Deep-Dive Explainer"}
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-6 h-6 rounded-lg bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="max-h-80 space-y-3.5 overflow-y-auto p-4 text-xs font-sans">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-border bg-muted/40 p-3.5">
                  <p className="font-mono font-bold text-foreground text-[11px] mb-1.5 flex items-center gap-1.5">
                    <HelpCircle size={13} className="text-primary shrink-0" />
                    <span>{faq.q}</span>
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-3.5 bg-muted/20 text-[10px] font-mono text-muted-foreground flex items-center justify-between">
              <span>{isRTL ? "انقر على أي بطاقة لعرض دراسة الحالة" : "Tip: Click any project card to open case studies"}</span>
              <span className="text-primary font-bold">{isRTL ? "الرياض" : "Riyadh, KSA"}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
