let selectedAssistant = 'ChatGPT';
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
      const active = side || node.dataset.assistant === selectedAssistant;
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
        path.setAttribute('opacity', active ? '1' : '.2');
        if (!side && active) path.classList.add('wire-selected');
        group.appendChild(path);
      });
      const dot = document.createElementNS(ns, 'circle');
      dot.setAttribute('cx',x);dot.setAttribute('cy',y);dot.setAttribute('r','2.6');
      dot.setAttribute('fill',side ? '#85d2ff' : '#ff8fe8');
      dot.setAttribute('opacity', active ? '1' : '.25');
      group.appendChild(dot);
    });
  });
  wires.querySelectorAll(':scope > g').forEach(group => group.remove());
  wires.appendChild(group);
}
if (flow && wires) {
  if ('ResizeObserver' in window) new ResizeObserver(fitBridgePaths).observe(flow);
  else window.addEventListener('resize', fitBridgePaths);
  document.fonts.ready.then(fitBridgePaths);
  fitBridgePaths();
}

// This state machine is an in-memory demonstration. It never calls a service or device.
const consolePreview = document.querySelector('.orv-console');
if (consolePreview) {
  const assistants = ['ChatGPT', 'Claude', 'Gemini', 'Copilot'];
  const settings = { folders: true, apps: false, tasks: true };
  let taskState = 'idle';
  let events = ['Preview ready. No device connected.'];
  const panelButtons = [...consolePreview.querySelectorAll('[data-panel]')];
  const panels = [...consolePreview.querySelectorAll('.console-panel')];
  const announcement = consolePreview.querySelector('.console-announcement');
  const labels = { idle: 'Not requested', requested: 'Task requested', awaiting: 'Awaiting approval', reviewed: 'Permission reviewed', approved: 'Approved example', denied: 'Denied example', completed: 'Example completed' };
  const descriptions = { idle: 'Ready to request an example task.', requested: 'Example task requested. No action has been performed.', awaiting: 'Awaiting your decision. Review the example permissions first.', reviewed: 'Permission scope reviewed. You can approve or deny the example.', approved: 'Approved in the simulation. Show the fictional result when ready.', denied: 'Example denied. No task was performed.', completed: 'Example complete. No real files were accessed or changed.' };
  function announce(message) { announcement.textContent = message; }
  function addEvent(message) { events.push(message); if (events.length > 12) events.shift(); }
  function showPanel(name, focus = false) {
    const button = panelButtons.find(button => button.dataset.panel === name);
    if (!button) return;
    panelButtons.forEach(tab => {
      const selected = tab === button;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.id !== `console-${name}`; });
    if (focus) button.focus();
  }
  function render() {
    document.querySelectorAll('[data-assistant]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.assistant === selectedAssistant)));
    consolePreview.querySelectorAll('[data-selected-assistant]').forEach(label => { label.textContent = selectedAssistant; });
    consolePreview.querySelector('[data-overview-task]').textContent = labels[taskState];
    const reviewed = ['reviewed', 'approved', 'completed'].includes(taskState);
    const allowed = settings.folders && settings.tasks;
    consolePreview.querySelector('[data-permission-status]').textContent = reviewed ? (allowed ? 'Example scope reviewed' : 'Example scope blocked') : 'Not reviewed';
    consolePreview.querySelector('[data-task-status]').textContent = descriptions[taskState];
    const scope = consolePreview.querySelector('[data-task-scope]');
    scope.hidden = !reviewed;
    scope.textContent = `Example scope: Demo/Inbox folder ${settings.folders ? 'allowed' : 'blocked'}; registered organize-files task ${settings.tasks ? 'allowed' : 'blocked'}. Restricted actions remain blocked.${allowed ? '' : ' Approval is unavailable until both required permissions are enabled and reviewed again.'}`;
    const commands = {
      request: taskState === 'idle', continue: taskState === 'requested', review: taskState === 'awaiting',
      approve: taskState === 'reviewed', deny: ['awaiting', 'reviewed'].includes(taskState),
      finish: taskState === 'approved', restart: ['completed', 'denied'].includes(taskState), reset: true
    };
    consolePreview.querySelectorAll('[data-command]').forEach(button => {
      button.hidden = !commands[button.dataset.command];
      button.disabled = !commands[button.dataset.command] || (button.dataset.command === 'approve' && !allowed);
    });
    const stepOrder = ['requested', 'awaiting', 'reviewed', 'approved', 'completed'];
    const index = taskState === 'denied' ? 3 : stepOrder.indexOf(taskState);
    consolePreview.querySelectorAll('[data-step]').forEach((step, stepIndex) => {
      step.classList.toggle('is-current', stepIndex === index);
      step.classList.toggle('is-done', stepIndex < index);
      if (stepIndex === index) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
    const result = consolePreview.querySelector('[data-task-result]');
    result.hidden = !['denied', 'completed'].includes(taskState);
    result.textContent = taskState === 'completed' ? 'Fictional result: 12 example files organized into Documents and Images inside Demo/Inbox. This result is illustrative; no real files were accessed or moved.' : 'Denied in this simulation. No example operation was carried out and no computer was accessed.';
    [[consolePreview.querySelector('[data-activity-log]'), events], [consolePreview.querySelector('[data-recent-activity]'), events.slice(-3)]].forEach(([list, items]) => {
      list.replaceChildren(...items.map(message => { const item = document.createElement('li'); item.textContent = message; return item; }));
    });
    fitBridgePaths();
  }
  function selectAssistant(name) {
    if (!assistants.includes(name) || name === selectedAssistant) return;
    selectedAssistant = name;
    taskState = 'idle';
    addEvent(`${name} selected for the simulation. Previous task cleared; no AI connection made.`);
    render();
    announce(`${name} selected as an illustrative assistant. The task preview has reset. No device or AI service is connected.`);
  }
  consolePreview.classList.add('is-interactive');
  consolePreview.querySelectorAll('button:not([data-command]), input[data-permission]').forEach(control => { control.disabled = false; });
  document.querySelectorAll('.ai-node[data-assistant]').forEach(button => { button.disabled = false; });
  const navigation = consolePreview.querySelector('.console-navigation');
  navigation.setAttribute('role', 'tablist');
  navigation.removeAttribute('aria-label');
  navigation.setAttribute('aria-label', 'Interactive concept preview');
  panelButtons.forEach(button => {
    button.id = `tab-${button.dataset.panel}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `console-${button.dataset.panel}`);
  });
  panels.forEach(panel => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `tab-${panel.id.replace('console-', '')}`);
    panel.tabIndex = 0;
  });
  navigation.addEventListener('keydown', event => {
    const current = panelButtons.indexOf(event.target);
    if (current < 0) return;
    let next;
    if (event.key === 'ArrowRight') next = (current + 1) % panelButtons.length;
    if (event.key === 'ArrowLeft') next = (current + panelButtons.length - 1) % panelButtons.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = panelButtons.length - 1;
    if (next !== undefined) { event.preventDefault(); showPanel(panelButtons[next].dataset.panel, true); }
  });
  document.addEventListener('click', event => {
    const assistant = event.target.closest('button[data-assistant]');
    if (assistant) selectAssistant(assistant.dataset.assistant);
  });
  consolePreview.addEventListener('change', event => {
    const key = event.target.dataset.permission;
    if (!Object.prototype.hasOwnProperty.call(settings, key)) return;
    settings[key] = event.target.checked;
    if (taskState === 'reviewed') taskState = 'awaiting';
    else if (['approved', 'completed', 'denied'].includes(taskState)) taskState = 'idle';
    addEvent(`Example ${key} permission ${settings[key] ? 'enabled' : 'blocked'}. Any prior approval is invalidated.`);
    render();
    announce('Example settings changed. Review the scope again before approval. No computer permissions changed.');
  });
  consolePreview.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    if (button.dataset.panel) { showPanel(button.dataset.panel); return; }
    if (button.dataset.openPanel) { showPanel(button.dataset.openPanel, true); return; }
    const command = button.dataset.command;
    if (!command) return;
    if (command === 'request' && taskState === 'idle') {
      taskState = 'requested'; addEvent(`Task requested by ${selectedAssistant} in the simulation.`);
    } else if (command === 'continue' && taskState === 'requested') {
      taskState = 'awaiting'; addEvent('Awaiting approval. No operation started.');
    } else if (command === 'review' && taskState === 'awaiting') {
      taskState = 'reviewed'; addEvent(`Permission checked: ${settings.folders && settings.tasks ? 'example scope allows this task' : 'example task blocked by permissions'}.`);
    } else if (command === 'approve' && taskState === 'reviewed' && settings.folders && settings.tasks) {
      taskState = 'approved'; addEvent('Approval received for the fictional task only.');
    } else if (command === 'deny' && ['awaiting', 'reviewed'].includes(taskState)) {
      taskState = 'denied'; addEvent('User denied the example task. Nothing performed.');
    } else if (command === 'finish' && taskState === 'approved') {
      taskState = 'completed'; addEvent('Task completed in the simulation.'); addEvent('Fictional result recorded. No real files changed.');
    } else if (command === 'restart' && ['completed', 'denied'].includes(taskState)) {
      taskState = 'idle'; addEvent('New example task ready. Approval must be reviewed again.');
    } else if (command === 'reset') {
      selectedAssistant = 'ChatGPT'; taskState = 'idle';
      Object.assign(settings, { folders: true, apps: false, tasks: true });
      consolePreview.querySelectorAll('[data-permission]').forEach(input => { input.checked = settings[input.dataset.permission]; });
      events = ['Demonstration reset. No device connected.'];
    } else return;
    render();
    announce(command === 'reset' ? 'Demonstration reset. No device connected.' : descriptions[taskState]);
    // Keep keyboard focus on a visible control after the action disappears.
    if (button.hidden) consolePreview.querySelector('#console-task button:not([hidden]):not(:disabled)')?.focus();
  });
  showPanel('overview');
  render();
}
