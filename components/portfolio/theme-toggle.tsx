"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle color theme"
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full"
    >
      <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        {isDark ? (
          // Sun
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1.25a1 1 0 1 1 2 0V21a1 1 0 0 1-1 1Zm0-20a1 1 0 0 1 1 1v1.25a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm10 9a1 1 0 0 1-1 1h-1.25a1 1 0 1 1 0-2H21a1 1 0 0 1 1 1ZM4.25 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1.25a1 1 0 0 1 1 1Zm13.04 6.46a1 1 0 0 1 0 1.41l-.88.88a1 1 0 0 1-1.41-1.41l.88-.88a1 1 0 0 1 1.41 0Zm-9.6-12.7a1 1 0 0 1 0-1.41l.88-.88a1 1 0 1 1 1.41 1.41l-.88.88a1 1 0 0 1-1.41 0Zm12.7-1.41a1 1 0 0 1 0 1.41l-.88.88a1 1 0 1 1-1.41-1.41l.88-.88a1 1 0 0 1 1.41 0ZM6.31 17.54a1 1 0 0 1 0 1.41l-.88.88A1 1 0 0 1 4.02 18.4l.88-.88a1 1 0 0 1 1.41 0Z" />
        ) : (
          // Moon
          <path d="M21.64 13.65a9 9 0 1 1-11.29-11.3 1 1 0 0 1 1.2 1.35 7 7 0 0 0 8.74 8.75 1 1 0 0 1 .35 1.2Z" />
        )}
      </svg>
    </Button>
  )
}
