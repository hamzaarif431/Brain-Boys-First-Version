'use client'
import { useState } from 'react'
import { PageIntro } from './PageShared'
import { ReviewsCTA } from '../ExperienceEnhancements'
import { BookingSection } from '../NewHomeSections'

type PortfolioCategory = 'GHL' | 'WordPress' | 'Ecommerce' | 'Custom Solutions' | 'Dashboards'
type PortfolioItem = { category: PortfolioCategory; src: string; label: string }

const source = 'https://storage.googleapis.com/msgsndr/2P8JVbJL33ibDdtT76b6/media/'
const files: Record<PortfolioCategory, string[]> = {
  GHL: [
    '69ca8c6d1ef83f74c647ca89.png','69ca8c6d48cc803e2c99397a.png','69ca8c6de7780f10da2c1755.png','69ca8c6d48cc8033c2993979.png','69ca8c6de7780f33272c1754.png','69ca8c6dc5980b57221880db.png',
    '677d00329c24d91a3f1b0812.png','677d01379c24d98d661b0988.png','677d01376419fd2707a34758.png','677d0137d4ebc418cfd834e8.png','67b189407c33f486435c7503.png','67b189402aa0e90564ed987e.png','67b189402aa0e9f19bed987f.png','67b18a6e2aa0e9dc35eda545.png'
  ],
  WordPress: ['677d03de9c24d915c21b0b53.png','677d03de9c24d922e71b0b52.png','677d03de65b87e661a16fee9.png','677d03ded4ebc4316ed8370c.png','67b187d070fcfe862b243269.png','67b187d011feb96041d1f81b.png','67b187d07c33f477b15c7470.png','67b187d011feb99610d1f81c.png','67b187d070fcfea25324326a.png'],
  Ecommerce: ['67b188c370fcfe1ba52432e0.png','67b188762de3ab3fe49b119c.png','67b18ae27c33f4589a5c7e1c.png','67b18ae211feb964a7d20a66.png'],
  'Custom Solutions': ['67b186e611feb90d56d1f73c.png','67b186e67c33f410d65c7385.png','67b186e670fcfe932b24316c.png','67b186e611feb9110dd1f73b.png','67b188762de3ab3fe49b119c.png','67b18ae27c33f4589a5c7e1c.png','67b18ae211feb964a7d20a66.png'],
  Dashboards: ['677d09846e3c7400f52a1f33.jpeg','677d098465b87eafd0172047.jpeg','677d098465b87e32a4172049.jpeg','677d09846e3c74346e2a1f32.jpeg','677d098465b87e1a3d172048.jpeg','677d09846e3c7461ac2a1f34.jpeg']
}

const firstSixGhl = new Set(files.GHL.slice(0, 6))
const portfolioItems: PortfolioItem[] = (Object.entries(files) as [PortfolioCategory, string[]][]).flatMap(([category, names]) => names.map((name, index) => ({
  category,
  src: firstSixGhl.has(name) ? `https://assets.cdn.filesafe.space/2P8JVbJL33ibDdtT76b6/media/${name}` : source + name,
  label: `${category} project ${String(index + 1).padStart(2, '0')}`
})))

const filters: Array<'All' | PortfolioCategory> = ['All', 'GHL', 'WordPress', 'Ecommerce', 'Custom Solutions', 'Dashboards']

export function PortfolioPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const visible = filter === 'All' ? portfolioItems : portfolioItems.filter(item => item.category === filter)
  return <>
    <PageIntro number="04" kicker="Portfolio" title="Built to move." accent="Made to matter." description="A selection of CRM systems, websites, ecommerce experiences, custom platforms and dashboards delivered by our team.">
      <a className="text-link" href="#portfolio-showcase">Explore the work ↓</a>
    </PageIntro>
    <section className="portfolio-showcase section" id="portfolio-showcase">
      <div className="portfolio-heading reveal">
        <div><span className="eyebrow">PORTFOLIO SHOWCASE / {portfolioItems.length} PROJECTS</span><h2>Scroll the work.<br/><span className="serif">See the full picture.</span></h2></div>
        <p>Hover over a project to travel from the top of the page to the bottom. On touch devices, each preview stays positioned at its strongest opening frame.</p>
      </div>
      <div className="portfolio-filters" aria-label="Filter portfolio projects">{filters.map(name => <button key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}<span>{name === 'All' ? portfolioItems.length : portfolioItems.filter(item => item.category === name).length}</span></button>)}</div>
      <p className="portfolio-count" role="status">Showing {visible.length} {filter === 'All' ? 'projects across every capability' : `${filter} projects`}</p>
      <div className="portfolio-grid">{visible.map((item, index) => <article className="portfolio-card reveal" key={`${item.category}-${item.src}`} tabIndex={0}>
        <div className="portfolio-browser"><div className="portfolio-browser-bar"><i/><i/><i/><span>brainboys / selected work</span></div><div className="portfolio-preview"><img src={item.src} alt={`${item.category} website project preview`} loading={index < 4 ? 'eager' : 'lazy'} /></div></div>
        <div className="portfolio-card-meta"><span>{String(index + 1).padStart(2, '0')} / {item.category.toUpperCase()}</span><h3>{item.label}</h3><b>SCROLL PREVIEW ↓</b></div>
      </article>)}</div>
    </section>
    <ReviewsCTA/>
    <BookingSection/>
  </>
}

