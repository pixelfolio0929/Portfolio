"use client"

import { Section } from "./section"
import { motion } from "framer-motion"
import { Calendar, Briefcase, Sparkles, Code2 } from "lucide-react"

const experiences = [
  {
    company: "Saudi Broadcasting Authority (SBA)",
    role: "UI Engineer / Frontend Developer",
    period: "DEC 2025 - PRESENT",
    location: "Riyadh, Saudi Arabia",
    description: "Developing responsive user interfaces for enterprise web applications aligned with the Saudi Government Design System (DGA). Translating Figma designs into production-ready, pixel-accurate interfaces. Building reusable frontend components and maintaining consistency across enterprise applications. Supporting Arabic RTL interfaces and optimizing layouts across desktop, tablet, and mobile. Working within ASP.NET Web Forms projects with a focus on frontend implementation — styling existing controls with modern CSS and enhancing user experience without affecting backend functionality. Collaborating with UI/UX designers, backend developers, and stakeholders throughout the product lifecycle. Improving accessibility, usability, and maintaining a scalable CSS architecture.",
    tools: ["HTML5", "CSS3", "JavaScript", "ASP.NET Web Forms (Frontend)", "DGA Design System", "Figma", "Responsive Design", "RTL Arabic Support", "Git", "Tailwind CSS"]
  },
  {
    company: "Almasons, Mangalore",
    role: "Frontend Developer",
    period: "FEB 2025 - DEC 2025",
    description: "Architected modern frontend systems using Vue.js and React.js. Engineered responsive, high-performance dashboards, integrated complex REST APIs, built scalable component libraries, and optimized build configurations. Collaborated closely with UI/UX designers to translate high-fidelity designs into pixel-perfect code.",
    tools: ["Vue.js", "React.js", "GitLab", "REST APIs", "SQL", "Figma", "GitHub"]
  },
  {
    company: "Whitebook World, Bangalore",
    role: "UI Designer",
    period: "SEP 2024 - FEB 2025",
    description: "Designed high-fidelity user interface concepts, interactive prototypes, and layouts using Figma and Adobe Photoshop. Established coherent styling standards, visual systems, and asset packs, streamlining the handover process to developers.",
    tools: ["Figma", "Adobe Photoshop", "Canva"]
  },
  {
    company: "Freelance",
    role: "Graphic Designer",
    period: "Near 2022 - 2025",
    description: "Delivered visual assets, brand identity materials, and motion designs. Managed client communications, scoped delivery timelines, and prepared UI mockups aligned with conversion and brand strategy.",
    tools: ["Adobe Photoshop", "Figma", "Adobe Premiere Pro", "Canva"]
  },
]

export function Workflow() {
  return (
    <Section id="Workflow" className="relative overflow-hidden bg-background py-24">
      {/* Visual background details */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_bottom_left,rgba(27,131,84,0.06),transparent_40%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white dark:bg-card/80 px-4 py-1.5 text-xs font-mono font-medium text-muted-foreground backdrop-blur-md shadow-sm dark:shadow-2xl mb-4"
        >
          <Briefcase size={12} className="text-primary" />
          <span>Professional Milestones</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
        >
          Professional Experience
        </motion.h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4"></div>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
        >
          Roles, responsibilities, and the tools I use for each experience.
        </motion.p>
      </div>

      {/* Timeline Section */}
      <div className="relative max-w-4xl mx-auto px-6 z-10">
        {/* Glow Line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary/20 via-primary to-primary/20 transform -translate-x-1/2 hidden md:block" />
        <div className="absolute left-8 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary/20 via-primary to-primary/20 transform -translate-x-1/2 md:hidden" />

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
                    className="rounded-2xl border border-border bg-white dark:bg-card/40 p-6 shadow-sm hover:shadow-md dark:shadow-2xl backdrop-blur-md hover:border-primary/30 dark:hover:bg-card/60 transition-all duration-300 group cursor-default"
                  >
                    {/* Role & Company */}
                    <div className="flex flex-col gap-1 mb-3">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary justify-start md:justify-end md:group-hover:justify-end md:group-hover:text-primary transition-all">
                        <Calendar size={12} />
                        <span>{exp.period}</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mt-1 group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-mono font-medium text-muted-foreground">
                        {exp.company}
                      </p>
                    </div>

                    {/* Wording description */}
                    <p className="text-xs text-muted-foreground font-light leading-relaxed mb-5 md:text-right text-left">
                      {exp.description}
                    </p>

                    {/* Tools list */}
                    <div className={`flex flex-wrap gap-2 justify-start ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                      {exp.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-[10px] font-mono border border-transparent dark:border-border bg-slate-100 dark:bg-muted/50 hover:bg-slate-200 dark:hover:border-primary/30 dark:hover:bg-primary/5 text-slate-700 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground px-2.5 py-1 rounded-full transition-all duration-300"
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
                    className="w-10 h-10 rounded-full border border-primary bg-white dark:bg-background shadow-sm hover:shadow-md dark:shadow-[0_0_15px_rgba(27,131,84,0.4)] flex items-center justify-center text-primary transition-all"
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