import type { Metadata } from 'next'
import SiteShell from '../../src/App'
import { PrivacyPage } from '../../src/page-components/LegalPages'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How Brainboys handles information when you use our website or contact our team.',
  keywords: ['Brainboys privacy policy', 'website privacy'],
}

export default function Page() {
  return <SiteShell><PrivacyPage/></SiteShell>
}
