import type { Metadata } from 'next'
import SiteShell from '../src/App'
import HomePage from '../src/HomePage'

export const metadata: Metadata = {
  title: 'Hire a brain on demand — Brainboys AI',
  description: 'Hire developers, GoHighLevel experts, automators and digital marketers on demand. Pay for shipped output with no monthly retainer or idle hours.',
  keywords: ['on-demand developers', 'GoHighLevel experts', 'AI automation', 'no retainer agency', 'pay per task', 'Brainboys AI'],
}

export default function Page() {
  return <SiteShell isHome><HomePage/></SiteShell>
}
