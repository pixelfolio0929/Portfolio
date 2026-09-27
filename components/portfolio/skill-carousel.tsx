"use client"

import { motion } from "framer-motion"
import { Hover3DCard } from "@/components/ui/hover-3d-card"
import * as Icons from "lucide-react"
import { useLanguage } from "./language-context"
import { BookOpen, Sparkles, ArrowRight, ArrowLeft } from "lucide-react"

interface SkillItem {
  name: string
  icon: keyof typeof Icons
}

interface SkillCategory {
  id: string
  titleEn: string
  titleAr: string
  descEn: string
  descAr: string
  skills: SkillItem[]
  badgeEn: string
  badgeAr: string
  borderColor: string
  isLearning?: boolean
  learningNoteEn?: string
  learningNoteAr?: string
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    titleEn: "Frontend Development",
    titleAr: "تطوير الواجهات الأمامية",
    descEn: "Building responsive, component-driven user interfaces with modern web standards.",
    descAr: "بناء واجهات مستخدم متجاوبة تعتمد على المكونات الحديثة ومعايير الويب المتقدمة.",
    badgeEn: "Production Stack",
    badgeAr: "الحزمة الأساسية للإنتاج",
    borderColor: "hover:border-emerald-500/40",
    skills: [
      { name: "HTML5", icon: "FileCode" },
      { name: "CSS3", icon: "FileCode2" },
      { name: "JavaScript (ES6+)", icon: "Braces" },
      { name: "React.js", icon: "Atom" },
      { name: "Vue.js", icon: "Boxes" },
      { name: "Tailwind CSS", icon: "Wind" },
      { name: "Bootstrap", icon: "LayoutGrid" },
    ],
  },
  {
    id: "ui-design",
    titleEn: "UI & Design Systems",
    titleAr: "تصميم الواجهات وأنظمة التصميم",
    descEn: "Structuring design tokens, reusable UI component systems, and authentic Arabic RTL layouts.",
    descAr: "هندسة متغيرات التصميم، ومكتبات المكونات القابلة لإعادة الاستخدام، وتخطيطات RTL العربية.",
    badgeEn: "Design & Systems",
    badgeAr: "التصميم والنظم",
    borderColor: "hover:border-blue-500/40",
    skills: [
      { name: "Figma", icon: "PenTool" },
      { name: "UI/UX Design", icon: "Palette" },
      { name: "Design Systems", icon: "Component" },
      { name: "Responsive Design", icon: "Smartphone" },
      { name: "Arabic RTL Layouts", icon: "Languages" },
      { name: "Adobe Photoshop", icon: "Image" },
    ],
  },
  {
    id: "backend-support",
    titleEn: "Backend & Supporting",
    titleAr: "الخلفية البرمجية والأدوات المساندة",
    descEn: "Enterprise backend integrations, data models, and collaborative version control.",
    descAr: "ربط واجهات الأنظمة المؤسسية، ونماذج البيانات، وإدارة الإصدارات البرمجية.",
    badgeEn: "Enterprise & Tooling",
    badgeAr: "أدوات وأنظمة مؤسسية",
    borderColor: "hover:border-purple-500/40",
    skills: [
      { name: "ASP.NET (Basic / UI)", icon: "Server" },
      { name: "Python", icon: "Terminal" },
      { name: "SQL", icon: "Database" },
      { name: "MySQL", icon: "HardDrive" },
      { name: "REST APIs", icon: "Network" },
      { name: "Git & GitHub", icon: "GitBranch" },
    ],
  },
  {
    id: "currently-learning",
    titleEn: "Currently Learning",
    titleAr: "قيد التعلم (مرحلة التطوير)",
    descEn: "Technologies in the learning stage for government platform requirements — will graduate to the main frontend stack upon production deployment.",
    descAr: "تقنيات في مرحلة التعلم لمتطلبات المنصات الحكومية — ستتم إضافتها إلى الحزمة الأساسية للإنتاج فور اعتمادها.",
    badgeEn: "Learning Stage → Main Stack",
    badgeAr: "مرحلة التعلم ← الحزمة الأساسية",
    borderColor: "hover:border-amber-500/40",
    isLearning: true,
    learningNoteEn: "Actively learning Angular for SBA UI engineering & development work. Will be added into the primary frontend stack once deployed in production.",
    learningNoteAr: "أتعلم Angular بنشاط لمتطلبات هندسة وتطوير واجهات المستخدم في SBA، وستتم إضافتها إلى الحزمة الأمامية الأساسية فور استخدامها في الإنتاج.",
    skills: [
      { name: "Angular", icon: "Code2" },
    ],
  },
]

export function SkillCarousel() {
  const { isRTL } = useLanguage()

  return (
    <div className="w-full max-w-6xl mx-auto py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {skillCategories.map((category, idx) => {
          const title = isRTL ? category.titleAr : category.titleEn
          const desc = isRTL ? category.descAr : category.descEn
          const badge = isRTL ? category.badgeAr : category.badgeEn
          const note = isRTL ? category.learningNoteAr : category.learningNoteEn

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="h-full"
            >
              <Hover3DCard
                depth={15}
                maxRotate={3}
                className="h-full group"
                contentClassName={`rounded-3xl border border-border bg-card/85 dark:bg-card/45 backdrop-blur-xl p-6 sm:p-7 shadow-xs flex flex-col justify-between transition-all duration-300 ${category.borderColor} ${category.isLearning ? "border-amber-500/35 bg-amber-500/[0.02]" : ""}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
                      {`0${idx + 1} // ${category.id.toUpperCase()}`}
                    </span>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${category.isLearning ? "bg-amber-500/10 text-amber-500 border border-amber-500/25" : "bg-primary/10 text-primary border border-primary/20"}`}>
                      {badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-mono text-foreground mb-2 group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed mb-5">
                    {desc}
                  </p>

                  {/* Skills Grid */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => {
                      const IconComponent = (Icons[skill.icon] as any) || Icons.CheckCircle2
                      return (
                        <div
                          key={sIdx}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-colors ${
                            category.isLearning
                              ? "border-amber-500/30 bg-amber-500/5 text-amber-300"
                              : "border-border/70 bg-background/60 text-foreground hover:border-primary/40 hover:bg-primary/5"
                          }`}
                        >
                          <IconComponent size={13} className={category.isLearning ? "text-amber-500 shrink-0" : "text-primary shrink-0"} />
                          <span>{skill.name}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Note for Currently Learning */}
                  {category.isLearning && note && (
                    <div className="mt-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-foreground/90 flex items-start gap-2">
                      <BookOpen size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="font-light leading-relaxed">{note}</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border/50 mt-6 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>{isRTL ? "حالة الحزمة البرمجية" : "Stack Status"}</span>
                  <span className={category.isLearning ? "text-amber-500 font-bold" : "text-primary font-bold"}>
                    {category.isLearning ? (isRTL ? "مرحلة التعلم" : "Learning Stage") : (isRTL ? "إنتاج فعّال" : "Active Production")}
                  </span>
                </div>
              </Hover3DCard>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
