'use client'

import FounderStory from './FounderStory'

const people = [
  { name: 'Muhammad Faraz', role: 'Chief Executive Officer', image: '/muhammad-faraz-cutout-v2.png' },
  { name: 'Muhammad Ahmed Ali', role: 'Chief Technical Officer', image: '/CTO.png' },
  { name: 'Muhammad Asim', role: 'Business Development Manager', image: '/BDM.png' },

  { name: 'Mohammad Hamzah', role: 'Senior Account Manager', image: '/AM.png' },
  { name: 'Fatima Ali', role: 'Senior Project Manager', image: '/SPM.png' },

  { name: 'Umamah Nadeem', role: 'Social Media Manager', image: '/SMM.png' },
  { name: 'Hamza Arif', role: 'AI Specialist', image: '/AI.png' },
  { name: 'Sakina Ramza Jaafer', role: 'Outreach Expert', image: '/OE.png' },
  { name: 'Mubeen Saleem', role: 'Wordpress Expert', image: '/WE.png' },
  { name: 'Abdul Haseeb', role: 'Funnel Expert', image: '/FE.png' },
]

export default function PeopleSection() {
  return <section className="people-section section" id="experts" aria-labelledby="people-title">
    <div className="section-top reveal"><span className="eyebrow">THE PEOPLE BEHIND THE POSSIBILITY</span><span className="muted">People first. Powerful work follows.</span></div>
    <div className="people-heading reveal"><div><h2 id="people-title">The people behind<br/><span className="serif">the work.</span></h2><p>A senior core team, plus specialists matched to your stack. Every project starts with people who know how to move it forward.</p></div><a className="text-link" href="/contact">Meet your next team ↗︎</a></div>
    <FounderStory/>
    <div className="internal-team-heading reveal"><div><span className="eyebrow">OUR INTERNAL TEAM</span><h3>Different minds.<br/><span className="serif">One shared standard.</span></h3></div><p>The people who turn the plan into progress. Your core team, connected from brief to delivery.</p></div>
    <div className="people-grid about-team-grid">{people.map((person, index) => <article className={`people-card${person.role === 'Chief Executive Officer' ? ' people-card-ceo' : ''}`} key={person.name}>
      <img src={person.image} alt={`${person.name}, ${person.role} at BrainBoys AI`} loading="lazy" width="640" height="800" />
      <div className="people-card-shade" />
      <span className="people-card-number">0{index + 1}</span>
      <div className="people-card-copy"><span className="people-card-role">{person.role}</span><h3>{person.name}</h3><p>Part of the core delivery team — matched to your stack from day one.</p></div>

    </article>)}</div>

  </section>
}

