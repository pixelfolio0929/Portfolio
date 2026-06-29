"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"

interface Skill {
  name: string
  icon: keyof typeof Icons
}

interface SkillCategory {
  name: string
  description: string
  skills: Skill[]
  borderColor: string
  glowColor: string
}

const skillCategories: SkillCategory[] = [
  {
    name: "UI Engineering & Design Systems",
    description: "Architecting scalable design systems and translating complex designs into pixel-perfect, accessible components.",
    skills: [
      { name: "UI Engineering", icon: "Code" },
      { name: "Design Systems", icon: "Component" },
      { name: "Design-to-Code", icon: "PenTool" },
      { name: "Component Architecture", icon: "Blocks" },
      { name: "Accessibility (WCAG)", icon: "Accessibility" },
    ],
    borderColor: "group-hover:border-blue-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
  },
  {
    name: "Frontend Development",
    description: "Building highly interactive, state-driven web applications using modern JavaScript ecosystems.",
    skills: [
      { name: "React.js", icon: "Atom" },
      { name: "JavaScript (ES6+)", icon: "Braces" },
      { name: "TypeScript (Learning)", icon: "BookOpen" },
      { name: "HTML5 / CSS3", icon: "FileCode" },
      { name: "REST APIs", icon: "Network" },
    ],
    borderColor: "group-hover:border-purple-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
  },
  {
    name: "Styling & Layout Systems",
    description: "Crafting fluid, responsive interfaces with utility-first frameworks and modern CSS architecture.",
    skills: [
      { name: "Tailwind CSS", icon: "Wind" },
      { name: "Sass (SCSS)", icon: "Paintbrush" },
      { name: "Responsive Design", icon: "Smartphone" },
      { name: "Pixel-Perfect UI", icon: "Target" },
      { name: "Bootstrap", icon: "Layout" },
    ],
    borderColor: "group-hover:border-amber-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
  },
  {
    name: "UI/UX & Prototyping",
    description: "Creating user-centered experiences, wireframes, and managing design tokens for consistent UI.",
    skills: [
      { name: "UI & UX Design", icon: "Palette" },
      { name: "Figma & Framer", icon: "PenTool" },
      { name: "Design Tokens", icon: "Hash" },
      { name: "Prototyping", icon: "MousePointerClick" },
      { name: "Interaction Design", icon: "MousePointer2" },
    ],
    borderColor: "group-hover:border-emerald-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  },
  {
    name: "Enterprise & Gov Platforms",
    description: "Developing secure, compliant interfaces for large-scale government and enterprise applications.",
    skills: [
      { name: "Gov Digital Platforms", icon: "Landmark" },
      { name: "Enterprise UI", icon: "Building2" },
      { name: "ASP.NET (Learning)", icon: "BookOpen" },
      { name: "SQL & MySQL", icon: "Database" },
      { name: "Master Pages", icon: "Layout" },
    ],
    borderColor: "group-hover:border-violet-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]",
  },
  {
    name: "Workflow & Optimization",
    description: "Utilizing modern deployment pipelines, version control, and optimizing frontend performance.",
    skills: [
      { name: "Git & GitHub", icon: "GitBranch" },
      { name: "Vercel & Netlify", icon: "Cloud" },
      { name: "Render Deployment", icon: "Server" },
      { name: "Performance Tuning", icon: "Zap" },
      { name: "Cross-Browser Sync", icon: "Globe" },
    ],
    borderColor: "group-hover:border-rose-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]",
  }
]

export function SkillCarousel() {
  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      {/* 5-Column Grid with clean spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className={`group relative rounded-2xl border border-border bg-white dark:bg-card/80 p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none ${category.borderColor} ${category.glowColor}`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">
                  Category 0{idx + 1}
                </span>
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2 transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light mb-6">
                {category.description}
              </p>
            </div>

            {/* Skills Tag Cloud */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {category.skills.map((skill, sIdx) => {
                const IconComponent = (Icons[skill.icon] || Icons.Code) as React.ComponentType<{ size?: number; className?: string }>
                return (
                  <div
                    key={sIdx}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-transparent dark:border-border bg-slate-100 dark:bg-muted/50 text-slate-700 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground hover:bg-slate-200 dark:hover:border-primary/30 dark:hover:bg-primary/5 transition-all duration-200"
                  >
                    {IconComponent && <IconComponent size={12} className="text-muted-foreground" />}
                    {skill.name}
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
