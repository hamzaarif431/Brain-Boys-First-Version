import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import App from '../../src/App'
import { roles } from '../../src/content'
export default async function Page({params}: {params: Promise<{slug?: string[]}>}) {
 const {slug = []} = await params
 const path = slug.join('/')
 if (path && !['services','automation','hire-a-team','portfolio','privacy-policy','terms-and-conditions','contact'].includes(path) && !roles.some(r => path === 'services/'+r.slug)) notFound()
 return <Suspense fallback={null}><App/></Suspense>
}
