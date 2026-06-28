"use client"

import { Section } from "./section"
import { motion } from "framer-motion"
import { Quote, MessageSquare, Star } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  company: string
  text: string
  stars: number
}

const testimonials: Testimonial[] = [
  {
    name: "Almasons Management",
    role: "Lead Platform Team",
    company: "Almasons",
    text: "Mohammad's command over React and Vue layouts was exceptional. He helped us build high-performance components that scaled perfectly for our production deployments.",
    stars: 5,
  },
  {
    name: "Whitebook Creative Director",
    role: "Creative Director",
    company: "Whitebook World",
    text: "Sinan bridges design and code seamlessly. He consistently translated intricate Figma mockups into beautiful interactive experiences without losing any detail.",
    stars: 5,
  },
  {
    name: "Independent SaaS Founder",
    role: "Founder",
    company: "PixelResume Project",
    text: "He delivered an absolute masterpieces. Real-time ATS compatible Arabic RTL support was crucial and Mohammad solved it beautifully with neat, clean CSS structures.",
    stars: 5,
  },
]

export function Testimonials() {
  // Triple the list to create a seamless infinite scroll loop
  const scrollItems = [...testimonials, ...testimonials, ...testimonials]

  return (
    <Section id="testimonials" className="relative overflow-hidden bg-[#050816] py-24">
      {/* Background glow visual */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,131,84,0.03),transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.05] bg-[#0B1120]/80 px-4 py-1.5 text-xs font-mono font-medium text-gray-300 backdrop-blur-md shadow-2xl mb-4"
          >
            <MessageSquare size={12} className="text-[#1B8354]" />
            <span>Client Endorsements</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Client Testimonials
          </motion.h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#1B8354] to-transparent mx-auto mt-4"></div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
          >
            What colleagues and direct stakeholders say about working with me.
          </motion.p>
        </div>

        {/* Infinite Scroll Testimonial Container */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,#000_15%,#000_85%,transparent_100%)] py-4">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35,
            }}
            className="flex gap-6 w-max"
          >
            {scrollItems.map((item, idx) => (
              <div
                key={idx}
                className="w-[350px] rounded-2xl border border-white/[0.05] bg-[#0B1120]/40 p-6 shadow-xl backdrop-blur-md flex flex-col justify-between shrink-0 hover:border-[#1B8354]/30 hover:bg-[#0B1120]/60 transition-all duration-300 group cursor-default"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: item.stars }).map((_, sIdx) => (
                        <Star key={sIdx} size={12} className="fill-[#1B8354] text-[#1B8354]" />
                      ))}
                    </div>
                    <Quote size={18} className="text-white/10 group-hover:text-[#1B8354]/30 transition-colors" />
                  </div>

                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-6 italic">
                    "{item.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.04]">
                  <p className="text-sm font-bold text-white">{item.name}</p>
                  <p className="text-[10px] font-mono text-gray-500 mt-0.5">
                    {item.role} @ {item.company}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
