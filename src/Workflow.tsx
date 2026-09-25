import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    label: '01 — THE SIGNAL', type: 'TRIGGER', node: 'Webhook', icon: '↗︎', status: 'Listening',
    title: 'A request comes in.',
    text: 'Your form, store or app sends one clean event. No copying, chasing or checking required.',
    tools: ['Web Development', 'Shopify'],
  },
  {
    label: '02 — CAPTURE', type: 'CRM', node: 'Customer record', icon: '≡', status: 'Active',
    title: 'Every detail lands in one place.',
    text: 'The request becomes a complete record, ready for the team that will move it forward.',
    tools: ['GoHighLevel', 'HubSpot'],
  },
  {
    label: '03 — DECIDE', type: 'AI ROUTER', node: 'Intelligent routing', icon: '✳', status: 'Active',
    title: 'The right next move happens.',
    text: 'An AI assistant qualifies the request and routes it to the right person at the right time.',
    tools: ['AI Voice Bot', 'AI Employee'],
  },
  {
    label: '04 — COORDINATE', type: 'PROJECTS', node: 'Team handoff', icon: '⌘', status: 'Active',
    title: 'Your team starts already aligned.',
    text: 'A task, owner, brief and follow-up are created together. Everyone shares the same context.',
    tools: ['AI Marketing', 'CRM Automation'],
  },
  {
    label: '05 — CLOSE THE LOOP', type: 'DELIVERY', node: 'Outcome delivered', icon: '✓', status: 'Listening',
    title: 'Delivery updates itself.',
    text: 'Completion reaches the client and the result is recorded — ready for the next request.',
    tools: ['Connected team', 'Clear next step'],
  },
]

const connectorPaths = [
  'M145 0 C145 55 340 45 340 100',
  'M340 0 C340 46 740 54 740 100',
  'M740 0 C740 60 480 40 480 100',
  'M480 0 C480 48 120 52 120 100',
]

export default function Workflow({ motion = true }: { motion?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameProgress = useRef(0)

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    const atlas = new Image()
    const frameCount = 64
    const frameSize = 480
    const columns = 8
    let atlasReady = false
    let requestedFrame = 0
    let renderedFrame = -1
    let drawRequest = 0

    const draw = () => {
      drawRequest = 0
      if (!canvas || !context || !atlasReady || requestedFrame === renderedFrame) return
      const column = requestedFrame % columns
      const row = Math.floor(requestedFrame / columns)
      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = 'high'
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(atlas, column * frameSize, row * frameSize, frameSize, frameSize, 0, 0, canvas.width, canvas.height)
      renderedFrame = requestedFrame
    }
    const seekTo = (progress: number) => {
      frameProgress.current = Math.max(0, Math.min(1, progress))
      requestedFrame = Math.round(frameProgress.current * (frameCount - 1))
      if (atlasReady && !drawRequest) drawRequest = window.requestAnimationFrame(draw)
    }
    atlas.decoding = 'async'
    atlas.onload = () => {
      atlasReady = true
      seekTo(frameProgress.current)
    }
    atlas.src = '/brain-boys-logo-atlas.webp'

    const cleanCanvas = () => {
      atlas.onload = null
      if (drawRequest) window.cancelAnimationFrame(drawRequest)
    }
    if (!motion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      seekTo(1)
      return cleanCanvas
    }
    const mm = gsap.matchMedia()

    mm.add('(min-width: 801px)', () => {
      const section = sectionRef.current!
      const track = section.querySelector<HTMLElement>('.tf2-track')!
      const flow = section.querySelector<HTMLElement>('.tf2-viewport')!
      const finale = section.querySelector<HTMLElement>('.tf2-finale')!
      const nodes = Array.from(section.querySelectorAll<HTMLElement>('.tf2-step'))
      const progress = section.querySelector<HTMLElement>('.tf2-progress-fill')!
      let currentPhase = -1

      gsap.set(finale, { autoAlpha: 0, y: 36, scale: .94 })
      const setPhase = (value: number) => {
        const phase = Math.min(5, Math.floor(value * 6))
        gsap.set(progress, { scaleX: value, transformOrigin: 'left' })
        seekTo((value - 5 / 6) * 6)
        if (phase === currentPhase) return
        currentPhase = phase
        nodes.forEach((node, index) => {
          node.classList.toggle('is-active', index === phase)
          node.classList.toggle('is-complete', index < phase)
          node.querySelector('.tf2-connector')?.classList.toggle('is-drawn', index < phase)
        })
        gsap.to(track, { y: -Math.min(phase, 4) * 180, duration: .72, ease: 'power3.out', overwrite: 'auto' })
        gsap.to(flow, { autoAlpha: phase === 5 ? 0 : 1, duration: .45, overwrite: 'auto' })
        gsap.to(finale, { autoAlpha: phase === 5 ? 1 : 0, y: phase === 5 ? 0 : 36, scale: phase === 5 ? 1 : .94, duration: .65, ease: 'power3.out', overwrite: 'auto' })
      }
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: self => setPhase(self.progress),
        onRefresh: self => setPhase(self.progress),
      })
      setPhase(trigger.progress)
      return () => {
        trigger.kill()
        gsap.killTweensOf([track, flow, finale])
        gsap.set([track, flow, finale, progress], { clearProps: 'all' })
        nodes.forEach(node => {
          node.classList.remove('is-active', 'is-complete')
          node.querySelector('.tf2-connector')?.classList.remove('is-drawn')
        })
      }
    })

    mm.add('(max-width: 800px)', () => {
      const section = sectionRef.current!
      const nodes = Array.from(section.querySelectorAll<HTMLElement>('.tf2-step'))
      const finaleScroll = section.querySelector<HTMLElement>('.tf2-finale-scroll')!
      const markActive = (activeIndex: number) => nodes.forEach((step, index) => {
        step.classList.toggle('is-active', index === activeIndex)
        step.classList.toggle('is-complete', index < activeIndex)
        step.querySelector('.tf2-connector')?.classList.toggle('is-drawn', index < activeIndex)
      })
      const triggers = nodes.map((node, index) => ScrollTrigger.create({
        trigger: node,
        start: 'top 74%',
        end: 'bottom 35%',
        onEnter: () => markActive(index),
        onEnterBack: () => markActive(index),
        onLeave: () => {
          node.classList.remove('is-active')
          node.classList.add('is-complete')
          if (index < nodes.length - 1) node.querySelector('.tf2-connector')?.classList.add('is-drawn')
        },
        onLeaveBack: () => markActive(Math.max(0, index - 1)),
      }))
      triggers.push(ScrollTrigger.create({
        trigger: finaleScroll,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: self => seekTo(self.progress),
        onRefresh: self => seekTo(self.progress),
      }))
      return () => triggers.forEach(trigger => trigger.kill())
    })

    return () => {
      mm.revert()
      cleanCanvas()
    }
  }, [motion])

  return <section ref={sectionRef} className={'trigger-flow' + (!motion ? ' trigger-flow-static' : '')} id="business-in-motion" aria-labelledby="trigger-title">
    <div className="tf2-sticky">
      <header className="tf2-heading">
        <span className="eyebrow"><i /> LIVE AUTOMATION / THE BRAINBOYS WAY</span>
        <h2 id="trigger-title">One trigger. <span className="serif">A whole business in motion.</span></h2>
        <p>Scroll to watch every handoff happen automatically.</p>
      </header>
      <div className="tf2-viewport">
        <div className="tf2-track">
          {steps.map((step, index) => <article className={'tf2-step tf2-step-' + index + (index === 0 ? ' is-active' : '')} key={step.label}>
            <div className="tf2-copy">
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <div className="tf2-chips">{step.tools.map(tool => <b key={tool}>{tool}</b>)}</div>
            </div>
            <div className="tf2-node">
              <div className="tf2-node-icon" aria-hidden="true">{step.icon}</div>
              <div className="tf2-node-body"><span>{step.type}</span><strong>{step.node}</strong></div>
              <div className="tf2-node-status"><i /><i /><i /><em className="tf2-status-active">{step.status}</em><em className="tf2-status-queued">Queued</em><em className="tf2-status-complete">✓ Success</em></div>
            </div>
            {index < connectorPaths.length && <div className="tf2-connector" aria-hidden="true"><svg viewBox="0 0 1000 100" preserveAspectRatio="none"><path className="tf2-rail" d={connectorPaths[index]} /><path className="tf2-draw" pathLength="1" d={connectorPaths[index]} /></svg></div>}
          </article>)}
        </div>
      </div>
      <div className="tf2-finale-scroll">
        <div className="tf2-finale">
          <canvas ref={canvasRef} className="tf2-gif" width="960" height="960" role="img" aria-label="Brainboys team and connected nodes forming the Brainboys name" />
          <a href="/contact?roles=Business%20Automation">Build my workflow <span className="ui-arrow" aria-hidden="true" /></a>
        </div>
      </div>
      <div className="tf2-progress"><span className="tf2-progress-line"><span className="tf2-progress-fill" /></span><b>SCROLL TO RUN WORKFLOW</b></div>
    </div>
  </section>
}
