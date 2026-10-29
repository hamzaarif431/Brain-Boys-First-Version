'use client'
import type { PointerEvent } from 'react'
import gsap from 'gsap'
import { ReclaimSection, HomeFAQ } from './HomeSections'
import { PricingSection, VideoTestimonialsSection, CertificationSection, BookingSection } from './NewHomeSections'
import Workflow from './Workflow'
import WhyBrainBoysSection from './WhyBrainBoysSection'
import AutomationExperience from './AutomationExperience'
import { CRMSpotlight, ReviewsCTA } from './ExperienceEnhancements'
import { useSiteMotion } from './App'
import ServicesMarquee from './ServicesMarquee'
import AIBotsSection from './AIBotsSection'
import { CEOSection } from './LeadershipFeature'
import { useHomeCalendarScroll } from './HomeCalendarLink'

const contact = '/contact'
const services = [
{title:'Full-Stack Devs, Strictly On Demand',category:'DEVELOPMENT',text:'Got code to ship or an API to fix? Submit your task, lock in a fixed price, and track the build step-by-step. Stop paying monthly retainers for developers sitting on idle.',tags:['Pay Per Feature','Real-Time PR Tracking','Zero Monthly Fees'],action:'Deploy a Dev Sprint',href:'/services/full-stack',symbol:'↗︎'},
{title:'Pay-Per-Build CRM & Workflow Automations',category:'AI & AUTOMATION',text:'Fix broken GHL funnels, connect custom n8n webhooks, or deploy AI agents. Every automation task is scoped, priced upfront, and tracked live to completion.',tags:['Fixed-Scope Scopes','Live Pipeline Updates','No Retainers'],action:'Start an Automation Task',href:'/automation',symbol:'✳'},
{title:'Ad-Hoc Design & Marketing Sprints',category:'GROWTH & CREATIVE',text:'Need landing pages or UI assets for a launch? Pay strictly for finished creative output. Watch deliverables move from brief to launch in your client portal.',tags:['Pay Per Asset','Transparent Milestones','Pause Anytime'],action:'Request Creative Output',href:'/services/ui-ux',symbol:'◎'}]
const Arrow=()=> <span className="ui-arrow" aria-hidden="true"/>

export default function HomePage(){
useHomeCalendarScroll()
const {motion}=useSiteMotion()
const tilt=(e: PointerEvent<HTMLElement>)=>{if(!motion||e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();gsap.to('.mark-tilt',{rotationY:(e.clientX-r.left-r.width/2)/24,rotationX:-(e.clientY-r.top-r.height/2)/24,duration:.8})}
return <>
<section className="hero" id="home" onPointerMove={tilt} onPointerLeave={()=>gsap.to('.mark-tilt',{rotationX:0,rotationY:0,duration:1})}>
<div className="hero-intro"><span className="eyebrow"><i/> STOP THE RETAINER TRAP</span><span className="hero-edition">PAY FOR OUTPUT × NOT IDLE HOURS</span></div>
<div className="hero-title"><h1><span className="hero-line"><span>Hire a brain</span></span><span className="hero-line"><span className="outline">on demand</span></span></h1></div>
<div className="sculpture" aria-hidden="true"><div className="orbital-grid"/><div className="orbit"><i/><b/></div><div className="mark-tilt"><img className="mark-float" src="/brainboys-mark.png" alt=""/></div><div className="orbit-label label-top"><i/> GREAT MINDS, CONNECTED</div><div className="orbit-label label-bottom"><span>↗︎</span> BUILT TO MOVE YOU FORWARD</div><span className="coordinate">BB—01 / COLLECTIVE INTELLIGENCE</span><span className="orbit-label small-note hero-logo-note"><i/> ZERO MONTHLY COMMITMENT.</span></div>
<div className="hero-bottom"><a className="round-scroll" href="#services" aria-label="Explore our services">↓</a><p>If your VA agency invoice lands on the 1st, but your task queue has been empty for two weeks, you are in a <strong>$3000/month direct cash burn.</strong><span className="hero-value-line">Pay for the brainpower you need, when you need it.</span></p><a className="button lime-button" href={contact}>Lets get started <Arrow/></a></div></section>
<div className="stack-strip"><span>YOUR TOOLS.<br/><strong>OUR PLAYGROUND.</strong></span><div>HubSpot<span className="tool-symbol">✣</span></div><div className="ghl">HighLevel ↗︎</div><div className="shopify">▱ shopify</div><div className="webflow">≋ Webflow</div><div className="openai">◉ OpenAI</div><div>n8n <span className="tool-symbol">⌘</span></div></div>
<ReclaimSection/><section className="services section" id="services"><div className="section-top services-section-top reveal"><span className="eyebrow">PAY FOR REAL OUTPUT</span></div><div className="section-heading services-heading reveal"><h2 className="services-output-heading"><span><mark>PAY-AS-YOU-HAVE-WORK</mark></span><span><mark className="lilac-highlight">ZERO MONTHLY COMMITMENT</mark></span><span><mark>LIVE TASK TRACKING</mark></span></h2><a className="text-link" href="/services">Explore all services <Arrow/></a></div><div className="service-grid">{services.map((s,i)=><article className={'service-card card-'+i+' reveal'} key={s.category}><div className="card-top"><span className="eyebrow">{s.category}</span><span className="service-symbol">{s.symbol}</span></div><div className={'service-art art-'+i} aria-hidden="true">{i===0?<><div className="code-window"><div><i/><i/><i/></div><pre><em>const</em> nextBigThing = {'{'}<br/>  vision: <b>"yours"</b>,<br/>  team: <b>"BrainBoys AI"</b>,<br/>  possibilities: <b>Infinity</b><br/>{'}'}</pre><span className="code-label">● READY TO SHIP</span></div><span className="floating-code">{'</>'}</span></>:i===1?<><div className="node n1">↗︎</div><div className="node n2">✧</div><div className="automation-core"><img src="/brainboys-mark.png" alt=""/></div><div className="node n3">✓</div><div className="node n4">⌘</div><div className="connection c1"/><div className="connection c2"/></>:<><div className="growth-orb"/><div className="growth-bar b1"/><div className="growth-bar b2"/><div className="growth-bar b3"/><div className="growth-arrow">↗︎</div><span className="growth-caption">PAY FOR FINISHED<br/>CREATIVE OUTPUT.</span></>}</div><h3>{s.title}</h3><p>{s.text}</p><div className="tags">{s.tags.map(t=><span key={t}>{t}</span>)}</div><a className="card-link" href={s.href}>{s.action} <Arrow/></a></article>)}</div></section>
<ServicesMarquee/>
<Workflow motion={motion}/><AutomationExperience motion={motion}/><CRMSpotlight motion={motion}/><ReviewsCTA/><WhyBrainBoysSection/>
<VideoTestimonialsSection/><CEOSection/><div className="section home-ai-bots"><AIBotsSection/></div><PricingSection/><CertificationSection/><HomeFAQ/><section className="contact section" id="contact"><div className="contact-top"><span className="eyebrow"><i/> YOUR NEXT CHAPTER STARTS HERE</span><span className="eyebrow">LET’S MAKE IT HAPPEN ↙</span></div><div className="contact-heading reveal"><h2>You dream it,<br/><span className="serif">We team it!</span></h2><a href="#book-calendar" className="big-cta" aria-label="Book a discovery call"><Arrow/></a><img src="/brainboys-mark.png" alt=""/></div><div className="contact-bottom"><p>One conversation. A clearer plan. Your kind of people.</p><a href="#book-calendar">Book a discovery call <Arrow/></a></div></section><BookingSection/>
</>
}
