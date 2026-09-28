'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BrandHeader from './BrandHeader'
import { SiteFooter, SiteLoader } from './ExperienceEnhancements'

gsap.registerPlugin(ScrollTrigger)

type MotionState = { motion: boolean }
const SiteMotionContext = createContext<MotionState>({ motion: true })

export function useSiteMotion() {
  return useContext(SiteMotionContext)
}

type SiteShellProps = {
  children: ReactNode
  isHome?: boolean
  bookingHref?: string
}

export default function SiteShell({ children, isHome = false, bookingHref }: SiteShellProps) {
  const root = useRef<HTMLDivElement>(null)
  const path = usePathname() || '/'
  const [motion, setMotion] = useState(true)
  const resolvedBookingHref = bookingHref ?? (path.startsWith('/services') ? '#book-calendar' : '/#book-calendar')

  useLayoutEffect(() => {
    if (!motion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      if (isHome) {
        gsap.from('.hero-line span', { yPercent: 110, rotate: 3, duration: 1.2, stagger: .12, ease: 'power4.out' })
        gsap.from('.hero-intro, .hero-bottom', { opacity: 0, y: 20, duration: 1, delay: .6 })
        gsap.from('.sculpture', { opacity: 0, scale: .6, rotation: -25, duration: 1.8, ease: 'power3.out' })
        gsap.to('.mark-float', { y: -19, rotation: 7, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.to('.orbit', { rotation: 360, duration: 55, repeat: -1, ease: 'none' })
        gsap.to('.ticker-track', { xPercent: -50, duration: 35, repeat: -1, ease: 'none' })
      }
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(element => {
        gsap.from(element, { y: 45, opacity: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 92%' } })
      })
    }, root)
    return () => ctx.revert()
  }, [motion, isHome, path])

  return <SiteMotionContext.Provider value={{ motion }}>
    <div ref={root} className={motion ? '' : 'motion-off'}>
      <SiteLoader/>
      <a className="skip" href="#main-content">Skip to content</a>
      <BrandHeader motion={motion}/>
      <main id="main-content">{children}</main>
      <SiteFooter
        isHome={isHome}
        motion={motion}
        onToggleMotion={() => setMotion(current => !current)}
        bookingHref={resolvedBookingHref}
      />
    </div>
  </SiteMotionContext.Provider>
}
