'use client'
import type { PointerEvent } from 'react'
import { usePathname } from 'next/navigation'
import BrandHeader from './BrandHeader'
import Workflow from './Workflow'
import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'



import { ReclaimSection, HomeFAQ } from './HomeSections'
import { PeopleSection, PricingSection, VideoTestimonialsSection, CertificationSection, BookingSection } from './NewHomeSections'
import AutomationExperience from './AutomationExperience'
import { CRMSpotlight, SiteFooter, SiteLoader } from './ExperienceEnhancements'
import { ServicesPage, ServiceDetail, AutomationPage, HirePage, ContactPage, NotFound } from './Pages'
import { roles } from './content'
gsap.registerPlugin(ScrollTrigger)
const contact = '/contact'
const services = [
{title:'Build something better.',category:'DEVELOPMENT',text:'From ambitious idea to beautifully engineered product. Your dedicated developers, already in sync.',tags:['Full-stack development','Web experiences','API integrations'],symbol:'↗︎'},
{title:'Put busywork on autopilot.',category:'AI & AUTOMATION',text:'Connected tools. Intelligent workflows. Systems that give your people the space to do their best work.',tags:['AI agents','GoHighLevel','CRM & workflows'],symbol:'✳'},
{title:'Make your next big move.',category:'GROWTH & CREATIVE',text:'Designers, marketers and creative thinkers who turn attention into meaningful business momentum.',tags:['Brand & UI/UX','SEO & paid media','Content & motion'],symbol:'◎'}]
const steps=[['Discover','First, we get the full picture.','Your goals, your stack, and the work slowing you down. We start with a real conversation and build the plan around you.'],['Match','The right minds. On your side.','Meet specialists selected for your tools and goals, with a dedicated point of contact to keep everything moving.'],['Connect','Plug in. Get aligned. Get going.','We set up access, priorities, workflows and reporting so your team starts with clarity from day one.'],['Automate','Make the everyday effortless.','We connect your systems and automate repetitive tasks, leaving more time for work that moves the business forward.'],['Scale','More ambition. Same great team.','Add capabilities as your business grows, with a consistent delivery process and a team that already knows you.']]
const Arrow=()=> <span className="ui-arrow" aria-hidden="true"/>
function App(){
const root=useRef<HTMLDivElement>(null)
const path=usePathname() || '/'
const isHome=path==='/'
const bookingHref=path.startsWith('/services')?'#book-calendar':'/#book-calendar'
const page=path==='/services'?<ServicesPage/>:path.startsWith('/services/')?<ServiceDetail slug={path.split('/')[2]}/>:path==='/hire-a-team'?<HirePage/>:path==='/contact'?<ContactPage/>:null

const [step,setStep]=useState(0)
const [motion,setMotion]=useState(true)
useLayoutEffect(()=>{
const detail=roles.find(r=>'/services/'+r.slug===path)
document.title=(isHome?'Big ideas. Meet your bigger team.':detail?.name||(({'/services':'Our specialists','/automation':'AI & automation','/hire-a-team':'Build your team','/contact':'Let’s connect'} as Record<string,string>)[path]||'Page not found'))+' — Brainboys AI'
if(!motion || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const ctx=gsap.context(()=>{
if(isHome){
gsap.from('.hero-line span',{yPercent:110,rotate:3,duration:1.2,stagger:.12,ease:'power4.out'})
gsap.from('.hero-intro, .hero-bottom',{opacity:0,y:20,duration:1,delay:.6})
gsap.from('.sculpture',{opacity:0,scale:.6,rotation:-25,duration:1.8,ease:'power3.out'})
gsap.to('.mark-float',{y:-19,rotation:7,duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'})
gsap.to('.orbit',{rotation:360,duration:55,repeat:-1,ease:'none'})
}
gsap.utils.toArray<HTMLElement>('.reveal').forEach(el=>gsap.from(el,{y:45,opacity:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%'}}))
if(isHome)gsap.to('.ticker-track',{xPercent:-50,duration:35,repeat:-1,ease:'none'})
gsap.from('.footer-word',{yPercent:35,scrollTrigger:{trigger:'.footer',start:'top bottom',end:'bottom bottom',scrub:1}})
},root);return()=>ctx.revert()},[motion,isHome,path])
const tilt=(e: PointerEvent<HTMLElement>)=>{if(!motion||e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();gsap.to('.mark-tilt',{rotationY:(e.clientX-r.left-r.width/2)/24,rotationX:-(e.clientY-r.top-r.height/2)/24,duration:.8})}
return <div ref={root} className={motion ? '' : 'motion-off'}>
<SiteLoader/>
<a className="skip" href="#main-content">Skip to content</a>
<BrandHeader motion={motion}/>
<main id="main-content">{isHome?<><section className="hero" id="home" onPointerMove={tilt} onPointerLeave={()=>gsap.to('.mark-tilt',{rotationX:0,rotationY:0,duration:1})}>
<div className="hero-intro"><span className="eyebrow"><i/> BRILLIANT MINDS. ONE TEAM.</span><span className="hero-edition">HUMAN TALENT × ARTIFICIAL INTELLIGENCE</span></div>
<div className="hero-title"><h1><span className="hero-line"><span>Big ideas.</span></span><span className="hero-line"><span>Meet your</span></span><span className="hero-line"><span className="outline">bigger team<span className="lime">.</span></span></span></h1></div>
<div className="sculpture" aria-hidden="true"><div className="orbital-grid"/><div className="orbit"><i/><b/></div><div className="mark-tilt"><img className="mark-float" src="/brainboys-mark.png" alt=""/></div><div className="orbit-label label-top"><i/> GREAT MINDS, CONNECTED</div><div className="orbit-label label-bottom"><span>↗︎</span> BUILT TO MOVE YOU FORWARD</div><span className="coordinate">BB—01 / COLLECTIVE INTELLIGENCE</span></div>
<div className="hero-bottom"><a className="round-scroll" href="#services" aria-label="Explore our services">↓</a><p>Your next chapter needs more than another tool.<br/>Meet the specialists and smart systems<br className="desktop-break"/> that turn <strong>“one day” into day one.</strong></p><a className="button lime-button" href={contact}>Build your team <Arrow/></a><span className="small-note"><i/> BIG THINKERS. READY TO PLUG IN.</span></div></section>
<div className="stack-strip"><span>YOUR TOOLS.<br/><strong>OUR PLAYGROUND.</strong></span><div>HubSpot<span className="tool-symbol">✣</span></div><div className="ghl">HighLevel ↗︎</div><div className="shopify">▱ shopify</div><div className="webflow">≋ Webflow</div><div className="openai">◉ OpenAI</div><div>n8n <span className="tool-symbol">⌘</span></div></div>
<ReclaimSection/><section className="services section" id="services"><div className="section-top reveal"><span className="eyebrow">01 / THE CAPABILITIES</span><span className="muted">A few brilliant people. A whole lot of possibility.</span></div><div className="section-heading reveal"><h2>Less on your plate.<br/><span className="muted">More in your corner.</span></h2><a className="text-link" href="/services">Explore all services <Arrow/></a></div><div className="service-grid">{services.map((s,i)=><article className={'service-card card-'+i+' reveal'} key={s.category}><div className="card-top"><span className="eyebrow">0{i+1} / {s.category}</span><span className="service-symbol">{s.symbol}</span></div><div className={'service-art art-'+i} aria-hidden="true">{i===0?<><div className="code-window"><div><i/><i/><i/></div><pre><em>const</em> nextBigThing = {'{'}<br/>  vision: <b>"yours"</b>,<br/>  team: <b>"brainboys"</b>,<br/>  possibilities: <b>Infinity</b><br/>{'}'}</pre><span className="code-label">● READY TO SHIP</span></div><span className="floating-code">{'</>'}</span></>:i===1?<><div className="node n1">↗︎</div><div className="node n2">✧</div><div className="automation-core"><img src="/brainboys-mark.png" alt=""/></div><div className="node n3">✓</div><div className="node n4">⌘</div><div className="connection c1"/><div className="connection c2"/></>:<><div className="growth-orb"/><div className="growth-bar b1"/><div className="growth-bar b2"/><div className="growth-bar b3"/><div className="growth-arrow">↗︎</div><span className="growth-caption">MAKE YOURSELF<br/>IMPOSSIBLE TO IGNORE.</span></>}</div><h3>{s.title}</h3><p>{s.text}</p><div className="tags">{s.tags.map(t=><span key={t}>{t}</span>)}</div><a className="card-link" href={i===1?"/automation":"/services"}>Meet your {['builders','automators','creatives'][i]} <Arrow/></a></article>)}</div></section>
<div className="ticker" aria-hidden="true"><div className="ticker-track">{[0,1,2,3].map(i=><span key={i}>HUMAN AT HEART. <img src="/brainboys-mark.png" alt=""/> SUPERCHARGED BY AI. <span className="ticker-star">✳</span> </span>)}</div></div>
<Workflow motion={motion}/><AutomationExperience motion={motion}/><CRMSpotlight motion={motion}/><section className="about section" id="about"><div className="about-left reveal"><span className="eyebrow">02 / A BETTER WAY TO WORK</span><div className="mini-system"><div className="system-circle circle-one"/><div className="system-circle circle-two"/><img src="/brainboys-mark.png" alt="Brainboys connected minds brand mark"/><span className="system-label s1">YOUR VISION</span><span className="system-label s2">OUR PEOPLE</span><span className="system-label s3">SMART SYSTEMS</span><i className="system-plus">+</i></div></div><div className="about-copy reveal"><h2>Great things happen<br/>when the right<br/><span className="serif">minds connect.</span></h2><p>You bring the ambition. We bring the developers, designers, marketers and automation experts who make it happen. One connected team, working as an extension of yours.</p><div className="benefit"><span>01</span><h3>Specialists, already in sync.</h3><p>Skip the juggling. Get the right people and one clear point of contact.</p></div><div className="benefit"><span>02</span><h3>Human thinking. AI advantage.</h3><p>Real expertise, backed by systems that take the repetitive work away.</p></div><div className="benefit"><span>03</span><h3>Built around your next chapter.</h3><p>Start with one specialist. Grow into a whole team when you’re ready.</p></div></div></section>
<section className="process section" id="process"><div className="section-top reveal"><span className="eyebrow">03 / FROM HELLO TO LET’S GO</span><span className="muted">A simple start. A smarter way forward.</span></div><div className="section-heading reveal"><h2>Good chemistry.<br/><span className="serif">Great process.</span></h2><p>Five thoughtful steps.<br/>One team that feels like yours.</p></div><div className="step-tabs" role="tablist" aria-label="Our process">{steps.map((s,i)=><button key={s[0]} id={'tab-'+i} role="tab" aria-selected={step===i} aria-controls="step-panel" onClick={()=>setStep(i)}><span>0{i+1}</span>{s[0]}<span>{step===i?'↗︎':'+'}</span></button>)}</div><div className="step-panel" id="step-panel" role="tabpanel" aria-labelledby={'tab-'+step} key={step}><span className="step-number">0{step+1}<i>↗︎</i></span><div><span className="eyebrow">{steps[step][0]} / STEP 0{step+1}</span><h3>{steps[step][1]}</h3><p>{steps[step][2]}</p><button className="text-link" onClick={()=>setStep((step+1)%steps.length)}>{step===4?'Back to the beginning':'Next: '+steps[step+1][0]} <span>→</span></button></div><span className="step-side">LESS FRICTION. MORE MOMENTUM.</span></div></section>
<PeopleSection/><PricingSection/><VideoTestimonialsSection/><CertificationSection/><HomeFAQ/><section className="contact section" id="contact"><div className="contact-top"><span className="eyebrow"><i/> YOUR NEXT CHAPTER STARTS HERE</span><span className="eyebrow">LET’S MAKE IT HAPPEN ↙</span></div><div className="contact-heading reveal"><h2>You dream it.<br/><span className="serif">We team it.</span></h2><a href="#book-calendar" className="big-cta" aria-label="Book a discovery call"><Arrow/></a><img src="/brainboys-mark.png" alt=""/></div><div className="contact-bottom"><p>One conversation. A clearer plan. Your kind of people.</p><a href="#book-calendar">Book a discovery call <Arrow/></a></div></section><BookingSection/>
</> : path==='/automation'?<AutomationPage motion={motion}/>:page||<NotFound/>}</main><SiteFooter isHome={isHome} motion={motion} onToggleMotion={()=>setMotion(!motion)} bookingHref={bookingHref}/>
</div>
}
export default App
