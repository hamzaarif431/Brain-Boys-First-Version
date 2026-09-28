'use client'

type LegalSection = { title: string; paragraphs?: string[]; bullets?: string[] }

const privacySections: LegalSection[] = [
  { title: '1. Acceptance of this policy', paragraphs: ['By using the Brainboys website, you acknowledge this policy and agree to the information practices described here.'] },
  { title: '2. Information we collect', paragraphs: ['We may receive information you submit directly, technical information recorded by our web services, and data stored through cookies or similar technologies.'], bullets: ['Contact details and project information you choose to provide','Internet protocol address, browser and device type','Pages viewed, links used, referral page, date and approximate location','Cookie preferences and information used to improve the site'] },
  { title: '3. How we use information', bullets: ['Respond to enquiries and deliver requested services','Operate, secure and improve our website and client experience','Comply with legal processes and protect our rights','Support a business transfer, merger or reorganisation where legally permitted'] },
  { title: '4. Sharing and selling', paragraphs: ['Brainboys does not sell, rent or lease customer lists. We may use trusted service providers where needed to operate our services, subject to appropriate safeguards and applicable law.'] },
  { title: '5. Your information', paragraphs: ['You may ask us to review, correct or delete personal information we hold about you, subject to legal and operational requirements.'] },
  { title: '6. Policy changes', paragraphs: ['We may update this policy as our services or legal requirements change. The latest version will remain available on this page.'] },
  { title: '7. Contact', paragraphs: ['Questions about privacy or your information can be sent to hello@brainboys.ai.'] }
]

const termsSections: LegalSection[] = [
  { title: '1. Using this website', paragraphs: ['You may view and use the Brainboys website for lawful personal or business evaluation. You may not misuse, copy for redistribution, reverse engineer, remove ownership notices from, or interfere with the site or its software.'] },
  { title: '2. Website information', paragraphs: ['Website materials are provided for general information. Brainboys does not promise that every item will always be complete, current or error-free, and may update content without notice.'] },
  { title: '3. Service discussions', paragraphs: ['Project scope, pricing, timelines, deliverables and platform costs become binding only when recorded in a separate written agreement accepted by Brainboys and the client.'] },
  { title: '4. Liability', paragraphs: ['To the extent permitted by law, Brainboys is not responsible for indirect loss, lost profit, lost data or business interruption arising from use of this website.'] },
  { title: '5. External links', paragraphs: ['Links to third-party websites are provided for convenience. Their content, security and privacy practices remain the responsibility of their operators.'] },
  { title: '6. Changes to these terms', paragraphs: ['We may revise these terms from time to time. Continuing to use the site after an update means the current terms apply.'] },
  { title: '7. Governing law', paragraphs: ['Any claim relating to this website is governed by the laws applicable to the site owner, without applying conflict-of-law rules.'] },
  { title: '8. Contact', paragraphs: ['Questions about these terms can be sent to hello@brainboys.ai.'] }
]

function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const privacy = kind === 'privacy'
  const sections = privacy ? privacySections : termsSections
  const title = privacy ? 'Privacy policy.' : 'Terms & conditions.'
  return <>
    <section className="legal-hero section"><div className="inner-breadcrumb"><a href="/">Home</a><span>/</span>{privacy ? 'Privacy policy' : 'Terms & conditions'}</div><span className="eyebrow">LEGAL / CLEAR WORDS</span><h1>{title}<br/><span className="serif">Plain and considered.</span></h1><p>{privacy ? 'How Brainboys handles information when you use our website or contact our team.' : 'The terms that apply when you access and use the Brainboys website.'}</p><small>Last updated: September 2026</small></section>
    <section className="legal-content section"><aside><span>ON THIS PAGE</span>{sections.map(section => <a key={section.title} href={`#legal-${section.title.split('.')[0]}`}>{section.title}</a>)}</aside><div>{sections.map(section => <article id={`legal-${section.title.split('.')[0]}`} key={section.title}><h2>{section.title}</h2>{section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}</article>)}</div></section>
  </>
}

export function PrivacyPage() { return <LegalPage kind="privacy"/> }
export function TermsPage() { return <LegalPage kind="terms"/> }

