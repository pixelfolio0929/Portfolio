"use client"

import { useEffect, useState } from "react"
import { MobileNav } from "./mobile-nav"
import { ThemeToggle } from "./theme-toggle"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#Workflow" },
    { name: "Why Me", href: "#why-choose-me" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    // Intersection Observer to detect active section
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px",
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

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 dark:bg-background/80 backdrop-blur-xl border-b border-border shadow-sm dark:shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Left Section - Logo (flex-1 to ensure center nav is perfectly centered) */}
          <div className="flex-1 flex items-center justify-start gap-3">
            <MobileNav />
            <a href="#" className="group flex items-center">
              <span className="font-mono text-base md:text-lg font-bold text-foreground tracking-tight group-hover:opacity-80 transition-opacity">
                {"<"}<span className="text-primary">dev</span>{"-portfolio />"}
              </span>
            </a>
          </div>

          {/* Center Section - Floating Nav Pill */}
          <div className="hidden lg:flex items-center justify-center">
            <nav className="flex items-center gap-1 bg-white/70 dark:bg-muted/30 border border-border p-1.5 rounded-full backdrop-blur-md shadow-sm dark:shadow-2xl transition-all">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1) || (activeSection === "Workflow" && item.name === "Experience")
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-full text-[13px] font-sans font-medium transition-colors duration-300 ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-slate-100 dark:bg-white/10 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </a>
                )
              })}
            </nav>
          </div>

          {/* Right Section - CTA & Theme (flex-1 to match left side) */}
          <div className="flex-1 flex items-center justify-end gap-2 sm:gap-4">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden sm:inline-flex h-10 items-center justify-center rounded-full bg-foreground hover:bg-foreground/90 px-6 text-[13px] font-sans font-medium text-background shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all shrink-0"
            >
              Hire Me
            </a>
          </div>

        </div>
      </div>
    </header>
  )
}
