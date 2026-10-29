'use client'

import { useId, useRef, useState } from 'react'

const reasons = [
  { tab: 'Flexibility', title: 'Total Flexibility', text: 'Scale your hours up or down, pause, or stop when your workload changes; zero long-term commitments holding you hostage.' },
  { tab: 'Under one roof', title: 'Everything Under One Roof', text: 'From GoHighLevel builds, AI automations, app development, ads, content, admin, tech. And project management, BrainBoys AI gives you a dedicated specialist for all your work needs in one place.' },
  { tab: 'GHL support', title: 'On-Demand GHL & Tech Support', text: 'Build, repair or extend your HighLevel account with BrainBoys AI specialists who know the platform inside and out, handling funnels, workflows, pipelines, and integration seamlessly.' },
  { tab: 'Visibility', title: 'Visibility & Transparency', text: 'Work side-by-side with your BrainBoys team inside your preferred workspace like Slack, Teams, or ClickUp, keeping total visibility over every project through daily communication and real-time progress updates.' },
  { tab: 'Plug-and-play', title: 'Onboarded within 48 hours', text: 'Skip the three-week onboarding process. Share your requirements, and BrainBoys AI matches you with the right team starting work within 48 hours.' },
]

export default function WhyBrainBoysSection() {
  const [active, setActive] = useState(0)
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const selectTab = (index: number, focus = false) => {
    setActive(index)
    const button = tabs.current[index]
    if (focus) button?.focus({ preventScroll: true })
    const strip = button?.parentElement
    if (button && strip && strip.scrollWidth > strip.clientWidth) {
      strip.scrollTo({ left: button.offsetLeft - (strip.clientWidth - button.offsetWidth) / 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    }
  }

  return <section className="why-brainboys section" id="process" aria-labelledby={`${id}-title`}>
    <div className="why-brainboys-layout">
      <div className="why-brainboys-intro reveal">
        <span className="eyebrow">WHY BRAINBOYS AI</span>
        <h2 id={`${id}-title`}>The right brain<br/><span className="serif">for your business</span></h2>
        <p>With BrainBoys AI, you get dedicated developers, HighLevel specialists, creative support and virtual assistants that work as a true extension of your team, so nothing ever gets lost between vendors.</p>
        <img src="/brainboys-mark.png" alt="BrainBoys AI connected minds" width="310" height="310" loading="lazy"/>
      </div>
      <div className="why-brainboys-detail reveal">
        <div className="why-brainboys-tabs" role="tablist" aria-label="Why work with BrainBoys AI">
          {reasons.map((reason, index) => <button key={reason.tab} type="button" role="tab" ref={node => { tabs.current[index] = node }} id={`${id}-tab-${index}`} aria-selected={active === index} aria-controls={`${id}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => selectTab(index)} onKeyDown={event => {
            const next = event.key === 'ArrowRight' ? (index + 1) % reasons.length : event.key === 'ArrowLeft' ? (index + reasons.length - 1) % reasons.length : event.key === 'Home' ? 0 : event.key === 'End' ? reasons.length - 1 : null
            if (next !== null) { event.preventDefault(); selectTab(next, true) }
          }}>{reason.tab}</button>)}
        </div>
        {reasons.map((reason, index) => <div className="why-brainboys-panel" role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} tabIndex={0} hidden={active !== index} key={reason.title}>
          <span className="why-brainboys-counter">0{index + 1} / 05</span>
          <h3>{reason.title}</h3><p>{reason.text}</p>
          <button className="why-brainboys-next" type="button" onClick={() => selectTab((index + 1) % reasons.length, true)}>Next: {reasons[(index + 1) % reasons.length].title} <span aria-hidden="true">→</span></button>
          <div className="why-brainboys-progress" aria-hidden="true">{reasons.map((item, dot) => <i className={dot === index ? 'is-active' : ''} key={item.tab}/>)}</div>
        </div>)}
      </div>
    </div>
    <div className="why-brainboys-summaries">{reasons.filter((_, index) => index !== active).map(reason => <article key={reason.title}><h3>{reason.title}</h3><p>{reason.text}</p></article>)}</div>
  </section>
}
