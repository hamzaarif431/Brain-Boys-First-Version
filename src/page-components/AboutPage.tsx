'use client'

import Link from 'next/link'
import PeopleSection from '../PeopleSection'
import { VideoTestimonialsSection } from '../NewHomeSections'
import HomeCalendarLink from '../HomeCalendarLink'

const principles = [
  { title: 'People with purpose.', text: 'Developers, designers, automators and operators, working together around the outcome you need.', icon: 'people' },
  { title: 'Systems that connect.', text: 'Your CRM, workflows and everyday tools, joined up so the work moves with fewer handoffs.', icon: 'connect' },
  { title: 'Progress you can see.', text: 'Clear priorities, direct communication and practical updates from the first brief to delivery.', icon: 'progress' },
]

function PrincipleIcon({ kind }: { kind: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{kind === 'people' ? <><circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v3"/></> : kind === 'connect' ? <><rect x="3" y="3" width="6" height="6" rx="2"/><rect x="15" y="15" width="6" height="6" rx="2"/><path d="M9 6h6a3 3 0 0 1 3 3v6M6 9v6a3 3 0 0 0 3 3h6"/></> : <><path d="M4 20h16M6 15V9M12 15V4M18 15v-7"/><path d="m15 5 3-3 3 3"/></>}</svg>
}

export default function AboutPage() {
  return <div className="about-page">
    <section className="about-hero section" aria-labelledby="about-title">
      <div className="about-hero-copy reveal"><span className="eyebrow"><i/> THE BrainBoys Ai WAY</span><h1 id="about-title">Good people.<br/><span className="serif">Brilliant<br/>possibilities.</span></h1><p>We bring human expertise and intelligent systems together. One connected team, built around the way you work and where you want to go.</p><div className="about-hero-actions"><a className="button lime-button" href="#experts">Meet the people <span className="ui-arrow" aria-hidden="true"/></a><HomeCalendarLink className="text-link">Let’s talk <span className="ui-arrow" aria-hidden="true"/></HomeCalendarLink></div></div>
      <div className="about-hero-art reveal" aria-hidden="true"><div className="about-orbit about-orbit-one"/><div className="about-orbit about-orbit-two"/><span className="about-art-label">CONNECTED BY POSSIBILITY</span><div className="about-art-mark"><img src="/brainboys-mark.png" alt="" width="350" height="350"/></div><div className="about-person-chip about-chip-one"><img src="/CTO.png" alt=""/><span>Human-led.<small>THE RIGHT EXPERTISE</small></span></div><div className="about-person-chip about-chip-two"><img src="/AI.png" alt=""/><span>AI-powered.<small>SMARTER SYSTEMS</small></span></div><div className="about-art-note"><i/> Different strengths. One shared direction.</div></div>
      <div className="about-hero-ribbon"><span><i/> PEOPLE FIRST</span><span><i/> CONNECTED THINKING</span><span><i/> WORK THAT MOVES YOU FORWARD</span></div>
    </section>

    <section className="about-story section" aria-labelledby="about-story-title">
      <div className="about-story-heading reveal"><span className="eyebrow">WHO WE ARE</span><h2 id="about-story-title">Your ambition deserves<br/><span className="serif">more than another handoff.</span></h2></div>
      <div className="about-story-body reveal"><p className="about-story-lead">Great work happens when the right minds work together.</p><p>BrainBoys Ai connects specialist talent with the technology that helps it go further. From web development and design to CRM, AI automation and operations, we bring the right skills into one working relationship.</p><p>We start with your business, your tools and the work in front of you. Then we shape a team and a clear plan around it, so you can spend more time moving forward.</p><Link className="text-link" href="/services">Find your next advantage <span className="ui-arrow" aria-hidden="true"/></Link></div>
    </section>

    <section className="about-principles section" aria-labelledby="about-principles-title"><div className="about-principles-top reveal"><div><span className="eyebrow">HOW WE COME TOGETHER</span><h2 id="about-principles-title">A team that fits<br/><span className="serif">your world.</span></h2></div><p>Good collaboration should feel natural. These are the things we bring to every working relationship.</p></div><div className="about-principles-grid">{principles.map(principle => <article className="about-principle reveal" key={principle.title}><span className="about-principle-icon"><PrincipleIcon kind={principle.icon}/></span><h3>{principle.title}</h3><p>{principle.text}</p></article>)}</div></section>

    <PeopleSection/>
    <VideoTestimonialsSection/>
    <section className="about-next section"><div className="about-next-inner reveal"><span className="eyebrow"><i/> YOUR NEXT CHAPTER</span><h2>Let’s put good minds<br/><span className="serif">to work for you.</span></h2><p>One conversation to understand the work, explore the possibilities and find your next team.</p><HomeCalendarLink className="button lime-button">Book a strategy call <span className="ui-arrow" aria-hidden="true"/></HomeCalendarLink><img src="/brainboys-mark.png" alt="" width="300" height="300"/></div></section>
  </div>
}
