# Activity log

## 2026-10-31: Homepage

- Pinned TypeScript to ~6.0.3 because typescript-eslint 8.x does not support TypeScript 7 yet; upgrade once it does.
- Added Tailwind v4 via `@tailwindcss/vite`; Palette A tokens live in `client/src/index.css` under `@theme`.
- Loaded IBM Plex Sans (400, 500) from Google Fonts in `client/index.html`.
- Added React Router; only `/` exists, and unknown paths redirect to home until tool pages are built.
- Shared components: `Header` (sticky, mobile menu), `Footer`, `ButtonLink` (4 variants), `ScoreRing`.
- `lib/score.ts` maps a score to its color: 80+ strong, 50+ needs work, below 50 missing.
- Homepage sections in `components/home/`: Hero, ProductPreview (sample data only), Features, TrustSection, CtaBand.
- Verified: `tsc -b`, `eslint .`, and `vite build` pass.
- To clean up: unused template files `src/App.css`, `src/assets/*`, `public/icons.svg`.
- Also to clean up: server-only dev dependencies installed in client (`@types/express`, `@types/cors`, `tsx`).

## 2026-10-31: Homepage redesign (Highlighter palette)

- Replaced Palette A (sage) with the Highlighter palette; tokens in `client/src/index.css`, plus a `marker` utility for headline highlights.
- Fonts: added IBM Plex Mono (labels, [blanks]) and Caveat (recruiter notes on the hero visual only).
- New shared components: `Mark`, `SectionLabel`, `Wordmark`; `ButtonLink` trimmed to primary and dark variants; `ScoreRing` label removed.
- Home sections now: Hero + MarkedResume, Steps, BeforeAfter, FreshGrads, CtaBand.
- Removed old sections (Features, ProductPreview, TrustSection) and unused Vite template files.
- Fixed: header CTA showed on mobile because ButtonLink's display class overrode `hidden`; wrapped it instead.
- Verified: `tsc -b`, `eslint .`, `vite build`, and screenshots at 1440px and 390px with no horizontal scroll.

## 2026-10-31: Full-screen mobile menu

- New `MobileMenu`: full-screen panel with its own X, numbered links, and the CTA at the bottom.
- Animation: panel fades in (250ms) with a slight downward drift, then links fade up one by one (50ms apart); closes with a 200ms fade.
- When closed it is invisible and ignores taps, so it never blocks the page underneath.
- Closes on X, Escape, any link, the wordmark, or resizing to desktop; locks page scroll while open.
- Focus goes to X on open, Tab stays inside the panel, and focus returns to the hamburger on close.
- Rendered outside `<header>` because the header's backdrop blur would trap a fixed panel inside it.
- Respects reduced motion (appears instantly).
- Verified in a 390px browser: open, Tab order, Escape, and link click; no console errors.

## 2026-10-31: Match check (v1, paste only)

Server
- `package.json`: switched to ES modules; added dev, build, start, typecheck scripts; pinned TypeScript to ~6.0.3 (run `npm install` in server).
- `src/index.ts`: Express with helmet, CORS limited to CLIENT_ORIGIN, 100kb body limit, 10 checks per 15 minutes per IP, generic error responses; exits at startup if the key or model is missing.
- `src/ai/schemas.ts`: input rules (50 to 8,000 characters each) and the structured shape the AI must return.
- `src/ai/prompts.ts`: never invent, evidence copied word for word, capstone and OJT count, pasted text treated as data.
- `src/ai/rubric.ts`: code computes the score from DRAFT weights (skills 50, projects 25, results 15, format 10); any skill whose evidence quote is not in the resume is downgraded to missing.
- `src/ai/analyze.ts`: OpenAI Responses API with zodTextFormat; maps 429, 5xx, and connection errors to a friendly 503.
- `AI_MOCK=1` returns sample results without a key, for UI work.
- Resume text is never logged or stored.

Client
- Vite proxy sends /api to localhost:3001; `VITE_API_URL` sets the server URL for production.
- `/match`: form (TextBox x2, validation, loading state) turns into results in place; results live in memory only.
- Results: score ring, status tag, why-this-score rows with reasons, missing and partly shown skills, keep these, bullets to strengthen.
- "Check another job" keeps the resume and clears the job post; focus moves to the results heading.
- New `lib/ui.ts` buttonClass shared by ButtonLink and form buttons.

Verified
- Server: typecheck; API tests for health, short input, missing field, bad JSON, mock result, rate limit (11th request gets 429), startup without a key; scoring test where fake evidence is downgraded.
- Client: tsc, eslint, build; browser test at 1440px and 390px for validation, submit, results, focus, and "Check another job". No console errors.
- Not yet tested: a real OpenAI call (needs your key).
