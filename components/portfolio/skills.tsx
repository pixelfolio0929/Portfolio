"use client"

import { Section } from "./section"
import { Badge } from "@/components/ui/badge"
import { SkillsMobile } from "./skills-mobile"
import { SkillCarousel } from "./skill-carousel"

export function Skills() {
  return (
    <Section id="skills" className="relative py-16">
      {/* Professional background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <Badge variant="secondary" className="mb-2 sm:mb-3 px-3 py-1 text-sm rounded-full">
            Technology Stack
          </Badge>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
            UI Engineering Toolkit
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xs sm:max-w-2xl mx-auto">
            Frontend technologies and tools I use daily to build modern interfaces
          </p>
        </div>

        <div className="block md:hidden">
          <SkillsMobile />
        </div>
        <div className="hidden md:block">
          <SkillCarousel />
        </div>
      </div>
    </Section>
  )
}