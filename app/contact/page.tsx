import type { Metadata } from 'next'
import { Suspense } from 'react'
import SiteShell from '../../src/App'
import { ContactPage } from '../../src/page-components/ContactPage'

export const metadata: Metadata = {
  title: 'Contact BrainBoys AI',
  description: 'Tell BrainBoys AI what you are building and find the right specialist, team or automation path.',
  keywords: ['contact BrainBoys AI', 'book strategy call', 'hire BrainBoys AI'],
}

export default function Page() {
  return <SiteShell><Suspense fallback={null}><ContactPage/></Suspense></SiteShell>
}
