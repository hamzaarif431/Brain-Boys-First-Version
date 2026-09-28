import type { Metadata } from 'next'
import SiteShell from '../../src/App'
import { PortfolioPage } from '../../src/page-components/PortfolioPage'

export const metadata: Metadata = {
  title: 'Selected work and portfolio',
  description: 'Explore Brainboys CRM systems, websites, ecommerce builds, custom platforms and dashboards.',
  keywords: ['Brainboys portfolio', 'web development portfolio', 'GoHighLevel portfolio', 'CRM projects'],
}

export default function Page() {
  return <SiteShell><PortfolioPage/></SiteShell>
}
