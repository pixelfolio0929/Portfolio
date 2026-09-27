"use client"

import * as Icons from "lucide-react"
import { useLanguage } from "./language-context"
import { BookOpen } from "lucide-react"

interface Skill {
  name: string
  icon: keyof typeof Icons
}

interface SkillCategory {
  id: string
  nameEn: string
  nameAr: string
  descEn: string
  descAr: string
  skills: Skill[]
  color: string
  bgColor: string
  borderColor: string
  isLearning?: boolean
  learningNoteEn?: string
  learningNoteAr?: string
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    nameEn: "Frontend Development",
    nameAr: "تطوير الواجهات الأمامية",
    descEn: "Building responsive, component-driven user interfaces with modern web standards.",
    descAr: "بناء واجهات مستخدم متجاوبة تعتمد على المكونات الحديثة ومعايير الويب المتقدمة.",
    skills: [
      { name: "HTML5", icon: "FileCode" },
      { name: "CSS3", icon: "FileCode2" },
      { name: "JavaScript (ES6+)", icon: "Braces" },
      { name: "React.js", icon: "Atom" },
      { name: "Vue.js", icon: "Boxes" },
      { name: "Tailwind CSS", icon: "Wind" },
      { name: "Bootstrap", icon: "LayoutGrid" },
    ],
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20"
  },
  {
    id: "ui-design",
    nameEn: "UI & Design Systems",
    nameAr: "تصميم الواجهات وأنظمة التصميم",
    descEn: "Structuring design tokens, reusable UI component systems, and authentic Arabic RTL layouts.",
    descAr: "هندسة متغيرات التصميم، ومكتبات المكونات القابلة لإعادة الاستخدام، وتخطيطات RTL العربية.",
    skills: [
      { name: "Figma", icon: "PenTool" },
      { name: "UI/UX Design", icon: "Palette" },
      { name: "Design Systems", icon: "Component" },
      { name: "Responsive Design", icon: "Smartphone" },
      { name: "Arabic RTL", icon: "Languages" },
      { name: "Adobe Photoshop", icon: "Image" },
    ],
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  {
    id: "backend-support",
    nameEn: "Backend & Supporting",
    nameAr: "الخلفية البرمجية والأدوات المساندة",
    descEn: "Enterprise backend integrations, data models, and collaborative version control.",
    descAr: "ربط واجهات الأنظمة المؤسسية، ونماذج البيانات، وإدارة الإصدارات البرمجية.",
    skills: [
      { name: "ASP.NET (Basic / UI)", icon: "Server" },
      { name: "Python", icon: "Terminal" },
      { name: "SQL", icon: "Database" },
      { name: "MySQL", icon: "HardDrive" },
      { name: "REST APIs", icon: "Network" },
      { name: "Git & GitHub", icon: "GitBranch" },
    ],
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20"
  },
  {
    id: "currently-learning",
    nameEn: "Currently Learning",
    nameAr: "قيد التعلم والتطوير",
    descEn: "Technologies actively being learned and explored for government platform requirements.",
    descAr: "تقنيات أتعلمها بنشاط لمتطلبات العمل في هندسة الواجهات للمنصات الحكومية.",
    skills: [
      { name: "Angular", icon: "Code2" },
    ],
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    isLearning: true,
    learningNoteEn: "Actively learning Angular for SBA UI engineering requirements.",
    learningNoteAr: "أتعلم Angular بنشاط لمتطلبات هندسة واجهات المستخدم في SBA."
  },
]

export function SkillsMobile() {
  const { isRTL } = useLanguage()

  return (
    <div className="space-y-4">
      {skillCategories.map((category, idx) => (
        <div
          key={idx}
          className={`rounded-2xl border ${category.isLearning ? "border-amber-500/30 bg-amber-500/[0.02]" : "border-border bg-card/80"} p-5 shadow-xs space-y-3`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-base font-bold text-foreground">
              {isRTL ? category.nameAr : category.nameEn}
            </h3>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${category.bgColor} ${category.color}`}>
              0{idx + 1}
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-light leading-relaxed">
            {isRTL ? category.descAr : category.descEn}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {category.skills.map((skill, sIdx) => {
              const IconComponent = (Icons[skill.icon] as any) || Icons.CheckCircle
              return (
                <div
                  key={sIdx}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono font-medium ${
                    category.isLearning
                      ? "border-amber-500/30 bg-amber-500/5 text-amber-300"
                      : "border-border/70 bg-background/60 text-foreground"
                  }`}
                >
                  <IconComponent size={12} className={category.isLearning ? "text-amber-500 shrink-0" : "text-primary shrink-0"} />
                  <span>{skill.name}</span>
                </div>
              )
            })}
          </div>

          {category.isLearning && (
            <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-foreground/90 flex items-start gap-2">
              <BookOpen size={13} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="font-light">{isRTL ? category.learningNoteAr : category.learningNoteEn}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}