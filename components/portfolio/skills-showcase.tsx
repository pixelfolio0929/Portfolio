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
      { name: "Bootstrap", icon: "Layout" },
      { name: "CSS Grid & Flexbox", icon: "LayoutGrid" },
      { name: "RTL Arabic Support", icon: "AlignRight" },
      { name: "Cross-browser Compatibility", icon: "Globe" },
      { name: "Semantic HTML", icon: "FileCode2" },
      { name: "Responsive Web Design", icon: "Smartphone" },
    ],
    color: "text-blue-500",
    bgColor: "bg-blue-500/5",
    borderColor: "border-blue-500/20"
  },
  {
    name: "ASP.NET Frontend Integration",
    description: "Frontend implementation inside ASP.NET projects (foundational knowledge — HTML/CSS/JS focus)",
    skills: [
      { name: "ASP.NET Web Forms (Frontend)", icon: "FileCode" },
      { name: "Styling Web Forms Controls", icon: "Paintbrush" },
      { name: "CSS Integration in ASP.NET", icon: "Layout" },
      { name: "UI Enhancement (Frontend Only)", icon: "Monitor" },
    ],
    color: "text-violet-500",
    bgColor: "bg-violet-500/5",
    borderColor: "border-violet-500/20"
  },
  {
    name: "UI/UX & Design Tools",
    description: "Design tools for creating and implementing UI/UX concepts",
    skills: [
      { name: "Figma", icon: "PenTool" },
      { name: "Wireframing", icon: "Layout" },
      { name: "Prototyping", icon: "Layers" },
      { name: "Design Systems", icon: "Blocks" },
      { name: "Adobe Photoshop", icon: "Image" },
      { name: "Canva", icon: "Palette" },
    ],
    color: "text-amber-500",
    bgColor: "bg-amber-500/5",
    borderColor: "border-amber-500/20"
  },
  {
    name: "Backend Support & Workflow",
    description: "API integration, databases, and development workflow tools",
    skills: [
      { name: "Firebase", icon: "Database" },
      { name: "REST APIs", icon: "Network" },
      { name: "Python (Basics)", icon: "Terminal" },
      { name: "MySQL (Basics)", icon: "Database" },
      { name: "Git & GitHub", icon: "GitBranch" },
      { name: "VS Code", icon: "Code2" },
      { name: "Debugging", icon: "Bug" },
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
            className="bg-white dark:bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-xl hover:border-opacity-40 hover:-translate-y-1 hover:scale-[1.02] group cursor-pointer"
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