"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SlingButton from "@/components/ui/SlingButton"
import { useLanguage } from "./language-context"
import { ArrowUp } from "lucide-react"

export function SlingshotScroll() {
  const [visible, setVisible] = useState(false)
  const { isRTL } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSlingshot = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 30 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className={`fixed bottom-6 ${isRTL ? "right-6" : "left-6"} z-50 flex flex-col items-center gap-2 select-none`}
        >
          {/* Micro Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card/90 dark:bg-card/80 backdrop-blur-md border border-border/80 shadow-md pointer-events-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono font-medium text-foreground/80 whitespace-nowrap">
              {isRTL ? "اسحب وأطلق للصعود للأعلى" : "Pull & launch to top"}
            </span>
          </motion.div>

          {/* SlingButton Interactive Slingshot */}
          <div className="relative group p-1 rounded-full bg-card/40 dark:bg-card/20 backdrop-blur-xl border border-border/60 shadow-xl hover:shadow-2xl transition-all">
            <SlingButton
              onSend={handleSlingshot}
              size={54}
              strokeWidth={3}
              armAt={42}
              maxPull={130}
              launchSpeed={2800}
              recoil={0.25}
              flight={140}
              particles={16}
              spread={65}
              axis="any"
              tapSends={true}
              padColor="#1B8354"
              iconColor="#ffffff"
              accentColor="#10b981"
              wellColor="#0c1222"
              bandColor="#334155"
              ariaLabel={isRTL ? "العودة للأعلى" : "Slingshot to top"}
            >
              <ArrowUp size={22} strokeWidth={2.5} className="text-white" />
            </SlingButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

