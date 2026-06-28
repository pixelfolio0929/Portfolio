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
    name: "Frontend Foundations",
    description: "Building robust, semantic web foundations with clean, accessible code.",
    skills: [
      { name: "HTML5", icon: "FileCode" },
      { name: "CSS3", icon: "Paintbrush" },
      { name: "JavaScript (ES6+)", icon: "Braces" },
      { name: "TypeScript", icon: "Code" },
    ],
    borderColor: "group-hover:border-blue-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
  },
  {
    name: "Frameworks & Libraries",
    description: "Developing dynamic, scalable applications using React and Vue.",
    skills: [
      { name: "React.js", icon: "Atom" },
      { name: "Vue.js", icon: "Flame" },
      { name: "Framer Motion", icon: "Activity" },
    ],
    borderColor: "group-hover:border-purple-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
  },
  {
    name: "Styling & UI Systems",
    description: "Creating responsive, pixel-perfect interfaces with modern styling solutions.",
    skills: [
      { name: "Tailwind CSS", icon: "Wind" },
      { name: "Responsive Design", icon: "Smartphone" },
      { name: "Mobile-First UI", icon: "Monitor" },
      { name: "Reusable Components", icon: "Blocks" },
      { name: "UI Systems", icon: "Layout" },
    ],
    borderColor: "group-hover:border-emerald-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  },
  {
    name: "Workflow & APIs",
    description: "Managing efficient development workflows and secure integrations.",
    skills: [
      { name: "Git & GitHub", icon: "GitBranch" },
      { name: "REST APIs", icon: "Network" },
      { name: "Firebase", icon: "Database" },
      { name: "Webpack", icon: "Settings" },
      { name: "npm/yarn", icon: "Package" },
    ],
    borderColor: "group-hover:border-pink-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]",
  },
  {
    name: "UI/UX & Design Tools",
    description: "Designing user-centered interfaces with industry-standard tools.",
    skills: [
      { name: "Figma", icon: "PenTool" },
      { name: "Adobe Photoshop", icon: "Image" },
      { name: "Framer", icon: "Layers" },
      { name: "Motion Design", icon: "Sparkles" },
    ],
    borderColor: "group-hover:border-amber-500/50",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
  },
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
            className={`group relative rounded-2xl border border-white/[0.05] bg-[#0B1120]/80 p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 ${category.borderColor} ${category.glowColor}`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                  Category 0{idx + 1}
                </span>
                <div className="w-2 h-2 rounded-full bg-[#1B8354] shadow-[0_0_8px_#1B8354]" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2 transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light mb-6">
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
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-white/[0.04] bg-white/[0.02] text-gray-300 hover:text-white hover:border-[#1B8354]/30 hover:bg-[#1B8354]/5 transition-all duration-200"
                  >
                    {IconComponent && <IconComponent size={12} className="text-gray-400" />}
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
