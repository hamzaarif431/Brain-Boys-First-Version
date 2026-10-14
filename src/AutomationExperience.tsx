import { usePathname } from 'next/navigation'
export default function AutomationExperience({motion=true}: {motion?:boolean}) {
 const isAutomation = usePathname() === '/automation'
 return <section className="connected-summary section" id="automation-flow"><div><span className="eyebrow"><i/> OUTPUT OVER INVOICES</span><h2>Other agencies track retainers.<br/><span className="serif">We track shipped work.</span></h2><p>We flipped the agency model on its head.<br/>No monthly contracts. No recurring retainer fees. No babysitting.</p><a className="text-link" href={isAutomation ? '/contact?roles=Business%20Automation' : '/automation'}>{isAutomation ? 'Start an automation task ↗︎' : 'See how we execute ↗︎'}</a></div><div className="connected-mark"><span className={motion?'connected-ring':'connected-ring still'}/><img src="/brainboys-mark.png" alt="Brainboys connected minds brand mark"/><span className="eyebrow">SHIPPED DELIVERABLES. CLEAR VALUE.</span></div></section>
}
