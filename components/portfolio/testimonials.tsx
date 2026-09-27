"use client"

import { Section } from "./section"
import { motion } from "framer-motion"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
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
    text: "He delivered an absolute masterpiece. Real-time ATS compatible Arabic RTL support was crucial and Mohammad solved it beautifully with neat, clean CSS structures.",
    stars: 5,
  },
]

export function Testimonials() {
  const scrollItems = [...testimonials, ...testimonials, ...testimonials]

  return (
    <Section id="testimonials" className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Background glow visual */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,131,84,0.04),transparent_65%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-4 py-1.5 text-xs font-mono font-medium text-muted-foreground shadow-sm mb-4"
          >
            <MessageSquare size={13} className="text-primary" />
            <span>Peer &amp; Client Endorsements</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
          >
            Client Testimonials
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
          >
            What colleagues, product leaders, and direct stakeholders say about working with me.
          </motion.p>
        </div>

        {/* Infinite Scroll Testimonial Container */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,#000_15%,#000_85%,transparent_100%)] py-6">
          <motion.div
            animate={{ x: [0, -1080] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35,
            }}
            className="flex gap-6 sm:gap-8 w-max hover:[animation-play-state:paused]"
          >
            {scrollItems.map((item, idx) => (
              <Hover3DCard
                key={idx}
                maxRotate={5}
                depth={15}
                className="w-[320px] sm:w-[380px]"
                contentClassName="h-full rounded-3xl border border-border glass-panel p-7 shadow-sm hover:shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl flex flex-col justify-between group cursor-default"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {Array.from({ length: item.stars }).map((_, sIdx) => (
                        <Star key={sIdx} size={13} className="fill-primary text-primary" />
                      ))}
                    </div>
                    <Quote size={20} className="text-foreground/15 group-hover:text-primary/40 transition-colors" />
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-6 italic">
                    "{item.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-foreground">{item.name}</p>
                    <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                      {item.role} @ {item.company}
                    </p>
                  </div>
                </div>
              </Hover3DCard>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

