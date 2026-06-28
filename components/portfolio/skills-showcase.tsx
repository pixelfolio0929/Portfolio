"use client"

import { useState, useEffect, useRef } from "react"
import React from "react"
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
    name: "Frontend Engineering",
    description: "Core web technologies for building responsive, performant interfaces",
    skills: [
      { name: "HTML5", icon: "FileCode" },
      { name: "CSS3", icon: "Paintbrush" },
      { name: "JavaScript (ES6+)", icon: "Braces" },
      { name: "React.js", icon: "Code" },
      { name: "Vue.js (Options API)", icon: "Code" },
      { name: "Tailwind CSS", icon: "Wind" },
    ],
    color: "text-blue-500",
    bgColor: "bg-blue-500/5",
    borderColor: "border-blue-500/20"
  },
  {
    name: "UI Development & Architecture",
    description: "Building scalable, reusable UI components and systems",
    skills: [
      { name: "Responsive Design", icon: "Smartphone" },
      { name: "Mobile-First UI", icon: "Monitor" },
      { name: "Dashboard UI", icon: "LayoutDashboard" },
      { name: "Reusable Components", icon: "Blocks" },
      { name: "Component-Based Architecture", icon: "Component" },
      { name: "Cross-Browser Compatibility", icon: "Globe" },
    ],
    color: "text-purple-500",
    bgColor: "bg-purple-500/5",
    borderColor: "border-purple-500/20"
  },
  {
    name: "UI/UX & Design Tools",
    description: "Design tools for creating and implementing UI/UX concepts",
    skills: [
      { name: "Figma", icon: "PenTool" },
      { name: "Framer", icon: "Layout" },
      { name: "Adobe Photoshop", icon: "Image" },
      { name: "Canva", icon: "Palette" },
    ],
    color: "text-amber-500",
    bgColor: "bg-amber-500/5",
    borderColor: "border-amber-500/20"
  },
  {
    name: "Backend Support & Workflow",
    description: "API integration and development workflow tools",
    skills: [
      { name: "REST API Integration", icon: "Network" },
      { name: "Firebase", icon: "Database" },
      { name: "Python (Basics)", icon: "Code" },
      { name: "MySQL (Basics)", icon: "Database" },
      { name: "Git & GitHub", icon: "GitBranch" },
      { name: "Debugging", icon: "Bug" },
      { name: "Version Control", icon: "History" },
    ],
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/5",
    borderColor: "border-emerald-500/20"
  }
]

export function SkillsShowcase() {
  return (
    <div className="py-4 sm:py-8">
      {/* Card-based layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        {skillCategories.map((category, index) => (
          <div 
            key={index}
            className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-opacity-40 hover:-translate-y-1 hover:scale-[1.02] group cursor-pointer"
          >
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
            
            {/* Skills as tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {category.skills.map((skill, skillIndex) => {
                const IconComponent = Icons[skill.icon]
                return (
                  <div 
                    key={skillIndex}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${category.bgColor} border ${category.borderColor} transition-all duration-300 group-hover:scale-105`}>
                    {/* @ts-ignore */}
                    {IconComponent && <IconComponent size={12} className={`text-current ${category.color}`} />}
                    {skill.name}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}