'use client'

import { useState } from 'react'

const questions = [
  { title: 'What are the ways to work with BrainBoys AI?', paragraphs: ['There are three ways: 1. Pay as you go  2. Dedicated Virtual Assistant  3. Project-based work.', 'Pay as you go suits work that varies, a dedicated VA suits steady ongoing work, and project-based suits work with a defined scope.'] },
  { title: 'How does Pay as you go work?', paragraphs: ['The client submits a short requirements form with an estimate of the hours needed (one, two, three or more), and BrainBoys AI bills for the hours actually worked.', 'A free 15-minute consultation is available beforehand.'], action: 'Build your estimate', form: 'hourly' },
  { title: 'How does a project begin?', paragraphs: ['The client submits the project form, and the team reviews it and makes contact. Once the scope is clear, BrainBoys AI provides a free initial audit and estimate.'] },
  { title: 'Who is the Dedicated Virtual Assistant for, and is there a trial?', paragraphs: ['The Dedicated VA is designed mainly for agencies, although individuals can use it too. The process starts with a consultation call booked through the site, followed by a free two-day trial.'], action: 'Book a call', form: 'virtual-assistant' },
  { title: 'Is a monthly retainer required?', paragraphs: ['Pay-as-you-go and project-based work require no retainer, while our ongoing Dedicated VA arrangement does.'] },
  { title: 'How soon can work begin?', paragraphs: ['Once BrainBoys AI has the requirements, a specialist is assigned and work begins within two business days.'] },
  { title: 'How are hours and progress tracked?', paragraphs: ['Work is tracked on the platforms such as Slack etc., so progress stays visible and can be easily tracked by the clients. A dedicated project manager oversees each engagement, keeps communication clear and is available by direct message.'] },
  { title: 'Is project information kept confidential?', paragraphs: ['Yes. BrainBoys AI can arrange a non-disclosure agreement before project details are shared.'] },
]

export default function HomeFAQ() {
  const [openQuestion, setOpenQuestion] = useState(0)
  return <section className="home-faq section home-faq-updated" id="questions" aria-labelledby="home-faq-title">
    <div className="reveal">
      <span className="eyebrow">A LITTLE CLARITY</span>
      <h2 id="home-faq-title">Everything to know<br/><span className="serif">before you begin</span></h2>
      <p>Questions about pricing, trials, timelines and how the work is managed.</p>
      <p className="home-faq-question">Have a question that is not covered here?</p>
      <a className="text-link" href="/contact">Get in touch <span aria-hidden="true">↗︎</span></a>
      <img className="faq-mark" src="/brainboys-mark.png" alt="" width="130" height="130" loading="lazy"/>
    </div>
    <div className="faq-list reveal">{questions.map((question, index) => <details key={question.title} open={openQuestion === index}>
      <summary onClick={event => { event.preventDefault(); setOpenQuestion(index) }}><span>0{index + 1}</span>{question.title}<b aria-hidden="true">+</b></summary>
      {question.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      {question.action && <button type="button" className="home-faq-form-button" aria-haspopup="dialog" onClick={() => window.dispatchEvent(new CustomEvent('brainboys:package-form', { detail: question.form }))}>{question.action} <span className="ui-arrow" aria-hidden="true"/></button>}
    </details>)}</div>
  </section>
}
