import { usePathname } from 'next/navigation'
export default function AutomationExperience({motion=true}: {motion?:boolean}) {
 const isAutomation = usePathname() === '/automation'
 return <section className="connected-summary section" id="automation-flow"><div><span className="eyebrow"><i/> OUTPUT OVER INVOICES</span><h2>The right brain<br/><span className="serif">for the job.</span></h2><p>Matched to your task, priced before we start, tracked until it’s done.</p><a className="text-link" href={isAutomation ? '/contact?roles=Business%20Automation' : '/automation'}>{isAutomation ? 'Start an automation task ↗︎' : 'See how we execute ↗︎'}</a></div><div className="connected-mark"><span className={motion?'connected-ring':'connected-ring still'}/><img src="/brainboys-mark.png" alt="BrainBoys Ai connected minds brand mark"/><span className="eyebrow">SHIPPED DELIVERABLES. CLEAR VALUE.</span></div></section>
}
