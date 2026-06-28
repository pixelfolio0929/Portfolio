"use client"

import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Skills } from "@/components/portfolio/skills"
import { Services } from "@/components/portfolio/services"
import { Achievements } from "@/components/portfolio/stats"
import { Projects } from "@/components/portfolio/projects"
import { Workflow } from "@/components/portfolio/workflow"
import { WhyChooseMe } from "@/components/portfolio/why-choose-me"
import { Testimonials } from "@/components/portfolio/testimonials"
import { AITools } from "@/components/portfolio/ai-tools"
import { Contact } from "@/components/portfolio/contact"
import { Navbar } from "@/components/portfolio/navbar"
import { ChatBubble } from "@/components/portfolio/chat-bubble"
import { CustomCursor } from "@/components/portfolio/custom-cursor"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

function WorkflowSkeleton() {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div key={item} className="rounded-3xl p-1">
          <div className="rounded-2xl bg-white/90 dark:bg-black/10 backdrop-blur p-6">
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

function AIToolsSkeleton() {
  return (
    <div className="mt-16">
      <div className="text-center mb-6">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-1 w-24 mt-3 mx-auto" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-2xl border p-6">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="mt-4 h-6 w-3/4" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main className="relative bg-[#050816]">
      {/* Premium Cinematic Mouse reactive Glow Cursor */}
      <CustomCursor />

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* Sections */}
      <Hero />
      <About />
      <Skills />
      <Services />
      
      <Achievements />
      <Projects />
      <WhyChooseMe />
      
      <Suspense fallback={<WorkflowSkeleton />}>
        <Workflow />
      </Suspense>
      
      <Testimonials />
      
      <Suspense fallback={<AIToolsSkeleton />}>
        <AITools />
      </Suspense>
      
      <Contact />

      {/* Footer */}
      <footer className="border-t border-white/[0.05] mt-24 bg-gradient-to-b from-[#050816] to-[#0B1120]">
        <div className="mx-auto max-w-6xl px-6 py-12 text-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-gray-400 font-mono text-xs">{"<dev-portfolio />"}</p>
            <p className="text-gray-500 text-xs">{"Crafting digital experiences with code & creativity"}</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#projects" className="hover:text-[#1B8354] text-gray-400 transition-colors font-mono text-xs uppercase tracking-wider">
              View Projects
            </a>
            <a href="#contact" className="hover:text-[#1B8354] text-gray-400 transition-colors font-mono text-xs uppercase tracking-wider">
              Get in touch
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-8 text-center text-[10px] font-mono text-gray-600">
          © {new Date().getFullYear()} Built with React and AI by Mohammad Sinan
        </div>
      </footer>

      {/* Futuristic floating chat assistant bubble */}
      <ChatBubble />
    </main>
  )
}