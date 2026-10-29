'use client'

import { useId, useRef, useState } from 'react'
import HomeCalendarLink from './HomeCalendarLink'

const options = [
  {
    label: 'Pay as you go', heading: 'FOR WORK THAT COMES AND GOES',
    steps: [
      ['Tell us what you need', 'A short form with your estimated hours'],
      ['We get in touch', 'To discuss the work and the next steps'],
      ['You pay for the hours worked', 'Only the hours we spend on your tasks'],
    ],
    summary: 'Pay for the hours you use.', detail: 'Rate: agreed before work begins', action: 'Tell us what you need', form: 'hourly',
  },
  {
    label: 'Dedicated VA', heading: 'FOR STEADY, ONGOING WORK',
    steps: [
      ['Book a consultation', 'On the site, at a time that suits you'],
      ['We explain how it works', 'Your requirements, and how a dedicated VA runs'],
      ['Try a VA free for 2 days', 'Before you commit to anything'],
    ],
    summary: 'Try before you commit.', detail: 'Price: agreed during your consultation', action: 'Book a consultation', form: null,
  },
  {
    label: 'Project-based', heading: 'FOR A DEFINED PIECE OF WORK',
    steps: [
      ['Share your project details', 'Through the project form'],
      ['We review and talk it through', 'With an NDA first if you need one'],
      ['Free initial audit and estimate', 'Once we understand the full scope'],
    ],
    summary: 'A free audit before you commit.', detail: 'Estimate: custom to your project', action: 'Submit your project', form: 'project',
  },
]

export default function WorkOptionsSection() {
  const [active, setActive] = useState(0)
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const selectTab = (index: number) => { setActive(index); tabs.current[index]?.focus() }
  return <section className="reclaim section work-options" aria-labelledby={`${id}-title`}>
    <div className="reclaim-copy reveal">
      <span className="eyebrow">THREE WAYS TO WORK</span>
      <h2 id={`${id}-title`}>Match <em>OUR</em> Support<br/>To <em>YOUR</em> Needs</h2>
      <p>Some weeks you only need one thing done, whereas some months you need a steady extra pair of hands, and sometimes it’s a full project with a clear finish line.</p>
      <p>At BrainBoys AI, you only pay for the brainpower you actually use.</p>
      <a className="text-link" href="/hire-a-team">Hire a brain on demand <span aria-hidden="true">↗︎</span></a>
      <div className="reclaim-signature"><img src="/brainboys-mark.png" alt=""/><span>TELL US WHAT YOU NEED.<br/><strong>WE’LL TAKE IT FROM THERE.</strong></span></div>
    </div>
    <div className="work-options-card reveal">
      <div className="work-options-top"><span className="eyebrow">YOUR FIRST STEP</span><span aria-hidden="true">↗︎</span></div>
      <div className="work-options-tabs" role="tablist" aria-label="Ways to work with BrainBoys AI">
        {options.map((option, index) => <button key={option.label} ref={node => { tabs.current[index] = node }} type="button" role="tab" id={`${id}-tab-${index}`} aria-selected={active === index} aria-controls={`${id}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
          const next = event.key === 'ArrowRight' ? (index + 1) % options.length : event.key === 'ArrowLeft' ? (index + options.length - 1) % options.length : event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : null
          if (next !== null) { event.preventDefault(); selectTab(next) }
        }}>{option.label}</button>)}
      </div>
      {options.map((option, index) => <div key={option.label} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} tabIndex={0} className="work-options-panel">
        <h3>{option.heading}</h3>
        <div className="work-options-steps">{option.steps.map(([title, subtitle], step) => <div className="work-options-step" key={title}><span className="work-options-number">0{step + 1}</span><span className="work-options-check" aria-hidden="true">{step === 2 ? '↗︎' : '✓'}</span><div><strong>{title}</strong><p>{subtitle}</p></div></div>)}</div>
        {index > 0 && <div className="work-options-summary"><span aria-hidden="true">✧</span><div><strong>{option.summary}</strong><p>{option.detail}</p>{option.form ? <button type="button" aria-haspopup="dialog" onClick={() => window.dispatchEvent(new CustomEvent('brainboys:package-form', { detail: option.form }))}>{option.action}</button> : <HomeCalendarLink>{option.action}</HomeCalendarLink>}</div></div>}
      </div>)}
    </div>
  </section>
}
