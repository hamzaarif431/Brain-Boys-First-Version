import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  devIndicators: false,
  agentRules: false,
  async redirects() {
    return [
      { source: '/services/gohighlevel', destination: '/services/brainboys-crm', permanent: true },
      { source: '/services/gohighlevel-crm', destination: '/services/brainboys-crm', permanent: true },
    ]
  },
}
export default nextConfig
