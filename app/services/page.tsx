import type { Metadata } from 'next'
import SiteShell from '../../src/App'
import { ServicesPage } from '../../src/page-components/ServicesPage'

export const metadata: Metadata = {
  title: 'Services and specialists',
  description: 'Explore Brainboys specialists across automation, engineering, growth, creative and operations.',
  keywords: ['Brainboys services', 'hire specialists', 'GoHighLevel experts', 'developers', 'creative team'],
}

export default function Page() {
  return <SiteShell bookingHref="#book-calendar"><ServicesPage/></SiteShell>
}
