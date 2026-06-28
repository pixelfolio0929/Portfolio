"use client"

import { Section } from "./section"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const tools = [
  { name: "Cursor", desc: "AI pair programming" },
  { name: "Copilot", desc: "Inline code suggestions" },
  { name: "Bolt", desc: "Rapid AI app generation" },
  { name: "Lovable", desc: "Iterative product builder" },
  { name: "Gemini", desc: "Google multimodal AI" },
  { name: "Qoder AI", desc: "Automation and code agents" },
]

export function AITools() {
  return (
    <Section id="ai-tools">
      {/* Enhanced header with gradient and decorative elements */}
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          AI Tools
        </h2>
        <div className="h-1 w-24 bg-primary rounded-full mx-auto mt-3"></div>
        <p className="mt-6 text-lg text-muted-foreground">
          {"Boosting productivity with intelligent tooling."}
        </p>
      </div>

      <TooltipProvider>
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {tools.map((t, index) => (
            <Tooltip key={t.name}>
              <TooltipTrigger asChild>
                <div className="rounded-lg border border-border bg-card p-1 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 group cursor-pointer">
                  <div className="rounded-md bg-card h-full flex flex-col items-center justify-center p-6 text-center font-medium group-hover:border-primary/30 transition-all">
                    <div className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-200">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      {t.desc}
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="rounded-md bg-primary text-primary-foreground">
                {t.desc}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </Section>
  )
}