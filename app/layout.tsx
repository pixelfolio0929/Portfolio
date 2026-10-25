import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Vazirmatn } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { SmoothScroll } from "@/components/portfolio/smooth-scroll"
import { LanguageProvider } from "@/components/portfolio/language-context"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-arabic",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mohammad Sinan | UI Engineer",
  description: "Portfolio of Mohammad Sinan — UI Engineer, Frontend Developer & UI Designer based in Riyadh, Saudi Arabia.",
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
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} ${vazirmatn.variable} antialiased`}>
      <body className="font-sans antialiased selection:bg-primary/20 selection:text-primary" suppressHydrationWarning>
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="theme"
          >
            <LanguageProvider>
              <SmoothScroll />
              {children}
              {process.env.NODE_ENV === 'production' && <Analytics />}
            </LanguageProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}