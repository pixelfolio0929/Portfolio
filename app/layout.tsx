import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { SmoothScroll } from "@/components/portfolio/smooth-scroll"

export const metadata: Metadata = {
  title: "Sinan Portfolio",
  description: "Portfolio Of Mohammad Sinan",
  generator: "Next.js",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="font-sans">
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="theme"
          >
            <SmoothScroll />
            {children}
            {/* Only load Analytics in production */}
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}