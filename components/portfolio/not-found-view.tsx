"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft, ArrowRight } from "lucide-react"
import { useLanguage } from "./language-context"
import { ThemeToggle } from "./theme-toggle"
import { LanguageToggle } from "./language-toggle"

export function NotFoundView() {
  const { isRTL } = useLanguage()

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="relative min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-[#050816] text-foreground selection:bg-primary/20 selection:text-primary transition-colors duration-300"
    >
      {/* Minimal Header with Controls */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          {"<"}<span className="text-primary">UI</span>{"Developer />"}
        </Link>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      {/* Pure, Essential 404 Content */}
      <main className="w-full max-w-md mx-auto px-6 py-12 flex flex-col items-center text-center my-auto">
        {/* Clean 404 Number */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-8xl sm:text-9xl font-black font-mono tracking-tight text-primary select-none leading-none"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
        >
          {isRTL ? "الصفحة غير موجودة" : "Page Not Found"}
        </motion.h2>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
        >
          {isRTL
            ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
            : "The page you are looking for doesn't exist or has been moved."}
        </motion.p>

        {/* Back to Home Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Home size={16} />
            <span>{isRTL ? "العودة للرئيسية" : "Back to Home"}</span>
          </Link>
        </motion.div>
      </main>

      {/* Minimal clean copyright */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-6 text-center text-xs font-mono text-muted-foreground/60">
        © {new Date().getFullYear()} Mohammad Sinan
      </footer>
    </div>
  )
}
