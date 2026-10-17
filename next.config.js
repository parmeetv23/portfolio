/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep concurrent local previews from overwriting the production build.
  distDir: process.env.NEXT_DIST_DIR || '.next',
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

module.exports = nextConfig
