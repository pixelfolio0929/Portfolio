"use client"

import { Section } from "./section"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Github, FolderGit, Sparkles, LayoutDashboard } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Project = {
  title: string
  problemStatement: string
  solution: string
  techStack: string[]
  keyFeatures: string[]
  roleContribution: string
  image: string
  tags: string[]
  live?: string
  repo?: string
}

const projects: Project[] = [
  {
    title: "AI Pixel Hub",
    problemStatement: "Businesses needed a centralized platform to collect and analyze data from various AI tools and courses to make informed decisions about AI adoption.",
    solution: "Built a comprehensive dashboard that aggregates data from multiple AI sources, providing analytics and insights to help businesses evaluate AI tools effectively.",
    techStack: ["React.js", "Firebase", "Google Analytics", "API Integration"],
    keyFeatures: [
      "Real-time data aggregation from multiple AI tools",
      "Interactive analytics dashboard with visual insights",
      "Custom reporting capabilities",
      "Responsive design for cross-device accessibility"
    ],
    roleContribution: "Implemented the frontend architecture, UI components, and data visualization features while ensuring seamless API integration.",
    image: "/ai-dashboard-preview.jpg",
    tags: ["React.js", "AI", "Analytics", "Firebase", "Google Console"],
    live: "https://aipixelhubb.netlify.app/",
  },
  {
    title: "AI-Powered SaaS Landing Page",
    problemStatement: "SaaS companies required a modern, conversion-focused landing page to showcase their AI-powered products and engage potential customers.",
    solution: "Created a responsive landing page with interactive elements that effectively communicate product value propositions and drive conversions.",
    techStack: ["React", "TailwindCSS", "GSAP Animations", "Responsive Design"],
    keyFeatures: [
      "Conversion-optimized layout with strategic call-to-actions",
      "Smooth animations to enhance user engagement",
      "Mobile-first responsive design",
      "Performance optimized for fast loading"
    ],
    roleContribution: "Designed and implemented the entire frontend, focusing on UI/UX best practices and performance optimization.",
    image: "/saas-builder-preview.jpg",
    tags: ["React", "TailwindCSS", "UI/UX", "SaaS"],
    live: "https://aipoweredbuilder.netlify.app/",
  },
  {
    title: "PixelResume",
    problemStatement: "Job seekers needed a professional resume builder that supports multilingual resumes with RTL compatibility and ATS-friendly exports.",
    solution: "Developed a comprehensive resume builder supporting Arabic and English languages with real-time editing and ATS-compatible PDF generation.",
    techStack: ["React.js", "Tailwind CSS", "PDF Generation", "i18n"],
    keyFeatures: [
      "Dual language support with Arabic RTL compatibility",
      "Live editing with real-time preview",
      "ATS-friendly PDF export",
      "Multiple customizable resume templates"
    ],
    roleContribution: "Built the entire frontend, implemented RTL support, designed UI components, and integrated PDF generation functionality.",
    image: "/pixelresume-preview.jpg",
    tags: ["React.js", "Tailwind CSS", "RTL Support", "Arabic Localization", "Responsive UI"],
    live: "https://pixelresume.netlify.app/"
  },
  {
    title: "Portfolio UI/UX",
    problemStatement: "Needed to showcase design and development capabilities through a modern, interactive portfolio that demonstrates UI/UX expertise.",
    solution: "Created a portfolio interface using Framer to demonstrate advanced UI/UX skills with smooth interactions and modern design principles.",
    techStack: ["Framer", "UI/UX Design", "Prototyping", "Interaction Design"],
    keyFeatures: [
      "Smooth, performance-optimized animations",
      "Intuitive navigation and user flows",
      "Modern design system implementation",
      "Cross-platform compatibility"
    ],
    roleContribution: "Designed and developed the entire interface, focusing on UX best practices and implementing complex interactions.",
    image: "/ai-portfolio-generator-preview.jpg",
    tags: ["Framer", "UI/UX", "Portfolio", "Design", "Interactive"],
    live: "https://mohammadsinan.framer.website/",
  },
  {
    title: "Travel Hub",
    problemStatement: "Travel enthusiasts required an engaging platform to explore destinations with rich interactive features and intuitive browsing.",
    solution: "Built a travel-themed application using Vue.js that showcases destinations with interactive maps and detailed information.",
    techStack: ["Vue.js", "Vuex", "API Integration", "Interactive Maps"],
    keyFeatures: [
      "Interactive destination discovery interface",
      "Detailed location information and recommendations",
      "Search and filtering capabilities",
      "Responsive design for travel planning on any device"
    ],
    roleContribution: "Implemented the Vue.js frontend architecture, interactive components, and API integrations for destination data.",
    image: "/wms-app-preview.jpg",
    tags: ["Vue.js", "Frontend", "UI/UX", "Interactive"],
    live: "https://travelfolio.netlify.app/",
  },
  {
    title: "Foodies Heaven",
    problemStatement: "Restaurant businesses needed an online platform to showcase their menu and accept orders with a focus on user experience.",
    solution: "Created a food-themed e-commerce platform with payment integration and engaging UI to enhance customer ordering experience.",
    techStack: ["React", "Payment Integration", "Stripe API", "Animations"],
    keyFeatures: [
      "Secure payment processing integration",
      "Engaging food presentation with animations",
      "Shopping cart functionality",
      "Responsive design for mobile ordering"
    ],
    roleContribution: "Developed the frontend UI, implemented payment integration, and created interactive elements to enhance user experience.",
    image: "/foodies heaven.jpg",
    tags: ["React", "Payment Integration", "HTML", "CSS", "JavaScript"],
    live: "https://foodieshub12.netlify.app/",
  },
  {
    title: "AI Weather Forecast",
    problemStatement: "Users needed accurate, real-time weather forecasts with location-based services and intuitive data visualization.",
    solution: "Built a weather application that provides real-time forecasts with location services and interactive data visualization.",
    techStack: ["React", "Weather API", "Geolocation", "Chart.js"],
    keyFeatures: [
      "Real-time weather data visualization",
      "Location-based weather forecasts",
      "Interactive charts and graphs",
      "Responsive design for on-the-go access"
    ],
    roleContribution: "Implemented the frontend architecture, API integration for weather data, geolocation services, and data visualization.",
    image: "/realtime-chat-preview.jpg",
    tags: ["React", "AI Weather checker", "API Integration", "Geolocation", "Data Visualization"],
    live: "https://weatherchick.netlify.app/",
  },
  {
    title: "Working on Project",
    problemStatement: "Currently developing innovative solutions to address emerging market needs and technological challenges.",
    solution: "Stay tuned for an exciting new project that demonstrates cutting-edge development capabilities and solves real-world problems.",
    techStack: ["Coming Soon"],
    keyFeatures: [
      "Innovative solution to be announced",
      "Cutting-edge technology implementation",
      "User-centric design approach",
      "Scalable architecture"
    ],
    roleContribution: "Leading the design and development of this upcoming project with focus on modern best practices.",
    image: "/placeholder.svg",
    tags: ["Coming Soon"],
    live: "",
  },
  {
    title: "Development Phase",
    problemStatement: "Exploring new technologies and methodologies to expand development capabilities and solve complex problems.",
    solution: "Building next-generation solutions that leverage emerging technologies to deliver exceptional user experiences.",
    techStack: ["Coming Soon"],
    keyFeatures: [
      "Advanced features to be announced",
      "Modern development practices",
      "Performance-optimized solutions",
      "Innovative user interfaces"
    ],
    roleContribution: "Architecting and developing upcoming projects with focus on scalability and maintainability.",
    image: "/placeholder.svg",
    tags: ["Coming Soon"],
    live: "",
  },
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filter, setFilter] = useState<string>("All")

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedProject(null)
  }

  // Categories
  const categories = ["All", "React.js", "Vue.js", "Framer", "AI"]

  const filteredProjects = projects.filter(p => {
    if (filter === "All") return true
    if (filter === "AI") return p.tags.includes("AI") || p.title.toLowerCase().includes("ai")
    return p.tags.includes(filter) || p.techStack.includes(filter)
  })

  return (
    <Section id="projects" className="relative overflow-hidden bg-[#050816] py-24" variant="project">
      {/* Visual background details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,131,84,0.05),transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.05] bg-[#0B1120]/80 px-4 py-1.5 text-xs font-mono font-medium text-gray-300 backdrop-blur-md shadow-2xl mb-4"
            >
              <LayoutDashboard size={12} className="text-[#1B8354]" />
              <span>Showcase Showcase</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Professional Projects
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-400 font-light max-w-2xl leading-relaxed">
              Business-focused solutions demonstrating problem-solving and technical expertise.
            </p>
          </div>
          <a href="#contact">
            <Button className="h-11 px-6 bg-[#1B8354] hover:bg-[#1B8354]/90 text-white rounded-xl shadow-lg transition-all font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2 shrink-0">
              <span>Work With Me</span>
              <ExternalLink size={12} />
            </Button>
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-white/[0.05]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                filter === cat
                  ? "bg-[#1B8354] text-white shadow-[0_0_15px_rgba(27,131,84,0.3)]"
                  : "border border-white/[0.05] bg-[#0B1120]/40 text-gray-400 hover:text-white hover:border-[#1B8354]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Animated Project Grid */}
        <motion.div
          layout
          className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl border border-white/[0.05] bg-gradient-to-b from-[#0B1120]/80 to-[#050816]/90 p-[1px] cursor-pointer overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.3)] backdrop-blur-md"
                onClick={() => handleProjectClick(project)}
              >
                {/* Visual Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-2xl group-hover:from-[#1B8354]/10 transition-colors duration-500" />

                {/* Card Body */}
                <div className="relative h-full rounded-2xl bg-[#0B1120]/95 flex flex-col justify-between overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={640}
                      height={360}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index < 3}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80" />

                    {/* Left/Right Accent */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#050816]/80 backdrop-blur-md flex items-center justify-center border border-white/[0.05]">
                      <FolderGit size={14} className="text-[#1B8354]" />
                    </div>
                  </div>

                  {/* Header */}
                  <div className="p-5 flex-grow">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#1B8354] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-3">
                      {project.problemStatement}
                    </p>
                  </div>

                  {/* Footer Tag Cloud */}
                  <div className="px-5 pb-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge
                          key={`${project.title}-${tagIndex}`}
                          className="bg-white/[0.02] border border-white/[0.04] text-gray-400 text-[10px] font-mono font-medium rounded-full px-2 py-0.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-5 pt-3 flex gap-2 border-t border-white/[0.04] bg-[#050816]/30">
                    {project.live && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 border-white/[0.08] bg-white/[0.02] hover:bg-[#1B8354]/10 hover:border-[#1B8354]/40 hover:text-white text-gray-300 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.live, "_blank")
                        }}
                      >
                        <ExternalLink size={10} />
                        <span>Live</span>
                      </Button>
                    )}
                    {project.repo && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 border-white/[0.08] bg-white/[0.02] hover:bg-[#1B8354]/10 hover:border-[#1B8354]/40 hover:text-white text-gray-300 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.repo, "_blank")
                        }}
                      >
                        <Github size={10} />
                        <span>Repo</span>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case-Study Dialog Detail */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl border border-white/[0.08] bg-[#0B1120]/95 backdrop-blur-xl shadow-2xl p-0 rounded-2xl overflow-hidden max-h-[85vh] flex flex-col">
          {selectedProject && (
            <>
              {/* Header Banner */}
              <div className="bg-[#050816] p-6 border-b border-white/[0.05] flex items-center justify-between shrink-0">
                <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <FolderGit className="text-[#1B8354]" size={20} />
                  <span>{selectedProject.title}</span>
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCloseDialog}
                    className="w-8 h-8 rounded-lg bg-white/[0.02] hover:bg-white/[0.08] text-gray-400 hover:text-white flex items-center justify-center transition-colors border border-white/[0.05]"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                <div className="aspect-video relative rounded-xl overflow-hidden border border-white/[0.08]">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    width={960}
                    height={540}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent opacity-40" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-xl border border-white/[0.04] bg-[#050816]/30 p-4">
                      <h4 className="text-xs font-mono font-bold text-[#1B8354] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Sparkles size={12} />
                        <span>Problem Statement</span>
                      </h4>
                      <p className="text-xs text-gray-300 font-light leading-relaxed">{selectedProject.problemStatement}</p>
                    </div>

                    <div className="rounded-xl border border-white/[0.04] bg-[#050816]/30 p-4">
                      <h4 className="text-xs font-mono font-bold text-[#1B8354] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Sparkles size={12} />
                        <span>Solution</span>
                      </h4>
                      <p className="text-xs text-gray-300 font-light leading-relaxed">{selectedProject.solution}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-xl border border-white/[0.04] bg-[#050816]/30 p-4">
                      <h4 className="text-xs font-mono font-bold text-[#1B8354] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles size={12} />
                        <span>Key Features</span>
                      </h4>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-gray-300 font-light">
                        {selectedProject.keyFeatures.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-white/[0.04] bg-[#050816]/30 p-4">
                      <h4 className="text-xs font-mono font-bold text-[#1B8354] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Sparkles size={12} />
                        <span>Role Contribution</span>
                      </h4>
                      <p className="text-xs text-gray-300 font-light leading-relaxed">{selectedProject.roleContribution}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.04] bg-[#050816]/30 p-4">
                  <h4 className="text-xs font-mono font-bold text-[#1B8354] uppercase tracking-wider mb-3">Technology Stack & Tags</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech) => (
                      <Badge key={tech} className="bg-[#1B8354]/10 border border-[#1B8354]/20 hover:bg-[#1B8354]/20 text-[#1B8354] text-[10px] font-mono rounded-full px-2.5 py-0.5 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                    {selectedProject.tags.map((tag) => (
                      <Badge key={tag} className="bg-white/[0.02] border border-white/[0.05] text-gray-400 text-[10px] font-mono rounded-full px-2.5 py-0.5">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Banner Footer Actions */}
              <div className="bg-[#050816] p-6 border-t border-white/[0.05] flex justify-end gap-3 shrink-0">
                {selectedProject.live && (
                  <a href={selectedProject.live} target="_blank" rel="noreferrer">
                    <Button className="h-10 px-5 bg-[#1B8354] hover:bg-[#1B8354]/90 text-white rounded-lg shadow-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      <ExternalLink size={12} />
                      <span>Live Demo</span>
                    </Button>
                  </a>
                )}
                {selectedProject.repo && (
                  <a href={selectedProject.repo} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="h-10 px-5 border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] text-white rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      <Github size={12} />
                      <span>View Code</span>
                    </Button>
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  )
}