# ZAXWEIR — Instructions for AI Coding Agents (Draft for owner review)

Read [the current design standard](docs/ZAXWEIR_DESIGN_STANDARD_DRAFT.md) and [the visual audit](docs/DESIGN_AUDIT_20261013.md) **before** any UI work.

## Non-negotiable project rules
- Owner-approved live pages are the baseline. Do **not** rebuild the website, swap the hero art, choose/change the logo/favicons, or rewrite the working ZAXWEIR slogan.
- Parent brand **ZAXWEIR**: cinematic midnight/navy, cyan, blue and violet. Product **ORVARDEN**: obsidian, burgundy, rose and violet. Do not mix visual identities indiscriminately.
- ORVARDEN is **in development**, not publicly downloadable. The Products page's AI/device dashboard is an **interactive simulation only**. No fabricated working service integrations, customers, results, signups, certifications or release dates.
- Do not access/change other projects, laptop-control systems, live worker, business accounts or domain settings; this repository is a static website.
- Plain HTML/CSS/JS only. No React/Next/Tailwind rewrite, external trackers, font CDN, shader animation, paid plugin, analytics SDK or new package without separate authorization.
- Do not install/execute third-party AI design skills or remote scripts automatically. Derive guidance from reviewed documentation only; record license checks if incorporating code.
- Apply changes to a topic branch; **never push directly to protected main, merge, publish or deploy without the owner's explicit release approval**.
- Do not treat screenshots from an image generator as screenshots of implemented code.

## Before writing code
1. Read all touched page files, existing CSS and any page-level JS. Confirm the live `main` SHA.
2. Identify the exact visual problem and propose a **small, reversible** improvement. Reference actual approved screenshots where available.
3. Preserve existing text, layout and interactivity unless the owner explicitly approves changing them.
4. Use scoped CSS and avoid patch-on-patch CSS overrides in shared stylesheets. Prefer CSS/native HTML over JS effects.

## Acceptance checklist for every design PR
- List exactly which files changed and why; prove unrelated files unchanged.
- Verify HTML headings/links/controls and JavaScript console errors.
- Test 320/390/768/1024/1440/1920 CSS viewports and 200% text reflow; no horizontal overflow or clipped CTA.
- Verify keyboard focus, reduced-motion behavior and readability.
- Run relevant product-console smoke/regressions if Products or global CSS/JS is touched.
- Render **actual coded** desktop (1440) and mobile (390) full-page screenshots, with before-and-after at identical widths.
- Visual quality is a separate review: screenshot comparison + owner approval before any merge.
- If tests or images cannot be delivered, say so; do not mark production ready.

## Current first staged exploration
The `design/zaxweir-premium-discipline-20261013` branch uses a removable `assets/home-polish.css` stylesheet linked only from `index.html`. It refines value-row rhythm and the existing ORVARDEN homepage introduction. No other page or working behavior is intentionally modified. **Do not merge until owner views actual screenshots.**
