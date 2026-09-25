import type { Metadata } from 'next'
import '../src/index.css'
import '../src/App.css'
import '../src/Pages.css'
import '../src/LightTheme.css'
import '../src/Workflow.css'
import '../src/TriggerFlow.css'
import '../src/NewHomeSections.css'
import '../src/ExperienceEnhancements.css'

export const metadata: Metadata = {
  title: 'Brainboys AI — Brilliant minds. One team.',
  description: 'Connected specialists and intelligent automation.',
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
