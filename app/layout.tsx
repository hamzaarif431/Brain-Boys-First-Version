import type { Metadata } from 'next'
import '../src/index.css'
import '../src/App.css'
import '../src/Pages.css'
import '../src/LightTheme.css'
import '../src/Workflow.css'
import '../src/TriggerFlow.css'
import '../src/NewHomeSections.css'
import '../src/ExperienceEnhancements.css'
import '../src/PortfolioAndLegal.css'

export const metadata: Metadata = {
  title: {
    default: 'Brainboys AI — Brilliant minds. One team.',
    template: '%s — Brainboys AI',
  },
  description: 'Connected specialists and intelligent automation.',
  keywords: ['Brainboys AI', 'AI automation', 'digital specialists', 'business growth'],
  icons: { icon: '/icon.png', shortcut: '/icon.png', apple: '/icon.png' },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
