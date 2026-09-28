'use client'
import type { ReactNode } from 'react'

export const Mark=()=> <img src="/brainboys-mark.png" alt=""/>
export function PageIntro({number,kicker,title,accent,description,children}: {number:string;kicker:string;title:string;accent:string;description:string;children?:ReactNode}){return <section className="inner-intro section"><div className="inner-breadcrumb"><a href="/">Home</a><span>/</span>{kicker}</div><div className="inner-intro-grid"><div><span className="eyebrow">{number} / {kicker.toUpperCase()}</span><h1>{title}<br/><span className="serif">{accent}</span></h1><p>{description}</p>{children}</div><div className="inner-brand-art" aria-hidden="true"><div/><Mark/><span>BRILLIANT MINDS.<br/>ONE TEAM.</span></div></div></section>}
export function EndCTA(){return <section className="inner-cta section"><div><span className="eyebrow">GREAT THINGS START WITH A CONVERSATION</span><h2>Your ambition.<br/><span className="serif">Our collective energy.</span></h2></div><a className="button lime-button" href="/contact">Let’s make it happen ↗︎</a></section>}

