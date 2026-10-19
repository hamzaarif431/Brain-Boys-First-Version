'use client'

import { useEffect, useRef } from 'react'

type Story = { id: string; video: string; poster: string; title: string }

export default function TestimonialCard({ story, index, playing, onPlay, onClose }: {
  story: Story; index: number; playing: boolean; onPlay: () => void; onClose: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (playing) {
      void video.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ })
    } else {
      video.pause()
      if (video.readyState > 0) video.currentTime = 0
    }
  }, [playing])

  const close = () => {
    videoRef.current?.pause()
    onClose()
    window.requestAnimationFrame(() => playRef.current?.focus({ preventScroll: true }))
  }

  return <article className={'story-card' + (playing ? ' is-playing' : '')}>
    <div className="story-media">
      <img className="story-poster" src={story.poster} alt={`Client from Brainboys video story ${index + 1}`} width="640" height="1138" loading="lazy" decoding="async"/>
      {/* Video extensions can inject an mtz-vlc class before React hydrates. */}
      <video suppressHydrationWarning ref={videoRef} className="story-player" src={story.video} poster={story.poster} title={`Client video testimonial ${index + 1}`} controls playsInline preload="none" aria-hidden={!playing} tabIndex={playing ? 0 : -1}/>
      <div className="story-preview-content" aria-hidden={playing}>
        <div className="story-shade"/>
        <span className="story-number">0{index + 1}</span>
        <button ref={playRef} type="button" className="story-play" aria-label={`Play client testimonial ${index + 1}`} tabIndex={playing ? -1 : 0} onClick={onPlay}><span>▶</span><b>PLAY STORY</b></button>
        <div className="story-card-copy"><h3>{story.title}</h3></div>
      </div>
      <button type="button" className="story-close" aria-label={`Close client testimonial ${index + 1}`} aria-hidden={!playing} tabIndex={playing ? 0 : -1} onClick={close}>×</button>
    </div>
  </article>
}
