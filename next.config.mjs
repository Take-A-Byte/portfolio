import { execSync } from 'child_process'

const git = (cmd) => { try { return execSync(cmd).toString().trim() } catch { return 'unknown' } }

const commitSha = process.env.VERCEL_GIT_COMMIT_SHA || git('git rev-parse HEAD')
const commitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE || git('git log -1 --pretty=%s')

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    COMMIT_SHA: commitSha,
    COMMIT_MESSAGE: commitMessage,
    BUILD_TIME: new Date().toISOString(),
    BUILD_NODE_VERSION: process.version,
  },
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
