import type { Metadata } from 'next'
import SiteShell from '../../src/App'
import AboutPage from '../../src/page-components/AboutPage'

export const metadata: Metadata = {
  title: 'About us — The people behind the work',
  description: 'Meet BrainBoys AI founder Ahsan Bhaghdadi, CEO Muhammad Faraz and the team connecting specialist expertise with intelligent automation.',
  keywords: ['about BrainBoys AI', 'Ahsan Bhaghdadi founder', 'BrainBoys AI team', 'Muhammad Faraz', 'AI automation company', 'on-demand specialists'],
}

export default function Page() {
  return <SiteShell><AboutPage/></SiteShell>
}
