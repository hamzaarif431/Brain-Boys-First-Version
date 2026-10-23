// @refresh reset
import { useEffect, useRef, useState } from 'react'
import ExternalEmbed from './ExternalEmbed'
import TestimonialCard from './TestimonialCard'

const plans = [
  { number: '01', name: 'Project Based', tag: 'FOCUSED EXPERTISE', description: 'Expert support for a clearly defined project, from your first brief to final delivery.', features: ['Specialists matched to your project', 'Clear scope, timeline and deliverables', 'Direct collaboration with your team', 'Progress updates at every milestone'], action: 'Start your project', href: '#project-based' },
  { number: '02', name: 'The connected pod', tag: 'MOST FLEXIBLE', description: 'A small, coordinated team covering the skills your next chapter needs.', features: ['A complementary mix of specialists', 'One delivery lead and shared plan', 'Creative, technical and operations support', 'Flexible capacity as priorities change'], action: 'Build your pod', href: '#book-calendar' },
  { number: '03', name: 'Virtual Assistant', tag: 'DEDICATED SUPPORT', description: 'Reliable virtual assistance for the everyday tasks that keep your business moving.', features: ['Inbox and calendar management', 'Administrative and research support', 'Customer follow-ups and coordination', 'Support matched to your workflow'], action: 'Find your virtual assistant', href: '#virtual-assistant' },
]

export function PricingSection() {
  const projectDialogRef = useRef<HTMLDialogElement>(null)
  const podDialogRef = useRef<HTMLDialogElement>(null)
  const [podFormReady, setPodFormReady] = useState(false)
  const [podOpen, setPodOpen] = useState(false)
  const [projectFormReady, setProjectFormReady] = useState(false)
  const [projectOpen, setProjectOpen] = useState(false)
  const [activeForm, setActiveForm] = useState<'project' | 'virtual-assistant'>('project')
  const isVirtualAssistant = activeForm === 'virtual-assistant'
  const formId = isVirtualAssistant ? 'IHWxHGfKhixvPIRLz94v' : 'im6bpK13jqWvDTZ4bfZZ'
  const formName = isVirtualAssistant ? 'Virtual Assistant' : 'Project Based'
  const formHeight = isVirtualAssistant ? 901 : 944

  // The introductory work-model tabs reuse these same package dialogs.
  useEffect(() => {
    const openRequestedForm = (event: Event) => {
      const form = (event as CustomEvent<unknown>).detail
      if (form === 'hourly') {
        setPodFormReady(true)
        setPodOpen(true)
        podDialogRef.current?.showModal()
      } else if (form === 'project') {
        setActiveForm('project')
        setProjectFormReady(true)
        setProjectOpen(true)
        projectDialogRef.current?.showModal()
      }
    }
    window.addEventListener('brainboys:package-form', openRequestedForm)
    return () => window.removeEventListener('brainboys:package-form', openRequestedForm)
  }, [])

  useEffect(() => {
    if (!projectOpen && !podOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [projectOpen, podOpen])

  const openPodForm = () => {
    setPodFormReady(true)
    setPodOpen(true)
    podDialogRef.current?.showModal()
  }

  const openProjectForm = (form: 'project' | 'virtual-assistant') => {
    setActiveForm(form)
    setProjectFormReady(true)
    setProjectOpen(true)
    projectDialogRef.current?.showModal()
  }

  return <section className="pricing-section section" id="pricing" aria-labelledby="pricing-title">
    <div className="section-top reveal"><span className="eyebrow">YOUR TEAM, YOUR TERMS</span><span className="muted">A plan shaped by your priorities.</span></div>
    <div className="pricing-heading reveal"><div><h2 id="pricing-title">Support that fits.<br/><span className="serif">Space to grow.</span></h2><p>Choose the shape of your team. We&apos;ll agree the scope, availability and monthly price with you before work begins.</p></div><span className="pricing-heading-mark">✳</span></div>
    <div className="pricing-grid">{plans.map((plan, index) => <article className={`pricing-card reveal${index === 1 ? ' pricing-card-featured' : ''}`} key={plan.name}>
      <div className="pricing-card-top"><span>{plan.tag}</span><span>↗︎</span></div>
      <h3>{plan.name}</h3><p>{plan.description}</p>
      <div className="pricing-price"><strong>Custom</strong><span>{index === 0 ? 'project proposal' : 'monthly proposal'}</span></div>
      <div className="pricing-divider" />
      <span className="pricing-includes">WHAT&apos;S INCLUDED</span>
      <ul>{plan.features.map(feature => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
      <button type="button" className="pricing-project-button" onClick={() => index === 1 ? openPodForm() : openProjectForm(index === 2 ? 'virtual-assistant' : 'project')} aria-haspopup="dialog">{plan.action}<span aria-hidden="true">↗︎</span></button>
    </article>)}</div>
    <div className="pricing-bottom reveal"><span>✧</span><p>Need one role, a whole pod, or something in between? We&apos;ll tailor the proposal to the work — and make the terms clear from day one.</p><a href="#book-calendar">Let&apos;s scope it together ↗︎</a></div>
    <dialog ref={podDialogRef} className="connected-pod-popup" aria-label="The connected pod — Hourly Rate" onClose={() => setPodOpen(false)} onClick={event => { if (event.target === event.currentTarget) podDialogRef.current?.close() }}>
      <button type="button" className="connected-pod-popup-close" onClick={() => podDialogRef.current?.close()} aria-label="Close hourly rate form">×</button>
      {podFormReady && <ExternalEmbed src="https://api.brainboys.ai/widget/form/u3AHnYLXevensYOUwojW" id="inline-u3AHnYLXevensYOUwojW" formId="u3AHnYLXevensYOUwojW" title="Hourly Rate" autoHeight />}
    </dialog>
    <dialog ref={projectDialogRef} className="project-based-popup" id="project-based" aria-labelledby="project-based-title" onClose={() => setProjectOpen(false)} onClick={event => { if (event.target === event.currentTarget) projectDialogRef.current?.close() }}>
      <div className="project-based-popup-surface">
      <header className="project-based-popup-header"><div><span className="eyebrow">{formName.toUpperCase()}</span><h2 id="project-based-title">{isVirtualAssistant ? <>Make room for more.<br/><span className="serif">Meet your virtual assistant.</span></> : <>Let’s bring your<br/><span className="serif">project to life.</span></>}</h2><p>{isVirtualAssistant ? 'Tell us about the tasks you want to hand over. We’ll match you with a virtual assistant who fits your tools, schedule and business needs.' : 'Tell us what you need. We’ll help define the scope, timeline and right expertise for your project.'}</p></div><button type="button" className="founder-calendar-close" onClick={() => projectDialogRef.current?.close()} aria-label="Close package form">×</button></header>
      <div className="project-based-popup-body" style={{ minHeight: formHeight, paddingBottom: isVirtualAssistant ? undefined : 32 }}>{projectFormReady && <ExternalEmbed
        src={`https://api.brainboys.ai/widget/form/${formId}`}
        id={`inline-${formId}`}
        formId={formId}
        height={formHeight}
        title={formName}
      />}</div>
      </div>
    </dialog>
  </section>
}

const stories = [
  { id: 'brainboys-1', video: '/testimonials/branded/BrainBoys-Testimonial-1.mp4', poster: '/testimonials/posters/BrainBoys-Testimonial-1.jpg', title: 'Client story' },
  { id: 'brainboys-2', video: '/testimonials/branded/BrainBoys-Testimonial-2.mp4', poster: '/testimonials/posters/BrainBoys-Testimonial-2.jpg', title: 'Client story' },
  { id: 'brainboys-2-37-04', video: '/testimonials/branded/BrainBoys-Testimonial-2-37-04-AM.mp4', poster: '/testimonials/posters/BrainBoys-Testimonial-2-37-04-AM.jpg', title: 'Client story' },
  { id: 'brainboys-2-37-31', video: '/testimonials/branded/BrainBoys-Testimonial-2-37-31-AM.mp4', poster: '/testimonials/posters/BrainBoys-Testimonial-2-37-31-AM.jpg', title: 'Client story ' },
  { id: 'brainboys-2-39-02', video: '/testimonials/branded/BrainBoys-Testimonial-2-39-02-AM.mp4', poster: '/testimonials/posters/BrainBoys-Testimonial-2-39-02-AM.jpg', title: 'Client story ' },
  { id: 'brainboys-3', video: '/testimonials/branded/BrainBoys-Testimonial-3.mp4', poster: '/testimonials/posters/BrainBoys-Testimonial-3.jpg', title: 'Client story ' },
  { id: 'brainboys-4', video: '/testimonials/branded/BrainBoys-Testimonial-4.mp4', poster: '/testimonials/posters/BrainBoys-Testimonial-4.jpg', title: 'Client story ' },
  { id: 'brainboys-5-01-20', video: '/testimonials/branded/BrainBoys-Testimonial-5-01-20-PM.mp4', poster: '/testimonials/posters/BrainBoys-Testimonial-5-01-20-PM.jpg', title: 'Client story' },
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
    <div className="section-top reveal"><span className="eyebrow">CLIENT VIDEO STORIES</span><span className="muted">Real voices. Real working relationships.</span></div>
    <div className="stories-heading reveal"><div><h2 id="stories-title">Don&apos;t take our word.<br/><span className="serif">Take theirs.</span></h2><p>Hear directly from clients who have worked with the BrainBoys AI team.</p></div><div className="stories-controls"><button type="button" aria-label="Previous video testimonial" onClick={() => slide(-1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg></button><button type="button" aria-label="Next video testimonial" onClick={() => slide(1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button></div></div>
    <div className="stories-strip" ref={stripRef} tabIndex={0} aria-label="Client video testimonials. Scroll horizontally to see more.">{stories.map((story, index) => <TestimonialCard key={story.id} story={story} index={index} playing={playing === story.id} onPlay={() => setPlaying(story.id)} onClose={() => setPlaying(null)}/>)}</div>
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
    <div className="certification-inner section"><div className="section-top reveal"><span className="eyebrow">CERTIFIED EXPERTISE</span><span className="muted">Credentials you can check.</span></div>
      <div className="certification-feature reveal"><div className="certification-copy"><span className="certification-kicker"><i/> TOP-RATED GHL EXPERTISE</span><h2 id="certification-title">Cold Coffee, High Blood Pressure, and Zero Output.<br/><span className="serif">The Real Cost of Traditional Retainers.</span></h2><p>You didn&apos;t start an agency to become a full-time babysitter for ghosting freelancers. Stop the chase.</p><a href={directory} target="_blank" rel="noopener noreferrer">View Ahsan&apos;s certified profile <span>↗︎</span></a></div><div className="certification-hero-badge"><div className="certification-orbit"/><img src="/cert-1.png" alt="HighLevel Certified Admin badge" width="260" height="260"/><span>HIGHLEVEL<br/>CERTIFIED ADMIN</span></div></div>
    </div>
    <div className="badge-marquee" aria-label="HighLevel certification and skill badges"><div className="badge-track">{[...badges, ...badges].map((badge, index) => <a className="badge-item" href={directory} target="_blank" rel="noopener noreferrer" key={`${badge.name}-${index}`} aria-label={`${badge.name} badge — view certified profile`} aria-hidden={index >= badges.length} tabIndex={index >= badges.length ? -1 : 0}><img src={badge.image} alt={index < badges.length ? badge.name : ''} loading="lazy" width="120" height="120"/><span>{badge.name}</span></a>)}</div></div>
  </section>
}

export function BookingSection() {
  return <section className="booking-section" id="book-calendar" aria-labelledby="booking-title"><div className="booking-inner section">
    <header className="booking-heading reveal"><span className="eyebrow"><i/> PICK A TIME THAT WORKS</span><h2 id="booking-title">Let&apos;s put the next move<br/><span className="serif">on your calendar.</span></h2><p>Choose a time below for a free 30-minute consultation. We&apos;ll map the right expert, team or automation path for your business.</p></header>
    <div className="booking-card reveal"><div className="booking-topbar"><div><img src="/brainboys-mark.png" alt="BrainBoys AI" width="52" height="52"/><p><strong>BrainBoys AI consultation</strong><small>30 minutes · Free strategy call</small></p></div><span><i/> Calendar live</span></div><div className="booking-frame"><ExternalEmbed embedScript={false} id="brainboys-calendar" src="https://api.leadconnectorhq.com/widget/bookings/brain-boys" title="Book a consultation with BrainBoys AI" loading="lazy" /></div><div className="booking-trust"><span>🔒 Secure booking</span><span>✓ No commitment</span><span>✓ Confirmation sent instantly</span></div></div>
  </div></section>
}

