'use client'

import FounderStory from './FounderStory'

const people = [
  { position: '01', name: 'Muhammad Faraz', role: 'Chief Executive Officer', image: '/muhammad-faraz-cutout-v2.png', details: 'Leads overall business operations, strategic planning, and organizational growth.' },
  { position: '02', name: 'Muhammad Ahmed Ali', role: 'Chief Technical Officer', image: '/CTO.png', details: 'Oversees technical strategy, system architecture, and technology implementation across projects.' },
  { position: '03', name: 'Muhammad Asim', role: 'Business Development Manager', image: '/BDM.png', details: 'Builds client relationships, identifies growth opportunities, and connects businesses with the right BrainBoys AI solutions.' },

  { position: '04', name: 'Mohammad Hamzah', role: 'Senior Account Manager', image: '/AM.png', details: 'Manages client relationships, understands business needs, and maintains clear communication throughout the engagement.' },
  { position: '05', name: 'Fatima Ali', role: 'Senior Project Manager', image: '/SPM.png', details: 'Plans and coordinates projects, managing priorities, timelines, resources, and deliverables.' },

  { position: '06', name: 'Umamah Nadeem', role: 'Social Media Manager', image: '/SMM.png', details: 'Develops and manages social media strategies to strengthen brand awareness and online presence.' },
  { position: '07', name: 'Hamza Arif', role: 'AI Specialist', image: '/AI.png', details: 'Develops AI-powered solutions and intelligent automations that improve business efficiency.' },
  { position: '08', name: 'Sakina Ramza Jaafer', role: 'Outreach Expert', image: '/OE.png', details: 'Identifies relevant prospects and develops targeted outreach strategies to create new business opportunities.' },
  { position: '09', name: 'Mubeen Saleem', role: 'Wordpress Expert', image: '/WE.png', details: 'Builds, customizes, and maintains WordPress websites tailored to client requirements.' },
  { position: '10', name: 'Abdul Haseeb', role: 'Funnel Expert', image: '/FE.png', details: 'Designs and builds sales funnels that guide visitors from initial interest toward conversion.' },
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
      <span className="people-card-number">{person.position}</span>
      <div className="people-card-copy"><span className="people-card-role">{person.role}</span><h3>{person.name}</h3><p>{person.details}</p></div>

    </article>)}</div>

  </section>
}

