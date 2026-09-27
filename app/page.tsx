"use client"

import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Capabilities } from "@/components/portfolio/capabilities"
import { Projects } from "@/components/portfolio/projects"
import { SBACaseStudy } from "@/components/portfolio/sba-case-study"
import { DesignSystemPlayground } from "@/components/portfolio/design-system-playground"
import { RTLResponsiveShowcase } from "@/components/portfolio/rtl-responsive-showcase"
import { FinalStatement } from "@/components/portfolio/final-statement"
import { Workflow } from "@/components/portfolio/workflow"
import { Skills } from "@/components/portfolio/skills"
import { AITools } from "@/components/portfolio/ai-tools"
import { Contact } from "@/components/portfolio/contact"
import { Navbar } from "@/components/portfolio/navbar"
import { ChatBubble } from "@/components/portfolio/chat-bubble"
import { CustomCursor } from "@/components/portfolio/custom-cursor"
import { useLanguage } from "@/components/portfolio/language-context"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

function WorkflowSkeleton() {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div key={item} className="rounded-3xl p-1">
          <div className="rounded-2xl bg-white dark:bg-black/10 backdrop-blur p-6 border border-border">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="mt-4 h-6 w-3/4" />
            <Skeleton className="mt-2 h-4 w-1/2" />
            <div className="mt-6 flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Page() {
  const { isRTL, t } = useLanguage()

  return (
    <main className="relative bg-slate-50 dark:bg-background transition-colors duration-300">
      {/* Studio Cursor Spotlight */}
      <CustomCursor />

      {/* Floating Dynamic Navbar */}
      <Navbar />

      {/* 1. HERO: UI Engineer · Frontend Developer */}
      <Hero />

      {/* 2. PROFILE / ABOUT: Bridging Visual Design & Frontend Engineering */}
      <About />

      {/* 3. FOCUS / CAPABILITIES: 4 Core Capability Areas */}
      <Capabilities />

      {/* 4. SELECTED WORK: Clean Project Cards with direct links */}
      <Projects />

      {/* 5. SBA / GOVERNMENT DIGITAL EXPERIENCE: Public-safe Enterprise & DGA Standards */}
      <SBACaseStudy />

      {/* 6. DESIGN SYSTEMS: Design → System → Components → Code Live Tokens */}
      <DesignSystemPlayground />

      {/* 7. ARABIC RTL & RESPONSIVE MATRIX: Live Direction & Viewport Simulator */}
      <RTLResponsiveShowcase />

      {/* 8. HOW I WORK & EDITORIAL PHILOSOPHY: 5-Step Process (Understand → Design → Systemize → Develop → Refine) */}
      <FinalStatement />

      {/* 9. EXPERIENCE TIMELINE: SBA 2026-Present, Almasons, Whitebook World, Freelance */}
      <Suspense fallback={<WorkflowSkeleton />}>
        <Workflow />
      </Suspense>

      {/* 10. SKILLS / STACK: Categorized Stack + Currently Learning Angular */}
      <Skills />

      {/* 11. AI-ASSISTED WORKFLOW: Secondary Tooling Accelerators */}
      <AITools />

      {/* 12. CONTACT & HIRE: Clean Directory & Message Form */}
      <Contact />

      {/* Clean Professional Footer */}
      <footer className="border-t border-border mt-16 sm:mt-20 bg-white dark:bg-gradient-to-b dark:from-background dark:to-secondary">
        <div className="mx-auto max-w-6xl px-6 py-12 text-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
            <p className="text-muted-foreground font-mono text-xs">{"<sinan-ui-Devevloper />"}</p>
            <p className="text-muted-foreground/80 text-xs font-light">
              {isRTL
                ? "تصميم الواجهات. هندسة النظم البرمجية والتجارب الرقمية. الرياض، المملكة العربية السعودية."
                : "Designing interfaces. Engineering systems. Building for the real world in Riyadh, Saudi Arabia."}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="#about" className="hover:text-primary text-muted-foreground transition-colors font-mono text-xs uppercase tracking-wider">
              {t("nav.about")}
            </a>
            <a href="#capabilities" className="hover:text-primary text-muted-foreground transition-colors font-mono text-xs uppercase tracking-wider">
              {t("nav.capabilities")}
            </a>
            <a href="#projects" className="hover:text-primary text-muted-foreground transition-colors font-mono text-xs uppercase tracking-wider">
              {t("nav.projects")}
            </a>
            <a href="#government-ui" className="hover:text-primary text-muted-foreground transition-colors font-mono text-xs uppercase tracking-wider">
              {t("nav.gov")}
            </a>
            <a href="#experience" className="hover:text-primary text-muted-foreground transition-colors font-mono text-xs uppercase tracking-wider">
              {t("nav.experience")}
            </a>
            <a href="#contact" className="hover:text-primary text-muted-foreground transition-colors font-mono text-xs uppercase tracking-wider">
              {t("nav.contact")}
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-8 text-center text-[10px] font-mono text-muted-foreground/60">
          © {new Date().getFullYear()} {isRTL ? "محمد سنان • مهندس واجهات مستخدم، الرياض" : "Mohammad Sinan • UI Engineer, Riyadh"}
        </div>
      </footer>

      {/* Interactive Floating Assistant */}
      <ChatBubble />
    </main>
  )
}