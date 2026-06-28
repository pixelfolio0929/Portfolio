/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' to allow API routes to work on Netlify
  // output: 'export',  // Commented out for development
  images: { unoptimized: true },
}

export default nextConfig