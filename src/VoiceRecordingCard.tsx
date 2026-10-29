'use client'

import { useId, useRef, useState } from 'react'

const waveform = Array.from({ length: 45 }, (_, index) => 18 + ((index * 17 + index % 4 * 3) % 68))
const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`

export default function VoiceRecordingCard({ audioSrc, unlocked, onUnlock }: { audioSrc?: string; unlocked: boolean; onUnlock: () => void }) {
  const titleId = useId()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackError, setPlaybackError] = useState(false)
  const available = unlocked && Boolean(audioSrc)
  const progress = duration > 0 ? currentTime / duration : 0

  const togglePlayback = async () => {
    if (!unlocked) { onUnlock(); return }
    const audio = audioRef.current
    if (!audio || !audioSrc) return
    if (!audio.paused) { audio.pause(); return }
    try { await audio.play(); setPlaybackError(false) } catch { setPlaybackError(true) }
  }

  const updateDuration = () => {
    const value = audioRef.current?.duration ?? 0
    setDuration(Number.isFinite(value) ? value : 0)
  }

  return <div className="voice-recording-card" role="region" aria-labelledby={titleId}>
    <span className="voice-recording-badge">RECORDING</span>
    <button type="button" className="voice-recording-play" onClick={togglePlayback} disabled={unlocked && !audioSrc} aria-label={!unlocked ? 'Unlock the AI agent recording' : playing ? 'Pause AI agent recording' : 'Play AI agent recording'} aria-haspopup={!unlocked ? 'dialog' : undefined}>
      <svg viewBox="0 0 24 24" aria-hidden="true">{playing ? <><path d="M6 5h4v14H6z"/><path d="M14 5h4v14h-4z"/></> : <path d="m8 4 12 8-12 8Z"/>}</svg>
    </button>
    <div className="voice-recording-track">
      <div className="voice-recording-wave" aria-hidden="true">{waveform.map((height, index) => <i key={index} className={index / waveform.length < progress ? 'is-played' : ''} style={{ height: `${height}%` }}/>)}</div>
      <input type="range" min="0" max={duration || 1} step="0.1" value={currentTime} disabled={!available || !duration} aria-label="Recording playback position" aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`} onChange={event => {
        const value = Number(event.target.value)
        if (audioRef.current) audioRef.current.currentTime = value
        setCurrentTime(value)
      }}/>
    </div>
    <div className="voice-recording-times" aria-hidden="true"><span>{formatTime(currentTime)}</span><span>{duration ? formatTime(duration) : '—:—'}</span></div>
    <div className="voice-recording-copy"><h3 id={titleId}>Hear it in action!</h3><p>A recorded conversation between a client and our AI Agent</p></div>
    {unlocked && playbackError && <p className="voice-recording-status" role="status">Unable to play. Please try again.</p>}
    {available && <audio ref={audioRef} src={audioSrc} preload="metadata" onLoadedMetadata={updateDuration} onDurationChange={updateDuration} onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => { setPlaying(false); setPlaybackError(true) }} />}
  </div>
}
