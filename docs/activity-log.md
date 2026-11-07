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

## 2026-10-31: Bullet rewriter

Server
- New `ai/client.ts`: shared `askAI` for structured OpenAI calls; `AIBusyError` is now handled once in the error handler (503).
- `ai/analyze.ts` slimmed to use `askAI`; prompts renamed to MATCH_PROMPT and buildMatchInput.
- New `POST /api/rewrite/questions`: returns why the bullet is weak and up to 3 questions (number or text).
- New `POST /api/rewrite`: writes one bullet using only the bullet and the answers; missing facts become [blanks].
- `removeUnsupportedNumbers`: any number in the suggestion that the user did not give (digits or words like "two") becomes [number], and the result says so.
- Rate limit: 30 rewriter calls per 15 minutes per visitor (two calls per bullet); match stays at 10.
- Mock mode returns sample questions and a suggestion that includes 150, to show the number check.

Client
- `/rewrite`: paste up to 5 bullets (list markers stripped) plus an optional job title, or arrive from Match results with the weak bullets.
- Per bullet: why it is weak, questions (skip any), suggestion card with [blanks] marked, Edit, Use this, Skip this bullet, progress.
- Summary: before and after per bullet, Copy and Copy all, warning when [blanks] remain.
- Match results: new "Fix N weak bullets" button; bullets pass through router state, which is cleared from history right away.
- New shared `ToolPage` wrapper (used by Match check and Rewriter) and `useCopy` hook; `postJson` helper in `lib/api.ts`.

Verified
- Server typecheck; API tests for questions, short bullet, invented number removed, given number kept, too many answers, 31st call gets 429.
- Number check cases: 150+ kept or blanked, 1,200 vs 1200, "two weeks" vs 2, invented "3-month" blanked.
- Client tsc, eslint, build; browser flow at 1440px and 390px: validation, two bullets, edit, use, summary copy all (clipboard checked), Match results to rewriter with history cleared. No console errors.
- Not yet tested: real OpenAI calls (needs your key).

## 2026-11-07: Skyline redesign

- Replaced the Highlighter look with Skyline: sky-to-navy palette, Archivo Expanded ExtraBold uppercase headlines, Manrope body text, pill buttons.
- Fonts: Google Fonts link now loads Archivo (wdth 125, weight 800) and Manrope; Plex Sans, Plex Mono, and Caveat removed.
- Tokens renamed in `index.css`: cobalt to accent (navy), hl to sky-200; new quiet, line-strong, sky-100 to sky-500; utilities `headline`, `bg-skyline`, `bg-navy`, `bg-dusk`.
- `ButtonLink`: new `arrow` prop (round arrow icon) and `light` variant; `buttonClass` is now pill shaped.
- `Header`: floats over the hero on the homepage (white logo, dark glass nav pill); sticky white bar elsewhere with a sky active pill.
- New `ArrowIcon`; `Wordmark` is now an icon plus JOB KIT in the display font; `Mark` is a sky tint only; `SectionLabel` is sentence case.
- Homepage rebuilt: Hero with Skyline (product screens as buildings), Intro (statement and true-fact stats), Tools, Honest (navy numbered list), BeforeAfter, FreshGrads, CtaBand. Removed Steps and MarkedResume.
- Tool pages: display headlines, rounder cards and inputs, pill tags, navy suggestion card, sky [blanks].
- Accessibility: giant JOB KIT is decorative (aria-hidden) and the tagline is the h1; hero text sits on a dark fade or dark glass; gray headline words darkened to #7A8AA0 (3.3:1 for large text).
- Verified: tsc, eslint, build; screenshots at 1440px and 390px with the real fonts, no horizontal scroll, no console errors; full Match to Rewriter flow still works.
