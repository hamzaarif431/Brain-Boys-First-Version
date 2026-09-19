# Brainboys AI website

Next.js App Router + TypeScript + GSAP/ScrollTrigger. The site uses the original Brainboys icon throughout a light purple/lime design. The homepage and `/automation` both include the scroll-driven "One trigger. A whole business in motion." workflow before "THE CONNECTED ADVANTAGE." Its five scroll-activated nodes route work through the eight original automation tools, then reveal the supplied animated Brainboys GIF.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173. Use `npm run build`, `npm run typecheck`, and `npm run lint` for verification.

## Routes

- `/` — homepage, workflow, connected advantage, people, process, FAQ and CTA.
- `/services` — searchable, category-filtered directory of 19 specialists.
- `/services/:slug` — role detail, deliverables and related specialists.
- `/automation` — workflow and automation outcomes.
- `/hire-a-team` — interactive specialist shortlist.
- `/contact` — validated local brief builder and text download.

The contact concept prepares a brief locally; it does not submit leads. Its live-contact links open the existing Brainboys website. Connect a backend or CRM when lead submission is ready.

## Structure

- `app/` — Next.js routes, metadata and global styles.
- `src/App.tsx` — shared footer and homepage.
- `src/BrandHeader.tsx` — Brainboys floating header and scroll-linked 3D brand mark.
- `src/Workflow.tsx` and `src/TriggerFlow.css` — GSAP workflow scene and responsive styling.
- `src/AutomationExperience.tsx` — retained connected advantage section.
- `src/Pages.tsx` — inner pages and their interactions.
- `src/content.ts` — specialist content.
- `src/LightTheme.css` — light brand palette and prior section styles.

Motion can be toggled from the footer and is also disabled for visitors who prefer reduced motion. The team portraits were sourced from the company's previous website, syncjourney.com.
