"use client"

import { Section } from "./section"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Sparkles, Layers, ShieldCheck, HeartHandshake } from "lucide-react"

export function About() {
  const badges = ["AI Integration", "React.js", "Vue.js", "HTML", "CSS", "Tailwind CSS", "MySQL", "Python", "Figma", "Adobe Photoshop", "Framer"]

  const stats = [
    { label: "Frontend Architecture", value: "Enterprise", desc: "DGA & SBA compliance compliant systems" },
    { label: "Performance Score", value: "99+", desc: "Buttery-smooth interactions & ultra fast load times" },
    { label: "Design System Bridge", value: "Figma-to-Code", desc: "High fidelity UI translations" },
  ]

  return (
    <Section id="about" fullscreen className="relative overflow-hidden bg-[#050816] py-20">
      {/* Background visual enhancements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(27,131,84,0.06),transparent_40%)] pointer-events-none" />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center max-w-6xl mx-auto w-full relative z-10">
        {/* Left Side - Luxury Glass Photo & Architecture cards */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Portrait Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0B1120]/40 p-2 shadow-2xl w-72 h-96 group"
          >
            <div className="rounded-2xl bg-[#050816]/60 backdrop-blur-lg h-full w-full overflow-hidden relative">
              <Image
                alt="Portrait"
                src="/placeholder-user.jpg"
                width={288}
                height={384}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
            </div>

            {/* Glowing borders */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none border border-transparent group-hover:border-[#1B8354]/40 transition-colors duration-500" />
          </motion.div>

          {/* Floating Feature Card (SBA & DGA Highlight) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -left-4 bottom-12 hidden sm:flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0B1120]/90 p-4 shadow-2xl backdrop-blur-md max-w-xs"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1B8354]/10 flex items-center justify-center text-[#1B8354] shrink-0">
              <Layers size={18} />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-white">SBA & DGA Architect</p>
              <p className="text-[11px] text-gray-400 font-light mt-0.5">Saudi Design Standards & compliance experience</p>
            </div>
          </motion.div>

          {/* Floating UI/UX Workflow Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -right-4 top-12 hidden sm:flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0B1120]/90 p-4 shadow-2xl backdrop-blur-md max-w-xs"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-white">UI/UX Development</p>
              <p className="text-[11px] text-gray-400 font-light mt-0.5">Seamless design-to-code translations</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Interactive Bio & Badges */}
        <div className="space-y-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.05] bg-[#0B1120]/80 px-4 py-1 text-xs font-mono font-medium text-gray-300 backdrop-blur-md"
            >
              <HeartHandshake size={12} className="text-[#1B8354]" />
              <span>Bio & Capabilities</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                About Me
              </h2>
              <div className="h-[2px] w-20 bg-gradient-to-r from-[#1B8354] to-transparent mt-2" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 font-light leading-relaxed"
            >
              I specialize in React and Vue, crafting responsive interfaces that solve real business problems. I bridge design and development to deliver high-performance user experiences with clean, scalable code. I focus heavily on frontend architecture, responsive systems, and intelligent workflows.
            </motion.p>
          </div>

          {/* Stat Cards Layout */}
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                className="rounded-xl border border-white/[0.05] bg-[#0B1120]/50 p-4 shadow-xl backdrop-blur-md"
              >
                <p className="text-lg font-mono font-bold text-white tracking-tight">{stat.value}</p>
                <p className="text-xs font-bold text-[#1B8354] mt-1">{stat.label}</p>
                <p className="text-[10px] text-gray-400 font-light mt-1">{stat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Badges Cloud */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-2 pt-2"
          >
            {badges.map((b, idx) => (
              <Badge
                key={b}
                className="bg-white/[0.02] border border-white/[0.05] hover:border-[#1B8354]/40 hover:bg-[#1B8354]/5 text-gray-300 hover:text-white transition-all duration-300 px-3 py-1.5 rounded-full font-mono text-xs font-medium cursor-default"
              >
                {b}
              </Badge>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a href="#projects">
              <Button className="h-11 px-6 bg-[#1B8354] hover:bg-[#1B8354]/90 text-white rounded-xl shadow-lg transition-all font-mono text-xs font-bold tracking-wider uppercase">
                See my work
              </Button>
            </a>
            <a href="#contact">
              <Button variant="outline" className="h-11 px-6 border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] text-white rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all">
                Get in touch
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}