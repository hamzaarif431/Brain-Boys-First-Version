'use client'

import { useEffect, useRef } from 'react'

const scriptId = 'brainboys-form-embed-script'

function loadEmbedScript() {
  if (document.getElementById(scriptId)) return
  const script = document.createElement('script')
  script.id = scriptId
  script.src = 'https://api.brainboys.ai/js/form_embed.js'
  script.async = true
  script.addEventListener('error', () => script.remove(), { once: true })
  document.body.appendChild(script)
}

type ExternalEmbedProps = {
  src: string
  title: string
  id: string
  height?: number
  formId?: string
  allow?: string
  scrolling?: 'yes' | 'no' | 'auto'
  loading?: 'eager' | 'lazy'
  embedScript?: boolean
  autoHeight?: boolean
}

export default function ExternalEmbed({ src, title, id, height, formId, allow, scrolling, loading, embedScript = true, autoHeight = false }: ExternalEmbedProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    // The vendor can wrap or move its iframe. React owns only the empty host,
    // so reconciliation never tries to remove a vendor-managed iframe node.
    const iframe = document.createElement('iframe')
    iframe.id = id
    iframe.title = title
    iframe.style.cssText = `display:block;width:100%;height:${height ? `${height}px` : '100%'};border:none;border-radius:0;`
    if (height) iframe.style.minHeight = `${height}px`
    if (allow) iframe.allow = allow
    if (scrolling) iframe.setAttribute('scrolling', scrolling)
    if (loading) iframe.loading = loading
    if (formId) {
      const attributes = {
        'data-layout': "{'id':'INLINE'}",
        'data-trigger-type': 'alwaysShow',
        'data-trigger-value': '',
        'data-activation-type': 'alwaysActivated',
        'data-activation-value': '',
        'data-deactivation-type': 'neverDeactivate',
        'data-deactivation-value': '',
        'data-form-name': title,
        'data-height': String(height),
        'data-layout-iframe-id': id,
        'data-form-id': formId,
        'data-cookie-consent': 'true',
        'data-cookie-consent-provider': 'auto',
      }
      for (const [name, value] of Object.entries(attributes)) iframe.setAttribute(name, value)
    }
    iframe.src = src
    host.appendChild(iframe)
    if (embedScript) loadEmbedScript()

    return () => {
      // remove() uses the current parent even when the embed script reparented it.
      iframe.remove()
      host.replaceChildren()
    }
  }, [src, title, id, height, formId, allow, scrolling, loading, embedScript])

  return <div ref={hostRef} style={{ width: '100%', height: autoHeight ? 'auto' : '100%', minHeight: height }} />
}
