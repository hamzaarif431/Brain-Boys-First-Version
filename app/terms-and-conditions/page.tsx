import type { Metadata } from 'next'
import SiteShell from '../../src/App'
import { TermsPage } from '../../src/page-components/LegalPages'

export const metadata: Metadata = {
  title: 'Terms and conditions',
  description: 'The terms that apply when you access and use the Brainboys website.',
  keywords: ['Brainboys terms', 'website terms and conditions'],
}

export default function Page() {
  return <SiteShell><TermsPage/></SiteShell>
}
