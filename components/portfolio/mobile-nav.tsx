"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Why Me", href: "#why-choose-me" },
    { name: "Experience", href: "#Workflow" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      {/* Mobile menu button */}
<button
         onClick={() => setIsOpen(true)}
         suppressHydrationWarning
         className="md:hidden p-2 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
         aria-label="Open menu"
       >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div 
        className={`fixed top-0 left-0 z-50 h-screen w-3/5 max-w-xs transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="h-screen w-full bg-background border-r border-border shadow-xl">
          <div className="flex flex-col h-full">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-3 border-b border-border">
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-base font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {"<dev />"}
                </span>
<button
                   onClick={() => setIsOpen(false)}
                   suppressHydrationWarning
                   className="p-1.5 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
                   aria-label="Close menu"
                 >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 p-2 overflow-y-auto">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="block py-2 px-3 rounded-lg hover:bg-accent hover:text-primary transition-colors duration-200 text-sm font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Hire me button */}

          </div>
        </div>
      </div>
    </>
  )
}