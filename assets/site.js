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
