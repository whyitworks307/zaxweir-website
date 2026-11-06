# ZAXWEIR — Privacy-first website analytics (staged)

Status: **PREPARED / NOT ACTIVE** until a Cloudflare Web Analytics **site beacon token** is configured in `assets/site.js`, the branch is reviewed/merged, and live delivery is verified.

## Scope
- Count approximate visits/page views and see popular pages / aggregate website performance.
- No advertising trackers, cookie-based analytics, user accounts, IP logging in site code, individual visitor profiles, local storage, or fingerprinting.
- Keep GitHub Pages, existing domain DNS, mail routing, site appearance and Personal Relay unchanged.
- Cloudflare receives beacon requests when the integration is enabled; see the updated privacy notice. Visitors can block analytics; counts are approximate and not historical.
- $0 personal spend. Cloudflare Web Analytics offers a free tier.

## One-time Cloudflare dashboard setup
1. In your Cloudflare account, open https://dash.cloudflare.com/ and choose **Web Analytics**.
2. Select **Add a site** and enter `zaxweir.com`. It is hosted by GitHub Pages and is **not proxied through Cloudflare**. No DNS or nameserver change is required.
3. Under **Manage site**, copy the **JavaScript beacon site token** (normally 32 hexadecimal characters), or the complete provided snippet. This is a public, hostname-scoped Web Analytics site token, **not** a Cloudflare API key or access credential. Never paste Cloudflare API tokens/secrets into GitHub.
4. Change only `const CLOUDFLARE_WEB_ANALYTICS_TOKEN = '';` in `assets/site.js` to the issued site token. The beacon loader fails closed if missing/invalid and restricts loading to `zaxweir.com` and `www.zaxweir.com`.
5. Review the updated `privacy.html` and any external scripts, run the checks below, and ask the owner to review/approve the merge. Do not merge automatically.

## Verification
- `python -m unittest discover -s tests -p 'test_*.py' -v`
- `node --check assets/site.js` (if Node is installed).
- Test local staging (localhost) and GitHub preview: no Cloudflare beacon request.
- After owner-approved merge, open `https://zaxweir.com/` and `https://zaxweir.com/products.html`; in browser Developer Tools → Network, look for `https://static.cloudflareinsights.com/beacon.min.js` and a successful analytics beacon request. Make sure no cookies/local storage are created by this feature.
- Confirm the Cloudflare Web Analytics dashboard shows aggregate visits/page views (allow a little time for reporting). Never claim the data is historical or exactly counts people.
- Test privacy link, menus, navigation, page visuals, HTTPS, and contact email path unchanged.
- If the snippet is blocked or broken, first remove the token (disable beacon) via reviewed change. Do not modify DNS.

## Current known deployment
- Website repository: `whyitworks307/zaxweir-website`, GitHub Pages.
- Domain `zaxweir.com` currently resolves directly to GitHub Pages addresses, not a Cloudflare-proxied origin.
- Privacy notice is updated to describe conditional aggregate analytics before activation.
- **The site token is currently absent, so no analytics are being collected by this integration.**

Cloudflare official setup reference:
https://developers.cloudflare.com/web-analytics/get-started/
