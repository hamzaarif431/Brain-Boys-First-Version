'use client'

import { useRef } from 'react'
import Link from 'next/link'

const bots = [
  { id: 'conversation', title: 'Conversation AI', category: 'CUSTOMER CONVERSATIONS', description: 'Answer questions, qualify leads and keep the conversation moving through your business number or website chat widget.', channels: ['Business number', 'Chat widget'], upcoming: false },
  { id: 'widget-voice', title: 'Website Voice AI', category: 'A VOICE FOR YOUR WEBSITE', description: 'Give visitors a more personal way to connect. Add a voice-enabled AI widget that answers questions and helps people take the next step.', channels: ['Voice widget', 'Website'], upcoming: false },
  { id: 'phone-voice', title: 'Phone Voice AI', category: 'YOUR NUMBER. YOUR AI.', description: 'Connect an AI voice assistant to your business phone number to handle enquiries, capture details and guide callers when your team is busy.', channels: ['Your phone number', 'Voice calls'], upcoming: false },
  { id: 'social-media', title: 'Social Media Handler', category: 'YOUR SOCIAL SIDEKICK', description: 'A helping hand for your social presence. Plan content, organise your publishing schedule and keep your brand active across your channels.', channels: ['Content planning', 'Social media'], upcoming: true },
  { id: 'lead-scraping', title: 'Lead Scraping Bot', category: 'FIND YOUR NEXT OPPORTUNITY', description: 'Turn prospect research into a clearer pipeline. Discover relevant business leads and organise the details your outreach team needs.', channels: ['Lead discovery', 'Prospect research'], upcoming: false },
  { id: 'seo', title: 'SEO Optimisation Bot', category: 'BUILT TO BE DISCOVERED', description: 'Find opportunities to improve your search presence, review on-page content and turn SEO insights into a focused optimisation plan.', channels: ['Website audits', 'On-page SEO'], upcoming: true },
  { id: 'ads-manager', title: 'Ads Manager Bot', category: 'YOUR CAMPAIGN CO-PILOT', description: 'Bring more clarity to your paid campaigns. Organise ad planning, monitor campaign performance and surface opportunities to improve your advertising.', channels: ['Campaign planning', 'Ad insights'], upcoming: true },
  { id: 'custom-bot', title: 'Customize Your Own Bot', category: 'YOUR IDEA. YOUR AI.', description: 'Have a workflow that needs something different? Tell us what you want your bot to do and we’ll shape a custom AI assistant around your tools and business.', channels: ['Custom workflows', 'Your integrations'], upcoming: false },
]

function SliderArrow({ next = false }: { next?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={next ? 'M5 12h14m-6-6 6 6-6 6' : 'M19 12H5m6-6-6 6 6 6'}/></svg>
}

export default function AIBotsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const slide = (direction: number) => {
    const track = trackRef.current
    const card = track?.querySelector<HTMLElement>('.ai-bot-card')
    if (!track || !card) return
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 22
    const end = track.scrollWidth - track.clientWidth
    const next = direction > 0 && track.scrollLeft >= end - 2 ? 0 : direction < 0 && track.scrollLeft <= 2 ? end : track.scrollLeft + direction * (card.offsetWidth + gap)
    track.scrollTo({ left: next, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  return <section className="ai-bots-section" id="ai-bots" aria-labelledby="ai-bots-title">
    <header className="ai-bots-heading reveal">
      <div><span className="eyebrow"><i/> INTELLIGENCE, ON YOUR SIDE</span><h2 id="ai-bots-title">Tiny bots,<br/><span className="serif">Huge possibilities</span></h2></div>
      <div className="ai-bots-intro"><p>Meet your new digital teammates. Purpose-built AI for all your work needs to keep your business moving</p><span><i aria-hidden="true"/> Built around your tools and your brand</span></div>
    </header>
    <div className="ai-bots-toolbar reveal"><span><b>THE BOT COLLECTION</b> / EXPLORE ALL {bots.length}</span><div className="stories-controls"><button type="button" onClick={() => slide(-1)} aria-label="Previous AI bot" aria-controls="ai-bots-slider"><SliderArrow/></button><button type="button" onClick={() => slide(1)} aria-label="Next AI bot" aria-controls="ai-bots-slider"><SliderArrow next/></button></div></div>
    <div className="ai-bots-track reveal" ref={trackRef} id="ai-bots-slider" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="AI bots. Scroll horizontally to explore the collection.">
      {bots.map(bot => <article className={`ai-bot-card${bot.upcoming ? ' is-upcoming' : ''}`} key={bot.id}>
        <div className={`ai-bot-art ai-bot-art-${bot.id}`}><img src={`/bots/${bot.id}.svg`} alt={`${bot.title} assistant illustration`} width="640" height="440" loading="lazy"/><span className="ai-bot-status"><i aria-hidden="true"/>{bot.upcoming ? 'Coming soon' : 'Available now'}</span><img className="ai-bot-brand" src="/brainboys-mark.png" alt="BrainBoys AI" width="32" height="32"/></div>
        <div className="ai-bot-copy"><span className="ai-bot-category">{bot.category}</span><h3>{bot.title}</h3><p>{bot.description}</p><div className="ai-bot-channels">{bot.channels.map(channel => <span key={channel}>{channel}</span>)}</div>
          {bot.upcoming ? <button type="button" className="ai-bot-purchase" disabled><span>Coming soon</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></button> : <Link className="ai-bot-purchase" href={`/contact?roles=${encodeURIComponent(bot.title)}`}><span>{bot.id === 'custom-bot' ? 'Customize your bot' : 'Purchase your bot'}</span><span className="ui-arrow" aria-hidden="true"/></Link>}
        </div>
      </article>)}
    </div>
    <div className="ai-bots-footnote"><span>HUMAN EXPERTISE. A LITTLE MORE AUTOMATED.</span><a href="/contact">Need a bot of your own? Let’s build it <span className="ui-arrow" aria-hidden="true"/></a></div>
  </section>
}
