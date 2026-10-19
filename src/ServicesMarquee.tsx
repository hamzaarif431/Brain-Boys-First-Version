import { roles } from './content'

export default function ServicesMarquee() {
  return <div className="ticker services-marquee" aria-label="Our services">
    <div className="services-marquee-track">
      {[0, 1].map(copy => <div className="services-marquee-group" key={copy} role={copy === 0 ? 'list' : undefined} aria-hidden={copy === 1 ? true : undefined}>
        {roles.map(role => <span className="services-marquee-item" key={role.slug} role={copy === 0 ? 'listitem' : undefined}>
          {role.name}<img src="/brainboys-mark.png" alt="" width="40" height="40" />
        </span>)}
      </div>)}
    </div>
  </div>
}
