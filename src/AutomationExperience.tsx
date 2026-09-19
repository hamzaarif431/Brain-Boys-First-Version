import { usePathname } from 'next/navigation'
export default function AutomationExperience({motion=true}: {motion?:boolean}) {
 const isAutomation = usePathname() === '/automation'
 return <section className="connected-summary section" id="automation-flow"><div><span className="eyebrow"><i/> THE CONNECTED ADVANTAGE</span><h2>Many moving parts.<br/><span className="serif">One brilliant system.</span></h2><p>Your tools, your people, your ambition.<br/>Connected by Brainboys AI.</p><a className="text-link" href={isAutomation ? '/contact?roles=Business%20Automation' : '/automation'}>{isAutomation ? 'Connect your business ↗' : 'Explore automation ↗'}</a></div><div className="connected-mark"><span className={motion?'connected-ring':'connected-ring still'}/><img src="/brainboys-mark.png" alt="Brainboys connected minds brand mark"/><span className="eyebrow">BRILLIANT MINDS. ONE TEAM.</span></div></section>
}
