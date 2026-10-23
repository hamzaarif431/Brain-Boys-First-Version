import type { Metadata } from 'next'
import SiteShell from '../src/App'
import HomePage from '../src/HomePage'

export const metadata: Metadata = {
  title: 'Hire a brain on demand — BrainBoys AI',
  description: 'Hire developers, BrainBoys CRM experts, automators and digital marketers on demand. Pay for shipped output with no monthly retainer or idle hours.',
  keywords: ['on-demand developers', 'BrainBoys CRM experts', 'AI automation', 'no retainer agency', 'pay per task', 'BrainBoys AI'],
}

export default function Page() {
  return <SiteShell isHome><HomePage/></SiteShell>
}
