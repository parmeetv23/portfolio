const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep development startup from generating repository policy files.
  agentRules: false,
  async redirects() {
    return [{ source: '/projects/kiddoflix', destination: '/projects/family-streaming-interface', permanent: true }]
  },
  async rewrites() {
    return {
      // Reject prototype routes before rendering can stream a 200 response.
      // The missing destination uses the shared public 404 page.
      beforeFiles: process.env.NODE_ENV === 'production'
        ? [{ source: '/design-lab/:path*', destination: '/404' }]
        : [],
    }
  },
}

// A build must never replace the chunks/manifests used by a running dev server.
// Keep an explicit override for independent local previews.
module.exports = (phase) => ({
  ...nextConfig,
  distDir: process.env.NEXT_DIST_DIR || (phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next'),
})
