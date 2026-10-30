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
