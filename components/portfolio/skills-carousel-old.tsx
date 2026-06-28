"use client"

import { useState } from "react"

interface SkillCategory {
  name: string
  description: string
  skills: string[]
  color: string
  bgColor: string
  borderColor: string
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Foundations",
    description: "Building robust, semantic web foundations with clean, accessible code that ensures cross-browser compatibility and optimal performance",
    skills: ["HTML5", "CSS3", "JavaScript"],
    color: "text-blue-500",
    bgColor: "bg-blue-500/5",
    borderColor: "border-blue-500/20"
  },
  {
    name: "Frameworks & Libraries",
    description: "Developing dynamic, scalable applications using component-based architecture with React and Vue for maintainable, reusable code",
    skills: ["React.js", "Vue.js"],
    color: "text-purple-500",
    bgColor: "bg-purple-500/5",
    borderColor: "border-purple-500/20"
  },
  {
    name: "Styling & UI Engineering",
    description: "Creating responsive, pixel-perfect interfaces with modern styling solutions and component libraries for consistent, maintainable UI systems",
    skills: ["Tailwind CSS", "Responsive Design", "Mobile-First UI", "Reusable Components", ],
    color: "text-amber-500",
    bgColor: "bg-amber-500/5",
    borderColor: "border-amber-500/20"
  },
  {
    name: "Development Tools & Backend",
    description: "Managing efficient development workflows with version control, API integration, and deployment tools to streamline the development process",
    skills: ["Git & GitHub", "MySQL", "Python(Basic)","API Integration", "Firebase" ],
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/5",
    borderColor: "border-emerald-500/20"
  },
  {
    name: "UI/UX & Design Tools",
    description: "Designing user-centered interfaces and collaborating with design teams using industry-standard tools for prototyping and asset creation",
    skills: ["Figma", "Adobe Photoshop", "Framer", "UI/UX Design", "Prototyping"],
    color: "text-violet-500",
    bgColor: "bg-violet-500/5",
    borderColor: "border-violet-500/20"
  },
  
]

export function SkillCarousel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto py-8">
      {skillCategories.map((category, idx) => {
        return (
          <div
            key={`category-${idx}`}
            className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:border-opacity-40 hover:-translate-y-0.5"
          >
            <div className="mb-4">
              <h3 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${category.color.replace('text-', 'bg-')}`}></span>
                {category.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">{category.description}</p>
            </div>
            
            {/* Skills as static tags */}
            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill, skillIdx) => {
                return (
                  <div 
                    key={`skill-${idx}-${skillIdx}`}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium ${category.bgColor} border ${category.borderColor}`}>
                    {skill}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}