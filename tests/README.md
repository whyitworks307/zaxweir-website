The website is served directly as static HTML, CSS, and JavaScript. There is no package manifest, compilation, lint, or type-check command.

Run the product-console regression checks with the cloud environment's existing Playwright installation and Chromium:

```sh
python3 -m http.server 8009 --bind 127.0.0.1
```

In another terminal, from the repository root:

```sh
SITE_URL=http://127.0.0.1:8009 node tests/products-console.cjs
```

`CHROMIUM_PATH` can override `/usr/bin/chromium`. The checks exercise the local simulation, permission guards, approval invalidation, assistant synchronization, keyboard tabs, all panels at seven viewport widths, 200% text sizing, reduced motion, and the no-JavaScript fallback. They fail on browser exceptions or requests to external origins. These are browser checks, not physical-device or Safari certification.
