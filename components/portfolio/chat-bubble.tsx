"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export function ChatBubble() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen((o) => !o)} className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg">
        {open ? "Close" : "Ask me about my projects"}
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-80 overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur"
            role="dialog"
            aria-label="AI project explainer"
          >
            <div className="border-b border-border p-3 font-medium"> Main Project Explainer</div>
            <div className="max-h-64 space-y-3 overflow-auto p-3 text-sm">
  <div className="rounded-md bg-secondary/70 p-2">Q: How do the AI Tools work?</div>
  <div className="rounded-md bg-primary/10 p-2">
    A:{" "}
    {
      "It's a collection of powerful AI tools that cover everything you need — from learning assistance to project automation. You can explore, update, or even sponsor new tools. It also connects you to thousands of courses and instantly provides any course you want."
    }
  </div>
  <div className="rounded-md bg-secondary/70 p-2">Q: How does the Landing Page Generator work?</div>
  <div className="rounded-md bg-primary/10 p-2">
    A:{" "}
    {
      "It automatically generates high-quality business landing pages tailored to your needs — using modern design, AI content generatio. Both this and the AI Tools project are still under active development."
    }
  </div>
  <div className="rounded-md bg-secondary/70 p-2">Q: What is PixelResume and how does it work?</div>
  <div className="rounded-md bg-primary/10 p-2">
    A:{" "}
    {
      "PixelResume is a modern, responsive resume builder that supports both Arabic and English with full RTL and LTR layout compatibility. Users can create or import resumes, edit content with a real-time live preview, and export ATS-friendly PDF resumes. The platform focuses on clean UI, proper typography, cross-browser consistency, and a smooth experience across all devices, built using React and Tailwind CSS."
    }
  </div>
</div>

            <div className="border-t border-border p-3 text-xs text-muted-foreground">
              Tip: Open any project to see tech details.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
