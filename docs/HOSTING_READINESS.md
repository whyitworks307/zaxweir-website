# ZAXWEIR website — hosting and DNS readiness

This is a review checklist, **not** authorization to move DNS, change the live site, or deploy any product.

## Verified from the repository

- The website consists of static HTML, CSS, and JavaScript in the public `whyitworks307/zaxweir-website` repository.
- The tracked `CNAME` file declares `zaxweir.com`.
- The repository already has a sitemap, a robots file, a privacy page, and a Playwright-based product-console regression test.
- Pull-request static checks cover local links/assets, metadata, canonical URLs, fragments, local CSS resources, and sitemap integrity.
- A checked-in `CNAME` alone does **not** prove current live DNS, HTTPS, or GitHub Pages settings.

## Verify before any future hosting or DNS change

1. Read and preserve the entire existing DNS zone from Namecheap: A, AAAA, CNAME, MX, TXT, CAA, SPF, DKIM, DMARC, and any verification records. Do not infer all current records from website HTML.
2. Independently verify current apex and `www` HTTPS requests, certificate validity, redirects, site content, and sitemap.
3. Review GitHub Pages' configured source, custom domain, domain verification, and Enforce HTTPS setting.
4. Verify mail delivery independently. Changing DNS can break the website's contact mailbox or outgoing mail authentication.
5. Require a specific benefit before adopting Cloudflare/Vercel: GitHub Pages already provides free static-site hosting, HTTPS, and CDN delivery.
6. If a change is later approved, prepare a reversible step-by-step DNS plan with known-good before/after snapshots.
7. Revisit the ZAXWEIR pre-launch legal/security/privacy checklist before adding tracking, forms, cookies, age-dependent features, subscriptions, user uploads, or paid services.

## Conservative $0 workflow

- Keep the website on the current GitHub setup while there is no verified hosting deficiency.
- Review changes through branches and pull requests; don't merge directly to main.
- GitHub Actions workflow is read-only, uses no secrets, and performs no deployment.
- Keep the existing Playwright browser regression test as a separate manual test until an approved test runner exists. Static checks do not certify accessibility or actual browser behavior.
- Do not connect Personal Relay, its private code or local Daily Report Organizer to this public website repository.
- Do not add Clerk, Supabase, Upstash, Pinecone, Resend, Stripe, PostHog, Sentry, or any cloud telemetry unless there is a concrete requirement and explicit authorization.

## Before a website merge

- [ ] Read-only automated static checks pass against the proposed revision.
- [ ] Existing browser regression checks are reproduced where a compatible runner is available.
- [ ] Public product descriptions accurately reflect currently released software.
- [ ] Privacy/legal review is updated if site functionality changes.
- [ ] DNS, HTTPS, and email checks are recorded without modifying them.
- [ ] Owner reviews and approves the proposed merge.
