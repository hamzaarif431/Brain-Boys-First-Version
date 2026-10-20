'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const pendingScrollKey = 'brainboys-home-calendar-scroll'

function scrollToCalendar() {
  ScrollTrigger.refresh()
  document.getElementById('book-calendar')?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start',
  })
}

export default function HomeCalendarLink({ children, className }: { children: ReactNode; className?: string }) {
  const pathname = usePathname()
  return <Link className={className} href="/#book-calendar" scroll={false} onClick={event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    if (pathname === '/') {
      event.preventDefault()
      window.history.pushState(null, '', '/#book-calendar')
      scrollToCalendar()
    } else {
      sessionStorage.setItem(pendingScrollKey, 'true')
    }
  }}>{children}</Link>
}

export function useHomeCalendarScroll() {
  useEffect(() => {
    if (sessionStorage.getItem(pendingScrollKey) !== 'true' || window.location.hash !== '#book-calendar') return
    let frame = 0
    let scheduled = false
    const observer = new MutationObserver(() => schedule())
    const schedule = () => {
      if (scheduled || document.querySelector('.site-loader')) return
      scheduled = true
      observer.disconnect()
      frame = requestAnimationFrame(() => {
        sessionStorage.removeItem(pendingScrollKey)
        scrollToCalendar()
      })
    }
    observer.observe(document.body, { childList: true, subtree: true })
    schedule()
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [])
}
