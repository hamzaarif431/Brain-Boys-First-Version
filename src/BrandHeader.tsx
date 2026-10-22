'use client'
import { useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export default function BrandHeader({motion}: {motion:boolean}) {
 const [open,setOpen]=useState(false)
 const [homeMenuOpen,setHomeMenuOpen]=useState(false)
 const ref=useRef<HTMLElement>(null)
 const path=usePathname()
 const bookingHref=path?.startsWith('/services')?'#book-calendar':'/#book-calendar'
 useLayoutEffect(()=>{
  if(!motion || matchMedia('(prefers-reduced-motion: reduce)').matches)return
  const ctx=gsap.context(()=>{
   gsap.to('.header-mark-shell',{transformPerspective:600,rotation:()=>Math.max(1,document.documentElement.scrollHeight-innerHeight)*.24,rotationX:18,rotationY:30,ease:'none',scrollTrigger:{start:0,end:()=>Math.max(1,document.documentElement.scrollHeight-innerHeight),scrub:.5,invalidateOnRefresh:true}})
  },ref)
  return()=>ctx.revert()
 },[motion,path])
 return <header ref={ref} className="bb-header"><div className="bb-header-inner"><a className="bb-brand" href="/" aria-label="BrainBoys Ai home"><span className="header-mark-shell"><img className="header-mark header-mark-main" src="/brainboys-mark.png" alt=""/><img className="header-mark header-mark-crm" src="/brainboys-crm-mark-transparent.png" alt=""/></span><span className="brand-label-main">BrainBoys Ai</span><span className="brand-label-crm">BrainBoys CRM</span></a><nav aria-label="Main navigation" id="bb-navigation" className={open?'bb-links is-open':'bb-links'}>
  <div className="bb-home-menu" onPointerEnter={event=>{if(event.pointerType==='mouse')setHomeMenuOpen(true)}} onPointerLeave={event=>{if(event.pointerType==='mouse')setHomeMenuOpen(false)}} onFocusCapture={event=>{if(event.target instanceof HTMLAnchorElement)setHomeMenuOpen(true)}} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setHomeMenuOpen(false)}} onKeyDown={event=>{if(event.key==='Escape'){setHomeMenuOpen(false);event.currentTarget.querySelector('button')?.focus()}}}>
   <div className="bb-home-trigger"><Link href="/" aria-current={path==='/'?'page':undefined} onClick={()=>setOpen(false)}>Home</Link><button type="button" className="bb-home-toggle" aria-label="Toggle Home submenu" aria-expanded={homeMenuOpen} aria-controls="bb-home-submenu" onClick={()=>setHomeMenuOpen(value=>!value)}><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button></div>
   <div id="bb-home-submenu" className="bb-home-dropdown" hidden={!homeMenuOpen}><Link href="/about-us" aria-current={path==='/about-us'?'page':undefined} onClick={()=>{setHomeMenuOpen(false);setOpen(false)}}><span>About us<small>The people behind the possibility</small></span><span className="ui-arrow" aria-hidden="true"/></Link></div>
  </div>
  {[['Services','/services'],['Hire a Team','/hire-a-team'],['Portfolio','/portfolio'],['Contact','/contact']].map(([label,url])=><Link key={url} href={url} aria-current={path===url?'page':undefined} onClick={()=>{setOpen(false);setHomeMenuOpen(false)}}>{label}</Link>)}
 </nav><a className="bb-book" href={bookingHref}>Book a call <span className="ui-arrow" aria-hidden="true"/></a><button className="bb-menu" aria-label="Toggle menu" aria-controls="bb-navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?'×':'☰'}</button></div></header>
}


