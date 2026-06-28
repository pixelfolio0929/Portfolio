"use client"

import { Section } from "./section"
import { motion } from "framer-motion"
import { Calendar, Briefcase, Sparkles, Code2 } from "lucide-react"

const experiences = [
  {
    company: "Saudi Broadcasting Authority (SBA)",
    role: "SBA UI Developer",
    period: "DEC 2025 - PRESENT",
    description: "Leading the development of highly responsive and fully compliant portal user interfaces. Harmonizing digital platforms with DGA design systems and structural navigation frameworks. Engineering semantic component architectures, FAQ workflows, and sitemap synchronization, ensuring premium RTL support, search optimization, and seamless user journeys.",
    tools: ["React.js", "Next.js", "Tailwind CSS", "DGA Design System", "RTL Arabic Support", "Figma", "Git"]
  },
  {
    company: "Almasons, Mangalore",
    role: "Software Developer",
    period: "FEB 2025 - DEC 2025",
    description: "Architected modern frontend systems using Vue.js and React.js. Engineered responsive, high-performance dashboards, integrated complex REST APIs, built scalable component libraries, and optimized build configurations. Collaborated closely with UI/UX designers to translate high-fidelity designs into pixel-perfect code.",
    tools: ["Vue.js", "React.js", "GitLab", "Python", "Backend Dynamic", "SQL", "Figma", "GitHub"]
  },
  {
    company: "Whitebook World, Bangalore",
    role: "UI - Graphic Designer",
    period: "SEP 2024 - FEB 2025",
    description: "Designed high-fidelity user interface concepts, interactive prototypes, and layouts using Figma and Adobe Photoshop. Established coherent styling standards, visual systems, and asset packs, streamlining the handover process to developers.",
    tools: ["Adobe Photoshop", "Canva", "Figma"]
  },
  {
    company: "Freelance",
    role: "Graphic Designer",
    period: "Near 2022 - 2025",
    description: "Delivered state-of-the-art visual assets, brand identity materials, and motion designs using Premiere Pro, Figma, and Canva. Managed client communications, scoped delivery timelines, and prepared UI mockups aligned with conversion and brand strategy.",
    tools: ["Adobe Photoshop", "Figma", "Adobe Premiere Pro", "Canva"]
  },
]

export function Workflow() {
  return (
    <Section id="Workflow" className="relative overflow-hidden bg-[#050816] py-24">
      {/* Visual background details */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(27,131,84,0.06),transparent_40%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.05] bg-[#0B1120]/80 px-4 py-1.5 text-xs font-mono font-medium text-gray-300 backdrop-blur-md shadow-2xl mb-4"
        >
          <Briefcase size={12} className="text-[#1B8354]" />
          <span>Professional Milestones</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        >
          Professional Experience
        </motion.h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#1B8354] to-transparent mx-auto mt-4"></div>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
        >
          Roles, responsibilities, and the tools I use for each experience.
        </motion.p>
      </div>

      {/* Timeline Section */}
      <div className="relative max-w-4xl mx-auto px-6 z-10">
        {/* Glow Line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#1B8354]/20 via-[#1B8354] to-[#1B8354]/20 transform -translate-x-1/2 hidden md:block" />
        <div className="absolute left-8 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#1B8354]/20 via-[#1B8354] to-[#1B8354]/20 transform -translate-x-1/2 md:hidden" />

        <div className="space-y-16">
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0
            return (
              <div key={exp.company} className="relative flex flex-col md:flex-row md:items-center">
                {/* Desktop layout */}
                <div className={`w-full md:w-1/2 md:pr-12 md:text-right ${isLeft ? "md:order-1" : "md:order-3 md:text-left md:pl-12 md:pr-0"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl border border-white/[0.05] bg-[#0B1120]/40 p-6 shadow-2xl backdrop-blur-md hover:border-[#1B8354]/30 hover:bg-[#0B1120]/60 transition-all duration-300 group cursor-default"
                  >
                    {/* Role & Company */}
                    <div className="flex flex-col gap-1 mb-3">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1B8354] justify-start md:justify-end md:group-hover:justify-end md:group-hover:text-[#1B8354] transition-all">
                        <Calendar size={12} />
                        <span>{exp.period}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mt-1 group-hover:text-[#1B8354] transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-mono font-medium text-gray-400">
                        {exp.company}
                      </p>
                    </div>

                    {/* Wording description */}
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-5 md:text-right text-left">
                      {exp.description}
                    </p>

                    {/* Tools list */}
                    <div className={`flex flex-wrap gap-2 justify-start ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                      {exp.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-[10px] font-mono border border-white/[0.03] bg-white/[0.02] hover:border-[#1B8354]/30 hover:bg-[#1B8354]/5 text-gray-300 hover:text-white px-2.5 py-1 rounded-full transition-all duration-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Timeline center bubble */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20 md:order-2 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-10 h-10 rounded-full border border-[#1B8354] bg-[#050816] shadow-[0_0_15px_rgba(27,131,84,0.4)] flex items-center justify-center text-[#1B8354]"
                  >
                    <Code2 size={16} />
                  </motion.div>
                </div>

                {/* Desktop placeholder spacer */}
                <div className="w-full md:w-1/2 md:order-3 hidden md:block" />
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}