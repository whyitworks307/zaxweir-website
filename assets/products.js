// Reveal the intended workflow when its working on-page CTA is used.
const workflow = document.getElementById('how-it-works');
function revealWorkflow() {
  if (window.location.hash === '#how-it-works' && workflow) workflow.open = true;
}
document.querySelectorAll('a[href="#how-it-works"]').forEach(link => {
  link.addEventListener('click', () => { if (workflow) workflow.open = true; });
});
window.addEventListener('hashchange', revealWorkflow);
revealWorkflow();

// Fit the real HTML preview to the four corners of the photographic laptop screen.
const laptop = document.querySelector('.concept-laptop');
const screen = document.querySelector('.concept-screen');
function fitConceptScreen() {
  if (!laptop || !screen) return;
  if (!window.matchMedia('(min-width:1051px)').matches) {
    screen.style.removeProperty('transform');
    return;
  }
  const width = laptop.getBoundingClientRect().width;
  screen.style.transform = `matrix3d(${.0014099516431630463 * width},${-.00018678572122135978 * width},0,-.0005513020303566709,${-.00020128646799776257 * width},${.0012221689861308946 * width},0,-.00012334864627707196,0,0,1,0,${.33791866028708134 * width},${.090311004784689 * width},0,1)`;
}
if (laptop && screen) {
  new ResizeObserver(fitConceptScreen).observe(laptop);
  fitConceptScreen();
}
