# ZAXWEIR — Visual Design Standard (Staged Draft)
Version: 0.1 | 2026-10-13 | Scope: `zaxweir.com` | Status: **For owner review, NOT a final brand lock**

## Product and identity boundaries
- **ZAXWEIR** is the parent company; **ORVARDEN** is its first product **in development**, not publicly available. Never claim real integrations or active public accounts because the interactive browser demo is simulated.
- Existing ZAXWEIR homepage, company-page design direction, ORVARDEN product identity, 404, current slogan and owner-accepted artwork are **design references**, not a license to reconstruct them from scratch.
- Company slogan **“Technology takes your lead.”** is the *current working line*, not a permanent legal/brand lock. On ORVARDEN use **“Your AI. Your Computer. Your Rules.”**
- Company logo/favicons are frozen **pending owner selection**. No new symbols, brand marks, business or product logos, icons posing as a logo, or rebranding.
- Preserve exact existing asset licenses. Do not copy screenshots, patterns, palettes, branded marks or graphics from Apple, Linear, Stripe, etc.

## The visual identity: cinematic, useful, restrained
ZAXWEIR should feel like carefully built software, **not** a gaming website, token-based SaaS template, or luxury resort. Use the existing dark midnight-blue horizon imagery, precise type, deep space, strategic cyan/blue/violet illumination and high-contrast action cues. The intent is **quiet confidence with controlled energy**.

ORVARDEN belongs to the same family but is visually separate: deep obsidian, burgundy, rose, magenta and violet. Keep the real interactive demo, its simulated-status disclosures, and functional states. Never flood the company homepage with ORVARDEN rose.

### Current implementation reference tokens (informative, not an instruction to globally replace CSS)
| Token | Company family | Role |
|---|---|---|
| `--zx-ink` | `#030b15` | Midnight background |
| `--zx-surface` | `#0b1b2b` | Quiet raised panel |
| `--zx-line` | `#385980` | Border on dark panel |
| `--zx-text` | `#f3f6fb` | Primary reading text |
| `--zx-muted` | `#c0cad8` | Secondary text, must remain legible |
| `--zx-cyan` | `#48d9ff` | Focus and important accents |
| `--zx-blue` | `#0576ef` | Primary action start |
| `--zx-violet` | `#9133e6` | Primary action end |
| `--zx-focus` | `#fff` or `#aff4ff` | Visible keyboard ring on dark surfaces |
Company button uses an established blue→violet gradient; reserve high-energy treatments for primary actions. Existing CSS is the source of truth until owner reviews these tokens.

### Typography
- Use the existing system-first stack `Inter, "Segoe UI", Arial, sans-serif`; no new font downloads or paid font license.
- Editorial headline: one focal H1, short, human, with deliberate line lengths; existing home title and owner-approved wording are not to be rewritten.
- Headings: calm clear hierarchy, moderate tracking, no center-aligned generic slogans as filler.
- Secondary copy: never under 14px for body prose; intended base around 16px, line-height 1.55–1.75; avoid low-contrast smoky text.
- Uppercase eyebrow labels are navigational cues, not decorative wallpaper; letter-spacing remains consistent.

### Layout and components
- Spacing scale in CSS px: 8, 12, 16, 24, 32, 48, 64, 96. Use whitespace intentionally, not long dead zones.
- Company max content `~1360–1400px`, mobile gutters `~20px`; ORVARDEN may be wider for its console.
- Navigation: wordmark text only, approved rounded bordered container on company pages; visible current-page and hover/focus states.
- One main CTA per section, distinct secondary action. All controls must work and have accurate labels.
- For company detail pages, use section indices, editorial dividing lines and meaningful visual hierarchy over repeated three-up cards.
- On ORVARDEN, **maintain the AI→ORVARDEN→Windows concept** and separate interactive console section; do not invent real providers/availability.

### Motion and depth
- Two depth layers normally: restrained gradient shadow + a thin lit border. Avoid stacked neon bloom, particles, video backgrounds, scroll-jacking, hover-follow cursors, shader effects by default.
- Microinteractions should answer user interaction (hover/focus/press), <200ms where possible, and have `prefers-reduced-motion` safe fallback. No flashing or animated UI required to understand content.
- Shader prototype is a **future optional experiment**, not an approved dependency; must pass data/network, CPU/GPU, mobile and fallback reviews before consideration.

### Human copy standard
Write as the person building it would actually speak: *what it does, why it matters, what is available now, what happens next*. Avoid unsupported buzzwords: revolutionary, cutting-edge, seamless ecosystem, unlock, next generation, transform your workflow. Don't claim integrations, security certification, sales or user results not proven.
Keep product labels: **IN DEVELOPMENT**; concept preview is **browser-only simulated**, no files, connected AI or computer access.

## Hard implementation constraints
- Site remains static HTML/CSS/JavaScript hosted on GitHub Pages; no React, Tailwind, npm runtime, remote asset CDN, analytics, signups, paid APIs or external fonts just for polish.
- All modifications go to a fresh branch/PR. Keep owner-approved live `main` untouched until before/after screenshots and explicit release approval.
- No edits to logo/favicons, ORVARDEN simulation logic, privacy disclosures, sitemap, robots, 404, worker/trading systems.
- Do not execute unreviewed remote setup scripts from external repos. Learn from their docs only. Superdesign CLI/login not required to do this work.

## Acceptance gates
1. Compare exact same content in before/after renders at 390 and 1440 width.
2. Check responsive at 320/390/768/1024/1440/1920; no horizontal overflow, readable hierarchy, no clipped CTA.
3. Keyboard navigation including visible focus, relevant contrast evaluation, 200% text/responsive reflow, reduced-motion support.
4. No HTTP/external requests introduced, no errors or missing assets.
5. Functional regressions for menu, internal navigation and ORVARDEN interactive example.
6. Content and source diff must prove: no unexpected pages, logos, favicon, privacy terms or connected-service changes.
7. Deliver **actual coded screenshots** to owner, then wait; aesthetic acceptance ≠ test passing.

## External inspirations reviewed (guidance only)
- [Superdesign skill](https://github.com/superdesigndev/superdesign-skill): useful for iterative exploration; separate CLI/account workflow, not installed.
- [Better Design](https://github.com/marvkr/better-design): tokens and component thinking; React/shadcn registry not applicable to our static pages, not installed.
- [Design Taste](https://github.com/madebymustafa/design-taste): useful critique and anti-template checklist; independent repo, not installed/executed.
- [Paper Shaders](https://github.com/paper-design/shaders): supports vanilla JS, but WebGL/CPU/GPU overhead isn't justified for approved site; not installed.
License review is required if actual code/assets are ever included. No third-party code/assets copied here.
