'use client'

import { Suspense, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import ExternalEmbed from './ExternalEmbed'
import HomeCalendarLink from './HomeCalendarLink'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SiteLoader() {
  const [leaving, setLeaving] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const leaveTimer = window.setTimeout(() => setLeaving(true), reduced ? 200 : 1450)
    const removeTimer = window.setTimeout(() => setVisible(false), reduced ? 450 : 2050)
    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    if (!visible) document.body.style.overflow = ''
  }, [visible])

  if (!visible) return null
  return <div className={`site-loader${leaving ? ' is-leaving' : ''}`} role="status" aria-live="polite" aria-label="BrainBoys AI is loading">
    <div className="loader-glow" aria-hidden="true" />
    <div className="loader-orbit loader-orbit-one" aria-hidden="true"><i/><b/></div>
    <div className="loader-orbit loader-orbit-two" aria-hidden="true"><i/></div>
    <img className="loader-mark" src="/brainboys-mark.png" alt="" />
    <div className="loader-copy"><span>BRILLIANT MINDS</span><strong>BrainBoys AI<span>.</span></strong><small>CONNECTING PEOPLE × SYSTEMS × POSSIBILITY</small></div>
    <div className="loader-progress" aria-hidden="true"><i/></div>
    <span className="loader-index">BB / 001</span>
  </div>
}

export function CRMSpotlight({ motion }: { motion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const activate = () => document.documentElement.classList.add('crm-theme-active')
    const deactivate = () => document.documentElement.classList.remove('crm-theme-active')
    const leadIn = document.getElementById('business-in-motion') ?? section.previousElementSibling ?? section
    const brandingBoundary = section.previousElementSibling ?? section
    const trigger = ScrollTrigger.create({
      trigger: brandingBoundary,
      start: brandingBoundary === section ? 'top top' : 'bottom top',
      endTrigger: section,
      end: 'bottom top+=100',
      onEnter: activate,
      onEnterBack: activate,
      onLeave: deactivate,
      onLeaveBack: deactivate,
      onRefresh: self => self.isActive ? activate() : deactivate(),
    })
    let ctx: gsap.Context | undefined
    if (motion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ctx = gsap.context(() => {
        gsap.fromTo('.crm-shell', { xPercent: -110 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: leadIn, start: leadIn === section ? 'top bottom' : 'bottom bottom', endTrigger: section, end: 'top top', scrub: .7, invalidateOnRefresh: true } })
      }, section)
    }
    return () => {
      trigger.kill()
      ctx?.revert()
      deactivate()
    }
  }, [motion])

  return <section className="crm-spotlight" id="crm-platform" ref={sectionRef} aria-labelledby="crm-title">
    <div className="crm-noise" aria-hidden="true" />
    <div className="crm-shell">
      <div className="crm-brand-visual">
        <div className="crm-logo-stage">
          <div className="crm-logo-frame"><img src="/brainboys-crm-mark-transparent.png" alt="BrainBoys CRM brand mark" /></div>
          <span className="crm-floating-note note-one">AI AUTOMATION <b>↗︎</b></span>
          <span className="crm-floating-note note-two">EVERYTHING. CONNECTED.</span>
          <div className="crm-dashboard-card" aria-hidden="true">
            <div className="crm-dashboard-head"><span><b>⌘</b> Growth overview</span><small>Illustrative dashboard</small></div>
            <div className="crm-dashboard-stats"><p><small>Pipeline value</small><strong>$24,850 <em>↗ 18.6%</em></strong></p><p><small>New leads</small><strong>128 <em>↗ 12.4%</em></strong></p></div>
            <div className="crm-chart"><div className="crm-chart-grid"/>{[26,38,32,49,44,60,52,75,68,83,78,96].map((height,index)=><i key={index} style={{height:`${height}%`}}><span/></i>)}</div>
            <div className="crm-chart-labels"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span></div>
            <div className="crm-dashboard-foot"><span><i/>New lead <b>32</b></span><span><i/>In conversation <b>18</b></span><span><i/>Ready to close <b>09</b></span></div>
          </div>
        </div>
      </div>
      <div className="crm-copy">
        <span className="crm-kicker"><i/> A BRAINIER WAY TO RUN YOUR BUSINESS</span>
        <span className="crm-overline">BrainBoys CRM / CONNECTED GROWTH</span>
        <h2 id="crm-title">Bright minds.<br/>Better systems.<br/><em>Bigger possibilities.</em></h2>
        <p>Your business has big ideas. BrainBoys CRM builds the connected system that brings them to life — capturing leads, nurturing relationships, closing deals and keeping every customer journey moving.</p>
        <div className="crm-capabilities"><span>AI automation</span><span>BrainBoys CRM</span><span>Custom development</span></div>
        <a href="https://crm.brainboys.ai/" target="_blank" rel="noopener noreferrer">Explore BrainBoys CRM <span>↗︎</span></a>
      </div>
    </div>
  </section>
}

export function ReviewsCTA({ audioSrc }: { audioSrc?: string } = {}) {
  return <Suspense fallback={<ReviewsCTAContent audioSrc={audioSrc} unlocked={false}/>}><ReviewsCTAAccess audioSrc={audioSrc}/></Suspense>
}

function ReviewsCTAAccess({ audioSrc }: { audioSrc?: string }) {
  const pathname = usePathname()
  const hash = useSyncExternalStore(subscribeToHash, () => window.location.hash, () => '')
  const [anchor, parameters = ''] = hash.slice(1).split('?')
  const isReviewsSection = pathname === '/' && anchor === 'reviews-proof'
  const unlocked = isReviewsSection && new URLSearchParams(parameters).get('access') === 'granted'

  useEffect(() => {
    if (!isReviewsSection) return
    let frame = 0
    let scheduled = false
    const observer = new MutationObserver(() => schedule())
    const schedule = () => {
      if (scheduled || document.querySelector('.site-loader')) return
      scheduled = true
      observer.disconnect()
      frame = requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        document.getElementById('reviews-proof')?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          block: 'start',
        })
      })
    }
    observer.observe(document.body, { childList: true, subtree: true })
    schedule()
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [hash, isReviewsSection])

  return <ReviewsCTAContent audioSrc={audioSrc} unlocked={unlocked}/>
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  window.addEventListener('popstate', onChange)
  return () => {
    window.removeEventListener('hashchange', onChange)
    window.removeEventListener('popstate', onChange)
  }
}

function ReviewsCTAContent({ audioSrc, unlocked }: { audioSrc?: string; unlocked: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const callRef = useRef<HTMLButtonElement>(null)
  const [formReady, setFormReady] = useState(false)
  const [optInOpen, setOptInOpen] = useState(false)

  useEffect(() => {
    if (!optInOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [optInOpen])

  useEffect(() => {
    if (unlocked) dialogRef.current?.close()
  }, [unlocked])

  const openOptIn = () => {
    setFormReady(true)
    setOptInOpen(true)
    dialogRef.current?.showModal()
  }

  const closeOptIn = () => {
    dialogRef.current?.close()
    callRef.current?.focus()
  }

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const content = section.querySelector('.reviews-cta-content')!
      gsap.set(content, { y: 65, autoAlpha: 0 })
      const reveal = (visible: boolean) => gsap.to(content, { y: visible ? 0 : 65, autoAlpha: visible ? 1 : 0, duration: .55, ease: 'power3.out', overwrite: true })
      ScrollTrigger.create({
        trigger: section,
        start: 'bottom bottom',
        onEnter: () => reveal(true),
        onLeaveBack: () => reveal(false),
        onRefresh: self => reveal(self.scroll() >= self.start),
      })
    }, section)
    return () => ctx.revert()
  }, [])
  return <section className="reviews-cta" id="reviews-proof" ref={sectionRef} aria-label="Client reviews and AI agent call">
    <div className="reviews-cta-sticky">
      <div className="reviews-cta-media"><img className="reviews-cta-art" src="/brainboys-reviews-doodle.webp" width="1756" height="896" alt="A doodle wall of five-star client reviews for the BrainBoys AI team"/></div>
      <div className="reviews-cta-content">
        {unlocked ? <div className="reviews-audio-player" role="region" tabIndex={-1} aria-label="AI agent recording">
          <span className="eyebrow">BrainBoys AI / AI AGENT</span>
          <h3>Your AI agent preview</h3>
          {audioSrc ? <audio controls preload="none" src={audioSrc}>Your browser does not support audio playback.</audio> : <><button className="audio-awaiting" disabled aria-label="Recording not available yet"><span aria-hidden="true">▶</span> Recording coming soon</button><p>Your access is unlocked. The recording will appear here when it is ready.</p></>}
        </div> : <button ref={callRef} type="button" className="reviews-agent-call" onClick={openOptIn} aria-label="Talk with Our AI Agent" aria-haspopup="dialog">
          <span className="reviews-agent-call-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.8 3.5 3.1 4.8 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 3.7c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2Z"/></svg></span>
          <span>Talk with Our<br/><strong>AI Agent</strong></span>
        </button>}
      </div>
    </div>
    <dialog ref={dialogRef} className="agent-optin" aria-labelledby="agent-optin-title" onClose={() => setOptInOpen(false)} onClick={event => { if (event.target === event.currentTarget) closeOptIn() }}>
      <div className="agent-optin-inner">
        <button className="agent-optin-close" type="button" onClick={closeOptIn} aria-label="Close opt-in">×</button>
        <img src="/brainboys-mark.png" width="60" height="60" alt=""/>
        <span className="eyebrow">MEET YOUR NEXT ADVANTAGE</span>
        <h2 id="agent-optin-title">Hear what your<br/><span className="serif">AI agent can do.</span></h2>
        <p>Enter your details to unlock the audio preview.</p>
        <div className="agent-optin-embed">{formReady && <ExternalEmbed
          src="https://api.brainboys.ai/widget/form/FtJTWEqChCRZYJ9P7CSS"
          id="inline-FtJTWEqChCRZYJ9P7CSS"
          formId="FtJTWEqChCRZYJ9P7CSS"
          height={400}
          title="AI Agent Optin Form"
        />}</div>
      </div>
    </dialog>
  </section>
}

function SocialIcon({ name }: { name: 'linkedin' | 'facebook' | 'instagram' }) {
  if (name === 'linkedin') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.7 8.3H3.4V19h3.3V8.3ZM5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm7.1 5.3H8.9V19h3.3v-5.3c0-1.4.3-2.8 2.1-2.8 1.8 0 1.8 1.7 1.8 2.9V19h3.3v-5.9c0-2.9-.6-5.1-4-5.1-1.6 0-2.7.9-3.2 1.7h-.1V8.3Z"/></svg>
  if (name === 'facebook') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 8.2V6.7c0-.7.5-.9 1-.9h2.6V2.1L14.3 2c-3.5 0-4.4 2.1-4.4 4.3v1.9H7.6v4.2h2.3V22h4.3v-9.6h3.2l.5-4.2h-3.7Z"/></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm0 2h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Zm5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm6-3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/></svg>
}

export function SiteFooter({ isHome, motion, onToggleMotion }: { isHome: boolean; motion: boolean; onToggleMotion: () => void; bookingHref: string }) {
  return <footer className="footer" id="site-footer">
    <div className="footer-main">
      <div className="footer-brand-column">
        <a className="footer-brand" href="/" aria-label="BrainBoys AI home"><img src="/brainboys-mark.png" alt=""/><span>BrainBoys AI</span></a>
        <p>Brilliant people and intelligent systems, connected around your next big move.</p>
        <div className="footer-socials">
          <a href="https://www.linkedin.com/company/brainboys-ai/" target="_blank" rel="noopener noreferrer" aria-label="BrainBoys AI on LinkedIn"><SocialIcon name="linkedin"/></a>
          <a href="https://www.facebook.com/brainboysai/" target="_blank" rel="noopener noreferrer" aria-label="BrainBoys AI on Facebook"><SocialIcon name="facebook"/></a>
          <a href="https://www.instagram.com/brainboys.ai" target="_blank" rel="noopener noreferrer" aria-label="BrainBoys AI on Instagram"><SocialIcon name="instagram"/></a>
        </div>
      </div>
      <div className="footer-column"><span>PAGES</span><a href="/">Home</a><a href="/about-us">About us</a><a href="/services">Services</a><a href="/hire-a-team">Hire a team</a><a href="/automation">Automation</a><a href="/portfolio">Portfolio</a><a href="/contact">Contact</a></div>
      <div className="footer-column"><span>SERVICES</span><a href="/services">Development</a><a href="/automation">AI & automation</a><a href="/services">Growth & creative</a><a href="https://crm.brainboys.ai/" target="_blank" rel="noopener noreferrer">BrainBoys CRM ↗︎</a></div>
      <div className="footer-column"><span>LEGAL</span><a href="/privacy-policy">Privacy policy</a><a href="/terms-and-conditions">Terms & conditions</a></div>
      <div className="footer-column footer-contact"><span>LET&apos;S CONNECT</span><p>Address : 5203 Juan Tabo Blvd STE 2B<br/>Albuquerque New Mexico 87111</p><a href="tel:+18889057962">+1 888-905-7962</a><a href="mailto:support@brainboys.ai">Support@brainboys.ai</a><HomeCalendarLink className="footer-call">Book a strategy call <b className="ui-arrow" aria-hidden="true"/></HomeCalendarLink></div>
    </div>
    <div className="footer-bottom"><span>© 2026 BrainBoys AI AI. All rights reserved.</span><span>HUMAN INGENUITY. AMPLIFIED.</span><div><a href="/privacy-policy">Privacy</a><a href="/terms-and-conditions">Terms</a><button aria-pressed={motion} onClick={onToggleMotion}>Motion {motion ? 'on' : 'off'} <i className={motion ? 'on' : ''}/></button><a href={isHome ? '#home' : '#main-content'}>Back to top ↑</a></div></div>
  </footer>
}

