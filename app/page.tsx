import type { Metadata } from 'next'
import SiteShell from '../src/App'
import HomePage from '../src/HomePage'

export const metadata: Metadata = {
  title: 'Big ideas. Meet your bigger team.',
  description: 'Meet the connected specialists and intelligent systems that turn ambitious business ideas into momentum.',
  keywords: ['Brainboys AI', 'AI automation agency', 'remote specialists', 'business automation', 'digital growth team'],
}

export default function Page() {
  return <SiteShell isHome><HomePage/></SiteShell>
}
