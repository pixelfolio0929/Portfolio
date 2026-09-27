"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Section } from "./section"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import { Button } from "@/components/ui/button"
import { 
  Figma, 
  Code2, 
  Eye, 
  Sliders, 
  Sparkles, 
  Check, 
  Copy, 
  Play,
  Bookmark,
  Volume2
} from "lucide-react"

type ViewMode = "split" | "figma" | "code" | "live"

export function FigmaToCode() {
  const [activeView, setActiveView] = useState<ViewMode>("split")
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false)

  const codeSnippet = `// Live Media Player Component
export function MediaLiveCard({ title, channel, viewers }: MediaProps) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="group relative rounded-2xl border border-border bg-card p-5 shadow-xl transition-all hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-emerald-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          ON AIR
        </span>
        <span className="text-xs font-mono text-muted-foreground">{viewers}</span>
      </div>

      <h3 className="mt-3 text-lg font-bold text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground">{channel}</p>

      <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/60">
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">
          <Play size={14} fill="currentColor" />
          <span>Watch Live</span>
        </button>
      </div>
    </article>
  );
}`

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Section id="figma-to-code" className="relative overflow-hidden py-20 sm:py-28 bg-background border-t border-border/60">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(27,131,84,0.06),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-mono font-medium text-primary mb-4"
          >
            <Sparkles size={14} />
            <span>Interactive Signature Showcase</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-foreground uppercase"
          >
            FIGMA → CODE TRANSFORMATION
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-muted-foreground font-light leading-relaxed text-balance"
          >
            Turning auto-layout design specifications into clean, typed, and accessible React production components.
          </motion.p>
        </div>

        {/* View Mode Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-3 rounded-2xl glass-panel border border-border">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveView("split")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activeView === "split"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Sliders size={14} />
              <span>Split Inspector</span>
            </button>

            <button
              onClick={() => setActiveView("figma")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activeView === "figma"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Figma size={14} />
              <span>Figma Spec</span>
            </button>

            <button
              onClick={() => setActiveView("code")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activeView === "code"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Code2 size={14} />
              <span>React Code</span>
            </button>

            <button
              onClick={() => setActiveView("live")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activeView === "live"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Eye size={14} />
              <span>Live UI</span>
            </button>
          </div>

          <button
            onClick={copyCode}
            className="px-3 py-1.5 rounded-xl border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted transition-all flex items-center gap-1.5"
          >
            {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            <span>{isCopied ? "Copied" : "Copy TSX"}</span>
          </button>
        </div>

        {/* Transformation Canvas Stage */}
        <div className="rounded-3xl border border-border/90 glass-panel shadow-2xl overflow-hidden p-6 sm:p-8">
          {activeView === "split" ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              
              {/* Left Panel: Figma Spec Inspector */}
              <div className="lg:col-span-4 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-card/70 border border-border/80">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
                    <div className="flex items-center gap-2">
                      <Figma size={18} className="text-pink-500" />
                      <span className="text-xs font-mono font-bold text-foreground">Figma Auto-Layout</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20">
                      Auto-Layout v4
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                      <span className="text-muted-foreground block text-[10px] uppercase">Layout Structure</span>
                      <span className="font-bold text-foreground">Vertical Auto-Layout (Gap: 16px)</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                      <span className="text-muted-foreground block text-[10px] uppercase">Padding Token</span>
                      <span className="font-bold text-foreground">padding: 20px (var(--space-5))</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                      <span className="text-muted-foreground block text-[10px] uppercase">Primary Color</span>
                      <span className="font-bold text-emerald-500">brand-primary: #1B8354</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                      <span className="text-muted-foreground block text-[10px] uppercase">Corner Radius</span>
                      <span className="font-bold text-foreground">radius-2xl (16px)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border mt-5 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Design Handoff</span>
                  <span className="text-emerald-500">100% Spec Match</span>
                </div>
              </div>

              {/* Middle Panel: Code Inspector */}
              <div className="lg:col-span-4 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[#0d1117] text-slate-200 border border-border/80 font-mono text-xs">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <div className="flex items-center gap-2">
                      <Code2 size={16} className="text-emerald-400" />
                      <span className="text-xs font-bold text-slate-300">MediaCard.tsx</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      React + TS
                    </span>
                  </div>

                  <pre className="text-[11px] text-emerald-300/90 leading-relaxed overflow-x-auto p-2 bg-slate-900/70 rounded-xl border border-slate-800/80 max-h-[260px]">
                    <code>{codeSnippet}</code>
                  </pre>
                </div>

                <div className="pt-3 border-t border-slate-800 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                  <span>TypeScript Strict</span>
                  <span className="text-emerald-400">Production Ready</span>
                </div>
              </div>

              {/* Right Panel: Live Interactive Preview */}
              <div className="lg:col-span-4 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-card/70 border border-border/80">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
                    <div className="flex items-center gap-2">
                      <Eye size={16} className="text-primary" />
                      <span className="text-xs font-mono font-bold text-foreground">Live Rendered Output</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      Interactive
                    </span>
                  </div>

                  {/* Rendered Live Card */}
                  <Hover3DCard depth={18} maxRotate={5} className="rounded-2xl border border-border/90 bg-card p-5 shadow-xl">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-emerald-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        ON AIR
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">18.4K Live</span>
                    </div>

                    <h4 className="mt-3 text-base font-bold text-foreground">Broadcast Stream Player</h4>
                    <p className="text-xs font-mono text-muted-foreground">Ultra HD 4K Feed</p>

                    <div className="mt-5 flex items-center justify-between pt-3 border-t border-border/60">
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-mono font-bold">
                        Watch Live
                      </Button>
                      <button
                        onClick={() => setIsSaved(!isSaved)}
                        className={`p-2 rounded-xl transition-colors ${
                          isSaved ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </Hover3DCard>
                </div>

                <div className="pt-4 border-t border-border mt-5 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Component Status</span>
                  <span className="text-primary font-bold">60 FPS Render</span>
                </div>
              </div>
            </div>
          ) : activeView === "figma" ? (
            <div className="p-8 text-center">
              <Figma size={40} className="mx-auto text-pink-500 mb-3" />
              <h3 className="text-lg font-bold font-mono text-foreground mb-1">Figma Design Token Hierarchy</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Built with auto-layout v4, strict color variables, component variants, and interactive prototyping.
              </p>
            </div>
          ) : activeView === "code" ? (
            <div className="p-6 bg-[#0d1117] rounded-2xl text-slate-200 font-mono text-xs overflow-x-auto">
              <pre className="text-emerald-300"><code>{codeSnippet}</code></pre>
            </div>
          ) : (
            <div className="p-6 max-w-sm mx-auto">
              <Hover3DCard depth={20} className="rounded-3xl border border-border bg-card p-6 shadow-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-emerald-500 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </span>
                <h3 className="text-base font-bold text-foreground">Digital Media Suite</h3>
                <p className="text-xs font-mono text-muted-foreground mb-4">Production Component</p>
                <Button className="w-full bg-primary text-primary-foreground font-mono font-bold text-xs">
                  Trigger Action
                </Button>
              </Hover3DCard>
            </div>
          )}
        </div>

      </div>
    </Section>
  )
}
