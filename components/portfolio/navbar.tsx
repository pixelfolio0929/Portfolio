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
          ? "py-3 bg-[#050816]/75 backdrop-blur-xl border-b border-white/[0.05] shadow-2xl"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-3">
          <MobileNav />
          <a
            href="#"
            className="font-mono text-base font-bold bg-gradient-to-r from-emerald-400 to-[#1B8354] bg-clip-text text-transparent tracking-widest"
          >
            {"<dev-portfolio />"}
          </a>
        </div>

        {/* Center Section - Premium Hover Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.02] border border-white/[0.04] p-1 rounded-full backdrop-blur-md shadow-2xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1) || (activeSection === "Workflow" && item.name === "Experience")
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-[#1B8354]/10 border border-[#1B8354]/20 rounded-full -z-10 shadow-[0_0_10px_rgba(27,131,84,0.15)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {item.name}
              </a>
            )
          })}
        </nav>

        {/* Right Section - CTA & Theme Toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden sm:inline-flex h-9 items-center rounded-xl bg-[#1B8354] hover:bg-[#1B8354]/95 px-5 text-xs font-mono font-bold text-white shadow-xl hover:shadow-[0_0_15px_rgba(27,131,84,0.3)] transition-all uppercase tracking-wider shrink-0"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  )
}
