"use client"

import type React from "react"
import { Section } from "./section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Mail, Send, Linkedin, Instagram, Sparkles, CheckCircle2 } from "lucide-react"
import { useLanguage } from "./language-context"

export function Contact() {
  const { t, isRTL } = useLanguage()
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [errorMessage, setErrorMessage] = useState<string>("")

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    const newErrors: { [key: string]: string } = {}
    if (!data.from_name) newErrors.from_name = isRTL ? "الاسم مطلوب" : "Name is required"
    if (!data.from_email) newErrors.from_email = isRTL ? "البريد الإلكتروني مطلوب" : "Email is required"
    if (!data.message) newErrors.message = isRTL ? "الرسالة مطلوبة" : "Message is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setStatus("loading")
      setErrors({})
      setErrorMessage("")

      const apiData = {
        name: data.from_name,
        email: data.from_email,
        subject: data.subject,
        message: data.message
      }

      const results = await Promise.all([
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiData),
        }),
        new Promise(resolve => setTimeout(resolve, 500))
      ])
      const res = results[0]

      const contentType = res.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        const result = await res.json()

        if (!res.ok || !result.ok) {
          throw new Error(result.message || "Failed to send message")
        }

        setStatus("sent")
        setErrorMessage("")
        form.reset()
      } else {
        const text = await res.text()
        throw new Error(`Failed to send message: ${res.status} ${res.statusText}`)
      }
    } catch (error: any) {
      console.error("Contact form error:", error)
      setErrorMessage(error.message || (isRTL ? "فشل إرسال الرسالة، يرجى المحاولة لاحقاً." : "Failed to send message. Please try again."))
      setStatus("error")
    }
  }, [isRTL])

  return (
    <Section id="contact" className="relative overflow-hidden bg-background py-20 sm:py-28">
      {/* Background Studio Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(27,131,84,0.06),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 glass-pill px-4 py-1.5 text-xs font-mono font-medium text-muted-foreground shadow-sm mb-4"
          >
            <Mail size={13} className="text-primary" />
            <span>{t("contact.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
          >
            {t("contact.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
          >
            {t("contact.desc")}
          </motion.p>
        </div>

        {/* 3D Contact Card Grid */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          
          {/* Social & Directory (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between gap-6 rounded-3xl border border-border glass-panel p-6 sm:p-8 shadow-sm hover:shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          >
            <div className="space-y-6">
              <h3 className="text-sm font-mono font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                <span>{isRTL ? "بيانات التواصل" : "Directory"}</span>
                <span className="h-[1px] bg-border grow" />
              </h3>

              <div className="space-y-3">
                <a
                  href="https://www.linkedin.com/in/mohammad-sinan-8864b722a"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 rounded-2xl border border-border/70 bg-card/60 hover:bg-card hover:border-primary/40 p-3.5 transition-all duration-300 group shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted/60 group-hover:bg-primary/10 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                    <Linkedin size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">LinkedIn</p>
                    <p className="text-xs font-mono font-bold text-foreground mt-0.5 truncate">Mohammad Sinan</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/sinan_kota/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 rounded-2xl border border-border/70 bg-card/60 hover:bg-card hover:border-purple-500/40 p-3.5 transition-all duration-300 group shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted/60 group-hover:bg-purple-500/10 flex items-center justify-center text-muted-foreground group-hover:text-purple-500 transition-colors shrink-0">
                    <Instagram size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">Instagram</p>
                    <p className="text-xs font-mono font-bold text-foreground mt-0.5 truncate">@sinan_kota</p>
                  </div>
                </a>

                <a
                  href="mailto:mhdsinan004@gmail.com"
                  className="flex items-center gap-3.5 rounded-2xl border border-border/70 bg-card/60 hover:bg-card hover:border-cyan-500/40 p-3.5 transition-all duration-300 group shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted/60 group-hover:bg-cyan-500/10 flex items-center justify-center text-muted-foreground group-hover:text-cyan-500 transition-colors shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">{isRTL ? "البريد المباشر" : "Direct Email"}</p>
                    <p className="text-xs font-mono font-bold text-foreground mt-0.5 truncate">mhdsinan004@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-border/80">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{isRTL ? "الحالة والتوفر" : "Availability Status"}</p>
              <p className="text-xs font-mono text-primary font-bold mt-1">{isRTL ? "متاح لوظائف مهندس واجهات، مطور UI، وتطوير الواجهات في الرياض" : "Open for UI Engineer, UI Developer & Frontend roles in Riyadh"}</p>
            </div>
          </motion.div>

          {/* Form Panel (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl border border-border glass-panel p-6 sm:p-8 shadow-sm hover:shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          >
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-muted-foreground">{t("contact.nameLabel")}</label>
                  <Input
                    name="from_name"
                    placeholder={t("contact.namePlaceholder")}
                    required
                    className="h-11 rounded-xl border border-border bg-card/60 focus:border-primary focus:ring-1 focus:ring-primary text-foreground font-mono text-xs placeholder:text-muted-foreground transition-all"
                  />
                  {errors.from_name && <p className="text-[10px] font-mono text-red-500">{errors.from_name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-muted-foreground">{t("contact.emailLabel")}</label>
                  <Input
                    name="from_email"
                    type="email"
                    placeholder={t("contact.emailPlaceholder")}
                    required
                    className="h-11 rounded-xl border border-border bg-card/60 focus:border-primary focus:ring-1 focus:ring-primary text-foreground font-mono text-xs placeholder:text-muted-foreground transition-all"
                  />
                  {errors.from_email && <p className="text-[10px] font-mono text-red-500">{errors.from_email}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-muted-foreground">{t("contact.subjectLabel")}</label>
                <Input
                  name="subject"
                  placeholder={t("contact.subjectPlaceholder")}
                  className="h-11 rounded-xl border border-border bg-card/60 focus:border-primary focus:ring-1 focus:ring-primary text-foreground font-mono text-xs placeholder:text-muted-foreground transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-muted-foreground">{t("contact.messageLabel")}</label>
                <Textarea
                  name="message"
                  placeholder={t("contact.messagePlaceholder")}
                  required
                  className="min-h-[140px] rounded-xl border border-border bg-card/60 focus:border-primary focus:ring-1 focus:ring-primary text-foreground font-mono text-xs placeholder:text-muted-foreground transition-all"
                />
                {errors.message && <p className="text-[10px] font-mono text-red-500">{errors.message}</p>}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto h-11 px-7 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md hover:shadow-lg transition-all font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === "loading" ? (
                    <span className="animate-pulse">{t("contact.transmitting")}</span>
                  ) : (
                    <>
                      <span>{t("contact.sendBtn")}</span>
                      <Send size={12} className={isRTL ? "rotate-180" : ""} />
                    </>
                  )}
                </Button>

                {status === "sent" && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-500">
                    <CheckCircle2 size={14} />
                    <span>{t("contact.success")}</span>
                  </div>
                )}
                {status === "error" && (
                  <p className="text-xs font-mono text-red-500">{errorMessage}</p>
                )}
              </div>
            </form>
          </motion.div>
        </div>

      </div>
    </Section>
  )
}