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
  const bounds = laptop.getBoundingClientRect();
  const width = bounds.width;
  const vertical = bounds.height / (941 / 1672);
  screen.style.transform = `matrix3d(${.0014099516431630463 * width},${-.00018678572122135978 * vertical},0,-.0005513020303566709,${-.00020128646799776257 * width},${.0012221689861308946 * vertical},0,-.00012334864627707196,0,0,1,0,${.33791866028708134 * width},${.090311004784689 * vertical},0,1)`;
}
if (laptop && screen) {
  new ResizeObserver(fitConceptScreen).observe(laptop);
  fitConceptScreen();
}

// Draw each illuminated path in the visible gap, from its actual card to the bridge.
const flow = document.querySelector('.flow-grid');
const wires = document.querySelector('.flow-wires');
function fitBridgePaths() {
  if (!flow || !wires || !window.matchMedia('(min-width:701px)').matches) return;
  const bounds = flow.getBoundingClientRect();
  const bridge = flow.querySelector('.flow-bridge').getBoundingClientRect();
  wires.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
  const center = bridge.top - bounds.top + bridge.height / 2;
  const ns = 'http://www.w3.org/2000/svg';
  const group = document.createElementNS(ns, 'g');
  group.setAttribute('stroke', 'url(#wire-color)');
  group.setAttribute('stroke-width', '1.5');
  ['.ai-node', '.pc-node'].forEach((selector, side) => {
    flow.querySelectorAll(selector).forEach((node, index) => {
      const card = node.getBoundingClientRect();
      const x = (side ? card.left : card.right) - bounds.left;
      const y = card.top - bounds.top + card.height / 2;
      const end = (side ? bridge.right : bridge.left) - bounds.left;
      const direction = side ? -1 : 1;
      const finish = center + (index - 2) * 3;
      [-1.8, 0, 1.8].forEach(offset => {
        const path = document.createElementNS(ns, 'path');
        path.setAttribute('d', `M${x} ${y} C${x + direction * 32} ${y + offset} ${end - direction * 34} ${finish + offset} ${end} ${finish}`);
        path.setAttribute('stroke', side ? (offset === 0 ? '#c1e6ff' : '#649fff') : (offset === 0 ? '#ffc5fa' : '#e951d8'));
        if (offset === 0) path.setAttribute('class','wire-core');
        else path.setAttribute('opacity','.75');
        group.appendChild(path);
      });
      const dot = document.createElementNS(ns, 'circle');
      dot.setAttribute('cx',x);dot.setAttribute('cy',y);dot.setAttribute('r','2.6');
      dot.setAttribute('fill',side ? '#85d2ff' : '#ff8fe8');
      group.appendChild(dot);
    });
  });
  wires.querySelectorAll(':scope > g').forEach(group => group.remove());
  wires.appendChild(group);
}
if (flow && wires) {
  new ResizeObserver(fitBridgePaths).observe(flow);
  document.fonts.ready.then(fitBridgePaths);
  fitBridgePaths();
}
