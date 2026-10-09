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
