"use client"

import { useEffect, useState } from "react"
import { MobileNav } from "./mobile-nav"
import { ThemeToggle } from "./theme-toggle"
import { LanguageToggle } from "./language-toggle"
import { useLanguage } from "./language-context"
import { motion } from "framer-motion"

export function Navbar() {
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()

  const navItems = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.capabilities"), href: "#capabilities" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.gov"), href: "#government-ui" },
    { name: t("nav.designSystems"), href: "#design-systems" },
    { name: t("nav.howIWork"), href: "#how-i-work" },
    { name: t("nav.experience"), href: "#experience" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.contact"), href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -40% 0px",
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    navItems.forEach((item) => {
      const el = document.querySelector(item.href)
      if (el) observer.observe(el)
    })

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [t])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-2xl border-b border-border/80 shadow-xs py-1.5"
          : "bg-transparent py-2.5 sm:py-3.5"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-11" : "h-13"
          }`}
        >
          {/* Left: Brand Logo & Mobile Trigger */}
          <div className="flex items-center justify-start gap-2.5">
            <MobileNav />
            <a href="#" className="group flex items-center">
              <span className="font-mono text-xs sm:text-sm font-bold text-foreground tracking-tight group-hover:opacity-80 transition-opacity">
                {"<"}<span className="text-primary">UI</span>{"Developer />"}
              </span>
            </a>
          </div>

          {/* Center: Refined Compact Glass Pill Nav (Desktop) */}
          <div className="hidden lg:flex items-center justify-center">
            <nav className="flex items-center gap-0.5 glass-pill p-1 rounded-full shadow-xs backdrop-blur-2xl border border-border/70">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative px-2.5 py-1 rounded-full text-[11px] font-mono font-medium tracking-tight transition-colors duration-200 ${
                      isActive ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-primary/10 dark:bg-primary/20 border border-primary/30 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </a>
                )
              })}
            </nav>
          </div>

          {/* Right: Language Toggle, Theme Toggle & Direct CTA */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2.5">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden sm:inline-flex h-8 items-center justify-center rounded-lg bg-primary hover:bg-primary/90 px-3.5 text-[11px] font-mono font-bold tracking-wider uppercase text-primary-foreground shadow-xs transition-all shrink-0"
            >
              {t("nav.hire")}
            </a>
          </div>

        </div>
      </div>
    </header>
  )
}
