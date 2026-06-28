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
    name: "Frontend Foundations",
    description: "Building robust, semantic web foundations with clean, accessible code that ensures cross-browser compatibility and optimal performance",
    skills: [
      { name: "HTML5", icon: "FileCode" },
      { name: "CSS3", icon: "Paintbrush" },
      { name: "JavaScript (ES6+)", icon: "Braces" },
      { name: "TypeScript", icon: "Code" },
    ],
    color: "text-blue-500",
    bgColor: "bg-blue-500/5",
    borderColor: "border-blue-500/20"
  },
  {
    name: "Frameworks & Libraries",
    description: "Developing dynamic, scalable applications using component-based architecture with React and Vue for maintainable, reusable code",
    skills: [
      { name: "React.js", icon: "Code" },
      { name: "Vue.js (Options API)", icon: "Code" },
    ],
    color: "text-purple-500",
    bgColor: "bg-purple-500/5",
    borderColor: "border-purple-500/20"
  },
  {
    name: "Styling & UI Engineering",
    description: "Creating responsive, pixel-perfect interfaces with modern styling solutions and component libraries for consistent, maintainable UI systems",
    skills: [
      { name: "Tailwind CSS", icon: "Wind" },
      { name: "Responsive Design", icon: "Smartphone" },
      { name: "Mobile-First UI", icon: "Monitor" },
      { name: "Reusable Components", icon: "Blocks" },
      { name: "Component-Based Architecture", icon: "Component" },
    ],
    color: "text-amber-500",
    bgColor: "bg-amber-500/5",
    borderColor: "border-amber-500/20"
  },
  {
    name: "Development Tools & Workflow",
    description: "Managing efficient development workflows with version control, API integration, and deployment tools to streamline the development process",
    skills: [
      { name: "Git & GitHub", icon: "GitBranch" },
      { name: "REST API Integration", icon: "Network" },
      { name: "Firebase", icon: "Database" },
      { name: "Webpack", icon: "Settings" },
      { name: "npm/yarn", icon: "Package" },
    ],
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/5",
    borderColor: "border-emerald-500/20"
  },
  {
    name: "UI/UX & Design Tools",
    description: "Designing user-centered interfaces and collaborating with design teams using industry-standard tools for prototyping and asset creation",
    skills: [
      { name: "Figma", icon: "PenTool" },
      { name: "Adobe Photoshop", icon: "Image" },
      { name: "Framer", icon: "Layout" },
      { name: "UI/UX Design", icon: "Palette" },
      { name: "Prototyping", icon: "MousePointerClick" },
    ],
    color: "text-violet-500",
    bgColor: "bg-violet-500/5",
    borderColor: "border-violet-500/20"
  },
  {
    name: "Performance & Responsiveness",
    description: "Optimizing user experiences with responsive layouts, performance monitoring, and accessibility compliance to ensure quality across all devices",
    skills: [
      { name: "Responsive Design", icon: "Smartphone" },
      { name: "Cross-Browser Compatibility", icon: "Globe" },
      { name: "Performance Optimization", icon: "Rocket" },
      { name: "Accessibility (WCAG)", icon: "Accessibility" },
      { name: "SEO Best Practices", icon: "Search" },
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
              className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-xl p-3 transition-all duration-300 hover:shadow-md"
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