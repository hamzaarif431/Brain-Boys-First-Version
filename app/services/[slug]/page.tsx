import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SiteShell from '../../../src/App'
import { ServiceDetail } from '../../../src/page-components/ServiceDetail'
import { roles } from '../../../src/content'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return roles.map(role => ({ slug: role.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const role = roles.find(item => item.slug === slug)
  if (!role) return {}
  return {
    title: role.name,
    description: role.description,
    keywords: [role.name, role.category, 'Brainboys specialist', 'hire remote expert'],
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!roles.some(role => role.slug === slug)) notFound()
  return <SiteShell bookingHref="#book-calendar"><ServiceDetail slug={slug}/></SiteShell>
}
