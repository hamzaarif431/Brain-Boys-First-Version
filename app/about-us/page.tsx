import type { Metadata } from 'next'
import SiteShell from '../../src/App'
import AboutPage from '../../src/page-components/AboutPage'

export const metadata: Metadata = {
  title: 'About us — The people behind the work',
  description: 'Meet BrainBoys Ai, our CEO Muhammad Faraz and the people connecting specialist expertise, intelligent automation and work that moves your business forward.',
  keywords: ['about BrainBoys Ai', 'BrainBoys Ai team', 'Muhammad Faraz', 'AI automation company', 'on-demand specialists'],
}

export default function Page() {
  return <SiteShell><AboutPage/></SiteShell>
}
