/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // This is required for the Next.js Image component to work with external URLs
    // unoptimized: true,
  },
}

export default nextConfig
