import type { Metadata } from 'next'
import SiteShell from '../../src/App'
import { PortfolioPage } from '../../src/page-components/PortfolioPage'

export const metadata: Metadata = {
  title: 'Selected work and portfolio',
  description: 'Explore BrainBoys CRM systems, websites, ecommerce builds, custom platforms and dashboards.',
  keywords: ['BrainBoys AI portfolio', 'web development portfolio', 'BrainBoys CRM portfolio', 'CRM projects'],
}

export default function Page() {
  return <SiteShell><PortfolioPage/></SiteShell>
}
