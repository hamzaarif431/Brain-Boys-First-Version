import HomeCalendarLink from './HomeCalendarLink'

export default function FounderStory() {
  return <article className="founder-editorial" aria-labelledby="founder-story-title">
    <div className="founder-editorial-masthead reveal"><span><i/> THE FOUNDER’S STORY</span><span>PEOPLE. PURPOSE. POSSIBILITY.</span></div>
    <header className="founder-editorial-name reveal"><span className="eyebrow">MEET THE MIND BEHIND THE MISSION</span><h2 id="founder-story-title">Ahsan<br/><span className="serif">Bhaghdadi.</span></h2><span className="founder-editorial-role"><i/> Founder, BrainBoys AI</span></header>
    <figure className="founder-editorial-figure reveal"><img src="/ahsan-bhaghdadi-founder-studio.png" alt="Ahsan Bhaghdadi, Founder of BrainBoys AI, in a black suit and red tie against a lilac studio background" width="1122" height="1402" loading="lazy"/><figcaption><span>THE HUMAN BEHIND THE VISION</span><img src="/brainboys-mark.png" alt="BrainBoys AI" width="28" height="28"/></figcaption></figure>
    <div className="founder-editorial-copy reveal"><h3>A simple belief.<br/>A better way to work.</h3><p>At the heart of BrainBoys AI is a simple idea: businesses should have the right expertise and systems around them to turn ambition into progress.</p><p>As founder, Ahsan Bhaghdadi helps shape that direction. Our approach brings specialists, intelligent automation and clear communication together, so the people doing the work can focus on what matters.</p><div className="founder-editorial-values"><span>Human expertise</span><i aria-hidden="true"/><span>Connected systems</span></div></div>
    <div className="founder-editorial-footer reveal"><div><span>THE BELIEF THAT CONNECTS US</span><p>Build around the people.<br/><span className="serif">Connect everything else.</span></p></div><HomeCalendarLink className="founder-editorial-cta">Let’s build what’s next <span className="ui-arrow" aria-hidden="true"/></HomeCalendarLink></div>
  </article>
}
