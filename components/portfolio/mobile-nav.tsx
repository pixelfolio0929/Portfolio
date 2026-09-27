"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { useLanguage } from "./language-context"
import { LanguageToggle } from "./language-toggle"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, isRTL } = useLanguage()

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

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

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="xl:hidden p-2 rounded-xl bg-muted/50 border border-border/80 text-foreground hover:bg-muted focus:outline-none transition-colors cursor-pointer"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md xl:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div 
        className={`fixed top-0 ${isRTL ? "right-0" : "left-0"} z-50 h-screen w-4/5 max-w-xs transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"
        } xl:hidden`}
      >
        <div className={`h-screen w-full bg-background/95 ${isRTL ? "border-l" : "border-r"} border-border backdrop-blur-2xl shadow-2xl flex flex-col justify-between p-6 overflow-y-auto`}>
          <div>
            {/* Header with close button */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <span className="font-mono text-sm font-bold text-foreground">
                {"<"}<span className="text-primary">UI</span>{"Developer />"}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-muted/60 text-muted-foreground hover:text-foreground border border-border transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Language toggle inside drawer */}
            <div className="pt-4 pb-2 flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground">{isRTL ? "اللغة / Language" : "Language / اللغة"}</span>
              <LanguageToggle />
            </div>

            {/* Navigation links */}
            <nav className="pt-3">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-primary/10 hover:text-primary text-muted-foreground font-mono text-xs font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight size={12} className="opacity-60" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="pt-4 border-t border-border space-y-2 mt-4">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full h-10 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-wider shadow-xs"
            >
              {t("nav.hire")}
            </a>
            <p className="text-center text-[10px] font-mono text-muted-foreground">
              Mohammad Sinan • UI Engineer, Riyadh
            </p>
          </div>
        </div>
      </div>
    </>
  )
}