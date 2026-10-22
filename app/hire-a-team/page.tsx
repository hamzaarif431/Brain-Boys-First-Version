import type { Metadata } from 'next'
import SiteShell from '../../src/App'
import { HirePage } from '../../src/page-components/HirePage'

export const metadata: Metadata = {
  title: 'Build your team',
  description: 'Choose one BrainBoys Ai specialist or build a connected team around your goals, tools and priorities.',
  keywords: ['build remote team', 'hire virtual team', 'specialist team', 'BrainBoys Ai talent'],
}

export default function Page() {
  return <SiteShell><HirePage/></SiteShell>
}
