/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // This is required for the Next.js Image component to work with external URLs
    // unoptimized: true,
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
    ],
  },
}

export default nextConfig
