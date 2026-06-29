"use client"

import { useState, useRef } from "react"
import * as Icons from "lucide-react"

interface Skill {
  name: string
  icon: keyof typeof Icons
}

interface SkillCategory {
  name: string
  description: string
  skills: Skill[]
  color: string
  bgColor: string
  borderColor: string
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
    ],
    color: "text-blue-500",
    bgColor: "bg-blue-500/5",
    borderColor: "border-blue-500/20"
  },
  {
    name: "Frontend Development",
    description: "Building highly interactive, state-driven web applications using modern JavaScript ecosystems.",
    skills: [
      { name: "React.js", icon: "Atom" },
      { name: "Vue.js", icon: "Code" },

      { name: "JavaScript (ES6+)", icon: "Braces" },
      { name: "HTML5 / CSS3", icon: "FileCode" },
    ],
    color: "text-purple-500",
    bgColor: "bg-purple-500/5",
    borderColor: "border-purple-500/20"
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
    color: "text-amber-500",
    bgColor: "bg-amber-500/5",
    borderColor: "border-amber-500/20"
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
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/5",
    borderColor: "border-emerald-500/20"
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
    color: "text-violet-500",
    bgColor: "bg-violet-500/5",
    borderColor: "border-violet-500/20"
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
    color: "text-rose-500",
    bgColor: "bg-rose-500/5",
    borderColor: "border-rose-500/20"
  }
]

export function SkillsMobile() {
  return (
    <div className="py-4">
      {/* Card-based layout for mobile */}
      <div className="space-y-6">
        {skillCategories.map((category, index) => {
          return (
            <div
              key={index}
              className="bg-white dark:bg-card/30 backdrop-blur-xl border border-border/50 rounded-xl p-3 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none"
            >
              <div className="mb-3">
                <h3 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${category.color.replace('text-', 'bg-')}`}></span>
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">{category.description}</p>
              </div>

              {/* Skills as static tags */}
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, skillIndex) => {
                  const SkillIconComponent = Icons[skill.icon]
                  return (
                    <div
                      key={skillIndex}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium ${category.bgColor} border ${category.borderColor}`}
                    >

                      {/* @ts-ignore */}
                      {SkillIconComponent && <SkillIconComponent size={10} className={`text-current ${category.color}`} />}
                      {skill.name}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}