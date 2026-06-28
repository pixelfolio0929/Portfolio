import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist",
}

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050816]">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-[#1B8354] mb-4">404</h1>
        <p className="text-xl text-gray-300 font-mono">Page Not Found</p>
      </div>
    </div>
  )
}