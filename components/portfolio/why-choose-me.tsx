"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
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
              <motion.div
                key={index}
                className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:border-opacity-40 hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {/* @ts-ignore */}
                    {IconComponent && <IconComponent size={24} />}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        
      </div>
    </Section>
  )
}