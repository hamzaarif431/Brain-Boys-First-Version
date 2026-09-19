# Brainboys AI — website concept

React + Vite frontend with GSAP and ScrollTrigger. The existing Brainboys icon is used as the brand mark throughout.

## Run

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`

## Pages

- `/` — homepage, fixed header, services, connected-system animation, process, CTA.
- `/services` — searchable, category-filtered directory of 19 specialists.
- `/services/:slug` — individual role, deliverables and related specialists.
- `/automation` — automation overview and scroll-driven logo-convergence sequence.
- `/hire-a-team` — interactive shortlist carried into the contact page.
- `/contact` — validated local brief builder, text download and FAQ.
- Unknown paths show the designed not-found screen.

The contact concept prepares a brief locally; it does not submit leads. Its explicit live-contact links open the existing Brainboys website. Connect an approved backend or CRM before turning this into a lead submission form.

## Structure

- `src/App.jsx`: shared fixed navigation/footer and homepage.
- `src/Pages.jsx`: inner pages, specialist filtering, team selection and brief builder.
- `src/content.js`: specialist content and deliverables.
- `src/AutomationExperience.jsx`: isolated GSAP timeline and scroll lifecycle.
- `src/Pages.css`: fixed-header, automation and inner-page styles.
- `src/App.css`: homepage styles.

The automation scene uses a sticky stage: tools appear, SVG connections draw, tools converge, and the original brand mark resolves. Header imagery is excluded from animation transforms. Motion can be disabled in the footer, and initial reduced-motion preferences are respected.

Production hosting must serve `index.html` for app paths such as `/services/crm` and `/hire-a-team`. Vite handles this fallback during local development.

## Light brand direction

`src/LightTheme.css` applies the white/lavender, purple and lime palette across all routes. `src/HomeSections.jsx` adds the interactive workday comparison, real expert profiles, support options and FAQ. Team names, roles and public portraits were adapted from the company’s previous website, https://syncjourney.com/. Old pricing and promotional claims have not been carried into the new concept.
