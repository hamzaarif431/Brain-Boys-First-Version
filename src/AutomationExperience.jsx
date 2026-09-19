import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
const tools = [['GH','GoHighLevel','CRM & funnels'],['H','HubSpot','Customer journeys'],['S','Shopify','Commerce'],['AI','AI Voice Bot','Conversations'],['✳','AI Employee','Daily operations'],['⌘','Web Development','Digital products'],['↗','AI Marketing','Growth systems'],['⚡','CRM Automation','Connected workflows']]
export default function AutomationExperience({motion=true}) {
 const ref=useRef(null)
 useLayoutEffect(()=>{
  if(!motion)return
  const ctx=gsap.context(()=>{
   const cards=gsap.utils.toArray('.flow-tool')
   gsap.set('.flow-final',{autoAlpha:0,scale:.55,rotation:-30})
   gsap.set('.flow-final-copy',{autoAlpha:0,y:25})
   gsap.set('.flow-path',{strokeDasharray:1,strokeDashoffset:1})
   gsap.set('.flow-progress-fill',{scaleX:0,transformOrigin:'left'})
   gsap.set('.flow-status-2, .flow-status-3',{autoAlpha:0})
   const tl=gsap.timeline({scrollTrigger:{trigger:ref.current,start:()=>`top ${parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height'))}px`,end:'bottom bottom',scrub:.7,invalidateOnRefresh:true}})
   tl.from(cards,{autoAlpha:0,y:45,scale:.9,stagger:.055,duration:1})
     .to('.flow-path',{strokeDashoffset:0,stagger:.08,duration:1.1},.7)
     .to('.flow-hub',{boxShadow:'0 0 70px #8454dc26',borderColor:'#8553da',duration:.6},1.2)
     .to('.flow-status-1',{autoAlpha:0,duration:.2},1.4)
     .to('.flow-status-2',{autoAlpha:1,duration:.2},1.6)
     .to(cards,{x:(_,el)=>{const c=el.getBoundingClientRect();const b=ref.current.querySelector('.flow-board').getBoundingClientRect();return b.left+b.width/2-c.left-c.width/2},y:(_,el)=>{const c=el.getBoundingClientRect();const b=ref.current.querySelector('.flow-board').getBoundingClientRect();return b.top+b.height/2-c.top-c.height/2},scale:.15,autoAlpha:0,stagger:.055,duration:1,ease:'power2.inOut'},2.4)
     .to('.flow-path, .flow-hub',{autoAlpha:0,duration:.5},2.8)
     .to('.flow-status-2',{autoAlpha:0,duration:.2},3.2)
     .to('.flow-final',{autoAlpha:1,scale:1,rotation:0,duration:1,ease:'power3.out'},3.2)
     .to('.flow-final-copy',{autoAlpha:1,y:0,duration:.6},3.65)
     .to('.flow-status-3',{autoAlpha:1,duration:.2},3.7)
     .to('.flow-aura',{opacity:.7,scale:1.2,duration:1},3.2)
     .to({}, {duration:.6})
   tl.to('.flow-progress-fill',{scaleX:1,duration:tl.duration(),ease:'none'},0)
  },ref)
  return()=>ctx.revert()
 },[motion])
 return <section ref={ref} className={'flow-experience '+(motion?'flow-animated':'flow-static')} id="automation-flow" aria-label="From connected tools to one Brainboys team">
  <div className="flow-stage">
   <div className="flow-top"><span className="eyebrow"><i/> THE CONNECTED ADVANTAGE</span><span className="eyebrow flow-instruction">{motion?'SCROLL TO CONNECT ↓':'YOUR TOOLS. ONE CONNECTED TEAM.'}</span></div>
   <div className="flow-heading"><h2>Many moving parts.<br/><span className="serif">One brilliant system.</span></h2><p>Your tools, your people, your ambition.<br/>Connected by Brainboys AI.</p></div>
   <div className="flow-board">
    <div className="flow-aura"/>
    <svg className="flow-wires" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">{[55,155,255,355].flatMap((y,i)=>[<path key={'l'+i} className="flow-path" pathLength="1" d={`M 220 ${y} H ${320+i*20} Q 380 ${y} 380 210 H 500`} />,<path key={'r'+i} className="flow-path" pathLength="1" d={`M 780 ${y} H ${680-i*20} Q 620 ${y} 620 210 H 500`}/>])}</svg>
    {tools.map(([symbol,name,caption],i)=><div className={'flow-tool flow-tool-'+i} key={name}><span>{symbol}</span><div><strong>{name}</strong><small>{caption}</small></div><i/></div>)}
    <div className="flow-hub" aria-hidden="true"><span>✳</span><small>CONNECT</small></div>
    <div className="flow-final"><img src="/brainboys-mark.png" alt="Brainboys AI brand mark"/><div className="flow-final-copy"><strong>brainboys<span>AI</span></strong><p>BRILLIANT MINDS. ONE TEAM.</p></div></div>
   </div>
   <div className="flow-bottom"><div className="flow-status"><span className="flow-status-1">01 / YOUR EVERYDAY TOOLS</span><span className="flow-status-2">02 / CONNECTING THE POSSIBILITIES</span><span className="flow-status-3">03 / ONE CONNECTED TEAM</span></div><div className="flow-progress"><div className="flow-progress-fill"/></div><a href={window.location.pathname==='/automation'?'/contact?roles=Business%20Automation':'/automation'}>{window.location.pathname==='/automation'?'Connect your business ↗':'Explore automation ↗'}</a></div>
  </div>
 </section>
}
