'use client'
import { useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export default function BrandHeader({motion}: {motion:boolean}) {
 const [open,setOpen]=useState(false)
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
 return <header ref={ref} className="bb-header"><div className="bb-header-inner"><a className="bb-brand" href="/" aria-label="Brainboys home"><span className="header-mark-shell"><img className="header-mark header-mark-main" src="/brainboys-mark.png" alt=""/><img className="header-mark header-mark-crm" src="/brainboys-crm-logo.png" alt=""/></span><span className="brand-label-main">BRAINBOYS AI</span><span className="brand-label-crm">BRAINBOYS CRM</span></a><nav aria-label="Main navigation" id="bb-navigation" className={open?'bb-links is-open':'bb-links'}>{[['Home','/'],['Services','/services'],['Hire a Team','/hire-a-team'],['Contact','/contact']].map(([label,url])=><a key={url} href={url} aria-current={path===url?'page':undefined}>{label}</a>)}</nav><a className="bb-book" href={bookingHref}>Book a call <span className="ui-arrow" aria-hidden="true"/></a><button className="bb-menu" aria-label="Toggle menu" aria-controls="bb-navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?'×':'☰'}</button></div></header>
}


