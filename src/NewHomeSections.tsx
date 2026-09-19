import { useRef, useState } from 'react'

const people = [
  { name: 'Ayaan Malik', role: 'Head of Automation', image: '/team-ayaan.jpg' },
  { name: 'Sofia Rehman', role: 'CRM & GoHighLevel Lead', image: '/team-sofia.jpg' },
  { name: 'Daniel Okoye', role: 'Full-Stack Engineer', image: '/team-daniel.jpg' },
  { name: 'Hira Shaikh', role: 'Design & Motion Lead', image: '/team-hira.jpg' },
  { name: 'Marco Bellini', role: 'Performance Marketing', image: '/team-marco.jpg' },
  { name: 'Zara Iqbal', role: 'Delivery Manager', image: '/team-zara.jpg' },
]

export function PeopleSection() {
  return <section className="people-section section" id="experts" aria-labelledby="people-title">
    <div className="section-top reveal"><span className="eyebrow">04 / THE PEOPLE BEHIND THE POSSIBILITY</span><span className="muted">People first. Powerful work follows.</span></div>
    <div className="people-heading reveal"><div><h2 id="people-title">The people behind<br/><span className="serif">the work.</span></h2><p>A senior core team, plus specialists matched to your stack. Every project starts with people who know how to move it forward.</p></div><a className="text-link" href="/contact">Meet your next team ↗</a></div>
    <div className="people-grid">{people.map((person, index) => <article className="people-card reveal" key={person.name}>
      <img src={person.image} alt={`${person.name}, ${person.role} at Brainboys AI`} loading="lazy" width="640" height="800" />
      <div className="people-card-shade" />
      <span className="people-card-number">0{index + 1}</span>
      <div className="people-card-copy"><span className="people-card-role">{person.role}</span><h3>{person.name}</h3><p>Part of the core delivery team — matched to your stack from day one.</p></div>
      <span className="people-card-arrow" aria-hidden="true">↗</span>
    </article>)}</div>
  </section>
}

const plans = [
  { number: '01', name: 'The specialist', tag: 'FOCUSED EXPERTISE', description: 'One dedicated expert plugged into the work you need to move now.', features: ['Matched to your tools and goals', 'Clear monthly scope and priorities', 'Direct collaboration with your team', 'Room to add more support'], action: 'Find your specialist', href: '#book-calendar' },
  { number: '02', name: 'The connected pod', tag: 'MOST FLEXIBLE', description: 'A small, coordinated team covering the skills your next chapter needs.', features: ['A complementary mix of specialists', 'One delivery lead and shared plan', 'Creative, technical and operations support', 'Flexible capacity as priorities change'], action: 'Build your pod', href: '#book-calendar' },
  { number: '03', name: 'The growth engine', tag: 'TEAM + AUTOMATION', description: 'People and intelligent systems working together to take the repeat work away.', features: ['Multi-skill team built around your stack', 'CRM and automation strategy', 'Connected workflows and reporting', 'Ongoing iteration as you scale'], action: 'Map your growth engine', href: '#book-calendar' },
]

export function PricingSection() {
  return <section className="pricing-section section" id="pricing" aria-labelledby="pricing-title">
    <div className="section-top reveal"><span className="eyebrow">05 / YOUR TEAM, YOUR TERMS</span><span className="muted">A plan shaped by your priorities.</span></div>
    <div className="pricing-heading reveal"><div><h2 id="pricing-title">Support that fits.<br/><span className="serif">Space to grow.</span></h2><p>Choose the shape of your team. We&apos;ll agree the scope, availability and monthly price with you before work begins.</p></div><span className="pricing-heading-mark">✳</span></div>
    <div className="pricing-grid">{plans.map((plan, index) => <article className={`pricing-card reveal${index === 1 ? ' pricing-card-featured' : ''}`} key={plan.name}>
      <div className="pricing-card-top"><span>{plan.number} / {plan.tag}</span><span>↗</span></div>
      <h3>{plan.name}</h3><p>{plan.description}</p>
      <div className="pricing-price"><strong>Custom</strong><span>monthly proposal</span></div>
      <div className="pricing-divider" />
      <span className="pricing-includes">WHAT&apos;S INCLUDED</span>
      <ul>{plan.features.map(feature => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
      <a href={plan.href}>{plan.action}<span>↗</span></a>
    </article>)}</div>
    <div className="pricing-bottom reveal"><span>✧</span><p>Need one role, a whole pod, or something in between? We&apos;ll tailor the proposal to the work — and make the terms clear from day one.</p><a href="#book-calendar">Let&apos;s scope it together ↗</a></div>
  </section>
}

const stories = [
  { id: '1042974934', image: '/testimonial-1.jpg', title: 'Systems that finally feel simple.' },
  { id: '1042975177', image: '/testimonial-2.jpg', title: 'Reliable support, without the chase.' },
  { id: '1042975600', image: '/testimonial-3.jpg', title: 'A team that keeps momentum moving.' },
  { id: '1042975775', image: '/testimonial-4.jpg', title: 'More room to focus on the business.' },
]

export function VideoTestimonialsSection() {
  const [playing, setPlaying] = useState<string | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const slide = (direction: number) => {
    const strip = stripRef.current
    if (!strip) return
    const card = strip.querySelector<HTMLElement>('.story-card')
    strip.scrollBy({ left: direction * ((card?.offsetWidth ?? 360) + 18), behavior: 'smooth' })
  }
  return <section className="video-stories section" id="video-stories" aria-labelledby="stories-title">
    <div className="section-top reveal"><span className="eyebrow">06 / CLIENT VIDEO STORIES</span><span className="muted">Real voices. Real working relationships.</span></div>
    <div className="stories-heading reveal"><div><h2 id="stories-title">Don&apos;t take our word.<br/><span className="serif">Take theirs.</span></h2><p>Hear from clients who have worked with our team through SyncJourney.</p></div><div className="stories-controls"><button type="button" aria-label="Previous video testimonial" onClick={() => slide(-1)}>←</button><button type="button" aria-label="Next video testimonial" onClick={() => slide(1)}>→</button></div></div>
    <div className="stories-strip" ref={stripRef} tabIndex={0} aria-label="Client video testimonials. Scroll horizontally to see more.">{stories.map((story, index) => <article className={'story-card' + (playing === story.id ? ' is-playing' : '')} key={story.id}>
      <div className="story-media">{playing === story.id ? <><iframe src={`https://player.vimeo.com/video/${story.id}?autoplay=1`} title={`Client video testimonial ${index + 1}`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /><button type="button" className="story-close" aria-label={`Close client testimonial ${index + 1}`} onClick={() => setPlaying(null)}>×</button></> : <>
        <img src={story.image} alt={`Client testimonial video ${index + 1}`} loading="lazy" width="640" height="800"/>
        <div className="story-shade" />
        <span className="story-number">0{index + 1}</span><span className="story-corner" aria-hidden="true">↗</span>
        <button type="button" className="story-play" aria-label={`Play client testimonial ${index + 1}`} onClick={() => setPlaying(story.id)}><span>▶</span><b>PLAY STORY</b></button>
        <div className="story-card-copy"><span className="story-card-role">CLIENT VIDEO STORY</span><h3>{story.title}</h3><p>Hear the story in their own words.</p></div>
      </>}</div>
    </article>)}</div>
    <div className="stories-end"><span>DRAG OR SCROLL TO EXPLORE MORE STORIES</span><span aria-hidden="true">↔</span></div>
  </section>
}

const badges = [
  { image: '/cert-1.png', name: 'HighLevel Certified Admin' },
  { image: '/cert-2.png', name: 'Local Hero' },
  { image: '/cert-3.png', name: 'AI Employee' },
  { image: '/cert-4.png', name: 'HIPAA' },
  { image: '/cert-5.png', name: 'Course Creator' },
  { image: '/cert-6.png', name: 'Paid Ads' },
  { image: '/cert-7.png', name: 'Quick Wins' },
  { image: '/cert-8.png', name: 'Social Media Manager' },
  { image: '/cert-9.png', name: 'Automated Swag Store' },
]
const directory = 'https://directory.gohighlevel.com/pakistan/karachi/certified-admins/ahsan-baghdadi'

export function CertificationSection() {
  return <section className="certification-section" id="certifications" aria-labelledby="certification-title">
    <div className="certification-inner section"><div className="section-top reveal"><span className="eyebrow">07 / CERTIFIED EXPERTISE</span><span className="muted">Credentials you can check.</span></div>
      <div className="certification-feature reveal"><div className="certification-copy"><span className="certification-kicker"><i/> TOP-RATED GHL EXPERTISE</span><h2 id="certification-title">The work is personal.<br/><span className="serif">The credentials are real.</span></h2><p>From CRM architecture to automation and growth campaigns, our HighLevel capability is backed by certification and specialist badges earned through the platform.</p><a href={directory} target="_blank" rel="noopener noreferrer">View Ahsan&apos;s certified profile <span>↗</span></a></div><div className="certification-hero-badge"><div className="certification-orbit"/><img src="/cert-1.png" alt="HighLevel Certified Admin badge" width="260" height="260"/><span>HIGHLEVEL<br/>CERTIFIED ADMIN</span></div></div>
    </div>
    <div className="badge-marquee" aria-label="HighLevel certification and skill badges"><div className="badge-track">{[...badges, ...badges].map((badge, index) => <a className="badge-item" href={directory} target="_blank" rel="noopener noreferrer" key={`${badge.name}-${index}`} aria-label={`${badge.name} badge — view certified profile`} aria-hidden={index >= badges.length} tabIndex={index >= badges.length ? -1 : 0}><img src={badge.image} alt={index < badges.length ? badge.name : ''} loading="lazy" width="120" height="120"/><span>{badge.name}</span></a>)}</div></div>
  </section>
}

export function BookingSection() {
  return <section className="booking-section" id="book-calendar" aria-labelledby="booking-title"><div className="booking-inner section">
    <header className="booking-heading reveal"><span className="eyebrow"><i/> PICK A TIME THAT WORKS</span><h2 id="booking-title">Let&apos;s put the next move<br/><span className="serif">on your calendar.</span></h2><p>Choose a time below for a free 30-minute consultation. We&apos;ll map the right expert, team or automation path for your business.</p></header>
    <div className="booking-card reveal"><div className="booking-topbar"><div><img src="/brainboys-mark.png" alt="Brainboys AI" width="52" height="52"/><p><strong>Brainboys consultation</strong><small>30 minutes · Free strategy call</small></p></div><span><i/> Calendar live</span></div><div className="booking-frame"><iframe id="brainboys-calendar" src="https://api.leadconnectorhq.com/widget/booking/xt6qPyqu3sBP6KBf5X6n" title="Book a consultation with Brainboys" loading="lazy" /></div><div className="booking-trust"><span>🔒 Secure booking</span><span>✓ No commitment</span><span>✓ Confirmation sent instantly</span></div></div>
  </div></section>
}

