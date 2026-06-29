"use client"

import type React from "react"
import { Section } from "./section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Mail, Send, Linkedin, Instagram, Sparkles } from "lucide-react"

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [errorMessage, setErrorMessage] = useState<string>("")

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    const newErrors: { [key: string]: string } = {}
    if (!data.from_name) newErrors.from_name = "Name is required"
    if (!data.from_email) newErrors.from_email = "Email is required"
    if (!data.message) newErrors.message = "Message is required"

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
      setErrorMessage(error.message || "Failed to send message. Please try again.")
      setStatus("error")
    }
  }, [])

  return (
    <Section id="contact" className="relative overflow-hidden bg-background py-24">
      {/* Background details */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top_left,rgba(27,131,84,0.05),transparent_40%)] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white dark:bg-card/80 px-4 py-1.5 text-xs font-mono font-medium text-muted-foreground backdrop-blur-md shadow-sm dark:shadow-2xl mb-4"
          >
            <Mail size={12} className="text-primary" />
            <span>Connect With Me</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
          >
            Get In Touch
          </motion.h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4"></div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
          >
            {"I'm actively seeking UI/UX development opportunities and open to discussing how my skills can contribute to your projects. Feel free to reach out!"}
          </motion.p>
        </div>

        {/* Glassmorphic Contact Card Grid */}
        <div className="grid gap-8 lg:grid-cols-3 items-stretch mt-12">
          {/* Social and Quick Contacts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 flex flex-col justify-between gap-6 rounded-2xl border border-border bg-white dark:bg-card/40 p-6 shadow-sm hover:shadow-md dark:shadow-2xl backdrop-blur-md"
          >
            <div className="space-y-6">
              <h3 className="text-lg font-mono font-bold text-foreground flex items-center gap-2">
                <span>Directory</span>
                <span className="h-[1px] bg-border grow" />
              </h3>

              <div className="space-y-4">
                <a
                  href="https://www.linkedin.com/in/mohammad-sinan-8864b722a"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 rounded-xl border border-transparent dark:border-border bg-slate-100 dark:bg-muted/30 hover:bg-slate-200 dark:hover:bg-primary/5 hover:border-transparent dark:hover:border-primary/30 p-3.5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-background group-hover:bg-primary/10 flex items-center justify-center text-slate-700 dark:text-muted-foreground group-hover:text-primary dark:group-hover:text-foreground transition-colors duration-300 shrink-0">
                    <Linkedin size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">LinkedIn</p>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5 truncate">Mohammad Sinan</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/sinan_kota/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 rounded-xl border border-transparent dark:border-border bg-slate-100 dark:bg-muted/30 hover:bg-slate-200 dark:hover:bg-purple-500/5 hover:border-transparent dark:hover:border-purple-500/30 p-3.5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-background group-hover:bg-purple-500/10 flex items-center justify-center text-slate-700 dark:text-muted-foreground group-hover:text-purple-600 dark:group-hover:text-foreground transition-colors duration-300 shrink-0">
                    <Instagram size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">Instagram</p>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5 truncate">@sinan_kota</p>
                  </div>
                </a>

                <a
                  href="mailto:mhdsinan004@gmail.com"
                  className="flex items-center gap-3.5 rounded-xl border border-transparent dark:border-border bg-slate-100 dark:bg-muted/30 hover:bg-slate-200 dark:hover:bg-cyan-500/5 hover:border-transparent dark:hover:border-cyan-500/30 p-3.5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-background group-hover:bg-cyan-500/10 flex items-center justify-center text-slate-700 dark:text-muted-foreground group-hover:text-cyan-600 dark:group-hover:text-foreground transition-colors duration-300 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">Email</p>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5 truncate">mhdsinan004@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Direct Mail Support</p>
              <a
                href="mailto:mhdsinan004@gmail.com"
                className="text-sm font-mono text-primary hover:text-primary/80 transition-colors mt-1 block"
              >
                mhdsinan004@gmail.com
              </a>
            </div>
          </motion.div>

{/* Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 rounded-2xl border border-border bg-white dark:bg-card/40 p-6 sm:p-8 shadow-sm hover:shadow-md dark:shadow-2xl backdrop-blur-md transition-all duration-300"
          >
            <form
              onSubmit={onSubmit}
              className="space-y-5"
            >

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Input
                    name="from_name"
                    placeholder="Your name"
                    required
                    className="h-11 rounded-xl border border-slate-200 dark:border-border bg-slate-50 dark:bg-background/60 focus:border-primary focus:ring-1 focus:ring-primary text-foreground font-mono text-xs placeholder:text-muted-foreground transition-all"
                  />
                  {errors.from_name && <p className="text-[10px] font-mono text-red-500">{errors.from_name}</p>}
                </div>

                <div className="space-y-1.5">
                  <Input
                    name="from_email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="h-11 rounded-xl border border-slate-200 dark:border-border bg-slate-50 dark:bg-background/60 focus:border-primary focus:ring-1 focus:ring-primary text-foreground font-mono text-xs placeholder:text-muted-foreground transition-all"
                  />
                  {errors.from_email && <p className="text-[10px] font-mono text-red-500">{errors.from_email}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Input
                  name="subject"
                  placeholder="Subject"
                  className="h-11 rounded-xl border border-slate-200 dark:border-border bg-slate-50 dark:bg-background/60 focus:border-primary focus:ring-1 focus:ring-primary text-foreground font-mono text-xs placeholder:text-muted-foreground transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <Textarea
                  name="message"
                  placeholder="Your message"
                  required
                  className="min-h-[140px] rounded-xl border border-slate-200 dark:border-border bg-slate-50 dark:bg-background/60 focus:border-primary focus:ring-1 focus:ring-primary text-foreground font-mono text-xs placeholder:text-muted-foreground transition-all"
                />
                {errors.message && <p className="text-[10px] font-mono text-red-500">{errors.message}</p>}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-3">
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md hover:shadow-lg dark:shadow-lg transition-all font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <span className="animate-pulse">Transmission Active...</span>
                  ) : (
                    <>
                      <span>Submit Form</span>
                      <Send size={12} />
                    </>
                  )}
                </Button>

                {status === "sent" && (
                  <p className="text-xs font-mono text-green-500">
                    Transmission success! I'll secure feedback soon.
                  </p>
                )}

                {status === "error" && (
                  <div className="flex flex-col text-left">
                    <p className="text-xs font-mono text-red-500">Failed to establish .</p>
                    {errorMessage && <p className="text-[10px] font-mono text-red-500 mt-0.5">{errorMessage}</p>}
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}