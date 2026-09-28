import type { Metadata } from 'next'
import SiteShell from '../../src/App'
import { AutomationPage } from '../../src/page-components/AutomationPage'

export const metadata: Metadata = {
  title: 'AI and business automation',
  description: 'Connect your CRM, tools and teams with intelligent workflows built around the way your business works.',
  keywords: ['AI automation', 'business automation', 'CRM workflows', 'GoHighLevel automation', 'AI agents'],
}

export default function Page() {
  return <SiteShell><AutomationPage/></SiteShell>
}
