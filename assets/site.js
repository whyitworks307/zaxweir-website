// Progressive enhancement only. Navigation works without JavaScript.
const menu = document.querySelector('.mobile-menu');
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.open) {
    menu.open = false;
    menu.querySelector('summary').focus();
  }
});
document.addEventListener('click', event => {
  if (menu?.open && !menu.contains(event.target)) menu.open = false;
});
window.matchMedia('(min-width: 701px)').addEventListener('change', event => {
  if (event.matches && menu) menu.open = false;
});


// Optional Cloudflare Web Analytics: page counts, not visitor profiles.
// Disabled until the public, hostname-scoped Web Analytics site token is set.
// This code never loads the beacon on localhost, GitHub previews, or staging.
(() => {
  const CLOUDFLARE_WEB_ANALYTICS_TOKEN = '9f4b7e08c52d4d94a4bc3c31b5ec6d40';
  if (!/^[a-f0-9]{32}$/i.test(CLOUDFLARE_WEB_ANALYTICS_TOKEN)) return;
  if (!['zaxweir.com', 'www.zaxweir.com'].includes(window.location.hostname)) return;

  const beacon = document.createElement('script');
  beacon.type = 'module';
  beacon.defer = true;
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.setAttribute('data-cf-beacon', JSON.stringify({
    token: CLOUDFLARE_WEB_ANALYTICS_TOKEN
  }));
  document.head.appendChild(beacon);
})();
