# ZAXWEIR — Initial Design Audit and Improvement Queue
Date: 2026-10-13 | Baseline `main` commit: `844bada370ea24631e99135bcc59570066ccb55f`
Review status: **work in a staged branch only; live site intentionally unchanged**.

## Observations grounded in current source
- Homepage design is intentionally compact, with an approved dark cinematic hero, readable “Technology takes your lead.” H1, premium nav pill, four value items and an ORVARDEN bridge image. Replacing layout/logo would undo the owner's choices.
- Home values rely on a tightly packed horizontal row and unframed icons; stronger spacing, grouping, precise separators and calmer icon treatments can add premium polish without changing their messaging or position.
- The homepage ORVARDEN panel is distinct but looks relatively flat versus its dramatic existing art. Controlled layered depth, clearer development eyebrow and adjusted text hierarchy may improve it without more neon.
- Company About/Contact are editorial/cinematic but use a separate large stylesheet; avoid an accidental global override. Keep page-level changes isolated.
- The Products page already has a complex, working simulated console. **No redesign or dependency changes** without a product-specific need.
- Typography and focus states are implemented, but component styles differ by page. Document the system, improve consistent keyboard states and run 200% text/contrast audits rather than wholesale restyling.

## Ranked opportunities
| Rank | Opportunity | Benefit | First pass |
|---|---|---|---|
| 1 | Homepage values strip: spacious rhythm, precise icon frames, clear separators, stronger card hierarchy | First impression beyond hero | **Prototype on branch** |
| 2 | Homepage ORVARDEN panel: layered subtle border/background, status eyebrow, tighter reading measure | Product introduction feels connected to premium hero | **Prototype on branch** |
| 3 | Company-wide focus/hover/tap consistency (without changing existing navigation behavior) | Perceived quality and accessibility | Test, then stage smallest safe fix |
| 4 | About/Contact/Privacy typography and whitespace audit (especially tablet breakpoints) | Consistency across family | Report before edits |
| 5 | Optional background shader / motion experiment | Atmospheric differentiation | **Park**: may harm performance, dependencies not justified |

## Anti-template rubric (score screenshots, 1–5)
- Recognizable ZAXWEIR family, not borrowed visual branding
- Hierarchy: clear first glance, one dominant headline, meaningful secondary cue
- Controlled color: cyan/violet anchors, deliberate quiet surfaces
- Text voice: founder-like, factual, direct
- Craft: spacing, borders, typography, responsive composition
- Accessibility/performance: visible focus, reflow, no distracting animation

## Proposed QA and release
- Compare **before vs stage** at same desktop and mobile sizes.
- Preserve unchanged source except `index.html` addition of CSS link, new scoped `assets/home-polish.css`, and these draft docs.
- Run browser/layout/navigation checks. Mark subjective appearance as *review required*, even if tests pass.
- Owner must select stage before PR merge. No implementation of Superdesign/Paper/React/etc.
