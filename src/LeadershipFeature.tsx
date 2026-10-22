'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ExternalEmbed from './ExternalEmbed'
import HomeCalendarLink from './HomeCalendarLink'

const leaders = {
  ceo: {
    name: 'Muhammad Faraz', title: 'CHIEF EXECUTIVE OFFICER', image: '/muhammad-faraz-cutout-v2.png', width: 1122, height: 1402,
    eyebrow: 'LEADERSHIP, WITH A PERSONAL TOUCH',
    description: 'Bringing people, technology and execution together. Muhammad Faraz leads BrainBoys Ai with a focus on connected systems, clear communication and work that moves your business forward.',
    focus: ['CRM & customer systems', 'AI & automation', 'Team & delivery'],
    note: 'ONE VISION.', promise: 'A team that feels like yours.',
  },
  cfo: {
    name: 'Ahsan Bhaghdadi', title: 'CHIEF FINANCIAL OFFICER', image: '/ahsan-bhaghdadi-cutout-v2.png', width: 1122, height: 1402,
    eyebrow: 'CLEAR THINKING. CONFIDENT GROWTH.',
    description: 'Financial clarity behind every next step. Ahsan Bhaghdadi supports BrainBoys Ai with thoughtful planning, responsible resource management and a clear focus on sustainable business growth.',
    focus: ['Financial planning', 'Business strategy', 'Sustainable growth'],
    note: 'A SHARED AMBITION.', promise: 'A stronger foundation for what’s next.',
  },
}

export default function LeadershipFeature({ role }: { role: keyof typeof leaders }) {
  const leader = leaders[role]
  const calendarRef = useRef<HTMLDialogElement>(null)
  const [calendarReady, setCalendarReady] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)

  useEffect(() => {
    if (!calendarOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [calendarOpen])

  const openCalendar = () => {
    setCalendarReady(true)
    setCalendarOpen(true)
    calendarRef.current?.showModal()
  }

  return <>
    <article className={`founder-feature founder-feature-${role} reveal`} aria-labelledby={`leader-${role}-title`}>
      <div className="founder-portrait"><span className="founder-orbit" aria-hidden="true"/><img className="founder-photo" src={leader.image} alt={`${leader.name}, ${role.toUpperCase()} of BrainBoys Ai`} width={leader.width} height={leader.height} loading="lazy"/><div className="founder-nameplate"><span>{leader.title}</span><strong>{leader.name}</strong><img src="/brainboys-mark.png" width="48" height="48" alt=""/></div></div>
      <div className="founder-copy"><span className="eyebrow"><i/>{leader.eyebrow}</span><h3 id={`leader-${role}-title`}>Meet the <span className="serif">{role.toUpperCase()}.</span></h3><p className="founder-intro">{leader.name}</p><p>{leader.description}</p><div className="founder-focus">{leader.focus.map(focus => <span key={focus}>{focus}</span>)}</div><div className="founder-bottom"><div><span>{leader.note}</span><strong>{leader.promise}</strong></div>{role === 'ceo' ? <button className="founder-contact" type="button" onClick={openCalendar} aria-haspopup="dialog">Let’s connect <span className="ui-arrow" aria-hidden="true"/></button> : <HomeCalendarLink className="founder-contact">Let’s connect <span className="ui-arrow" aria-hidden="true"/></HomeCalendarLink>}</div></div>
    </article>
    {role === 'ceo' && <dialog className="founder-calendar" ref={calendarRef} aria-labelledby="founder-calendar-title" onClose={() => setCalendarOpen(false)} onClick={event => { if (event.target === event.currentTarget) calendarRef.current?.close() }}>
      <div className="founder-calendar-header booking-topbar"><div><img src="/brainboys-mark.png" alt="BrainBoys Ai" width="52" height="52"/><p><strong id="founder-calendar-title">BrainBoys Ai consultation</strong><small>30 minutes · With Muhammad Faraz</small></p></div><div className="founder-calendar-actions"><span className="founder-calendar-status"><i aria-hidden="true"/> Calendar live</span><button type="button" className="founder-calendar-close" onClick={() => calendarRef.current?.close()} aria-label="Close booking calendar">×</button></div></div>
      <div className="founder-calendar-body">{calendarReady && <ExternalEmbed src="https://api.brainboys.ai/widget/booking/GKgTE4I3nRlJlnZb0ID1" allow="payment" scrolling="no" id="GKgTE4I3nRlJlnZb0ID1_1792086109034" title="Book a call with Muhammad Faraz"/>}</div>
      <div className="booking-trust founder-calendar-trust"><span>🔒 Secure booking</span><span>✓ No commitment</span><span>✓ Confirmation sent instantly</span></div>
    </dialog>}
  </>
}

export function CEOSection() {
  return <section className="people-section section home-ceo-section" id="meet-ceo" aria-labelledby="home-leadership-title"><div className="section-top reveal"><span className="eyebrow">THE PEOPLE BEHIND THE POSSIBILITY</span><span className="muted">People first. Powerful work follows.</span></div><div className="people-heading reveal"><div><h2 id="home-leadership-title">The people behind<br/><span className="serif">the work.</span></h2><p>A senior core team, plus specialists matched to your stack. Every project starts with people who know how to move it forward.</p></div><Link className="text-link" href="/about-us">Meet our team <span className="ui-arrow" aria-hidden="true"/></Link></div><LeadershipFeature role="ceo"/></section>
}
