import type { Metadata } from "next"
import { NotFoundView } from "@/components/portfolio/not-found-view"

export const metadata: Metadata = {
  title: "404 - Page Not Found | Mohammad Sinan — UI Engineer",
  description:
    "The requested page or route does not exist. Explore featured projects, government UI systems, design tokens, and frontend engineering by Mohammad Sinan.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return <NotFoundView />
}