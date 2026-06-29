"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import * as Icons from "lucide-react"

interface Feature {
  title: string;
  description: string;
  icon: keyof typeof Icons;
}

const features: Feature[] = [
  {
    title: "Design-to-Code Bridge",
    description: "Expert in transforming UI/UX designs into pixel-perfect, production-ready, responsive interfaces.",
    icon: "LayoutDashboard"
  },
  {
    title: "Modern Frontend Stack",
    description: "Hands-on experience with React, Vue, and Tailwind CSS for scalable and maintainable UI architectures.",
    icon: "Code"
  },
  {
    title: "Collaborative Approach",
    description: "Strong communicator working closely with designers, product managers, and stakeholders.",
    icon: "Users"
  },
  {
    title: "User-Centered Focus",
    description: "Emphasis on usability, performance, and visual consistency.",
    icon: "UserCheck"
  },
  {
    title: "Business-Oriented Delivery",
    description: "Results-driven mindset delivering production-ready UI systems aligned with business goals.",
    icon: "TrendingUp"
  },
  {
    title: "Quality & Performance",
    description: "Clean, scalable code optimized for performance, accessibility, and cross-browser compatibility.",
    icon: "ShieldCheck"
  }
]

export function WhyChooseMe() {
  return (
    <Section id="why-choose-me" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Me as a UI Developer
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Bridging UI/UX design and frontend development for exceptional digital experiences
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = Icons[feature.icon as keyof typeof Icons];
            return (
              <Hover3DCard key={feature.title} className="w-full" contentClassName="flex flex-col h-full p-6 sm:p-8 rounded-3xl border border-border bg-white dark:bg-card/40 backdrop-blur-sm shadow-sm hover:shadow-md dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-primary/10 flex items-center justify-center text-primary mb-6">
                  {/* @ts-ignore */}
                  {IconComponent && <IconComponent size={24} />}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </Hover3DCard>
            )
          })}
        </div>

        
      </div>
    </Section>
  )
}