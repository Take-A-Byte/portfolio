import { readFileSync } from 'fs'
import path from 'path'

function getNextVersion() {
  try {
    const pkg = JSON.parse(readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
    return pkg.dependencies?.next ?? pkg.devDependencies?.next ?? 'unknown'
  } catch {
    return 'unknown'
  }
}

export default function VersionPage() {
  const info = {
    commit: process.env.COMMIT_SHA ?? 'unknown',
    message: process.env.COMMIT_MESSAGE ?? 'unknown',
    buildTime: process.env.BUILD_TIME ?? 'unknown',
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'unknown',
    nodeVersion: process.env.BUILD_NODE_VERSION ?? 'unknown',
    nextVersion: getNextVersion(),
  }

  return (
    <pre style={{ padding: '2rem', fontFamily: 'monospace', lineHeight: '1.8' }}>
      {Object.entries(info).map(([k, v]) => `${k.padEnd(15)}: ${v}`).join('\n')}
    </pre>
  )
}
