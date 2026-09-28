import type { Metadata } from 'next'
import { Suspense } from 'react'
import SiteShell from '../../src/App'
import { ContactPage } from '../../src/page-components/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Brainboys',
  description: 'Tell Brainboys what you are building and find the right specialist, team or automation path.',
  keywords: ['contact Brainboys', 'book strategy call', 'hire Brainboys'],
}

export default function Page() {
  return <SiteShell><Suspense fallback={null}><ContactPage/></Suspense></SiteShell>
}
